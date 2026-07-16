"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const NAV_SECTIONS = [
  { href: "#timeline", label: "TIMELINE" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#skills", label: "SKILLS" },
  { href: "#contact", label: "CONTACT" },
] as const;

const SECTION_IDS = NAV_SECTIONS.map((s) => s.href.slice(1));
const HEADER_OFFSET = 112;

export default function Header() {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);
  const headerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── IntersectionObserver: track which section is in view ──────
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: `-${HEADER_OFFSET}px 0px -40% 0px`,
      threshold: 0,
    });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // ── Smooth scroll handler ─────────────────────────────────────
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      const target = document.getElementById(sectionId);
      if (!target) return;

      gsap.to(window, {
        scrollTo: { y: target, offsetY: HEADER_OFFSET },
        duration: 1.2,
        ease: "power3.inOut",
      });
    },
    [],
  );

  const linkClass = (sectionId: string, isMobile: boolean) => {
    const isActive = activeSection === sectionId;
    if (isMobile) {
      return isActive
        ? "text-primary border-b border-primary pb-0.5"
        : "text-on-surface-variant";
    }
    return isActive
      ? "text-primary border-b-2 border-primary pb-1"
      : "text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-300";
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50 bg-surface-glass backdrop-blur-xl border-b border-border-glass"
    >
      <nav className="flex justify-between items-center max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-3 md:py-4">
        <div className="text-xl sm:text-2xl font-display-lg-mobile tracking-tighter text-primary min-w-0"></div>
        <div className="hidden md:flex items-center gap-gutter font-label-code text-label-code">
          {NAV_SECTIONS.map((link) => (
            <a
              key={link.href}
              className={linkClass(link.href.slice(1), false)}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href.slice(1))}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
      <div className="md:hidden border-t border-border-glass/50 px-margin-mobile py-2.5 overflow-x-auto">
        <div className="flex items-center gap-5 font-label-code text-xs whitespace-nowrap">
          {NAV_SECTIONS.map((link) => (
            <a
              key={link.href}
              className={linkClass(link.href.slice(1), true)}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href.slice(1))}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
