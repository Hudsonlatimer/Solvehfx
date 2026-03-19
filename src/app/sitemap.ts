import type { MetadataRoute } from 'next';

const BASE_URL = 'https://solvehfx.ca';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, priority: 1.0 },
    { url: `${BASE_URL}/report`, lastModified: now, priority: 0.9 },
    { url: `${BASE_URL}/map`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/reports`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/districts`, lastModified: now, priority: 0.7 },
    { url: `${BASE_URL}/how-it-works`, lastModified: now, priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: now, priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, priority: 0.5 },
  ];

  // Try to fetch report IDs for dynamic pages
  let reportUrls: MetadataRoute.Sitemap = [];
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data: reports } = await supabase
      .from('reports')
      .select('id, created_at')
      .order('created_at', { ascending: false })
      .limit(1000);

    reportUrls = (reports || []).map((r) => ({
      url: `${BASE_URL}/reports/${r.id}`,
      lastModified: new Date(r.created_at),
      priority: 0.6,
    }));
  } catch {
    // Supabase unavailable — return static pages only
  }

  return [...staticPages, ...reportUrls];
}
