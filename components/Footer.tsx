export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-border-glass bg-surface-glass backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-8 max-w-max-width mx-auto font-label-code text-label-code">
        <div className="font-label-caps text-label-caps text-on-surface-variant mb-4 md:mb-0">© 2024 Daniel Bazán</div>
        <div className="flex flex-wrap justify-center gap-gutter text-secondary">
          <a className="hover:text-secondary-fixed-dim transition-all" href="#">GITHUB</a>
          <a className="hover:text-secondary-fixed-dim transition-all" href="#">LINKEDIN</a>
          <a className="hover:text-secondary-fixed-dim transition-all" href="#">DOCS</a>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span className="text-secondary-fixed font-bold">STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
