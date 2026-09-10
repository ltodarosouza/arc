-- Remove somente questões abertas de Álgebra Linear, independentemente do status.
-- A seleção por slug e kind torna a migration segura para reexecução e evita
-- depender de uma lista de UUIDs que pode ficar desatualizada.
begin;

delete from public.question_attempts as attempt
where attempt.question_id in (
  select question_row.id
  from public.questions as question_row
  join public.subjects as subject_row on subject_row.id = question_row.subject_id
  where subject_row.slug = 'algebra-linear'
    and question_row.kind = 'reveal_answer'
);

delete from public.redo_questions as redo
where redo.question_id in (
  select question_row.id
  from public.questions as question_row
  join public.subjects as subject_row on subject_row.id = question_row.subject_id
  where subject_row.slug = 'algebra-linear'
    and question_row.kind = 'reveal_answer'
);

-- Explicitly remove all content children. This also avoids the restrictive
-- correct_option_id foreign key while deleting options.
delete from public.question_answer_keys as answer_key
where answer_key.question_id in (
  select question_row.id
  from public.questions as question_row
  join public.subjects as subject_row on subject_row.id = question_row.subject_id
  where subject_row.slug = 'algebra-linear'
    and question_row.kind = 'reveal_answer'
);

delete from public.question_taxonomy_tags as tag
where tag.question_id in (
  select question_row.id
  from public.questions as question_row
  join public.subjects as subject_row on subject_row.id = question_row.subject_id
  where subject_row.slug = 'algebra-linear'
    and question_row.kind = 'reveal_answer'
);

delete from public.question_hints as hint
where hint.question_id in (
  select question_row.id
  from public.questions as question_row
  join public.subjects as subject_row on subject_row.id = question_row.subject_id
  where subject_row.slug = 'algebra-linear'
    and question_row.kind = 'reveal_answer'
);

delete from public.question_solution_steps as step
where step.question_id in (
  select question_row.id
  from public.questions as question_row
  join public.subjects as subject_row on subject_row.id = question_row.subject_id
  where subject_row.slug = 'algebra-linear'
    and question_row.kind = 'reveal_answer'
);

delete from public.question_solutions as solution
where solution.question_id in (
  select question_row.id
  from public.questions as question_row
  join public.subjects as subject_row on subject_row.id = question_row.subject_id
  where subject_row.slug = 'algebra-linear'
    and question_row.kind = 'reveal_answer'
);

delete from public.question_options as option_row
where option_row.question_id in (
  select question_row.id
  from public.questions as question_row
  join public.subjects as subject_row on subject_row.id = question_row.subject_id
  where subject_row.slug = 'algebra-linear'
    and question_row.kind = 'reveal_answer'
);

delete from public.questions as question_row
using public.subjects as subject_row
where subject_row.id = question_row.subject_id
  and subject_row.slug = 'algebra-linear'
  and question_row.kind = 'reveal_answer';

commit;
