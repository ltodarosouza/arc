import type { ContentFormat, Difficulty, QuestionKind } from '@/lib/domain/questions';
import type { Subject, TaxonomyNode } from '@/lib/domain/taxonomy';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

export type CatalogueOption = { id: string; label: string; content: { format: ContentFormat; value: string }; sortOrder: number };
export type CatalogueQuestion = {
  id: string;
  subjectId: string;
  kind: QuestionKind;
  difficulty: Difficulty;
  statement: { format: ContentFormat; value: string };
  options: CatalogueOption[];
  taxonomyTags: { questionId: string; taxonomyNodeId: string; isPrimary: boolean }[];
  hints: { id: string; content: { format: ContentFormat; value: string }; sortOrder: number }[];
  source: { kind: 'original' | 'open_licence' | 'authorised_contributor' | 'other'; label: string; rightsStatus: 'approved' };
};

export type CatalogueSnapshot = { subjects: Subject[]; taxonomyNodes: TaxonomyNode[]; questions: CatalogueQuestion[] };

type DatabaseSubject = { id: string; slug: string; name: string; description: string | null; sort_order: number; is_published: boolean };
type DatabaseNode = { id: string; subject_id: string; parent_id: string | null; kind: 'unit' | 'topic' | 'subtopic'; slug: string; name: string; sort_order: number; is_published: boolean };
type DatabaseQuestion = { id: string; subject_id: string; kind: QuestionKind; difficulty: Difficulty; statement_markdown: string; content_format: ContentFormat; source_id: string | null };
type DatabaseOption = { id: string; question_id: string; label: string; content_markdown: string; sort_order: number };
type DatabaseTag = { question_id: string; taxonomy_node_id: string; is_primary: boolean };
type DatabaseHint = { id: string; question_id: string; content_markdown: string; sort_order: number };
type DatabaseSource = { id: string; kind: CatalogueQuestion['source']['kind']; label: string };

/** Browser-safe published catalogue. Answer keys and solutions are intentionally absent. */
export async function loadPublishedCatalogue(): Promise<CatalogueSnapshot> {
  if (!isSupabaseConfigured()) throw new Error('Supabase is unavailable.');
  const supabase = getSupabaseClient();
  const [subjectsResult, nodesResult, questionsResult, optionsResult, tagsResult, hintsResult, sourcesResult] = await Promise.all([
    supabase.from('subjects').select('id, slug, name, description, sort_order, is_published').order('sort_order'),
    supabase.from('taxonomy_nodes').select('id, subject_id, parent_id, kind, slug, name, sort_order, is_published').order('sort_order'),
    supabase.from('questions').select('id, subject_id, kind, difficulty, statement_markdown, content_format, source_id').eq('publication_status', 'published'),
    supabase.from('question_options').select('id, question_id, label, content_markdown, sort_order').order('sort_order'),
    supabase.from('question_taxonomy_tags').select('question_id, taxonomy_node_id, is_primary'),
    supabase.from('question_hints').select('id, question_id, content_markdown, sort_order').order('sort_order'),
    supabase.from('question_sources').select('id, kind, label'),
  ]);

  const failure = [subjectsResult, nodesResult, questionsResult, optionsResult, tagsResult, hintsResult, sourcesResult].find((result) => result.error)?.error;
  if (failure) throw failure;

  const subjects = (subjectsResult.data as DatabaseSubject[]).map((item) => ({ id: item.id, slug: item.slug, name: item.name, description: item.description ?? '', sortOrder: item.sort_order, isPublished: item.is_published }));
  const taxonomyNodes = (nodesResult.data as DatabaseNode[]).map((item) => ({ id: item.id, subjectId: item.subject_id, parentId: item.parent_id, kind: item.kind, slug: item.slug, name: item.name, sortOrder: item.sort_order, isPublished: item.is_published }));
  const options = optionsResult.data as DatabaseOption[];
  const tags = tagsResult.data as DatabaseTag[];
  const hints = hintsResult.data as DatabaseHint[];
  const sources = new Map((sourcesResult.data as DatabaseSource[]).map((item) => [item.id, item]));
  const questions = (questionsResult.data as DatabaseQuestion[]).map((item) => {
    const source = item.source_id ? sources.get(item.source_id) : undefined;
    return {
      id: item.id,
      subjectId: item.subject_id,
      kind: item.kind,
      difficulty: item.difficulty,
      statement: { format: item.content_format, value: item.statement_markdown },
      options: options.filter((option) => option.question_id === item.id).map((option) => ({ id: option.id, label: option.label, content: { format: 'markdown_latex', value: option.content_markdown }, sortOrder: option.sort_order })),
      taxonomyTags: tags.filter((tag) => tag.question_id === item.id).map((tag) => ({ questionId: tag.question_id, taxonomyNodeId: tag.taxonomy_node_id, isPrimary: tag.is_primary })),
      hints: hints.filter((hint) => hint.question_id === item.id).map((hint) => ({ id: hint.id, content: { format: 'markdown_latex', value: hint.content_markdown }, sortOrder: hint.sort_order })),
      source: { kind: source?.kind ?? 'other', label: source?.label ?? 'Fonte não informada', rightsStatus: 'approved' },
    };
  });

  return { subjects, taxonomyNodes, questions };
}
