'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export function AnimatedProgressBar({
  value,
  label,
  className,
  indicatorClassName,
}: {
  value: number;
  label: string;
  className?: string;
  indicatorClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFilled, setIsFilled] = useState(false);
  const clampedValue = Math.min(100, Math.max(0, value));

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsFilled(true);
      return;
    }
    let fillTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        fillTimer = window.setTimeout(() => setIsFilled(true), 260);
      },
      { threshold: 0.22 },
    );
    observer.observe(track);
    return () => {
      observer.disconnect();
      if (fillTimer) window.clearTimeout(fillTimer);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={clampedValue}
      className={cn(
        'h-1.5 overflow-hidden rounded-full bg-surface-subtle',
        className,
      )}
      role="progressbar"
    >
      <span
        className={cn(
          'arc-progress-fill block h-full rounded-full bg-accent-strong',
          indicatorClassName,
        )}
        style={{ width: `${isFilled ? clampedValue : 0}%` }}
      />
    </div>
  );
}
