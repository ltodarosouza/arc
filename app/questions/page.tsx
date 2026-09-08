'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { AttemptStatusBadge, ArcCard } from '@/components/arc-ui';
import { FeedbackState } from '@/components/feedback-state';
import { MathContent } from '@/components/math-content';
import { Reveal } from '@/components/reveal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { useLearnerState } from '@/lib/data/use-learner-state';
import { getLatestAttemptsByQuestion } from '@/lib/domain/progress';
import {
  filterQuestions,
  type QuestionStatusFilter,
} from '@/lib/domain/question-filtering';
import type { AttemptOutcome, Difficulty } from '@/lib/domain/questions';

const selectTriggerClass =
  'min-h-11 w-full rounded-lg border-[#d4d9d6] bg-[var(--arc-surface)] px-3 text-sm font-medium text-[var(--foreground)] shadow-none transition-colors duration-200 hover:border-[#aebfba] focus:border-[#718e9d]';
const selectContentClass =
  'rounded-2xl border-[var(--border)] bg-[var(--arc-surface)] p-1.5 shadow-[0_16px_36px_rgba(38,57,80,0.14)]';
const selectItemClass =
  'min-h-10 rounded-xl px-3 py-2 text-sm text-[var(--foreground)] data-highlighted:bg-[var(--arc-accent)] data-highlighted:text-[#263950]';

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
    const requestedUnitId = search.get('unit');
    const requestedTopicId = search.get('topic');
    const requestedSubtopicId = search.get('subtopic');
    const requestedDifficulties = search.get('difficulty')?.split(',') ?? [];
    const requestedStatus = search.get('status');
    const requestedSubject = catalogue.subjects.find(
      (subject) =>
        subject.id === requestedSubjectId ||
        subject.slug === requestedSubjectId,
    );
    const resolvedSubjectId =
      requestedSubject?.id ?? catalogue.subjects[0]?.id ?? null;
    const subjectNodes = catalogue.taxonomyNodes.filter(
      (node) => node.subjectId === resolvedSubjectId,
    );
    const resolveNodeId = (
      value: string | null,
      kind: 'unit' | 'topic' | 'subtopic',
    ) =>
      subjectNodes.find(
        (node) =>
          node.kind === kind && (node.id === value || node.slug === value),
      )?.id ?? null;
    setSubjectId(resolvedSubjectId);
    setUnitId(resolveNodeId(requestedUnitId, 'unit'));
    setTopicId(resolveNodeId(requestedTopicId, 'topic'));
    setSubtopicId(resolveNodeId(requestedSubtopicId, 'subtopic'));
    setSelectedDifficulties(
      requestedDifficulties.filter(
        (difficulty): difficulty is Difficulty =>
          difficulty === 'easy' ||
          difficulty === 'medium' ||
          difficulty === 'hard',
      ),
    );
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

  useEffect(() => {
    const selectedSubject = catalogue?.subjects.find(
      (subject) => subject.id === subjectId,
    );
    if (!selectedSubject) return;
    const search = new URLSearchParams();
    const slugForNode = (id: string) =>
      catalogue?.taxonomyNodes.find((node) => node.id === id)?.slug ?? id;
    search.set('subject', selectedSubject.slug);
    if (unitId) search.set('unit', slugForNode(unitId));
    if (topicId) search.set('topic', slugForNode(topicId));
    if (subtopicId) search.set('subtopic', slugForNode(subtopicId));
    if (selectedDifficulties.length)
      search.set('difficulty', selectedDifficulties.join(','));
    if (selectedStatus !== 'all') search.set('status', selectedStatus);
    window.history.replaceState(null, '', `/questions?${search.toString()}`);
  }, [
    catalogue,
    selectedDifficulties,
    selectedStatus,
    subjectId,
    subtopicId,
    topicId,
    unitId,
  ]);

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
  const startRandomQuestion = () => {
    const question = questions[Math.floor(Math.random() * questions.length)];
    if (!question) return;
    window.location.assign(
      `/practice?subject=${subject?.slug ?? question.subjectId}&question=${question.id}`,
    );
  };

  if (error)
    return (
      <AppShell active="explore">
        <section className="arc-page">
          <FeedbackState
            action={
              <button
                className="text-sm font-medium text-[#46657a] hover:underline"
                onClick={() => window.location.reload()}
              >
                Tentar novamente
              </button>
            }
            description="Não conseguimos abrir as questões publicadas agora. Tente novamente em instantes."
            title="As questões não carregaram"
            tone="error"
          />
        </section>
      </AppShell>
    );
  if (isLoading || !subject)
    return (
      <AppShell active="explore">
        <section className="arc-page">
          <QuestionListSkeleton />
        </section>
      </AppShell>
    );

  return (
    <AppShell active="explore">
      <section className="arc-page">
        <div className="flex items-center gap-2 text-sm text-[var(--arc-text-muted)]">
          <a className="hover:text-[var(--foreground)]" href="/explore">
            Questões
          </a>
          <ChevronRight className="size-4" />
          <span>{subject.name}</span>
        </div>
        <div className="mt-5 max-w-2xl">
          <div>
            <p className="text-sm font-medium text-[var(--arc-accent-strong)]">
              {subject.name}
            </p>
            <h1 className="arc-title mt-2">Questões</h1>
            <p className="mt-3 text-[15px] text-[var(--arc-text-muted)]">
              {questions.length} encontrada{questions.length === 1 ? '' : 's'}.
            </p>
          </div>
          <button
            className="arc-action mt-5"
            disabled={!questions.length}
            onClick={startRandomQuestion}
            type="button"
          >
            Praticar uma questão <ArrowRight className="size-4" />
          </button>
        </div>
        <ArcCard className="mt-8 p-4 shadow-none sm:p-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-[#527184]" />
            <p className="text-sm font-medium">Filtrar questões</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(
              [
                { id: 'not_attempted', label: 'Não feitas' },
                { id: 'incorrect', label: 'Erradas' },
              ] as const
            ).map((filter) => (
              <button
                aria-pressed={selectedStatus === filter.id}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selectedStatus === filter.id ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--arc-surface)] text-[var(--arc-text-muted)] hover:bg-[var(--arc-accent)] hover:text-[#263950]'}`}
                key={filter.id}
                onClick={() => setSelectedStatus(filter.id)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
          <details className="arc-disclosure mt-3 border-t border-[var(--border)]">
            <summary className="flex min-h-12 items-center justify-between gap-2 text-sm font-medium">
              Assuntos e filtros avançados{' '}
              <ChevronDown className="disclosure-icon size-4" />
            </summary>
            <div className="disclosure-content">
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                <div className="grid gap-1.5 text-xs font-medium text-[var(--arc-text-muted)]">
                  Unidade
                  <Select
                    onValueChange={(value) => selectUnit(value ?? '')}
                    value={unitId}
                  >
                    <SelectTrigger
                      aria-label="Unidade"
                      className={selectTriggerClass}
                    >
                      <SelectValue placeholder="Todas">
                        {units.find((unit) => unit.id === unitId)?.name ??
                          'Todas'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem className={selectItemClass} value={null}>
                        Todas
                      </SelectItem>
                      {units.map((unit) => (
                        <SelectItem
                          className={selectItemClass}
                          key={unit.id}
                          value={unit.id}
                        >
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5 text-xs font-medium text-[var(--arc-text-muted)]">
                  Assunto
                  <Select
                    disabled={!topics.length}
                    onValueChange={(value) => selectTopic(value ?? '')}
                    value={topicId}
                  >
                    <SelectTrigger
                      aria-label="Assunto"
                      className={selectTriggerClass}
                    >
                      <SelectValue placeholder="Todos">
                        {topics.find((topic) => topic.id === topicId)?.name ??
                          'Todos'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem className={selectItemClass} value={null}>
                        Todos
                      </SelectItem>
                      {topics.map((topic) => (
                        <SelectItem
                          className={selectItemClass}
                          key={topic.id}
                          value={topic.id}
                        >
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5 text-xs font-medium text-[var(--arc-text-muted)]">
                  Subassunto
                  <Select
                    disabled={!subtopics.length || !topicId}
                    onValueChange={(value) => setSubtopicId(value)}
                    value={subtopicId}
                  >
                    <SelectTrigger
                      aria-label="Subassunto"
                      className={selectTriggerClass}
                    >
                      <SelectValue placeholder="Todos">
                        {subtopics.find(
                          (subtopic) => subtopic.id === subtopicId,
                        )?.name ?? 'Todos'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem className={selectItemClass} value={null}>
                        Todos
                      </SelectItem>
                      {subtopics.map((subtopic) => (
                        <SelectItem
                          className={selectItemClass}
                          key={subtopic.id}
                          value={subtopic.id}
                        >
                          {subtopic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                    const selected = selectedDifficulties.includes(
                      difficulty.id,
                    );
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
            </div>
          </details>
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
                <Reveal delay={(index % 5) * 45} key={question.id}>
                  <div
                    aria-label={`Resolver questão ${index + 1}`}
                    className="cursor-pointer rounded-[var(--arc-radius-card)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]"
                    onClick={(event) => {
                      if ((event.target as HTMLElement).closest('a, button'))
                        return;
                      window.location.assign(
                        `/practice?subject=${subject.slug}&question=${question.id}`,
                      );
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        window.location.assign(
                          `/practice?subject=${subject.slug}&question=${question.id}`,
                        );
                      }
                    }}
                    role="link"
                    tabIndex={0}
                  >
                    <ArcCard className="p-5 hover:-translate-y-0.5 hover:border-[#a8bcbd] sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-[var(--arc-text-muted)]">
                          <span>
                            Questão {String(index + 1).padStart(2, '0')}
                          </span>
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
                      <div className="mt-4 max-w-3xl text-base font-medium leading-8">
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
                            href={`/practice?subject=${subject.slug}&question=${question.id}`}
                          >
                            {outcome ? 'Refazer' : 'Resolver'}{' '}
                            <ArrowRight className="size-4" />
                          </a>
                        </div>
                      </div>
                    </ArcCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <FeedbackState
            action={
              <button
                className="text-sm font-medium text-[#46657a] hover:underline"
                onClick={clearAllFilters}
              >
                Limpar filtros
              </button>
            }
            className="mt-6 items-center text-center"
            description="Ajuste os filtros ou escolha outro assunto desta disciplina."
            title="Nenhuma questão encontrada"
          />
        )}
      </section>
    </AppShell>
  );
}

function QuestionListSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Carregando questões"
      className="mt-8 grid gap-3"
    >
      {[0, 1, 2].map((item) => (
        <ArcCard className="animate-pulse p-5 sm:p-6" key={item}>
          <div className="h-4 w-24 rounded-full bg-[var(--arc-surface-subtle)]" />
          <div className="mt-6 h-6 max-w-xl rounded-full bg-[var(--arc-surface-subtle)]" />
          <div className="mt-3 h-6 w-3/5 rounded-full bg-[var(--arc-surface-subtle)]" />
          <div className="mt-7 h-8 w-28 rounded-full bg-[var(--arc-surface-subtle)]" />
        </ArcCard>
      ))}
    </div>
  );
}
