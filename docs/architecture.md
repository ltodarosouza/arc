# Arc — initial architecture decision record

## Decision

Arc starts as a multi-subject web application using the existing Vinext/React project. The first release uses curated local content and device-local learner data. It deliberately does not require an account or a backend.

This is a validation decision, not a permanent storage decision: the product can prove that students find and solve the right questions before adding the cost and friction of authentication, sync, and server infrastructure.

## Application boundaries

### Content catalogue

The catalogue is shared, versioned product content:

- subjects;
- taxonomy nodes: unit, topic, subtopic;
- questions, options, answers, solutions, hints, difficulty, and source metadata.

Content never contains learner-specific fields. A question is reusable by every learner and may be tagged with more than one taxonomy node.

### Learner state

The learner owns these device-local records:

- selected subject IDs;
- immutable question attempts;
- questions marked for redo;
- local data-schema version.

The initial persistence adapter will use browser storage behind a small interface. UI code must not access browser storage directly.

### Ephemeral interface state

This state does not need persistence:

- active subject, topic, and filters;
- current question/session position;
- an answer selected but not submitted;
- open hint or solution panels.

## Attempt and status model

Each completed interaction creates a `QuestionAttempt` record. It references a question but does not mutate it.

```ts
type AttemptOutcome = 'correct' | 'incorrect' | 'self_assessed_correct' | 'self_assessed_incorrect';

type QuestionAttempt = {
  id: string;
  questionId: string;
  outcome: AttemptOutcome;
  selectedOptionId?: string;
  createdAt: string;
};
```

The question list and question header derive a learner-facing status from attempt history:

- **Not attempted:** no completed attempt exists.
- **Attempted:** at least one completed attempt exists.
- **Correct:** the latest completed attempt is correct or self-assessed correct.
- **Incorrect:** the latest completed attempt is incorrect or self-assessed incorrect.
- **Redo:** the learner explicitly marked the question for another pass.

Using the latest completed attempt means that a learner who fixes a previous error is shown as currently correct. A later review feature may additionally expose “ever incorrect” as a separate historical filter; it must not overload the meaning of the current status.

## Required question-state UI

When a learner opens a question they have already completed, the top context bar shows a small, non-intrusive status chip:

- `Acertou` uses a muted green treatment;
- `Errou` uses a muted warm/red treatment;
- `Refazer` uses a neutral/amber treatment;
- a never-attempted question shows no result chip.

The status remains secondary to the statement and never reveals an answer before the learner chooses to review it. The same derived state powers the filters in the question bank, so the badge and results list cannot disagree.

## Initial interfaces

The UI should depend on three focused interfaces:

```ts
interface QuestionCatalogue {
  listSubjects(): Subject[];
  listQuestions(query: QuestionQuery): Question[];
  getQuestion(questionId: string): Question | undefined;
}

interface LearnerRepository {
  getSelectedSubjectIds(): string[];
  saveSelectedSubjectIds(subjectIds: string[]): void;
  listAttempts(): QuestionAttempt[];
  recordAttempt(attempt: QuestionAttempt): void;
  getRedoQuestionIds(): string[];
  setRedo(questionId: string, enabled: boolean): void;
}

interface ProgressService {
  getQuestionStatus(questionId: string): QuestionStatus;
  getSubjectProgress(subjectId: string): SubjectProgress;
}
```

The local implementations satisfy these interfaces now. A future server implementation should preserve the contracts rather than force a UI rewrite.

## Future migration path

When authentication becomes valuable, the same domain shapes move to persistent storage:

- `subjects`, `taxonomy_nodes`, `questions`, `answer_options`, `solutions`, and `question_tags` remain shared content tables;
- `users`, `user_subjects`, `question_attempts`, and `redo_questions` become user-owned tables;
- an authenticated repository replaces the local repository, with an explicit local-progress import/merge step.

University, course, and curriculum data can later connect to `subjects` through mapping tables. They must not duplicate questions or subject taxonomies.

## Consequences

- The MVP stays quick to access and inexpensive to operate.
- Device-local progress does not sync between browsers or devices yet; the interface must not imply otherwise.
- All content and progress code is designed around multiple subjects from the first implementation.
- Login, database selection, and syncing are deferred until user behaviour validates their cost.
