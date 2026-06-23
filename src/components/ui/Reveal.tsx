'use client';

import { useEffect, useRef, type HTMLAttributes } from 'react';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'header' | 'li';
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
  const ref = useRef<HTMLElement>(null);
  const Comp = Tag as 'div';

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
    <Comp ref={ref as any} className={`reveal ${className}`} {...rest}>
      {children}
    </Comp>
  );
}
