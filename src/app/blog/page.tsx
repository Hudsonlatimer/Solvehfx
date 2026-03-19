import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Civic Reporting Tips for Halifax Residents',
  description:
    'Guides, tips, and explainers for reporting civic issues in Halifax. Learn how to report potholes, graffiti, broken streetlights, and more to HRM 311 and your district councillor.',
  alternates: { canonical: 'https://solvehfx.ca/blog' },
  openGraph: {
    title: 'SolveHFX Blog — Halifax Civic Reporting Guides',
    description: 'Tips and guides for reporting potholes, graffiti, streetlights, and civic issues in Halifax.',
    url: 'https://solvehfx.ca/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-3">Blog</h1>
        <p className="text-text-secondary">
          Guides, tips, and updates on civic reporting in Halifax.
        </p>
      </div>

      <div className="space-y-6">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl border border-gray-100 bg-white p-6 hover:border-primary/20 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-semibold text-accent uppercase tracking-wide">
                {post.category}
              </span>
              <span className="text-[11px] text-text-secondary">{post.date}</span>
              <span className="text-[11px] text-text-secondary">{post.readTime}</span>
            </div>
            <h2 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
