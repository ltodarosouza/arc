-- Reorganiza Cálculo I em seis áreas focadas em funções, limites e derivadas.
-- Todo conteúdo de integrais passa a pertencer a Cálculo II.

begin;

-- A disciplina deixa explícito que integrais pertencem à sequência de Cálculo II.
update public.subjects
set description = 'Funções, limites, derivadas e suas aplicações.'
where id = '20000000-0000-4000-8000-000000000004';

-- Mantém seis áreas principais em Cálculo I: funções, limites, derivadas,
-- otimização, gráficos e taxas/métodos numéricos.
update public.taxonomy_nodes
set name = 'Máximos, mínimos e otimização', slug = 'maximos-minimos-e-otimizacao', sort_order = 4
where id = '30000000-0000-4000-8000-000000000028';

insert into public.taxonomy_nodes (id, subject_id, parent_id, kind, slug, name, sort_order, is_published)
values
  ('30000000-0000-4000-8000-000000000052', '20000000-0000-4000-8000-000000000004', null, 'unit', 'analise-de-graficos', 'Análise de gráficos', 5, true),
  ('30000000-0000-4000-8000-000000000053', '20000000-0000-4000-8000-000000000004', null, 'unit', 'taxas-e-metodos-numericos', 'Taxas e métodos numéricos', 6, true)
on conflict (id) do update set
  subject_id = excluded.subject_id,
  parent_id = excluded.parent_id,
  kind = excluded.kind,
  slug = excluded.slug,
  name = excluded.name,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published;

update public.taxonomy_nodes
set parent_id = '30000000-0000-4000-8000-000000000016', sort_order = 5
where id = '30000000-0000-4000-8000-000000000031';

update public.taxonomy_nodes
set parent_id = '30000000-0000-4000-8000-000000000053', sort_order = 1
where id = '30000000-0000-4000-8000-000000000022';

update public.taxonomy_nodes
set parent_id = '30000000-0000-4000-8000-000000000053', sort_order = 2
where id = '30000000-0000-4000-8000-000000000027';

update public.taxonomy_nodes
set parent_id = '30000000-0000-4000-8000-000000000053', sort_order = 3
where id = '30000000-0000-4000-8000-000000000033';

update public.taxonomy_nodes
set parent_id = '30000000-0000-4000-8000-000000000052', sort_order = 1
where id = '30000000-0000-4000-8000-000000000030';

-- As perguntas C1 marcadas como integrais passam para Cálculo II.
update public.questions
set subject_id = '20000000-0000-4000-8000-000000000001'
where id in (
  select question_id
  from public.question_taxonomy_tags
  where taxonomy_node_id in (
    '30000000-0000-4000-8000-000000000034',
    '30000000-0000-4000-8000-000000000036',
    '30000000-0000-4000-8000-000000000037',
    '30000000-0000-4000-8000-000000000038',
    '30000000-0000-4000-8000-000000000040',
    '30000000-0000-4000-8000-000000000041',
    '30000000-0000-4000-8000-000000000042',
    '30000000-0000-4000-8000-000000000043',
    '30000000-0000-4000-8000-000000000045',
    '30000000-0000-4000-8000-000000000046',
    '30000000-0000-4000-8000-000000000047',
    '30000000-0000-4000-8000-000000000048',
    '30000000-0000-4000-8000-000000000050',
    '30000000-0000-4000-8000-000000000051'
  )
);

-- Reaproveita os tópicos de integrais já existentes em Cálculo II quando há
-- equivalência direta, para evitar duas taxonomias para o mesmo conceito.
update public.question_taxonomy_tags
set taxonomy_node_id = (case taxonomy_node_id::text
  when '30000000-0000-4000-8000-000000000034' then '30000000-0000-4000-8000-000000000015'
  when '30000000-0000-4000-8000-000000000036' then '30000000-0000-4000-8000-000000000004'
  when '30000000-0000-4000-8000-000000000037' then '30000000-0000-4000-8000-000000000016'
  when '30000000-0000-4000-8000-000000000038' then '30000000-0000-4000-8000-000000000002'
  when '30000000-0000-4000-8000-000000000045' then '30000000-0000-4000-8000-000000000011'
  when '30000000-0000-4000-8000-000000000046' then '30000000-0000-4000-8000-000000000102'
  when '30000000-0000-4000-8000-000000000047' then '30000000-0000-4000-8000-000000000101'
end)::uuid
where taxonomy_node_id in (
  '30000000-0000-4000-8000-000000000034',
  '30000000-0000-4000-8000-000000000036',
  '30000000-0000-4000-8000-000000000037',
  '30000000-0000-4000-8000-000000000038',
  '30000000-0000-4000-8000-000000000045',
  '30000000-0000-4000-8000-000000000046',
  '30000000-0000-4000-8000-000000000047'
);

-- Os tópicos de aplicação sem equivalente anterior passam para a única área
-- de Integrais em Cálculo II.
update public.taxonomy_nodes
set subject_id = '20000000-0000-4000-8000-000000000001',
    parent_id = '30000000-0000-4000-8000-000000000001',
    sort_order = case id
      when '30000000-0000-4000-8000-000000000040' then 10
      when '30000000-0000-4000-8000-000000000041' then 11
      when '30000000-0000-4000-8000-000000000042' then 12
      when '30000000-0000-4000-8000-000000000043' then 13
      when '30000000-0000-4000-8000-000000000048' then 14
      when '30000000-0000-4000-8000-000000000050' then 15
      when '30000000-0000-4000-8000-000000000051' then 16
    end
where id in (
  '30000000-0000-4000-8000-000000000040',
  '30000000-0000-4000-8000-000000000041',
  '30000000-0000-4000-8000-000000000042',
  '30000000-0000-4000-8000-000000000043',
  '30000000-0000-4000-8000-000000000048',
  '30000000-0000-4000-8000-000000000050',
  '30000000-0000-4000-8000-000000000051'
);

-- Remove os antigos nós redundantes de integrais de Cálculo I.
delete from public.taxonomy_nodes
where id in (
  '30000000-0000-4000-8000-000000000034',
  '30000000-0000-4000-8000-000000000036',
  '30000000-0000-4000-8000-000000000037',
  '30000000-0000-4000-8000-000000000038',
  '30000000-0000-4000-8000-000000000045',
  '30000000-0000-4000-8000-000000000046',
  '30000000-0000-4000-8000-000000000047',
  '30000000-0000-4000-8000-000000000035',
  '30000000-0000-4000-8000-000000000039',
  '30000000-0000-4000-8000-000000000044',
  '30000000-0000-4000-8000-000000000049'
);

commit;
