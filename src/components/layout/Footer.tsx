import Link from 'next/link';

const SOCIAL_LINKS = {
  x: 'https://x.com/SolveHFX',
  instagram: 'https://instagram.com/SolveHFX',
  facebook: 'https://facebook.com/SolveHFX',
};

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white/65 mt-auto relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="inline-flex items-baseline gap-0.5">
              <span
                className="text-accent text-[22px]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Solve
              </span>
              <span
                className="text-white text-[22px]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                HFX
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/55">
              An independent civic reporting tool for Halifax Regional
              Municipality. Built by residents, for residents.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { href: SOCIAL_LINKS.x, label: 'Follow SolveHFX on X', Icon: XIcon },
                { href: SOCIAL_LINKS.instagram, label: 'Follow SolveHFX on Instagram', Icon: InstagramIcon },
                { href: SOCIAL_LINKS.facebook, label: 'Follow SolveHFX on Facebook', Icon: FacebookIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-lg bg-white/8 hover:bg-white/15 hover:text-white transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white text-[12.5px] font-semibold tracking-[0.14em] uppercase mb-4">
              Report
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href="/report" className="hover:text-white transition-colors">Submit an issue</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Track your report</Link></li>
              <li><Link href="/map" className="hover:text-white transition-colors">Issue map</Link></li>
              <li><Link href="/reports" className="hover:text-white transition-colors">All reports</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white text-[12.5px] font-semibold tracking-[0.14em] uppercase mb-4">
              Learn
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
              <li><Link href="/districts" className="hover:text-white transition-colors">HRM districts</Link></li>
              <li><Link href="/scorecards" className="hover:text-white transition-colors">Scorecards</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white text-[12.5px] font-semibold tracking-[0.14em] uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li>
                <a href="mailto:support@solvehfx.ca" className="text-white hover:text-accent transition-colors font-medium">
                  support@solvehfx.ca
                </a>
                <p className="text-[11.5px] text-white/40 mt-0.5">Questions & feedback</p>
              </li>
              <li className="pt-2 border-t border-white/8">
                <p className="text-[12px] text-white/45">HRM 311</p>
                <p className="text-[12.5px]">contactus@311.halifax.ca</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[12px] text-white/50">
          <p>
            Independent. Not affiliated with Halifax Regional Municipality.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
            <p>
              Designed &amp; built by{' '}
              <span className="text-white/75 font-medium">Hudson Latimer</span>
            </p>
            <p>&copy; {year} SolveHFX</p>
          </div>
        </div>

        {/* Studio credit */}
        <a
          href="https://huddydigital.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 group flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center transition-colors hover:border-accent/40 hover:bg-white/[0.06]"
        >
          <span className="text-[12.5px] text-white/55 group-hover:text-white/75 transition-colors">
            A{' '}
            <span className="text-accent font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Huddy Digital
            </span>{' '}
            build — web &amp; product studio
          </span>
          <span className="text-[12px] font-medium text-white/45 group-hover:text-accent transition-colors">
            huddydigital.ca →
          </span>
        </a>
      </div>
    </footer>
  );
}
