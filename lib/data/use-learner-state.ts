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
const learnerStateListeners = new Map<
  string,
  Set<(state: LearnerState) => void>
>();

function publishLearnerState(cacheKey: string, state: LearnerState) {
  learnerStateCache.set(cacheKey, state);
  learnerStateListeners.get(cacheKey)?.forEach((listener) => listener(state));
}

function subscribeToLearnerState(
  cacheKey: string,
  listener: (state: LearnerState) => void,
) {
  const listeners = learnerStateListeners.get(cacheKey) ?? new Set();
  listeners.add(listener);
  learnerStateListeners.set(cacheKey, listeners);

  const cachedState = learnerStateCache.get(cacheKey);
  if (cachedState) listener(cachedState);

  return () => {
    listeners.delete(listener);
    if (!listeners.size) learnerStateListeners.delete(cacheKey);
  };
}

// Saves are optimistic (cache + snapshot update before the request settles),
// but `refresh()` fires on every mount of every `useLearnerState()` instance —
// e.g. navigating from Disciplinas to Início mounts a brand-new instance whose
// remote fetch can land before a still-in-flight save does, overwriting the
// optimistic update with stale data. Keying pending writes by cacheKey (not a
// per-instance ref) lets any instance's `refresh()` wait for a write started
// by a different instance before reading the server.
const pendingWriteByKey = new Map<string, Promise<unknown>>();

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
  const selectedSubjectsVersion = useRef(0);
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
      // Let any write already in flight for this key (started by this
      // instance or another one) land first, so the fetch below can't read a
      // pre-write server value and clobber the optimistic update with it.
      await pendingWriteByKey.get(cacheKey ?? '');
      if (request !== generation.current) return;
      const state = remote
        ? await loadSupabaseLearnerState()
        : createLocalLearnerRepository().getState();
      if (request !== generation.current) return;
      if (cacheKey) publishLearnerState(cacheKey, state);
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
    if (!cacheKey) return;
    return subscribeToLearnerState(cacheKey, (state) => {
      setSnapshot({ owner, state });
      setIsLoading(false);
    });
  }, [cacheKey, owner]);
  useEffect(() => {
    const generationRef = generation;
    let cancelled = false;

    // Defer the refresh so state updates happen outside the effect body. The
    // cancellation guard also prevents a queued refresh after unmount.
    void Promise.resolve().then(() => {
      if (!cancelled) return refresh();
    });

    return () => {
      cancelled = true;
      generationRef.current++;
    };
  }, [refresh]);

  const saveSelectedSubjectIds = useCallback(
    async (ids: string[]) => {
      const version = ++selectedSubjectsVersion.current;
      const selectedSubjectIds = [...new Set(ids)];

      // Update the UI and cache before the request completes. The writes below
      // are serialized because each request replaces the complete selection.
      // Without the queue, a slower earlier request can undo a faster click.
      if (cacheKey) {
        publishLearnerState(cacheKey, {
          ...(learnerStateCache.get(cacheKey) ?? createEmptyLearnerState()),
          selectedSubjectIds,
        });
      }

      const key = cacheKey ?? '';
      const previousWrite = pendingWriteByKey.get(key) ?? Promise.resolve();
      const write = previousWrite.then(async () => {
        try {
          if (remote) {
            if (!owner) throw new Error('Entre para salvar.');
            await saveSupabaseSelectedSubjects(selectedSubjectIds);
          } else
            createLocalLearnerRepository().saveSelectedSubjectIds(
              selectedSubjectIds,
            );
          return true;
        } catch {
          return false;
        }
      });
      pendingWriteByKey.set(key, write);
      const saved = await write;

      // A failed older write must not overwrite feedback for a newer choice.
      if (version === selectedSubjectsVersion.current) {
        setError(
          saved
            ? null
            : new Error(
                'Não foi possível salvar suas disciplinas. Tente novamente.',
              ),
        );
      }
      return saved;
    },
    [cacheKey, owner, remote],
  );
  const setRedo = useCallback(
    async (questionId: string, enabled: boolean) => {
      const request = generation.current;
      const key = cacheKey ?? '';
      const previousWrite = pendingWriteByKey.get(key) ?? Promise.resolve();
      // Settles instead of rejecting: a rejected entry would make an unrelated
      // refresh()'s `await pendingWriteByKey.get(key)` throw too.
      const write = previousWrite.then(async () => {
        try {
          if (remote) {
            if (!owner) throw new Error('Entre para salvar.');
            await setSupabaseRedo(questionId, enabled);
          } else createLocalLearnerRepository().setRedo(questionId, enabled);
          return true;
        } catch {
          return false;
        }
      });
      pendingWriteByKey.set(key, write);
      try {
        const saved = await write;
        if (!saved) throw new Error('Entre para salvar.');
        if (request !== generation.current) return false;
        if (cacheKey) {
          const state =
            learnerStateCache.get(cacheKey) ?? createEmptyLearnerState();
          publishLearnerState(cacheKey, {
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
