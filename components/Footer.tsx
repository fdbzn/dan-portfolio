export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-border-glass bg-surface-glass backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 px-margin-mobile md:px-margin-desktop py-6 md:py-8 max-w-max-width mx-auto font-label-code text-label-code">
        <div className="font-label-caps text-label-caps text-on-surface-variant text-center md:text-left">
          © 2024 Daniel Bazán
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-gutter text-secondary w-full md:w-auto">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-gutter">
            <a className="px-2 py-2 hover:text-secondary-fixed-dim transition-all" href="https://github.com/fdbzn" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a className="px-2 py-2 hover:text-secondary-fixed-dim transition-all" href="https://linkedin.com/in/dan-bazan-f1010" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            <a className="px-2 py-2 hover:text-secondary-fixed-dim transition-all" href="mailto:fdbazan1.0@gmail.com">EMAIL</a>
          </div>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0"></div>
            <span className="text-secondary-fixed font-bold whitespace-nowrap">STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
