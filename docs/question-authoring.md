# Arc — question authoring and review workflow

## Goal

Every question should be traceable, correctly classified, and useful after the learner submits an answer. The goal is not maximum volume; it is a reliable bank that students trust.

Start every new item from [content/question-template.md](../content/question-template.md) and apply the [difficulty rubric](difficulty-rubric.md).

## Required metadata

Each question must contain:

- subject and primary taxonomy tag;
- any legitimate secondary tags;
- question type: multiple choice;
- difficulty: easy, medium, or hard;
- statement, final answer, hints when useful, and commented solution;
- origin, source label, licence/reuse note, and author;
- lifecycle status, review owner, and dates.

The detailed legal provenance policy is maintained separately. A question with unclear reuse rights cannot move to `approved` or `published`.

## Lifecycle

```text
draft → technical_review → pedagogical_review → approved → published
                                           ↘ rejected
```

### Draft

The author has completed the template and self-checked the question.

### Technical review

Check the answer, mathematical notation, question type, taxonomy, duplicate risk, metadata, and source record.

### Pedagogical review

Check that the difficulty is appropriate, wording is clear, distractors are fair, hints do not spoil the answer, and the solution explains the reasoning.

### Approved and published

Only approved items can be published. Publication is a separate, deliberate action so a final content check can happen before the question reaches learners.

### Rejected

Use for unusable, duplicate, incorrect, or rights-unclear submissions. Record a concise reason; do not silently discard it.

## Multiple-choice rules

- Have one unambiguous correct alternative.
- Keep options parallel in wording, units, and precision.
- Avoid “all of the above”, trick wording, and clues created by option length.
- Write distractors based on realistic mistakes, not random nonsense.
- Do not expose the correct alternative in the statement, hint, or metadata visible to the learner.

## Mathematical notation

Arc stores content as Markdown with LaTex:

- inline: `$\\lim_{x \\to 0} \\sin(x)/x$`;
- display: `$$\\int_a^b f(x)\\,dx$$`.

Preview every question on a small screen as well as desktop. If an expression is ambiguous, long, or visually broken, fix the source before review.

## Minimum publication bar

A published question has a verified answer, a readable solution, correct tags, declared difficulty, compatible origin, and completed technical and pedagogical review. A question that is merely “available” is not enough.
