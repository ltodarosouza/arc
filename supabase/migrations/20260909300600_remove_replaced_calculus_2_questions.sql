-- Remove definitivamente o banco anterior de Cálculo II depois da importação
-- dos cinco lotes abertos. As tentativas vinculadas aos itens substituídos são
-- removidas porque question_attempts usa uma chave estrangeira restritiva.
begin;

delete from public.question_attempts
where question_id in (
  select id
  from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000001'
    and coalesce(source_id::text, '') not in (
      '10000000-0000-4000-8000-000000000282',
      '10000000-0000-4000-8000-000000000283',
      '10000000-0000-4000-8000-000000000284',
      '10000000-0000-4000-8000-000000000285',
      '10000000-0000-4000-8000-000000000286'
    )
);

delete from public.questions
where subject_id = '20000000-0000-4000-8000-000000000001'
  and coalesce(source_id::text, '') not in (
    '10000000-0000-4000-8000-000000000282',
    '10000000-0000-4000-8000-000000000283',
    '10000000-0000-4000-8000-000000000284',
    '10000000-0000-4000-8000-000000000285',
    '10000000-0000-4000-8000-000000000286'
  );

commit;
