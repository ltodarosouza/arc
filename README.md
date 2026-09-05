# Arc

Arc is a minimal platform for university students to find and practise questions for the exact topic they need.

Its core promise is simple: **open → find → solve**.

Instead of making a learner create a plan or configure a session before studying, Arc lets them choose a subject, narrow to a topic, and start a question immediately.

## Current direction

Arc is a multi-subject product. The first content candidates are Cálculo II and Álgebra Linear, but neither is treated as a special case in the interface or the data model.

A question belongs to a reusable subject taxonomy, not directly to a university, degree, or semester. In the future, universities and courses may help learners discover relevant subjects without duplicating the question bank.

The initial experience includes three areas:

- **Início:** choose the subjects currently being studied and quickly resume practice.
- **Explorar:** open all questions in a subject or filter by topic, difficulty, and prior result.
- **Progresso:** see answered, correct, incorrect, and redo questions; then return directly to review.

The MVP intentionally begins without sign-in. Subject selections and attempts will be saved only on the current device until account sync becomes justified.

## MVP scope

Included in the MVP:

- a reusable, multi-subject catalogue;
- topic/subtopic navigation and question filters;
- multiple-choice and reveal-answer questions;
- correct/incorrect feedback, commented solutions, and hints;
- attempt history, status filters, and lightweight progress;
- responsive and accessible user experience.

Not included yet:

- login and cross-device sync;
- university, degree, and curriculum catalogues;
- automatic correction of discursive or mathematical answers;
- AI tutoring, question generation, social features, or gamification.

Read the complete product boundary in [docs/mvp-scope.md](docs/mvp-scope.md) and the initial technical decisions in [docs/architecture.md](docs/architecture.md).

## Run locally

### Requirements

- Node.js 22.13 or newer
- npm

### Install and start

```bash
npm install
npm run dev
```

Then open the local address printed by the development server.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build. |
| `npm run lint` | Run the code-quality checks. |
| `npm run format` | Format supported source files. |

## Project structure

```text
app/          Application routes and global styles
components/   Reusable interface components
docs/         Product and architecture decisions
public/       Static assets
```

As the product is implemented, content data, learner-state adapters, and domain services will be added as separate layers rather than embedded in screens.

## Working conventions

- Keep the student’s fastest path to a question as the default experience.
- Do not add a feature just because it is technically interesting; it must solve a real study or content-quality problem.
- Preserve the universal subject model. Do not create course- or university-specific copies of questions.
- Keep content source, licence, taxonomy, difficulty, and solution quality explicit.
- Make each change small, verifiable, and tied to one GitHub issue.
- Use a descriptive commit and close the completed issue after its work is merged to `main`.

## Roadmap

The repository backlog is organised into five GitHub milestones:

1. Foundations
2. Content and core UX
3. Explore and practice
4. Progress and review
5. Quality and release

See the [open issues](https://github.com/ltodarosouza/arc/issues) for the implementation plan.
