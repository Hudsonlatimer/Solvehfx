import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SolveHFX — Fix Halifax. Together.',
    short_name: 'SolveHFX',
    description: 'Report potholes, graffiti, broken streetlights, and civic issues in Halifax. AI-powered reports sent to HRM 311 and your district councillor.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#003865',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
