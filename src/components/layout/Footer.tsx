import Link from 'next/link';

const SOCIAL_LINKS = {
  x: 'https://x.com/SolveHFX',
  instagram: 'https://instagram.com/SolveHFX',
  facebook: 'https://facebook.com/SolveHFX',
};

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white/70 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              <span className="text-accent">Solve</span>HFX
            </h3>
            <p className="text-sm mb-4">
              Fix Halifax. Together. A civic reporting tool by residents, for residents.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SolveHFX on X"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <XIcon />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SolveHFX on Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SolveHFX on Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Report</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/report" className="hover:text-white transition-colors">Submit an Issue</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Track Your Report</Link></li>
              <li><Link href="/map" className="hover:text-white transition-colors">Issue Map</Link></li>
              <li><Link href="/reports" className="hover:text-white transition-colors">All Reports</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/districts" className="hover:text-white transition-colors">HRM Districts</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Follow on X
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Follow on Instagram
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Follow on Facebook
                </a>
              </li>
              <li className="pt-1 text-xs text-white/50">HRM 311: contactus@311.halifax.ca</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>SolveHFX is an independent civic tool. Not affiliated with Halifax Regional Municipality.</p>
          <p className="text-white/50">&copy; {new Date().getFullYear()} SolveHFX</p>
        </div>
      </div>
    </footer>
  );
}
