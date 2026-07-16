"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import type { Project } from "@/types/project";

// ── Config ───────────────────────────────────────────────────
const MAX_STACK_ITEMS = 3;
const STACK_ROTATIONS = [0, 2, -4]; // deg, per image index
const STACK_Y = [0, 2, 5];          // px offset per image index

// ── Card Image Stack ──────────────────────────────────────────
function CardImageStack({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mm = useRef<gsap.MatchMedia | null>(null);

  // Stack only for 2+ images
  const visible = images.slice(0, MAX_STACK_ITEMS);
  const isStack = visible.length >= 2;

  useEffect(() => {
    if (!isStack || !containerRef.current) return;

    mm.current = gsap.matchMedia();
    mm.current.add("(prefers-reduced-motion: no-preference)", () => {
      const els = itemsRef.current.filter(Boolean) as HTMLDivElement[];

      const fanOut = () => {
        gsap.to(els, {
          y: (i) => STACK_Y[i] * -2,
          rotation: (i) => STACK_ROTATIONS[i] * 1.5,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const fanIn = () => {
        gsap.to(els, {
          y: 0,
          rotation: 0,
          duration: 0.3,
          stagger: 0.03,
          ease: "power2.in",
          overwrite: "auto",
        });
      };

      const el = containerRef.current;
      el.addEventListener("mouseenter", fanOut);
      el.addEventListener("mouseleave", fanIn);

      return () => {
        el.removeEventListener("mouseenter", fanOut);
        el.removeEventListener("mouseleave", fanIn);
      };
    });

    return () => mm.current?.revert();
  }, [isStack]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video overflow-hidden"
    >
      {visible.map((url, i) => (
        <div
          key={i}
          ref={(el) => { itemsRef.current[i] = el; }}
          className="absolute inset-0 flex items-center justify-center transition-shadow duration-300"
          style={{
            zIndex: visible.length - i,
            // Base stack offset (collapsed state)
            transform: isStack
              ? `translateY(${STACK_Y[i]}px) rotate(${STACK_ROTATIONS[i]}deg)`
              : undefined,
          }}
        >
          <img
            src={url}
            alt={`Project image ${i + 1}`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ))}
      {/* Gradient overlay at bottom for readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
}

// ── Modal Gallery (horizontal scroll-snap) ──────────────────────
function ModalImageGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  // Sync active dot on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || images.length < 2) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!isNaN(idx)) setCurrent(idx);
          }
        }
      },
      { root: el, threshold: 0.6 },
    );
    const children = el.querySelectorAll("[data-idx]");
    children.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [images]);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.querySelector<HTMLDivElement>(`[data-idx="${idx}"]`);
    if (!child) return;
    child.scrollIntoView({ behavior: "smooth", inline: "start" });
  }, []);

  if (images.length === 0) {
    return (
      <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
        <span className="text-on-surface-variant font-label-code text-sm">NO_IMAGE_AVAILABLE</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black/10">
      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory h-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((url, i) => (
          <div
            key={i}
            data-idx={i}
            className="snap-start shrink-0 w-full h-full flex items-center justify-center bg-black/20"
          >
            <img
              src={url}
              alt={`Project screenshot ${i + 1}`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-10" />

      {/* Navigation arrows */}
      {images.length >= 2 && (
        <>
          <button
            onClick={() => scrollTo(current - 1)}
            disabled={current === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/60 transition-all hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Previous image"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button
            onClick={() => scrollTo(current + 1)}
            disabled={current === images.length - 1}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/60 transition-all hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Next image"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </>
      )}

      {/* Dots */}
      {images.length >= 2 && (
        <div
          ref={dotsRef}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-white w-5 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  : "bg-white/40 hover:bg-white/70 w-2"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {images.length >= 2 && (
        <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
          <span className="text-white/80 text-xs font-label-code tabular-nums">
            {current + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    return () => { animRef.current?.kill(); void 0; };
  }, []);

  // ── Open: animate panel in from card position ──────────────
  const openModal = useCallback((index: number) => {
    const card = document.querySelector<HTMLDivElement>(`[data-card="${index}"]`);
    if (!card) return;
    setSelectedIndex(index);
    const rect = card.getBoundingClientRect();
    card.dataset.rect = JSON.stringify({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
  }, []);

  // ── Run open animation after render ────────────────────────
  useEffect(() => {
    if (selectedIndex === null || !panelRef.current || !overlayRef.current) return;

    const card = document.querySelector<HTMLDivElement>(`[data-card="${selectedIndex}"]`);
    if (!card) return;
    const raw = card.dataset.rect;
    if (!raw) return;
    const rect = JSON.parse(raw) as { top: number; left: number; width: number; height: number };

    animRef.current?.kill();

    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const overlay = overlayRef.current;

    gsap.set(panel, {
      autoAlpha: 1,
      scaleX: 0,
      scaleY: 0,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      transformOrigin: "center center",
    });
    gsap.set(overlay, { autoAlpha: 0 });

    const tl = gsap.timeline();

    // Overlay fade
    tl.to(overlay, { autoAlpha: 0.65, duration: 0.3 }, 0);

    // Panel zoom in
    tl.to(panel, { scaleX: 1, scaleY: 1, x: 0, y: 0, duration: 0.6, ease: "power3.inOut" }, 0);

    // Content stagger
    const items = panel.querySelectorAll(".panel-fade-item");
    if (items.length) {
      tl.fromTo(items, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=0.2");
    }

    animRef.current = tl;
  }, [selectedIndex]);

  // ── Close ──────────────────────────────────────────────────
  const closeModal = useCallback(() => {
    if (selectedIndex === null || !panelRef.current || !overlayRef.current) return;

    animRef.current?.kill();

    const card = document.querySelector<HTMLDivElement>(`[data-card="${selectedIndex}"]`);
    let rx = 0, ry = 0;
    if (card) {
      const r = card.getBoundingClientRect();
      rx = r.left + r.width / 2;
      ry = r.top + r.height / 2;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        gsap.set(panelRef.current, { autoAlpha: 0 });
        setSelectedIndex(null);
      },
    });

    tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.25 }, 0);
    tl.to(panelRef.current, { scaleX: 0, scaleY: 0, x: rx, y: ry, duration: 0.4, ease: "power3.inOut" }, 0);

    animRef.current = tl;
  }, [selectedIndex]);

  // ── Escape key ─────────────────────────────────────────────
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, closeModal]);

  useEffect(() => {
    return () => { document.body.style.overflow = ""; void 0; };
  }, []);

  const project = selectedIndex !== null ? projects[selectedIndex] : null;

  return (
    <>
      <section
        id="projects"
        className="scroll-mt-28 md:scroll-mt-24 py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/5 border-t border-border-glass"
      >
        <div className="max-w-max-width mx-auto">
          <div className="text-center mb-10 md:mb-16 px-2">
            <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md mb-3 md:mb-4 tracking-tighter">
              Featured <span className="text-plasma-orange">Case Studies</span>
            </h2>
            <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              A selection of digital products where I served as both technical
              lead and product visionary.
            </p>
          </div>

          {/* ── Grid ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-gutter">
            {projects.map((p, i) => (
              <div
                key={i}
                data-card={i}
                onClick={() => openModal(i)}
                className={`glass-panel rounded-xl overflow-hidden flex flex-col border-t-4 ${p.borderColor} hover:scale-[1.02] transition-transform duration-500 bg-surface-container-low cursor-pointer group`}
              >
                {/* Image stack preview */}
                <CardImageStack images={p.images} />

                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.slice(0, 3).map((tag, ti) => (
                      <span
                        key={ti}
                        className="px-2 py-0.5 rounded border border-plasma-orange/30 bg-plasma-orange/5 text-plasma-orange text-[10px] font-label-code"
                      >
                        {tag}
                      </span>
                    ))}
                    {p.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded border border-border-glass bg-surface-container-high/50 text-on-surface-variant text-[10px] font-label-code">
                        +{p.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline-md text-lg md:text-xl text-on-surface mb-2 md:mb-3">
                    {p.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm line-clamp-3">
                    {p.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-label-code text-primary hover:text-primary-fixed-dim transition-colors">
                      VIEW_CASE_STUDY
                      <span className="material-symbols-outlined text-sm">
                        open_in_new
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal Portal ────────────────────────────────────────── */}
      {mounted &&
        selectedIndex !== null &&
        project &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black cursor-pointer"
              onClick={closeModal}
            />

            {/* Panel — image ~50%/scrollable text below */}
            <div
              ref={panelRef}
              className="relative z-10 w-full max-w-4xl max-h-[85vh] mx-auto rounded-2xl border border-border-glass shadow-2xl bg-surface-container-low flex flex-col overflow-hidden"
              style={{ visibility: "hidden" }}
            >
              {/* Image gallery section — capped at ~50% viewport */}
              <div className="relative w-full h-[40vh] min-h-[240px] max-h-[50vh] shrink-0">
                <ModalImageGallery images={project.images} />
              </div>

              {/* Text content — scrollable */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {/* Tags */}
                <div className="panel-fade-item flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="px-3 py-1 rounded border border-plasma-orange/30 bg-plasma-orange/5 text-plasma-orange text-xs font-label-code"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="panel-fade-item font-headline-md text-2xl md:text-3xl text-on-surface mb-4">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="panel-fade-item text-on-surface-variant text-sm md:text-base leading-relaxed mb-6">
                  {project.fullDescription}
                </p>

                {/* Highlights */}
                <div className="panel-fade-item space-y-4">
                  <h4 className="font-label-code text-sm text-primary tracking-widest uppercase">
                    KEY_HIGHLIGHTS
                  </h4>
                  <ul className="space-y-3">
                    {project.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="flex items-start gap-3 text-sm md:text-base text-on-surface"
                      >
                        <span className="text-primary mt-1 shrink-0">◆</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 left-4 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
