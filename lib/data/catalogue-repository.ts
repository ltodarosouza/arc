import type {
  ContentFormat,
  Difficulty,
  QuestionKind,
} from '@/lib/domain/questions';
import type { Subject, TaxonomyNode } from '@/lib/domain/taxonomy';
import {
  seedQuestions,
  seedSubjects,
  seedTaxonomyNodes,
} from '@/lib/data/seed-catalogue';
import { collectAllPages } from '@/lib/data/page-through-results';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

export type CatalogueOption = {
  id: string;
  label: string;
  content: { format: ContentFormat; value: string };
  sortOrder: number;
};
export type CatalogueQuestion = {
  id: string;
  subjectId: string;
  kind: QuestionKind;
  difficulty: Difficulty;
  statement: { format: ContentFormat; value: string };
  options: CatalogueOption[];
  taxonomyTags: {
    questionId: string;
    taxonomyNodeId: string;
    isPrimary: boolean;
  }[];
  hints: {
    id: string;
    content: { format: ContentFormat; value: string };
    sortOrder: number;
  }[];
  source: {
    kind: 'original' | 'open_licence' | 'authorised_contributor' | 'other';
    label: string;
    rightsStatus: 'approved';
  };
};

export type CatalogueSnapshot = {
  subjects: Subject[];
  taxonomyNodes: TaxonomyNode[];
  questions: CatalogueQuestion[];
};

export type CatalogueRepository = {
  loadPublished(): Promise<CatalogueSnapshot>;
};

type DatabaseSubject = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_published: boolean;
};
type DatabaseNode = {
  id: string;
  subject_id: string;
  parent_id: string | null;
  kind: 'unit' | 'topic' | 'subtopic';
  slug: string;
  name: string;
  sort_order: number;
  is_published: boolean;
};
type DatabaseQuestion = {
  id: string;
  subject_id: string;
  kind: QuestionKind;
  difficulty: Difficulty;
  statement_markdown: string;
  content_format: ContentFormat;
  source_id: string | null;
};
type DatabaseOption = {
  id: string;
  question_id: string;
  label: string;
  content_markdown: string;
  sort_order: number;
};
type DatabaseTag = {
  question_id: string;
  taxonomy_node_id: string;
  is_primary: boolean;
};
type DatabaseHint = {
  id: string;
  question_id: string;
  content_markdown: string;
  sort_order: number;
};
type DatabaseSource = {
  id: string;
  kind: CatalogueQuestion['source']['kind'];
  label: string;
};

/** Browser-safe published catalogue. Answer keys and solutions are intentionally absent. */
async function loadSupabaseCatalogue(): Promise<CatalogueSnapshot> {
  if (!isSupabaseConfigured()) throw new Error('Supabase is unavailable.');
  const supabase = getSupabaseClient();
  const [subjects, taxonomyNodes, questions, options, tags, hints, sources] =
    await Promise.all([
      collectAllPages<DatabaseSubject>((from, to) =>
        supabase
          .from('subjects')
          .select('id, slug, name, description, sort_order, is_published')
          .order('sort_order')
          .order('id')
          .range(from, to),
      ),
      collectAllPages<DatabaseNode>((from, to) =>
        supabase
          .from('taxonomy_nodes')
          .select(
            'id, subject_id, parent_id, kind, slug, name, sort_order, is_published',
          )
          .order('subject_id')
          .order('sort_order')
          .order('id')
          .range(from, to),
      ),
      collectAllPages<DatabaseQuestion>((from, to) =>
        supabase
          .from('questions')
          .select(
            'id, subject_id, kind, difficulty, statement_markdown, content_format, source_id',
          )
          .eq('publication_status', 'published')
          .order('subject_id')
          .order('id')
          .range(from, to),
      ),
      collectAllPages<DatabaseOption>((from, to) =>
        supabase
          .from('question_options')
          .select('id, question_id, label, content_markdown, sort_order')
          .order('question_id')
          .order('sort_order')
          .order('id')
          .range(from, to),
      ),
      collectAllPages<DatabaseTag>((from, to) =>
        supabase
          .from('question_taxonomy_tags')
          .select('question_id, taxonomy_node_id, is_primary')
          .order('question_id')
          .order('taxonomy_node_id')
          .range(from, to),
      ),
      collectAllPages<DatabaseHint>((from, to) =>
        supabase
          .from('question_hints')
          .select('id, question_id, content_markdown, sort_order')
          .order('question_id')
          .order('sort_order')
          .order('id')
          .range(from, to),
      ),
      collectAllPages<DatabaseSource>((from, to) =>
        supabase
          .from('question_sources')
          .select('id, kind, label, rights_status')
          .order('id')
          .range(from, to),
      ),
    ]);

  const mappedSubjects = subjects.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    description: item.description ?? '',
    sortOrder: item.sort_order,
    isPublished: item.is_published,
  }));
  const mappedTaxonomyNodes = taxonomyNodes.map((item) => ({
    id: item.id,
    subjectId: item.subject_id,
    parentId: item.parent_id,
    kind: item.kind,
    slug: item.slug,
    name: item.name,
    sortOrder: item.sort_order,
    isPublished: item.is_published,
  }));
  const sourcesById = new Map(sources.map((item) => [item.id, item]));
  const mappedQuestions = questions.map((item) => {
    const source = item.source_id ? sourcesById.get(item.source_id) : undefined;
    return {
      id: item.id,
      subjectId: item.subject_id,
      kind: item.kind,
      difficulty: item.difficulty,
      statement: {
        format: item.content_format,
        value: item.statement_markdown,
      },
      options: options
        .filter((option) => option.question_id === item.id)
        .map((option) => ({
          id: option.id,
          label: option.label,
          content: {
            format: 'markdown_latex' as const,
            value: option.content_markdown,
          },
          sortOrder: option.sort_order,
        })),
      taxonomyTags: tags
        .filter((tag) => tag.question_id === item.id)
        .map((tag) => ({
          questionId: tag.question_id,
          taxonomyNodeId: tag.taxonomy_node_id,
          isPrimary: tag.is_primary,
        })),
      hints: hints
        .filter((hint) => hint.question_id === item.id)
        .map((hint) => ({
          id: hint.id,
          content: {
            format: 'markdown_latex' as const,
            value: hint.content_markdown,
          },
          sortOrder: hint.sort_order,
        })),
      source: {
        kind: source?.kind ?? 'other',
        label: source?.label ?? 'Fonte não informada',
        rightsStatus: 'approved' as const,
      },
    };
  });

  return {
    subjects: mappedSubjects,
    taxonomyNodes: mappedTaxonomyNodes,
    questions: mappedQuestions,
  };
}

function loadFixtureCatalogue(): CatalogueSnapshot {
  return {
    subjects: seedSubjects.filter((subject) => subject.isPublished),
    taxonomyNodes: seedTaxonomyNodes.filter((node) => node.isPublished),
    questions: seedQuestions
      .filter((question) => question.status === 'published')
      .map((question) => ({
        id: question.id,
        subjectId: question.subjectId,
        kind: question.kind,
        difficulty: question.difficulty,
        statement: question.statement,
        options: question.kind === 'multiple_choice' ? question.options : [],
        taxonomyTags: question.taxonomyTags,
        hints: question.hints,
        source: {
          kind: question.source.kind,
          label: question.source.label,
          rightsStatus: 'approved',
        },
      })),
  };
}

class SupabaseCatalogueRepository implements CatalogueRepository {
  loadPublished() {
    return loadSupabaseCatalogue();
  }
}

class FixtureCatalogueRepository implements CatalogueRepository {
  async loadPublished() {
    return loadFixtureCatalogue();
  }
}

/**
 * Supabase is the source of truth when configured. Fixtures exist only for
 * local development without a Supabase project; a configured project never
 * silently falls back on a query error or an empty catalogue.
 */
export function createCatalogueRepository(): CatalogueRepository {
  return isSupabaseConfigured()
    ? new SupabaseCatalogueRepository()
    : new FixtureCatalogueRepository();
}

/** Maps the original fixture ids to the durable subject records by slug. */
export function normalizeSelectedSubjectIds(
  subjectIds: string[],
  catalogue: CatalogueSnapshot,
): string[] {
  return subjectIds
    .map((savedId) => {
      if (catalogue.subjects.some((subject) => subject.id === savedId))
        return savedId;
      const fixtureSubject = seedSubjects.find(
        (subject) => subject.id === savedId,
      );
      return catalogue.subjects.find(
        (subject) => subject.slug === fixtureSubject?.slug,
      )?.id;
    })
    .filter((id): id is string => Boolean(id));
}

/** Revalidate published content at navigation boundaries without request storms. */
export const catalogueCacheTtlMs = 60_000;

let cachedCatalogue: CatalogueSnapshot | null = null;
let cachedCatalogueAt = 0;
let pendingCatalogue: Promise<CatalogueSnapshot> | null = null;

export async function loadPublishedCatalogue(): Promise<CatalogueSnapshot> {
  if (cachedCatalogue && Date.now() - cachedCatalogueAt < catalogueCacheTtlMs)
    return cachedCatalogue;
  pendingCatalogue ??= createCatalogueRepository()
    .loadPublished()
    .then((catalogue) => {
      cachedCatalogue = catalogue;
      cachedCatalogueAt = Date.now();
      return catalogue;
    })
    .finally(() => {
      pendingCatalogue = null;
    });
  return pendingCatalogue;
}
