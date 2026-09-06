'use client';

import { useMemo, useRef, useState } from 'react';
import { Check, ChevronRight, CircleHelp, CircleMinus, Compass, MoveRight } from 'lucide-react';

import { AttemptStatusBadge, ArcButton, ArcCard } from '@/components/arc-ui';
import { MathContent } from '@/components/math-content';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { seedQuestions } from '@/lib/data/seed-catalogue';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

type Solution = { finalAnswer: string; explanation: string | null; steps: { id: string; title: string | null; content: string; sortOrder: number }[] };
type RpcAttempt = { attempt_id: string; outcome: 'correct' | 'incorrect' };

function requestedQuestionId() { return new URLSearchParams(window.location.search).get('question'); }

export function PracticeSurface() {
  const { catalogue, error, isLoading } = useCatalogue();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [eliminatedOptionIds, setEliminatedOptionIds] = useState<Set<string>>(new Set());
  const [outcome, setOutcome] = useState<'correct' | 'incorrect' | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const submissionInFlight = useRef(false);

  const question = useMemo(() => {
    if (!catalogue) return null;
    const requestedId = requestedQuestionId();
    return catalogue.questions.find((item) => item.id === requestedId) ?? catalogue.questions[0] ?? null;
  }, [catalogue]);
  const subject = catalogue?.subjects.find((item) => item.id === question?.subjectId);
  const primaryTag = question?.taxonomyTags.find((tag) => tag.isPrimary) ?? question?.taxonomyTags[0];
  const topic = catalogue?.taxonomyNodes.find((node) => node.id === primaryTag?.taxonomyNodeId);
  const questionIndex = useMemo(() => question ? (catalogue?.questions.filter((item) => item.subjectId === question.subjectId).findIndex((item) => item.id === question.id) ?? 0) : 0, [catalogue, question]);
  const nextQuestion = useMemo(() => question ? catalogue?.questions.filter((item) => item.subjectId === question.subjectId)[questionIndex + 1] : undefined, [catalogue, question, questionIndex]);

  const goToQuestion = (nextQuestionId: string, subjectId: string) => {
    window.location.assign(`/practice?subject=${subjectId}&question=${nextQuestionId}`);
  };

  const submitAnswer = async () => {
    if (!question || !selectedOptionId || outcome || submissionInFlight.current) return;
    submissionInFlight.current = true;
    setSubmissionError(null);
    try {
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseClient();
        const { data, error: submitError } = await supabase.rpc('submit_multiple_choice_attempt', { p_question_id: question.id, p_selected_option_id: selectedOptionId });
        if (submitError) throw submitError;
        const attempt = (data as RpcAttempt[] | null)?.[0];
        if (!attempt) throw new Error('A resposta não foi registrada.');
        setOutcome(attempt.outcome);
        const { data: solutionData, error: solutionError } = await supabase.rpc('get_question_solution', { p_question_id: question.id });
        if (solutionError) throw solutionError;
        setSolution(solutionData as Solution);
      } else {
        const fixture = seedQuestions.find((item) => item.id === question.id);
        if (!fixture || fixture.kind !== 'multiple_choice') throw new Error('Questão indisponível.');
        const localOutcome = fixture.correctOptionId === selectedOptionId ? 'correct' : 'incorrect';
        createLocalLearnerRepository().recordAttempt({ id: crypto.randomUUID(), questionId: question.id, answer: { kind: 'selected_option', selectedOptionId }, outcome: localOutcome, gradingMethod: 'automatic', createdAt: new Date().toISOString() });
        createLocalLearnerRepository().setRedo(question.id, localOutcome === 'incorrect');
        setOutcome(localOutcome);
        setSolution({ finalAnswer: fixture.solution.finalAnswer.value, explanation: fixture.solution.explanation?.value ?? null, steps: fixture.solution.steps.map((step) => ({ id: step.id, title: step.title ?? null, content: step.content.value, sortOrder: step.sortOrder })) });
      }
    } catch (submitError) {
      setSubmissionError(submitError instanceof Error ? submitError.message : 'Não foi possível enviar sua resposta.');
    } finally { submissionInFlight.current = false; }
  };

  if (isLoading) return <ArcCard className="mt-8 animate-pulse p-8"><div className="h-5 w-32 rounded-full bg-[var(--arc-surface-subtle)]" /></ArcCard>;
  if (error) return <ArcCard className="mt-8 p-8 text-sm text-[var(--arc-error-text)]">Não foi possível carregar esta questão.</ArcCard>;
  if (!question) return <ArcCard className="mt-8 p-8 text-sm text-[var(--arc-text-muted)]">Nenhuma questão publicada foi encontrada.</ArcCard>;

  const resolved = outcome !== null;
  return <ArcCard className="mt-8 overflow-hidden"><div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 sm:px-8"><div className="flex min-w-0 items-center gap-2 text-xs text-[var(--arc-text-muted)]"><Compass className="size-3.5 shrink-0" /><span className="truncate">{subject?.name}</span>{topic && <><ChevronRight className="size-3 shrink-0" /><span className="truncate">{topic.name}</span></>}</div>{resolved ? <AttemptStatusBadge status={outcome} /> : <span className="rounded-full bg-[var(--arc-surface-subtle)] px-3 py-1 text-xs font-medium text-[#52616c]">Questão {String(questionIndex + 1).padStart(2, '0')}</span>}</div>
    <div className="p-5 sm:p-10"><div className="max-w-2xl text-xl font-medium leading-relaxed tracking-[-0.035em] sm:text-2xl"><MathContent value={question.statement.value} /></div>
      <div className="mt-10 max-w-2xl"><p className="mb-3 text-xs text-[var(--arc-text-muted)]">Use o círculo ao lado para eliminar uma alternativa.</p><div className="grid gap-2">{question.options.map((option) => { const chosen = selectedOptionId === option.id; const eliminated = eliminatedOptionIds.has(option.id); const resultStyle = resolved && (chosen ? outcome === 'correct' ? 'border-[#8fb59f] bg-[#eef6f0]' : 'border-[#dfaaaa] bg-[#faeeee]' : 'border-[var(--border)] bg-[var(--arc-surface)]'); const selectOption = () => { setSelectedOptionId(option.id); setEliminatedOptionIds((current) => { const next = new Set(current); next.delete(option.id); return next; }); }; const toggleEliminated = () => { setEliminatedOptionIds((current) => { const next = new Set(current); if (next.has(option.id)) next.delete(option.id); else next.add(option.id); return next; }); if (selectedOptionId === option.id) setSelectedOptionId(null); }; return <div className={`flex items-center gap-2 rounded-2xl border p-1.5 transition-all ${resultStyle ?? (chosen ? 'border-[#8aa7a1] bg-[#eef5f2]' : eliminated ? 'border-[#c4c9c7] bg-[var(--arc-surface-subtle)] opacity-60' : 'border-[var(--border)] bg-[var(--arc-surface)] hover:border-[#8aa7a1]')}`} key={option.id}><button aria-pressed={chosen} disabled={resolved} onClick={selectOption} className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm ${eliminated ? 'line-through decoration-[#7b858a] decoration-1' : ''}`}><span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${chosen ? 'bg-[var(--arc-accent-strong)] text-white' : 'bg-[var(--arc-surface-subtle)] text-[var(--arc-text-muted)]'}`}>{option.label}</span><MathContent value={option.content.value} /></button><button aria-label={`${eliminated ? 'Restaurar' : 'Eliminar'} alternativa ${option.label}`} aria-pressed={eliminated} disabled={resolved} onClick={toggleEliminated} className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors ${eliminated ? 'bg-[#d8ddd9] text-[#4f5a56]' : 'text-[#78828a] hover:bg-[var(--arc-surface-subtle)] hover:text-[#485963]'}`}><CircleMinus className="size-4" /></button></div>; })}</div></div>
      {resolved && <div className={`mt-6 max-w-2xl rounded-2xl p-4 text-sm leading-6 ${outcome === 'correct' ? 'bg-[var(--arc-success-bg)] text-[var(--arc-success-text)]' : 'bg-[var(--arc-error-bg)] text-[var(--arc-error-text)]'}`}><p className="font-medium">{outcome === 'correct' ? 'Você acertou.' : 'Você errou.'}</p>{solution && <div className="mt-1"><MathContent value={solution.explanation ?? solution.finalAnswer} />{solution.steps.length > 0 && <ol className="mt-4 grid gap-2">{solution.steps.map((step) => <li key={step.id}><MathContent value={step.content} /></li>)}</ol>}</div>}</div>}
      {submissionError && <p className="mt-4 text-sm text-[var(--arc-error-text)]">{submissionError}</p>}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4"><button className="inline-flex items-center gap-2 text-sm text-[var(--arc-text-muted)] transition-colors hover:text-[var(--foreground)]"><CircleHelp className="size-4" /> Preciso de uma dica</button><div className="flex items-center gap-3">{resolved && nextQuestion && <button className="inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline" onClick={() => goToQuestion(nextQuestion.id, nextQuestion.subjectId)}>Próxima <MoveRight className="size-4" /></button>}<ArcButton disabled={!selectedOptionId || resolved} onClick={() => void submitAnswer()}><Check className="size-4" /> Responder</ArcButton></div></div>
    </div>
  </ArcCard>;
}
