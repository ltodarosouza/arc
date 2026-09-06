import { describe, expect, it } from 'vitest';

import {
  getLatestAttemptsByQuestion,
  summarizeProgress,
} from '@/lib/domain/progress';
import type { QuestionAttempt } from '@/lib/domain/questions';

const attempt = (
  id: string,
  questionId: string,
  outcome: QuestionAttempt['outcome'],
  createdAt: string,
): QuestionAttempt => ({
  id,
  questionId,
  outcome,
  createdAt,
  gradingMethod: 'automatic',
  answer: { kind: 'selected_option', selectedOptionId: 'option-a' },
});

describe('progress summary', () => {
  it('returns empty counts when no questions were answered', () => {
    expect(summarizeProgress([])).toEqual({
      answered: 0,
      correct: 0,
      incorrect: 0,
    });
  });

  it('counts each question only by its most recent attempt', () => {
    const attempts = [
      attempt('one', 'question-a', 'incorrect', '2026-01-01T10:00:00.000Z'),
      attempt('two', 'question-a', 'correct', '2026-01-01T11:00:00.000Z'),
      attempt('three', 'question-b', 'incorrect', '2026-01-01T12:00:00.000Z'),
    ];
    expect(summarizeProgress(attempts)).toEqual({
      answered: 2,
      correct: 1,
      incorrect: 1,
    });
    expect(getLatestAttemptsByQuestion(attempts).get('question-a')?.id).toBe(
      'two',
    );
  });
});
