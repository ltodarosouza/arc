-- Preserva tentativas e remove da vitrine apenas as questões antigas desta disciplina.
begin;
update public.questions
set publication_status='draft'
where subject_id='20000000-0000-4000-8000-000000000005'
  and source_id in (
    '10000000-0000-4000-8000-000000001001',
    '10000000-0000-4000-8000-000000001002',
    '10000000-0000-4000-8000-000000001003'
  );
commit;
