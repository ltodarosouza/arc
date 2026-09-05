'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, ChevronRight, SlidersHorizontal, X } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { AttemptStatusBadge, ArcCard } from '@/components/arc-ui';
import { MathContent } from '@/components/math-content';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { seedQuestions, seedTaxonomyNodes } from '@/lib/data/seed-catalogue';
import { subjectOptions } from '@/lib/data/subject-options';
import { getTaxonomyBranch } from '@/lib/domain/taxonomy';
import type { AttemptOutcome } from '@/lib/domain/questions';

export default function QuestionsPage() {
  const [subjectId, setSubjectId] = useState('subject-calculus-2');
  const [unitId, setUnitId] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [subtopicId, setSubtopicId] = useState<string | null>(null);
  const [outcomeByQuestionId, setOutcomeByQuestionId] = useState<Map<string, AttemptOutcome>>(new Map());

  useEffect(() => {
    const state = createLocalLearnerRepository().getState();
    const search = new URLSearchParams(window.location.search);
    const requestedSubjectId = search.get('subject');
    const requestedTopicId = search.get('topic');
    setSubjectId(requestedSubjectId && subjectOptions.some((subject) => subject.id === requestedSubjectId) ? requestedSubjectId : 'subject-calculus-2');
    setTopicId(requestedTopicId);
    const outcomes = new Map<string, AttemptOutcome>();
    for (const attempt of state.attempts) outcomes.set(attempt.questionId, attempt.outcome);
    setOutcomeByQuestionId(outcomes);
  }, []);

  const subject = subjectOptions.find((item) => item.id === subjectId) ?? subjectOptions[0];
  const nodes = useMemo(() => seedTaxonomyNodes.filter((node) => node.subjectId === subject.id), [subject.id]);
  const units = nodes.filter((node) => node.kind === 'unit');
  const topics = nodes.filter((node) => node.kind === 'topic' && (!unitId || node.parentId === unitId));
  const subtopics = nodes.filter((node) => node.kind === 'subtopic' && (!topicId || node.parentId === topicId));
  const selectedNodeIds = [unitId, topicId, subtopicId].filter((id): id is string => Boolean(id));
  const questions = useMemo(() => seedQuestions.filter((question) => question.subjectId === subject.id && selectedNodeIds.every((nodeId) => { const branch = getTaxonomyBranch(nodeId, seedTaxonomyNodes); return question.taxonomyTags.some((tag) => branch.includes(tag.taxonomyNodeId)); })), [subject.id, selectedNodeIds]);
  const activeFilters = selectedNodeIds.map((id) => nodes.find((node) => node.id === id)).filter((node): node is NonNullable<typeof node> => Boolean(node));

  const selectUnit = (value: string) => { setUnitId(value || null); setTopicId(null); setSubtopicId(null); };
  const selectTopic = (value: string) => { setTopicId(value || null); setSubtopicId(null); };
  const clearFilter = (kind: 'unit' | 'topic' | 'subtopic') => { if (kind === 'unit') { setUnitId(null); setTopicId(null); setSubtopicId(null); } if (kind === 'topic') { setTopicId(null); setSubtopicId(null); } if (kind === 'subtopic') setSubtopicId(null); };

  return <AppShell active="explore"><section className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16"><div className="flex items-center gap-2 text-sm text-[#68706b]"><a className="hover:text-[#161616]" href={`/explore?subject=${subject.id}`}>{subject.name}</a><ChevronRight className="size-4" /><span>Todas as questões</span></div><div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-[#6b766f]">Banco de questões</p><h1 className="mt-2 text-4xl font-medium tracking-[-0.065em] sm:text-5xl">Todas as questões.</h1><p className="mt-3 text-[15px] text-[#68706b]">{questions.length} questão{questions.length === 1 ? '' : 'ões'} encontrada{questions.length === 1 ? '' : 's'} em {subject.name}.</p></div><a className="inline-flex h-11 items-center gap-2 rounded-full bg-[#c8e1d4] px-5 text-sm font-medium transition-colors hover:bg-[#b9d9c9]" href={`/practice?subject=${subject.id}`}>Começar agora <ArrowRight className="size-4" /></a></div><ArcCard className="mt-8 p-4 sm:p-5"><div className="flex items-center gap-2"><SlidersHorizontal className="size-4 text-[#5d7768]" /><p className="text-sm font-medium">Filtrar questões</p></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><label className="grid gap-1.5 text-xs font-medium text-[#68706b]">Unidade<select className="h-10 rounded-xl border border-black/[0.1] bg-white px-3 text-sm text-[#161616]" onChange={(event) => selectUnit(event.target.value)} value={unitId ?? ''}><option value="">Todas</option>{units.map((unit) => <option key={unit.id} value={unit.id}>{unit.name}</option>)}</select></label><label className="grid gap-1.5 text-xs font-medium text-[#68706b]">Assunto<select className="h-10 rounded-xl border border-black/[0.1] bg-white px-3 text-sm text-[#161616]" disabled={!topics.length} onChange={(event) => selectTopic(event.target.value)} value={topicId ?? ''}><option value="">Todos</option>{topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.name}</option>)}</select></label><label className="grid gap-1.5 text-xs font-medium text-[#68706b]">Subassunto<select className="h-10 rounded-xl border border-black/[0.1] bg-white px-3 text-sm text-[#161616]" disabled={!subtopics.length || !topicId} onChange={(event) => setSubtopicId(event.target.value || null)} value={subtopicId ?? ''}><option value="">Todos</option>{subtopics.map((subtopic) => <option key={subtopic.id} value={subtopic.id}>{subtopic.name}</option>)}</select></label></div>{activeFilters.length > 0 && <div className="mt-4 flex flex-wrap items-center gap-2"><span className="text-xs text-[#68706b]">Aplicados:</span>{activeFilters.map((filter) => <button className="inline-flex items-center gap-1 rounded-full bg-[#eef4ef] px-2.5 py-1 text-xs font-medium text-[#435f50]" key={filter.id} onClick={() => clearFilter(filter.kind)}>{filter.name}<X className="size-3" /></button>)}<button className="text-xs font-medium text-[#68706b] hover:text-[#161616]" onClick={() => clearFilter('unit')}>Limpar tudo</button></div>}</ArcCard>{questions.length ? <div className="mt-6 grid gap-3">{questions.map((question, index) => { const outcome = outcomeByQuestionId.get(question.id); const topicNames = question.taxonomyTags.map((tag) => seedTaxonomyNodes.find((node) => node.id === tag.taxonomyNodeId)?.name).filter(Boolean); return <ArcCard className="p-5 sm:p-6" key={question.id}><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-center gap-2 text-xs font-medium text-[#68706b]"><span>Questão {String(index + 1).padStart(2, '0')}</span><span className="rounded-full bg-[#f0f3f0] px-2.5 py-1 capitalize">{question.difficulty === 'easy' ? 'Fácil' : question.difficulty === 'medium' ? 'Média' : 'Difícil'}</span></div>{outcome && <AttemptStatusBadge status={outcome === 'correct' ? 'correct' : outcome === 'incorrect' ? 'incorrect' : 'redo'} />}</div><div className="mt-5 max-w-3xl text-[17px] font-medium leading-7 tracking-[-0.02em]"><MathContent value={question.statement.value} /></div><div className="mt-5 flex flex-wrap items-center justify-between gap-4"><div className="flex flex-wrap gap-2">{topicNames.map((name) => <span className="rounded-full bg-[#f4f6f4] px-2.5 py-1 text-xs text-[#617067]" key={name}>{name}</span>)}</div><a className="inline-flex items-center gap-1 text-sm font-medium text-[#435f50] hover:underline" href={`/practice?subject=${subject.id}&question=${question.id}`}>{outcome ? 'Refazer' : 'Resolver'} <ArrowRight className="size-4" /></a></div></ArcCard>; })}</div> : <ArcCard className="mt-6 p-8 text-center"><span className="mx-auto grid size-11 place-items-center rounded-2xl bg-[#eff4f0] text-[#466254]"><BookOpen className="size-5" /></span><h2 className="mt-5 text-xl font-medium tracking-[-0.03em]">Nenhuma questão encontrada.</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#68706b]">Tente remover um filtro ou escolha outro assunto.</p><button className="mt-5 text-sm font-medium text-[#435f50] hover:underline" onClick={() => clearFilter('unit')}>Limpar filtros</button></ArcCard>}</section></AppShell>;
}
