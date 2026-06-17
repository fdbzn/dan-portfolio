export default function Timeline() {
  return (
    <section className="max-w-max-width mx-auto px-margin-desktop py-24">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="font-headline-md text-headline-md mb-12 flex items-center justify-center gap-4">
          <span className="text-primary font-label-code text-sm tracking-widest">[ 01 ]</span>
          CORE_TIMELINE
        </h2>
        <div className="space-y-12 relative">
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent"></div>
          
          {/* Timeline Item 1 */}
          <div className="relative pl-12">
            <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-void-black border-2 border-primary flex items-center justify-center z-10">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div className="glass-panel p-6 rounded-xl hover:bg-surface-container-low transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-md text-xl text-primary">Senior Staff Architect</h3>
                <span className="font-label-code text-label-code text-secondary">2022 - PRESENT</span>
              </div>
              <p className="text-on-surface-variant mb-4">
                Overseeing the evolution of high-performance distributed systems. Mentoring 15+ engineers and defining the long-term technical roadmap for the Core Platform division.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">KUBERNETES</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">GOLANG</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">TERRAFORM</span>
              </div>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="relative pl-12">
            <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-void-black border-2 border-secondary flex items-center justify-center z-10">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
            </div>
            <div className="glass-panel p-6 rounded-xl hover:bg-surface-container-low transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-md text-xl text-secondary">Lead Product Owner</h3>
                <span className="font-label-code text-label-code text-on-surface-variant">2019 - 2022</span>
              </div>
              <p className="text-on-surface-variant mb-4">
                Bridged the gap between technical complexity and business value. Successfully delivered 4 major product cycles with a focus on developer experience (DX).
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">AGILE</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">STRATEGY</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">UI/UX</span>
              </div>
            </div>
          </div>

          {/* Timeline Item 3 */}
          <div className="relative pl-12">
            <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-void-black border-2 border-primary flex items-center justify-center z-10">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
            <div className="glass-panel p-6 rounded-xl hover:bg-surface-container-low transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-md text-xl text-primary">Senior Systems Architect</h3>
                <span className="font-label-code text-label-code text-on-surface-variant">2017 - 2019</span>
              </div>
              <p className="text-on-surface-variant mb-4">
                Led the design of a globally distributed microservices architecture for a fintech unicorn, achieving 99.99% uptime during peak loads. Orchestrated multi-region Kubernetes clusters.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">KUBERNETES</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">GO</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">TERRAFORM</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">GCP</span>
              </div>
            </div>
          </div>

          {/* Timeline Item 4 */}
          <div className="relative pl-12">
            <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-void-black border-2 border-secondary flex items-center justify-center z-10">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
            </div>
            <div className="glass-panel p-6 rounded-xl hover:bg-surface-container-low transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-md text-xl text-secondary">Full-stack Engineer</h3>
                <span className="font-label-code text-label-code text-on-surface-variant">2014 - 2017</span>
              </div>
              <p className="text-on-surface-variant mb-4">
                Developed core features for an AI-driven predictive analytics platform. Specialized in high-performance data visualization and real-time streaming pipelines.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">REACT</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">NODE.JS</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">POSTGRESQL</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-code border border-border-glass">REDIS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
