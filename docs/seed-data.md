# Arc — development seed data

`lib/data/seed-catalogue.ts` is the temporary local catalogue that lets Arc behave like a multi-subject application before an API exists.

It currently includes small, original development fixtures for Cálculo II and Álgebra Linear. These examples exist only to develop and test the product flow. They are **not** a launch-ready question bank and must not be presented as a complete or curated syllabus.

## Rules

- Keep seed content separate from interface components.
- Every fixture must satisfy the taxonomy and question contracts.
- Use `original` source references for new development examples unless a documented compatible source is available.
- Demo attempts are preview-only; a new learner starts with no attempt history.
- Adding a subject must follow the same shape as the existing subjects. Do not add special UI branches for a subject.

The API/data-repository work will eventually replace these exports without changing consuming screens.
