# Arc — question and attempt model

## Supported MVP question type

### Multiple choice

The learner chooses one alternative and Arc grades it automatically. The attempt preserves the chosen option, outcome, and time.

## Content structure

Every question contains:

- a reusable `subjectId` and one or more taxonomy tags;
- a difficulty: easy, medium, or hard;
- a statement in Markdown with optional LaTex;
- optional ordered hints;
- a final answer and commented solution steps;
- source reference;
- publication status and timestamps.

The full typed contract lives in `lib/domain/questions.ts`.

## Attempt semantics

An attempt is immutable. Retrying a question creates another attempt; it never overwrites history.

| Outcome     | Meaning                               | Counts toward accuracy? |
| ----------- | ------------------------------------- | ----------------------- |
| `correct`   | Correct multiple-choice alternative   | Yes                     |
| `incorrect` | Incorrect multiple-choice alternative | Yes                     |

The learner-facing status badge and filters use the latest outcome. A question counts once in progress; a reattempt updates its current status without deleting the historical attempts.

## Future compatibility

These records map directly to future content tables and a user-owned `question_attempts` table. New question types, symbolic grading, or AI feedback can be added later without changing the existing attempt history.
