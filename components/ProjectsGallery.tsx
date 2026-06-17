export default function ProjectsGallery() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/5 border-t border-border-glass">
      <div className="max-w-max-width mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md mb-4 tracking-tighter">
            Featured <span className="text-plasma-orange">Case Studies</span>
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            A selection of digital products where I served as both technical lead and product visionary.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Card 1 */}
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col border-t-4 border-t-plasma-orange hover:scale-[1.02] transition-transform duration-500 bg-surface-container-low">
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyyOUZUG6uGsT3kZFBUczzmv41Yxe1Wfa7wL0cL2YzuWrsKwIx_4NJqDlnz3lDYUhE-cEAEcFWGorbjFafhyEUPaT4OdSIgMmcl-ze1CvbOeRo3Ogol9PhNFtyxmozymlKHmIeRAtgAyxhdm-Z5g6syEMPiCoMDD7sMcblCFLJIpGLZU1wbC0gKLRanRN6z9wbMZnJFkhbfjdfQdANe1fWAyBBh8nWVr8M2EC8Om9d3ujdP9JZrRN5CYZHmhixQ42j1q1MukA7')",
              }}
            ></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 rounded border border-plasma-orange/30 bg-plasma-orange/5 text-plasma-orange text-[10px] font-label-code">NEXT.JS</span>
                <span className="px-2 py-0.5 rounded border border-plasma-orange/30 bg-plasma-orange/5 text-plasma-orange text-[10px] font-label-code">TYPESCRIPT</span>
                <span className="px-2 py-0.5 rounded border border-plasma-orange/30 bg-plasma-orange/5 text-plasma-orange text-[10px] font-label-code">TAILWIND</span>
                <span className="px-2 py-0.5 rounded border border-plasma-orange/30 bg-plasma-orange/5 text-plasma-orange text-[10px] font-label-code">GENKIT</span>
              </div>
              <h3 className="font-headline-md text-xl text-on-surface mb-3">Nexus Portfolio</h3>
              <p className="text-on-surface-variant text-sm line-clamp-3">A high-performance portfolio with an integrated Genkit Digital Twin chat and...</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col border-t-4 border-t-primary hover:scale-[1.02] transition-transform duration-500 bg-surface-container-low">
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqkiqAd4ZHyXUhjjGaCNmMmOtvvIdZARNlQ3-oD33mGOMt77kv939oNfDIaGJSWyg2bziOcP5dab2un-oQygpL4rDKiftlgdyV3FZ_DNo1Sb0I2dV01_gA2kQ6q7XXP2lNKmGVC2QDsoBmPeLouosskjpuiHOUJyY3vCnp88E4cfklkV54U200Hwfcb3KlZyVS7Ph77SwS4bI2IvedAD08ZoZE0x-6M7tEeLw2mVnkPjQIvi2kyGSvZh3y8sa2cvbSZ9a4hp73')",
              }}
            ></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/5 text-primary text-[10px] font-label-code">REACT</span>
                <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/5 text-primary text-[10px] font-label-code">NODE.JS</span>
                <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/5 text-primary text-[10px] font-label-code">POSTGRESQL</span>
                <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/5 text-primary text-[10px] font-label-code">GCP</span>
              </div>
              <h3 className="font-headline-md text-xl text-on-surface mb-3">Enterprise Shop Redesign</h3>
              <p className="text-on-surface-variant text-sm line-clamp-3">Leading the redesign of a major e-commerce platform focusing on core web vitals and...</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col border-t-4 border-t-secondary hover:scale-[1.02] transition-transform duration-500 bg-surface-container-low">
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjg6nzyIO7IT9-ekXxVSRyvYIJf6b21TPlrV_RYicb_THgreirm67sc-yw03o7H1yNv1QQG3vQY1aRmwNhbIpUuptcn4mHPr3ZMlPgN0kPAVilkmQli24KIiVBra7mfoGyphaD8Hjt8MP8_G7L0V3pPVXyhuQyGUQn9r3rOarRgv6D3kbz6jKnfM5wZHfvBzg_U5Q0Tk0CeaUxVF-DBSjnvFJLwlC8W2bwHTz4AM5jo_OD8vvG0ojhrvlM2fVSvFFyFA0dNJ5c')",
              }}
            ></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 rounded border border-secondary/30 bg-secondary/5 text-secondary text-[10px] font-label-code">SPRING BOOT</span>
                <span className="px-2 py-0.5 rounded border border-secondary/30 bg-secondary/5 text-secondary text-[10px] font-label-code">REACT</span>
                <span className="px-2 py-0.5 rounded border border-secondary/30 bg-secondary/5 text-secondary text-[10px] font-label-code">MONGODB</span>
                <span className="px-2 py-0.5 rounded border border-secondary/30 bg-secondary/5 text-secondary text-[10px] font-label-code">AWS</span>
              </div>
              <h3 className="font-headline-md text-xl text-on-surface mb-3">HealthConnect SaaS</h3>
              <p className="text-on-surface-variant text-sm line-clamp-3">HIPAA compliant management system for mid-size clinics to automate patient...</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col border-t-4 border-t-primary hover:scale-[1.02] transition-transform duration-500 bg-surface-container-low">
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlfjZZ4tAOzuiXNaqLpKY-T2v4pQISN7_YEvx2e6jyy7vM561lvgzrFsiNScoNj090IyhrecUWo_4ZmFIKCPl6TyE-lFLfNjLX6b1ehqrMvbccgpLT48tdqfwgtuSzdtd2gU5KftFN2-qnE6h043t0096OS-7pGSgGzOlLTVaHF8jyDgDHfWGAig_QoGIqacpwIZkN4eORjOOZuRHWcrjPaFmV7ghEjr1S7d-s40bhUL7KUwry7khVBulRmuewfgGttv7-SnoL')",
              }}
            ></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/5 text-primary text-[10px] font-label-code">REACT</span>
                <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/5 text-primary text-[10px] font-label-code">WEBGL</span>
                <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/5 text-primary text-[10px] font-label-code">TYPESCRIPT</span>
              </div>
              <h3 className="font-headline-md text-xl text-on-surface mb-3">Aether OS v1.0</h3>
              <p className="text-on-surface-variant text-sm line-clamp-3">A next-gen agent operating system built with React and WebGL for high-performance spatial computing.</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col border-t-4 border-t-secondary hover:scale-[1.02] transition-transform duration-500 bg-surface-container-low">
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPK8yUptRfN1t2CzyB5OxBEMwiBmIFmsXPrPEij2Nic026EhB5gax729DwT5ST_7NR1m18VQOcCjy7bxIVYUXiqxcP84mOc0sdI17qSmMT6lEGcNe9YgVQTAmnQIhSZ-32VesH0wO6a7WwFrXff9YaxuCUDtqgnkZMlkB4n1tG7sD2xSLNXhXOpDZIDzjAgodwQLBSBOL4WuYuMybM0YrbpHGHTrvA0WECWZHEUKiQt6WKBGwNMyXRxjXRBR-3MSeymbtwDtn_')",
              }}
            ></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 rounded border border-secondary/30 bg-secondary/5 text-secondary text-[10px] font-label-code">NEXT.JS</span>
                <span className="px-2 py-0.5 rounded border border-secondary/30 bg-secondary/5 text-secondary text-[10px] font-label-code">D3.JS</span>
                <span className="px-2 py-0.5 rounded border border-secondary/30 bg-secondary/5 text-secondary text-[10px] font-label-code">PYTHON</span>
              </div>
              <h3 className="font-headline-md text-xl text-on-surface mb-3">Quantum Analytics Dashboard</h3>
              <p className="text-on-surface-variant text-sm line-clamp-3">Real-time data visualization platform for quantum computing research and complex system monitoring.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
