-- #117: SECURITY DEFINER functions must enforce the same publication boundary
-- as catalogue reads. RLS is intentionally bypassed by these functions.

create or replace function public.submit_multiple_choice_attempt(p_question_id uuid, p_selected_option_id uuid)
returns table (attempt_id uuid, outcome public.attempt_outcome)
language plpgsql security definer set search_path = public
as $$
declare
  v_correct_option_id uuid;
  v_outcome public.attempt_outcome;
  v_attempt_id uuid;
begin
  if auth.uid() is null then raise exception 'Authentication is required.'; end if;
  if not exists (
    select 1 from questions
    where id = p_question_id and publication_status = 'published'
  ) then
    raise exception 'Question is not available.';
  end if;

  select answer_key.correct_option_id into v_correct_option_id
  from question_answer_keys answer_key
  join question_options option_row on option_row.id = p_selected_option_id
  where answer_key.question_id = p_question_id and option_row.question_id = p_question_id;
  if v_correct_option_id is null then raise exception 'Invalid question or answer option.'; end if;

  v_outcome := case when p_selected_option_id = v_correct_option_id then 'correct' else 'incorrect' end;
  insert into question_attempts (user_id, question_id, selected_option_id, outcome, grading_method)
    values (auth.uid(), p_question_id, p_selected_option_id, v_outcome, 'automatic') returning id into v_attempt_id;

  if v_outcome = 'incorrect' then
    insert into redo_questions (user_id, question_id) values (auth.uid(), p_question_id)
    on conflict (user_id, question_id) do nothing;
  else
    delete from redo_questions where user_id = auth.uid() and question_id = p_question_id;
  end if;

  return query select v_attempt_id, v_outcome;
end;
$$;

create or replace function public.record_reveal_answer_attempt(p_question_id uuid, p_self_assessment public.self_assessment)
returns table (attempt_id uuid, outcome public.attempt_outcome)
language plpgsql security definer set search_path = public
as $$
declare
  v_outcome public.attempt_outcome;
  v_method public.attempt_grading_method;
  v_attempt_id uuid;
begin
  if auth.uid() is null then raise exception 'Authentication is required.'; end if;
  if not exists (
    select 1 from questions
    where id = p_question_id
      and kind = 'reveal_answer'
      and publication_status = 'published'
  ) then
    raise exception 'Question is not available.';
  end if;

  v_outcome := case when p_self_assessment = 'correct' then 'correct' when p_self_assessment = 'incorrect' then 'incorrect' else 'revealed' end;
  v_method := case when p_self_assessment = 'not_assessed' then 'unscored' else 'self_assessed' end;
  insert into question_attempts (user_id, question_id, self_assessment, outcome, grading_method)
    values (auth.uid(), p_question_id, p_self_assessment, v_outcome, v_method) returning id into v_attempt_id;
  return query select v_attempt_id, v_outcome;
end;
$$;

create or replace function public.get_question_solution(p_question_id uuid)
returns jsonb
language sql security definer set search_path = public
as $$
  select jsonb_build_object(
    'finalAnswer', solution.final_answer_markdown,
    'explanation', solution.explanation_markdown,
    'correctOptionId', answer_key.correct_option_id,
    'steps', coalesce((
      select jsonb_agg(jsonb_build_object('id', step.id, 'title', step.title, 'content', step.content_markdown, 'sortOrder', step.sort_order) order by step.sort_order)
      from question_solution_steps step where step.question_id = solution.question_id
    ), '[]'::jsonb)
  )
  from questions question_row
  join question_solutions solution on solution.question_id = question_row.id
  join question_answer_keys answer_key on answer_key.question_id = question_row.id
  where question_row.id = p_question_id
    and question_row.publication_status = 'published'
    and auth.uid() is not null
    and exists (
      select 1 from question_attempts attempt
      where attempt.question_id = p_question_id and attempt.user_id = auth.uid()
    );
$$;
