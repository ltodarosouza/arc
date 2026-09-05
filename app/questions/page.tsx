'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { AttemptStatusBadge, ArcCard } from '@/components/arc-ui';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { seedQuestions, seedTaxonomyNodes } from '@/lib/data/seed-catalogue';
import { subjectOptions } from '@/lib/data/subject-options';
import type { AttemptOutcome } from '@/lib/domain/questions';

function questionPreview(value: string) {
  return value.replaceAll('$', '').replaceAll('\\int', '∫').replaceAll('\\sum', 'Σ').replace(/\\,/g, ' ').replaceAll('\\infty', '∞');
}

export default function QuestionsPage() {
  const [subjectId, setSubjectId] = useState('subject-calculus-2');
  const [outcomeByQuestionId, setOutcomeByQuestionId] = useState<Map<string, AttemptOutcome>>(new Map());

  useEffect(() => {
    const state = createLocalLearnerRepository().getState();
    const requestedSubjectId = new URLSearchParams(window.location.search).get('subject');
    setSubjectId(requestedSubjectId && subjectOptions.some((subject) => subject.id === requestedSubjectId) ? requestedSubjectId : 'subject-calculus-2');
    const outcomes = new Map<string, AttemptOutcome>();
    for (const attempt of state.attempts) outcomes.set(attempt.questionId, attempt.outcome);
    setOutcomeByQuestionId(outcomes);
  }, []);

  const subject = subjectOptions.find((item) => item.id === subjectId) ?? subjectOptions[0];
  const questions = useMemo(() => seedQuestions.filter((question) => question.subjectId === subject.id), [subject.id]);

  return <AppShell active="explore"><section className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16"><div className="flex items-center gap-2 text-sm text-[#68706b]"><a className="hover:text-[#161616]" href={`/explore?subject=${subject.id}`}>{subject.name}</a><ChevronRight className="size-4" /><span>Todas as questões</span></div><div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-[#6b766f]">Banco de questões</p><h1 className="mt-2 text-4xl font-medium tracking-[-0.065em] sm:text-5xl">Todas as questões.</h1><p className="mt-3 text-[15px] text-[#68706b]">{questions.length} questão{questions.length === 1 ? '' : 'ões'} encontrada{questions.length === 1 ? '' : 's'} em {subject.name}.</p></div><a className="inline-flex h-11 items-center gap-2 rounded-full bg-[#c8e1d4] px-5 text-sm font-medium transition-colors hover:bg-[#b9d9c9]" href={`/practice?subject=${subject.id}`}>Começar agora <ArrowRight className="size-4" /></a></div>{questions.length ? <div className="mt-10 grid gap-3">{questions.map((question, index) => { const outcome = outcomeByQuestionId.get(question.id); const topicNames = question.taxonomyTags.map((tag) => seedTaxonomyNodes.find((node) => node.id === tag.taxonomyNodeId)?.name).filter(Boolean); return <ArcCard className="p-5 sm:p-6" key={question.id}><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-center gap-2 text-xs font-medium text-[#68706b]"><span>Questão {String(index + 1).padStart(2, '0')}</span><span className="rounded-full bg-[#f0f3f0] px-2.5 py-1 capitalize">{question.difficulty === 'easy' ? 'Fácil' : question.difficulty === 'medium' ? 'Média' : 'Difícil'}</span></div>{outcome && <AttemptStatusBadge status={outcome === 'correct' ? 'correct' : outcome === 'incorrect' ? 'incorrect' : 'redo'} />}</div><p className="mt-5 max-w-3xl text-[17px] font-medium leading-7 tracking-[-0.02em]">{questionPreview(question.statement.value)}</p><div className="mt-5 flex flex-wrap items-center justify-between gap-4"><div className="flex flex-wrap gap-2">{topicNames.map((name) => <span className="rounded-full bg-[#f4f6f4] px-2.5 py-1 text-xs text-[#617067]" key={name}>{name}</span>)}</div><a className="inline-flex items-center gap-1 text-sm font-medium text-[#435f50] hover:underline" href={`/practice?subject=${subject.id}&question=${question.id}`}>{outcome ? 'Refazer' : 'Resolver'} <ArrowRight className="size-4" /></a></div></ArcCard>; })}</div> : <ArcCard className="mt-10 p-8 text-center"><span className="mx-auto grid size-11 place-items-center rounded-2xl bg-[#eff4f0] text-[#466254]"><BookOpen className="size-5" /></span><h2 className="mt-5 text-xl font-medium tracking-[-0.03em]">Ainda não há questões aqui.</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#68706b]">Esta disciplina já pode ser selecionada, mas o catálogo dela ainda está em preparação.</p><a className="mt-5 inline-flex text-sm font-medium text-[#435f50] hover:underline" href="/subjects">Ver disciplinas</a></ArcCard>}</section></AppShell>;
}
