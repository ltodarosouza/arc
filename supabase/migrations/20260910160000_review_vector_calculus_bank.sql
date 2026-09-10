-- Revisão corretiva e idempotente do banco publicado de Cálculo Vetorial.
-- Não exclui registros: itens que repetem o mesmo objetivo central são arquivados.
begin;

-- Mantém uma única formulação para objetivos já cobertos por outro item publicado.
update public.questions
set publication_status = 'archived'
where id in (
  '40000000-0000-4000-8000-000000050205',
  '40000000-0000-4000-8000-000000050316',
  '40000000-0000-4000-8000-000000050509',
  '40000000-0000-4000-8000-000000050515',
  '40000000-0000-4000-8000-000000050701',
  '40000000-0000-4000-8000-000000050702',
  '40000000-0000-4000-8000-000000050703',
  '40000000-0000-4000-8000-000000050704',
  '40000000-0000-4000-8000-000000050705',
  '40000000-0000-4000-8000-000000050706',
  '40000000-0000-4000-8000-000000050707',
  '40000000-0000-4000-8000-000000050708',
  '40000000-0000-4000-8000-000000050709',
  '40000000-0000-4000-8000-000000050710',
  '40000000-0000-4000-8000-000000050711',
  '40000000-0000-4000-8000-000000050712',
  '40000000-0000-4000-8000-000000050713',
  '40000000-0000-4000-8000-000000050714',
  '40000000-0000-4000-8000-000000050715',
  '40000000-0000-4000-8000-000000050716',
  '40000000-0000-4000-8000-000000050717',
  '40000000-0000-4000-8000-000000050718',
  '40000000-0000-4000-8000-000000050719',
  '40000000-0000-4000-8000-000000050720'
);

-- Corrige a classificação de itens cuja solução é uma aplicação direta ou poucos passos.
update public.questions
set difficulty = 'medium'
where id in (
  '40000000-0000-4000-8000-000000050006','40000000-0000-4000-8000-000000050007',
  '40000000-0000-4000-8000-000000050012','40000000-0000-4000-8000-000000050015',
  '40000000-0000-4000-8000-000000050017','40000000-0000-4000-8000-000000050113',
  '40000000-0000-4000-8000-000000050114','40000000-0000-4000-8000-000000050117',
  '40000000-0000-4000-8000-000000050118','40000000-0000-4000-8000-000000050120',
  '40000000-0000-4000-8000-000000050209','40000000-0000-4000-8000-000000050211',
  '40000000-0000-4000-8000-000000050212','40000000-0000-4000-8000-000000050219',
  '40000000-0000-4000-8000-000000050309','40000000-0000-4000-8000-000000050315',
  '40000000-0000-4000-8000-000000050404','40000000-0000-4000-8000-000000050409',
  '40000000-0000-4000-8000-000000050412','40000000-0000-4000-8000-000000050413',
  '40000000-0000-4000-8000-000000050414','40000000-0000-4000-8000-000000050610',
  '40000000-0000-4000-8000-000000050611','40000000-0000-4000-8000-000000050619'
);
update public.questions set difficulty = 'easy'
where id in ('40000000-0000-4000-8000-000000050008','40000000-0000-4000-8000-000000050020',
             '40000000-0000-4000-8000-000000050214','40000000-0000-4000-8000-000000050310',
             '40000000-0000-4000-8000-000000050320','40000000-0000-4000-8000-000000050415',
             '40000000-0000-4000-8000-000000050617');

-- Reclassifica produto escalar e projeção na tag existente apropriada.
update public.question_taxonomy_tags
set taxonomy_node_id = '30000000-0000-4000-8000-000000000211'
where taxonomy_node_id = '30000000-0000-4000-8000-000000000210'
  and question_id in (
    '40000000-0000-4000-8000-000000050108','40000000-0000-4000-8000-000000050109',
    '40000000-0000-4000-8000-000000050110','40000000-0000-4000-8000-000000050111',
    '40000000-0000-4000-8000-000000050112','40000000-0000-4000-8000-000000050113',
    '40000000-0000-4000-8000-000000050115','40000000-0000-4000-8000-000000050116',
    '40000000-0000-4000-8000-000000050117','40000000-0000-4000-8000-000000050120'
  );

-- Normaliza comandos LaTeX que perderam a barra ou foram gravados como tabulação.
update public.questions set statement_markdown = replace(replace(replace(statement_markdown, 'ucdot', '\\cdot'), '^circ', '^\\circ'), E'\theta', '\\theta')
where subject_id = '20000000-0000-4000-8000-000000000003';
update public.question_options set content_markdown = replace(replace(replace(content_markdown, 'ucdot', '\\cdot'), '^circ', '^\\circ'), E'\theta', '\\theta')
where question_id in (select id from public.questions where subject_id = '20000000-0000-4000-8000-000000000003');
update public.question_hints set content_markdown = replace(replace(replace(content_markdown, 'ucdot', '\\cdot'), '^circ', '^\\circ'), E'\theta', '\\theta')
where question_id in (select id from public.questions where subject_id = '20000000-0000-4000-8000-000000000003');
update public.question_solutions set final_answer_markdown = replace(replace(replace(final_answer_markdown, 'ucdot', '\\cdot'), '^circ', '^\\circ'), E'\theta', '\\theta'),
  explanation_markdown = replace(replace(replace(explanation_markdown, 'ucdot', '\\cdot'), '^circ', '^\\circ'), E'\theta', '\\theta')
where question_id in (select id from public.questions where subject_id = '20000000-0000-4000-8000-000000000003');
update public.question_solution_steps set content_markdown = replace(replace(replace(content_markdown, 'ucdot', '\\cdot'), '^circ', '^\\circ'), E'\theta', '\\theta')
where question_id in (select id from public.questions where subject_id = '20000000-0000-4000-8000-000000000003');

-- Troca cabeçalhos-modelo por cabeçalhos relacionados ao objetivo efetivo de cada tag.
update public.question_solution_steps step
set title = case tag.taxonomy_node_id
  when '30000000-0000-4000-8000-000000000209' then (array['Dados e orientação','Relação entre vetores','Cálculo das componentes','Teste da orientação'])[least(step.sort_order,4)]
  when '30000000-0000-4000-8000-000000000210' then (array['Dados do vetor','Relação de módulo','Cálculo da grandeza','Checagem da propriedade'])[least(step.sort_order,4)]
  when '30000000-0000-4000-8000-000000000211' then (array['Grandezas envolvidas','Produto ou projeção','Desenvolvimento numérico','Interpretação geométrica'])[least(step.sort_order,4)]
  when '30000000-0000-4000-8000-000000000212' then (array['Ordem dos vetores','Produto vetorial ou misto','Cálculo orientado','Área, volume ou sentido'])[least(step.sort_order,4)]
  when '30000000-0000-4000-8000-000000000213' then (array['Ponto e direção','Parametrização da reta','Condição solicitada','Teste de pertencimento'])[least(step.sort_order,4)]
  when '30000000-0000-4000-8000-000000000214' then (array['Dados do plano','Normal e equação','Substituição das coordenadas','Teste no plano'])[least(step.sort_order,4)]
  when '30000000-0000-4000-8000-000000000215' then (array['Configuração espacial','Fórmula métrica','Cálculo da medida','Unidade ou interpretação'])[least(step.sort_order,4)]
  when '30000000-0000-4000-8000-000000000216' then (array['Configuração espacial','Critério de posição','Aplicação do critério','Conclusão geométrica'])[least(step.sort_order,4)]
  when '30000000-0000-4000-8000-000000000217' then (array['Vetores geradores','Relação geométrica','Cálculo da medida','Verificação dimensional'])[least(step.sort_order,4)]
  when '30000000-0000-4000-8000-000000000218' then (array['Forma da equação','Sinais e variáveis livres','Seção ou eixo relevante','Classificação da superfície'])[least(step.sort_order,4)]
  else step.title end
from public.question_taxonomy_tags tag
where tag.question_id = step.question_id and tag.is_primary
  and step.title in ('Identifique a grandeza','Aplique a definição','Obtenha o resultado','Confira');

commit;
