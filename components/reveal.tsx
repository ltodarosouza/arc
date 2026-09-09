'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function Reveal({
  children,
  delay = 0,
  variant = 'rise',
}: {
  children: ReactNode;
  delay?: number;
  variant?: 'rise' | 'card' | 'slide';
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    // Content is visible without JavaScript. Once the page is ready, animate the
    // first viewport too; lower content still waits until it enters the viewport.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      const frame = window.requestAnimationFrame(() => {
        node.classList.add('reveal-in');
      });
      return () => window.cancelAnimationFrame(frame);
    }
    node.classList.add('reveal-pending');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove('reveal-pending');
          node.classList.add('reveal-in');
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      node.classList.remove('reveal-pending');
    };
  }, []);
  return (
    <div
      className={`reveal-${variant}`}
      ref={ref}
      style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
