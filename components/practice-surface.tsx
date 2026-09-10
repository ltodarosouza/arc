'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Check,
  ChevronRight,
  CircleHelp,
  CircleMinus,
  Compass,
  MoveRight,
  RotateCcw,
  X,
} from 'lucide-react';

import { AttemptStatusBadge, ArcButton, ArcCard } from '@/components/arc-ui';
import { MathContent } from '@/components/math-content';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { seedQuestions } from '@/lib/data/seed-catalogue';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { getPracticeSession } from '@/lib/practice-session';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

type Solution = {
  finalAnswer: string;
  correctOptionId: string;
  explanation: string | null;
  steps: {
    id: string;
    title: string | null;
    content: string;
    sortOrder: number;
  }[];
};
type RpcAttempt = {
  attempt_id: string;
  outcome: 'correct' | 'incorrect' | 'revealed';
};

function requestedPracticeContext(search: URLSearchParams) {
  return {
    questionId: search.get('question'),
    subject: search.get('subject'),
    session: search.get('session'),
  };
}

function hasInteractiveKeyboardFocus(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      'a, button, input, textarea, select, [contenteditable="true"], [role="button"], [role="link"], [role="dialog"], [role="menu"], [role="menuitem"], [role="option"], [role="tab"], [aria-modal="true"]',
    ),
  );
}

export function PracticeSurface() {
  const { catalogue, error, isLoading } = useCatalogue();
  const searchParams = useSearchParams();
  const requestedContext = useMemo(
    () => requestedPracticeContext(searchParams),
    [searchParams],
  );
  const practiceSession = useMemo(
    () => getPracticeSession(requestedContext.session),
    [requestedContext.session],
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [eliminatedOptionIds, setEliminatedOptionIds] = useState<Set<string>>(
    new Set(),
  );
  const [outcome, setOutcome] = useState<
    'correct' | 'incorrect' | 'revealed' | null
  >(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [solutionError, setSolutionError] = useState<string | null>(null);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [visibleHintCount, setVisibleHintCount] = useState(0);
  const [scratchpad, setScratchpad] = useState('');
  const submissionInFlight = useRef(false);
  const solutionInFlight = useRef(false);

  const requestedSubject = catalogue?.subjects.find(
    (item) =>
      item.id === requestedContext.subject ||
      item.slug === requestedContext.subject,
  );
  const requestedQuestion = catalogue?.questions.find(
    (item) => item.id === requestedContext.questionId,
  );
  const hasInvalidSubject = Boolean(
    requestedContext.subject && !requestedSubject,
  );
  const hasIncompatibleSubject = Boolean(
    requestedQuestion &&
    requestedSubject &&
    requestedQuestion.subjectId !== requestedSubject.id,
  );
  const sessionQuestions = useMemo(
    () =>
      practiceSession
        ? practiceSession.questionIds
            .map((id) => catalogue?.questions.find((item) => item.id === id))
            .filter((item): item is NonNullable<typeof item> => Boolean(item))
        : null,
    [catalogue, practiceSession],
  );
  const question = useMemo(() => {
    if (!catalogue || hasInvalidSubject || hasIncompatibleSubject) return null;
    if (requestedContext.questionId) {
      if (
        practiceSession &&
        !practiceSession.questionIds.includes(requestedContext.questionId)
      )
        return null;
      return requestedQuestion ?? null;
    }
    if (requestedSubject)
      return (
        catalogue.questions.find(
          (item) => item.subjectId === requestedSubject.id,
        ) ?? null
      );
    return catalogue.questions[0] ?? null;
  }, [
    catalogue,
    hasIncompatibleSubject,
    hasInvalidSubject,
    requestedContext.questionId,
    requestedQuestion,
    requestedSubject,
    practiceSession,
  ]);
  const subject = catalogue?.subjects.find(
    (item) => item.id === question?.subjectId,
  );
  const primaryTag =
    question?.taxonomyTags.find((tag) => tag.isPrimary) ??
    question?.taxonomyTags[0];
  const topic = catalogue?.taxonomyNodes.find(
    (node) => node.id === primaryTag?.taxonomyNodeId,
  );
  const practiceQuestions = useMemo(() => {
    if (!question) return [];
    return (
      sessionQuestions ??
      catalogue?.questions.filter(
        (item) => item.subjectId === question.subjectId,
      ) ??
      []
    );
  }, [catalogue, question, sessionQuestions]);
  const questionIndex = useMemo(
    () => practiceQuestions.findIndex((item) => item.id === question?.id),
    [practiceQuestions, question?.id],
  );
  const nextQuestion = useMemo(
    () => practiceQuestions[questionIndex + 1],
    [practiceQuestions, questionIndex],
  );

  useEffect(() => {
    setSelectedOptionId(null);
    setEliminatedOptionIds(new Set());
    setOutcome(null);
    setSolution(null);
    setSolutionError(null);
    setSubmissionError(null);
    setVisibleHintCount(0);
    setScratchpad('');
    submissionInFlight.current = false;
    solutionInFlight.current = false;
  }, [question?.id]);

  const goToQuestion = (nextQuestionId: string, subjectSlug: string) => {
    window.location.assign(
      `/practice?subject=${subjectSlug}&question=${nextQuestionId}${requestedContext.session ? `&session=${requestedContext.session}` : ''}`,
    );
  };

  const loadSolution = async () => {
    if (!question || !isSupabaseConfigured() || solutionInFlight.current)
      return;
    solutionInFlight.current = true;
    setSolutionError(null);
    setIsLoadingSolution(true);
    try {
      const { data, error: solutionError } = await getSupabaseClient().rpc(
        'get_question_solution',
        { p_question_id: question.id },
      );
      if (solutionError) throw solutionError;
      setSolution(data as Solution);
    } catch {
      setSolutionError(
        'Sua resposta foi registrada. Não foi possível carregar o gabarito agora.',
      );
    } finally {
      solutionInFlight.current = false;
      setIsLoadingSolution(false);
    }
  };

  const submitAnswer = async () => {
    if (!question || !selectedOptionId || outcome || submissionInFlight.current)
      return;
    submissionInFlight.current = true;
    setSubmissionError(null);
    try {
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseClient();
        const { data, error: submitError } = await supabase.rpc(
          'submit_multiple_choice_attempt',
          {
            p_question_id: question.id,
            p_selected_option_id: selectedOptionId,
          },
        );
        if (submitError) throw submitError;
        const attempt = (data as RpcAttempt[] | null)?.[0];
        if (!attempt) throw new Error('A resposta não foi registrada.');
        // The attempt is durable independently of the explanation. Keeping the
        // result lets the learner retry only the explanation request on a
        // transient failure, without submitting another attempt.
        setOutcome(attempt.outcome);
        await loadSolution();
      } else {
        const fixture = seedQuestions.find((item) => item.id === question.id);
        if (!fixture || fixture.kind !== 'multiple_choice')
          throw new Error('Questão indisponível.');
        const localOutcome =
          fixture.correctOptionId === selectedOptionId
            ? 'correct'
            : 'incorrect';
        createLocalLearnerRepository().recordAttempt({
          id: crypto.randomUUID(),
          questionId: question.id,
          answer: { kind: 'selected_option', selectedOptionId },
          outcome: localOutcome,
          gradingMethod: 'automatic',
          createdAt: new Date().toISOString(),
        });
        createLocalLearnerRepository().setRedo(
          question.id,
          localOutcome === 'incorrect',
        );
        setOutcome(localOutcome);
        setSolution({
          finalAnswer: fixture.solution.finalAnswer.value,
          correctOptionId: fixture.correctOptionId,
          explanation: fixture.solution.explanation?.value ?? null,
          steps: fixture.solution.steps.map((step) => ({
            id: step.id,
            title: step.title ?? null,
            content: step.content.value,
            sortOrder: step.sortOrder,
          })),
        });
      }
    } catch (submitError) {
      setSubmissionError(
        submitError instanceof Error
          ? submitError.message
          : 'Não foi possível enviar sua resposta.',
      );
    } finally {
      submissionInFlight.current = false;
    }
  };

  const revealAnswer = async (
    selfAssessment: 'correct' | 'incorrect' | 'not_assessed',
  ) => {
    if (!question || outcome || submissionInFlight.current) return;
    submissionInFlight.current = true;
    setSubmissionError(null);
    try {
      if (isSupabaseConfigured()) {
        const { data, error: revealError } = await getSupabaseClient().rpc(
          'record_reveal_answer_attempt',
          { p_question_id: question.id, p_self_assessment: selfAssessment },
        );
        if (revealError) throw revealError;
        const attempt = (data as RpcAttempt[] | null)?.[0];
        if (!attempt) throw new Error('A resposta não foi registrada.');
        setOutcome(attempt.outcome);
        await loadSolution();
      } else {
        const fixture = seedQuestions.find((item) => item.id === question.id);
        if (!fixture || fixture.kind !== 'reveal_answer')
          throw new Error('Questão indisponível.');
        const localOutcome =
          selfAssessment === 'correct'
            ? 'correct'
            : selfAssessment === 'incorrect'
              ? 'incorrect'
              : 'revealed';
        createLocalLearnerRepository().recordAttempt({
          id: crypto.randomUUID(),
          questionId: question.id,
          answer: { kind: 'revealed_answer', selfAssessment },
          outcome: localOutcome,
          gradingMethod:
            selfAssessment === 'not_assessed' ? 'unscored' : 'self_assessed',
          createdAt: new Date().toISOString(),
        });
        createLocalLearnerRepository().setRedo(
          question.id,
          localOutcome === 'incorrect',
        );
        setOutcome(localOutcome);
        setSolution({
          finalAnswer: fixture.solution.finalAnswer.value,
          correctOptionId: '',
          explanation: fixture.solution.explanation?.value ?? null,
          steps: fixture.solution.steps.map((step) => ({
            id: step.id,
            title: step.title ?? null,
            content: step.content.value,
            sortOrder: step.sortOrder,
          })),
        });
      }
    } catch (revealError) {
      setSubmissionError(
        revealError instanceof Error
          ? revealError.message
          : 'Não foi possível revelar o gabarito.',
      );
    } finally {
      submissionInFlight.current = false;
    }
  };

  useEffect(() => {
    if (!question || outcome) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        hasInteractiveKeyboardFocus(event.target)
      )
        return;
      if (question.kind !== 'multiple_choice') return;
      const optionIndex = Number.parseInt(event.key, 10) - 1;
      if (optionIndex >= 0 && optionIndex < question.options.length) {
        event.preventDefault();
        setSelectedOptionId(question.options[optionIndex]?.id ?? null);
        return;
      }
      if (event.key === 'Enter' && selectedOptionId) {
        event.preventDefault();
        void submitAnswer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [outcome, question, selectedOptionId]);

  if (isLoading)
    return (
      <ArcCard className="mt-8 animate-pulse p-8">
        <div className="h-5 w-32 rounded-full bg-surface-subtle" />
      </ArcCard>
    );
  if (error)
    return (
      <ArcCard className="mt-8 p-8 text-sm text-error">
        Não foi possível carregar esta questão.
      </ArcCard>
    );
  if (!question && requestedContext.questionId)
    return (
      <ArcCard className="mt-8 p-8">
        <h2 className="text-lg font-medium tracking-[-0.03em]">
          {hasIncompatibleSubject || hasInvalidSubject
            ? 'Este link de prática não é válido.'
            : 'Esta questão não está disponível.'}
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
          {hasIncompatibleSubject || hasInvalidSubject
            ? 'A disciplina indicada não corresponde à questão solicitada.'
            : 'Ela pode ter sido removida ou ainda não estar publicada.'}
        </p>
        <a
          className="arc-link mt-5 inline-flex min-h-11 items-center"
          href={
            practiceSession?.returnPath ??
            (requestedSubject
              ? `/questions?subject=${requestedSubject.slug}`
              : '/questions')
          }
        >
          Voltar para questões <MoveRight className="ml-2 size-4" />
        </a>
      </ArcCard>
    );
  if (!question)
    return (
      <ArcCard className="mt-8 p-8 text-sm text-muted-foreground">
        Nenhuma questão publicada foi encontrada.
      </ArcCard>
    );

  const resolved = outcome !== null;
  const isGraded = question.kind === 'multiple_choice';
  const feedbackMessage =
    outcome === 'correct'
      ? isGraded
        ? 'Parabéns! Você acertou.'
        : 'Você marcou que acertou.'
      : outcome === 'incorrect'
        ? isGraded
          ? 'Não foi dessa vez. Confira o gabarito abaixo.'
          : 'Você marcou que precisa revisar esta questão.'
        : 'Gabarito revelado.';
  const visibleHints = question.hints.slice(0, visibleHintCount);
  const hasMoreHints = visibleHintCount < question.hints.length;
  return (
    <ArcCard className="mt-8 overflow-hidden">
      <div aria-atomic="true" aria-live="polite" className="sr-only">
        {resolved
          ? outcome === 'correct'
            ? 'Resposta correta. Gabarito comentado disponível.'
            : 'Resposta incorreta. Gabarito comentado disponível.'
          : ''}
      </div>
      <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
          <Compass className="size-3.5 shrink-0" />
          <span className="truncate">{subject?.name}</span>
          {topic && (
            <>
              <ChevronRight className="size-3 shrink-0" />
              <span className="truncate">{topic.name}</span>
            </>
          )}
        </div>
        {resolved ? (
          outcome === 'revealed' ? (
            <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-medium text-muted-foreground">
              Gabarito visto
            </span>
          ) : (
            <AttemptStatusBadge status={outcome} />
          )
        ) : (
          <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-medium text-muted-foreground">
            Questão {String(questionIndex + 1).padStart(2, '0')}
          </span>
        )}
      </div>
      <div className="p-5 sm:p-10">
        <div className="arc-statement max-w-3xl rounded-[1.5rem] border-l-4 border-accent-strong bg-[color-mix(in_srgb,var(--arc-accent)_32%,transparent)] px-5 py-6 sm:px-7">
          <MathContent value={question.statement.value} />
        </div>
        {question.kind === 'multiple_choice' ? (
          <div className="mt-8 max-w-3xl">
            <p className="mb-3 text-xs text-muted-foreground">
              Use o círculo ao lado para eliminar uma alternativa.
            </p>
            <div className="grid gap-2">
              {question.options.map((option) => {
                const chosen = selectedOptionId === option.id;
                const correct = solution?.correctOptionId === option.id;
                const eliminated = eliminatedOptionIds.has(option.id);
                const resultStyle =
                  resolved && solution
                    ? correct
                      ? 'arc-option--correct'
                      : chosen
                        ? 'arc-option--incorrect'
                        : ''
                    : chosen
                      ? 'border-primary bg-accent'
                      : eliminated
                        ? 'arc-option--eliminated border-dashed border-border'
                        : 'border-border';
                const selectOption = () => {
                  setSelectedOptionId(option.id);
                  setEliminatedOptionIds((current) => {
                    const next = new Set(current);
                    next.delete(option.id);
                    return next;
                  });
                };
                const toggleEliminated = () => {
                  setEliminatedOptionIds((current) => {
                    const next = new Set(current);
                    if (next.has(option.id)) next.delete(option.id);
                    else next.add(option.id);
                    return next;
                  });
                  if (selectedOptionId === option.id) setSelectedOptionId(null);
                };
                return (
                  <div
                    className={`arc-option flex items-center gap-2 rounded-xl border p-1.5 ${resultStyle}`}
                    key={option.id}
                  >
                    <button
                      aria-pressed={chosen}
                      disabled={resolved}
                      onClick={selectOption}
                      className="flex min-h-12 min-w-0 flex-1 items-center gap-3 rounded-lg px-2.5 py-2 text-left text-base"
                    >
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${chosen ? 'bg-accent-strong text-primary-foreground' : 'bg-surface-subtle text-muted-foreground'}`}
                      >
                        {option.label}
                      </span>
                      <span className="arc-option-copy min-w-0 flex-1">
                        <MathContent value={option.content.value} />
                      </span>
                      {eliminated && (
                        <span className="rounded-full bg-surface-subtle px-2 py-1 text-[11px] font-medium text-muted-foreground">
                          Descartada
                        </span>
                      )}
                      {resolved && solution && correct && (
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-success text-white">
                          <Check aria-hidden="true" className="size-4" />
                          <span className="sr-only">Alternativa correta</span>
                        </span>
                      )}
                      {resolved && solution && chosen && !correct && (
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-error text-white">
                          <X aria-hidden="true" className="size-4" />
                          <span className="sr-only">Alternativa incorreta</span>
                        </span>
                      )}
                    </button>
                    <button
                      aria-label={`${eliminated ? 'Restaurar' : 'Eliminar'} alternativa ${option.label}`}
                      aria-pressed={eliminated}
                      disabled={resolved}
                      onClick={toggleEliminated}
                      className={`grid size-11 shrink-0 place-items-center rounded-lg transition-colors ${eliminated ? 'bg-surface-subtle text-foreground' : 'text-muted-foreground hover:bg-surface-subtle hover:text-foreground'}`}
                    >
                      {eliminated ? (
                        <RotateCcw className="size-4" />
                      ) : (
                        <CircleMinus className="size-4" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <section className="mt-8 max-w-3xl" aria-label="Rascunho da resposta">
            <label className="text-sm font-medium" htmlFor="scratchpad">
              Desenvolva sua resposta
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              Use este espaço para organizar os cálculos. Ele fica apenas nesta
              tela e não é enviado para correção.
            </p>
            <textarea
              className="mt-3 min-h-44 w-full rounded-2xl border border-border bg-surface p-4 text-[15px] leading-7 outline-none transition-colors focus:border-ring"
              id="scratchpad"
              onChange={(event) => setScratchpad(event.target.value)}
              placeholder="Escreva sua estratégia e seus cálculos aqui…"
              value={scratchpad}
            />
          </section>
        )}
        {visibleHints.length > 0 && (
          <section
            aria-label="Dicas"
            id="question-hints"
            className="mt-6 max-w-2xl rounded-2xl border border-success-border bg-hint-bg p-4 text-sm leading-6 text-hint"
          >
            <p className="font-medium">
              Dica{visibleHints.length > 1 ? 's' : ''}
            </p>
            <ol className="mt-2 grid gap-2">
              {visibleHints.map((hint, index) => (
                <li key={hint.id}>
                  <span className="mr-2 font-medium text-accent-strong">
                    {index + 1}.
                  </span>
                  <MathContent value={hint.content.value} />
                </li>
              ))}
            </ol>
          </section>
        )}
        {resolved && (
          <>
            <div
              className={`mt-6 max-w-2xl rounded-2xl p-4 text-sm leading-6 ${outcome === 'correct' ? 'bg-success-bg text-success' : 'bg-error-bg text-error'}`}
            >
              <p className="font-medium">{feedbackMessage}</p>
            </div>
            {solution && (
              <section
                aria-label="Gabarito comentado"
                className="mt-8 max-w-3xl border-t border-border pt-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-lg font-medium tracking-[-0.03em]">
                    Gabarito comentado
                  </h2>
                  <span className="text-xs font-medium text-muted-foreground">
                    Confira o raciocínio
                  </span>
                </div>
                <div className="arc-solution mt-5 rounded-2xl border p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-success">
                    Resposta correta
                    {question.kind === 'multiple_choice' &&
                    solution.correctOptionId
                      ? ` · Alternativa ${question.options.find((option) => option.id === solution.correctOptionId)?.label ?? ''}`
                      : ''}
                  </p>
                  <div className="mt-2 text-lg font-medium leading-7 text-foreground">
                    <MathContent value={solution.finalAnswer} />
                  </div>
                </div>
                {solution.explanation && (
                  <div className="mt-7">
                    <h3 className="text-sm font-medium text-foreground">
                      Como resolver
                    </h3>
                    <div className="mt-2 text-[15px] leading-7 text-muted-foreground">
                      <MathContent value={solution.explanation} />
                    </div>
                  </div>
                )}
                {solution.steps.length > 0 && (
                  <ol className="mt-5 grid gap-3">
                    {solution.steps.map((step, index) => (
                      <li
                        className="flex gap-4 border-b border-border py-5 text-[15px] leading-7 last:border-0"
                        key={step.id}
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-medium text-accent-strong">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-foreground">
                            <MathContent
                              value={step.title ?? `Passo ${index + 1}`}
                            />
                          </p>
                          <MathContent value={step.content} />
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            )}
            {isLoadingSolution && !solution && (
              <p className="mt-6 text-sm text-muted-foreground" role="status">
                Carregando gabarito comentado…
              </p>
            )}
            {solutionError && !solution && (
              <section
                aria-live="polite"
                className="mt-6 max-w-2xl rounded-2xl border border-error-border bg-error-bg p-4 text-sm leading-6 text-error"
              >
                <p>{solutionError}</p>
                <button
                  className="arc-link mt-3 inline-flex min-h-11 items-center"
                  disabled={isLoadingSolution}
                  onClick={() => void loadSolution()}
                >
                  Tentar carregar gabarito
                </button>
              </section>
            )}
          </>
        )}
        {resolved && !nextQuestion && (
          <div className="arc-solution mt-8 rounded-2xl border px-5 py-4 text-sm text-success">
            Você chegou ao fim das questões disponíveis desta disciplina.
          </div>
        )}
        {submissionError && (
          <p className="mt-4 text-sm text-error">{submissionError}</p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          {hasMoreHints && !resolved ? (
            <button
              aria-expanded={visibleHintCount > 0}
              aria-controls="question-hints"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() =>
                setVisibleHintCount((count) =>
                  Math.min(count + 1, question.hints.length),
                )
              }
            >
              <CircleHelp className="size-4" />{' '}
              {visibleHintCount ? 'Ver próxima dica' : 'Preciso de uma dica'}
            </button>
          ) : (
            <span />
          )}
          <div className="flex w-full flex-wrap items-center justify-end gap-x-5 gap-y-4 sm:w-auto">
            <a
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              href={
                practiceSession?.returnPath ??
                `/questions?subject=${subject?.slug ?? question.subjectId}`
              }
            >
              Voltar para questões
            </a>
            {nextQuestion && (
              <button
                className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline"
                onClick={() =>
                  goToQuestion(
                    nextQuestion.id,
                    catalogue?.subjects.find(
                      (item) => item.id === nextQuestion.subjectId,
                    )?.slug ?? nextQuestion.subjectId,
                  )
                }
              >
                {resolved ? 'Próxima questão' : 'Pular questão'}{' '}
                <MoveRight className="size-4" />
              </button>
            )}
            {!resolved && question.kind === 'multiple_choice' && (
              <ArcButton
                disabled={!selectedOptionId}
                onClick={() => void submitAnswer()}
              >
                <Check className="size-4" /> Responder
              </ArcButton>
            )}
            {!resolved && question.kind === 'reveal_answer' && (
              <div className="flex flex-wrap items-center gap-2">
                <ArcButton onClick={() => void revealAnswer('not_assessed')}>
                  Ver gabarito
                </ArcButton>
                <button
                  className="arc-action"
                  onClick={() => void revealAnswer('correct')}
                  type="button"
                >
                  Acertei
                </button>
                <button
                  className="arc-action"
                  onClick={() => void revealAnswer('incorrect')}
                  type="button"
                >
                  Preciso revisar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ArcCard>
  );
}
