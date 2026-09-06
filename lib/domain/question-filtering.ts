import type { CatalogueQuestion } from '@/lib/data/catalogue-repository';
import type { AttemptOutcome, Difficulty } from '@/lib/domain/questions';
import { getTaxonomyBranch, type TaxonomyNode } from '@/lib/domain/taxonomy';

export type QuestionStatusFilter =
  | 'all'
  | 'not_attempted'
  | 'attempted'
  | 'correct'
  | 'incorrect'
  | 'redo';

export type QuestionFilters = {
  subjectId: string;
  selectedNodeIds: string[];
  difficulties: Difficulty[];
  status: QuestionStatusFilter;
  outcomesByQuestionId: Map<string, AttemptOutcome>;
  redoQuestionIds: Set<string>;
};

export function filterQuestions(
  questions: CatalogueQuestion[],
  taxonomyNodes: TaxonomyNode[],
  filters: QuestionFilters,
) {
  return questions.filter((question) => {
    if (question.subjectId !== filters.subjectId) return false;
    if (
      filters.difficulties.length &&
      !filters.difficulties.includes(question.difficulty)
    )
      return false;

    const outcome = filters.outcomesByQuestionId.get(question.id);
    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'not_attempted' && !outcome) ||
      (filters.status === 'attempted' && Boolean(outcome)) ||
      (filters.status === 'correct' && outcome === 'correct') ||
      (filters.status === 'incorrect' && outcome === 'incorrect') ||
      (filters.status === 'redo' && filters.redoQuestionIds.has(question.id));
    if (!matchesStatus) return false;

    return filters.selectedNodeIds.every((nodeId) => {
      const branch = getTaxonomyBranch(nodeId, taxonomyNodes);
      return question.taxonomyTags.some((tag) =>
        branch.includes(tag.taxonomyNodeId),
      );
    });
  });
}
