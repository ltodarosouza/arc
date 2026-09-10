import type { ReactNode } from 'react';

export function HeroSurface({ children }: { children: ReactNode }) {
  return <div className="arc-home-title animate-enter">{children}</div>;
}
