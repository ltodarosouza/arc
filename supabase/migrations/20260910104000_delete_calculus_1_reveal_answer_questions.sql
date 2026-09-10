-- Cálculo I mantém exclusivamente questões de múltipla escolha.
-- A exclusão é definitiva e inclui o histórico de tentativas das questões
-- abertas, necessário porque question_attempts usa ON DELETE RESTRICT.
begin;

with reveal_answer_questions as (
  select id
  from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000004'
    and kind = 'reveal_answer'
)
delete from public.question_attempts
where question_id in (select id from reveal_answer_questions);

delete from public.questions
where subject_id = '20000000-0000-4000-8000-000000000004'
  and kind = 'reveal_answer';

commit;
