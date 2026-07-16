"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const projects = [
  {
    title: "Viva Aerobus Projects",
    description:
      "Definition of API standards and core/satellite integrations for projects like Avasa (Rental Car), Events, Insurance (Hopper, Telasist), Uber, Taxis MTY, Shuttles.",
    fullDescription:
      "As Sr. Technical Product Owner at Viva Aerobus, I led the definition of API standards and core/satellite integrations across multiple high-impact projects. I drove Front-End technical leadership covering architecture, UI/UX, and web performance optimization, while managing the technical backlog, SDLC processes, CI/CD pipelines, external provider relationships, and QA (E2E) strategies.",
    tags: ["Python", "NodeJS", "AWS", "Azure", "GitLab CI/CD"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyyOUZUG6uGsT3kZFBUczzmv41Yxe1Wfa7wL0cL2YzuWrsKwIx_4NJqDlnz3lDYUhE-cEAEcFWGorbjFafhyEUPaT4OdSIgMmcl-ze1CvbOeRo3Ogol9PhNFtyxmozymlKHmIeRAtgAyxhdm-Z5g6syEMPiCoMDD7sMcblCFLJIpGLZU1wbC0gKLRanRN6z9wbMZnJFkhbfjdfQdANe1fWAyBBh8nWVr8M2EC8Om9d3ujdP9JZrRN5CYZHmhixQ42j1q1MukA7",
    borderColor: "border-t-plasma-orange",
    highlights: [
      "Led API standardization across 7+ integration partners",
      "Defined core/satellite architecture for microservices",
      "Managed technical backlog and cross-team coordination",
      "Implemented CI/CD pipelines and QA strategies",
    ],
  },
  {
    title: "Profuturo E-commerce",
    description:
      "Cloud architecture design and e-commerce leadership for projects like E-commerce Site, Loyalty, Lead Scoring, Data Leak, Loans, WhatsApp, Callcenter.",
    fullDescription:
      "As E-commerce Specialist Consultant at Profuturo, I designed cloud architectures and led e-commerce initiatives across multiple digital products. I ensured WCAG 2.1 AA regulatory compliance while optimizing UX through data-driven strategies. I automated marketing workflows with Adobe Marketo and implemented comprehensive E2E testing frameworks.",
    tags: ["Python", "NodeJS", "Vue.js", "React.js", "Next.js"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqkiqAd4ZHyXUhjjGaCNmMmOtvvIdZARNlQ3-oD33mGOMt77kv939oNfDIaGJSWyg2bziOcP5dab2un-oQygpL4rDKiftlgdyV3FZ_DNo1Sb0I2dV01_gA2kQ6q7XXP2lNKmGVC2QDsoBmPeLouosskjpuiHOUJyY3vCnp88E4cfklkV54U200Hwfcb3KlZyVS7Ph77SwS4bI2IvedAD08ZoZE0x-6M7tEeLw2mVnkPjQIvi2kyGSvZh3y8sa2cvbSZ9a4hp73",
    borderColor: "border-t-primary",
    highlights: [
      "Architected cloud-native e-commerce platform serving 4M+ users",
      "Achieved WCAG 2.1 AA compliance across all user flows",
      "Drove data-driven UX optimization increasing conversion by 25%",
      "Automated marketing workflows with Adobe Marketo integration",
    ],
  },
  {
    title: "Catorce Días Agency Projects",
    description:
      "Requirements analysis, estimates, database design and full-stack/mobile development for clients like Philadelphia, Oreo, Tang, KFC, OfficeMax, Nestlé Nido, Trident.",
    fullDescription:
      "As Tech Lead and Full Stack Developer at Catorce Días Agency, I led requirements analysis through Design Sprint methodologies, provided accurate estimations, designed databases, and delivered full-stack web and mobile solutions for Fortune 500 brands. I also managed server and cloud infrastructure administration across AWS and Azure.",
    tags: ["NodeJS", "PHP", "MySQL", "MongoDB", "React Native"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjg6nzyIO7IT9-ekXxVSRyvYIJf6b21TPlrV_RYicb_THgreirm67sc-yw03o7H1yNv1QQG3vQY1aRmwNhbIpUuptcn4mHPr3ZMlPgN0kPAVilkmQli24KIiVBra7mfoGyphaD8Hjt8MP8_G7L0V3pPVXyhuQyGUQn9r3rOarRgv6D3kbz6jKnfM5wZHfvBzg_U5Q0Tk0CeaUxVF-DBSjnvFJLwlC8W2bwHTz4AM5jo_OD8vvG0ojhrvlM2fVSvFFyFA0dNJ5c",
    borderColor: "border-t-secondary",
    highlights: [
      "Delivered 15+ projects for Fortune 500 brands",
      "Led full-stack teams across web and mobile (React Native)",
      "Designed databases and cloud infrastructure for scalability",
      "Managed end-to-end delivery from Design Sprint to deployment",
    ],
  },
];

export default function ProjectsGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => { animRef.current?.kill(); void 0; };
  }, []);

  // ── Open: animate panel in from card position ──────────────
  const openModal = useCallback((index: number) => {
    const card = document.querySelector<HTMLDivElement>(`[data-card="${index}"]`);
    if (!card) return;
    setSelectedIndex(index);
    // card rect will be read in the post-render effect
    // store it temporarily on the ref
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

    // Start from card position, slightly scaled down
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
    tl.to(panel, {
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.inOut",
    }, 0);

    // Content stagger
    const items = panel.querySelectorAll(".panel-fade-item");
    if (items.length) {
      tl.fromTo(
        items,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05 },
        "-=0.2",
      );
    }

    animRef.current = tl;
  }, [selectedIndex]);

  // ── Close ──────────────────────────────────────────────────
  const closeModal = useCallback(() => {
    if (selectedIndex === null || !panelRef.current || !overlayRef.current) return;

    animRef.current?.kill();

    // Get card rect again for reverse animation
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
    tl.to(
      panelRef.current,
      {
        scaleX: 0,
        scaleY: 0,
        x: rx,
        y: ry,
        duration: 0.4,
        ease: "power3.inOut",
      },
      0,
    );

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
                <div
                  className="h-40 md:h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black cursor-pointer"
              onClick={closeModal}
            />

            {/* Panel */}
            <div
              ref={panelRef}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] mx-4 overflow-y-auto rounded-2xl border border-border-glass shadow-2xl bg-surface-container-low"
              style={{ visibility: "hidden" }}
            >
              {/* Hero image */}
              <div
                className="panel-fade-item w-full h-48 md:h-56 bg-cover bg-center rounded-t-2xl"
                style={{ backgroundImage: `url('${project.image}')` }}
              />

              <div className="p-6 md:p-8">
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

              {/* Close button inside panel */}
              <button
                onClick={closeModal}
                className="panel-fade-item absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
