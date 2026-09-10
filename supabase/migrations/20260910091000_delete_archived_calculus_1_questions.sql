-- Remove definitivamente o banco anterior de Cálculo I após a publicação
-- do banco discursivo de 125 questões em 20260910090000.
-- A remoção das tentativas é necessária porque question_attempts usa
-- ON DELETE RESTRICT para preservar o histórico em operações não destrutivas.
begin;

with archived_calculus_one_questions as (
  select id
  from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000004'
    and publication_status = 'archived'
)
delete from public.question_attempts
where question_id in (select id from archived_calculus_one_questions);

with archived_calculus_one_questions as (
  select id
  from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000004'
    and publication_status = 'archived'
)
delete from public.redo_questions
where question_id in (select id from archived_calculus_one_questions);

delete from public.questions
where subject_id = '20000000-0000-4000-8000-000000000004'
  and publication_status = 'archived';

commit;
