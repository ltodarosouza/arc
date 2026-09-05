'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

import { ArcCard } from '@/components/arc-ui';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { subjectOptions } from '@/lib/data/subject-options';

export function SubjectsManager() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  useEffect(() => { setSelectedSubjectIds(createLocalLearnerRepository().getState().selectedSubjectIds); }, []);
  const toggleSubject = (subjectId: string) => { const nextSubjectIds = selectedSubjectIds.includes(subjectId) ? selectedSubjectIds.filter((id) => id !== subjectId) : [...selectedSubjectIds, subjectId]; setSelectedSubjectIds(nextSubjectIds); createLocalLearnerRepository().saveSelectedSubjectIds(nextSubjectIds); };
  return <ArcCard className="mt-9 max-w-2xl p-4 sm:p-5"><p className="text-sm leading-6 text-[#68706b]">Escolha as disciplinas que fazem parte do seu momento. Você pode mudar isso quando quiser.</p><div className="mt-5 grid gap-2">{subjectOptions.map((subject) => { const isSelected = selectedSubjectIds.includes(subject.id); return <button aria-pressed={isSelected} className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${isSelected ? 'border-[#a8c7b3] bg-[#eef6f0]' : 'border-black/[0.08] hover:border-black/[0.17] hover:bg-[#fafbfa]'}`} key={subject.id} onClick={() => toggleSubject(subject.id)}><span className={`grid size-6 shrink-0 place-items-center rounded-full border ${isSelected ? 'border-[#5f8f71] bg-[#5f8f71] text-white' : 'border-black/[0.13] bg-white text-transparent'}`}><Check className="size-3.5" /></span><span><span className="block text-sm font-medium">{subject.name}</span><span className="mt-0.5 block text-xs text-[#68706b]">{subject.description}</span></span></button>; })}</div></ArcCard>;
}
