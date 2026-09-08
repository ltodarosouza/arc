'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/components/auth-provider';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import {
  loadSupabaseLearnerState,
  saveSupabaseSelectedSubjects,
  setSupabaseRedo,
} from '@/lib/data/supabase-learner-repository';
import {
  createEmptyLearnerState,
  type LearnerState,
} from '@/lib/domain/learner';
import { isSupabaseConfigured } from '@/lib/supabase/client';

const learnerStateCache = new Map<string, LearnerState>();

export function useLearnerState() {
  const { session, ready } = useAuth();
  const owner = session?.user.id ?? null;
  const remote = isSupabaseConfigured();
  const cacheKey = remote ? owner : 'local';
  const [snapshot, setSnapshot] = useState<{
    owner: string | null;
    state: LearnerState;
  } | null>(() => {
    const cachedState = cacheKey ? learnerStateCache.get(cacheKey) : null;
    return cachedState ? { owner, state: cachedState } : null;
  });
  const [isLoading, setIsLoading] = useState(
    () => !cacheKey || !learnerStateCache.has(cacheKey),
  );
  const [error, setError] = useState<Error | null>(null);
  const generation = useRef(0);
  const refresh = useCallback(async () => {
    const request = ++generation.current;
    if (!ready) return;
    if (remote && !owner) {
      setSnapshot(null);
      setIsLoading(false);
      return;
    }
    if (!learnerStateCache.has(cacheKey ?? '')) setIsLoading(true);
    try {
      const state = remote
        ? await loadSupabaseLearnerState()
        : createLocalLearnerRepository().getState();
      if (request !== generation.current) return;
      if (cacheKey) learnerStateCache.set(cacheKey, state);
      setSnapshot({ owner, state });
      setError(null);
    } catch {
      if (request !== generation.current) return;
      setSnapshot(null);
      setError(
        new Error('Não foi possível carregar seu progresso. Tente novamente.'),
      );
    } finally {
      if (request === generation.current) setIsLoading(false);
    }
  }, [cacheKey, owner, ready, remote]);
  useEffect(() => {
    void refresh();
    return () => {
      generation.current++;
    };
  }, [refresh]);

  const saveSelectedSubjectIds = useCallback(
    async (ids: string[]) => {
      const request = generation.current;
      try {
        if (remote) {
          if (!owner) throw new Error('Entre para salvar.');
          await saveSupabaseSelectedSubjects(ids);
        } else createLocalLearnerRepository().saveSelectedSubjectIds(ids);
        if (request !== generation.current) return false;
        setSnapshot((current) => ({
          owner,
          state: {
            ...(current?.owner === owner
              ? current.state
              : createEmptyLearnerState()),
            selectedSubjectIds: ids,
          },
        }));
        if (cacheKey) {
          learnerStateCache.set(cacheKey, {
            ...(learnerStateCache.get(cacheKey) ?? createEmptyLearnerState()),
            selectedSubjectIds: ids,
          });
        }
        setError(null);
        return true;
      } catch {
        if (request === generation.current)
          setError(
            new Error(
              'Não foi possível salvar suas disciplinas. Tente novamente.',
            ),
          );
        return false;
      }
    },
    [cacheKey, owner, remote],
  );
  const setRedo = useCallback(
    async (questionId: string, enabled: boolean) => {
      const request = generation.current;
      try {
        if (remote) {
          if (!owner) throw new Error('Entre para salvar.');
          await setSupabaseRedo(questionId, enabled);
        } else createLocalLearnerRepository().setRedo(questionId, enabled);
        if (request !== generation.current) return false;
        setSnapshot((current) => {
          const state =
            current?.owner === owner
              ? current.state
              : createEmptyLearnerState();
          return {
            owner,
            state: {
              ...state,
              redoQuestionIds: enabled
                ? [...new Set([...state.redoQuestionIds, questionId])]
                : state.redoQuestionIds.filter((id) => id !== questionId),
            },
          };
        });
        if (cacheKey) {
          const state =
            learnerStateCache.get(cacheKey) ?? createEmptyLearnerState();
          learnerStateCache.set(cacheKey, {
            ...state,
            redoQuestionIds: enabled
              ? [...new Set([...state.redoQuestionIds, questionId])]
              : state.redoQuestionIds.filter((id) => id !== questionId),
          });
        }
        setError(null);
        return true;
      } catch {
        if (request === generation.current)
          setError(
            new Error('Não foi possível salvar a marcação. Tente novamente.'),
          );
        return false;
      }
    },
    [cacheKey, owner, remote],
  );
  return {
    state: snapshot?.owner === owner ? snapshot.state : null,
    isLoading,
    isFallback: !remote,
    error,
    refresh,
    saveSelectedSubjectIds,
    setRedo,
  };
}
