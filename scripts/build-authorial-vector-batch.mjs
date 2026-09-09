import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import katex from 'katex';
import { dirname, resolve } from 'node:path';

const batch = process.argv.find((arg) => arg.startsWith('--batch='))?.slice(8);
if (!/^(0[1-8])$/.test(batch ?? '')) throw new Error('Use --batch=01 até --batch=08.');
const root = resolve(import.meta.dirname, '..');
const questions = (await import(`../content/vector-calculus/authorial-batch-${batch}.mjs`)).default;
const sql = (value) => `'${value.replaceAll("'", "''")}'`;
const id = (prefix, number) => `${prefix}0000000-0000-4000-8000-${String(number).padStart(12, '0')}`;
const topics = {
  'componentes-e-base': '30000000-0000-4000-8000-000000000209',
  'norma-e-versores': '30000000-0000-4000-8000-000000000210',
  'produto-escalar-e-projecao': '30000000-0000-4000-8000-000000000211',
  'produto-vetorial-e-misto': '30000000-0000-4000-8000-000000000212',
  'equacoes-de-retas': '30000000-0000-4000-8000-000000000213',
  'equacoes-de-planos': '30000000-0000-4000-8000-000000000214',
  'distancias-e-angulos': '30000000-0000-4000-8000-000000000215',
  'paralelismo-e-intersecao': '30000000-0000-4000-8000-000000000216',
  'volumes-e-areas': '30000000-0000-4000-8000-000000000217',
  'classificacao-de-quadricas': '30000000-0000-4000-8000-000000000218',
};
const checkMath = (text) => {
  if ((text.match(/\$/g) ?? []).length % 2) throw new Error('Cifrão sem par.');
  for (const match of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(match[1], { throwOnError: true, strict: 'error' });
};
if (questions.length !== 20) throw new Error(`Lote ${batch} precisa ter 20 questões.`);
if (new Set(questions.map((q) => q.statement)).size !== 20) throw new Error(`Lote ${batch} tem enunciados repetidos.`);
for (const [index, q] of questions.entries()) {
  if (!topics[q.topic] || !['easy', 'medium', 'hard'].includes(q.difficulty)) throw new Error(`Taxonomia inválida em ${index + 1}.`);
  if (q.options.length !== 4 || new Set(q.options).size !== 4 || q.correct < 0 || q.correct > 3) throw new Error(`Alternativas inválidas em ${index + 1}.`);
  if (q.hints.length < 3 || q.steps.length < 4 || q.explanation.length < 80) throw new Error(`Conteúdo insuficiente em ${index + 1}.`);
  [q.statement, ...q.options, ...q.hints, q.finalAnswer, q.explanation, ...q.steps.flat()].forEach(checkMath);
}
const batchIndex = Number(batch);
const sourceId = `10000000-0000-4000-8000-${String(240 + batchIndex).padStart(12, '0')}`;
let out = `-- Cálculo Vetorial autoral, lote ${batch}.\nbegin;\n\n`;
out += `insert into public.question_sources (id,kind,label,licence_note,rights_holder,rights_status,verified_by,verified_at) values (${sql(sourceId)},'original',${sql(`Arc original Cálculo Vetorial — lote autoral ${batch}`)},${sql('Questões autorais; Steinbruch e Winterle foram usados apenas para mapear competências.')},'Arc','approved','Codex - revisão matemática e editorial','2026-09-09T00:00:00Z') on conflict (id) do update set label=excluded.label,licence_note=excluded.licence_note;\n\n`;
questions.forEach((q, index) => {
  const number = 50000 + (batchIndex - 1) * 100 + index + 1;
  const questionId = id(4, number), optionIds = q.options.map((_, i) => id(5, number * 10 + i + 1));
  out += `insert into public.questions (id,subject_id,source_id,kind,difficulty,publication_status,statement_markdown) values (${sql(questionId)},'20000000-0000-4000-8000-000000000003',${sql(sourceId)},'multiple_choice',${sql(q.difficulty)},'published',${sql(q.statement)}) on conflict (id) do update set statement_markdown=excluded.statement_markdown,difficulty=excluded.difficulty,publication_status=excluded.publication_status;\n`;
  out += `insert into public.question_options (id,question_id,label,content_markdown,sort_order) values ${q.options.map((o, i) => `(${sql(optionIds[i])},${sql(questionId)},${sql(String.fromCharCode(65 + i))},${sql(o)},${i + 1})`).join(',')} on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;\n`;
  out += `insert into public.question_answer_keys (question_id,correct_option_id) values (${sql(questionId)},${sql(optionIds[q.correct])}) on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;\n`;
  out += `insert into public.question_taxonomy_tags (question_id,taxonomy_node_id,is_primary) values (${sql(questionId)},${sql(topics[q.topic])},true) on conflict (question_id,taxonomy_node_id) do update set is_primary=true;\n`;
  out += `insert into public.question_hints (id,question_id,content_markdown,sort_order) values ${q.hints.map((h, i) => `(${sql(id(6, number * 10 + i + 1))},${sql(questionId)},${sql(h)},${i + 1})`).join(',')} on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;\n`;
  out += `insert into public.question_solutions (question_id,final_answer_markdown,explanation_markdown) values (${sql(questionId)},${sql(q.finalAnswer)},${sql(q.explanation)}) on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown,explanation_markdown=excluded.explanation_markdown;\n`;
  out += `insert into public.question_solution_steps (id,question_id,title,content_markdown,sort_order) values ${q.steps.map(([title, content], i) => `(${sql(id(7, number * 10 + i + 1))},${sql(questionId)},${sql(title)},${sql(content)},${i + 1})`).join(',')} on conflict (id) do update set title=excluded.title,content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;\n\n`;
});
out += 'commit;\n';
const path = resolve(root, `supabase/migrations/2026090922${String(10 + batchIndex).padStart(2, '0')}00_seed_authorial_vector_calculus_batch_${batch}.sql`);
if (process.argv.includes('--check')) {
  if (readFileSync(path, 'utf8') !== out) throw new Error(`Migration ${batch} desatualizada.`);
  console.log(`Lote ${batch}: 20 questões validadas.`);
} else { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, out); console.log(path); }
