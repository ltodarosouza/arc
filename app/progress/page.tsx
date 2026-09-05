'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { ArcCard } from '@/components/arc-ui';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { summarizeProgress } from '@/lib/domain/progress';
import type { LearnerState } from '@/lib/domain/learner';

export default function ProgressPage() {
  const [learnerState, setLearnerState] = useState<LearnerState | null>(null);
  useEffect(() => setLearnerState(createLocalLearnerRepository().getState()), []);

  const summary = summarizeProgress(learnerState?.attempts ?? []);
  const redoCount = learnerState?.redoQuestionIds.length ?? 0;

  return <AppShell active="progress"><section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16"><p className="text-sm font-medium text-[var(--arc-accent-strong)]">Progresso</p><h1 className="mt-2 text-4xl font-medium tracking-[-0.065em] sm:text-5xl">Seu histórico, em resumo.</h1><p className="mt-3 max-w-lg text-[15px] leading-6 text-[var(--arc-text-muted)]">Cada questão conta uma vez. Ao refazer, o resultado mais recente substitui o anterior.</p><div className="mt-10 grid gap-3 sm:grid-cols-3"><ArcCard className="p-5"><CheckCircle2 className="size-5 text-[var(--arc-success-text)]" /><p className="mt-7 text-3xl font-medium tracking-[-0.05em]">{summary.correct}</p><p className="mt-1 text-sm text-[var(--arc-text-muted)]">Acertos</p></ArcCard><ArcCard className="p-5"><XCircle className="size-5 text-[var(--arc-error-text)]" /><p className="mt-7 text-3xl font-medium tracking-[-0.05em]">{summary.incorrect}</p><p className="mt-1 text-sm text-[var(--arc-text-muted)]">Erros</p></ArcCard><ArcCard className="p-5"><RotateCcw className="size-5 text-[var(--arc-redo-text)]" /><p className="mt-7 text-3xl font-medium tracking-[-0.05em]">{redoCount}</p><p className="mt-1 text-sm text-[var(--arc-text-muted)]">Para refazer</p></ArcCard></div><ArcCard className="mt-6 p-6"><p className="font-medium tracking-[-0.025em]">{summary.answered ? `${summary.answered} questão${summary.answered === 1 ? '' : 'ões'} respondida${summary.answered === 1 ? '' : 's'}.` : 'Nenhuma questão respondida ainda.'}</p><p className="mt-2 text-sm leading-6 text-[var(--arc-text-muted)]">{summary.answered ? 'Continue praticando para atualizar seus resultados.' : 'Escolha uma disciplina e resolva a primeira questão.'}</p><a className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline" href="/explore">Ir para questões <ArrowRight className="size-4" /></a></ArcCard></section></AppShell>;
}
