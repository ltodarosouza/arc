import type { Question, QuestionAttempt } from '@/lib/domain/questions';
import type { Subject, TaxonomyNode } from '@/lib/domain/taxonomy';

const originalSource = {
  kind: 'original' as const,
  label: 'Arc development fixture',
};

export const seedSubjects: Subject[] = [
  {
    id: 'subject-calculus-2',
    slug: 'calculo-2',
    name: 'Cálculo II',
    description: 'Integrais, sequências e séries.',
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: 'subject-linear-algebra',
    slug: 'algebra-linear',
    name: 'Álgebra Linear',
    description: 'Vetores, matrizes e transformações lineares.',
    sortOrder: 2,
    isPublished: true,
  },
];

export const seedTaxonomyNodes: TaxonomyNode[] = [
  {
    id: 'calc2-unit-integrals', subjectId: 'subject-calculus-2', kind: 'unit', name: 'Integrais', slug: 'integrais', parentId: null, sortOrder: 1, isPublished: true,
  },
  {
    id: 'calc2-topic-substitution', subjectId: 'subject-calculus-2', kind: 'topic', name: 'Substituição', slug: 'substituicao', parentId: 'calc2-unit-integrals', sortOrder: 1, isPublished: true,
  },
  {
    id: 'calc2-subtopic-u-substitution', subjectId: 'subject-calculus-2', kind: 'subtopic', name: 'Mudança de variável', slug: 'mudanca-de-variavel', parentId: 'calc2-topic-substitution', sortOrder: 1, isPublished: true,
  },
  {
    id: 'calc2-topic-definite-integral', subjectId: 'subject-calculus-2', kind: 'topic', name: 'Integral definida', slug: 'integral-definida', parentId: 'calc2-unit-integrals', sortOrder: 2, isPublished: true,
  },
  {
    id: 'calc2-unit-series', subjectId: 'subject-calculus-2', kind: 'unit', name: 'Sequências e séries', slug: 'sequencias-e-series', parentId: null, sortOrder: 2, isPublished: true,
  },
  {
    id: 'calc2-topic-geometric-series', subjectId: 'subject-calculus-2', kind: 'topic', name: 'Séries geométricas', slug: 'series-geometricas', parentId: 'calc2-unit-series', sortOrder: 1, isPublished: true,
  },
  {
    id: 'linear-unit-matrices', subjectId: 'subject-linear-algebra', kind: 'unit', name: 'Matrizes e sistemas', slug: 'matrizes-e-sistemas', parentId: null, sortOrder: 1, isPublished: true,
  },
  {
    id: 'linear-topic-determinants', subjectId: 'subject-linear-algebra', kind: 'topic', name: 'Determinantes', slug: 'determinantes', parentId: 'linear-unit-matrices', sortOrder: 1, isPublished: true,
  },
  {
    id: 'linear-unit-transformations', subjectId: 'subject-linear-algebra', kind: 'unit', name: 'Transformações lineares', slug: 'transformacoes-lineares', parentId: null, sortOrder: 2, isPublished: true,
  },
  {
    id: 'linear-topic-eigenvalues', subjectId: 'subject-linear-algebra', kind: 'topic', name: 'Autovalores e autovetores', slug: 'autovalores-e-autovetores', parentId: 'linear-unit-transformations', sortOrder: 1, isPublished: true,
  },
];

export const seedQuestions: Question[] = [
  {
    id: 'question-calc2-substitution-01',
    subjectId: 'subject-calculus-2',
    taxonomyTags: [
      { questionId: 'question-calc2-substitution-01', taxonomyNodeId: 'calc2-topic-substitution', isPrimary: true },
      { questionId: 'question-calc2-substitution-01', taxonomyNodeId: 'calc2-subtopic-u-substitution', isPrimary: false },
    ],
    kind: 'multiple_choice', status: 'published', difficulty: 'easy',
    statement: { format: 'markdown_latex', value: 'Calcule $\\int 2x\\cos(x^2)\\,dx$.' },
    options: [
      { id: 'option-a', label: 'A', content: { format: 'markdown_latex', value: '$\\sen(x^2) + C$' }, sortOrder: 1 },
      { id: 'option-b', label: 'B', content: { format: 'markdown_latex', value: '$2\\sen(x) + C$' }, sortOrder: 2 },
      { id: 'option-c', label: 'C', content: { format: 'markdown_latex', value: '$x^2\\sen(x^2) + C$' }, sortOrder: 3 },
      { id: 'option-d', label: 'D', content: { format: 'markdown_latex', value: '$-2\\cos(x^2) + C$' }, sortOrder: 4 },
    ],
    correctOptionId: 'option-a',
    hints: [{ id: 'hint-calc2-01', content: { format: 'markdown_latex', value: 'Observe que a derivada de $x^2$ aparece no integrando.' }, sortOrder: 1 }],
    solution: {
      finalAnswer: { format: 'markdown_latex', value: '$\\sen(x^2) + C$' },
      explanation: { format: 'markdown_latex', value: 'Use a substituição $u = x^2$.' },
      steps: [
        { id: 'step-calc2-01', content: { format: 'markdown_latex', value: 'Com $u=x^2$, temos $du=2x\\,dx$.' }, sortOrder: 1 },
        { id: 'step-calc2-02', content: { format: 'markdown_latex', value: 'Logo, $\\int 2x\\cos(x^2)\\,dx = \\int\\cos(u)\\,du = \\sen(u)+C$.' }, sortOrder: 2 },
      ],
    },
    source: originalSource, createdAt: '2026-09-05T00:00:00.000Z', updatedAt: '2026-09-05T00:00:00.000Z',
  },
  {
    id: 'question-calc2-geometric-series-01',
    subjectId: 'subject-calculus-2',
    taxonomyTags: [{ questionId: 'question-calc2-geometric-series-01', taxonomyNodeId: 'calc2-topic-geometric-series', isPrimary: true }],
    kind: 'reveal_answer', status: 'published', difficulty: 'medium',
    statement: { format: 'markdown_latex', value: 'Determine se a série $\\sum_{n=0}^{\\infty} (1/3)^n$ converge e, caso convirja, calcule sua soma.' },
    hints: [{ id: 'hint-calc2-02', content: { format: 'markdown_latex', value: 'Compare com a fórmula de uma série geométrica de razão $r$.' }, sortOrder: 1 }],
    solution: {
      finalAnswer: { format: 'markdown_latex', value: 'A série converge e sua soma é $3/2$.' },
      steps: [{ id: 'step-calc2-03', content: { format: 'markdown_latex', value: 'A razão é $r=1/3$, portanto $|r|<1$ e $\\sum_{n=0}^{\\infty}r^n=1/(1-r)=3/2$.' }, sortOrder: 1 }],
    },
    source: originalSource, createdAt: '2026-09-05T00:00:00.000Z', updatedAt: '2026-09-05T00:00:00.000Z',
  },
  {
    id: 'question-linear-determinant-01',
    subjectId: 'subject-linear-algebra',
    taxonomyTags: [{ questionId: 'question-linear-determinant-01', taxonomyNodeId: 'linear-topic-determinants', isPrimary: true }],
    kind: 'multiple_choice', status: 'published', difficulty: 'easy',
    statement: { format: 'markdown_latex', value: 'Qual é o determinante da matriz $\\begin{pmatrix}2 & 1\\\\ 3 & 4\\end{pmatrix}$?' },
    options: [
      { id: 'option-linear-a', label: 'A', content: { format: 'markdown_latex', value: '$5$' }, sortOrder: 1 },
      { id: 'option-linear-b', label: 'B', content: { format: 'markdown_latex', value: '$8$' }, sortOrder: 2 },
      { id: 'option-linear-c', label: 'C', content: { format: 'markdown_latex', value: '$11$' }, sortOrder: 3 },
      { id: 'option-linear-d', label: 'D', content: { format: 'markdown_latex', value: '$-5$' }, sortOrder: 4 },
    ],
    correctOptionId: 'option-a', hints: [],
    solution: { finalAnswer: { format: 'markdown_latex', value: '$5$' }, steps: [{ id: 'step-linear-01', content: { format: 'markdown_latex', value: '$2\\cdot4 - 1\\cdot3 = 5$.' }, sortOrder: 1 }] },
    source: originalSource, createdAt: '2026-09-05T00:00:00.000Z', updatedAt: '2026-09-05T00:00:00.000Z',
  },
];

/** Preview-only data for screens that need existing learner history. Never use it as a new learner’s initial state. */
export const seedDemoAttempts: QuestionAttempt[] = [
  {
    id: 'attempt-demo-01', questionId: 'question-calc2-substitution-01',
    answer: { kind: 'selected_option', selectedOptionId: 'option-a' }, outcome: 'correct', gradingMethod: 'automatic', createdAt: '2026-09-04T17:45:00.000Z',
  },
  {
    id: 'attempt-demo-02', questionId: 'question-linear-determinant-01',
    answer: { kind: 'selected_option', selectedOptionId: 'option-b' }, outcome: 'incorrect', gradingMethod: 'automatic', createdAt: '2026-09-04T18:10:00.000Z',
  },
];
