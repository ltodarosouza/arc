-- Initial, original development catalogue for validating the Supabase-backed
-- product flow. These are not a launch-ready question bank.

insert into public.question_sources (id, kind, label, licence_note)
values ('10000000-0000-4000-8000-000000000001', 'original', 'Arc development fixture', 'Original development content.')
on conflict (id) do nothing;

insert into public.subjects (id, slug, name, description, sort_order, is_published) values
  ('20000000-0000-4000-8000-000000000001', 'calculo-2', 'Cálculo II', 'Integrais, sequências e séries.', 1, true),
  ('20000000-0000-4000-8000-000000000002', 'algebra-linear', 'Álgebra Linear', 'Vetores, matrizes e transformações lineares.', 2, true),
  ('20000000-0000-4000-8000-000000000003', 'calculo-vetorial', 'Cálculo Vetorial', 'Vetores, curvas e campos.', 3, true)
on conflict (id) do nothing;

insert into public.taxonomy_nodes (id, subject_id, parent_id, kind, slug, name, sort_order, is_published) values
  ('30000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', null, 'unit', 'integrais', 'Integrais', 1, true),
  ('30000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 'topic', 'substituicao', 'Substituição', 1, true),
  ('30000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000002', 'subtopic', 'mudanca-de-variavel', 'Mudança de variável', 1, true),
  ('30000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 'topic', 'integral-definida', 'Integral definida', 2, true),
  ('30000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000001', null, 'unit', 'sequencias-e-series', 'Sequências e séries', 2, true),
  ('30000000-0000-4000-8000-000000000006', '20000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000005', 'topic', 'series-geometricas', 'Séries geométricas', 1, true),
  ('30000000-0000-4000-8000-000000000007', '20000000-0000-4000-8000-000000000002', null, 'unit', 'matrizes-e-sistemas', 'Matrizes e sistemas', 1, true),
  ('30000000-0000-4000-8000-000000000008', '20000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000007', 'topic', 'determinantes', 'Determinantes', 1, true),
  ('30000000-0000-4000-8000-000000000009', '20000000-0000-4000-8000-000000000002', null, 'unit', 'transformacoes-lineares', 'Transformações lineares', 2, true),
  ('30000000-0000-4000-8000-000000000010', '20000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000009', 'topic', 'autovalores-e-autovetores', 'Autovalores e autovetores', 1, true)
on conflict (id) do nothing;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values
  ('40000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'multiple_choice', 'easy', 'published', 'Calcule $\\int 2x\\cos(x^2)\\,dx$.'),
  ('40000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'multiple_choice', 'medium', 'published', 'Determine se a série $\\sum_{n=0}^{\\infty} (1/3)^n$ converge e, caso convirja, calcule sua soma.'),
  ('40000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', 'multiple_choice', 'easy', 'published', 'Qual é o determinante da matriz $\\begin{pmatrix}2 & 1\\\\ 3 & 4\\end{pmatrix}$?')
on conflict (id) do nothing;

insert into public.question_options (id, question_id, label, content_markdown, sort_order) values
  ('50000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001', 'A', '$\\sen(x^2) + C$', 1),
  ('50000000-0000-4000-8000-000000000002', '40000000-0000-4000-8000-000000000001', 'B', '$2\\sen(x) + C$', 2),
  ('50000000-0000-4000-8000-000000000003', '40000000-0000-4000-8000-000000000001', 'C', '$x^2\\sen(x^2) + C$', 3),
  ('50000000-0000-4000-8000-000000000004', '40000000-0000-4000-8000-000000000001', 'D', '$-2\\cos(x^2) + C$', 4),
  ('50000000-0000-4000-8000-000000000005', '40000000-0000-4000-8000-000000000002', 'A', 'A série converge e sua soma é $1/2$.', 1),
  ('50000000-0000-4000-8000-000000000006', '40000000-0000-4000-8000-000000000002', 'B', 'A série converge e sua soma é $1$.', 2),
  ('50000000-0000-4000-8000-000000000007', '40000000-0000-4000-8000-000000000002', 'C', 'A série converge e sua soma é $3/2$.', 3),
  ('50000000-0000-4000-8000-000000000008', '40000000-0000-4000-8000-000000000002', 'D', 'A série não converge por possuir infinitos termos.', 4),
  ('50000000-0000-4000-8000-000000000009', '40000000-0000-4000-8000-000000000003', 'A', '$5$', 1),
  ('50000000-0000-4000-8000-000000000010', '40000000-0000-4000-8000-000000000003', 'B', '$8$', 2),
  ('50000000-0000-4000-8000-000000000011', '40000000-0000-4000-8000-000000000003', 'C', '$11$', 3),
  ('50000000-0000-4000-8000-000000000012', '40000000-0000-4000-8000-000000000003', 'D', '$-5$', 4)
on conflict (id) do nothing;

insert into public.question_answer_keys (question_id, correct_option_id) values
  ('40000000-0000-4000-8000-000000000001', '50000000-0000-4000-8000-000000000001'),
  ('40000000-0000-4000-8000-000000000002', '50000000-0000-4000-8000-000000000007'),
  ('40000000-0000-4000-8000-000000000003', '50000000-0000-4000-8000-000000000009')
on conflict (question_id) do nothing;

insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values
  ('40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000002', true),
  ('40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000003', false),
  ('40000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000006', true),
  ('40000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000008', true)
on conflict do nothing;

insert into public.question_hints (id, question_id, content_markdown, sort_order) values
  ('60000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001', 'Observe que a derivada de $x^2$ aparece no integrando.', 1),
  ('60000000-0000-4000-8000-000000000002', '40000000-0000-4000-8000-000000000002', 'Compare com a fórmula de uma série geométrica de razão $r$.', 1)
on conflict (id) do nothing;

insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values
  ('40000000-0000-4000-8000-000000000001', '$\\sen(x^2) + C$', 'Use a substituição $u = x^2$.'),
  ('40000000-0000-4000-8000-000000000002', 'A série converge e sua soma é $3/2$.', 'A razão é $r=1/3$, portanto $|r|<1$.'),
  ('40000000-0000-4000-8000-000000000003', '$5$', '$2\\cdot4 - 1\\cdot3 = 5$.')
on conflict (question_id) do nothing;

insert into public.question_solution_steps (id, question_id, content_markdown, sort_order) values
  ('70000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001', 'Com $u=x^2$, temos $du=2x\\,dx$.', 1),
  ('70000000-0000-4000-8000-000000000002', '40000000-0000-4000-8000-000000000001', 'Logo, $\\int 2x\\cos(x^2)\\,dx = \\int\\cos(u)\\,du = \\sen(u)+C$.', 2),
  ('70000000-0000-4000-8000-000000000003', '40000000-0000-4000-8000-000000000002', '$\\sum_{n=0}^{\\infty}(1/3)^n=1/(1-1/3)=3/2$.', 1),
  ('70000000-0000-4000-8000-000000000004', '40000000-0000-4000-8000-000000000003', '$2\\cdot4 - 1\\cdot3 = 5$.', 1)
on conflict (id) do nothing;
