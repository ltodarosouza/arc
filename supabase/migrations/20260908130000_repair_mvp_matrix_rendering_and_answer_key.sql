-- Repair the published determinant question without relying on PostgreSQL's
-- interpretation of backslashes inside ordinary string literals.
begin;

update public.questions
set statement_markdown = $matrix_statement$
Calcule o determinante da matriz $\begin{pmatrix}2 & 1\\ 3 & 4\end{pmatrix}$.
$matrix_statement$
where id = '40000000-0000-4000-8000-000000000003';

update public.question_answer_keys
set correct_option_id = '50000000-0000-4000-8000-000000000009'
where question_id = '40000000-0000-4000-8000-000000000003';

update public.question_solutions
set
  final_answer_markdown = '$5$',
  explanation_markdown = $matrix_explanation$
Para uma matriz $2\times2$, o determinante é o produto da diagonal principal menos o produto da diagonal secundária.
$matrix_explanation$
where question_id = '40000000-0000-4000-8000-000000000003';

update public.question_solution_steps
set content_markdown = $matrix_step$
$\det\begin{pmatrix}2 & 1\\ 3 & 4\end{pmatrix}=2\cdot4-1\cdot3=8-3=5$.
$matrix_step$
where id = '70000000-0000-4000-8000-000000000004';

-- Stored attempts are historical, but their automatic outcome must agree with
-- the repaired answer key so progress and review do not contradict the result.
update public.question_attempts
set outcome = case
  when selected_option_id = '50000000-0000-4000-8000-000000000009'
    then 'correct'::public.attempt_outcome
  else 'incorrect'::public.attempt_outcome
end
where question_id = '40000000-0000-4000-8000-000000000003'
  and grading_method = 'automatic';

commit;
