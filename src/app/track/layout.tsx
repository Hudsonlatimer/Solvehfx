import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Your Report — SolveHFX',
  description:
    'Track the status of your civic issue report in Halifax. Enter your reference number to check progress — no account needed.',
  alternates: { canonical: 'https://solvehfx.ca/track' },
  openGraph: {
    title: 'Track Your Report — SolveHFX',
    description: 'Check the status of any civic report in Halifax with your reference number.',
    url: 'https://solvehfx.ca/track',
  },
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
