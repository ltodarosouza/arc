import { describe, expect, it } from 'vitest';

import {
  filterQuestions,
  type QuestionFilters,
} from '@/lib/domain/question-filtering';
import type { CatalogueQuestion } from '@/lib/data/catalogue-repository';
import type { TaxonomyNode } from '@/lib/domain/taxonomy';

const nodes: TaxonomyNode[] = [
  {
    id: 'unit',
    subjectId: 'calc',
    parentId: null,
    kind: 'unit',
    slug: 'integrals',
    name: 'Integrais',
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: 'topic',
    subjectId: 'calc',
    parentId: 'unit',
    kind: 'topic',
    slug: 'substitution',
    name: 'Substituição',
    sortOrder: 1,
    isPublished: true,
  },
];
const question = (
  id: string,
  difficulty: 'easy' | 'medium' | 'hard',
  nodeId = 'topic',
): CatalogueQuestion => ({
  id,
  subjectId: 'calc',
  kind: 'multiple_choice',
  difficulty,
  statement: { format: 'markdown_latex', value: id },
  options: [],
  taxonomyTags: [{ questionId: id, taxonomyNodeId: nodeId, isPrimary: true }],
  hints: [],
  source: { kind: 'original', label: 'Teste', rightsStatus: 'approved' },
});
const filters = (
  overrides: Partial<QuestionFilters> = {},
): QuestionFilters => ({
  subjectId: 'calc',
  selectedNodeIds: [],
  difficulties: [],
  status: 'all',
  outcomesByQuestionId: new Map(),
  redoQuestionIds: new Set(),
  ...overrides,
});

describe('question filters', () => {
  const questions = [
    question('unanswered', 'easy'),
    question('correct', 'medium'),
    question('incorrect', 'hard'),
  ];
  const outcomes = new Map([
    ['correct', 'correct' as const],
    ['incorrect', 'incorrect' as const],
  ]);

  it('returns every matching question when filters are clear', () => {
    expect(
      filterQuestions(questions, nodes, filters()).map((item) => item.id),
    ).toEqual(['unanswered', 'correct', 'incorrect']);
  });

  it('filters by taxonomy, difficulty and latest result', () => {
    expect(
      filterQuestions(
        questions,
        nodes,
        filters({
          selectedNodeIds: ['unit'],
          difficulties: ['medium'],
          status: 'correct',
          outcomesByQuestionId: outcomes,
        }),
      ).map((item) => item.id),
    ).toEqual(['correct']);
  });

  it('returns an intentional empty result when no question matches', () => {
    expect(
      filterQuestions(
        questions,
        nodes,
        filters({ status: 'redo', redoQuestionIds: new Set() }),
      ),
    ).toEqual([]);
  });
});
