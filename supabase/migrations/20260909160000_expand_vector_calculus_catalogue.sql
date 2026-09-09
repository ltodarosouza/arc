-- Catálogo enxuto de Cálculo Vetorial; tópicos recebem os lotes autorais seguintes.
begin;

insert into public.taxonomy_nodes (id, subject_id, parent_id, kind, slug, name, sort_order, is_published) values
  ('30000000-0000-4000-8000-000000000201', '20000000-0000-4000-8000-000000000003', null, 'unit', 'vetores-e-coordenadas', 'Vetores e coordenadas', 1, true),
  ('30000000-0000-4000-8000-000000000202', '20000000-0000-4000-8000-000000000003', null, 'unit', 'operacoes-e-modulo', 'Operações e módulo', 2, true),
  ('30000000-0000-4000-8000-000000000203', '20000000-0000-4000-8000-000000000003', null, 'unit', 'produtos-e-projecoes', 'Produtos e projeções', 3, true),
  ('30000000-0000-4000-8000-000000000204', '20000000-0000-4000-8000-000000000003', null, 'unit', 'retas-e-planos', 'Retas e planos', 4, true),
  ('30000000-0000-4000-8000-000000000205', '20000000-0000-4000-8000-000000000003', null, 'unit', 'metricas-espaciais', 'Métricas espaciais', 5, true),
  ('30000000-0000-4000-8000-000000000206', '20000000-0000-4000-8000-000000000003', null, 'unit', 'posicoes-relativas', 'Posições relativas', 6, true),
  ('30000000-0000-4000-8000-000000000207', '20000000-0000-4000-8000-000000000003', null, 'unit', 'geometria-espacial', 'Geometria espacial', 7, true),
  ('30000000-0000-4000-8000-000000000208', '20000000-0000-4000-8000-000000000003', null, 'unit', 'quadricas', 'Quádricas', 8, true),
  ('30000000-0000-4000-8000-000000000209', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000201', 'topic', 'componentes-e-base', 'Componentes e base', 1, true),
  ('30000000-0000-4000-8000-000000000210', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000202', 'topic', 'norma-e-versores', 'Norma e versores', 1, true),
  ('30000000-0000-4000-8000-000000000211', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000203', 'topic', 'produto-escalar-e-projecao', 'Produto escalar e projeção', 1, true),
  ('30000000-0000-4000-8000-000000000212', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000203', 'topic', 'produto-vetorial-e-misto', 'Produto vetorial e misto', 2, true),
  ('30000000-0000-4000-8000-000000000213', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000204', 'topic', 'equacoes-de-retas', 'Equações de retas', 1, true),
  ('30000000-0000-4000-8000-000000000214', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000204', 'topic', 'equacoes-de-planos', 'Equações de planos', 2, true),
  ('30000000-0000-4000-8000-000000000215', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000205', 'topic', 'distancias-e-angulos', 'Distâncias e ângulos', 1, true),
  ('30000000-0000-4000-8000-000000000216', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000206', 'topic', 'paralelismo-e-intersecao', 'Paralelismo e interseção', 1, true),
  ('30000000-0000-4000-8000-000000000217', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000207', 'topic', 'volumes-e-areas', 'Volumes e áreas', 1, true),
  ('30000000-0000-4000-8000-000000000218', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000208', 'topic', 'classificacao-de-quadricas', 'Classificação de quádricas', 1, true)
on conflict (id) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, is_published = excluded.is_published;

commit;
