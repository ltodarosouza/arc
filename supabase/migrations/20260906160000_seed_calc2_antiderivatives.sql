-- First reviewed content batch for Cálculo II. Every item in this migration is
-- original Arc content; it is intentionally independent of protected exercise
-- banks. The seven questions complete the launch-map minimum for the topic.

insert into public.question_sources (
  id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at
) values (
  '10000000-0000-4000-8000-000000000002',
  'original',
  'Arc original Cálculo II — antiderivadas',
  'Conteúdo original produzido para a Arc; publicação e adaptação autorizadas pela própria Arc.',
  'Arc',
  'approved',
  'Equipe editorial Arc',
  '2026-09-06T00:00:00Z'
)
on conflict (id) do nothing;

insert into public.taxonomy_nodes (
  id, subject_id, parent_id, kind, slug, name, sort_order, is_published
) values (
    '30000000-0000-4000-8000-000000000015',
    '20000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000001',
    'topic',
    'antiderivadas-e-integrais-indefinidas',
    'Antiderivadas e integrais indefinidas',
    1,
    true
)
on conflict (id) do nothing;

insert into public.questions (
  id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown
) values
  (
    '40000000-0000-4000-8000-000000000011',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000002',
    'multiple_choice',
    'easy',
    'published',
    'Uma primitiva de $6x^5-4x+3$ é:'
  ),
  (
    '40000000-0000-4000-8000-000000000012',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000002',
    'multiple_choice',
    'easy',
    'published',
    'No intervalo $x>0$, uma primitiva de $1/x$ é:'
  ),
  (
    '40000000-0000-4000-8000-000000000013',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000002',
    'multiple_choice',
    'medium',
    'published',
    'Calcule $\\int (4\\sqrt{x}-3/x^2)\\,dx$.'
  ),
  (
    '40000000-0000-4000-8000-000000000014',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000002',
    'multiple_choice',
    'medium',
    'published',
    'Uma primitiva de $e^{2x}$ é:'
  ),
  (
    '40000000-0000-4000-8000-000000000015',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000002',
    'multiple_choice',
    'medium',
    'published',
    'Se $F$ é uma primitiva de $f$, qual expressão também é necessariamente uma primitiva de $f$?'
  ),
  (
    '40000000-0000-4000-8000-000000000016',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000002',
    'multiple_choice',
    'medium',
    'published',
    'Calcule $\\int (3\\cos x-2\\sen x)\\,dx$.'
  ),
  (
    '40000000-0000-4000-8000-000000000017',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000002',
    'multiple_choice',
    'hard',
    'published',
    'Se $F''(x)=3x^2-2/x^2$ para $x>0$ e $F(1)=4$, então $F(2)$ vale:'
  )
on conflict (id) do nothing;

insert into public.question_options (id, question_id, label, content_markdown, sort_order) values
  ('50000000-0000-4000-8000-000000000041', '40000000-0000-4000-8000-000000000011', 'A', '$x^6-2x^2+3x+C$', 1),
  ('50000000-0000-4000-8000-000000000042', '40000000-0000-4000-8000-000000000011', 'B', '$6x^6-4x^2+3x+C$', 2),
  ('50000000-0000-4000-8000-000000000043', '40000000-0000-4000-8000-000000000011', 'C', '$x^6-4x^2+3+C$', 3),
  ('50000000-0000-4000-8000-000000000044', '40000000-0000-4000-8000-000000000011', 'D', '$5x^6-2x^2+3x+C$', 4),
  ('50000000-0000-4000-8000-000000000045', '40000000-0000-4000-8000-000000000012', 'A', '$1/x+C$', 1),
  ('50000000-0000-4000-8000-000000000046', '40000000-0000-4000-8000-000000000012', 'B', '$\\ln x+C$', 2),
  ('50000000-0000-4000-8000-000000000047', '40000000-0000-4000-8000-000000000012', 'C', '$x+C$', 3),
  ('50000000-0000-4000-8000-000000000048', '40000000-0000-4000-8000-000000000012', 'D', '$-1/x+C$', 4),
  ('50000000-0000-4000-8000-000000000049', '40000000-0000-4000-8000-000000000013', 'A', '$\\frac{8}{3}x^{3/2}-\\frac{3}{x}+C$', 1),
  ('50000000-0000-4000-8000-000000000050', '40000000-0000-4000-8000-000000000013', 'B', '$2x^{3/2}-3x^{-1}+C$', 2),
  ('50000000-0000-4000-8000-000000000051', '40000000-0000-4000-8000-000000000013', 'C', '$\\frac{8}{3}x^{3/2}+3x^{-1}+C$', 3),
  ('50000000-0000-4000-8000-000000000052', '40000000-0000-4000-8000-000000000013', 'D', '$\\frac{8}{3}x^{1/2}+3x^{-1}+C$', 4),
  ('50000000-0000-4000-8000-000000000053', '40000000-0000-4000-8000-000000000014', 'A', '$e^{2x}+C$', 1),
  ('50000000-0000-4000-8000-000000000054', '40000000-0000-4000-8000-000000000014', 'B', '$2e^{2x}+C$', 2),
  ('50000000-0000-4000-8000-000000000055', '40000000-0000-4000-8000-000000000014', 'C', '$\\frac{1}{2}e^{2x}+C$', 3),
  ('50000000-0000-4000-8000-000000000056', '40000000-0000-4000-8000-000000000014', 'D', '$\\frac{1}{2}xe^{2x}+C$', 4),
  ('50000000-0000-4000-8000-000000000057', '40000000-0000-4000-8000-000000000015', 'A', '$F(x)+7$', 1),
  ('50000000-0000-4000-8000-000000000058', '40000000-0000-4000-8000-000000000015', 'B', '$7F(x)$', 2),
  ('50000000-0000-4000-8000-000000000059', '40000000-0000-4000-8000-000000000015', 'C', '$F(x)+x$', 3),
  ('50000000-0000-4000-8000-000000000060', '40000000-0000-4000-8000-000000000015', 'D', '$F(x)^2$', 4),
  ('50000000-0000-4000-8000-000000000061', '40000000-0000-4000-8000-000000000016', 'A', '$3\\sen x+2\\cos x+C$', 1),
  ('50000000-0000-4000-8000-000000000062', '40000000-0000-4000-8000-000000000016', 'B', '$3\\sen x-2\\cos x+C$', 2),
  ('50000000-0000-4000-8000-000000000063', '40000000-0000-4000-8000-000000000016', 'C', '$-3\\sen x+2\\cos x+C$', 3),
  ('50000000-0000-4000-8000-000000000064', '40000000-0000-4000-8000-000000000016', 'D', '$3\\cos x-2\\sen x+C$', 4),
  ('50000000-0000-4000-8000-000000000065', '40000000-0000-4000-8000-000000000017', 'A', '$7$', 1),
  ('50000000-0000-4000-8000-000000000066', '40000000-0000-4000-8000-000000000017', 'B', '$9$', 2),
  ('50000000-0000-4000-8000-000000000067', '40000000-0000-4000-8000-000000000017', 'C', '$10$', 3),
  ('50000000-0000-4000-8000-000000000068', '40000000-0000-4000-8000-000000000017', 'D', '$12$', 4)
on conflict (id) do nothing;

insert into public.question_answer_keys (question_id, correct_option_id) values
  ('40000000-0000-4000-8000-000000000011', '50000000-0000-4000-8000-000000000041'),
  ('40000000-0000-4000-8000-000000000012', '50000000-0000-4000-8000-000000000046'),
  ('40000000-0000-4000-8000-000000000013', '50000000-0000-4000-8000-000000000051'),
  ('40000000-0000-4000-8000-000000000014', '50000000-0000-4000-8000-000000000055'),
  ('40000000-0000-4000-8000-000000000015', '50000000-0000-4000-8000-000000000057'),
  ('40000000-0000-4000-8000-000000000016', '50000000-0000-4000-8000-000000000061'),
  ('40000000-0000-4000-8000-000000000017', '50000000-0000-4000-8000-000000000067')
on conflict (question_id) do nothing;

insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values
  ('40000000-0000-4000-8000-000000000011', '30000000-0000-4000-8000-000000000015', true),
  ('40000000-0000-4000-8000-000000000012', '30000000-0000-4000-8000-000000000015', true),
  ('40000000-0000-4000-8000-000000000013', '30000000-0000-4000-8000-000000000015', true),
  ('40000000-0000-4000-8000-000000000014', '30000000-0000-4000-8000-000000000015', true),
  ('40000000-0000-4000-8000-000000000015', '30000000-0000-4000-8000-000000000015', true),
  ('40000000-0000-4000-8000-000000000016', '30000000-0000-4000-8000-000000000015', true),
  ('40000000-0000-4000-8000-000000000017', '30000000-0000-4000-8000-000000000015', true)
on conflict do nothing;

insert into public.question_hints (id, question_id, content_markdown, sort_order) values
  ('60000000-0000-4000-8000-000000000010', '40000000-0000-4000-8000-000000000011', 'Integre cada parcela separadamente usando a regra da potência.', 1),
  ('60000000-0000-4000-8000-000000000011', '40000000-0000-4000-8000-000000000012', 'Lembre qual função tem derivada igual a $1/x$ quando $x>0$.', 1),
  ('60000000-0000-4000-8000-000000000012', '40000000-0000-4000-8000-000000000013', 'Reescreva $\\sqrt{x}$ como $x^{1/2}$ e $1/x^2$ como $x^{-2}$.', 1),
  ('60000000-0000-4000-8000-000000000013', '40000000-0000-4000-8000-000000000014', 'Derive cada alternativa: a derivada de $e^{2x}$ traz um fator $2$.', 1),
  ('60000000-0000-4000-8000-000000000014', '40000000-0000-4000-8000-000000000015', 'Duas primitivas de uma mesma função só podem diferir por uma constante.', 1),
  ('60000000-0000-4000-8000-000000000015', '40000000-0000-4000-8000-000000000016', 'A derivada de $\\sen x$ é $\\cos x$; a de $\\cos x$ é $-\\sen x$.', 1),
  ('60000000-0000-4000-8000-000000000016', '40000000-0000-4000-8000-000000000017', 'Primeiro encontre $F(x)$ e só depois use a condição em $x=1$.', 1)
on conflict (id) do nothing;

insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values
  ('40000000-0000-4000-8000-000000000011', '$x^6-2x^2+3x+C$', 'A integral é linear: cada parcela pode ser integrada separadamente pela regra da potência. A constante $C$ representa todas as primitivas possíveis.'),
  ('40000000-0000-4000-8000-000000000012', '$\\ln x+C$', 'No intervalo indicado, a derivada de $\\ln x$ é $1/x$. A restrição $x>0$ evita a ambiguidade de sinal e torna $\\ln x$ uma escolha válida.'),
  ('40000000-0000-4000-8000-000000000013', '$\\frac{8}{3}x^{3/2}+\\frac{3}{x}+C$', 'Reescrever as parcelas com expoentes torna a regra da potência aplicável. Para $x^{-2}$, somar um ao expoente produz $x^{-1}$ e o sinal muda ao dividir por $-1$.'),
  ('40000000-0000-4000-8000-000000000014', '$\\frac{1}{2}e^{2x}+C$', 'A derivada de $e^{2x}$ traz um fator $2$. Por isso, a primitiva precisa do fator $1/2$ para que a derivada volte a ser exatamente $e^{2x}$.'),
  ('40000000-0000-4000-8000-000000000015', '$F(x)+7$', 'Duas primitivas da mesma função diferem apenas por uma constante. Somar $7$ não altera a derivada; multiplicar por $7$ ou acrescentar $x$ alteraria.'),
  ('40000000-0000-4000-8000-000000000016', '$3\\sen x+2\\cos x+C$', 'Integre os dois termos separadamente. O cuidado principal é que a primitiva de $-\\sen x$ é $\\cos x$, pois a derivada de $\\cos x$ já contém o sinal negativo.'),
  ('40000000-0000-4000-8000-000000000017', '$10$', 'Primeiro integre a derivada para encontrar a família de primitivas. A condição $F(1)=4$ determina a constante; só então a avaliação em $x=2$ fica definida.')
on conflict (question_id) do nothing;

insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values
  ('70000000-0000-4000-8000-000000000012', '40000000-0000-4000-8000-000000000011', 'Integre cada parcela', '$\\int 6x^5\\,dx=x^6$, $\\int -4x\\,dx=-2x^2$ e $\\int 3\\,dx=3x$.', 1),
  ('70000000-0000-4000-8000-000000000013', '40000000-0000-4000-8000-000000000011', 'Reúna as primitivas', 'Somando os resultados, obtemos $x^6-2x^2+3x+C$.', 2),
  ('70000000-0000-4000-8000-000000000014', '40000000-0000-4000-8000-000000000012', 'Use a primitiva logarítmica', '$\\frac{d}{dx}\\ln x=1/x$ no intervalo $x>0$. Logo, a primitiva é $\\ln x+C$.', 1),
  ('70000000-0000-4000-8000-000000000015', '40000000-0000-4000-8000-000000000013', 'Reescreva com expoentes', '$4\\sqrt{x}-3/x^2=4x^{1/2}-3x^{-2}$.', 1),
  ('70000000-0000-4000-8000-000000000016', '40000000-0000-4000-8000-000000000013', 'Aplique a regra da potência', '$\\int 4x^{1/2}dx=\\frac{8}{3}x^{3/2}$ e $\\int -3x^{-2}dx=3x^{-1}$.', 2),
  ('70000000-0000-4000-8000-000000000017', '40000000-0000-4000-8000-000000000014', 'Compense a derivada interna', '$\\frac{d}{dx}\\left(\\frac{1}{2}e^{2x}\\right)=\\frac{1}{2}\cdot2e^{2x}=e^{2x}$.', 1),
  ('70000000-0000-4000-8000-000000000018', '40000000-0000-4000-8000-000000000015', 'Derive a expressão candidata', '$\\frac{d}{dx}[F(x)+7]=F''(x)+0=f(x)$.', 1),
  ('70000000-0000-4000-8000-000000000019', '40000000-0000-4000-8000-000000000016', 'Integre seno e cosseno', '$\\int 3\\cos x\\,dx=3\\sen x$ e $\\int -2\\sen x\\,dx=2\\cos x$.', 1),
  ('70000000-0000-4000-8000-000000000020', '40000000-0000-4000-8000-000000000017', 'Encontre a constante', '$F(x)=x^3+2/x+C$. Como $F(1)=1+2+C=4$, obtemos $C=1$.', 1),
  ('70000000-0000-4000-8000-000000000021', '40000000-0000-4000-8000-000000000017', 'Avalie em $x=2$', 'Assim, $F(2)=2^3+2/2+1=8+1+1=10$.', 2)
on conflict (id) do nothing;
