import type { LearnerState } from '@/lib/domain/learner';
import type { AttemptOutcome, QuestionAttempt } from '@/lib/domain/questions';
import { createEmptyLearnerState } from '@/lib/domain/learner';
import { collectAllPages } from '@/lib/data/page-through-results';
import { getSupabaseClient } from '@/lib/supabase/client';
import { seedSubjects } from '@/lib/data/seed-catalogue';

type DatabaseAttempt = {
  id: string;
  question_id: string;
  selected_option_id: string | null;
  outcome: AttemptOutcome;
  grading_method: QuestionAttempt['gradingMethod'];
  created_at: string;
};

async function currentUserId() {
  const {
    data: { session },
    error,
  } = await getSupabaseClient().auth.getSession();
  if (error || !session)
    throw new Error('Entre novamente para acessar seu progresso.');
  return session.user.id;
}

function toAttempt(row: DatabaseAttempt): QuestionAttempt {
  return {
    id: row.id,
    questionId: row.question_id,
    answer: row.selected_option_id
      ? { kind: 'selected_option', selectedOptionId: row.selected_option_id }
      : {
          kind: 'revealed_answer',
          selfAssessment:
            row.outcome === 'correct'
              ? 'correct'
              : row.outcome === 'incorrect'
                ? 'incorrect'
                : 'not_assessed',
        },
    outcome: row.outcome,
    gradingMethod: row.grading_method,
    createdAt: row.created_at,
  };
}

export async function loadSupabaseLearnerState(): Promise<LearnerState> {
  const supabase = getSupabaseClient();
  const userId = await currentUserId();
  const [subjects, attempts, redoQuestionIds] = await Promise.all([
    collectAllPages<{ subject_id: string }>((from, to) =>
      supabase
        .from('user_subjects')
        .select('subject_id')
        .eq('user_id', userId)
        .order('subject_id')
        .range(from, to),
    ),
    collectAllPages<DatabaseAttempt>((from, to) =>
      supabase
        .from('question_attempts')
        .select(
          'id, question_id, selected_option_id, outcome, grading_method, created_at',
        )
        .eq('user_id', userId)
        .order('created_at')
        .order('id')
        .range(from, to),
    ),
    collectAllPages<{ question_id: string }>((from, to) =>
      supabase
        .from('redo_questions')
        .select('question_id')
        .eq('user_id', userId)
        .order('question_id')
        .range(from, to),
    ),
  ]);
  return {
    version: 1,
    selectedSubjectIds: subjects.map((row) => row.subject_id),
    attempts: attempts.map(toAttempt),
    redoQuestionIds: redoQuestionIds.map((row) => row.question_id),
  };
}

export async function saveSupabaseSelectedSubjects(subjectIds: string[]) {
  const supabase = getSupabaseClient();
  const userId = await currentUserId();
  const legacySlugs = subjectIds
    .map((id) => seedSubjects.find((subject) => subject.id === id)?.slug)
    .filter((slug): slug is string => Boolean(slug));
  const { data: durableSubjects, error: subjectsError } = legacySlugs.length
    ? await supabase.from('subjects').select('id, slug').in('slug', legacySlugs)
    : { data: [], error: null };
  if (subjectsError) throw subjectsError;
  const durableIdBySlug = new Map(
    (durableSubjects ?? []).map((subject) => [subject.slug, subject.id]),
  );
  const durableIds = subjectIds.map(
    (id) =>
      durableIdBySlug.get(
        seedSubjects.find((subject) => subject.id === id)?.slug ?? '',
      ) ?? id,
  );
  const { data: existing, error: existingError } = await supabase
    .from('user_subjects')
    .select('subject_id')
    .eq('user_id', userId);
  if (existingError) throw existingError;
  const existingIds = new Set((existing ?? []).map((row) => row.subject_id));
  const nextIds = new Set(durableIds);
  const toAdd = durableIds.filter((id) => !existingIds.has(id));
  const toRemove = [...existingIds].filter((id) => !nextIds.has(id));
  if (toAdd.length) {
    const { error } = await supabase
      .from('user_subjects')
      .insert(toAdd.map((subject_id) => ({ user_id: userId, subject_id })));
    if (error) throw error;
  }
  if (toRemove.length) {
    const { error } = await supabase
      .from('user_subjects')
      .delete()
      .eq('user_id', userId)
      .in('subject_id', toRemove);
    if (error) throw error;
  }
}

export async function setSupabaseRedo(questionId: string, enabled: boolean) {
  const supabase = getSupabaseClient();
  const userId = await currentUserId();
  const result = enabled
    ? await supabase.from('redo_questions').upsert(
        { user_id: userId, question_id: questionId },
        {
          onConflict: 'user_id,question_id',
          ignoreDuplicates: true,
        },
      )
    : await supabase
        .from('redo_questions')
        .delete()
        .eq('user_id', userId)
        .eq('question_id', questionId);
  if (result.error) throw result.error;
}

/** Explicit offline shape for callers that need to recover from a remote failure. */
export function emptyRemoteLearnerState() {
  return createEmptyLearnerState();
}
