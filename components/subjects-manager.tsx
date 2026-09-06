'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

import { ArcCard } from '@/components/arc-ui';
import { normalizeSelectedSubjectIds } from '@/lib/data/catalogue-repository';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { useLearnerState } from '@/lib/data/use-learner-state';

export function SubjectsManager() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const { catalogue, error, isLoading } = useCatalogue();
  const { state: learnerState, saveSelectedSubjectIds } = useLearnerState();
  useEffect(() => {
    if (!catalogue) return;
    const savedIds = learnerState?.selectedSubjectIds ?? [];
    const subjectIds = normalizeSelectedSubjectIds(savedIds, catalogue);
    setSelectedSubjectIds(subjectIds);
    if (subjectIds.join(',') !== savedIds.join(',')) void saveSelectedSubjectIds(subjectIds);
  }, [catalogue, learnerState, saveSelectedSubjectIds]);
  const toggleSubject = (subjectId: string) => { const nextSubjectIds = selectedSubjectIds.includes(subjectId) ? selectedSubjectIds.filter((id) => id !== subjectId) : [...selectedSubjectIds, subjectId]; setSelectedSubjectIds(nextSubjectIds); void saveSelectedSubjectIds(nextSubjectIds); };
  return <ArcCard className="mt-9 max-w-2xl p-4 sm:p-5"><p className="text-sm leading-6 text-[#68706b]">Escolha as disciplinas que fazem parte do seu momento. Você pode mudar isso quando quiser.</p>{isLoading && <p className="mt-5 text-sm text-[var(--arc-text-muted)]">Carregando disciplinas…</p>}{error && <p className="mt-5 text-sm text-[var(--arc-error-text)]">Não foi possível carregar as disciplinas publicadas.</p>}{catalogue && <div className="mt-5 grid gap-2">{catalogue.subjects.map((subject) => { const isSelected = selectedSubjectIds.includes(subject.id); return <button aria-pressed={isSelected} className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${isSelected ? 'border-[#a8c7b3] bg-[#eef6f0]' : 'border-black/[0.08] hover:border-black/[0.17] hover:bg-[#fafbfa]'}`} key={subject.id} onClick={() => toggleSubject(subject.id)}><span className={`grid size-6 shrink-0 place-items-center rounded-full border ${isSelected ? 'border-[#5f8f71] bg-[#5f8f71] text-white' : 'border-black/[0.13] bg-white text-transparent'}`}><Check className="size-3.5" /></span><span><span className="block text-sm font-medium">{subject.name}</span><span className="mt-0.5 block text-xs text-[#68706b]">{subject.description}</span></span></button>; })}</div>}</ArcCard>;
}
