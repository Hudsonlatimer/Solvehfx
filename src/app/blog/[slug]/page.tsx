import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
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
    alternates: { canonical: `https://www.solvehfx.ca/blog/${slug}` },
    openGraph: {
      title: `${post.title} — SolveHFX`,
      description: post.description,
      url: `https://www.solvehfx.ca/blog/${slug}`,
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

  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'SolveHFX',
      url: 'https://www.solvehfx.ca',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SolveHFX',
      url: 'https://www.solvehfx.ca',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.solvehfx.ca/icon-512.png',
      },
    },
    mainEntityOfPage: `https://www.solvehfx.ca/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
          <div className="mt-6 flex items-center gap-3 text-[11.5px] text-text-muted tracking-tight">
            <span className="font-semibold tracking-[0.14em] uppercase text-accent-hover">
              {post.category}
            </span>
            <span className="text-text-muted/60">·</span>
            <time className="num">{post.date}</time>
            <span className="text-text-muted/60">·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="mt-5 text-[16.5px] text-text-secondary max-w-2xl leading-relaxed">
            {post.description}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16">
        <div>
          {post.content.split('\n').map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('## ')) {
              return (
                <h2
                  key={i}
                  className="text-[22px] sm:text-[24px] tracking-tight leading-[1.2] mt-10 mb-3"
                >
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            if (trimmed.startsWith('### ')) {
              return (
                <h3
                  key={i}
                  className="text-[18px] tracking-tight mt-7 mb-2.5"
                >
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            if (trimmed.startsWith('- **')) {
              const match = trimmed.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
              if (match) {
                return (
                  <div
                    key={i}
                    className="flex gap-3 ml-1 mb-2.5 text-[15px] text-text-secondary leading-[1.65]"
                  >
                    <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                    <p>
                      <strong className="text-text-primary font-medium">
                        {match[1]}
                      </strong>
                      {match[2] ? `: ${match[2]}` : ''}
                    </p>
                  </div>
                );
              }
            }

            if (trimmed.startsWith('- ')) {
              return (
                <div
                  key={i}
                  className="flex gap-3 ml-1 mb-2.5 text-[15px] text-text-secondary leading-[1.65]"
                >
                  <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                  <p>{trimmed.replace('- ', '')}</p>
                </div>
              );
            }

            if (trimmed.startsWith('|')) {
              return null;
            }

            if (trimmed === '---') {
              return <hr key={i} className="my-10 border-rule" />;
            }

            const rendered = trimmed
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-medium">$1</strong>')
              .replace(
                /\[(.+?)\]\((.+?)\)/g,
                '<a href="$2" class="text-primary hover:underline underline-offset-4">$1</a>'
              );

            return (
              <p
                key={i}
                className="text-[15.5px] text-text-secondary leading-[1.75] mb-5"
                dangerouslySetInnerHTML={{ __html: rendered }}
              />
            );
          })}
        </div>

        <div className="mt-14 pt-10 border-t border-rule">
          <div className="rounded-2xl border border-rule bg-bg-elev p-6 text-center">
            <h3 className="text-[20px] tracking-tight">
              Ready to report an issue?
            </h3>
            <p className="mt-2 text-[14px] text-text-secondary">
              The first one takes about a minute.
            </p>
            <div className="mt-5">
              <Link href="/report">
                <Button variant="primary" size="lg">
                  Report an issue
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-[13.5px] text-text-secondary hover:text-text-primary transition-colors"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
