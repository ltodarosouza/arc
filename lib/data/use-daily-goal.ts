'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'arc-daily-goal';

function readStoredGoal(): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? Number(raw) : null;
    return parsed && Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * A daily question-count goal, kept on this device only (no account sync).
 * It exists to drive the home page's "meta diária" state, not as a synced
 * product feature yet — surface that limitation to learners if this grows.
 */
export function useDailyGoal() {
  const [dailyGoal, setDailyGoalState] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDailyGoalState(readStoredGoal());
    setIsLoading(false);
  }, []);

  const setDailyGoal = useCallback((value: number | null) => {
    setDailyGoalState(value);
    if (typeof window === 'undefined') return;
    try {
      if (value && value > 0)
        window.localStorage.setItem(STORAGE_KEY, String(Math.round(value)));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage can be unavailable (private browsing, quota); the goal still
      // works for the rest of this session via state.
    }
  }, []);

  return { dailyGoal, setDailyGoal, isLoading };
}
