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
        'min-h-11 rounded-[var(--arc-radius-control)] px-5 text-sm font-medium shadow-none transition-[background-color,transform] duration-200 active:translate-y-px',
        tone === 'primary' &&
          'bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-110',
        tone === 'accent' &&
          'bg-[var(--arc-accent)] text-[var(--foreground)] hover:brightness-95',
        tone === 'quiet' &&
          'bg-transparent text-[var(--arc-text-muted)] hover:bg-[var(--arc-surface-subtle)] hover:text-[var(--foreground)]',
        className,
      )}
    />
  );
}

export function ArcCard({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        'rounded-[var(--arc-radius-card)] border border-[var(--border)] bg-[var(--arc-surface)] shadow-[var(--arc-shadow-card)] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out',
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
    correct: 'bg-[var(--arc-success-bg)] text-[var(--arc-success-text)]',
    incorrect: 'bg-[var(--arc-error-bg)] text-[var(--arc-error-text)]',
    redo: 'bg-[var(--arc-redo-bg)] text-[var(--arc-redo-text)]',
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
