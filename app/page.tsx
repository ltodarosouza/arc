'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { AppShell } from '@/components/app-shell';
import {
  AnimatedHeadline,
  type HeadlinePart,
} from '@/components/animated-headline';
import { DailyGoalDialog } from '@/components/daily-goal-dialog';
import { Section } from '@/components/section';
import { ArcCard } from '@/components/arc-ui';
import { AnimatedNumber } from '@/components/animated-number';
import { Reveal } from '@/components/reveal';
import { FeedbackState } from '@/components/feedback-state';
import { normalizeSelectedSubjectIds } from '@/lib/data/catalogue-repository';
import { useCatalogueSummary } from '@/lib/data/use-catalogue-summary';
import { useDailyGoal } from '@/lib/data/use-daily-goal';
import { useLearnerState } from '@/lib/data/use-learner-state';
import { getLatestAttemptsByQuestion } from '@/lib/domain/progress';

const maxVisibleDots = 60;

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function Home() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const { catalogue, isLoading, error } = useCatalogueSummary();
  const {
    state: learnerState,
    saveSelectedSubjectIds,
    isLoading: learnerLoading,
  } = useLearnerState();
  const {
    dailyGoal,
    setDailyGoal,
    isLoading: dailyGoalLoading,
  } = useDailyGoal();
  const heroReady =
    !isLoading && !learnerLoading && !dailyGoalLoading && Boolean(learnerState);

  useEffect(() => {
    if (!catalogue) return;
    const state = learnerState;
    if (!state) return;
    const subjectIds = normalizeSelectedSubjectIds(
      state.selectedSubjectIds,
      catalogue,
    );
    setSelectedSubjectIds(subjectIds);
    if (subjectIds.join(',') !== state.selectedSubjectIds.join(','))
      void saveSelectedSubjectIds(subjectIds);
  }, [catalogue, learnerState, saveSelectedSubjectIds]);

  const selectedSubjects =
    catalogue?.subjects.filter((subject) =>
      selectedSubjectIds.includes(subject.id),
    ) ?? [];
  const outcomeByQuestionId = useMemo(() => {
    return new Map(
      [
        ...getLatestAttemptsByQuestion(learnerState?.attempts ?? []).values(),
      ].map((attempt) => [attempt.questionId, attempt.outcome]),
    );
  }, [learnerState]);
  const redoQuestionIds = useMemo(
    () => new Set(learnerState?.redoQuestionIds ?? []),
    [learnerState],
  );
  const progress = useMemo(
    () => ({
      completed: outcomeByQuestionId.size,
      correct: [...outcomeByQuestionId.values()].filter(
        (outcome) => outcome === 'correct',
      ).length,
    }),
    [outcomeByQuestionId],
  );
  const accuracyPct = progress.completed
    ? Math.round((progress.correct / progress.completed) * 100)
    : 0;
  const recentAttempts = useMemo(
    () =>
      [...(learnerState?.attempts ?? [])]
        .sort(
          (first, second) =>
            new Date(second.createdAt).getTime() -
            new Date(first.createdAt).getTime(),
        )
        .slice(0, 6),
    [learnerState],
  );
  const recentCorrect = recentAttempts.filter(
    (attempt) => attempt.outcome === 'correct',
  ).length;
  const resumeSubject = useMemo(() => {
    const latestAttempt = recentAttempts[0];
    const question = catalogue?.questions.find(
      (item) => item.id === latestAttempt?.questionId,
    );
    return catalogue?.subjects.find((item) => item.id === question?.subjectId);
  }, [catalogue, recentAttempts]);
  const resumeHref = resumeSubject
    ? `/questions?subject=${resumeSubject.slug}&status=not_attempted`
    : selectedSubjects.length
      ? '/explore'
      : '/subjects';

  const hasStarted = progress.completed > 0;
  const todayKey = new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/Fortaleza',
  });
  const doneToday = useMemo(() => {
    const ids = new Set(
      (learnerState?.attempts ?? [])
        .filter(
          (attempt) =>
            new Date(attempt.createdAt).toLocaleDateString('en-CA', {
              timeZone: 'America/Fortaleza',
            }) === todayKey,
        )
        .map((attempt) => attempt.questionId),
    );
    return ids.size;
  }, [learnerState, todayKey]);
  const remainingForGoal = dailyGoal ? Math.max(0, dailyGoal - doneToday) : 0;
  const metGoalToday = Boolean(dailyGoal) && doneToday >= (dailyGoal ?? 0);

  const heroLines: HeadlinePart[][] = metGoalToday
    ? [['Meta batida'], ['por hoje. Bom trabalho.']]
    : dailyGoal
      ? [
          ['Faltam ', { accent: String(remainingForGoal) }, ' questões'],
          ['para bater sua meta diária.'],
        ]
      : [['Sua próxima questão'], ['te espera.']];
  const heroItalicLines = !dailyGoal ? [1] : [];
  const heroChangeKey = metGoalToday
    ? 'met'
    : dailyGoal
      ? `goal:${remainingForGoal}`
      : 'nogoal';
  const weekday = capitalize(
    new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date()),
  );

  const dotClassFor = (questionId: string) => {
    if (redoQuestionIds.has(questionId)) return 'bg-redo';
    const outcome = outcomeByQuestionId.get(questionId);
    if (outcome === 'correct') return 'bg-success';
    if (outcome === 'incorrect' || outcome === 'revealed') return 'bg-error';
    return 'bg-surface-subtle';
  };

  return (
    <AppShell active="home">
      <section className="arc-page">
        {heroReady ? (
          <div className="animate-enter">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-accent-strong uppercase">
              {weekday}
            </p>
            <AnimatedHeadline
              changeKey={heroChangeKey}
              className="mt-3"
              italicLines={heroItalicLines}
              lines={heroLines}
            />
            <div
              className="animate-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '180ms' }}
            >
              <Link
                className="arc-action arc-continue group relative"
                href={resumeHref}
              >
                {hasStarted ? 'Continuar de onde parei' : 'Começar a praticar'}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <DailyGoalDialog dailyGoal={dailyGoal} onChange={setDailyGoal} />
            </div>
            {hasStarted && resumeSubject ? (
              <p
                className="animate-rise mt-6 max-w-md text-sm leading-6 text-muted-foreground"
                style={{ animationDelay: '230ms' }}
              >
                Última parada:{' '}
                <span className="font-medium text-foreground">
                  {resumeSubject.name}
                </span>
                . Você acertou {recentCorrect} das últimas{' '}
                {recentAttempts.length} questões.
              </p>
            ) : null}
          </div>
        ) : (
          <div
            aria-busy="true"
            aria-label="Carregando"
            className="animate-pulse"
          >
            <div className="h-3 w-24 rounded-full bg-surface-subtle" />
            <div className="mt-4 grid gap-3">
              <div className="h-[clamp(2.25rem,6vw,4.75rem)] w-[70%] rounded-xl bg-surface-subtle" />
              <div className="h-[clamp(2.25rem,6vw,4.75rem)] w-[88%] rounded-xl bg-surface-subtle" />
            </div>
            <div className="mt-8 flex gap-3">
              <div className="h-11 w-56 rounded-full bg-surface-subtle" />
              <div className="h-11 w-44 rounded-full bg-surface-subtle" />
            </div>
          </div>
        )}

        <Section
          action={
            <Link
              className="text-sm font-medium text-accent-strong hover:underline"
              href="/subjects"
            >
              Gerenciar
            </Link>
          }
          eyebrow="Seu mapa de estudo"
          title="Minhas disciplinas"
        >
          {isLoading || learnerLoading ? (
            <div
              aria-busy="true"
              aria-label="Carregando disciplinas"
              className="border-t border-border"
            >
              {[0, 1].map((id) => (
                <div className="animate-pulse py-7" key={id}>
                  <div className="h-8 w-1/3 rounded-full bg-surface-subtle" />
                  <div className="mt-3 h-4 w-2/3 rounded-full bg-surface-subtle" />
                </div>
              ))}
            </div>
          ) : error ? (
            <FeedbackState
              action={
                <button
                  className="arc-link"
                  onClick={() => window.location.reload()}
                >
                  Tentar novamente
                </button>
              }
              description="Tente novamente para abrir seu catálogo."
              title="As disciplinas não carregaram"
              tone="error"
            />
          ) : selectedSubjects.length ? (
            <div>
              {selectedSubjects.map((subject, index) => {
                const subjectQuestions =
                  catalogue?.questions.filter(
                    (question) => question.subjectId === subject.id,
                  ) ?? [];
                const completed = subjectQuestions.filter((question) =>
                  outcomeByQuestionId.has(question.id),
                ).length;
                const correctCount = subjectQuestions.filter(
                  (question) =>
                    outcomeByQuestionId.get(question.id) === 'correct',
                ).length;
                const remaining = subjectQuestions.length - completed;
                const accuracyLabel = completed
                  ? `${Math.round((correctCount / completed) * 100)}%`
                  : '—';
                const visibleDots = subjectQuestions.slice(0, maxVisibleDots);
                const hiddenDotCount =
                  subjectQuestions.length - visibleDots.length;
                return (
                  <Reveal delay={index * 55} key={subject.id}>
                    <div className="arc-subject-row group">
                      <Link
                        aria-label={`Abrir ${subject.name}`}
                        className="absolute inset-0"
                        href={`/explore/${subject.slug}`}
                      />
                      <div className="relative min-w-0">
                        <h3 className="truncate font-display text-[1.65rem] leading-[1.08] font-medium tracking-[-0.04em] sm:text-[2.15rem]">
                          {subject.name}
                        </h3>
                        <p className="mt-1.5 truncate text-sm text-muted-foreground">
                          {subject.description}
                        </p>
                      </div>
                      <div className="relative hidden sm:block">
                        {subjectQuestions.length ? (
                          <>
                            <div className="flex max-w-[220px] flex-wrap gap-1">
                              {visibleDots.map((question) => (
                                <span
                                  className={`size-[9px] rounded-[2.5px] ${dotClassFor(question.id)}`}
                                  key={question.id}
                                />
                              ))}
                              {hiddenDotCount > 0 ? (
                                <span className="text-[10px] font-medium text-muted-foreground">
                                  +{hiddenDotCount}
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-2 font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
                              {subjectQuestions.length} questões
                            </p>
                          </>
                        ) : (
                          <p className="font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
                            Em preparação
                          </p>
                        )}
                      </div>
                      <div className="relative text-right">
                        <p className="arc-metric leading-none text-foreground">
                          {accuracyLabel}
                        </p>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          {subjectQuestions.length
                            ? `${remaining} restantes de ${subjectQuestions.length}`
                            : 'Catálogo em preparação'}
                        </p>
                      </div>
                      <span className="relative grid size-10 place-items-center rounded-full text-accent-strong transition-[background-color,transform] duration-300 group-hover:translate-x-1 group-hover:bg-accent">
                        <ChevronRight className="size-5" />
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <ArcCard className="p-5">
              <p className="text-sm text-muted-foreground">
                Nenhuma disciplina selecionada.
              </p>
              <Link
                className="mt-3 inline-flex text-sm font-medium text-accent-strong hover:underline"
                href="/subjects"
              >
                Escolher disciplinas
              </Link>
            </ArcCard>
          )}
        </Section>

        <Section className="border-t border-border pt-8">
          <div className="flex flex-wrap items-end gap-x-12 gap-y-6">
            <div>
              <p className="arc-stat-figure text-foreground">
                <AnimatedNumber
                  value={learnerLoading ? 0 : progress.completed}
                />
              </p>
              <p className="arc-caption mt-2.5">questões feitas</p>
            </div>
            <div>
              <p className="arc-stat-figure text-success">
                <AnimatedNumber value={learnerLoading ? 0 : progress.correct} />
              </p>
              <p className="arc-caption mt-2.5">acertos</p>
            </div>
            <div>
              <p className="arc-stat-figure text-accent-strong">
                <AnimatedNumber
                  suffix="%"
                  value={learnerLoading ? 0 : accuracyPct}
                />
              </p>
              <p className="arc-caption mt-2.5">aproveitamento</p>
            </div>
            <Link
              className="ml-auto text-sm font-medium text-accent-strong hover:underline"
              href="/progress"
            >
              Ver progresso completo →
            </Link>
          </div>
        </Section>
      </section>
    </AppShell>
  );
}
