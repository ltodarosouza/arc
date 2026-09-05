'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { AttemptStatusBadge, ArcCard } from '@/components/arc-ui';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { seedQuestions, seedTaxonomyNodes } from '@/lib/data/seed-catalogue';
import { subjectOptions } from '@/lib/data/subject-options';
import { getAttemptNumber, summarizeProgress } from '@/lib/domain/progress';
import type { LearnerState } from '@/lib/domain/learner';
import type { QuestionAttempt } from '@/lib/domain/questions';

function formatAttemptDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(value));
}

export default function ProgressPage() {
  const [learnerState, setLearnerState] = useState<LearnerState | null>(null);
  useEffect(() => setLearnerState(createLocalLearnerRepository().getState()), []);

  const attempts = learnerState?.attempts ?? [];
  const summary = summarizeProgress(attempts);
  const redoCount = learnerState?.redoQuestionIds.length ?? 0;
  const recentAttempts = useMemo(() => [...attempts].sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()).slice(0, 5), [attempts]);

  return <AppShell active="progress"><section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16"><p className="text-sm font-medium text-[var(--arc-accent-strong)]">Progresso</p><h1 className="mt-2 text-4xl font-medium tracking-[-0.065em] sm:text-5xl">Seu histórico, em resumo.</h1><p className="mt-3 max-w-lg text-[15px] leading-6 text-[var(--arc-text-muted)]">Cada questão conta uma vez. Ao refazer, o resultado mais recente substitui o anterior.</p><div className="mt-10 grid gap-3 sm:grid-cols-3"><ArcCard className="p-5"><CheckCircle2 className="size-5 text-[var(--arc-success-text)]" /><p className="mt-7 text-3xl font-medium tracking-[-0.05em]">{summary.correct}</p><p className="mt-1 text-sm text-[var(--arc-text-muted)]">Acertos</p></ArcCard><ArcCard className="p-5"><XCircle className="size-5 text-[var(--arc-error-text)]" /><p className="mt-7 text-3xl font-medium tracking-[-0.05em]">{summary.incorrect}</p><p className="mt-1 text-sm text-[var(--arc-text-muted)]">Erros</p></ArcCard><ArcCard className="p-5"><RotateCcw className="size-5 text-[var(--arc-redo-text)]" /><p className="mt-7 text-3xl font-medium tracking-[-0.05em]">{redoCount}</p><p className="mt-1 text-sm text-[var(--arc-text-muted)]">Para refazer</p></ArcCard></div><ArcCard className="mt-6 p-6"><p className="font-medium tracking-[-0.025em]">{summary.answered ? `${summary.answered} questão${summary.answered === 1 ? '' : 'ões'} respondida${summary.answered === 1 ? '' : 's'}.` : 'Nenhuma questão respondida ainda.'}</p><p className="mt-2 text-sm leading-6 text-[var(--arc-text-muted)]">{summary.answered ? 'Continue praticando para atualizar seus resultados.' : 'Escolha uma disciplina e resolva a primeira questão.'}</p><a className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline" href="/explore">Ir para questões <ArrowRight className="size-4" /></a></ArcCard>{recentAttempts.length > 0 && <section className="mt-10"><p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--arc-text-muted)]">Tentativas recentes</p><div className="mt-4 grid gap-2">{recentAttempts.map((attempt) => <AttemptRow attempt={attempt} attempts={attempts} key={attempt.id} />)}</div></section>}</section></AppShell>;
}

function AttemptRow({ attempt, attempts }: { attempt: QuestionAttempt; attempts: QuestionAttempt[] }) {
  const question = seedQuestions.find((item) => item.id === attempt.questionId);
  const subject = subjectOptions.find((item) => item.id === question?.subjectId);
  const tag = question?.taxonomyTags.find((item) => item.isPrimary) ?? question?.taxonomyTags[0];
  const topic = seedTaxonomyNodes.find((item) => item.id === tag?.taxonomyNodeId);
  const option = question?.kind === 'multiple_choice' && attempt.answer.kind === 'selected_option' ? question.options.find((item) => item.id === attempt.answer.selectedOptionId) : null;
  const status = attempt.outcome === 'correct' ? 'correct' : attempt.outcome === 'incorrect' ? 'incorrect' : 'redo';

  return <ArcCard className="flex items-center justify-between gap-4 px-5 py-4"><div className="min-w-0"><p className="truncate text-sm font-medium">{subject?.name ?? 'Disciplina'}{topic ? ` · ${topic.name}` : ''}</p><p className="mt-1 text-xs text-[var(--arc-text-muted)]">Tentativa {getAttemptNumber(attempt, attempts)}{option ? ` · alternativa ${option.label}` : ''} · {formatAttemptDate(attempt.createdAt)}</p></div><AttemptStatusBadge status={status} /></ArcCard>;
}
