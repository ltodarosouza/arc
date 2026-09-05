import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ArcButtonProps = ComponentProps<typeof Button> & {
  tone?: 'primary' | 'accent' | 'quiet';
};

export function ArcButton({ className, tone = 'primary', ...props }: ArcButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        'h-11 rounded-full px-5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0',
        tone === 'primary' && 'bg-[#1d221d] text-white hover:bg-[#323b34]',
        tone === 'accent' && 'bg-[var(--arc-accent)] text-[#243128] hover:bg-[#b9d9c9]',
        tone === 'quiet' && 'bg-transparent text-[var(--arc-text-muted)] hover:bg-black/[0.04] hover:text-[#161616]',
        className,
      )}
    />
  );
}

export function ArcCard({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn('rounded-[var(--arc-radius-card)] border border-black/[0.07] bg-[var(--arc-surface)] shadow-[var(--arc-shadow-card)]', className)}>{children}</section>;
}

type AttemptStatus = 'correct' | 'incorrect' | 'redo';

export function AttemptStatusBadge({ status }: { status: AttemptStatus }) {
  const label = { correct: 'Acertou', incorrect: 'Errou', redo: 'Refazer' }[status];
  const colors = {
    correct: 'bg-[var(--arc-success-bg)] text-[var(--arc-success-text)]',
    incorrect: 'bg-[var(--arc-error-bg)] text-[var(--arc-error-text)]',
    redo: 'bg-[var(--arc-redo-bg)] text-[var(--arc-redo-text)]',
  }[status];

  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', colors)}>{label}</span>;
}
