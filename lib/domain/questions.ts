import type { QuestionTaxonomyTag } from './taxonomy';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionStatus = 'draft' | 'published' | 'archived';
export type QuestionKind = 'multiple_choice' | 'reveal_answer';
export type ContentFormat = 'markdown_latex';

/**
 * Plain Markdown with embedded LaTex is the initial portable content format.
 * Rendering is intentionally a separate concern from the question model.
 */
export type RichContent = {
  format: ContentFormat;
  value: string;
};

export type AnswerOption = {
  id: string;
  label: string;
  content: RichContent;
  sortOrder: number;
};

export type QuestionHint = {
  id: string;
  content: RichContent;
  sortOrder: number;
};

export type SolutionStep = {
  id: string;
  title?: string;
  content: RichContent;
  sortOrder: number;
};

export type CommentedSolution = {
  finalAnswer: RichContent;
  explanation?: RichContent;
  steps: SolutionStep[];
};

export type QuestionSourceReference = {
  kind: 'original' | 'open_licence' | 'authorised_contributor' | 'other';
  label: string;
  url?: string;
  licenceId?: string;
  licenceUrl?: string;
  rightsHolder?: string;
  permissionReference?: string;
  rightsStatus: 'unverified' | 'review_required' | 'approved' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: string;
};

type BaseQuestion = {
  id: string;
  subjectId: string;
  taxonomyTags: QuestionTaxonomyTag[];
  kind: QuestionKind;
  status: QuestionStatus;
  difficulty: Difficulty;
  statement: RichContent;
  hints: QuestionHint[];
  solution: CommentedSolution;
  source: QuestionSourceReference;
  createdAt: string;
  updatedAt: string;
};

export type MultipleChoiceQuestion = BaseQuestion & {
  kind: 'multiple_choice';
  options: AnswerOption[];
  correctOptionId: string;
};

export type RevealAnswerQuestion = BaseQuestion & {
  kind: 'reveal_answer';
};

export type Question = MultipleChoiceQuestion | RevealAnswerQuestion;

export type AttemptOutcome = 'correct' | 'incorrect' | 'revealed';
export type AttemptGradingMethod = 'automatic' | 'self_assessed' | 'unscored';

export type MultipleChoiceAttemptAnswer = {
  kind: 'selected_option';
  selectedOptionId: string;
};

export type RevealAnswerAttemptAnswer = {
  kind: 'revealed_answer';
  selfAssessment: 'correct' | 'incorrect' | 'not_assessed';
};

export type QuestionAttempt = {
  id: string;
  questionId: string;
  answer: MultipleChoiceAttemptAnswer | RevealAnswerAttemptAnswer;
  outcome: AttemptOutcome;
  gradingMethod: AttemptGradingMethod;
  createdAt: string;
};

export type QuestionValidationError = {
  field: string;
  message: string;
};

export function validateQuestion(
  question: Question,
): QuestionValidationError[] {
  const errors: QuestionValidationError[] = [];

  if (!question.statement.value.trim()) {
    errors.push({
      field: 'statement',
      message: 'A question requires a statement.',
    });
  }

  if (!question.solution.finalAnswer.value.trim()) {
    errors.push({
      field: 'solution.finalAnswer',
      message: 'A question requires a final answer.',
    });
  }

  if (question.kind === 'multiple_choice') {
    if (question.options.length < 2) {
      errors.push({
        field: 'options',
        message: 'A multiple-choice question requires at least two options.',
      });
    }
    if (
      !question.options.some((option) => option.id === question.correctOptionId)
    ) {
      errors.push({
        field: 'correctOptionId',
        message: 'The correct option must belong to the question.',
      });
    }
  }

  return errors;
}

/**
 * Converts a reveal-answer self-assessment into the same outcome vocabulary
 * used by automatic multiple-choice grading.
 */
export function getRevealAnswerOutcome(
  selfAssessment: RevealAnswerAttemptAnswer['selfAssessment'],
): AttemptOutcome {
  if (selfAssessment === 'correct') return 'correct';
  if (selfAssessment === 'incorrect') return 'incorrect';
  return 'revealed';
}
