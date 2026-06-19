'use client';
import Typewriter from './Typewriter';

const navLinks = [
  { href: '#timeline', label: 'TIMELINE', active: true },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#contact', label: 'CONTACT' },
];

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-glass backdrop-blur-xl border-b border-border-glass">
      <nav className="flex justify-between items-center max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-3 md:py-4">
        <div className="text-xl sm:text-2xl font-display-lg-mobile tracking-tighter text-primary min-w-0">
          <Typewriter parts={['Daniel Bazán']} speed={50} />
        </div>
        <div className="hidden md:flex items-center gap-gutter font-label-code text-label-code">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={
                link.active
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-300'
              }
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
      <div className="md:hidden border-t border-border-glass/50 px-margin-mobile py-2.5 overflow-x-auto">
        <div className="flex items-center gap-5 font-label-code text-xs whitespace-nowrap">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={
                link.active
                  ? 'text-primary border-b border-primary pb-0.5'
                  : 'text-on-surface-variant'
              }
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
