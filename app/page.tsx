'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { ArcCard } from '@/components/arc-ui';
import { AnimatedProgressBar } from '@/components/animated-progress-bar';
import { Reveal } from '@/components/reveal';
import { FeedbackState } from '@/components/feedback-state';
import { normalizeSelectedSubjectIds } from '@/lib/data/catalogue-repository';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { useLearnerState } from '@/lib/data/use-learner-state';
import { getLatestAttemptsByQuestion } from '@/lib/domain/progress';

export default function Home() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const { catalogue, isLoading, error } = useCatalogue();
  const {
    state: learnerState,
    saveSelectedSubjectIds,
    isLoading: learnerLoading,
  } = useLearnerState();

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
  const progress = useMemo(
    () => ({
      completed: outcomeByQuestionId.size,
      correct: [...outcomeByQuestionId.values()].filter(
        (outcome) => outcome === 'correct',
      ).length,
    }),
    [outcomeByQuestionId],
  );
  const resumeSubject = useMemo(() => {
    const latestAttempt = [...(learnerState?.attempts ?? [])].sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    )[0];
    const question = catalogue?.questions.find(
      (item) => item.id === latestAttempt?.questionId,
    );
    return catalogue?.subjects.find((item) => item.id === question?.subjectId);
  }, [catalogue, learnerState]);
  const resumeHref = resumeSubject
    ? `/questions?subject=${resumeSubject.slug}&status=not_attempted`
    : selectedSubjects.length
      ? '/explore'
      : '/subjects';

  return (
    <AppShell active="home">
      <section className="arc-page">
        <div className="animate-enter max-w-2xl">
          <div>
            <p className="text-sm font-medium text-[var(--arc-accent-strong)]">
              Início
            </p>
            <h1
              aria-label="O que vamos praticar?"
              className="arc-title mt-2 max-w-xl"
            >
              <span aria-hidden="true">
                {[...'O que vamos praticar?'].map((letter, index) => (
                  <span
                    className="arc-title-letter"
                    key={`${letter}-${index}`}
                    style={{ animationDelay: `${120 + index * 28}ms` }}
                  >
                    {letter === ' ' ? '\u00a0' : letter}
                  </span>
                ))}
              </span>
            </h1>
            <a className="arc-action group mt-5" href={resumeHref}>
              {resumeSubject
                ? `Continuar em ${resumeSubject.name}`
                : selectedSubjects.length
                  ? 'Ir para questões'
                  : 'Escolher disciplinas'}{' '}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
        {progress.completed > 0 && !learnerLoading && (
          <div className="arc-section flex max-w-xl flex-wrap items-center gap-x-10 gap-y-5 border-y border-[var(--border)] py-5">
            <div>
              <p className="text-2xl font-semibold tabular-nums">
                {progress.completed}
              </p>
              <p className="arc-caption">Questões feitas</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums">
                {progress.correct}
              </p>
              <p className="arc-caption">Acertos</p>
            </div>
            <a
              href="/progress"
              className="arc-link inline-flex min-h-11 items-center gap-2 text-sm"
            >
              Ver progresso <ArrowRight className="size-4" />
            </a>
          </div>
        )}
        <div className="arc-section">
          <div className="flex items-center justify-between gap-4">
            <h2 className="arc-section-title">Minhas disciplinas</h2>
            <a
              className="text-sm font-medium text-[#46657a] hover:underline"
              href="/subjects"
            >
              Gerenciar
            </a>
          </div>
          {isLoading || learnerLoading ? (
            <div
              aria-label="Carregando disciplinas"
              aria-busy="true"
              className="mt-5 grid gap-4 sm:grid-cols-2"
            >
              {[0, 1].map((id) => (
                <ArcCard
                  key={id}
                  className="h-48 animate-pulse bg-[var(--arc-surface-subtle)]"
                />
              ))}
            </div>
          ) : error ? (
            <FeedbackState
              className="mt-5"
              title="As disciplinas não carregaram"
              description="Tente novamente para abrir seu catálogo."
              tone="error"
              action={
                <button
                  className="arc-link"
                  onClick={() => window.location.reload()}
                >
                  Tentar novamente
                </button>
              }
            />
          ) : selectedSubjects.length ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedSubjects.map((subject, index) => {
                const subjectQuestionIds =
                  catalogue?.questions
                    .filter((question) => question.subjectId === subject.id)
                    .map((question) => question.id) ?? [];
                const completed = subjectQuestionIds.filter((id) =>
                  outcomeByQuestionId.has(id),
                ).length;
                const remaining = subjectQuestionIds.length - completed;
                return (
                  <Reveal key={subject.id} delay={index * 40}>
                    <ArcCard className="group relative h-full p-6 hover:-translate-y-0.5 hover:border-[#a8bcbd]">
                      <a
                        aria-label={`Abrir ${subject.name}`}
                        className="absolute inset-0 rounded-[var(--arc-radius-card)]"
                        href={`/explore/${subject.slug}`}
                      />
                      <span className="grid size-9 place-items-center rounded-xl bg-[var(--arc-accent)] text-[#46657a]">
                        <BookOpen className="size-4 transition-transform duration-300 group-hover:scale-105" />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">
                        {subject.name}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-[var(--arc-text-muted)]">
                        {subject.description}
                      </p>
                      <AnimatedProgressBar
                        className="mt-5 h-1"
                        label={`${completed} de ${subjectQuestionIds.length} questões concluídas em ${subject.name}`}
                        value={
                          subjectQuestionIds.length
                            ? (completed / subjectQuestionIds.length) * 100
                            : 0
                        }
                      />
                      <p className="mt-2 text-xs text-[var(--arc-text-muted)]">
                        {subjectQuestionIds.length
                          ? remaining
                            ? `${remaining} ${remaining === 1 ? 'questão para fazer' : 'questões para fazer'}`
                            : 'Todas as questões concluídas'
                          : 'Catálogo em preparação'}
                      </p>
                      <p className="mt-5 text-sm font-medium text-[#46657a]">
                        Abrir disciplina{' '}
                        <ChevronRight className="inline size-4" />
                      </p>
                    </ArcCard>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <ArcCard className="mt-5 p-5">
              <p className="text-sm text-[var(--arc-text-muted)]">
                Nenhuma disciplina selecionada.
              </p>
              <a
                className="mt-3 inline-flex text-sm font-medium text-[#46657a] hover:underline"
                href="/subjects"
              >
                Escolher disciplinas
              </a>
            </ArcCard>
          )}
        </div>
      </section>
    </AppShell>
  );
}
