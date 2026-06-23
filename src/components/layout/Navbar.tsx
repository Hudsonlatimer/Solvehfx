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
      className={`sticky top-0 z-50 bg-bg-elev/95 text-text-primary backdrop-blur transition-shadow duration-200 ${
        scrolled ? 'shadow-civic border-b border-rule' : 'border-b border-rule'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="SolveHFX home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-primary-light" aria-hidden>
              <path
                d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"
                fill="currentColor"
              />
              <circle cx="12" cy="9" r="2.6" fill="white" />
            </svg>
            <span className="flex items-baseline gap-0.5 text-[19px] tracking-tight">
              <span className="text-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Solve
              </span>
              <span className="text-primary-light" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                HFX
              </span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => {
              const active =
                pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-md px-3 py-2 text-[13.5px] font-medium tracking-tight transition-colors ${
                    active ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-light" aria-hidden />
                  )}
                </Link>
              );
            })}
            <Link href="/report" className="ml-3">
              <Button variant="primary" size="sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Submit an Issue
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="-mr-2 inline-flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-md text-text-primary transition-colors hover:bg-black/[0.04] md:hidden"
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
        <div className="border-t border-rule bg-bg-elev md:hidden">
          <div className="space-y-0.5 px-4 py-3">
            {LINKS.map((link) => {
              const active =
                pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors ${
                    active
                      ? 'bg-primary/[0.06] text-primary'
                      : 'text-text-secondary hover:bg-black/[0.03] hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/report" className="block pt-3">
              <Button variant="primary" size="md" className="w-full">
                Submit an Issue
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
