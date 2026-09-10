import type { ElementType, ReactNode } from 'react';

import { AnimatedTitle } from '@/components/animated-title';
import { cn } from '@/lib/utils';

/**
 * The shared scaffold for the top of a route: optional eyebrow, the animated
 * page title, an optional supporting line, and an optional trailing action that
 * drops beside the title on wide viewports and below it on narrow ones.
 */
export function PageHeader({
  title,
  as,
  eyebrow,
  description,
  action,
  className,
}: {
  title: string;
  as?: ElementType;
  eyebrow?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        'animate-enter flex flex-col gap-5 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className="max-w-xl">
        {eyebrow ? (
          <p className="arc-caption font-semibold uppercase tracking-[0.12em] text-accent-strong">
            {eyebrow}
          </p>
        ) : null}
        <AnimatedTitle as={as} className={eyebrow ? 'mt-2' : undefined}>
          {title}
        </AnimatedTitle>
        {description ? (
          <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 md:pb-1">{action}</div> : null}
    </header>
  );
}
