-- Remove definitivamente o banco vetorial anterior após a publicação do banco diverso.
-- Pré-requisito: execute antes as três partes de calculo-vetorial-diverso.
-- Esta operação remove também tentativas e marcações de refazer vinculadas às questões antigas.

begin;

do $$
declare
  refreshed_question_count integer;
begin
  select count(*) into refreshed_question_count
  from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000003'
    and publication_status = 'published'
    and source_id in (
      '10000000-0000-4000-8000-000000000232',
      '10000000-0000-4000-8000-000000000233',
      '10000000-0000-4000-8000-000000000234',
      '10000000-0000-4000-8000-000000000235',
      '10000000-0000-4000-8000-000000000236'
    );

  if refreshed_question_count <> 250 then
    raise exception 'Limpeza cancelada: esperadas 250 questões novas de Cálculo Vetorial publicadas; encontradas %.', refreshed_question_count;
  end if;
end;
$$;

-- O vínculo de tentativas com a questão é restritivo, portanto estas tentativas
-- precisam ser removidas antes das questões que deixaram de fazer parte do banco.
delete from public.question_attempts
where question_id in (
  select id
  from public.questions
  where subject_id = '20000000-0000-4000-8000-000000000003'
    and publication_status = 'draft'
);

-- Opções, gabaritos, tags, dicas, soluções, passos e marcações de refazer
-- vinculados às perguntas são removidos pelas chaves estrangeiras em cascata.
delete from public.questions
where subject_id = '20000000-0000-4000-8000-000000000003'
  and publication_status = 'draft';

-- Remove apenas fontes autorais vetoriais que não tenham qualquer questão restante.
delete from public.question_sources source_row
where source_row.label like 'Arc original Cálculo Vetorial%'
  and not exists (
    select 1
    from public.questions question_row
    where question_row.source_id = source_row.id
  );

commit;
