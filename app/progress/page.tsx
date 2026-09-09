'use client';

import { useMemo } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ProgressChart } from '@/components/progress-chart';
import { FeedbackState } from '@/components/feedback-state';
import { Reveal } from '@/components/reveal';

import { AppShell } from '@/components/app-shell';
import { AttemptStatusBadge, ArcCard } from '@/components/arc-ui';
import { AnimatedProgressBar } from '@/components/animated-progress-bar';
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
  slug: string;
  name: string;
  attempted: number;
  correct: number;
  subjectId: string;
  subjectSlug: string;
};
type SubjectPerformance = {
  id: string;
  slug: string;
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
      slug: subject.slug,
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
      slug: topic.slug,
      name: topic.name,
      attempted: 0,
      correct: 0,
      subjectId: subject.id,
      subjectSlug: subject.slug,
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
  const { state: learnerState, isLoading, error, refresh } = useLearnerState();
  const {
    catalogue,
    isLoading: catalogueLoading,
    error: catalogueError,
  } = useCatalogue();

  const attempts = useMemo(() => learnerState?.attempts ?? [], [learnerState]);
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
  const subjectsWithErrors = useMemo(
    () => performance.filter((subject) => subject.correct < subject.attempted),
    [performance],
  );
  const subjectsToRedo = useMemo(
    () =>
      catalogue?.subjects.filter((subject) =>
        catalogue.questions.some(
          (question) =>
            question.subjectId === subject.id &&
            learnerState?.redoQuestionIds.includes(question.id),
        ),
      ) ?? [],
    [catalogue, learnerState?.redoQuestionIds],
  );

  return (
    <AppShell active="progress">
      <section className="arc-page arc-page--reading">
        <div className="animate-enter">
          <h1 className="arc-title">Seu progresso</h1>
          <p className="mt-3 max-w-lg text-[15px] leading-6 text-[var(--arc-text-muted)]">
            Cada questão conta uma vez. Ao refazer, o resultado mais recente
            substitui o anterior.
          </p>
        </div>
        {isLoading || catalogueLoading ? (
          <ArcCard className="mt-10 p-6 text-sm text-[var(--arc-text-muted)]">
            Carregando seu progresso…
          </ArcCard>
        ) : error || catalogueError ? (
          <FeedbackState
            className="mt-8"
            tone="error"
            title="Seu progresso não carregou"
            description="Seus registros não foram alterados. Tente carregar novamente."
            action={
              <button
                className="arc-link"
                onClick={() =>
                  catalogueError ? window.location.reload() : void refresh()
                }
              >
                Tentar novamente
              </button>
            }
          />
        ) : (
          <>
            <dl className="arc-section grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-y border-[var(--border)] py-6">
              {[
                {
                  label: 'Questões feitas',
                  value: summary.answered,
                  detail: `${summary.correct} ${summary.correct === 1 ? 'acerto' : 'acertos'} · ${summary.incorrect} ${summary.incorrect === 1 ? 'erro' : 'erros'}`,
                },
                {
                  label: 'Aproveitamento',
                  value: accuracy === null ? '—' : `${accuracy}%`,
                  detail: 'Resultado mais recente',
                },
                {
                  label: 'Erros',
                  value: summary.incorrect,
                  detail: 'Revise por disciplina abaixo',
                },
                {
                  label: 'Para refazer',
                  value: redoCount,
                  detail: 'Questões marcadas por você',
                },
              ].map((metric) => (
                <div key={metric.label}>
                  <dt className="text-sm text-[var(--arc-text-muted)]">
                    {metric.label}
                  </dt>
                  <dd className="arc-metric mt-2">{metric.value}</dd>
                  <dd className="arc-caption mt-2">{metric.detail}</dd>
                </div>
              ))}
            </dl>
            {subjectsWithErrors.length > 0 && (
              <details className="arc-disclosure mt-3 text-sm">
                <summary className="arc-link inline-flex min-h-11 items-center gap-2">
                  Revisar erros{' '}
                  <ChevronDown className="disclosure-icon size-4" />
                </summary>
                <ReviewSubjectLinks
                  subjects={subjectsWithErrors}
                  status="incorrect"
                />
              </details>
            )}
            {redoCount > 0 && (
              <details className="arc-disclosure mt-3 text-sm">
                <summary className="arc-link inline-flex min-h-11 items-center gap-2">
                  Abrir revisão{' '}
                  <ChevronDown className="disclosure-icon size-4" />
                </summary>
                <ReviewSubjectLinks subjects={subjectsToRedo} status="redo" />
              </details>
            )}
            {summary.answered > 0 && <ProgressChart attempts={attempts} />}
            {!summary.answered && (
              <ArcCard className="mt-6 p-6">
                <p className="font-medium tracking-[-0.025em]">
                  {summary.answered
                    ? `${summary.answered} ${summary.answered === 1 ? 'questão respondida.' : 'questões respondidas.'}`
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
            )}
            {performance.length > 0 && (
              <section className="arc-section">
                <h2 className="arc-section-title">Por disciplina</h2>
                <div className="mt-4 grid gap-3">
                  {performance.map((subject, index) => (
                    <Reveal delay={index * 55} key={subject.id} variant="card">
                      <ArcCard className="p-5 sm:p-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <a
                            className="font-medium tracking-[-0.025em] transition-colors hover:text-[#46657a]"
                            href={`/questions?subject=${subject.slug}`}
                          >
                            {subject.name}
                          </a>
                          <p className="text-sm text-[var(--arc-text-muted)]">
                            {subject.attempted >= minimumReliableSampleSize
                              ? `${percentage(subject.correct, subject.attempted)}% de acerto`
                              : `${subject.attempted} respondida${subject.attempted === 1 ? '' : 's'}`}
                          </p>
                        </div>
                        <AnimatedProgressBar
                          className="mt-4"
                          label={`${percentage(subject.correct, subject.attempted)}% de acerto em ${subject.name}`}
                          value={percentage(subject.correct, subject.attempted)}
                        />
                        <p className="arc-caption mt-2">
                          {subject.correct}{' '}
                          {subject.correct === 1 ? 'acerto' : 'acertos'} em{' '}
                          {subject.attempted}{' '}
                          {subject.attempted === 1 ? 'questão' : 'questões'}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                          {subject.attempted > subject.correct && (
                            <a
                              className="arc-link inline-flex min-h-11 items-center"
                              href={`/questions?subject=${subject.slug}&status=incorrect`}
                            >
                              Revisar erros
                            </a>
                          )}
                          <a
                            className="arc-link inline-flex min-h-11 items-center"
                            href={`/questions?subject=${subject.slug}&status=redo`}
                          >
                            Para refazer
                          </a>
                        </div>
                        <details className="arc-disclosure mt-2 border-t border-[var(--border)]">
                          <summary className="flex min-h-12 items-center justify-between gap-2 text-sm font-medium">
                            Desempenho por assunto{' '}
                            <ChevronDown className="disclosure-icon size-4" />
                          </summary>
                          <div className="disclosure-content divide-y divide-[var(--border)]">
                            {subject.topics.map((topic) => (
                              <div
                                className="flex items-center justify-between gap-4 py-3"
                                key={topic.id}
                              >
                                <div>
                                  <a
                                    className="text-sm font-medium transition-colors hover:text-[#46657a]"
                                    href={`/questions?subject=${topic.subjectSlug}&topic=${topic.slug}`}
                                  >
                                    {topic.name}
                                  </a>
                                  <p className="mt-1 text-xs text-[var(--arc-text-muted)]">
                                    {topic.attempted >=
                                    minimumReliableSampleSize
                                      ? `${percentage(topic.correct, topic.attempted)}% de acerto em ${topic.attempted} questões`
                                      : `${topic.attempted} resposta${topic.attempted === 1 ? '' : 's'} · percentual após 3 questões`}
                                  </p>
                                </div>
                                <a
                                  className="shrink-0 text-sm font-medium text-[#46657a] hover:underline"
                                  href={`/questions?subject=${topic.subjectSlug}&topic=${topic.slug}`}
                                >
                                  Praticar
                                </a>
                              </div>
                            ))}
                          </div>
                        </details>
                      </ArcCard>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}
            {recentAttempts.length > 0 && (
              <section className="arc-section">
                <h2 className="arc-section-title">Tentativas recentes</h2>
                <div className="mt-4 divide-y divide-[var(--border)]">
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

function ReviewSubjectLinks({
  subjects,
  status,
}: {
  subjects: Pick<SubjectPerformance, 'id' | 'name' | 'slug'>[];
  status: 'incorrect' | 'redo';
}) {
  return (
    <div className="disclosure-content flex flex-wrap gap-3 py-2">
      {subjects.map((subject) => (
        <a
          key={subject.id}
          className="arc-link inline-flex min-h-11 items-center rounded-lg border border-[var(--border)] px-3"
          href={`/questions?subject=${subject.slug}&status=${status}`}
        >
          {subject.name} <ArrowRight className="ml-2 size-4" />
        </a>
      ))}
    </div>
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
  const selectedOptionId =
    attempt.answer.kind === 'selected_option'
      ? attempt.answer.selectedOptionId
      : null;
  const option =
    question && selectedOptionId
      ? question.options.find((item) => item.id === selectedOptionId)
      : null;
  const status =
    attempt.outcome === 'correct'
      ? 'correct'
      : attempt.outcome === 'incorrect'
        ? 'incorrect'
        : 'redo';

  return (
    <a
      className="group block rounded-[var(--arc-radius-card)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]"
      href={
        question && subject
          ? `/practice?subject=${subject.slug}&question=${question.id}`
          : '/progress'
      }
    >
      <div className="flex items-center justify-between gap-4 rounded-lg px-2 py-4 transition-colors group-hover:bg-[var(--arc-surface)]">
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
      </div>
    </a>
  );
}
