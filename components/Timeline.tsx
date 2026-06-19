const timelineData = [
  {
    role: "Sr. Technical Product Owner",
    company: "Viva Aerobus",
    date: "Jul 2024 - Apr 2026",
    description: "Definition of API standards and core/satellite integrations. Front-End technical leadership (architecture, UI/UX, web performance). Management of technical backlog, SDLC (CI/CD, Testing), external providers, and QA (E2E) strategies.",
    stack: ["Python", "NodeJS", "AWS", "Azure", "GitLab CI/CD", "Akamai", "Datadog", "RDS", "DynamoDB", "MongoDB"],
  },
  {
    role: "E-commerce Specialist Consultant",
    company: "Profuturo",
    date: "Oct 2021 - Jun 2024",
    description: "Cloud architecture design and e-commerce leadership. WCAG 2.1 AA regulatory compliance and UX optimization. KPI/data-driven strategy. Workflow automation with Adobe Marketo and E2E testing.",
    stack: ["Python", "NodeJS", "Vue.js", "React.js", "Next.js", "HTML/CSS", "MS SQL Server", "MongoDB", "OpenShift", "GitHub CI/CD", "Cloudflare", "Dynatrace"],
  },
  {
    role: "Tech Lead / Full Stack Web Developer",
    company: "Catorce Días Agency",
    date: "Apr 2015 - Jun 2021",
    description: "Requirements analysis (Design Sprint), estimations, database design, and full-stack/mobile development. Server and cloud infrastructure administration.",
    stack: ["NodeJS", "PHP", "MySQL", "MongoDB", "Redis", "ReactJS", "React Native", "Dialogflow", "Docker", "AWS", "Azure", "Nginx", "Jenkins", "Git"],
  },
  {
    role: "Sr. Full Stack Web Developer",
    company: "Quiminet.com",
    date: "Aug 2014 - Feb 2015",
    description: "Development and maintenance of web applications with NodeJS, Express, PHP, Handlebars, JQuery, MySQL, MongoDB, and Redis.",
    stack: ["NodeJS", "Express", "PHP", "Handlebars", "JQuery", "MySQL", "MongoDB", "Redis"],
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="max-w-max-width mx-auto px-margin-desktop py-24">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="font-headline-md text-headline-md mb-12 flex items-center justify-center gap-4">
          <span className="text-primary font-label-code text-sm tracking-widest">[ 01 ]</span>
          CORE_TIMELINE
        </h2>
        <div className="space-y-12 relative">
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent"></div>
          
          {timelineData.map((item, index) => (
            <div key={index} className="relative pl-12">
              <div className={`absolute left-0 top-2 w-8 h-8 rounded-full bg-void-black border-2 ${index % 2 === 0 ? 'border-primary' : 'border-secondary'} flex items-center justify-center z-10`}>
                <div className={`w-2 h-2 ${index % 2 === 0 ? 'bg-primary' : 'bg-secondary'} rounded-full ${index === 0 ? 'animate-pulse' : ''}`}></div>
              </div>
              <div className="glass-panel p-6 rounded-xl hover:bg-surface-container-low transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-headline-md text-xl ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>{item.role}</h3>
                  <span className={`font-label-code text-label-code ${index % 2 === 0 ? 'text-secondary' : 'text-on-surface-variant'}`}>{item.date}</span>
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
