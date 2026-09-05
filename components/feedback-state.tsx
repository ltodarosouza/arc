import type { ReactNode } from 'react';
import { AlertCircle, BookOpen, ChartNoAxesColumnIncreasing, Compass } from 'lucide-react';

import { cn } from '@/lib/utils';

type FeedbackTone = 'empty' | 'error' | 'loading';

type FeedbackStateProps = {
  title: string;
  description: string;
  tone?: FeedbackTone;
  action?: ReactNode;
  className?: string;
};

const toneIcon = {
  empty: Compass,
  error: AlertCircle,
  loading: BookOpen,
};

/**
 * A calm, action-oriented state for empty results, recoverable errors, and
 * short loading pauses. Callers provide the next action so learners are never
 * left at a dead end.
 */
export function FeedbackState({
  title,
  description,
  tone = 'empty',
  action,
  className,
}: FeedbackStateProps) {
  const Icon = toneIcon[tone];

  return (
    <section
      aria-live={tone === 'loading' ? 'polite' : undefined}
      className={cn(
        'flex min-h-56 flex-col items-start justify-center rounded-[24px] border border-black/[0.07] bg-white px-6 py-8 sm:px-8',
        className,
      )}
    >
      <span
        className={cn(
          'grid size-10 place-items-center rounded-2xl',
          tone === 'error' ? 'bg-[#f9eeee] text-[#9a5757]' : 'bg-[#eff4f0] text-[#466254]',
        )}
      >
        <Icon className={cn('size-[18px]', tone === 'loading' && 'animate-pulse')} />
      </span>
      <h2 className="mt-5 text-lg font-medium tracking-[-0.035em]">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  );
}

export function ProgressEmptyState({ action }: { action: ReactNode }) {
  return (
    <FeedbackState
      title="Seu progresso começa na primeira questão"
      description="Resolva uma questão para acompanhar seus acertos, erros e os assuntos que vale revisar."
      action={action}
      className="bg-[#fcfcfb]"
    />
  );
}

export function NoResultsState({ action }: { action: ReactNode }) {
  return (
    <FeedbackState
      title="Nenhuma questão encontrada"
      description="Tente retirar um filtro ou explore outro assunto desta disciplina."
      action={action}
    />
  );
}

export function SubjectSelectionEmptyState({ action }: { action: ReactNode }) {
  return (
    <FeedbackState
      title="Escolha suas disciplinas"
      description="Adicione as disciplinas que você está estudando para encontrá-las rapidamente na próxima vez."
      action={action}
    />
  );
}

export function QuestionUnavailableState({ action }: { action: ReactNode }) {
  return (
    <FeedbackState
      title="Esta questão não está disponível agora"
      description="Ela pode ter sido atualizada. Volte ao banco e escolha outra questão para continuar praticando."
      tone="error"
      action={action}
    />
  );
}

export function ProgressIcon() {
  return <ChartNoAxesColumnIncreasing aria-hidden="true" className="size-[18px]" />;
}
