'use client';

import { useEffect, useMemo, useState } from 'react';
import { BookOpen, ChevronRight, SlidersHorizontal } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { ArcCard } from '@/components/arc-ui';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { seedQuestions, seedTaxonomyNodes } from '@/lib/data/seed-catalogue';
import { subjectOptions } from '@/lib/data/subject-options';
import { getTaxonomyBranch } from '@/lib/domain/taxonomy';

export default function ExplorePage() {
  const [subjectId, setSubjectId] = useState('subject-calculus-2');
  const [attemptedQuestionIds, setAttemptedQuestionIds] = useState<string[]>([]);

  useEffect(() => {
    const state = createLocalLearnerRepository().getState();
    const requestedSubjectId = new URLSearchParams(window.location.search).get('subject');
    const selectedSubjectIds = state.selectedSubjectIds;
    const fallbackSubjectId = selectedSubjectIds[0] ?? 'subject-calculus-2';
    setSubjectId(requestedSubjectId && subjectOptions.some((subject) => subject.id === requestedSubjectId) ? requestedSubjectId : fallbackSubjectId);
    setAttemptedQuestionIds([...new Set(state.attempts.map((attempt) => attempt.questionId))]);
  }, []);

  const subject = subjectOptions.find((item) => item.id === subjectId) ?? subjectOptions[0];
  const subjectQuestions = useMemo(() => seedQuestions.filter((question) => question.subjectId === subject.id), [subject.id]);
  const topics = useMemo(() => seedTaxonomyNodes.filter((node) => node.subjectId === subject.id && node.kind === 'topic').map((topic) => ({ ...topic, count: subjectQuestions.filter((question) => { const branch = getTaxonomyBranch(topic.id, seedTaxonomyNodes); return question.taxonomyTags.some((tag) => branch.includes(tag.taxonomyNodeId)); }).length })), [subject.id, subjectQuestions]);
  const attemptedCount = subjectQuestions.filter((question) => attemptedQuestionIds.includes(question.id)).length;

  return <AppShell active="explore"><section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16"><p className="text-sm font-medium text-[#6b766f]">Banco de questões</p><div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h1 className="text-4xl font-medium tracking-[-0.065em] sm:text-5xl">Explore por assunto.</h1><p className="mt-3 text-[15px] text-[#68706b]">Acesse todas as questões ou vá direto ao conteúdo de que precisa.</p></div><a className="inline-flex items-center gap-2 text-sm font-medium text-[#435f50] hover:underline" href="/subjects"><SlidersHorizontal className="size-4" /> Trocar disciplina</a></div><ArcCard className="mt-10 overflow-hidden"><div className="flex items-center gap-3 border-b border-black/[0.07] px-5 py-5 sm:px-8"><span className="grid size-9 place-items-center rounded-xl bg-[#eff4f0] text-[#466254]"><BookOpen className="size-4" /></span><div><p className="font-medium tracking-[-0.025em]">{subject.name}</p><p className="mt-0.5 text-xs text-[#68706b]">{subjectQuestions.length} questão{subjectQuestions.length === 1 ? '' : 'ões'} de demonstração · {attemptedCount} feita{attemptedCount === 1 ? '' : 's'}</p></div></div><div className="grid lg:grid-cols-[0.92fr_1.08fr]"><div className="border-b border-black/[0.07] p-5 sm:p-8 lg:border-b-0 lg:border-r"><p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7b817d]">Começar rápido</p><p className="mt-5 text-2xl font-medium tracking-[-0.05em]">Todas as questões</p><p className="mt-2 text-sm leading-6 text-[#68706b]">Entre no banco inteiro desta disciplina e aplique filtros quando precisar.</p><a className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1d221d] px-4 py-2.5 text-sm font-medium text-white" href={`/questions?subject=${subject.id}`}>Ver questões <ChevronRight className="size-4" /></a></div><div className="p-5 sm:p-8"><p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7b817d]">Escolha um assunto</p>{topics.length ? <div className="mt-4 divide-y divide-black/[0.06]">{topics.map((topic, index) => <a className="group flex items-center gap-4 py-4" href={`/questions?subject=${subject.id}&topic=${topic.id}`} key={topic.id}><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f3f4f2] text-xs font-medium text-[#637167]">{String(index + 1).padStart(2, '0')}</span><span className="min-w-0 flex-1"><span className="block text-[15px] font-medium tracking-[-0.02em]">{topic.name}</span><span className="mt-1 block text-xs text-[#68706b]">{topic.count} questão{topic.count === 1 ? '' : 'ões'} de demonstração</span></span><ChevronRight className="size-4 text-zinc-300 transition-all group-hover:translate-x-1 group-hover:text-zinc-700" /></a>)}</div> : <div className="mt-5 rounded-2xl bg-[#f4f6f4] p-4 text-sm leading-6 text-[#68706b]">Os primeiros assuntos desta disciplina serão adicionados após a curadoria do catálogo.</div>}</div></div></ArcCard></section></AppShell>;
}
