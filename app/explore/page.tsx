'use client';

import { useEffect, useMemo, useState } from 'react';
import { BookOpen, ChevronRight, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

import { AppShell } from '@/components/app-shell';
import { ArcCard } from '@/components/arc-ui';
import { FeedbackState } from '@/components/feedback-state';
import { Reveal } from '@/components/reveal';
import { normalizeSelectedSubjectIds } from '@/lib/data/catalogue-repository';
import { useCatalogueSummary } from '@/lib/data/use-catalogue-summary';
import { useLearnerState } from '@/lib/data/use-learner-state';
import { getTaxonomyBranch } from '@/lib/domain/taxonomy';

export default function ExplorePage() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const [attemptedQuestionIds, setAttemptedQuestionIds] = useState<string[]>(
    [],
  );
  const { catalogue, error, isLoading } = useCatalogueSummary();
  const {
    state: learnerState,
    saveSelectedSubjectIds,
    isLoading: learnerLoading,
  } = useLearnerState();
  const isInitialLoading = isLoading || learnerLoading || !learnerState;

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
    setAttemptedQuestionIds([
      ...new Set(state.attempts.map((attempt) => attempt.questionId)),
    ]);
  }, [catalogue, learnerState, saveSelectedSubjectIds]);

  const selectedSubjects =
    catalogue?.subjects.filter((subject) =>
      selectedSubjectIds.includes(subject.id),
    ) ?? [];
  const subjectDetails = useMemo(
    () =>
      selectedSubjects.map((subject) => {
        const questions =
          catalogue?.questions.filter(
            (question) => question.subjectId === subject.id,
          ) ?? [];
        const nodes = catalogue?.taxonomyNodes ?? [];
        const units = nodes
          .filter(
            (node) => node.subjectId === subject.id && node.kind === 'unit',
          )
          .map((unit) => ({
            ...unit,
            count: questions.filter((question) => {
              const branch = getTaxonomyBranch(unit.id, nodes);
              return question.taxonomyTags.some((tag) =>
                branch.includes(tag.taxonomyNodeId),
              );
            }).length,
          }));
        return {
          subject,
          questions,
          units,
          attemptedCount: questions.filter((question) =>
            attemptedQuestionIds.includes(question.id),
          ).length,
        };
      }),
    [attemptedQuestionIds, selectedSubjects, catalogue],
  );

  return (
    <AppShell active="explore">
      <section className="arc-page">
        <div className="animate-enter max-w-2xl">
          <div>
            <h1 className="arc-title">Questões</h1>
            <p className="mt-3 text-sm text-[var(--arc-text-muted)]">
              Escolha uma disciplina para começar.
            </p>
          </div>
          <Link
            className="arc-link mt-4 inline-flex min-h-11 items-center gap-2 text-sm"
            href="/subjects"
          >
            <SlidersHorizontal className="size-4" /> Gerenciar disciplinas
          </Link>
        </div>
        {isInitialLoading ? (
          <div
            aria-busy="true"
            aria-label="Carregando disciplinas"
            className="mt-9 grid gap-4 lg:grid-cols-2"
          >
            {[0, 1].map((item) => (
              <ArcCard className="animate-pulse p-6" key={item}>
                <div className="h-5 w-36 rounded-full bg-[var(--arc-surface-subtle)]" />
                <div className="mt-6 h-4 w-full rounded-full bg-[var(--arc-surface-subtle)]" />
                <div className="mt-3 h-4 w-3/4 rounded-full bg-[var(--arc-surface-subtle)]" />
              </ArcCard>
            ))}
          </div>
        ) : error ? (
          <FeedbackState
            action={
              <button
                className="text-sm font-medium text-[#46657a] hover:underline"
                onClick={() => window.location.reload()}
              >
                Tentar novamente
              </button>
            }
            className="mt-9"
            description="Não foi possível abrir as disciplinas publicadas agora."
            title="As disciplinas não carregaram"
            tone="error"
          />
        ) : subjectDetails.length ? (
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {subjectDetails.map(
              ({ subject, questions, units, attemptedCount }, index) => (
                <Reveal delay={index * 65} key={subject.id} variant="card">
                  <ArcCard className="overflow-hidden">
                    <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-5 sm:px-6">
                      <span className="grid size-9 place-items-center rounded-xl bg-[var(--arc-accent)] text-[#46657a]">
                        <BookOpen className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="arc-section-title">
                          <Link
                            className="hover:underline"
                            href={`/explore/${subject.slug}`}
                          >
                            {subject.name}
                          </Link>
                        </h2>
                        <p className="mt-0.5 text-xs text-[var(--arc-text-muted)]">
                          {questions.length}{' '}
                          {questions.length === 1 ? 'questão' : 'questões'} ·{' '}
                          {attemptedCount} feita
                          {attemptedCount === 1 ? '' : 's'}
                        </p>
                      </div>
                      <Link
                        className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#46657a] hover:underline"
                        href={`/questions?subject=${subject.slug}`}
                      >
                        Ver todas <ChevronRight className="size-4" />
                      </Link>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="arc-caption">Áreas</p>
                      {units.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {units.slice(0, 3).map((unit) => (
                            <Link
                              className="inline-flex min-h-11 items-center rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[#4f606d] transition-colors hover:bg-[var(--arc-accent)] hover:text-[#263950]"
                              href={`/questions?subject=${subject.slug}&unit=${unit.slug}`}
                              key={unit.id}
                            >
                              {unit.name}{' '}
                              <span className="ml-1 opacity-60">
                                {unit.count}
                              </span>
                            </Link>
                          ))}
                          {units.length > 3 && (
                            <Link
                              className="arc-link inline-flex min-h-11 items-center px-2 text-sm"
                              href={`/explore/${subject.slug}`}
                            >
                              +{units.length - 3} áreas
                            </Link>
                          )}
                        </div>
                      ) : (
                        <p className="mt-3 text-sm text-[var(--arc-text-muted)]">
                          Áreas em preparação.
                        </p>
                      )}
                    </div>
                  </ArcCard>
                </Reveal>
              ),
            )}
          </div>
        ) : (
          <FeedbackState
            action={
              <Link
                className="inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline"
                href="/subjects"
              >
                Escolher disciplinas <ChevronRight className="size-4" />
              </Link>
            }
            className="mt-9"
            description="Elas aparecerão aqui para você chegar às questões mais rápido."
            title="Escolha suas disciplinas"
          />
        )}
      </section>
    </AppShell>
  );
}
