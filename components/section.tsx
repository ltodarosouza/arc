import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * A vertical block on a page: consistent top rhythm (.arc-section) plus an
 * optional header row with an eyebrow, a section title, and a trailing action.
 */
export function Section({
  children,
  title,
  eyebrow,
  action,
  className,
  headingLevel = 2,
}: {
  children: ReactNode;
  title?: ReactNode;
  eyebrow?: ReactNode;
  action?: ReactNode;
  className?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as ElementType;
  const hasHeader = Boolean(title || eyebrow || action);
  return (
    <section className={cn('arc-section', className)}>
      {hasHeader ? (
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            {eyebrow ? <p className="arc-caption">{eyebrow}</p> : null}
            {title ? (
              <Heading className={cn('arc-section-title', eyebrow && 'mt-1')}>
                {title}
              </Heading>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
