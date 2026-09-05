import type { QuestionAttempt } from './questions';

export const LEARNER_STATE_VERSION = 1;

export type LearnerState = {
  version: typeof LEARNER_STATE_VERSION;
  selectedSubjectIds: string[];
  attempts: QuestionAttempt[];
  redoQuestionIds: string[];
};

export interface LearnerRepository {
  getState(): LearnerState;
  saveSelectedSubjectIds(subjectIds: string[]): void;
  recordAttempt(attempt: QuestionAttempt): void;
  setRedo(questionId: string, enabled: boolean): void;
  clear(): void;
}

export function createEmptyLearnerState(): LearnerState {
  return {
    version: LEARNER_STATE_VERSION,
    selectedSubjectIds: [],
    attempts: [],
    redoQuestionIds: [],
  };
}
