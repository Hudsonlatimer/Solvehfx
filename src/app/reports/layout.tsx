import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Reports — Civic Issues in Halifax',
  description:
    'Browse all civic issue reports filed by Halifax residents. Filter by category, district, and status. See potholes, graffiti, road damage, and more across HRM.',
  alternates: { canonical: 'https://solvehfx.ca/reports' },
  openGraph: {
    title: 'All Civic Issue Reports — SolveHFX Halifax',
    description: 'Browse civic issues reported by Halifax residents across all 16 HRM districts.',
    url: 'https://solvehfx.ca/reports',
  },
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
