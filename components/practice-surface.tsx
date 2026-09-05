'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronRight, CircleHelp, CircleMinus, Compass, Eye, MoveRight } from 'lucide-react';

import { AttemptStatusBadge, ArcButton, ArcCard } from '@/components/arc-ui';
import { MathContent } from '@/components/math-content';
import { QuestionStatistics } from '@/components/question-statistics';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { seedQuestions, seedTaxonomyNodes } from '@/lib/data/seed-catalogue';
import { subjectOptions } from '@/lib/data/subject-options';
import type { Question } from '@/lib/domain/questions';

function questionFromLocation(): Question {
  const requestedId = new URLSearchParams(window.location.search).get('question');
  return seedQuestions.find((question) => question.id === requestedId) ?? seedQuestions[0];
}

export function PracticeSurface() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [eliminatedOptionIds, setEliminatedOptionIds] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const submissionInFlight = useRef(false);

  useEffect(() => setQuestion(questionFromLocation()), []);
  const subject = subjectOptions.find((item) => item.id === question?.subjectId);
  const primaryTag = question?.taxonomyTags.find((tag) => tag.isPrimary) ?? question?.taxonomyTags[0];
  const topic = seedTaxonomyNodes.find((node) => node.id === primaryTag?.taxonomyNodeId);
  const questionIndex = useMemo(() => question ? seedQuestions.filter((item) => item.subjectId === question.subjectId).findIndex((item) => item.id === question.id) : 0, [question]);
  const nextQuestion = useMemo(() => question ? seedQuestions.filter((item) => item.subjectId === question.subjectId)[questionIndex + 1] : undefined, [question, questionIndex]);

  if (!question) return <ArcCard className="mt-8 animate-pulse p-8"><div className="h-5 w-32 rounded-full bg-[var(--arc-surface-subtle)]" /></ArcCard>;
  const correct = question.kind === 'multiple_choice' && selectedOptionId === question.correctOptionId;
  const resolved = question.kind === 'multiple_choice' ? submitted : revealed;
  const goToQuestion = (next: Question) => {
    window.history.pushState({}, '', `/practice?subject=${next.subjectId}&question=${next.id}`);
    setQuestion(next);
    setSelectedOptionId(null);
    setEliminatedOptionIds(new Set());
    setSubmitted(false);
    setRevealed(false);
    submissionInFlight.current = false;
  };
  const submitAnswer = () => {
    if (question.kind !== 'multiple_choice' || !selectedOptionId || submitted || submissionInFlight.current) return;
    submissionInFlight.current = true;
    const selectedOption = selectedOptionId;
    const outcome = selectedOption === question.correctOptionId ? 'correct' : 'incorrect';
    const attemptId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `attempt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    createLocalLearnerRepository().recordAttempt({
      id: attemptId,
      questionId: question.id,
      answer: { kind: 'selected_option', selectedOptionId: selectedOption },
      outcome,
      gradingMethod: 'automatic',
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return <ArcCard className="mt-8 overflow-hidden"><div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 sm:px-8"><div className="flex min-w-0 items-center gap-2 text-xs text-[var(--arc-text-muted)]"><Compass className="size-3.5 shrink-0" /><span className="truncate">{subject?.name}</span>{topic && <><ChevronRight className="size-3 shrink-0" /><span className="truncate">{topic.name}</span></>}</div>{resolved ? <AttemptStatusBadge status={question.kind === 'multiple_choice' ? correct ? 'correct' : 'incorrect' : 'redo'} /> : <span className="rounded-full bg-[var(--arc-surface-subtle)] px-3 py-1 text-xs font-medium text-[#52616c]">Questão {String(questionIndex + 1).padStart(2, '0')}</span>}</div>
    <div className="p-5 sm:p-10"><div className="max-w-2xl text-xl font-medium leading-relaxed tracking-[-0.035em] sm:text-2xl"><MathContent value={question.statement.value} /></div>
      {question.kind === 'multiple_choice' ? <div className="mt-10 max-w-2xl"><p className="mb-3 text-xs text-[var(--arc-text-muted)]">Use o círculo ao lado para eliminar uma alternativa.</p><div className="grid gap-2">{question.options.map((option) => { const chosen = selectedOptionId === option.id; const eliminated = eliminatedOptionIds.has(option.id); const isCorrect = option.id === question.correctOptionId; const resultStyle = submitted && (isCorrect ? 'border-[#8fb59f] bg-[#eef6f0]' : chosen ? 'border-[#dfaaaa] bg-[#faeeee]' : 'border-[var(--border)] bg-[var(--arc-surface)]'); const selectOption = () => { setSelectedOptionId(option.id); setEliminatedOptionIds((current) => { const next = new Set(current); next.delete(option.id); return next; }); }; const toggleEliminated = () => { setEliminatedOptionIds((current) => { const next = new Set(current); if (next.has(option.id)) next.delete(option.id); else next.add(option.id); return next; }); if (selectedOptionId === option.id) setSelectedOptionId(null); }; return <div className={`flex items-center gap-2 rounded-2xl border p-1.5 transition-all ${resultStyle ?? (chosen ? 'border-[#8aa7a1] bg-[#eef5f2]' : eliminated ? 'border-[#c4c9c7] bg-[var(--arc-surface-subtle)] opacity-60' : 'border-[var(--border)] bg-[var(--arc-surface)] hover:border-[#8aa7a1]')}`} key={option.id}><button aria-pressed={chosen} disabled={submitted} onClick={selectOption} className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm ${eliminated ? 'line-through decoration-[#7b858a] decoration-1' : ''}`}><span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${chosen ? 'bg-[var(--arc-accent-strong)] text-white' : 'bg-[var(--arc-surface-subtle)] text-[var(--arc-text-muted)]'}`}>{option.label}</span><MathContent value={option.content.value} /></button><button aria-label={`${eliminated ? 'Restaurar' : 'Eliminar'} alternativa ${option.label}`} aria-pressed={eliminated} disabled={submitted} onClick={toggleEliminated} className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors ${eliminated ? 'bg-[#d8ddd9] text-[#4f5a56]' : 'text-[#78828a] hover:bg-[var(--arc-surface-subtle)] hover:text-[#485963]'}`}><CircleMinus className="size-4" /></button></div>; })}</div></div> : <div className="mt-10 max-w-2xl rounded-2xl bg-[var(--arc-surface-subtle)] p-5 text-sm leading-6 text-[var(--arc-text-muted)]"><p>Resolva no papel e revele a resposta quando estiver pronto.</p></div>}
      {resolved && <><div className={`mt-6 max-w-2xl rounded-2xl p-4 text-sm leading-6 ${question.kind === 'multiple_choice' && !correct ? 'bg-[var(--arc-error-bg)] text-[var(--arc-error-text)]' : 'bg-[var(--arc-success-bg)] text-[var(--arc-success-text)]'}`}><p className="font-medium">{question.kind === 'multiple_choice' ? correct ? 'Você acertou.' : `A resposta correta é ${question.options.find((option) => option.id === question.correctOptionId)?.label}.` : 'Resposta revelada.'}</p><div className="mt-1"><MathContent value={question.solution.explanation?.value ?? question.solution.finalAnswer.value} /></div></div><QuestionStatistics question={question} /></>}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4"><button className="inline-flex items-center gap-2 text-sm text-[var(--arc-text-muted)] transition-colors hover:text-[var(--foreground)]"><CircleHelp className="size-4" /> Preciso de uma dica</button><div className="flex items-center gap-3">{resolved && nextQuestion && <button className="inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline" onClick={() => goToQuestion(nextQuestion)}>Próxima <MoveRight className="size-4" /></button>}{question.kind === 'multiple_choice' ? <ArcButton disabled={!selectedOptionId || submitted} onClick={submitAnswer}><Check className="size-4" /> Responder</ArcButton> : <ArcButton disabled={revealed} onClick={() => setRevealed(true)}><Eye className="size-4" /> Revelar resposta</ArcButton>}</div></div>
    </div>
  </ArcCard>;
}
