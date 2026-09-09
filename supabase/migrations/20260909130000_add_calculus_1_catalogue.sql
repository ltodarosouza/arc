-- Cálculo I catalogue. This migration contains taxonomy only: questions are
-- authored and reviewed in separate original Arc batches.

insert into public.subjects (id, slug, name, description, sort_order, is_published)
values (
  '20000000-0000-4000-8000-000000000004',
  'calculo-1',
  'Cálculo I',
  'Funções, limites, derivadas e integrais.',
  1,
  true
)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published;

update public.subjects
set sort_order = case id
  when '20000000-0000-4000-8000-000000000001' then 2
  when '20000000-0000-4000-8000-000000000002' then 3
  when '20000000-0000-4000-8000-000000000003' then 4
  else sort_order
end
where id in (
  '20000000-0000-4000-8000-000000000001',
  '20000000-0000-4000-8000-000000000002',
  '20000000-0000-4000-8000-000000000003'
);

insert into public.taxonomy_nodes (
  id, subject_id, parent_id, kind, slug, name, sort_order, is_published
) values
  ('30000000-0000-4000-8000-000000000011', '20000000-0000-4000-8000-000000000004', null, 'unit', 'funcoes-e-modelos', 'Funções e modelos', 1, true),
  ('30000000-0000-4000-8000-000000000012', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000011', 'topic', 'representacoes-de-funcoes', 'Representações de funções', 1, true),
  ('30000000-0000-4000-8000-000000000013', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000011', 'topic', 'modelos-e-funcoes-elementares', 'Modelos e funções elementares', 2, true),
  ('30000000-0000-4000-8000-000000000014', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000011', 'topic', 'composicao-e-transformacoes', 'Composição e transformações', 3, true),
  ('30000000-0000-4000-8000-000000000015', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000011', 'topic', 'funcoes-inversas-e-logaritmicas', 'Funções inversas e logarítmicas', 4, true),

  ('30000000-0000-4000-8000-000000000016', '20000000-0000-4000-8000-000000000004', null, 'unit', 'limites-e-continuidade', 'Limites e continuidade', 2, true),
  ('30000000-0000-4000-8000-000000000017', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000016', 'topic', 'nocao-de-limite', 'Noção de limite', 1, true),
  ('30000000-0000-4000-8000-000000000018', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000016', 'topic', 'calculo-de-limites', 'Cálculo de limites', 2, true),
  ('30000000-0000-4000-8000-000000000019', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000016', 'topic', 'continuidade', 'Continuidade', 3, true),
  ('30000000-0000-4000-8000-000000000020', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000016', 'topic', 'limites-no-infinito-e-assintotas', 'Limites no infinito e assíntotas', 4, true),

  ('30000000-0000-4000-8000-000000000021', '20000000-0000-4000-8000-000000000004', null, 'unit', 'derivadas', 'Derivadas', 3, true),
  ('30000000-0000-4000-8000-000000000022', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000021', 'topic', 'taxa-de-variacao-e-derivada', 'Taxa de variação e derivada', 1, true),
  ('30000000-0000-4000-8000-000000000023', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000021', 'topic', 'regras-basicas-de-derivacao', 'Regras básicas de derivação', 2, true),
  ('30000000-0000-4000-8000-000000000024', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000021', 'topic', 'produto-e-quociente', 'Produto e quociente', 3, true),
  ('30000000-0000-4000-8000-000000000025', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000021', 'topic', 'regra-da-cadeia', 'Regra da cadeia', 4, true),
  ('30000000-0000-4000-8000-000000000026', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000021', 'topic', 'derivacao-implicita-e-logaritmica', 'Derivação implícita e logarítmica', 5, true),
  ('30000000-0000-4000-8000-000000000027', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000021', 'topic', 'taxas-relacionadas-e-aproximacoes', 'Taxas relacionadas e aproximações', 6, true),

  ('30000000-0000-4000-8000-000000000028', '20000000-0000-4000-8000-000000000004', null, 'unit', 'aplicacoes-de-derivadas', 'Aplicações de derivadas', 4, true),
  ('30000000-0000-4000-8000-000000000029', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000028', 'topic', 'extremos-e-valor-medio', 'Extremos e valor médio', 1, true),
  ('30000000-0000-4000-8000-000000000030', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000028', 'topic', 'analise-de-graficos', 'Análise de gráficos', 2, true),
  ('30000000-0000-4000-8000-000000000031', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000028', 'topic', 'regra-de-lhopital', 'Regra de l''Hôpital', 3, true),
  ('30000000-0000-4000-8000-000000000032', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000028', 'topic', 'otimizacao', 'Otimização', 4, true),
  ('30000000-0000-4000-8000-000000000033', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000028', 'topic', 'metodo-de-newton', 'Método de Newton', 5, true),
  ('30000000-0000-4000-8000-000000000034', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000028', 'topic', 'primitivas', 'Primitivas', 6, true),

  ('30000000-0000-4000-8000-000000000035', '20000000-0000-4000-8000-000000000004', null, 'unit', 'integrais', 'Integrais', 5, true),
  ('30000000-0000-4000-8000-000000000036', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000035', 'topic', 'integral-definida', 'Integral definida', 1, true),
  ('30000000-0000-4000-8000-000000000037', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000035', 'topic', 'teorema-fundamental-do-calculo', 'Teorema Fundamental do Cálculo', 2, true),
  ('30000000-0000-4000-8000-000000000038', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000035', 'topic', 'substituicao', 'Substituição', 3, true),

  ('30000000-0000-4000-8000-000000000039', '20000000-0000-4000-8000-000000000004', null, 'unit', 'aplicacoes-de-integrais', 'Aplicações de integrais', 6, true),
  ('30000000-0000-4000-8000-000000000040', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000039', 'topic', 'areas-entre-curvas', 'Áreas entre curvas', 1, true),
  ('30000000-0000-4000-8000-000000000041', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000039', 'topic', 'volumes', 'Volumes', 2, true),
  ('30000000-0000-4000-8000-000000000042', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000039', 'topic', 'cascas-cilindricas', 'Cascas cilíndricas', 3, true),
  ('30000000-0000-4000-8000-000000000043', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000039', 'topic', 'trabalho-e-valor-medio', 'Trabalho e valor médio', 4, true),

  ('30000000-0000-4000-8000-000000000044', '20000000-0000-4000-8000-000000000004', null, 'unit', 'tecnicas-de-integracao', 'Técnicas de integração', 7, true),
  ('30000000-0000-4000-8000-000000000045', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000044', 'topic', 'integracao-por-partes', 'Integração por partes', 1, true),
  ('30000000-0000-4000-8000-000000000046', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000044', 'topic', 'integrais-trigonometricas', 'Integrais trigonométricas', 2, true),
  ('30000000-0000-4000-8000-000000000047', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000044', 'topic', 'fracoes-parciais', 'Frações parciais', 3, true),
  ('30000000-0000-4000-8000-000000000048', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000044', 'topic', 'integrais-improprias', 'Integrais impróprias', 4, true),

  ('30000000-0000-4000-8000-000000000049', '20000000-0000-4000-8000-000000000004', null, 'unit', 'mais-aplicacoes-de-integrais', 'Mais aplicações de integrais', 8, true),
  ('30000000-0000-4000-8000-000000000050', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000049', 'topic', 'comprimento-de-arco-e-area-de-superficie', 'Comprimento de arco e área de superfície', 1, true),
  ('30000000-0000-4000-8000-000000000051', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000049', 'topic', 'modelos-em-fisica-economia-e-probabilidade', 'Modelos em física, economia e probabilidade', 2, true)
on conflict (id) do update set
  subject_id = excluded.subject_id,
  parent_id = excluded.parent_id,
  kind = excluded.kind,
  slug = excluded.slug,
  name = excluded.name,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published;
