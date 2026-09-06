'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { AttemptStatusBadge, ArcCard } from '@/components/arc-ui';
import { MathContent } from '@/components/math-content';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { useLearnerState } from '@/lib/data/use-learner-state';
import { getLatestAttemptsByQuestion } from '@/lib/domain/progress';
import {
  filterQuestions,
  type QuestionStatusFilter,
} from '@/lib/domain/question-filtering';
import type { AttemptOutcome, Difficulty } from '@/lib/domain/questions';

const selectClass =
  'h-10 w-full rounded-full border border-transparent bg-[var(--arc-surface-subtle)] px-3.5 text-sm text-[var(--foreground)] shadow-[inset_0_0_0_1px_rgba(38,57,80,0.055)] transition-colors hover:bg-[#e2e4e0] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/25 disabled:cursor-not-allowed disabled:opacity-45';

export default function QuestionsPage() {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [unitId, setUnitId] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [subtopicId, setSubtopicId] = useState<string | null>(null);
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Difficulty[]
  >([]);
  const [selectedStatus, setSelectedStatus] =
    useState<QuestionStatusFilter>('all');
  const [redoQuestionIds, setRedoQuestionIds] = useState<Set<string>>(
    new Set(),
  );
  const [outcomeByQuestionId, setOutcomeByQuestionId] = useState<
    Map<string, AttemptOutcome>
  >(new Map());
  const { catalogue, error, isLoading } = useCatalogue();
  const { state: learnerState, setRedo } = useLearnerState();

  useEffect(() => {
    if (!catalogue || !learnerState) return;
    const search = new URLSearchParams(window.location.search);
    const requestedSubjectId = search.get('subject');
    const requestedTopicId = search.get('topic');
    const requestedStatus = search.get('status');
    setSubjectId(
      requestedSubjectId &&
        catalogue.subjects.some((subject) => subject.id === requestedSubjectId)
        ? requestedSubjectId
        : (catalogue.subjects[0]?.id ?? null),
    );
    setTopicId(requestedTopicId);
    if (
      requestedStatus === 'not_attempted' ||
      requestedStatus === 'attempted' ||
      requestedStatus === 'correct' ||
      requestedStatus === 'incorrect' ||
      requestedStatus === 'redo'
    )
      setSelectedStatus(requestedStatus);
    setOutcomeByQuestionId(
      new Map(
        [...getLatestAttemptsByQuestion(learnerState.attempts)].map(
          ([questionId, attempt]) => [questionId, attempt.outcome],
        ),
      ),
    );
    setRedoQuestionIds(new Set(learnerState.redoQuestionIds));
  }, [catalogue, learnerState]);

  const subject =
    catalogue?.subjects.find((item) => item.id === subjectId) ??
    catalogue?.subjects[0];
  const nodes = useMemo(
    () =>
      catalogue?.taxonomyNodes.filter(
        (node) => node.subjectId === subject?.id,
      ) ?? [],
    [catalogue, subject?.id],
  );
  const units = nodes.filter((node) => node.kind === 'unit');
  const topics = nodes.filter(
    (node) => node.kind === 'topic' && (!unitId || node.parentId === unitId),
  );
  const subtopics = nodes.filter(
    (node) =>
      node.kind === 'subtopic' && (!topicId || node.parentId === topicId),
  );
  const selectedNodeIds = [unitId, topicId, subtopicId].filter(
    (id): id is string => Boolean(id),
  );
  const questions = useMemo(
    () =>
      subject
        ? filterQuestions(catalogue?.questions ?? [], nodes, {
            subjectId: subject.id,
            selectedNodeIds,
            difficulties: selectedDifficulties,
            status: selectedStatus,
            outcomesByQuestionId: outcomeByQuestionId,
            redoQuestionIds,
          })
        : [],
    [
      catalogue,
      subject,
      selectedDifficulties,
      selectedNodeIds,
      selectedStatus,
      outcomeByQuestionId,
      redoQuestionIds,
      nodes,
    ],
  );
  const activeFilters = selectedNodeIds
    .map((id) => nodes.find((node) => node.id === id))
    .filter((node): node is NonNullable<typeof node> => Boolean(node));
  const selectUnit = (value: string) => {
    setUnitId(value || null);
    setTopicId(null);
    setSubtopicId(null);
  };
  const selectTopic = (value: string) => {
    setTopicId(value || null);
    setSubtopicId(null);
  };
  const clearFilter = (kind: 'unit' | 'topic' | 'subtopic') => {
    if (kind === 'unit') {
      setUnitId(null);
      setTopicId(null);
      setSubtopicId(null);
    }
    if (kind === 'topic') {
      setTopicId(null);
      setSubtopicId(null);
    }
    if (kind === 'subtopic') setSubtopicId(null);
  };
  const toggleDifficulty = (difficulty: Difficulty) =>
    setSelectedDifficulties((current) =>
      current.includes(difficulty)
        ? current.filter((item) => item !== difficulty)
        : [...current, difficulty],
    );
  const clearAllFilters = () => {
    clearFilter('unit');
    setSelectedDifficulties([]);
    setSelectedStatus('all');
  };
  const toggleRedo = (questionId: string) => {
    const enabled = !redoQuestionIds.has(questionId);
    void setRedo(questionId, enabled);
    setRedoQuestionIds((current) => {
      const next = new Set(current);
      if (enabled) next.add(questionId);
      else next.delete(questionId);
      return next;
    });
  };

  if (error)
    return (
      <AppShell active="explore">
        <section className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
          <ArcCard className="p-7 text-sm text-[var(--arc-error-text)]">
            Não foi possível carregar o catálogo publicado.
          </ArcCard>
        </section>
      </AppShell>
    );
  if (isLoading || !subject)
    return (
      <AppShell active="explore">
        <section className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
          <ArcCard className="p-7 text-sm text-[var(--arc-text-muted)]">
            Carregando questões…
          </ArcCard>
        </section>
      </AppShell>
    );

  return (
    <AppShell active="explore">
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <div className="flex items-center gap-2 text-sm text-[var(--arc-text-muted)]">
          <a className="hover:text-[var(--foreground)]" href="/explore">
            Questões
          </a>
          <ChevronRight className="size-4" />
          <span>{subject.name}</span>
        </div>
        <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-[var(--arc-accent-strong)]">
              {subject.name}
            </p>
            <h1 className="mt-2 text-4xl font-medium tracking-[-0.065em] sm:text-5xl">
              Questões.
            </h1>
            <p className="mt-3 text-[15px] text-[var(--arc-text-muted)]">
              {questions.length} encontrada{questions.length === 1 ? '' : 's'}.
            </p>
          </div>
          <a
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--arc-accent)] px-5 text-sm font-medium text-[#263950] transition-colors hover:bg-[#c8d8d6]"
            href={`/practice?subject=${subject.id}`}
          >
            Começar agora <ArrowRight className="size-4" />
          </a>
        </div>
        <ArcCard className="mt-8 bg-[color:color-mix(in_srgb,var(--arc-surface)_72%,var(--arc-surface-subtle))] p-4 shadow-none sm:p-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-[#527184]" />
            <p className="text-sm font-medium">Filtrar questões</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label className="grid gap-1.5 text-xs font-medium text-[var(--arc-text-muted)]">
              Unidade
              <select
                className={selectClass}
                onChange={(event) => selectUnit(event.target.value)}
                value={unitId ?? ''}
              >
                <option value="">Todas</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-xs font-medium text-[var(--arc-text-muted)]">
              Assunto
              <select
                className={selectClass}
                disabled={!topics.length}
                onChange={(event) => selectTopic(event.target.value)}
                value={topicId ?? ''}
              >
                <option value="">Todos</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-xs font-medium text-[var(--arc-text-muted)]">
              Subassunto
              <select
                className={selectClass}
                disabled={!subtopics.length || !topicId}
                onChange={(event) => setSubtopicId(event.target.value || null)}
                value={subtopicId ?? ''}
              >
                <option value="">Todos</option>
                {subtopics.map((subtopic) => (
                  <option key={subtopic.id} value={subtopic.id}>
                    {subtopic.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <fieldset className="mt-4">
            <legend className="text-xs font-medium text-[var(--arc-text-muted)]">
              Dificuldade
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  { id: 'easy', label: 'Fácil' },
                  { id: 'medium', label: 'Média' },
                  { id: 'hard', label: 'Difícil' },
                ] as const
              ).map((difficulty) => {
                const selected = selectedDifficulties.includes(difficulty.id);
                return (
                  <button
                    aria-pressed={selected}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selected ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--arc-surface)] text-[var(--arc-text-muted)] hover:bg-[var(--arc-accent)] hover:text-[#263950]'}`}
                    key={difficulty.id}
                    onClick={() => toggleDifficulty(difficulty.id)}
                    type="button"
                  >
                    {difficulty.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <fieldset className="mt-4">
            <legend className="text-xs font-medium text-[var(--arc-text-muted)]">
              Status
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  { id: 'all', label: 'Todas' },
                  { id: 'not_attempted', label: 'Não feitas' },
                  { id: 'attempted', label: 'Feitas' },
                  { id: 'correct', label: 'Acertadas' },
                  { id: 'incorrect', label: 'Erradas' },
                  { id: 'redo', label: 'Refazer' },
                ] as const
              ).map((status) => {
                const selected = selectedStatus === status.id;
                return (
                  <button
                    aria-pressed={selected}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selected ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--arc-surface)] text-[var(--arc-text-muted)] hover:bg-[var(--arc-accent)] hover:text-[#263950]'}`}
                    key={status.id}
                    onClick={() => setSelectedStatus(status.id)}
                    type="button"
                  >
                    {status.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
          {(activeFilters.length > 0 ||
            selectedDifficulties.length > 0 ||
            selectedStatus !== 'all') && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--arc-text-muted)]">
                Aplicados:
              </span>
              {activeFilters.map((filter) => (
                <button
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--arc-accent)] px-2.5 py-1 text-xs font-medium text-[#405b6d]"
                  key={filter.id}
                  onClick={() => clearFilter(filter.kind)}
                >
                  {filter.name}
                  <X className="size-3" />
                </button>
              ))}
              {selectedDifficulties.map((difficulty) => (
                <button
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--arc-accent)] px-2.5 py-1 text-xs font-medium text-[#405b6d]"
                  key={difficulty}
                  onClick={() => toggleDifficulty(difficulty)}
                >
                  {difficulty === 'easy'
                    ? 'Fácil'
                    : difficulty === 'medium'
                      ? 'Média'
                      : 'Difícil'}
                  <X className="size-3" />
                </button>
              ))}
              {selectedStatus !== 'all' && (
                <button
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--arc-accent)] px-2.5 py-1 text-xs font-medium text-[#405b6d]"
                  onClick={() => setSelectedStatus('all')}
                >
                  {
                    (
                      {
                        not_attempted: 'Não feitas',
                        attempted: 'Feitas',
                        correct: 'Acertadas',
                        incorrect: 'Erradas',
                        redo: 'Refazer',
                      } as const
                    )[selectedStatus]
                  }
                  <X className="size-3" />
                </button>
              )}
              <button
                className="text-xs font-medium text-[var(--arc-text-muted)] hover:text-[var(--foreground)]"
                onClick={clearAllFilters}
              >
                Limpar tudo
              </button>
            </div>
          )}
        </ArcCard>
        <p aria-atomic="true" aria-live="polite" className="sr-only">
          {questions.length} questões encontradas.
        </p>
        {questions.length ? (
          <div className="mt-6 grid gap-3">
            {questions.map((question, index) => {
              const outcome = outcomeByQuestionId.get(question.id);
              const markedForRedo = redoQuestionIds.has(question.id);
              const displayStatus = markedForRedo
                ? 'redo'
                : outcome === 'correct'
                  ? 'correct'
                  : outcome === 'incorrect'
                    ? 'incorrect'
                    : null;
              const topicNames = question.taxonomyTags
                .map(
                  (tag) =>
                    nodes.find((node) => node.id === tag.taxonomyNodeId)?.name,
                )
                .filter(Boolean);
              return (
                <ArcCard
                  className="p-5 transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(38,57,80,0.075)] sm:p-6"
                  key={question.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-[var(--arc-text-muted)]">
                      <span>Questão {String(index + 1).padStart(2, '0')}</span>
                      <span className="rounded-full bg-[var(--arc-surface-subtle)] px-2.5 py-1 capitalize">
                        {question.difficulty === 'easy'
                          ? 'Fácil'
                          : question.difficulty === 'medium'
                            ? 'Média'
                            : 'Difícil'}
                      </span>
                    </div>
                    {displayStatus && (
                      <AttemptStatusBadge status={displayStatus} />
                    )}
                  </div>
                  <div className="mt-5 max-w-3xl text-[17px] font-medium leading-8 tracking-[-0.02em]">
                    <MathContent value={question.statement.value} />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {topicNames.map((name) => (
                        <span
                          className="rounded-full bg-[var(--arc-surface-subtle)] px-2.5 py-1 text-xs text-[#5c6972]"
                          key={name}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        aria-pressed={markedForRedo}
                        className="text-sm text-[var(--arc-text-muted)] hover:text-[var(--foreground)]"
                        onClick={() => toggleRedo(question.id)}
                      >
                        {markedForRedo
                          ? 'Remover de refazer'
                          : 'Marcar para refazer'}
                      </button>
                      <a
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline"
                        href={`/practice?subject=${subject.id}&question=${question.id}`}
                      >
                        {outcome ? 'Refazer' : 'Resolver'}{' '}
                        <ArrowRight className="size-4" />
                      </a>
                    </div>
                  </div>
                </ArcCard>
              );
            })}
          </div>
        ) : (
          <ArcCard className="mt-6 p-8 text-center">
            <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-[var(--arc-accent)] text-[#46657a]">
              <BookOpen className="size-5" />
            </span>
            <h2 className="mt-5 text-xl font-medium tracking-[-0.03em]">
              Nenhuma questão encontrada.
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--arc-text-muted)]">
              Remova um filtro ou escolha outro assunto.
            </p>
            <button
              className="mt-5 text-sm font-medium text-[#46657a] hover:underline"
              onClick={clearAllFilters}
            >
              Limpar filtros
            </button>
          </ArcCard>
        )}
      </section>
    </AppShell>
  );
}
