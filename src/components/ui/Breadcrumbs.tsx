import Link from 'next/link';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href ? `https://solvehfx.ca${c.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-[12.5px] text-text-secondary">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                {c.href && !last ? (
                  <Link
                    href={c.href}
                    className="hover:text-text-primary transition-colors"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className={last ? 'text-text-primary' : ''}>{c.label}</span>
                )}
                {!last && (
                  <span aria-hidden className="text-text-muted/60">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
