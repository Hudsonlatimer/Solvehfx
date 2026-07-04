import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog';

const BASE = 'https://www.solvehfx.ca';

type ChangeFreq = MetadataRoute.Sitemap[number]['changeFrequency'];

// Public, indexable routes. Auth-gated and per-record dynamic routes
// (/admin, /dashboard, /login, /reports/[id], /track/[ref]) are intentionally
// excluded — see robots.ts.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: ChangeFreq }[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/report', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/map', priority: 0.8, changeFrequency: 'daily' },
  { path: '/reports', priority: 0.8, changeFrequency: 'daily' },
  { path: '/scorecards', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/districts', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/how-it-works', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/track', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/terms', priority: 0.4, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Every blog post is added automatically — new posts appear in the sitemap
  // the moment they're added to BLOG_POSTS.
  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
