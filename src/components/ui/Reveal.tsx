'use client';

import { useEffect, useRef, type HTMLAttributes } from 'react';

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'header';
}

/**
 * One-shot reveal — fades up 8px on first viewport entry.
 * Honors prefers-reduced-motion via CSS in globals.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (delay) {
              window.setTimeout(() => el.classList.add('in-view'), delay);
            } else {
              el.classList.add('in-view');
            }
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
