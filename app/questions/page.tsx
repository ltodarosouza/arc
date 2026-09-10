'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { FeedbackState } from '@/components/feedback-state';
import { Reveal } from '@/components/reveal';
import { QuestionCard } from '@/components/questions/question-card';
import { QuestionFilters } from '@/components/questions/question-filters';
import { QuestionListSkeleton } from '@/components/questions/question-list-skeleton';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { useLearnerState } from '@/lib/data/use-learner-state';
import { getLatestAttemptsByQuestion } from '@/lib/domain/progress';
import { createPracticeSession } from '@/lib/practice-session';
import {
  filterQuestions,
  type QuestionStatusFilter,
} from '@/lib/domain/question-filtering';
import type { AttemptOutcome, Difficulty } from '@/lib/domain/questions';

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
        <PageHeader
          className="mt-5"
          eyebrow={subject.name}
          title="Questões"
          description={`${questions.length} encontrada${questions.length === 1 ? '' : 's'}.`}
        />
        <QuestionFilters
          units={units}
          topics={topics}
          unitId={unitId}
          topicId={topicId}
          selectedDifficulties={selectedDifficulties}
          selectedStatus={selectedStatus}
          activeFilters={activeFilters}
          onSelectUnit={selectUnit}
          onSelectTopic={selectTopic}
          onToggleDifficulty={toggleDifficulty}
          onSelectStatus={setSelectedStatus}
          onClearFilter={clearFilter}
          onClearAll={clearAllFilters}
        />
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
                .filter((name): name is string => Boolean(name));
              return (
                <Reveal delay={(index % 5) * 45} key={question.id}>
                  <QuestionCard
                    question={question}
                    displayNumber={questionIndex + 1}
                    status={displayStatus}
                    topicNames={topicNames}
                    outcome={outcome}
                    markedForRedo={markedForRedo}
                    isSavingRedo={savingRedoQuestionIds.has(question.id)}
                    subjectSlug={subject.slug}
                    onOpen={() => startPractice(question.id)}
                    onToggleRedo={() => void toggleRedo(question.id)}
                  />
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
