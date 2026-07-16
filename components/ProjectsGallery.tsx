"use client";
import { useRef, useState, useCallback, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/types/project";
import RichTextRenderer from "@/components/RichTextRenderer";

// ══════════════════════════════════════════════════════════════
export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const currentIndexRef = useRef(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const REVEAL_END = 0.20; // 20% of scroll — hero shrinks to compact position
  const NAV_START = 0.30;  // 30% — body revealed, brief pause, then nav scroll begins

  useEffect(() => { setMounted(true); }, []);

  // ── Section pins + hero→compact reveal + scroll-driven index ──
  useEffect(() => {
    if (!sectionRef.current || projects.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const total = (projects.length + 1) * 35;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${total}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${total}%`,
          scrub: 1.2,
        },
        onUpdate: function () {
          const raw = this.progress();
          if (raw < NAV_START) return;

          const navProgress = Math.min((raw - NAV_START) / (1 - NAV_START), 1);
          const idx = Math.min(Math.floor(navProgress * projects.length), Math.max(projects.length - 1, 0));
          if (idx !== currentIndexRef.current) {
            currentIndexRef.current = idx;
            setActiveIndex(idx);
          }
        },
      });

      // ── Hero → Compact title animation ────────────────
      if (titleRef.current && sectionRef.current) {
        const section = sectionRef.current;
        const title = titleRef.current;
        const sectionH = section.offsetHeight;
        const titleH = title.offsetHeight;
        const currentTop = title.offsetTop;
        const centeringOffset = (sectionH - titleH) / 2 - currentTop;

        gsap.set(title, {
          scale: 1.8, y: centeringOffset, transformOrigin: "center center",
        });

        tl.to(title, {
          scale: 1, y: 0, duration: 0.20, ease: "power2.inOut",
        }, 0);
      }

      // ── Body fade-in ──────────────────────────────────
      if (bodyRef.current) {
        tl.fromTo(bodyRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.10, ease: "power2.out" }, 0.20);
      }

      // ── Nav scroll segment ────────────────────────────
      tl.to({}, { duration: 0.5, ease: "none" }, REVEAL_END);
    }, sectionRef);

    return () => ctx.revert();
  }, [projects.length]);

  // ── Click nav item → scroll to that project segment ───────
  const selectProject = useCallback((index: number) => {
    if (index === activeIndex) return;
    const triggers = ScrollTrigger.getAll();
    const st = triggers.find(t => t.trigger === sectionRef.current);
    if (st) {
      const revealBoundary = st.start + (st.end - st.start) * NAV_START;
      const navSpan = (st.end - st.start) * (1 - NAV_START);
      const progress = projects.length > 1 ? index / (projects.length - 1) : 0;
      window.scrollTo({ top: revealBoundary + navSpan * progress, behavior: "smooth" });
    }
  }, [activeIndex, projects.length]);

  // ── Open overlay — generic scale + fade ───────────────────
  const openOverlay = useCallback((index: number) => {
    if (sectionRef.current) gsap.to(sectionRef.current, { filter: "blur(10px)", pointerEvents: "none", duration: 0.2, ease: "power2.out" });
    setOverlayIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  useLayoutEffect(() => {
    if (overlayIndex === null || !panelRef.current) return;
    const tl = gsap.timeline();
    if (overlayRef.current) tl.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 0.7, duration: 0.25 }, 0);
    tl.fromTo(panelRef.current, { autoAlpha: 0, scale: 0.92, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.1);
    tl.fromTo(contentRef.current?.querySelectorAll(".panel-fade-item") ?? [], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" }, "-=0.15");
    timelineRef.current = tl;
  }, [overlayIndex]);

  // ── Close overlay ──────────────────────────────────────────
  const closeOverlay = useCallback(() => {
    if (overlayIndex === null) return;
    timelineRef.current?.kill();
    if (overlayRef.current) gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.15 });
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        autoAlpha: 0, scale: 0.92, y: 30, duration: 0.25, ease: "power2.in",
        onComplete: () => { setOverlayIndex(null); },
      });
    } else { setOverlayIndex(null); }
    document.body.style.overflow = "";
    if (sectionRef.current) {
      gsap.to(sectionRef.current, { filter: "blur(0px)", pointerEvents: "auto", duration: 0.3, ease: "power2.out" });
    }
  }, [overlayIndex]);

  useEffect(() => {
    if (overlayIndex === null) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeOverlay(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [overlayIndex, closeOverlay]);

  useEffect(() => { return () => { document.body.style.overflow = ""; }; }, []);

  const overlayProject = overlayIndex !== null ? projects[overlayIndex] : null;

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative bg-surface-container-lowest/5 border-t border-border-glass overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div className="h-full w-full flex flex-col max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
          {/* ── Single title — starts big+centered, shrinks to compact ── */}
          <div ref={titleRef} className="text-center shrink-0 mb-8 md:mb-12">
            <h2 className="font-headline-md text-headline-md mb-3 md:mb-4 tracking-tighter">
              Casos de Estudio <span className="text-plasma-orange">Destacados</span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Una selección de productos digitales.
            </p>
          </div>

          {/* ── Body — hidden until reveal, then cards + nav ── */}
          <div ref={bodyRef} className="flex-1 flex gap-6 md:gap-10 relative min-h-0">
            {/* Stacked panels */}
            <div className="flex-1 relative min-h-0">
              {projects.map((p, i) => (
                <div
                  key={i}
                  data-flip-id={i}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    i === activeIndex
                      ? "opacity-100 pointer-events-auto scale-100"
                      : "opacity-0 pointer-events-none scale-[0.96]"
                  }`}
                >
                  <div className="h-full flex items-center">
                    <div className={`w-full glass-panel rounded-2xl overflow-hidden border-t-2 ${p.borderColor} bg-surface-container-low/80 backdrop-blur-sm flex flex-col md:flex-row max-h-full shadow-xl shadow-black/20 transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/30`}>
                      {/* Image side */}
                      <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-[300px] shrink-0 overflow-hidden bg-black/10 group/image">
                        {p.images.length > 0 ? (
                          <>
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-contain transition-transform duration-700 group-hover/image:scale-105" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-on-surface-variant font-label-code text-sm">SIN_IMAGEN</span>
                          </div>
                        )}
                      </div>

                      {/* Content side — minimal: image, title, CTA */}
                      <div className="flex flex-col justify-center p-6 md:p-8 md:w-1/2 overflow-y-auto relative">
                        {/* Glow accent matching border color */}
                        <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full pointer-events-none ${p.borderColor.replace('border-t-', 'bg-')}`} />

                        <div className="flex flex-wrap gap-2 mb-5">
                          {p.tags.slice(0, 2).map((tag, ti) => (
                            <span key={ti} className="px-2.5 py-1 rounded-full border border-border-glass bg-surface-container-high/40 text-on-surface-variant text-[10px] font-label-code">{tag}</span>
                          ))}
                        </div>

                        <h3 className="font-headline-md text-2xl md:text-3xl text-on-surface mb-6 tracking-tight">{p.title}</h3>

                        <div className="flex items-center gap-3">
                          <button onClick={() => openOverlay(i)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-void-black font-label-code text-xs font-bold hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20">
                            VER_CASO
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                          </button>
                          <span className="text-border-glass font-label-code text-[10px] tracking-widest uppercase opacity-60">+{p.images.length - 1} imágenes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Static right nav */}
            <nav ref={navRef} className="hidden md:flex flex-col justify-center gap-6 shrink-0">
              {projects.map((p, i) => (
                <button
                  key={i}
                  onClick={() => selectProject(i)}
                  className="group flex items-center gap-3 transition-all duration-300 text-left cursor-pointer"
                >
                  <span className={`block rounded-full transition-all duration-500 ${
                    i === activeIndex
                      ? "w-3 h-3 bg-primary shadow-[0_0_10px_rgba(173,198,255,0.6)]"
                      : "w-2 h-2 bg-border-glass group-hover:bg-on-surface-variant"
                  }`} />
                  <span className={`font-label-code transition-all duration-300 text-xs whitespace-nowrap ${
                    i === activeIndex
                      ? "text-primary opacity-100"
                      : "text-on-surface-variant opacity-60 group-hover:opacity-100"
                  }`}>
                    {p.title}
                  </span>
                </button>
              ))}
            </nav>

            {/* Mobile dots */}
            <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => selectProject(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === activeIndex ? "bg-primary w-6" : "bg-border-glass w-2"
                  }`}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Overlay Portal ──────────────────────────────────────────── */}
      {mounted && overlayIndex !== null && overlayProject && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div ref={overlayRef} data-overlay-bg className="absolute inset-0 bg-black cursor-pointer" onClick={closeOverlay} />
          <div ref={panelRef} className="relative z-10 w-full max-w-4xl max-h-[85vh] mx-auto rounded-2xl border border-border-glass shadow-2xl bg-surface-container-low flex flex-col overflow-hidden">
            <div className="relative w-full shrink-0 overflow-hidden bg-black/10">
              {overlayProject.images.length > 0 ? (
                <div className="flex overflow-x-auto gap-2 p-3 md:p-4 snap-x snap-mandatory">
                  {overlayProject.images.map((img, ii) => (
                    <img key={ii} src={img} alt={`${overlayProject.title} ${ii + 1}`} className="snap-start shrink-0 h-[30vh] md:h-[40vh] object-contain rounded-lg bg-black/20" loading="lazy" />
                  ))}
                </div>
              ) : (
                <div className="h-[30vh] md:h-[40vh] flex items-center justify-center">
                  <span className="text-on-surface-variant font-label-code text-sm">SIN_IMAGEN</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-10" />
            </div>
            <div ref={contentRef} className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="panel-fade-item flex flex-wrap gap-2 mb-4">
                {overlayProject.tags.map((tag, ti) => (<span key={ti} className="px-3 py-1 rounded border border-plasma-orange/30 bg-plasma-orange/5 text-plasma-orange text-xs font-label-code">{tag}</span>))}
              </div>
              <h3 className="panel-fade-item font-headline-md text-2xl md:text-3xl text-on-surface mb-4">{overlayProject.title}</h3>
              <div className="panel-fade-item text-on-surface-variant text-sm md:text-base leading-relaxed">
                <RichTextRenderer node={overlayProject.richDescription} />
              </div>
            </div>
            <button onClick={closeOverlay} className="absolute top-4 left-4 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all" aria-label="Close">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
