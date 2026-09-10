import type { KeyboardEvent, MouseEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { AttemptStatusBadge, ArcCard } from '@/components/arc-ui';
import { MathContent } from '@/components/math-content';
import type { CatalogueQuestion } from '@/lib/data/catalogue-repository';
import type { AttemptOutcome } from '@/lib/domain/questions';

const difficultyLabel = {
  easy: 'Fácil',
  medium: 'Média',
  hard: 'Difícil',
} as const;

export function QuestionCard({
  question,
  displayNumber,
  status,
  topicNames,
  outcome,
  markedForRedo,
  isSavingRedo,
  subjectSlug,
  onOpen,
  onToggleRedo,
}: {
  question: CatalogueQuestion;
  displayNumber: number;
  status: 'correct' | 'incorrect' | 'redo' | null;
  topicNames: string[];
  outcome: AttemptOutcome | undefined;
  markedForRedo: boolean;
  isSavingRedo: boolean;
  subjectSlug: string;
  onOpen: () => void;
  onToggleRedo: () => void;
}) {
  const paddedNumber = String(displayNumber).padStart(2, '0');
  return (
    <div
      className="rounded-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).closest('button, a')) return;
        onOpen();
      }}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
      role="link"
      tabIndex={0}
    >
      <ArcCard className="arc-question-card relative cursor-pointer p-5 sm:p-6">
        <Link
          aria-label={`Abrir questão ${displayNumber}`}
          className="sr-only"
          href={`/practice?subject=${subjectSlug}&question=${question.id}`}
          onClick={(event) => {
            event.preventDefault();
            onOpen();
          }}
        />
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>Questão {paddedNumber}</span>
            <span className="rounded-full bg-surface-subtle px-2.5 py-1 capitalize">
              {difficultyLabel[question.difficulty]}
            </span>
          </div>
          {status && <AttemptStatusBadge status={status} />}
        </div>
        <div className="relative z-10 mt-4 max-w-3xl text-base font-medium leading-8">
          <MathContent value={question.statement.value} />
        </div>
        <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {topicNames.map((name) => (
              <span
                className="rounded-full bg-surface-subtle px-2.5 py-1 text-xs text-muted-foreground"
                key={name}
              >
                {name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              aria-pressed={markedForRedo}
              className="text-sm text-muted-foreground hover:text-foreground"
              disabled={isSavingRedo}
              onClick={onToggleRedo}
            >
              {isSavingRedo
                ? 'Salvando marcação…'
                : markedForRedo
                  ? 'Remover de refazer'
                  : 'Marcar para refazer'}
            </button>
            <button
              className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline"
              onClick={onOpen}
              type="button"
            >
              {outcome ? 'Refazer' : 'Resolver'}{' '}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </ArcCard>
    </div>
  );
}
