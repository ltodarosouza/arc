# Arc — universal academic taxonomy

## Core hierarchy

```text
Subject
└── Unit
    └── Topic
        └── Subtopic
```

Examples:

```text
Cálculo II
└── Integrais
    └── Integral definida
        └── Teorema Fundamental do Cálculo

Álgebra Linear
└── Transformações lineares
    └── Núcleo e imagem
        └── Teorema posto-nulidade
```

The hierarchy describes reusable academic content. A university, degree, or semester may later point learners to a `Subject`, but must never create another copy of Cálculo II, Álgebra Linear, or their questions.

## Naming rules

- **Subject:** the commonly recognised academic discipline, such as `Cálculo II` or `Álgebra Linear`.
- **Unit:** a broad instructional block inside one subject, such as `Integrais`.
- **Topic:** a coherent skill or concept inside a unit, such as `Integral definida`.
- **Subtopic:** a precise drill-down target, such as `Teorema Fundamental do Cálculo`.
- Names are concise, singular where natural, and in the learner’s language.
- `sortOrder` controls the pedagogical navigation order. Alphabetical order is never assumed.

## Question classification

A question has one `subjectId` and one or more taxonomy tags from that same subject.

This supports realistic overlap. For example, a Cálculo II question can be tagged with both `Substituição` and `Integral definida`. One tag may be marked primary for its default route, but filters must return the question through every applicable tag.

Tags from another subject are not allowed. If a question genuinely spans disciplines in the future, it should be represented deliberately through a cross-subject content decision rather than silently breaking the catalogue boundary.

## What this model deliberately does not contain

- university;
- course/degree;
- semester/period;
- professor;
- learner progress;
- question difficulty or answer data.

Those are separate concepts. Keeping them out prevents taxonomy duplication and makes the question bank reusable.

## Implementation

`lib/domain/taxonomy.ts` contains the initial domain types and validation helpers. Seed data and later database records must follow these constraints.
