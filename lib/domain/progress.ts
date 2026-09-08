import type { QuestionAttempt } from '@/lib/domain/questions';

/** The current result of a question is always its most recent attempt. */
export function getLatestAttemptsByQuestion(attempts: QuestionAttempt[]) {
  const latestByQuestionId = new Map<string, QuestionAttempt>();

  for (const attempt of attempts) {
    const existing = latestByQuestionId.get(attempt.questionId);
    if (
      !existing ||
      new Date(attempt.createdAt).getTime() >=
        new Date(existing.createdAt).getTime()
    ) {
      latestByQuestionId.set(attempt.questionId, attempt);
    }
  }

  return latestByQuestionId;
}

export function summarizeProgress(attempts: QuestionAttempt[]) {
  const latestAttempts = [...getLatestAttemptsByQuestion(attempts).values()];
  return {
    answered: latestAttempts.length,
    correct: latestAttempts.filter((attempt) => attempt.outcome === 'correct')
      .length,
    incorrect: latestAttempts.filter(
      (attempt) => attempt.outcome === 'incorrect',
    ).length,
  };
}

export function getAttemptNumber(
  attempt: QuestionAttempt,
  attempts: QuestionAttempt[],
) {
  return (
    attempts
      .filter((item) => item.questionId === attempt.questionId)
      .sort(
        (first, second) =>
          new Date(first.createdAt).getTime() -
          new Date(second.createdAt).getTime(),
      )
      .findIndex((item) => item.id === attempt.id) + 1
  );
}

/** Cumulative end-of-day snapshots: retries replace a result, never add a question. */
export function getProgressTimeline(attempts: QuestionAttempt[]) {
  const latest = new Map<string, QuestionAttempt>();
  const days = new Map<
    string,
    { date: string; answered: number; correct: number; accuracy: number }
  >();
  const sorted = attempts
    .filter((attempt) => Number.isFinite(Date.parse(attempt.createdAt)))
    .toSorted((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  for (const attempt of sorted) {
    const date = new Date(attempt.createdAt).toLocaleDateString('en-CA', {
      timeZone: 'America/Fortaleza',
    });
    latest.set(attempt.questionId, attempt);
    const correct = [...latest.values()].filter(
      (item) => item.outcome === 'correct',
    ).length;
    days.set(date, {
      date,
      answered: latest.size,
      correct,
      accuracy: Math.round((correct / latest.size) * 100),
    });
  }
  return [...days.values()].slice(-14);
}
