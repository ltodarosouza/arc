-- Preserva tentativas e remove da vitrine apenas as questões antigas desta disciplina.
begin;
update public.questions set publication_status='draft' where subject_id='20000000-0000-4000-8000-000000000005' and id like '40000000-0000-4000-8000-000000920%';
commit;
