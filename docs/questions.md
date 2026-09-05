# Arc — question and attempt model

## Supported MVP question types

### Multiple choice

The learner chooses one alternative and Arc grades it automatically. The attempt preserves the chosen option, outcome, and time.

### Reveal answer

The learner solves the question independently, then reveals the official answer and commented solution. They may self-assess as correct or incorrect; if they only reveal the answer, the event is kept as `revealed` and does not inflate accuracy.

This is the MVP path for discursive and mathematical questions. It intentionally does not pretend to understand every typed mathematical expression.

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

| Outcome | Meaning | Counts toward accuracy? |
| --- | --- | --- |
| `correct` | Automatically or self-assessed correct | Yes |
| `incorrect` | Automatically or self-assessed incorrect | Yes |
| `revealed` | Answer was shown without self-assessment | No |

The learner-facing status badge and filters use the latest scored outcome. A `revealed` event preserves history but does not replace the latest correct/incorrect status.

## Future compatibility

These records map directly to future content tables and a user-owned `question_attempts` table. New question types, symbolic grading, or AI feedback can be added later without changing the existing attempt history.
