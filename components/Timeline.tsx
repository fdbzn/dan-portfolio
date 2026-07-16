"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const timelineData = [
  {
    role: "Sr. Technical Product Owner",
    company: "Viva Aerobus",
    date: "Jul 2024 - Abr 2026",
    description: "Definición de estándares de API e integraciones core/satélite. Liderazgo técnico Front-End (arquitectura, UI/UX, rendimiento web). Gestión del backlog técnico, SDLC (CI/CD, Testing), proveedores externos y estrategias de QA (E2E).",
    stack: ["Python", "NodeJS", "AWS", "Azure", "GitLab CI/CD", "Akamai", "Datadog", "RDS", "DynamoDB", "MongoDB"],
  },
  {
    role: "Consultor Especialista en E-commerce",
    company: "Profuturo",
    date: "Oct 2021 - Jun 2024",
    description: "Diseño de arquitectura cloud y liderazgo en e-commerce. Cumplimiento regulatorio WCAG 2.1 AA y optimización UX. Estrategia basada en KPI/datos. Automatización de flujos de trabajo con Adobe Marketo y testing E2E.",
    stack: ["Python", "NodeJS", "Vue.js", "React.js", "Next.js", "HTML/CSS", "MS SQL Server", "MongoDB", "OpenShift", "GitHub CI/CD", "Cloudflare", "Dynatrace"],
  },
  {
    role: "Tech Lead / Full Stack Web Developer",
    company: "Agencia Catorce Días",
    date: "Abr 2015 - Jun 2021",
    description: "Análisis de requerimientos (Design Sprint), estimaciones, diseño de bases de datos y desarrollo full-stack/mobile. Administración de servidores e infraestructura cloud.",
    stack: ["NodeJS", "PHP", "MySQL", "MongoDB", "Redis", "ReactJS", "React Native", "Dialogflow", "Docker", "AWS", "Azure", "Nginx", "Jenkins", "Git"],
  },
  {
    role: "Sr. Full Stack Web Developer",
    company: "Quiminet.com",
    date: "Ago 2014 - Feb 2015",
    description: "Desarrollo y mantenimiento de aplicaciones web con NodeJS, Express, PHP, Handlebars, JQuery, MySQL, MongoDB y Redis.",
    stack: ["NodeJS", "Express", "PHP", "Handlebars", "JQuery", "MySQL", "MongoDB", "Redis"],
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Scroll-linked progress line — draws from top to bottom
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1.2,
            },
          },
        );
      }

      // 2. Staggered card reveal — fade in + slide up chronologically
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="timeline" className="scroll-mt-28 md:scroll-mt-24 max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="font-headline-md text-2xl md:text-headline-md mb-8 md:mb-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-primary font-label-code text-sm tracking-widest">[ 01 ]</span>
          LINEA_DE_TIEMPO
        </h2>
        <div className="space-y-8 md:space-y-12 relative">
          {/* Animated progress line */}
          <div
            ref={lineRef}
            className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent"
            style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
          ></div>

          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el!;
              }}
              className="relative pl-10 md:pl-12"
            >
              {/* Dot marker */}
              <div className={`absolute left-0 top-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-void-black border-2 ${index % 2 === 0 ? 'border-primary' : 'border-secondary'} flex items-center justify-center z-10`}>
                <div className={`w-2 h-2 ${index % 2 === 0 ? 'bg-primary' : 'bg-secondary'} rounded-full ${index === 0 ? 'animate-pulse' : ''}`}></div>
              </div>
              {/* Card */}
              <div className="glass-panel p-4 md:p-6 rounded-xl hover:bg-surface-container-low transition-colors group">
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div className="min-w-0">
                    <h3 className={`font-headline-md text-lg md:text-xl ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>{item.role}</h3>
                    <p className="font-label-code text-xs md:text-sm text-on-surface-variant mt-1">{item.company}</p>
                  </div>
                  <span className={`font-label-code text-xs md:text-label-code shrink-0 ${index % 2 === 0 ? 'text-secondary' : 'text-on-surface-variant'}`}>{item.date}</span>
                </div>
                <p className="text-on-surface-variant mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.stack.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
