'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

const LINKS = [
  { href: '/map', label: 'Map' },
  { href: '/reports', label: 'Reports' },
  { href: '/scorecards', label: 'Scorecards' },
  { href: '/districts', label: 'Districts' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-200 ${
        scrolled
          ? 'bg-primary/95 backdrop-blur shadow-[0_1px_0_0_rgb(255_255_255/0.06),0_8px_24px_-12px_rgb(0_0_0/0.35)]'
          : 'bg-primary'
      } text-white`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-baseline gap-0.5 text-[19px] font-semibold tracking-tight"
            aria-label="SolveHFX home"
          >
            <span className="text-accent" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Solve
            </span>
            <span className="text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
              HFX
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => {
              const active =
                pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-[13.5px] font-medium tracking-tight rounded-md transition-colors ${
                    active ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent" aria-hidden />
                  )}
                </Link>
              );
            })}
            <Link href="/report" className="ml-3">
              <Button variant="secondary" size="sm">
                Report an issue
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary">
          <div className="px-4 py-3 space-y-0.5">
            {LINKS.map((link) => {
              const active =
                pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/report" className="block pt-3">
              <Button variant="secondary" size="md" className="w-full">
                Report an issue
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
