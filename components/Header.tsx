export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-glass backdrop-blur-xl border-b border-border-glass">
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
          .cursor {
            animation: blink 1s step-end infinite;
          }
        `}
      </style>
      <nav className="flex justify-between items-center max-w-max-width mx-auto px-margin-desktop py-4">
        <div className="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary">
          {">"}
          <span className="cursor">_</span>
        </div>
        <div className="hidden md:flex items-center gap-gutter font-label-code text-label-code">
          <a className="text-primary border-b-2 border-primary pb-1" href="#timeline">TIMELINE</a>
          <a className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-300" href="#projects">PROJECTS</a>
          <a className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-300" href="#skills">SKILLS</a>
          <a className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-300" href="#contact">CONTACT</a>
        </div>
      </nav>
    </header>
  );
}