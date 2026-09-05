'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { ArcCard } from '@/components/arc-ui';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { seedQuestions } from '@/lib/data/seed-catalogue';
import { subjectOptions } from '@/lib/data/subject-options';
import type { AttemptOutcome } from '@/lib/domain/questions';

export default function Home() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const [outcomeByQuestionId, setOutcomeByQuestionId] = useState<Map<string, AttemptOutcome>>(new Map());

  useEffect(() => {
    const state = createLocalLearnerRepository().getState();
    const outcomes = new Map<string, AttemptOutcome>();
    for (const attempt of state.attempts) outcomes.set(attempt.questionId, attempt.outcome);
    setSelectedSubjectIds(state.selectedSubjectIds);
    setOutcomeByQuestionId(outcomes);
  }, []);

  const selectedSubjects = subjectOptions.filter((subject) => selectedSubjectIds.includes(subject.id));
  const progress = useMemo(() => ({ completed: outcomeByQuestionId.size, correct: [...outcomeByQuestionId.values()].filter((outcome) => outcome === 'correct').length }), [outcomeByQuestionId]);
  const resumeHref = selectedSubjects.length ? '/explore' : '/subjects';

  return <AppShell active="home"><section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-20"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-[var(--arc-accent-strong)]">Início</p><h1 className="mt-2 max-w-xl text-4xl font-medium tracking-[-0.065em] sm:text-6xl">Encontre uma questão e comece.</h1></div><a className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--arc-accent)] px-5 text-sm font-medium text-[#263950] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c8d8d6]" href={resumeHref}>{selectedSubjects.length ? 'Ir para questões' : 'Escolher disciplinas'} <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" /></a></div>{progress.completed > 0 && <div className="mt-8 flex items-center gap-3 text-sm text-[var(--arc-text-muted)]"><span>{progress.completed} feita{progress.completed === 1 ? '' : 's'}</span><span className="size-1 rounded-full bg-[#a9b4b9]" /><span>{progress.correct} acertada{progress.correct === 1 ? '' : 's'}</span></div>}<div className="mt-10 border-t border-[var(--border)] pt-5"><div className="flex items-center justify-between gap-4"><p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--arc-text-muted)]">Minhas disciplinas</p><a className="text-sm font-medium text-[#46657a] hover:underline" href="/subjects">Gerenciar</a></div>{selectedSubjects.length ? <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{selectedSubjects.map((subject) => { const subjectQuestionIds = seedQuestions.filter((question) => question.subjectId === subject.id).map((question) => question.id); const completed = subjectQuestionIds.filter((id) => outcomeByQuestionId.has(id)).length; return <ArcCard className="p-5" key={subject.id}><span className="grid size-9 place-items-center rounded-xl bg-[var(--arc-accent)] text-[#46657a]"><BookOpen className="size-4" /></span><p className="mt-5 font-medium tracking-[-0.03em]">{subject.name}</p><p className="mt-1 text-sm leading-5 text-[var(--arc-text-muted)]">{subject.description}</p><p className="mt-4 text-xs font-medium text-[#527184]">{subjectQuestionIds.length ? `${completed} de ${subjectQuestionIds.length} feitas` : 'Catálogo em preparação'}</p><div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#46657a]"><a className="inline-flex items-center gap-1 hover:underline" href={`/questions?subject=${subject.id}`}>Questões <ChevronRight className="size-4" /></a><a className="inline-flex items-center gap-1 hover:underline" href="/explore">Assuntos <ChevronRight className="size-4" /></a></div></ArcCard>; })}</div> : <ArcCard className="mt-5 p-5"><p className="text-sm text-[var(--arc-text-muted)]">Nenhuma disciplina selecionada.</p><a className="mt-3 inline-flex text-sm font-medium text-[#46657a] hover:underline" href="/subjects">Escolher disciplinas</a></ArcCard>}</div></section></AppShell>;
}
