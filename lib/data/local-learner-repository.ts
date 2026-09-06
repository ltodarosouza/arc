import {
  createEmptyLearnerState,
  LEARNER_STATE_VERSION,
  type LearnerRepository,
  type LearnerState,
} from '@/lib/domain/learner';
import type { QuestionAttempt } from '@/lib/domain/questions';

export const LEARNER_STORAGE_KEY = 'arc:learner-state';

type StorageLike = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>;

type ParsedLearnerState = {
  state: LearnerState;
  shouldPersist: boolean;
  backupRaw?: string;
};

function uniqueIds(ids: string[]): string[] {
  return [
    ...new Set(ids.filter((id) => typeof id === 'string' && id.length > 0)),
  ];
}

function isQuestionAttempt(value: unknown): value is QuestionAttempt {
  if (!value || typeof value !== 'object') return false;
  const attempt = value as Partial<QuestionAttempt>;
  return (
    typeof attempt.id === 'string' &&
    typeof attempt.questionId === 'string' &&
    typeof attempt.createdAt === 'string' &&
    (attempt.outcome === 'correct' ||
      attempt.outcome === 'incorrect' ||
      attempt.outcome === 'revealed') &&
    (attempt.gradingMethod === 'automatic' ||
      attempt.gradingMethod === 'self_assessed' ||
      attempt.gradingMethod === 'unscored') &&
    Boolean(attempt.answer)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normaliseState(value: Record<string, unknown>): LearnerState {
  return {
    version: LEARNER_STATE_VERSION,
    selectedSubjectIds: uniqueIds(
      Array.isArray(value.selectedSubjectIds) ? value.selectedSubjectIds : [],
    ),
    attempts: Array.isArray(value.attempts)
      ? value.attempts.filter(isQuestionAttempt)
      : [],
    redoQuestionIds: uniqueIds(
      Array.isArray(value.redoQuestionIds) ? value.redoQuestionIds : [],
    ),
  };
}

function migrateVersionZero(value: Record<string, unknown>): LearnerState {
  return normaliseState({
    selectedSubjectIds: value.selectedSubjectIds ?? value.selectedSubjects,
    attempts: value.attempts,
    redoQuestionIds: value.redoQuestionIds ?? value.redoQuestions,
  });
}

/**
 * Parses only the parts of local storage that match the current state schema.
 * A bad or old record becomes a clean state rather than breaking the study
 * flow. Future versions get an explicit migration instead of silent coercion.
 */
function parseStoredLearnerState(raw: string | null): ParsedLearnerState {
  if (!raw) return { state: createEmptyLearnerState(), shouldPersist: false };

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return {
        state: createEmptyLearnerState(),
        shouldPersist: true,
        backupRaw: raw,
      };
    }

    if (parsed.version === LEARNER_STATE_VERSION) {
      return { state: normaliseState(parsed), shouldPersist: false };
    }

    if (parsed.version === 0) {
      return { state: migrateVersionZero(parsed), shouldPersist: true };
    }

    return {
      state: createEmptyLearnerState(),
      shouldPersist: true,
      backupRaw: raw,
    };
  } catch {
    return {
      state: createEmptyLearnerState(),
      shouldPersist: true,
      backupRaw: raw,
    };
  }
}

export function parseLearnerState(raw: string | null): LearnerState {
  return parseStoredLearnerState(raw).state;
}

export class LocalLearnerRepository implements LearnerRepository {
  constructor(
    private readonly storage: StorageLike | null,
    private readonly storageKey = LEARNER_STORAGE_KEY,
  ) {}

  getState(): LearnerState {
    if (!this.storage) return createEmptyLearnerState();
    const parsed = parseStoredLearnerState(
      this.storage.getItem(this.storageKey),
    );

    if (parsed.shouldPersist) {
      if (parsed.backupRaw) {
        this.storage.setItem(
          `${this.storageKey}:backup:${Date.now()}`,
          parsed.backupRaw,
        );
      }
      this.storage.setItem(this.storageKey, JSON.stringify(parsed.state));
    }

    return parsed.state;
  }

  saveSelectedSubjectIds(subjectIds: string[]): void {
    this.update((state) => ({
      ...state,
      selectedSubjectIds: uniqueIds(subjectIds),
    }));
  }

  recordAttempt(attempt: QuestionAttempt): void {
    this.update((state) => {
      if (
        state.attempts.some(
          (existingAttempt) => existingAttempt.id === attempt.id,
        )
      )
        return state;
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
