-- Limpeza final do banco anterior de Cálculo I.
-- Execute somente depois de importar os dois lotes renovados (250 questões).
-- A guarda abaixo impede uma exclusão parcial em caso de importação incompleta.

do $$
declare
  renewed_count integer;
begin
  select count(*) into renewed_count
  from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000004'
    and publication_status = 'published'
    and source_id in (
      '10000000-0000-4000-8000-000000000242',
      '10000000-0000-4000-8000-000000000243'
    );

  if renewed_count <> 250 then
    raise exception 'Limpeza interrompida: esperadas 250 questões renovadas de Cálculo I; encontradas %.', renewed_count;
  end if;
end;
$$;

begin;

-- As tentativas dependem das questões antigas e precisam sair antes delas.
delete from public.question_attempts
where question_id in (
  select id from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000004'
    and publication_status = 'draft'
);

delete from public.questions
where subject_id = '20000000-0000-4000-8000-000000000004'
  and publication_status = 'draft';

delete from public.question_sources
where label like 'Arc original Cálculo I%'
  and id not in (
    '10000000-0000-4000-8000-000000000242',
    '10000000-0000-4000-8000-000000000243'
  )
  and not exists (
    select 1 from public.questions where source_id = public.question_sources.id
  );

commit;
