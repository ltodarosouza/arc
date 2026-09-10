'use client';

import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ArrowRight, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AppShell } from '@/components/app-shell';
import { AnimatedTitle } from '@/components/animated-title';
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
import { createPracticeSession } from '@/lib/practice-session';
import {
  filterQuestions,
  type QuestionStatusFilter,
} from '@/lib/domain/question-filtering';
import type { AttemptOutcome, Difficulty } from '@/lib/domain/questions';

const selectTriggerClass =
  'arc-filter-control min-h-11 w-full rounded-xl border-border px-3 text-sm font-medium shadow-none transition-colors duration-200 hover:border-accent-strong focus:border-ring';
const selectContentClass =
  'rounded-2xl border-border bg-surface p-1.5 shadow-float';
const selectItemClass =
  'min-h-10 rounded-xl px-3 py-2 text-sm text-foreground data-highlighted:bg-accent data-highlighted:text-foreground';
const questionsPerPage = 16;

export default function QuestionsPage() {
  const router = useRouter();
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [unitId, setUnitId] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Difficulty[]
  >([]);
  const [selectedStatus, setSelectedStatus] =
    useState<QuestionStatusFilter>('all');
  const [redoQuestionIds, setRedoQuestionIds] = useState<Set<string>>(
    new Set(),
  );
  const [savingRedoQuestionIds, setSavingRedoQuestionIds] = useState<
    Set<string>
  >(new Set());
  const pendingRedoQuestionIds = useRef(new Set<string>());
  const [redoFeedback, setRedoFeedback] = useState<string | null>(null);
  const [outcomeByQuestionId, setOutcomeByQuestionId] = useState<
    Map<string, AttemptOutcome>
  >(new Map());
  const { catalogue, error, isLoading } = useCatalogue();
  const {
    state: learnerState,
    error: learnerError,
    isLoading: learnerLoading,
    refresh: refreshLearnerState,
    setRedo,
  } = useLearnerState();

  useEffect(() => {
    if (!catalogue || !learnerState) return;
    const search = new URLSearchParams(window.location.search);
    const requestedSubjectId = search.get('subject');
    const requestedUnitId = search.get('unit');
    const requestedTopicId = search.get('topic');
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
    const resolveNodeId = (value: string | null, kind: 'unit' | 'topic') =>
      subjectNodes.find(
        (node) =>
          node.kind === kind && (node.id === value || node.slug === value),
      )?.id ?? null;
    setSubjectId(resolvedSubjectId);
    setUnitId(resolveNodeId(requestedUnitId, 'unit'));
    setTopicId(resolveNodeId(requestedTopicId, 'topic'));
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
    if (selectedDifficulties.length)
      search.set('difficulty', selectedDifficulties.join(','));
    if (selectedStatus !== 'all') search.set('status', selectedStatus);
    window.history.replaceState(null, '', `/questions?${search.toString()}`);
  }, [
    catalogue,
    selectedDifficulties,
    selectedStatus,
    subjectId,
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
  const selectedNodeIds = [unitId, topicId].filter((id): id is string =>
    Boolean(id),
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
  const totalPages = Math.max(
    1,
    Math.ceil(questions.length / questionsPerPage),
  );
  const visibleQuestions = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage,
  );
  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);
  const activeFilters = selectedNodeIds
    .map((id) => nodes.find((node) => node.id === id))
    .filter((node): node is NonNullable<typeof node> => Boolean(node));
  const selectUnit = (value: string) => {
    setUnitId(value || null);
    setTopicId(null);
  };
  const selectTopic = (value: string) => setTopicId(value || null);
  const clearFilter = (kind: 'unit' | 'topic') => {
    if (kind === 'unit') {
      setUnitId(null);
      setTopicId(null);
    }
    if (kind === 'topic') setTopicId(null);
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
    setCurrentPage(1);
  };
  const changePage = (nextPage: number) => {
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const toggleRedo = async (questionId: string) => {
    if (pendingRedoQuestionIds.current.has(questionId)) return;
    const enabled = !redoQuestionIds.has(questionId);
    pendingRedoQuestionIds.current.add(questionId);
    setSavingRedoQuestionIds((current) => new Set([...current, questionId]));
    setRedoFeedback(null);
    try {
      if (!(await setRedo(questionId, enabled))) {
        setRedoFeedback('Não foi possível salvar a marcação. Tente novamente.');
        return;
      }
      setRedoQuestionIds((current) => {
        const next = new Set(current);
        if (enabled) next.add(questionId);
        else next.delete(questionId);
        return next;
      });
    } finally {
      pendingRedoQuestionIds.current.delete(questionId);
      setSavingRedoQuestionIds((current) => {
        const next = new Set(current);
        next.delete(questionId);
        return next;
      });
    }
  };
  const startPractice = (questionId: string) => {
    const returnPath = `${window.location.pathname}${window.location.search}`;
    const sessionId = createPracticeSession({
      questionIds: questions.map((question) => question.id),
      returnPath,
    });
    router.push(
      `/practice?subject=${subject?.slug ?? ''}&question=${questionId}&session=${sessionId}`,
    );
  };

  if (error)
    return (
      <AppShell active="explore">
        <section className="arc-page">
          <FeedbackState
            action={
              <button
                className="text-sm font-medium text-accent-strong hover:underline"
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
  if (learnerError)
    return (
      <AppShell active="explore">
        <section className="arc-page">
          <FeedbackState
            action={
              <button
                className="text-sm font-medium text-accent-strong hover:underline"
                onClick={() => void refreshLearnerState()}
              >
                Tentar novamente
              </button>
            }
            description="Suas questões continuam protegidas, mas não conseguimos carregar seu histórico agora."
            title="Seu histórico não carregou"
            tone="error"
          />
        </section>
      </AppShell>
    );
  if (isLoading || learnerLoading || !subject)
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link className="hover:text-foreground" href="/explore">
            Questões
          </Link>
          <ChevronRight className="size-4" />
          <span>{subject.name}</span>
        </div>
        <div className="mt-5 max-w-2xl">
          <div>
            <p className="arc-caption font-semibold uppercase tracking-[0.12em] text-accent-strong">
              {subject.name}
            </p>
            <AnimatedTitle className="mt-2">Questões</AnimatedTitle>
            <p className="mt-3 text-[15px] text-muted-foreground">
              {questions.length} encontrada{questions.length === 1 ? '' : 's'}.
            </p>
          </div>
        </div>
        <ArcCard className="arc-panel mt-8 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-accent-strong" />
              <p className="text-sm font-medium">Filtrar questões</p>
            </div>
            {(activeFilters.length > 0 ||
              selectedDifficulties.length > 0 ||
              selectedStatus !== 'all') && (
              <button
                className="text-xs font-medium text-accent-strong hover:underline"
                onClick={clearAllFilters}
                type="button"
              >
                Limpar filtros
              </button>
            )}
          </div>
          <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
            <div className="grid gap-1.5 text-xs font-medium text-muted-foreground">
              Assunto
              <Select
                onValueChange={(value) => selectUnit(value ?? '')}
                value={unitId}
              >
                <SelectTrigger
                  aria-label="Assunto"
                  className={selectTriggerClass}
                >
                  <SelectValue placeholder="Todas">
                    {units.find((unit) => unit.id === unitId)?.name ?? 'Todas'}
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
            <div className="grid gap-1.5 text-xs font-medium text-muted-foreground">
              Subassunto
              <Select
                disabled={!topics.length}
                onValueChange={(value) => selectTopic(value ?? '')}
                value={topicId}
              >
                <SelectTrigger
                  aria-label="Subassunto"
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
            <fieldset>
              <legend className="text-xs font-medium text-muted-foreground">
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
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selected ? 'bg-primary text-primary-foreground' : 'bg-surface text-muted-foreground hover:bg-accent hover:text-foreground'}`}
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
            <fieldset>
              <legend className="text-xs font-medium text-muted-foreground">
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
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selected ? 'bg-primary text-primary-foreground' : 'bg-surface text-muted-foreground hover:bg-accent hover:text-foreground'}`}
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
          {(activeFilters.length > 0 ||
            selectedDifficulties.length > 0 ||
            selectedStatus !== 'all') && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Aplicados:
              </span>
              {activeFilters.map((filter) => (
                <button
                  className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground"
                  key={filter.id}
                  onClick={() => {
                    if (filter.kind !== 'subtopic') clearFilter(filter.kind);
                  }}
                >
                  {filter.name}
                  <X className="size-3" />
                </button>
              ))}
              {selectedDifficulties.map((difficulty) => (
                <button
                  className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground"
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
                  className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground"
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
            </div>
          )}
        </ArcCard>
        <p aria-atomic="true" aria-live="polite" className="sr-only">
          {questions.length} questões encontradas.
        </p>
        {redoFeedback && (
          <p role="alert" className="mt-4 text-sm text-error">
            {redoFeedback}
          </p>
        )}
        {questions.length ? (
          <div className="mt-6 grid gap-3">
            {visibleQuestions.map((question, index) => {
              const questionIndex =
                (currentPage - 1) * questionsPerPage + index;
              const outcome = outcomeByQuestionId.get(question.id);
              const markedForRedo = redoQuestionIds.has(question.id);
              const isSavingRedo = savingRedoQuestionIds.has(question.id);
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
                    className="rounded-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={(event: MouseEvent<HTMLDivElement>) => {
                      if ((event.target as HTMLElement).closest('button, a')) return;
                      startPractice(question.id);
                    }}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                      if (event.target !== event.currentTarget) return;
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        startPractice(question.id);
                      }
                    }}
                    role="link"
                    tabIndex={0}
                  >
                    <ArcCard
                      className="arc-question-card relative cursor-pointer p-5 hover:-translate-y-0.5 hover:border-accent-strong sm:p-6"
                    >
                      <Link
                        aria-label={`Abrir questão ${questionIndex + 1}`}
                        className="sr-only"
                        href={`/practice?subject=${subject.slug}&question=${question.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          startPractice(question.id);
                        }}
                      />
                      <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <span>
                            Questão {String(questionIndex + 1).padStart(2, '0')}
                          </span>
                          <span className="rounded-full bg-surface-subtle px-2.5 py-1 capitalize">
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
                      <div className="relative z-10 mt-4 max-w-3xl text-base font-medium leading-8">
                        <MathContent value={question.statement.value} />
                      </div>
                      <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {topicNames.map((name) => (
                            <span
                              className="rounded-full bg-surface-subtle px-2.5 py-1 text-xs text-muted-foreground"
                              key={name}
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            aria-pressed={markedForRedo}
                            className="text-sm text-muted-foreground hover:text-foreground"
                            disabled={isSavingRedo}
                            onClick={() => void toggleRedo(question.id)}
                          >
                            {isSavingRedo
                              ? 'Salvando marcação…'
                              : markedForRedo
                                ? 'Remover de refazer'
                                : 'Marcar para refazer'}
                          </button>
                          <button
                            className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline"
                            onClick={() => startPractice(question.id)}
                            type="button"
                          >
                            {outcome ? 'Refazer' : 'Resolver'}{' '}
                            <ArrowRight className="size-4" />
                          </button>
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
                className="text-sm font-medium text-accent-strong hover:underline"
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
        {questions.length > questionsPerPage && (
          <nav
            aria-label="Paginação das questões"
            className="mt-7 flex items-center justify-between gap-3"
          >
            <button
              className="arc-action"
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
              type="button"
            >
              Anterior
            </button>
            <p className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </p>
            <button
              className="arc-action"
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
              type="button"
            >
              Próxima
            </button>
          </nav>
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
          <div className="h-4 w-24 rounded-full bg-surface-subtle" />
          <div className="mt-6 h-6 max-w-xl rounded-full bg-surface-subtle" />
          <div className="mt-3 h-6 w-3/5 rounded-full bg-surface-subtle" />
          <div className="mt-7 h-8 w-28 rounded-full bg-surface-subtle" />
        </ArcCard>
      ))}
    </div>
  );
}
