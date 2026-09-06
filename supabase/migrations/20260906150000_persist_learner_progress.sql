-- Keep the learner's redo queue consistent with the most recent automatic
-- result while preserving every attempt in the historical table.

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
