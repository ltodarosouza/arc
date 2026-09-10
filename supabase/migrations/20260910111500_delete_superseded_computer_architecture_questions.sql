-- Mantém apenas os seis blocos revisados de Arquitetura de Computadores
-- (questões 930001–930150, fonte ...001100).
-- Remove definitivamente os 150 itens anteriores e o histórico de tentativas
-- necessário, pois question_attempts usa ON DELETE RESTRICT.
begin;

delete from public.question_attempts
where question_id in (
  select id
  from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000005'
    and source_id in (
      '10000000-0000-4000-8000-000000001001',
      '10000000-0000-4000-8000-000000001002',
      '10000000-0000-4000-8000-000000001003'
    )
);

-- Opções, gabaritos, dicas, soluções, passos, tags e redo_questions usam
-- ON DELETE CASCADE e são removidos junto com cada questão.
delete from public.questions
where subject_id = '20000000-0000-4000-8000-000000000005'
  and source_id in (
    '10000000-0000-4000-8000-000000001001',
    '10000000-0000-4000-8000-000000001002',
    '10000000-0000-4000-8000-000000001003'
  );

commit;
