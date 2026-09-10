'use client';

import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

import { ArcCard } from '@/components/arc-ui';
import { Reveal } from '@/components/reveal';
import { normalizeSelectedSubjectIds } from '@/lib/data/catalogue-repository';
import { useCatalogueSummary } from '@/lib/data/use-catalogue-summary';
import { useLearnerState } from '@/lib/data/use-learner-state';

export function SubjectsManager() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const selectedSubjectIdsRef = useRef<string[]>([]);
  const { catalogue, error, isLoading } = useCatalogueSummary();
  const {
    state: learnerState,
    saveSelectedSubjectIds,
    isLoading: learnerLoading,
    error: learnerError,
  } = useLearnerState();
  const isInitialLoading = isLoading || learnerLoading || !learnerState;
  useEffect(() => {
    if (!catalogue) return;
    const savedIds = learnerState?.selectedSubjectIds ?? [];
    const subjectIds = normalizeSelectedSubjectIds(savedIds, catalogue);
    selectedSubjectIdsRef.current = subjectIds;
    setSelectedSubjectIds(subjectIds);
    if (subjectIds.join(',') !== savedIds.join(','))
      void saveSelectedSubjectIds(subjectIds);
  }, [catalogue, learnerState, saveSelectedSubjectIds]);
  const toggleSubject = (subjectId: string) => {
    const currentSubjectIds = selectedSubjectIdsRef.current;
    const nextSubjectIds = currentSubjectIds.includes(subjectId)
      ? currentSubjectIds.filter((id) => id !== subjectId)
      : [...currentSubjectIds, subjectId];
    selectedSubjectIdsRef.current = nextSubjectIds;
    setSelectedSubjectIds(nextSubjectIds);
    void saveSelectedSubjectIds(nextSubjectIds);
  };
  return (
    <ArcCard className="arc-selection-card mt-8 p-0">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
        <div>
          <p className="arc-caption">Personalize seu percurso</p>
          <h2 className="arc-section-title mt-1">Escolha suas frentes</h2>
        </div>
        <p className="arc-caption">
          {isInitialLoading
            ? 'Carregando sua seleção'
            : `${selectedSubjectIds.length} selecionada${selectedSubjectIds.length === 1 ? '' : 's'}`}
        </p>
      </div>
      {isInitialLoading && (
        <div aria-busy="true" className="mt-5 grid gap-2">
          {[0, 1, 2].map((item) => (
            <div
              aria-hidden="true"
              className="h-20 animate-pulse rounded-lg bg-surface-subtle"
              key={item}
            />
          ))}
        </div>
      )}
      {error && (
        <p className="mt-5 text-sm text-error">
          Não foi possível carregar as disciplinas publicadas.
        </p>
      )}
      {learnerError && (
        <div className="mt-5 text-sm text-error" role="alert">
          <p>{learnerError.message}</p>
          <button
            className="mt-2 underline underline-offset-4"
            onClick={() =>
              void saveSelectedSubjectIds(selectedSubjectIdsRef.current)
            }
            type="button"
          >
            Tentar salvar novamente
          </button>
        </div>
      )}
      {catalogue && !isInitialLoading && (
        <div className="mt-5 grid gap-2">
          {catalogue.subjects.map((subject, index) => {
            const isSelected = selectedSubjectIds.includes(subject.id);
            return (
              <Reveal delay={index * 45} key={subject.id} variant="slide">
                <button
                  aria-pressed={isSelected}
                  className={`arc-selection-item flex min-h-24 w-full items-center gap-4 border p-5 text-left ${isSelected ? 'border-accent-strong bg-accent/55' : 'border-border bg-surface hover:border-accent-strong hover:bg-surface-subtle/55'}`}
                  onClick={() => toggleSubject(subject.id)}
                  type="button"
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full border ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-surface text-transparent'}`}
                  >
                    <Check className="size-3.5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">
                      {subject.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
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
