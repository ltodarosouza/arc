import { mkdirSync, writeFileSync } from 'node:fs';
import katex from 'katex';
import { applicationsAndGraphsBatch } from '../content/calculus-1/applications-graphs-batch.mjs';

const subjectId = '20000000-0000-4000-8000-000000000004';
const sourceId = '10000000-0000-4000-8000-000000001501';
const topics = {
  'extremos-e-valor-medio': '30000000-0000-4000-8000-000000000029',
  'analise-de-graficos': '30000000-0000-4000-8000-000000000030',
};
const out =
  'supabase/migrations/20260910120000_refresh_calculus_1_extrema_and_graphs.sql';
const sql = (value) => `'${String(value).replaceAll("'", "''")}'`;
const id = (prefix, n) =>
  `${prefix}-0000-4000-8000-${String(n).padStart(12, '0')}`;
const checkMath = (text, qid) => {
  if ((text.match(/\$/g) ?? []).length % 2)
    throw new Error(`LaTeX sem par em ${qid}`);
  for (const match of text.matchAll(/\$([^$]+)\$/g))
    katex.renderToString(match[1], { throwOnError: true, strict: 'error' });
};
const statements = new Set();
for (const q of applicationsAndGraphsBatch) {
  if (statements.has(q.statement))
    throw new Error(`Enunciado repetido: ${q.id}`);
  statements.add(q.statement);
  if (
    !topics[q.topic] ||
    q.options.length !== 4 ||
    new Set(q.options).size !== 4 ||
    q.hints.length !== 3 ||
    q.steps.length !== 5
  )
    throw new Error(`Estrutura inválida: ${q.id}`);
  for (const text of [
    q.statement,
    ...q.options,
    ...q.hints,
    q.finalAnswer,
    q.explanation,
    ...q.steps.flat(),
  ])
    checkMath(text, q.id);
}
const lines = [
  '-- Cálculo I: substitui 18 itens fracos de funções por 43 itens autorais de aplicações da derivada e análise gráfica.',
  '-- Stewart é referência pedagógica; nenhum enunciado ou figura foi copiado.',
  'begin;',
  `insert into public.question_sources (id,kind,label,licence_note,rights_holder,rights_status,verified_by,verified_at) values (${sql(sourceId)},'original',${sql('Arc original Cálculo I — aplicações da derivada e gráficos')},${sql('Questões, soluções e diagramas vetoriais autorais. Stewart, Cálculo, cap. 4, foi consultado exclusivamente para mapear competências e progressão.')},'Arc','approved','Equipe editorial Arc','2026-09-10T00:00:00Z') on conflict (id) do update set label=excluded.label,licence_note=excluded.licence_note,rights_status=excluded.rights_status;`,
  '-- Arquiva, sem apagar histórico, os 18 primeiros itens do bloco de funções publicado em 20260910093000.',
  `update public.questions set publication_status='archived' where id between ${sql(id('00000042', 1))} and ${sql(id('00000042', 18))} and subject_id=${sql(subjectId)};`,
];
for (const [index, q] of applicationsAndGraphsBatch.entries()) {
  const n = 15100 + index;
  const qid = id('00000043', n);
  const opts = q.options.map((_, i) => id('00000053', n * 10 + i + 1));
  lines.push(
    `insert into public.questions (id,subject_id,source_id,kind,difficulty,publication_status,statement_markdown) values (${sql(qid)},${sql(subjectId)},${sql(sourceId)},'multiple_choice',${sql(q.difficulty)},'published',${sql(q.statement)}) on conflict (id) do update set source_id=excluded.source_id,difficulty=excluded.difficulty,publication_status=excluded.publication_status,statement_markdown=excluded.statement_markdown;`,
    `insert into public.question_options (id,question_id,label,content_markdown,sort_order) values ${q.options.map((o, i) => `(${sql(opts[i])},${sql(qid)},${sql(String.fromCharCode(65 + i))},${sql(o)},${i + 1})`).join(',')} on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`,
    `insert into public.question_answer_keys (question_id,correct_option_id) values (${sql(qid)},${sql(opts[q.correct])}) on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;`,
    `insert into public.question_taxonomy_tags (question_id,taxonomy_node_id,is_primary) values (${sql(qid)},${sql(topics[q.topic])},true) on conflict (question_id,taxonomy_node_id) do update set is_primary=true;`,
    `insert into public.question_hints (id,question_id,content_markdown,sort_order) values ${q.hints.map((h, i) => `(${sql(id('00000063', n * 10 + i + 1))},${sql(qid)},${sql(h)},${i + 1})`).join(',')} on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`,
    `insert into public.question_solutions (question_id,final_answer_markdown,explanation_markdown) values (${sql(qid)},${sql(q.finalAnswer)},${sql(q.explanation)}) on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown,explanation_markdown=excluded.explanation_markdown;`,
    `insert into public.question_solution_steps (id,question_id,title,content_markdown,sort_order) values ${q.steps.map(([t, c], i) => `(${sql(id('00000073', n * 10 + i + 1))},${sql(qid)},${sql(t)},${sql(c)},${i + 1})`).join(',')} on conflict (id) do update set title=excluded.title,content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`,
  );
}
lines.push('commit;', '');
if (process.argv.includes('--check'))
  process.stdout.write(
    `Cálculo I: ${applicationsAndGraphsBatch.length} itens validados.\n`,
  );
else {
  mkdirSync('supabase/migrations', { recursive: true });
  writeFileSync(out, lines.join('\n'));
  process.stdout.write(`Migration criada: ${out}\n`);
}
