const projects = [
  {
    title: "Viva Aerobus Projects",
    description: "Definition of API standards and core/satellite integrations for projects like Avasa (Rental Car), Events, Insurance (Hopper, Telasist), Uber, Taxis MTY, Shuttles.",
    tags: ["Python", "NodeJS", "AWS", "Azure", "GitLab CI/CD"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyyOUZUG6uGsT3kZFBUczzmv41Yxe1Wfa7wL0cL2YzuWrsKwIx_4NJqDlnz3lDYUhE-cEAEcFWGorbjFafhyEUPaT4OdSIgMmcl-ze1CvbOeRo3Ogol9PhNFtyxmozymlKHmIeRAtgAyxhdm-Z5g6syEMPiCoMDD7sMcblCFLJIpGLZU1wbC0gKLRanRN6z9wbMZnJFkhbfjdfQdANe1fWAyBBh8nWVr8M2EC8Om9d3ujdP9JZrRN5CYZHmhixQ42j1q1MukA7",
    borderColor: "border-t-plasma-orange"
  },
  {
    title: "Profuturo E-commerce",
    description: "Cloud architecture design and e-commerce leadership for projects like E-commerce Site, Loyalty, Lead Scoring, Data Leak, Loans, WhatsApp, Callcenter.",
    tags: ["Python", "NodeJS", "Vue.js", "React.js", "Next.js"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqkiqAd4ZHyXUhjjGaCNmMmOtvvIdZARNlQ3-oD33mGOMt77kv939oNfDIaGJSWyg2bziOcP5dab2un-oQygpL4rDKiftlgdyV3FZ_DNo1Sb0I2dV01_gA2kQ6q7XXP2lNKmGVC2QDsoBmPeLouosskjpuiHOUJyY3vCnp88E4cfklkV54U200Hwfcb3KlZyVS7Ph77SwS4bI2IvedAD08ZoZE0x-6M7tEeLw2mVnkPjQIvi2kyGSvZh3y8sa2cvbSZ9a4hp73",
    borderColor: "border-t-primary"
  },
  {
    title: "Catorce Días Agency Projects",
    description: "Requirements analysis, estimates, database design and full-stack/mobile development for clients like Philadelphia, Oreo, Tang, KFC, OfficeMax, Nestlé Nido, Trident.",
    tags: ["NodeJS", "PHP", "MySQL", "MongoDB", "React Native"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjg6nzyIO7IT9-ekXxVSRyvYIJf6b21TPlrV_RYicb_THgreirm67sc-yw03o7H1yNv1QQG3vQY1aRmwNhbIpUuptcn4mHPr3ZMlPgN0kPAVilkmQli24KIiVBra7mfoGyphaD8Hjt8MP8_G7L0V3pPVXyhuQyGUQn9r3rOarRgv6D3kbz6jKnfM5wZHfvBzg_U5Q0Tk0CeaUxVF-DBSjnvFJLwlC8W2bwHTz4AM5jo_OD8vvG0ojhrvlM2fVSvFFyFA0dNJ5c",
    borderColor: "border-t-secondary"
  }
];

export default function ProjectsGallery() {
  return (
    <section id="projects" className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/5 border-t border-border-glass">
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
          {projects.map((project, index) => (
            <div key={index} className={`glass-panel rounded-xl overflow-hidden flex flex-col ${project.borderColor} hover:scale-[1.02] transition-transform duration-500 bg-surface-container-low`}>
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${project.image}')` }}
              ></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded border border-plasma-orange/30 bg-plasma-orange/5 text-plasma-orange text-[10px] font-label-code">{tag}</span>
                  ))}
                </div>
                <h3 className="font-headline-md text-xl text-on-surface mb-3">{project.title}</h3>
                <p className="text-on-surface-variant text-sm line-clamp-3">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
