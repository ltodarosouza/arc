-- Arc initial schema. Run through the Supabase SQL Editor or Supabase CLI.
-- This migration contains schema and access policies only; seed content stays
-- in application fixtures until it has passed the curation workflow.

create type public.question_kind as enum ('multiple_choice', 'reveal_answer');
create type public.question_difficulty as enum ('easy', 'medium', 'hard');
create type public.question_publication_status as enum ('draft', 'published', 'archived');
create type public.question_source_kind as enum ('original', 'open_licence', 'authorised_contributor', 'other');
create type public.attempt_outcome as enum ('correct', 'incorrect', 'revealed');
create type public.attempt_grading_method as enum ('automatic', 'self_assessed', 'unscored');
create type public.self_assessment as enum ('correct', 'incorrect', 'not_assessed');

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subjects_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.taxonomy_nodes (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  parent_id uuid references public.taxonomy_nodes(id) on delete cascade,
  kind text not null check (kind in ('unit', 'topic', 'subtopic')),
  slug text not null,
  name text not null,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint taxonomy_node_parent_shape check (
    (kind = 'unit' and parent_id is null) or
    (kind in ('topic', 'subtopic') and parent_id is not null)
  )
);

create unique index taxonomy_nodes_unique_root_slug
  on public.taxonomy_nodes(subject_id, slug) where parent_id is null;
create unique index taxonomy_nodes_unique_child_slug
  on public.taxonomy_nodes(subject_id, parent_id, slug) where parent_id is not null;
create index taxonomy_nodes_subject_parent_order
  on public.taxonomy_nodes(subject_id, parent_id, sort_order);

create table public.question_sources (
  id uuid primary key default gen_random_uuid(),
  kind public.question_source_kind not null,
  label text not null,
  source_url text,
  licence_note text,
  created_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete restrict,
  source_id uuid references public.question_sources(id) on delete set null,
  kind public.question_kind not null,
  difficulty public.question_difficulty not null,
  publication_status public.question_publication_status not null default 'draft',
  statement_markdown text not null,
  content_format text not null default 'markdown_latex',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index questions_browse_index
  on public.questions(subject_id, publication_status, difficulty, created_at desc);

create table public.question_taxonomy_tags (
  question_id uuid not null references public.questions(id) on delete cascade,
  taxonomy_node_id uuid not null references public.taxonomy_nodes(id) on delete restrict,
  is_primary boolean not null default false,
  primary key (question_id, taxonomy_node_id)
);
create unique index question_taxonomy_one_primary_tag
  on public.question_taxonomy_tags(question_id) where is_primary;
create index question_taxonomy_by_node on public.question_taxonomy_tags(taxonomy_node_id, question_id);

create table public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  label text not null,
  content_markdown text not null,
  sort_order integer not null,
  unique (question_id, label),
  unique (question_id, sort_order)
);

-- Kept inaccessible to browser clients. Answers are checked through an RPC.
create table public.question_answer_keys (
  question_id uuid primary key references public.questions(id) on delete cascade,
  correct_option_id uuid not null references public.question_options(id) on delete restrict
);

create table public.question_hints (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  content_markdown text not null,
  sort_order integer not null,
  unique (question_id, sort_order)
);

create table public.question_solutions (
  question_id uuid primary key references public.questions(id) on delete cascade,
  final_answer_markdown text not null,
  explanation_markdown text
);

create table public.question_solution_steps (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  title text,
  content_markdown text not null,
  sort_order integer not null,
  unique (question_id, sort_order)
);

create table public.user_subjects (
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, subject_id)
);

create table public.question_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete restrict,
  selected_option_id uuid references public.question_options(id) on delete set null,
  self_assessment public.self_assessment,
  outcome public.attempt_outcome not null,
  grading_method public.attempt_grading_method not null,
  created_at timestamptz not null default now(),
  constraint question_attempts_answer_shape check (
    (grading_method = 'automatic' and selected_option_id is not null and self_assessment is null) or
    (grading_method = 'self_assessed' and selected_option_id is null and self_assessment in ('correct', 'incorrect')) or
    (grading_method = 'unscored' and selected_option_id is null and self_assessment = 'not_assessed')
  )
);
create index question_attempts_user_question_created
  on public.question_attempts(user_id, question_id, created_at desc);
create index question_attempts_user_outcome_created
  on public.question_attempts(user_id, outcome, created_at desc);

create table public.redo_questions (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

-- Browser access is least-privilege: public catalogue reads, private learner state.
alter table public.subjects enable row level security;
alter table public.taxonomy_nodes enable row level security;
alter table public.question_sources enable row level security;
alter table public.questions enable row level security;
alter table public.question_taxonomy_tags enable row level security;
alter table public.question_options enable row level security;
alter table public.question_answer_keys enable row level security;
alter table public.question_hints enable row level security;
alter table public.question_solutions enable row level security;
alter table public.question_solution_steps enable row level security;
alter table public.user_subjects enable row level security;
alter table public.question_attempts enable row level security;
alter table public.redo_questions enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant select on public.subjects, public.taxonomy_nodes, public.question_sources, public.questions,
  public.question_taxonomy_tags, public.question_options, public.question_hints to anon, authenticated;
grant select, insert, delete on public.user_subjects, public.redo_questions to authenticated;
grant select on public.question_attempts to authenticated;

create policy "Published subjects are readable" on public.subjects for select
  to anon, authenticated using (is_published = true);
create policy "Published taxonomy is readable" on public.taxonomy_nodes for select
  to anon, authenticated using (is_published = true);
create policy "Question sources are readable" on public.question_sources for select
  to anon, authenticated using (true);
create policy "Published questions are readable" on public.questions for select
  to anon, authenticated using (publication_status = 'published');
create policy "Question tags are readable" on public.question_taxonomy_tags for select
  to anon, authenticated using (true);
create policy "Question options are readable" on public.question_options for select
  to anon, authenticated using (true);
create policy "Question hints are readable" on public.question_hints for select
  to anon, authenticated using (true);

create policy "Learners manage selected subjects" on public.user_subjects for all
  to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Learners read their attempts" on public.question_attempts for select
  to authenticated using ((select auth.uid()) = user_id);
create policy "Learners manage redo questions" on public.redo_questions for all
  to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create function public.submit_multiple_choice_attempt(p_question_id uuid, p_selected_option_id uuid)
returns table (attempt_id uuid, outcome public.attempt_outcome)
language plpgsql security definer set search_path = public
as $$
declare
  v_correct_option_id uuid;
  v_outcome public.attempt_outcome;
  v_attempt_id uuid;
begin
  if auth.uid() is null then raise exception 'Authentication is required.'; end if;
  select answer_key.correct_option_id into v_correct_option_id
  from question_answer_keys answer_key
  join question_options option_row on option_row.id = p_selected_option_id
  where answer_key.question_id = p_question_id and option_row.question_id = p_question_id;
  if v_correct_option_id is null then raise exception 'Invalid question or answer option.'; end if;
  v_outcome := case when p_selected_option_id = v_correct_option_id then 'correct' else 'incorrect' end;
  insert into question_attempts (user_id, question_id, selected_option_id, outcome, grading_method)
    values (auth.uid(), p_question_id, p_selected_option_id, v_outcome, 'automatic') returning id into v_attempt_id;
  return query select v_attempt_id, v_outcome;
end;
$$;

create function public.record_reveal_answer_attempt(p_question_id uuid, p_self_assessment public.self_assessment)
returns table (attempt_id uuid, outcome public.attempt_outcome)
language plpgsql security definer set search_path = public
as $$
declare
  v_outcome public.attempt_outcome;
  v_method public.attempt_grading_method;
  v_attempt_id uuid;
begin
  if auth.uid() is null then raise exception 'Authentication is required.'; end if;
  if not exists (select 1 from questions where id = p_question_id and kind = 'reveal_answer') then
    raise exception 'Question is not a reveal-answer question.';
  end if;
  v_outcome := case when p_self_assessment = 'correct' then 'correct' when p_self_assessment = 'incorrect' then 'incorrect' else 'revealed' end;
  v_method := case when p_self_assessment = 'not_assessed' then 'unscored' else 'self_assessed' end;
  insert into question_attempts (user_id, question_id, self_assessment, outcome, grading_method)
    values (auth.uid(), p_question_id, p_self_assessment, v_outcome, v_method) returning id into v_attempt_id;
  return query select v_attempt_id, v_outcome;
end;
$$;

create function public.get_question_solution(p_question_id uuid)
returns jsonb
language sql security definer set search_path = public
as $$
  select jsonb_build_object(
    'finalAnswer', solution.final_answer_markdown,
    'explanation', solution.explanation_markdown,
    'steps', coalesce((
      select jsonb_agg(jsonb_build_object('id', step.id, 'title', step.title, 'content', step.content_markdown, 'sortOrder', step.sort_order) order by step.sort_order)
      from question_solution_steps step where step.question_id = solution.question_id
    ), '[]'::jsonb)
  )
  from question_solutions solution
  where solution.question_id = p_question_id
    and auth.uid() is not null
    and exists (
      select 1 from question_attempts attempt
      where attempt.question_id = p_question_id and attempt.user_id = auth.uid()
    );
$$;

revoke all on function public.submit_multiple_choice_attempt(uuid, uuid) from public;
revoke all on function public.record_reveal_answer_attempt(uuid, public.self_assessment) from public;
revoke all on function public.get_question_solution(uuid) from public;
grant execute on function public.submit_multiple_choice_attempt(uuid, uuid) to authenticated;
grant execute on function public.record_reveal_answer_attempt(uuid, public.self_assessment) to authenticated;
grant execute on function public.get_question_solution(uuid) to authenticated;
