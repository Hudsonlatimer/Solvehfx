'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/map', label: 'Map' },
    { href: '/reports', label: 'Reports' },
    { href: '/districts', label: 'Districts' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-primary text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-accent">Solve</span>
            <span>HFX</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/report">
              <Button variant="secondary" size="sm">
                Report Issue
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary">
          <div className="space-y-1 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/report" onClick={() => setMobileOpen(false)}>
              <Button variant="secondary" size="sm" className="mt-2 w-full">
                Report Issue
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
