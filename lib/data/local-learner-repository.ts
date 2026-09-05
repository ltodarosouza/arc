import {
  createEmptyLearnerState,
  LEARNER_STATE_VERSION,
  type LearnerRepository,
  type LearnerState,
} from '@/lib/domain/learner';
import type { QuestionAttempt } from '@/lib/domain/questions';

export const LEARNER_STORAGE_KEY = 'arc:learner-state';

type StorageLike = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>;

function uniqueIds(ids: string[]): string[] {
  return [...new Set(ids.filter((id) => typeof id === 'string' && id.length > 0))];
}

function isQuestionAttempt(value: unknown): value is QuestionAttempt {
  if (!value || typeof value !== 'object') return false;
  const attempt = value as Partial<QuestionAttempt>;
  return (
    typeof attempt.id === 'string' &&
    typeof attempt.questionId === 'string' &&
    typeof attempt.createdAt === 'string' &&
    (attempt.outcome === 'correct' || attempt.outcome === 'incorrect' || attempt.outcome === 'revealed') &&
    (attempt.gradingMethod === 'automatic' || attempt.gradingMethod === 'self_assessed' || attempt.gradingMethod === 'unscored') &&
    Boolean(attempt.answer)
  );
}

/**
 * Parses only the parts of local storage that match the current state schema.
 * A bad or old record becomes a clean state rather than breaking the study
 * flow. Future versions get an explicit migration instead of silent coercion.
 */
export function parseLearnerState(raw: string | null): LearnerState {
  if (!raw) return createEmptyLearnerState();

  try {
    const parsed = JSON.parse(raw) as Partial<LearnerState>;
    if (parsed.version !== LEARNER_STATE_VERSION) return createEmptyLearnerState();

    return {
      version: LEARNER_STATE_VERSION,
      selectedSubjectIds: uniqueIds(Array.isArray(parsed.selectedSubjectIds) ? parsed.selectedSubjectIds : []),
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts.filter(isQuestionAttempt) : [],
      redoQuestionIds: uniqueIds(Array.isArray(parsed.redoQuestionIds) ? parsed.redoQuestionIds : []),
    };
  } catch {
    return createEmptyLearnerState();
  }
}

export class LocalLearnerRepository implements LearnerRepository {
  constructor(
    private readonly storage: StorageLike | null,
    private readonly storageKey = LEARNER_STORAGE_KEY,
  ) {}

  getState(): LearnerState {
    if (!this.storage) return createEmptyLearnerState();
    return parseLearnerState(this.storage.getItem(this.storageKey));
  }

  saveSelectedSubjectIds(subjectIds: string[]): void {
    this.update((state) => ({ ...state, selectedSubjectIds: uniqueIds(subjectIds) }));
  }

  recordAttempt(attempt: QuestionAttempt): void {
    this.update((state) => {
      if (state.attempts.some((existingAttempt) => existingAttempt.id === attempt.id)) return state;
      return { ...state, attempts: [...state.attempts, attempt] };
    });
  }

  setRedo(questionId: string, enabled: boolean): void {
    this.update((state) => ({
      ...state,
      redoQuestionIds: enabled
        ? uniqueIds([...state.redoQuestionIds, questionId])
        : state.redoQuestionIds.filter((id) => id !== questionId),
    }));
  }

  clear(): void {
    this.storage?.removeItem(this.storageKey);
  }

  private update(updater: (state: LearnerState) => LearnerState): void {
    if (!this.storage) return;
    const nextState = updater(this.getState());
    this.storage.setItem(this.storageKey, JSON.stringify(nextState));
  }
}

/** Safe in server rendering and private-browsing contexts where storage may be unavailable. */
export function createLocalLearnerRepository(): LocalLearnerRepository {
  if (typeof window === 'undefined') return new LocalLearnerRepository(null);

  try {
    return new LocalLearnerRepository(window.localStorage);
  } catch {
    return new LocalLearnerRepository(null);
  }
}
