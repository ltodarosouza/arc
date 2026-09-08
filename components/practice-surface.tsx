'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronRight,
  CircleHelp,
  CircleMinus,
  Compass,
  MoveRight,
  RotateCcw,
} from 'lucide-react';

import { AttemptStatusBadge, ArcButton, ArcCard } from '@/components/arc-ui';
import { MathContent } from '@/components/math-content';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { seedQuestions } from '@/lib/data/seed-catalogue';
import { useCatalogue } from '@/lib/data/use-catalogue';
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
type RpcAttempt = { attempt_id: string; outcome: 'correct' | 'incorrect' };

function requestedQuestionId() {
  return new URLSearchParams(window.location.search).get('question');
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
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [eliminatedOptionIds, setEliminatedOptionIds] = useState<Set<string>>(
    new Set(),
  );
  const [outcome, setOutcome] = useState<'correct' | 'incorrect' | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [visibleHintCount, setVisibleHintCount] = useState(0);
  const submissionInFlight = useRef(false);

  const question = useMemo(() => {
    if (!catalogue) return null;
    const requestedId = requestedQuestionId();
    return (
      catalogue.questions.find((item) => item.id === requestedId) ??
      catalogue.questions[0] ??
      null
    );
  }, [catalogue]);
  const subject = catalogue?.subjects.find(
    (item) => item.id === question?.subjectId,
  );
  const primaryTag =
    question?.taxonomyTags.find((tag) => tag.isPrimary) ??
    question?.taxonomyTags[0];
  const topic = catalogue?.taxonomyNodes.find(
    (node) => node.id === primaryTag?.taxonomyNodeId,
  );
  const questionIndex = useMemo(
    () =>
      question
        ? (catalogue?.questions
            .filter((item) => item.subjectId === question.subjectId)
            .findIndex((item) => item.id === question.id) ?? 0)
        : 0,
    [catalogue, question],
  );
  const nextQuestion = useMemo(
    () =>
      question
        ? catalogue?.questions.filter(
            (item) => item.subjectId === question.subjectId,
          )[questionIndex + 1]
        : undefined,
    [catalogue, question, questionIndex],
  );

  const goToQuestion = (nextQuestionId: string, subjectSlug: string) => {
    window.location.assign(
      `/practice?subject=${subjectSlug}&question=${nextQuestionId}`,
    );
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
        const { data: solutionData, error: solutionError } = await supabase.rpc(
          'get_question_solution',
          { p_question_id: question.id },
        );
        if (solutionError) throw solutionError;
        setSolution(solutionData as Solution);
        // Reveal the result only after the correct option arrives. Otherwise a
        // correct choice briefly has no matching solution and flashes as wrong.
        setOutcome(attempt.outcome);
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
        <div className="h-5 w-32 rounded-full bg-[var(--arc-surface-subtle)]" />
      </ArcCard>
    );
  if (error)
    return (
      <ArcCard className="mt-8 p-8 text-sm text-[var(--arc-error-text)]">
        Não foi possível carregar esta questão.
      </ArcCard>
    );
  if (!question)
    return (
      <ArcCard className="mt-8 p-8 text-sm text-[var(--arc-text-muted)]">
        Nenhuma questão publicada foi encontrada.
      </ArcCard>
    );

  const resolved = outcome !== null;
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
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-2 text-xs text-[var(--arc-text-muted)]">
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
          <AttemptStatusBadge status={outcome} />
        ) : (
          <span className="rounded-full bg-[var(--arc-surface-subtle)] px-3 py-1 text-xs font-medium text-[#52616c]">
            Questão {String(questionIndex + 1).padStart(2, '0')}
          </span>
        )}
      </div>
      <div className="p-5 sm:p-10">
        <div className="arc-statement max-w-3xl">
          <MathContent value={question.statement.value} />
        </div>
        <div className="mt-8 max-w-3xl">
          <p className="mb-3 text-xs text-[var(--arc-text-muted)]">
            Use o círculo ao lado para eliminar uma alternativa.
          </p>
          <div className="grid gap-2">
            {question.options.map((option) => {
              const chosen = selectedOptionId === option.id;
              const correct = solution?.correctOptionId === option.id;
              const eliminated = eliminatedOptionIds.has(option.id);
              const resultStyle =
                resolved &&
                (chosen || correct
                  ? correct
                    ? 'border-[#8fb59f] bg-[#eef6f0]'
                    : 'border-[#dfaaaa] bg-[#faeeee]'
                  : 'border-[var(--border)] bg-[var(--arc-surface)]');
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
                  className={`flex items-center gap-2 rounded-lg border p-1.5 transition-colors duration-200 ${resultStyle ?? (chosen ? 'border-[var(--primary)] bg-[var(--arc-accent)]/45' : eliminated ? 'border-dashed border-[#d8d4cc] bg-[#f1efea]' : 'border-[var(--border)] bg-[var(--arc-surface)] hover:border-[#8aa7a1] hover:bg-[#fdfcf9]')}`}
                  key={option.id}
                >
                  <button
                    aria-pressed={chosen}
                    disabled={resolved}
                    onClick={selectOption}
                    className={`flex min-h-12 min-w-0 flex-1 items-center gap-3 rounded-md px-2.5 py-2 text-left text-base transition-colors ${eliminated ? 'text-[#68716e]' : ''}`}
                  >
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${chosen ? 'bg-[var(--arc-accent-strong)] text-white' : eliminated ? 'bg-[#dfdcd5] text-[#7b817e]' : 'bg-[var(--arc-surface-subtle)] text-[var(--arc-text-muted)]'}`}
                    >
                      {option.label}
                    </span>
                    <span className="min-w-0 flex-1">
                      <MathContent value={option.content.value} />
                    </span>
                    {eliminated && (
                      <span className="rounded-full bg-[#dfdcd5] px-2 py-1 text-[11px] font-medium text-[#6f7773]">
                        Descartada
                      </span>
                    )}
                  </button>
                  <button
                    aria-label={`${eliminated ? 'Restaurar' : 'Eliminar'} alternativa ${option.label}`}
                    aria-pressed={eliminated}
                    disabled={resolved}
                    onClick={toggleEliminated}
                    className={`grid size-11 shrink-0 place-items-center rounded-lg transition-colors ${eliminated ? 'bg-[#dfdcd5] text-[#5e6863] hover:bg-[#d4d0c8]' : 'text-[#78828a] hover:bg-[var(--arc-surface-subtle)] hover:text-[#485963]'}`}
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
        {visibleHints.length > 0 && (
          <section
            aria-label="Dicas"
            id="question-hints"
            className="mt-6 max-w-2xl rounded-2xl border border-[#d5e1dc] bg-[#f3f7f4] p-4 text-sm leading-6 text-[#456252]"
          >
            <p className="font-medium">
              Dica{visibleHints.length > 1 ? 's' : ''}
            </p>
            <ol className="mt-2 grid gap-2">
              {visibleHints.map((hint, index) => (
                <li key={hint.id}>
                  <span className="mr-2 font-medium text-[#668172]">
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
              className={`mt-6 max-w-2xl rounded-2xl p-4 text-sm leading-6 ${outcome === 'correct' ? 'bg-[var(--arc-success-bg)] text-[var(--arc-success-text)]' : 'bg-[var(--arc-error-bg)] text-[var(--arc-error-text)]'}`}
            >
              <p className="font-medium">
                {outcome === 'correct' ? 'Você acertou.' : 'Você errou.'}
              </p>
            </div>
            {solution && (
              <section
                aria-label="Gabarito comentado"
                className="mt-8 max-w-3xl border-t border-[var(--border)] pt-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-lg font-medium tracking-[-0.03em]">
                    Gabarito comentado
                  </h2>
                  <span className="text-xs font-medium text-[var(--arc-text-muted)]">
                    Confira o raciocínio
                  </span>
                </div>
                <div className="mt-5 rounded-2xl border border-[#d9e2df] bg-[#f1f6f4] p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#557064]">
                    Resposta correta
                    {solution.correctOptionId
                      ? ` · Alternativa ${question.options.find((option) => option.id === solution.correctOptionId)?.label ?? ''}`
                      : ''}
                  </p>
                  <div className="mt-2 text-lg font-medium leading-7 text-[var(--foreground)]">
                    <MathContent value={solution.finalAnswer} />
                  </div>
                </div>
                {solution.explanation && (
                  <div className="mt-7">
                    <h3 className="text-sm font-medium text-[var(--foreground)]">
                      Como resolver
                    </h3>
                    <div className="mt-2 text-[15px] leading-7 text-[var(--arc-text-muted)]">
                      <MathContent value={solution.explanation} />
                    </div>
                  </div>
                )}
                {solution.steps.length > 0 && (
                  <ol className="mt-5 grid gap-3">
                    {solution.steps.map((step, index) => (
                      <li
                        className="flex gap-4 border-b border-[var(--border)] py-5 text-[15px] leading-7 last:border-0"
                        key={step.id}
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--arc-accent)] text-xs font-medium text-[#405b6d]">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-[var(--foreground)]">
                            {step.title ?? `Passo ${index + 1}`}
                          </p>
                          <MathContent value={step.content} />
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            )}
          </>
        )}
        {resolved && !nextQuestion && (
          <div className="mt-8 rounded-2xl border border-[#d9e2df] bg-[#f1f6f4] px-5 py-4 text-sm text-[#48665b]">
            Você chegou ao fim das questões disponíveis desta disciplina.
          </div>
        )}
        {submissionError && (
          <p className="mt-4 text-sm text-[var(--arc-error-text)]">
            {submissionError}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
          {hasMoreHints && !resolved ? (
            <button
              aria-expanded={visibleHintCount > 0}
              aria-controls="question-hints"
              className="inline-flex items-center gap-2 text-sm text-[var(--arc-text-muted)] transition-colors hover:text-[var(--foreground)]"
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
              className="text-sm font-medium text-[var(--arc-text-muted)] transition-colors hover:text-[var(--foreground)]"
              href={`/questions?subject=${subject?.slug ?? question.subjectId}`}
            >
              Voltar para questões
            </a>
            {nextQuestion && (
              <button
                className="inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline"
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
            {!resolved && (
              <ArcButton
                disabled={!selectedOptionId}
                onClick={() => void submitAnswer()}
              >
                <Check className="size-4" /> Responder
              </ArcButton>
            )}
          </div>
        </div>
      </div>
    </ArcCard>
  );
}
