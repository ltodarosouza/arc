-- Correct verified errors without rewriting previously applied migrations.
begin;
update public.question_answer_keys
set correct_option_id='50000000-0000-4000-8000-000000000129'
where question_id='40000000-0000-4000-8000-000000000033';
update public.question_solutions
set final_answer_markdown='$-1/(3x^2+5)+C$',
    explanation_markdown='Use $u=3x^2+5$, com $du=6x\,dx$. Não há fator adicional: a integral é $-u^{-1}+C$.'
where question_id='40000000-0000-4000-8000-000000000033';
-- Regrade stored attempts consistently with the corrected answer key.
update public.question_attempts
set outcome=case when selected_option_id='50000000-0000-4000-8000-000000000129'
  then 'correct'::public.attempt_outcome else 'incorrect'::public.attempt_outcome end
where question_id='40000000-0000-4000-8000-000000000033' and grading_method='automatic';
update public.question_solutions set final_answer_markdown='$\sqrt{8}$'
where question_id='40000000-0000-4000-8000-000000000027';
-- Both original substitutions were mathematically valid. Specify the target form.
update public.questions
set statement_markdown='Qual substituição transforma $\int x\sqrt{x^2+9}\,dx$ exatamente em $\frac12\int\sqrt{u}\,du$?'
where id='40000000-0000-4000-8000-000000000032';
-- The duplicate remains archived so existing learner attempts keep their meaning.
update public.questions set publication_status='archived'
where id='40000000-0000-4000-8000-000000000028';
commit;
