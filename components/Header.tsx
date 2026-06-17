export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-glass backdrop-blur-xl border-b border-border-glass">
      <nav className="flex justify-between items-center max-w-max-width mx-auto px-margin-desktop py-4">
        <div className="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary">AETHER_OS v1.0</div>
        <div className="hidden md:flex items-center gap-gutter font-label-code text-label-code">
          <a className="text-primary border-b-2 border-primary pb-1" href="#">TERMINAL</a>
          <a className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-300" href="#">SYSTEM</a>
          <a className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-300" href="#">NETWORK</a>
          <a className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-300" href="#">CORE</a>
        </div>
      </nav>
    </header>
  );
}
