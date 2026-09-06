'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { ArcCard } from '@/components/arc-ui';
import { normalizeSelectedSubjectIds } from '@/lib/data/catalogue-repository';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { useLearnerState } from '@/lib/data/use-learner-state';
import type { AttemptOutcome } from '@/lib/domain/questions';

export default function Home() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const { catalogue } = useCatalogue();
  const { state: learnerState, saveSelectedSubjectIds } = useLearnerState();

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
    const outcomes = new Map<string, AttemptOutcome>();
    for (const attempt of learnerState?.attempts ?? [])
      outcomes.set(attempt.questionId, attempt.outcome);
    return outcomes;
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
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-20">
        <div className="animate-enter flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-[var(--arc-accent-strong)]">
              Início
            </p>
            <h1 className="mt-2 max-w-xl text-4xl font-medium tracking-[-0.065em] sm:text-6xl">
              Encontre uma questão e comece.
            </h1>
          </div>
          <a
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--arc-accent)] px-5 text-sm font-medium text-[#263950] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c8d8d6]"
            href={resumeHref}
          >
            {resumeSubject
              ? `Continuar em ${resumeSubject.name}`
              : selectedSubjects.length
                ? 'Ir para questões'
                : 'Escolher disciplinas'}{' '}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
        {progress.completed > 0 && (
          <div className="mt-8 flex items-center gap-3 text-sm text-[var(--arc-text-muted)]">
            <span>
              {progress.completed} feita{progress.completed === 1 ? '' : 's'}
            </span>
            <span className="size-1 rounded-full bg-[#a9b4b9]" />
            <span>
              {progress.correct} acertada{progress.correct === 1 ? '' : 's'}
            </span>
          </div>
        )}
        <div className="mt-10 border-t border-[var(--border)] pt-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--arc-text-muted)]">
              Minhas disciplinas
            </p>
            <a
              className="text-sm font-medium text-[#46657a] hover:underline"
              href="/subjects"
            >
              Gerenciar
            </a>
          </div>
          {selectedSubjects.length ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedSubjects.map((subject) => {
                const subjectQuestionIds =
                  catalogue?.questions
                    .filter((question) => question.subjectId === subject.id)
                    .map((question) => question.id) ?? [];
                const completed = subjectQuestionIds.filter((id) =>
                  outcomeByQuestionId.has(id),
                ).length;
                const remaining = subjectQuestionIds.length - completed;
                return (
                  <ArcCard
                    className="group relative p-5 hover:-translate-y-1 hover:border-[#b8c9c4] hover:shadow-[0_22px_52px_rgba(38,57,80,0.09)]"
                    key={subject.id}
                  >
                    <a
                      aria-label={`Abrir ${subject.name}`}
                      className="absolute inset-0 rounded-[var(--arc-radius-card)]"
                      href={`/explore/${subject.slug}`}
                    />
                    <span className="grid size-9 place-items-center rounded-xl bg-[var(--arc-accent)] text-[#46657a]">
                      <BookOpen className="size-4 transition-transform duration-300 group-hover:scale-105" />
                    </span>
                    <p className="mt-5 font-medium tracking-[-0.03em]">
                      {subject.name}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-[var(--arc-text-muted)]">
                      {subject.description}
                    </p>
                    <p className="mt-4 text-xs font-medium text-[#527184]">
                      {subjectQuestionIds.length
                        ? remaining
                          ? `${remaining} ${remaining === 1 ? 'questão para fazer' : 'questões para fazer'}`
                          : 'Todas as questões concluídas'
                        : 'Catálogo em preparação'}
                    </p>
                    <div className="relative z-10 mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#46657a]">
                      <a
                        className="inline-flex items-center gap-1 hover:underline"
                        href={`/questions?subject=${subject.slug}`}
                      >
                        Questões <ChevronRight className="size-4" />
                      </a>
                      <a
                        className="inline-flex items-center gap-1 hover:underline"
                        href={`/explore/${subject.slug}`}
                      >
                        Assuntos <ChevronRight className="size-4" />
                      </a>
                    </div>
                  </ArcCard>
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
