export type QuestionAggregate = {
  questionId: string;
  totalAttempts: number;
  correctAttempts: number;
  optionSelections: Record<string, number>;
  source: 'development_fixture' | 'live';
};

/**
 * Temporary display fixtures. They model the eventual aggregate endpoint but
 * must never be represented as real learner data.
 */
export const developmentQuestionAggregates: QuestionAggregate[] = [
  {
    questionId: 'question-calc2-substitution-01',
    totalAttempts: 184,
    correctAttempts: 139,
    optionSelections: {
      'option-a': 139,
      'option-b': 18,
      'option-c': 13,
      'option-d': 14,
    },
    source: 'development_fixture',
  },
  {
    questionId: 'question-calc2-geometric-series-01',
    totalAttempts: 146,
    correctAttempts: 78,
    optionSelections: {
      'option-geo-a': 22,
      'option-geo-b': 15,
      'option-geo-c': 78,
      'option-geo-d': 31,
    },
    source: 'development_fixture',
  },
  {
    questionId: 'question-linear-determinant-01',
    totalAttempts: 117,
    correctAttempts: 69,
    optionSelections: {
      'option-linear-a': 69,
      'option-linear-b': 25,
      'option-linear-c': 12,
      'option-linear-d': 11,
    },
    source: 'development_fixture',
  },
];

export const minimumAggregateThreshold = 20;

export function getQuestionAggregate(questionId: string) {
  return developmentQuestionAggregates.find(
    (aggregate) => aggregate.questionId === questionId,
  );
}
