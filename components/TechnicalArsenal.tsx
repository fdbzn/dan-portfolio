const technicalSkills = [
  {
    category: "Soft Skills",
    icon: "account_tree",
    color: "primary",
    skills: ["Effective Communication", "Technical Leadership", "Analytical Thinking", "Results-Oriented"]
  },
  {
    category: "Hard Skills",
    icon: "code",
    color: "secondary",
    skills: ["Web Application Architecture", "WPO", "Component Standardization", "CI/CD"]
  },
  {
    category: "Backend",
    icon: "database",
    color: "primary",
    skills: ["NodeJS", "Python", "PHP", "MySQL", "MongoDB", "Redis"]
  },
  {
    category: "DevOps",
    icon: "cloud",
    color: "secondary",
    skills: ["AWS", "Azure", "Docker", "GitLab CI/CD", "Jenkins", "GitHub CI/CD"]
  }
];

export default function TechnicalArsenal() {
  return (
    <section id="skills" className="max-w-max-width mx-auto px-margin-desktop py-24 border-t border-border-glass">
      <h2 className="font-headline-md text-headline-md mb-12 flex items-center justify-center gap-4">
        <span className="text-secondary font-label-code text-sm tracking-widest">[ 02 ]</span>
        TECHNICAL_ARSENAL
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {technicalSkills.map((category, index) => (
          <div key={index} className={`glass-panel p-6 rounded-xl bg-surface-container-low/50 border border-border-glass hover:border-${category.color}/50 transition-all duration-300`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded bg-${category.color}/10 border border-${category.color}/30 flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-${category.color} text-sm`}>{category.icon}</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface">{category.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span key={i} className={`px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-${category.color}`}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
