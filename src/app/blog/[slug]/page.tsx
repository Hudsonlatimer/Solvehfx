import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import { BLOG_POSTS, getPostBySlug } from '@/lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://solvehfx.ca/blog/${slug}` },
    openGraph: {
      title: `${post.title} — SolveHFX`,
      description: post.description,
      url: `https://solvehfx.ca/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // JSON-LD Article structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'SolveHFX',
      url: 'https://solvehfx.ca',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SolveHFX',
      url: 'https://solvehfx.ca',
    },
    mainEntityOfPage: `https://solvehfx.ca/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-text-secondary hover:text-primary transition-colors mb-4 inline-block"
          >
            &larr; Back to blog
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold text-accent uppercase tracking-wide">
              {post.category}
            </span>
            <span className="text-xs text-text-secondary">{post.date}</span>
            <span className="text-xs text-text-secondary">{post.readTime}</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary leading-tight">
            {post.title}
          </h1>
        </div>

        <div className="prose prose-gray max-w-none">
          {post.content.split('\n').map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={i} className="text-xl font-semibold text-text-primary mt-8 mb-3">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={i} className="text-lg font-semibold text-text-primary mt-6 mb-2">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            if (trimmed.startsWith('- **')) {
              const match = trimmed.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
              if (match) {
                return (
                  <div key={i} className="flex gap-2 ml-4 mb-2 text-sm text-text-secondary">
                    <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                    <p>
                      <strong className="text-text-primary">{match[1]}</strong>
                      {match[2] ? `: ${match[2]}` : ''}
                    </p>
                  </div>
                );
              }
            }

            if (trimmed.startsWith('- ')) {
              return (
                <div key={i} className="flex gap-2 ml-4 mb-2 text-sm text-text-secondary">
                  <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                  <p>{trimmed.replace('- ', '')}</p>
                </div>
              );
            }

            if (trimmed.startsWith('|')) {
              return null; // Skip markdown tables for simplicity
            }

            if (trimmed === '---') {
              return <hr key={i} className="my-8 border-gray-200" />;
            }

            // Parse inline links and bold
            const rendered = trimmed
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');

            return (
              <p
                key={i}
                className="text-sm text-text-secondary leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: rendered }}
              />
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-3">
            Ready to report an issue?
          </h3>
          <Link href="/report">
            <Button variant="primary" size="lg">
              Report an Issue
            </Button>
          </Link>
        </div>
      </article>
    </>
  );
}
