'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';

export function HeroSurface({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const bounds = node.getBoundingClientRect();
    node.style.setProperty(
      '--arc-pointer-x',
      `${event.clientX - bounds.left}px`,
    );
    node.style.setProperty(
      '--arc-pointer-y',
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <div
      className="arc-hero animate-enter"
      onPointerMove={handlePointerMove}
      ref={ref}
    >
      {children}
    </div>
  );
}
