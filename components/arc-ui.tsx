import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ArcButtonProps = ComponentProps<typeof Button> & {
  tone?: 'primary' | 'accent' | 'quiet';
};

export function ArcButton({
  className,
  tone = 'primary',
  ...props
}: ArcButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        'min-h-11 rounded-control px-5 text-sm font-medium shadow-none transition-[background-color,transform] duration-200 active:translate-y-px',
        tone === 'primary' &&
          'bg-primary text-primary-foreground hover:brightness-110',
        tone === 'accent' && 'bg-accent text-foreground hover:brightness-95',
        tone === 'quiet' &&
          'bg-transparent text-muted-foreground hover:bg-surface-subtle hover:text-foreground',
        className,
      )}
    />
  );
}

export function ArcCard({
  className,
  children,
  interactive = false,
}: {
  className?: string;
  children?: ReactNode;
  /** Opt into the shared hover language: a small lift, a raised shadow and an
   * accent border. Use on cards that are a single click target. */
  interactive?: boolean;
}) {
  return (
    <section
      className={cn(
        'rounded-card border border-border bg-surface shadow-card transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out',
        interactive &&
          'hover:-translate-y-0.5 hover:border-accent-strong/60 hover:shadow-raised motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      {children}
    </section>
  );
}

type AttemptStatus = 'correct' | 'incorrect' | 'redo';

export function AttemptStatusBadge({ status }: { status: AttemptStatus }) {
  const label = { correct: 'Acertou', incorrect: 'Errou', redo: 'Refazer' }[
    status
  ];
  const colors = {
    correct: 'bg-success-bg text-success',
    incorrect: 'bg-error-bg text-error',
    redo: 'bg-redo-bg text-redo',
  }[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        colors,
      )}
    >
      {label}
    </span>
  );
}
