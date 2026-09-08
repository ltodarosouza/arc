import { describe, expect, it } from 'vitest';

import {
  getLatestAttemptsByQuestion,
  summarizeProgress,
  getProgressTimeline,
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
  it('keeps cumulative daily results unique when retrying on another day', () => {
    const points = getProgressTimeline([
      attempt('three', 'a', 'correct', '2026-01-02T12:00:00Z'),
      attempt('one', 'a', 'incorrect', '2026-01-01T12:00:00Z'),
      attempt('two', 'b', 'correct', '2026-01-01T13:00:00Z'),
    ]);
    expect(points).toEqual([
      { date: '2026-01-01', answered: 2, correct: 1, accuracy: 50 },
      { date: '2026-01-02', answered: 2, correct: 2, accuracy: 100 },
    ]);
  });
  it('uses the study timezone and does not invent empty days', () => {
    expect(getProgressTimeline([])).toEqual([]);
    expect(
      getProgressTimeline([
        attempt('one', 'a', 'correct', '2026-01-02T01:00:00Z'),
      ])[0].date,
    ).toBe('2026-01-01');
  });
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
