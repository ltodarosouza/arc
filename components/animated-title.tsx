import type { ElementType } from 'react';

import { cn } from '@/lib/utils';

export function AnimatedTitle({
  children,
  className,
  as: Tag = 'h1',
}: {
  children: string;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag aria-label={children} className={cn('arc-title', className)}>
      <span aria-hidden="true">
        {Array.from(children).map((letter, index) => (
          <span
            className="arc-title-letter"
            key={`${letter}-${index}`}
            style={{ animationDelay: `${120 + index * 28}ms` }}
          >
            {letter === ' ' ? '\u00a0' : letter}
          </span>
        ))}
      </span>
    </Tag>
  );
}
