'use client';

import { useMemo } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ProgressChart } from '@/components/progress-chart';
import { FeedbackState } from '@/components/feedback-state';

import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { AttemptStatusBadge, ArcCard } from '@/components/arc-ui';
import { AnimatedNumber } from '@/components/animated-number';
import type { CatalogueSummary } from '@/lib/data/catalogue-repository';
import { useCatalogueSummary } from '@/lib/data/use-catalogue-summary';
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
  redo: number;
  total: number;
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
  question: CatalogueSummary['questions'][number],
  catalogue: CatalogueSummary,
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
  catalogue: CatalogueSummary | null,
  redoQuestionIds: string[],
): SubjectPerformance[] {
  if (!catalogue) return [];
  const subjects = new Map<string, SubjectPerformance>();
  const topics = new Map<string, TopicPerformance>();
  const questionsById = new Map(
    catalogue.questions.map((question) => [question.id, question]),
  );
  const subjectsById = new Map(
    catalogue.subjects.map((subject) => [subject.id, subject]),
  );
  const redoSet = new Set(redoQuestionIds);
  const poolBySubject = new Map<string, number>();
  const redoBySubject = new Map<string, number>();
  for (const question of catalogue.questions) {
    poolBySubject.set(
      question.subjectId,
      (poolBySubject.get(question.subjectId) ?? 0) + 1,
    );
    if (redoSet.has(question.id))
      redoBySubject.set(
        question.subjectId,
        (redoBySubject.get(question.subjectId) ?? 0) + 1,
      );
  }

  for (const attempt of getLatestAttemptsByQuestion(attempts).values()) {
    const question = questionsById.get(attempt.questionId);
    if (!question) continue;
    const subject = subjectsById.get(question.subjectId);
    if (!subject) continue;
    const subjectItem = subjects.get(subject.id) ?? {
      id: subject.id,
      slug: subject.slug,
      name: subject.name,
      attempted: 0,
      correct: 0,
      redo: redoBySubject.get(subject.id) ?? 0,
      total: poolBySubject.get(subject.id) ?? 0,
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
  } = useCatalogueSummary();

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
    () =>
      buildPerformance(
        attempts,
        catalogue,
        learnerState?.redoQuestionIds ?? [],
      ),
    [attempts, catalogue, learnerState?.redoQuestionIds],
  );
  const subjectsWithErrors = useMemo(
    () => performance.filter((subject) => subject.correct < subject.attempted),
    [performance],
  );
  const subjectsToRedo = useMemo(() => {
    if (!catalogue) return [];
    const redoQuestionIds = new Set(learnerState?.redoQuestionIds ?? []);
    const redoSubjectIds = new Set(
      catalogue.questions
        .filter((question) => redoQuestionIds.has(question.id))
        .map((question) => question.subjectId),
    );
    return catalogue.subjects.filter((subject) =>
      redoSubjectIds.has(subject.id),
    );
  }, [catalogue, learnerState?.redoQuestionIds]);

  return (
    <AppShell active="progress">
      <section className="arc-page">
        <PageHeader
          eyebrow="Seu histórico"
          title="Seu desempenho"
          description="Cada questão conta uma vez. Ao refazer, o resultado mais recente substitui o anterior."
        />
        {isLoading || catalogueLoading ? (
          <ArcCard className="mt-10 p-6 text-sm text-muted-foreground">
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
            <dl className="arc-section grid grid-cols-2 gap-x-6 gap-y-7 border-y border-border py-6 sm:grid-cols-5">
              {[
                {
                  label: 'Questões feitas',
                  value: summary.answered,
                  detail: 'Total respondido',
                  tone: 'text-foreground',
                },
                {
                  label: 'Aproveitamento',
                  value: accuracy ?? 0,
                  suffix: '%',
                  detail: 'Resultado mais recente',
                  tone: 'text-accent-strong',
                },
                {
                  label: 'Acertos',
                  value: summary.correct,
                  detail: 'Respostas corretas',
                  tone: 'text-success',
                },
                {
                  label: 'Erros',
                  value: summary.incorrect,
                  detail: 'Para revisar',
                  tone: 'text-error',
                },
                {
                  label: 'Para refazer',
                  value: redoCount,
                  detail: 'Marcadas por você',
                  tone: 'text-redo',
                },
              ].map((metric, index) => (
                <div
                  className="animate-rise"
                  key={metric.label}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <dt className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
                    {metric.label}
                  </dt>
                  <dd className={`arc-stat-figure mt-2.5 ${metric.tone}`}>
                    <AnimatedNumber
                      suffix={metric.suffix}
                      value={metric.value}
                    />
                  </dd>
                  <dd className="arc-caption mt-2">{metric.detail}</dd>
                </div>
              ))}
            </dl>
            {subjectsWithErrors.length > 0 && (
              <section className="arc-review-strip mt-5">
                <div>
                  <p className="font-medium">Erros para revisar</p>
                  <p className="arc-caption mt-1">
                    Retome os pontos que ainda pedem atenção.
                  </p>
                </div>
                <ReviewSubjectLinks
                  subjects={subjectsWithErrors}
                  status="incorrect"
                />
              </section>
            )}
            {redoCount > 0 && (
              <section className="arc-review-strip mt-3">
                <div>
                  <p className="font-medium">Questões marcadas para refazer</p>
                  <p className="arc-caption mt-1">
                    Sua seleção pessoal para praticar mais uma vez.
                  </p>
                </div>
                <ReviewSubjectLinks subjects={subjectsToRedo} status="redo" />
              </section>
            )}
            {summary.answered > 0 && <ProgressChart attempts={attempts} />}
            {!summary.answered && (
              <ArcCard className="mt-6 p-6">
                <p className="font-medium tracking-[-0.025em]">
                  {summary.answered
                    ? `${summary.answered} ${summary.answered === 1 ? 'questão respondida.' : 'questões respondidas.'}`
                    : 'Nenhuma questão respondida ainda.'}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {summary.answered
                    ? 'Continue praticando para atualizar seus resultados.'
                    : 'Escolha uma disciplina e resolva a primeira questão.'}
                </p>
                <Link
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline"
                  href="/explore"
                >
                  Ir para questões <ArrowRight className="size-4" />
                </Link>
              </ArcCard>
            )}
            {performance.length > 0 && (
              <section className="arc-section">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="arc-section-title">Por disciplina</h2>
                  <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
                    acerto · feitas · restantes
                  </span>
                </div>
                <div className="arc-perf-table mt-3">
                  {performance.map((subject) => (
                    <SubjectPerfRow key={subject.id} subject={subject} />
                  ))}
                </div>
                <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  <LegendSwatch color="var(--arc-success-text)" label="acertos" />
                  <LegendSwatch color="var(--arc-error-text)" label="erros" />
                  <LegendSwatch color="var(--arc-redo-text)" label="refazer" />
                  <LegendSwatch
                    color="var(--arc-dot-empty)"
                    label="não feitas"
                  />
                </div>
              </section>
            )}
            {recentAttempts.length > 0 && (
              <section className="arc-section">
                <h2 className="arc-section-title">Tentativas recentes</h2>
                <div className="mt-4 divide-y divide-border">
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

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="size-2.5 rounded-[3px]"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

function SubjectPerfRow({ subject }: { subject: SubjectPerformance }) {
  const reliable = subject.attempted >= minimumReliableSampleSize;
  const pct = subject.attempted
    ? percentage(subject.correct, subject.attempted)
    : 0;
  const wrong = Math.max(0, subject.attempted - subject.correct);
  const denom = subject.total || subject.attempted || 1;
  const remaining = Math.max(
    0,
    denom - subject.correct - wrong - subject.redo,
  );
  const left = Math.max(0, subject.total - subject.attempted);
  const rateTone = !reliable
    ? 'text-muted-foreground'
    : pct >= 70
      ? 'text-success'
      : pct < 45
        ? 'text-error'
        : 'text-foreground';
  return (
    <Link className="arc-perf-row" href={`/questions?subject=${subject.slug}`}>
      <span className="min-w-0">
        <span className="block truncate font-medium tracking-[-0.02em]">
          {subject.name}
        </span>
        <span className="arc-caption mt-0.5 block">
          {subject.attempted} de {subject.total} do banco
        </span>
      </span>
      <span
        className="arc-perf-row__bar"
        title={`${pct}% de acerto em ${subject.name}`}
      >
        <span style={{ flexGrow: subject.correct, background: 'var(--arc-success-text)' }} />
        <span style={{ flexGrow: wrong, background: 'var(--arc-error-text)' }} />
        <span style={{ flexGrow: subject.redo, background: 'var(--arc-redo-text)' }} />
        <span style={{ flexGrow: remaining }} />
      </span>
      <span className="arc-perf-row__stats">
        <span className={`font-semibold tabular-nums ${rateTone}`}>
          {reliable ? `${pct}%` : '—'}
        </span>
        <span className="tabular-nums text-muted-foreground">
          {subject.attempted}
        </span>
        <span className="tabular-nums text-muted-foreground">{left}</span>
      </span>
      <ChevronRight className="arc-perf-row__chevron size-4 text-accent-strong" />
    </Link>
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
    <div className="flex flex-wrap gap-2 pt-4">
      {subjects.map((subject) => (
        <Link
          key={subject.id}
          className="arc-link inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 hover:bg-accent"
          href={`/questions?subject=${subject.slug}&status=${status}`}
        >
          {subject.name} <ArrowRight className="ml-2 size-4" />
        </Link>
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
  catalogue: CatalogueSummary | null;
}) {
  const question = catalogue?.questions.find(
    (item) => item.id === attempt.questionId,
  );
  const subject = catalogue?.subjects.find(
    (item) => item.id === question?.subjectId,
  );
  const topic =
    question && catalogue ? getPrimaryTopic(question, catalogue) : undefined;
  const status =
    attempt.outcome === 'correct'
      ? 'correct'
      : attempt.outcome === 'incorrect'
        ? 'incorrect'
        : 'redo';

  return (
    <Link
      className="group block rounded-card focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring"
      href={
        question && subject
          ? `/practice?subject=${subject.slug}&question=${question.id}`
          : '/progress'
      }
    >
      <div className="flex items-center justify-between gap-4 rounded-lg px-2 py-4 transition-colors group-hover:bg-surface">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {subject?.name ?? 'Disciplina'}
            {topic ? ` · ${topic.name}` : ''}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Tentativa {getAttemptNumber(attempt, attempts)} ·{' '}
            {formatAttemptDate(attempt.createdAt)}
          </p>
        </div>
        <AttemptStatusBadge status={status} />
      </div>
    </Link>
  );
}
