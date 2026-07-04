import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Blog — Civic Reporting Tips for Halifax Residents',
  description:
    'Guides, tips, and explainers for reporting civic issues in Halifax. Learn how to report potholes, graffiti, broken streetlights, and more to HRM 311 and your district councillor.',
  alternates: { canonical: 'https://www.solvehfx.ca/blog' },
  openGraph: {
    title: 'SolveHFX Blog — Halifax Civic Reporting Guides',
    description:
      'Tips and guides for reporting potholes, graffiti, streetlights, and civic issues in Halifax.',
    url: 'https://www.solvehfx.ca/blog',
  },
};

export default function BlogPage() {
  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'SolveHFX Blog',
    url: 'https://www.solvehfx.ca/blog',
    description:
      'Civic reporting guides and updates for Halifax Regional Municipality residents.',
    publisher: {
      '@type': 'Organization',
      name: 'SolveHFX',
      url: 'https://www.solvehfx.ca',
    },
    blogPost: BLOG_POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `https://www.solvehfx.ca/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
          <Reveal className="mt-5">
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              Field notes
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
              Civic reporting, explained.
            </h1>
            <p className="mt-4 text-[15.5px] text-text-secondary max-w-xl leading-relaxed">
              Guides, tips, and updates on how to actually get things fixed in
              Halifax.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <ul className="divide-y divide-rule border-y border-rule">
            {BLOG_POSTS.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={Math.min(i * 40, 200)}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex gap-6 py-7 hover:bg-bg-elev/50 -mx-3 px-3 rounded-lg transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 text-[11.5px] text-text-muted tracking-tight">
                        <span className="font-semibold tracking-[0.14em] uppercase text-accent-hover">
                          {post.category}
                        </span>
                        <span className="text-text-muted/60">·</span>
                        <time className="num">{post.date}</time>
                        <span className="text-text-muted/60">·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="mt-2 text-[20px] sm:text-[22px] leading-[1.2] tracking-tight group-hover:text-primary transition-colors text-balance">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-[14.5px] text-text-secondary leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-primary group-hover:gap-2 transition-[gap]">
                        Read article
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
