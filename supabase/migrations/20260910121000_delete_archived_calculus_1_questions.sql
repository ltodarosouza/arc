-- Remoção definitiva das versões arquivadas de Cálculo I.
-- As tentativas e marcações de refazer precisam sair antes, pois questions é
-- referenciada por elas com ON DELETE RESTRICT/CASCADE conforme o caso.
begin;

with archived_calculus_one_questions as (
  select id
  from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000004'
    and publication_status = 'archived'
)
delete from public.redo_questions
where question_id in (select id from archived_calculus_one_questions);

with archived_calculus_one_questions as (
  select id
  from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000004'
    and publication_status = 'archived'
)
delete from public.question_attempts
where question_id in (select id from archived_calculus_one_questions);

delete from public.questions
where subject_id = '20000000-0000-4000-8000-000000000004'
  and publication_status = 'archived';

commit;
