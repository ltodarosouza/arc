import { writeFileSync } from 'node:fs';
import katex from 'katex';
import { hardMixedBatch } from '../content/calculus-1/hard-mixed-batch.mjs';
const topics = {
  'regra-de-lhopital': '031',
  continuidade: '019',
  'derivacao-implicita-e-logaritmica': '026',
  'extremos-e-valor-medio': '029',
  'analise-de-graficos': '030',
  otimizacao: '032',
  'metodo-de-newton': '033',
  'limites-no-infinito-e-assintotas': '020',
  'taxas-relacionadas-e-aproximacoes': '027',
  'calculo-de-limites': '018',
};
const sql = (v) => `'${String(v).replaceAll("'", "''")}'`,
  id = (p, n) => `${p}-0000-4000-8000-${String(n).padStart(12, '0')}`;
for (const q of hardMixedBatch) {
  if (
    !topics[q.topic] ||
    q.options.length !== 4 ||
    new Set(q.options).size !== 4 ||
    q.hints.length !== 3 ||
    q.steps.length !== 5
  )
    throw Error(`Estrutura inválida: ${q.id}`);
  for (const text of [
    q.statement,
    ...q.options,
    ...q.hints,
    q.finalAnswer,
    q.explanation,
    ...q.steps.flat(),
  ]) {
    if ((text.match(/\$/g) || []).length % 2)
      throw Error(`LaTeX inválido: ${q.id}`);
    for (const m of text.matchAll(/\$([^$]+)\$/g))
      katex.renderToString(m[1], { throwOnError: true, strict: 'error' });
  }
}
const source = '10000000-0000-4000-8000-000000001502',
  subject = '20000000-0000-4000-8000-000000000004';
const lines = [
  '-- 15 questões autorais difíceis de Cálculo I, auditadas individualmente.',
  'begin;',
  `insert into public.question_sources (id,kind,label,licence_note,rights_holder,rights_status,verified_by,verified_at) values (${sql(source)},'original',${sql('Arc original Cálculo I — lote difícil multidisciplinar')},${sql('Questões autorais; Stewart, Cálculo, serviu apenas para mapeamento de competências.')},'Arc','approved','Equipe editorial Arc','2026-09-10T00:00:00Z') on conflict (id) do update set label=excluded.label,licence_note=excluded.licence_note;`,
];
for (const [i, q] of hardMixedBatch.entries()) {
  const n = 15200 + i,
    qid = id('00000043', n),
    opts = q.options.map((_, j) => id('00000053', n * 10 + j + 1));
  lines.push(
    `insert into public.questions (id,subject_id,source_id,kind,difficulty,publication_status,statement_markdown) values (${sql(qid)},${sql(subject)},${sql(source)},'multiple_choice','hard','published',${sql(q.statement)}) on conflict (id) do update set statement_markdown=excluded.statement_markdown,difficulty=excluded.difficulty,publication_status=excluded.publication_status;`,
    `insert into public.question_options (id,question_id,label,content_markdown,sort_order) values ${q.options.map((o, j) => `(${sql(opts[j])},${sql(qid)},${sql(String.fromCharCode(65 + j))},${sql(o)},${j + 1})`).join(',')} on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`,
    `insert into public.question_answer_keys (question_id,correct_option_id) values (${sql(qid)},${sql(opts[0])}) on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;`,
    `insert into public.question_taxonomy_tags (question_id,taxonomy_node_id,is_primary) values (${sql(qid)},${sql(`30000000-0000-4000-8000-000000000${topics[q.topic]}`)},true) on conflict (question_id,taxonomy_node_id) do update set is_primary=true;`,
    `insert into public.question_hints (id,question_id,content_markdown,sort_order) values ${q.hints.map((h, j) => `(${sql(id('00000063', n * 10 + j + 1))},${sql(qid)},${sql(h)},${j + 1})`).join(',')} on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`,
    `insert into public.question_solutions (question_id,final_answer_markdown,explanation_markdown) values (${sql(qid)},${sql(q.finalAnswer)},${sql(q.explanation)}) on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown,explanation_markdown=excluded.explanation_markdown;`,
    `insert into public.question_solution_steps (id,question_id,title,content_markdown,sort_order) values ${q.steps.map(([t, c], j) => `(${sql(id('00000073', n * 10 + j + 1))},${sql(qid)},${sql(t)},${sql(c)},${j + 1})`).join(',')} on conflict (id) do update set title=excluded.title,content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`,
  );
}
lines.push('commit;', '');
writeFileSync(
  'supabase/migrations/20260910123000_seed_calculus_1_hard_mixed_batch.sql',
  lines.join('\n'),
);
console.log({ questions: hardMixedBatch.length });
