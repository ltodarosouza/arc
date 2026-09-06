'use client';

import { useCallback, useEffect, useState } from 'react';

import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import {
  loadSupabaseLearnerState,
  saveSupabaseSelectedSubjects,
  setSupabaseRedo,
} from '@/lib/data/supabase-learner-repository';
import type { LearnerState } from '@/lib/domain/learner';
import { isSupabaseConfigured } from '@/lib/supabase/client';

type LearnerData = {
  state: LearnerState | null;
  isLoading: boolean;
  isFallback: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  saveSelectedSubjectIds: (subjectIds: string[]) => Promise<boolean>;
  setRedo: (questionId: string, enabled: boolean) => Promise<boolean>;
};

export function useLearnerState(): LearnerData {
  const [state, setState] = useState<LearnerState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const localState = createLocalLearnerRepository().getState();
      const remoteState = isSupabaseConfigured()
        ? await loadSupabaseLearnerState()
        : null;
      const nextState =
        remoteState &&
        (remoteState.selectedSubjectIds.length ||
          !localState.selectedSubjectIds.length)
          ? remoteState
          : remoteState
            ? {
                ...remoteState,
                selectedSubjectIds: localState.selectedSubjectIds,
              }
            : localState;
      setState(nextState);
      setIsFallback(!isSupabaseConfigured());
      setError(null);
    } catch (failure) {
      setState(createLocalLearnerRepository().getState());
      setIsFallback(true);
      setError(
        failure instanceof Error
          ? failure
          : new Error('Não foi possível sincronizar seu progresso.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const saveSelectedSubjectIds = useCallback(async (subjectIds: string[]) => {
    const local = createLocalLearnerRepository();
    local.saveSelectedSubjectIds(subjectIds);
    setState((current) =>
      current ? { ...current, selectedSubjectIds: subjectIds } : current,
    );
    if (!isSupabaseConfigured()) return true;
    try {
      await saveSupabaseSelectedSubjects(subjectIds);
      setIsFallback(false);
      return true;
    } catch (failure) {
      setIsFallback(true);
      setError(
        failure instanceof Error
          ? failure
          : new Error(
              'Alteração salva neste dispositivo e aguardando sincronização.',
            ),
      );
      return false;
    }
  }, []);

  const setRedo = useCallback(async (questionId: string, enabled: boolean) => {
    const local = createLocalLearnerRepository();
    local.setRedo(questionId, enabled);
    setState((current) =>
      current
        ? {
            ...current,
            redoQuestionIds: enabled
              ? [...new Set([...current.redoQuestionIds, questionId])]
              : current.redoQuestionIds.filter((id) => id !== questionId),
          }
        : current,
    );
    if (!isSupabaseConfigured()) return true;
    try {
      await setSupabaseRedo(questionId, enabled);
      setIsFallback(false);
      return true;
    } catch (failure) {
      setIsFallback(true);
      setError(
        failure instanceof Error
          ? failure
          : new Error(
              'Alteração salva neste dispositivo e aguardando sincronização.',
            ),
      );
      return false;
    }
  }, []);

  return {
    state,
    isLoading,
    isFallback,
    error,
    refresh,
    saveSelectedSubjectIds,
    setRedo,
  };
}
