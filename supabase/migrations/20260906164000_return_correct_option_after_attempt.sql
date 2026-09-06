-- The answer key stays private before submission. Once the learner has an
-- attempt, the commented solution can safely identify the correct option.
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
  from question_solutions solution
  join question_answer_keys answer_key on answer_key.question_id = solution.question_id
  where solution.question_id = p_question_id
    and auth.uid() is not null
    and exists (
      select 1 from question_attempts attempt
      where attempt.question_id = p_question_id and attempt.user_id = auth.uid()
    );
$$;
