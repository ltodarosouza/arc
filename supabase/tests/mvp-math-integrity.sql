-- Protect a published MVP question from regressions in SQL escaping or its key.
do $$
declare
  statement_value text;
  answer_id uuid;
  answer_label text;
  answer_content text;
  solution jsonb;
begin
  select statement_markdown
  into statement_value
  from public.questions
  where id = '40000000-0000-4000-8000-000000000003';

  if statement_value <> $matrix_statement$
Calcule o determinante da matriz $\begin{pmatrix}2 & 1\\ 3 & 4\end{pmatrix}$.
$matrix_statement$ then
    raise exception 'MVP determinant statement no longer stores canonical LaTeX: %', statement_value;
  end if;

  select answer_key.correct_option_id, option_row.label, option_row.content_markdown
  into answer_id, answer_label, answer_content
  from public.question_answer_keys answer_key
  join public.question_options option_row
    on option_row.id = answer_key.correct_option_id
  where answer_key.question_id = '40000000-0000-4000-8000-000000000003';

  if answer_id <> '50000000-0000-4000-8000-000000000009'
    or answer_label <> 'A'
    or answer_content <> '$5$' then
    raise exception 'MVP determinant answer key must point to alternative A / $5$';
  end if;
end $$;

-- Check the actual learner-facing RPC as well as the stored key. This catches
-- a disagreement between a correct-looking row and the grading behavior.
begin;

insert into auth.users (id)
values ('90000000-0000-4000-8000-000000000002');

select set_config(
  'request.jwt.claim.sub',
  '90000000-0000-4000-8000-000000000002',
  true
);
set local role authenticated;

do $$
declare
  solution jsonb;
begin
  if not exists (
    select 1
    from public.submit_multiple_choice_attempt(
      '40000000-0000-4000-8000-000000000003',
      '50000000-0000-4000-8000-000000000009'
    )
    where outcome = 'correct'
  ) then
    raise exception 'MVP determinant alternative A was not graded as correct';
  end if;

  solution := public.get_question_solution(
    '40000000-0000-4000-8000-000000000003'
  );
  if solution ->> 'correctOptionId' <> '50000000-0000-4000-8000-000000000009'
    or solution ->> 'finalAnswer' <> '$5$' then
    raise exception 'MVP determinant solution disagrees with its answer key';
  end if;
end $$;

reset role;
rollback;
