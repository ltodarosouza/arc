/**
 * The academic catalogue is intentionally independent of institutions,
 * degrees, and semesters. Those can later recommend a Subject, but never own
 * a duplicate copy of its taxonomy or questions.
 */

export type Subject = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  sortOrder: number;
  isPublished: boolean;
};

export type TaxonomyNodeKind = 'unit' | 'topic' | 'subtopic';

export type TaxonomyNode = {
  id: string;
  subjectId: string;
  kind: TaxonomyNodeKind;
  name: string;
  slug: string;
  /** Unit nodes have no parent. Topics belong to units; subtopics to topics. */
  parentId: string | null;
  sortOrder: number;
  isPublished: boolean;
};

/**
 * A question has one subject context, but may be relevant to several topic or
 * subtopic nodes inside that subject. `isPrimary` marks the route used as its
 * default location without throwing away the other valid tags.
 */
export type QuestionTaxonomyTag = {
  questionId: string;
  taxonomyNodeId: string;
  isPrimary: boolean;
};

export type TaxonomyValidationError = {
  nodeId: string;
  message: string;
};

const expectedParentKind: Record<TaxonomyNodeKind, TaxonomyNodeKind | null> = {
  unit: null,
  topic: 'unit',
  subtopic: 'topic',
};

/**
 * Validates the shape that content-management and seed-data code must follow.
 * It returns errors instead of throwing so authoring interfaces can show all
 * problems at once.
 */
export function validateTaxonomy(
  nodes: TaxonomyNode[],
): TaxonomyValidationError[] {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const errors: TaxonomyValidationError[] = [];

  for (const node of nodes) {
    const requiredParentKind = expectedParentKind[node.kind];

    if (requiredParentKind === null) {
      if (node.parentId !== null) {
        errors.push({
          nodeId: node.id,
          message: 'A unit cannot have a parent.',
        });
      }
      continue;
    }

    if (!node.parentId) {
      errors.push({
        nodeId: node.id,
        message: `A ${node.kind} requires a parent ${requiredParentKind}.`,
      });
      continue;
    }

    const parent = nodeById.get(node.parentId);
    if (!parent) {
      errors.push({
        nodeId: node.id,
        message: 'The declared parent does not exist.',
      });
      continue;
    }

    if (parent.kind !== requiredParentKind) {
      errors.push({
        nodeId: node.id,
        message: `A ${node.kind} must belong to a ${requiredParentKind}.`,
      });
    }

    if (parent.subjectId !== node.subjectId) {
      errors.push({
        nodeId: node.id,
        message:
          'A taxonomy node and its parent must belong to the same subject.',
      });
    }
  }

  return errors;
}

/** Returns the selected node and all of its descendants for topic filtering. */
export function getTaxonomyBranch(
  nodeId: string,
  nodes: TaxonomyNode[],
): string[] {
  const childIdsByParentId = new Map<string, string[]>();

  for (const node of nodes) {
    if (!node.parentId) continue;
    childIdsByParentId.set(node.parentId, [
      ...(childIdsByParentId.get(node.parentId) ?? []),
      node.id,
    ]);
  }

  const branch = [nodeId];
  for (let index = 0; index < branch.length; index += 1) {
    branch.push(...(childIdsByParentId.get(branch[index]) ?? []));
  }

  return branch;
}

/** A tag set is valid only when all tags belong to the question's subject. */
export function validateQuestionTaxonomyTags(
  subjectId: string,
  tags: QuestionTaxonomyTag[],
  nodes: TaxonomyNode[],
): string[] {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const errors: string[] = [];
  let primaryTagCount = 0;

  for (const tag of tags) {
    const node = nodeById.get(tag.taxonomyNodeId);
    if (!node) {
      errors.push(
        `Tag ${tag.taxonomyNodeId} references an unknown taxonomy node.`,
      );
      continue;
    }
    if (node.subjectId !== subjectId) {
      errors.push(`Tag ${tag.taxonomyNodeId} belongs to a different subject.`);
    }
    if (tag.isPrimary) primaryTagCount += 1;
  }

  if (primaryTagCount > 1)
    errors.push('A question can have at most one primary taxonomy tag.');

  return errors;
}
