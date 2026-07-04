import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Issue Map — Civic Reports Across Halifax',
  description:
    'Interactive map of reported civic issues across Halifax Regional Municipality. Filter by category, district, or status. See potholes, graffiti, and more near you.',
  alternates: { canonical: 'https://www.solvehfx.ca/map' },
  openGraph: {
    title: 'SolveHFX Issue Map — Halifax Civic Reports',
    description: 'Explore civic issues across all 16 Halifax districts on an interactive map.',
    url: 'https://www.solvehfx.ca/map',
  },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
