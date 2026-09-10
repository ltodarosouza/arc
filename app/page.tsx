'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { AppShell } from '@/components/app-shell';
import { AnimatedTitle } from '@/components/animated-title';
import { Section } from '@/components/section';
import { ArcCard } from '@/components/arc-ui';
import { AnimatedProgressBar } from '@/components/animated-progress-bar';
import { AnimatedNumber } from '@/components/animated-number';
import { Reveal } from '@/components/reveal';
import { FeedbackState } from '@/components/feedback-state';
import { HeroSurface } from '@/components/hero-surface';
import { normalizeSelectedSubjectIds } from '@/lib/data/catalogue-repository';
import { useCatalogueSummary } from '@/lib/data/use-catalogue-summary';
import { useLearnerState } from '@/lib/data/use-learner-state';
import { getLatestAttemptsByQuestion } from '@/lib/domain/progress';

export default function Home() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const { catalogue, isLoading, error } = useCatalogueSummary();
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
        <HeroSurface>
          <div className="relative z-10">
            <AnimatedTitle>O que vamos praticar?</AnimatedTitle>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Escolha uma disciplina e resolva questões no seu ritmo.
            </p>
          </div>
        </HeroSurface>
        <div className="arc-continue-card animate-enter mt-8">
          <div className="relative min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
              {resumeSubject
                ? 'Retomar'
                : selectedSubjects.length
                  ? 'Tudo pronto'
                  : 'Primeiro passo'}
            </p>
            <p className="mt-1 truncate text-lg font-semibold tracking-[-0.02em]">
              {resumeSubject
                ? resumeSubject.name
                : selectedSubjects.length
                  ? 'Suas questões estão prontas'
                  : 'Escolha suas disciplinas'}
            </p>
            <p className="mt-1 text-sm text-white/70">
              {resumeSubject
                ? 'Continue de onde você parou.'
                : selectedSubjects.length
                  ? 'Abra o banco e comece a praticar.'
                  : 'Monte seu mapa de estudo para começar.'}
            </p>
          </div>
          <Link
            className="arc-action arc-continue group relative shrink-0"
            href={resumeHref}
          >
            {resumeSubject
              ? 'Continuar'
              : selectedSubjects.length
                ? 'Ir para questões'
                : 'Escolher disciplinas'}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <Section eyebrow="Resumo">
          <div className="arc-simple-metrics">
            <div>
              <p className="arc-metric text-foreground">
                <AnimatedNumber
                  value={learnerLoading ? 0 : progress.completed}
                />
              </p>
              <p className="arc-caption">Questões feitas</p>
            </div>
            <div>
              <p className="arc-metric text-success">
                <AnimatedNumber value={learnerLoading ? 0 : progress.correct} />
              </p>
              <p className="arc-caption">Acertos</p>
            </div>
          </div>
        </Section>
        <Section
          eyebrow="Seu mapa de estudo"
          title="Minhas disciplinas"
          action={
            <Link
              className="text-sm font-medium text-accent-strong hover:underline"
              href="/subjects"
            >
              Gerenciar
            </Link>
          }
        >
          {isLoading || learnerLoading ? (
            <div
              aria-label="Carregando disciplinas"
              aria-busy="true"
              className="grid gap-4 sm:grid-cols-2"
            >
              {[0, 1].map((id) => (
                <ArcCard
                  key={id}
                  className="h-48 animate-pulse bg-surface-subtle"
                />
              ))}
            </div>
          ) : error ? (
            <FeedbackState
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
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                  <Reveal key={subject.id} delay={index * 70} variant="card">
                    <ArcCard
                      interactive
                      className="arc-subject-card group relative h-full p-6"
                    >
                      <Link
                        aria-label={`Abrir ${subject.name}`}
                        className="absolute inset-0 rounded-card"
                        href={`/explore/${subject.slug}`}
                      />
                      <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-strong">
                        <BookOpen className="size-4 transition-transform duration-300 group-hover:scale-105" />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">
                        {subject.name}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-muted-foreground">
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
                      <p className="mt-2 text-xs text-muted-foreground">
                        {subjectQuestionIds.length
                          ? remaining
                            ? `${remaining} ${remaining === 1 ? 'questão para fazer' : 'questões para fazer'}`
                            : 'Todas as questões concluídas'
                          : 'Catálogo em preparação'}
                      </p>
                      <p className="mt-5 text-sm font-medium text-accent-strong">
                        Abrir disciplina{' '}
                        <ChevronRight className="inline size-4" />
                      </p>
                    </ArcCard>
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
      </section>
    </AppShell>
  );
}
