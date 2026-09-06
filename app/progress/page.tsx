'use client';

import { useMemo } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { AttemptStatusBadge, ArcCard } from '@/components/arc-ui';
import type {
  CatalogueQuestion,
  CatalogueSnapshot,
} from '@/lib/data/catalogue-repository';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { useLearnerState } from '@/lib/data/use-learner-state';
import {
  getAttemptNumber,
  getLatestAttemptsByQuestion,
  summarizeProgress,
} from '@/lib/domain/progress';
import type { QuestionAttempt } from '@/lib/domain/questions';

const minimumReliableSampleSize = 3;

type TopicPerformance = {
  id: string;
  name: string;
  attempted: number;
  correct: number;
  subjectId: string;
};
type SubjectPerformance = {
  id: string;
  name: string;
  attempted: number;
  correct: number;
  topics: TopicPerformance[];
};

function formatAttemptDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getPrimaryTopic(
  question: CatalogueQuestion,
  catalogue: CatalogueSnapshot,
) {
  const primaryTag =
    question.taxonomyTags.find((tag) => tag.isPrimary) ??
    question.taxonomyTags[0];
  let node = catalogue.taxonomyNodes.find(
    (item) => item.id === primaryTag?.taxonomyNodeId,
  );
  while (node && node.kind !== 'topic')
    node = catalogue.taxonomyNodes.find((item) => item.id === node?.parentId);
  return node;
}

function buildPerformance(
  attempts: QuestionAttempt[],
  catalogue: CatalogueSnapshot | null,
): SubjectPerformance[] {
  if (!catalogue) return [];
  const subjects = new Map<string, SubjectPerformance>();
  const topics = new Map<string, TopicPerformance>();

  for (const attempt of getLatestAttemptsByQuestion(attempts).values()) {
    const question = catalogue.questions.find(
      (item) => item.id === attempt.questionId,
    );
    if (!question) continue;
    const subject = catalogue.subjects.find(
      (item) => item.id === question.subjectId,
    );
    if (!subject) continue;
    const subjectItem = subjects.get(subject.id) ?? {
      id: subject.id,
      name: subject.name,
      attempted: 0,
      correct: 0,
      topics: [],
    };
    subjectItem.attempted += 1;
    if (attempt.outcome === 'correct') subjectItem.correct += 1;
    subjects.set(subject.id, subjectItem);

    const topic = getPrimaryTopic(question, catalogue);
    if (!topic) continue;
    const topicItem = topics.get(topic.id) ?? {
      id: topic.id,
      name: topic.name,
      attempted: 0,
      correct: 0,
      subjectId: subject.id,
    };
    topicItem.attempted += 1;
    if (attempt.outcome === 'correct') topicItem.correct += 1;
    topics.set(topic.id, topicItem);
  }

  for (const topic of topics.values())
    subjects.get(topic.subjectId)?.topics.push(topic);
  return [...subjects.values()].map((subject) => ({
    ...subject,
    topics: [...subject.topics].sort(
      (first, second) =>
        first.attempted - second.attempted || first.correct - second.correct,
    ),
  }));
}

function percentage(correct: number, attempted: number) {
  return Math.round((correct / attempted) * 100);
}

export default function ProgressPage() {
  const { state: learnerState, isLoading } = useLearnerState();
  const { catalogue } = useCatalogue();

  const attempts = learnerState?.attempts ?? [];
  const summary = summarizeProgress(attempts);
  const redoCount = learnerState?.redoQuestionIds.length ?? 0;
  const accuracy = summary.answered
    ? percentage(summary.correct, summary.answered)
    : null;
  const recentAttempts = useMemo(
    () =>
      [...attempts]
        .sort(
          (first, second) =>
            new Date(second.createdAt).getTime() -
            new Date(first.createdAt).getTime(),
        )
        .slice(0, 5),
    [attempts],
  );
  const performance = useMemo(
    () => buildPerformance(attempts, catalogue),
    [attempts, catalogue],
  );

  return (
    <AppShell active="progress">
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <p className="text-sm font-medium text-[var(--arc-accent-strong)]">
          Progresso
        </p>
        <h1 className="mt-2 text-4xl font-medium tracking-[-0.065em] sm:text-5xl">
          Seu histórico, em resumo.
        </h1>
        <p className="mt-3 max-w-lg text-[15px] leading-6 text-[var(--arc-text-muted)]">
          Cada questão conta uma vez. Ao refazer, o resultado mais recente
          substitui o anterior.
        </p>
        {isLoading ? (
          <ArcCard className="mt-10 p-6 text-sm text-[var(--arc-text-muted)]">
            Carregando seu progresso…
          </ArcCard>
        ) : (
          <>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <ArcCard className="p-5">
                <CheckCircle2 className="size-5 text-[var(--arc-success-text)]" />
                <p className="mt-7 text-3xl font-medium tracking-[-0.05em]">
                  {summary.correct}
                </p>
                <p className="mt-1 text-sm text-[var(--arc-text-muted)]">
                  Acertos
                </p>
                {accuracy !== null && (
                  <p className="mt-3 text-xs font-medium text-[var(--arc-success-text)]">
                    {accuracy}% de aproveitamento
                  </p>
                )}
              </ArcCard>
              <ArcCard className="p-5">
                <XCircle className="size-5 text-[var(--arc-error-text)]" />
                <p className="mt-7 text-3xl font-medium tracking-[-0.05em]">
                  {summary.incorrect}
                </p>
                <p className="mt-1 text-sm text-[var(--arc-text-muted)]">
                  Erros
                </p>
                {summary.incorrect > 0 && (
                  <a
                    className="mt-3 inline-flex text-sm font-medium text-[#9a5555] hover:underline"
                    href="/questions?status=incorrect"
                  >
                    Revisar erros
                  </a>
                )}
              </ArcCard>
              <ArcCard className="p-5">
                <RotateCcw className="size-5 text-[var(--arc-redo-text)]" />
                <p className="mt-7 text-3xl font-medium tracking-[-0.05em]">
                  {redoCount}
                </p>
                <p className="mt-1 text-sm text-[var(--arc-text-muted)]">
                  Para refazer
                </p>
                {redoCount > 0 && (
                  <a
                    className="mt-3 inline-flex text-sm font-medium text-[#84642c] hover:underline"
                    href="/questions?status=redo"
                  >
                    Abrir revisão
                  </a>
                )}
              </ArcCard>
            </div>
            <ArcCard className="mt-6 p-6">
              <p className="font-medium tracking-[-0.025em]">
                {summary.answered
                  ? `${summary.answered} questão${summary.answered === 1 ? '' : 'ões'} respondida${summary.answered === 1 ? '' : 's'}.`
                  : 'Nenhuma questão respondida ainda.'}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--arc-text-muted)]">
                {summary.answered
                  ? 'Continue praticando para atualizar seus resultados.'
                  : 'Escolha uma disciplina e resolva a primeira questão.'}
              </p>
              <a
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline"
                href="/explore"
              >
                Ir para questões <ArrowRight className="size-4" />
              </a>
            </ArcCard>
            {performance.length > 0 && (
              <section className="mt-10">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--arc-text-muted)]">
                  Por assunto
                </p>
                <div className="mt-4 grid gap-3">
                  {performance.map((subject) => (
                    <ArcCard className="p-5 sm:p-6" key={subject.id}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-medium tracking-[-0.025em]">
                          {subject.name}
                        </p>
                        <p className="text-sm text-[var(--arc-text-muted)]">
                          {subject.attempted >= minimumReliableSampleSize
                            ? `${percentage(subject.correct, subject.attempted)}% de acerto`
                            : `${subject.attempted} respondida${subject.attempted === 1 ? '' : 's'}`}
                        </p>
                      </div>
                      <div className="mt-4 divide-y divide-[var(--border)]">
                        {subject.topics.map((topic) => (
                          <div
                            className="flex items-center justify-between gap-4 py-3"
                            key={topic.id}
                          >
                            <div>
                              <p className="text-sm font-medium">
                                {topic.name}
                              </p>
                              <p className="mt-1 text-xs text-[var(--arc-text-muted)]">
                                {topic.attempted >= minimumReliableSampleSize
                                  ? `${percentage(topic.correct, topic.attempted)}% de acerto em ${topic.attempted} questões`
                                  : `${topic.attempted} resposta${topic.attempted === 1 ? '' : 's'} · percentual após 3 questões`}
                              </p>
                            </div>
                            <a
                              className="shrink-0 text-sm font-medium text-[#46657a] hover:underline"
                              href={`/questions?subject=${topic.subjectId}&topic=${topic.id}`}
                            >
                              Praticar
                            </a>
                          </div>
                        ))}
                      </div>
                    </ArcCard>
                  ))}
                </div>
              </section>
            )}
            {recentAttempts.length > 0 && (
              <section className="mt-10">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--arc-text-muted)]">
                  Tentativas recentes
                </p>
                <div className="mt-4 grid gap-2">
                  {recentAttempts.map((attempt) => (
                    <AttemptRow
                      attempt={attempt}
                      attempts={attempts}
                      catalogue={catalogue}
                      key={attempt.id}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </section>
    </AppShell>
  );
}

function AttemptRow({
  attempt,
  attempts,
  catalogue,
}: {
  attempt: QuestionAttempt;
  attempts: QuestionAttempt[];
  catalogue: CatalogueSnapshot | null;
}) {
  const question = catalogue?.questions.find(
    (item) => item.id === attempt.questionId,
  );
  const subject = catalogue?.subjects.find(
    (item) => item.id === question?.subjectId,
  );
  const topic =
    question && catalogue ? getPrimaryTopic(question, catalogue) : undefined;
  const option =
    question?.kind === 'multiple_choice' &&
    attempt.answer.kind === 'selected_option'
      ? question.options.find(
          (item) => item.id === attempt.answer.selectedOptionId,
        )
      : null;
  const status =
    attempt.outcome === 'correct'
      ? 'correct'
      : attempt.outcome === 'incorrect'
        ? 'incorrect'
        : 'redo';

  return (
    <ArcCard className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">
          {subject?.name ?? 'Disciplina'}
          {topic ? ` · ${topic.name}` : ''}
        </p>
        <p className="mt-1 text-xs text-[var(--arc-text-muted)]">
          Tentativa {getAttemptNumber(attempt, attempts)}
          {option ? ` · alternativa ${option.label}` : ''} ·{' '}
          {formatAttemptDate(attempt.createdAt)}
        </p>
      </div>
      <AttemptStatusBadge status={status} />
    </ArcCard>
  );
}
