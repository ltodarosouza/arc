# Arc — MVP scope and product principles

## Purpose

Arc helps a university student find and practise questions for the exact subject they need, with as little setup as possible.

The MVP validates one question: **will students return to practise a specific university topic when they can find it in seconds?**

## Product principles

1. **Open → find → solve.** The shortest path to a question is the main experience.
2. **Subjects are universal.** A question belongs to a subject and its taxonomy, never directly to a degree, university, or semester.
3. **Multi-subject from day one.** The first content may be small, but the product must support multiple subjects. Cálculo II and Álgebra Linear are the initial candidates; neither is a special case in the model or interface.
4. **Quality over volume.** A smaller, reviewed and well-classified question set is more valuable than a large unreliable one.
5. **Progress should help, not distract.** Performance data exists to make the next study action easier, not to create pressure or gamification.
6. **No artificial intelligence by default.** AI will be considered only when it solves a verified learner or curation problem.

## Primary MVP journey

1. The student opens Arc.
2. They select the subjects they want on their home screen.
3. They open a subject, choose either all questions or a topic.
4. They optionally filter by topic, difficulty, or their prior result.
5. They answer a question or reveal the answer for a non-objective question.
6. Arc records the attempt and shows the answer and commented solution.
7. The student can continue, revisit errors, or see concise progress.

## Included in the MVP

- A reusable subject catalogue and subject selection on **Início**.
- Initial support for multiple subjects, beginning with a small, curated set. Cálculo II and Álgebra Linear are the leading candidates.
- **Explorar** with a subject overview, all-questions view, and topic/subtopic filtering.
- Filters for difficulty and attempt status: not attempted, attempted, correct, incorrect, and redo.
- Multiple-choice questions and a reveal-answer mode for questions that cannot yet be graded automatically.
- Correct/incorrect feedback, commented solution, optional hints, and a next-question action.
- Local persistence of subject selections and attempts while login is intentionally absent.
- **Progresso** with answered, correct, and incorrect counts; subject/topic performance; and a path to revisit errors.
- Responsive, accessible, minimal UI.

## Explicitly excluded from the MVP

- Sign-up, sign-in, account sync, and social features.
- University, degree, semester, or curriculum catalogue integration.
- Automated grading of mathematical expressions or discursive reasoning.
- AI tutor, AI question generation, or AI correction.
- Study plans, calendar, exam preparation plans, simulations, and gamification.
- Community publishing and automatic question submission.
- A production authoring/admin system beyond the content workflow needed to seed the first questions.

## Architectural guardrails

- `Subject` is independent from course and university.
- Questions reference reusable taxonomy nodes and may have more than one topic tag.
- User attempts are separate records; question content does not carry user-specific state.
- The first implementation may use local seeded data, but it must be shaped so a database/API can replace it without redesigning the product.
- No screen may assume that Cálculo II is the only subject.

## Success signals for this MVP

- A student reaches a relevant question in less than 15 seconds.
- A student can return to previously incorrect questions without searching manually.
- Test learners voluntarily return to practise another topic or subject.
- Content is sufficiently reliable that learners trust the answer and explanation.

## Decisions still open

- Which subjects launch first and the minimum reviewed question count for each.
- The first subject taxonomies and their depth.
- Legal source policy, review workflow, and question provenance fields.
- Final product name and identity.
- When to introduce authentication and how local progress will migrate to an account.
