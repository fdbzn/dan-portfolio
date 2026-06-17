export default function TechnicalArsenal() {
  return (
    <section className="max-w-max-width mx-auto px-margin-desktop py-24 border-t border-border-glass">
      <h2 className="font-headline-md text-headline-md mb-12 flex items-center justify-center gap-4">
        <span className="text-secondary font-label-code text-sm tracking-widest">[ 02 ]</span>
        TECHNICAL_ARSENAL
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Management Card */}
        <div className="glass-panel p-6 rounded-xl bg-surface-container-low/50 border border-border-glass hover:border-primary/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-sm">account_tree</span>
            </div>
            <h3 className="font-headline-md text-lg text-on-surface">Management</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-primary">AGILE/SCRUM</span>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-primary">ROADMAPPING</span>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-primary">STAKEHOLDER_MGMT</span>
          </div>
        </div>

        {/* Frontend Card */}
        <div className="glass-panel p-6 rounded-xl bg-surface-container-low/50 border border-border-glass hover:border-secondary/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-secondary/10 border border-secondary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-sm">code</span>
            </div>
            <h3 className="font-headline-md text-lg text-on-surface">Frontend</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-secondary">REACT</span>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-secondary">TYPESCRIPT</span>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-secondary">TAILWIND_CSS</span>
          </div>
        </div>

        {/* Backend Card */}
        <div className="glass-panel p-6 rounded-xl bg-surface-container-low/50 border border-border-glass hover:border-primary/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-sm">database</span>
            </div>
            <h3 className="font-headline-md text-lg text-on-surface">Backend</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-primary">NODE.JS</span>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-primary">PYTHON</span>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-primary">POSTGRESQL</span>
          </div>
        </div>

        {/* DevOps Card */}
        <div className="glass-panel p-6 rounded-xl bg-surface-container-low/50 border border-border-glass hover:border-secondary/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-secondary/10 border border-secondary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-sm">cloud</span>
            </div>
            <h3 className="font-headline-md text-lg text-on-surface">DevOps</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-secondary">DOCKER/K8S</span>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-secondary">AWS</span>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass text-secondary">CI/CD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
