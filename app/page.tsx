'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { ArcCard } from '@/components/arc-ui';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { seedQuestions } from '@/lib/data/seed-catalogue';
import { subjectOptions } from '@/lib/data/subject-options';

export default function Home() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const [attemptedQuestionIds, setAttemptedQuestionIds] = useState<string[]>([]);
  useEffect(() => {
    const state = createLocalLearnerRepository().getState();
    setSelectedSubjectIds(state.selectedSubjectIds);
    setAttemptedQuestionIds([...new Set(state.attempts.map((attempt) => attempt.questionId))]);
  }, []);
  const selectedSubjects = subjectOptions.filter((subject) => selectedSubjectIds.includes(subject.id));
  const resumeHref = selectedSubjects.length ? `/explore?subject=${selectedSubjects[0].id}&view=topics` : '/explore';
  return <AppShell active="home"><section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-20"><p className="text-sm font-medium text-[#6b766f]">Seu espaço de prática</p><div className="mt-3 flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><div><h1 className="max-w-xl text-4xl font-medium tracking-[-0.065em] sm:text-6xl">O que você quer praticar hoje?</h1><p className="mt-4 max-w-md text-[15px] leading-6 text-[#6c716d]">Escolha uma disciplina e comece sem preparar uma sessão.</p></div><a className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#c8e1d4] px-5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b9d9c9]" href={resumeHref}>{selectedSubjects.length ? `Continuar em ${selectedSubjects[0].name}` : 'Explorar questões'} <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" /></a></div><div className="mt-12 border-t border-black/[0.07] pt-5"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7b817d]">Minhas disciplinas</p><p className="mt-1 text-sm text-[#68706b]">{selectedSubjects.length ? 'Entre por uma delas ou ajuste sua seleção.' : 'Escolha as disciplinas que você está cursando.'}</p></div><a className="text-sm font-medium text-[#435f50] hover:underline" href="/subjects">Gerenciar</a></div>{selectedSubjects.length ? <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{selectedSubjects.map((subject) => { const subjectQuestionIds = seedQuestions.filter((question) => question.subjectId === subject.id).map((question) => question.id); const attemptedCount = subjectQuestionIds.filter((questionId) => attemptedQuestionIds.includes(questionId)).length; const progressLabel = subjectQuestionIds.length ? `${attemptedCount} de ${subjectQuestionIds.length} questões de demonstração` : 'Catálogo em preparação'; return <ArcCard className="p-5" key={subject.id}><span className="grid size-9 place-items-center rounded-xl bg-[#eff4f0] text-[#466254]"><BookOpen className="size-4" /></span><p className="mt-5 font-medium tracking-[-0.03em]">{subject.name}</p><p className="mt-1 text-sm leading-5 text-[#68706b]">{subject.description}</p><p className="mt-4 text-xs font-medium text-[#5d7768]">{progressLabel}</p><div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#435f50]"><a className="inline-flex items-center gap-1 hover:underline" href={`/explore?subject=${subject.id}&view=all`}>Todas <ChevronRight className="size-4" /></a><a className="inline-flex items-center gap-1 hover:underline" href={`/explore?subject=${subject.id}&view=topics`}>Assuntos <ChevronRight className="size-4" /></a></div></ArcCard>; })}</div> : <ArcCard className="mt-5 p-5"><p className="text-sm text-[#68706b]">Você ainda não selecionou uma disciplina.</p><a className="mt-3 inline-flex text-sm font-medium text-[#435f50] hover:underline" href="/subjects">Escolher disciplinas</a></ArcCard>}</div></section></AppShell>;
}
