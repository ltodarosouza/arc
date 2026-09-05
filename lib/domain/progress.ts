import type { QuestionAttempt } from '@/lib/domain/questions';

/** The current result of a question is always its most recent attempt. */
export function getLatestAttemptsByQuestion(attempts: QuestionAttempt[]) {
  const latestByQuestionId = new Map<string, QuestionAttempt>();

  for (const attempt of attempts) {
    const existing = latestByQuestionId.get(attempt.questionId);
    if (!existing || new Date(attempt.createdAt).getTime() >= new Date(existing.createdAt).getTime()) {
      latestByQuestionId.set(attempt.questionId, attempt);
    }
  }

  return latestByQuestionId;
}

export function summarizeProgress(attempts: QuestionAttempt[]) {
  const latestAttempts = [...getLatestAttemptsByQuestion(attempts).values()];
  return {
    answered: latestAttempts.length,
    correct: latestAttempts.filter((attempt) => attempt.outcome === 'correct').length,
    incorrect: latestAttempts.filter((attempt) => attempt.outcome === 'incorrect').length,
  };
}
