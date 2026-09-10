-- Remove o banco anterior de Cálculo II. Execute antes dos três blocos de
-- reconstrução de 2026 para que permaneçam somente os itens novos.
begin;

delete from public.question_attempts
where question_id in (
  select id from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000001'
);

delete from public.questions
where subject_id = '20000000-0000-4000-8000-000000000001';

commit;
