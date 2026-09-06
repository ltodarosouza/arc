'use client';

import { useEffect, useMemo, useState } from 'react';
import { BookOpen, ChevronRight, SlidersHorizontal } from 'lucide-react';

import { AppShell } from '@/components/app-shell';
import { ArcCard } from '@/components/arc-ui';
import { normalizeSelectedSubjectIds } from '@/lib/data/catalogue-repository';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { getTaxonomyBranch } from '@/lib/domain/taxonomy';

export default function ExplorePage() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const [attemptedQuestionIds, setAttemptedQuestionIds] = useState<string[]>([]);
  const { catalogue, error, isLoading } = useCatalogue();

  useEffect(() => {
    if (!catalogue) return;
    const state = createLocalLearnerRepository().getState();
    const subjectIds = normalizeSelectedSubjectIds(state.selectedSubjectIds, catalogue);
    setSelectedSubjectIds(subjectIds);
    if (subjectIds.join(',') !== state.selectedSubjectIds.join(',')) createLocalLearnerRepository().saveSelectedSubjectIds(subjectIds);
    setAttemptedQuestionIds([...new Set(state.attempts.map((attempt) => attempt.questionId))]);
  }, [catalogue]);

  const selectedSubjects = catalogue?.subjects.filter((subject) => selectedSubjectIds.includes(subject.id)) ?? [];
  const subjectDetails = useMemo(() => selectedSubjects.map((subject) => {
    const questions = catalogue?.questions.filter((question) => question.subjectId === subject.id) ?? [];
    const nodes = catalogue?.taxonomyNodes ?? [];
    const topics = nodes.filter((node) => node.subjectId === subject.id && node.kind === 'topic').map((topic) => ({
      ...topic,
      count: questions.filter((question) => {
        const branch = getTaxonomyBranch(topic.id, nodes);
        return question.taxonomyTags.some((tag) => branch.includes(tag.taxonomyNodeId));
      }).length,
    }));
    return { subject, questions, topics, attemptedCount: questions.filter((question) => attemptedQuestionIds.includes(question.id)).length };
  }), [attemptedQuestionIds, selectedSubjects, catalogue]);

  return <AppShell active="explore"><section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-[var(--arc-accent-strong)]">Questões</p><h1 className="mt-2 text-4xl font-medium tracking-[-0.065em] sm:text-5xl">Escolha uma disciplina.</h1></div><a className="inline-flex items-center gap-2 text-sm font-medium text-[#46657a] hover:underline" href="/subjects"><SlidersHorizontal className="size-4" /> Gerenciar disciplinas</a></div>
    {isLoading ? <ArcCard className="mt-9 p-7 text-sm text-[var(--arc-text-muted)]">Carregando suas disciplinas…</ArcCard> : error ? <ArcCard className="mt-9 p-7 text-sm text-[var(--arc-error-text)]">Não foi possível carregar o catálogo publicado.</ArcCard> : subjectDetails.length ? <div className="mt-9 grid gap-4 lg:grid-cols-2">{subjectDetails.map(({ subject, questions, topics, attemptedCount }) => <ArcCard className="overflow-hidden" key={subject.id}><div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-5 sm:px-6"><span className="grid size-9 place-items-center rounded-xl bg-[var(--arc-accent)] text-[#46657a]"><BookOpen className="size-4" /></span><div className="min-w-0 flex-1"><p className="font-medium tracking-[-0.025em]">{subject.name}</p><p className="mt-0.5 text-xs text-[var(--arc-text-muted)]">{questions.length} questão{questions.length === 1 ? '' : 'ões'} · {attemptedCount} feita{attemptedCount === 1 ? '' : 's'}</p></div><a className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#46657a] hover:underline" href={`/questions?subject=${subject.id}`}>Ver todas <ChevronRight className="size-4" /></a></div><div className="p-5 sm:p-6"><p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--arc-text-muted)]">Assuntos</p>{topics.length ? <div className="mt-3 flex flex-wrap gap-2">{topics.map((topic) => <a className="rounded-full bg-[var(--arc-surface-subtle)] px-3 py-1.5 text-xs text-[#4f606d] transition-colors hover:bg-[var(--arc-accent)] hover:text-[#263950]" href={`/questions?subject=${subject.id}&topic=${topic.id}`} key={topic.id}>{topic.name} <span className="ml-1 opacity-60">{topic.count}</span></a>)}</div> : <p className="mt-3 text-sm text-[var(--arc-text-muted)]">Assuntos em preparação.</p>}</div></ArcCard>)}</div> : <ArcCard className="mt-9 p-7"><p className="text-lg font-medium tracking-[-0.03em]">Selecione suas disciplinas.</p><p className="mt-2 text-sm text-[var(--arc-text-muted)]">Elas aparecerão aqui para você começar a praticar.</p><a className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline" href="/subjects">Escolher disciplinas <ChevronRight className="size-4" /></a></ArcCard>}
  </section></AppShell>;
}
