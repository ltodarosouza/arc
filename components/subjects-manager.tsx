'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

import { ArcCard } from '@/components/arc-ui';
import { Reveal } from '@/components/reveal';
import { normalizeSelectedSubjectIds } from '@/lib/data/catalogue-repository';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { useLearnerState } from '@/lib/data/use-learner-state';

export function SubjectsManager() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const { catalogue, error, isLoading } = useCatalogue();
  const {
    state: learnerState,
    saveSelectedSubjectIds,
    isLoading: learnerLoading,
  } = useLearnerState();
  const isInitialLoading = isLoading || learnerLoading || !learnerState;
  useEffect(() => {
    if (!catalogue) return;
    const savedIds = learnerState?.selectedSubjectIds ?? [];
    const subjectIds = normalizeSelectedSubjectIds(savedIds, catalogue);
    setSelectedSubjectIds(subjectIds);
    if (subjectIds.join(',') !== savedIds.join(','))
      void saveSelectedSubjectIds(subjectIds);
  }, [catalogue, learnerState, saveSelectedSubjectIds]);
  const toggleSubject = (subjectId: string) => {
    const nextSubjectIds = selectedSubjectIds.includes(subjectId)
      ? selectedSubjectIds.filter((id) => id !== subjectId)
      : [...selectedSubjectIds, subjectId];
    setSelectedSubjectIds(nextSubjectIds);
    void saveSelectedSubjectIds(nextSubjectIds);
  };
  return (
    <ArcCard className="mt-8 p-4 sm:p-6">
      <p className="arc-caption">
        {isInitialLoading
          ? 'Carregando sua seleção'
          : `${selectedSubjectIds.length} selecionada${selectedSubjectIds.length === 1 ? '' : 's'}`}
      </p>
      {isInitialLoading && (
        <div aria-busy="true" className="mt-5 grid gap-2">
          {[0, 1, 2].map((item) => (
            <div
              aria-hidden="true"
              className="h-20 animate-pulse rounded-lg bg-[var(--arc-surface-subtle)]"
              key={item}
            />
          ))}
        </div>
      )}
      {error && (
        <p className="mt-5 text-sm text-[var(--arc-error-text)]">
          Não foi possível carregar as disciplinas publicadas.
        </p>
      )}
      {catalogue && !isInitialLoading && (
        <div className="mt-5 grid gap-2">
          {catalogue.subjects.map((subject, index) => {
            const isSelected = selectedSubjectIds.includes(subject.id);
            return (
              <Reveal delay={index * 35} key={subject.id}>
                <button
                  aria-pressed={isSelected}
                  className={`flex min-h-20 items-center gap-4 rounded-lg border p-4 text-left transition-colors ${isSelected ? 'border-[#a8bcbd] bg-[var(--arc-accent)]/40' : 'border-transparent hover:border-[var(--border)] hover:bg-[var(--arc-surface-subtle)]/50'}`}
                  onClick={() => toggleSubject(subject.id)}
                >
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded border ${isSelected ? 'border-[var(--primary)] bg-[var(--primary)] text-white' : 'border-black/[0.2] bg-[var(--arc-surface)] text-transparent'}`}
                  >
                    <Check className="size-3.5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">
                      {subject.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-[var(--arc-text-muted)]">
                      {subject.description}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      )}
    </ArcCard>
  );
}
