import { BarChart3 } from 'lucide-react';

import { AnimatedProgressBar } from '@/components/animated-progress-bar';

import {
  getQuestionAggregate,
  minimumAggregateThreshold,
} from '@/lib/data/question-statistics';
import type { Question } from '@/lib/domain/questions';

export function QuestionStatistics({ question }: { question: Question }) {
  const aggregate = getQuestionAggregate(question.id);
  if (
    !aggregate ||
    aggregate.totalAttempts < minimumAggregateThreshold ||
    question.kind !== 'multiple_choice'
  )
    return null;

  const correctRate = Math.round(
    (aggregate.correctAttempts / aggregate.totalAttempts) * 100,
  );
  const incorrectRate = 100 - correctRate;

  return (
    <details className="mt-5 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--arc-surface)] px-4 py-3.5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-[#46657a]">
        <span className="inline-flex items-center gap-2">
          <BarChart3 className="size-4" /> Estatísticas da questão
        </span>
        <span className="text-xs font-normal text-[var(--arc-text-muted)]">
          Dados de demonstração
        </span>
      </summary>
      <div className="mt-5 border-t border-[var(--border)] pt-4">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <span>
            <strong className="font-medium text-[var(--foreground)]">
              {correctRate}%
            </strong>{' '}
            acertaram
          </span>
          <span>
            <strong className="font-medium text-[var(--foreground)]">
              {incorrectRate}%
            </strong>{' '}
            erraram
          </span>
          <span className="text-[var(--arc-text-muted)]">
            {aggregate.totalAttempts} respostas
          </span>
        </div>
        <div className="mt-4 grid gap-2.5">
          {question.options.map((option) => {
            const selectionCount = aggregate.optionSelections[option.id] ?? 0;
            const rate = Math.round(
              (selectionCount / aggregate.totalAttempts) * 100,
            );
            return (
              <div
                className="grid grid-cols-[1.5rem_1fr_auto] items-center gap-2.5 text-xs"
                key={option.id}
              >
                <span className="font-medium text-[var(--arc-text-muted)]">
                  {option.label}
                </span>
                <AnimatedProgressBar
                  indicatorClassName={
                    option.id === question.correctOptionId
                      ? 'bg-[#729b84]'
                      : 'bg-[#aab4b9]'
                  }
                  label={`${rate}% escolheram a alternativa ${option.label}`}
                  value={rate}
                />
                <span className="tabular-nums text-[var(--arc-text-muted)]">
                  {rate}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </details>
  );
}
