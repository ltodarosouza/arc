import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import katex from 'katex';
import { dirname, resolve } from 'node:path';
import { createDiverseCalculusOneBatch } from '../content/calculus-1/diverse-bank-v2.mjs';

const root = resolve(import.meta.dirname, '..');
const selectedBatch = process.argv.find((item) => item.startsWith('--batch='))?.slice(8) ?? '01';
const batchNumber = Number(selectedBatch);
if (![1, 2].includes(batchNumber)) throw new Error('Use --batch=01 ou --batch=02.');
const padded = String(batchNumber).padStart(2, '0');
const outputPath = resolve(root, `supabase/migrations/2026090918${batchNumber + 20}000_diversify_calculus_1_batch_${padded}.sql`);
const subjectId = '20000000-0000-4000-8000-000000000004';
const sourceId = `10000000-0000-4000-8000-${String(241 + batchNumber).padStart(12, '0')}`;
// Faixa exclusiva do banco renovado; não reutiliza os IDs 10k–80k dos lotes legados.
const questionStart = 96001 + (batchNumber - 1) * 125;
const topics = {
  'representacoes-de-funcoes': '30000000-0000-4000-8000-000000000012', 'modelos-e-funcoes-elementares': '30000000-0000-4000-8000-000000000013', 'composicao-e-transformacoes': '30000000-0000-4000-8000-000000000014', 'funcoes-inversas-e-logaritmicas': '30000000-0000-4000-8000-000000000015', 'nocao-de-limite': '30000000-0000-4000-8000-000000000017', 'calculo-de-limites': '30000000-0000-4000-8000-000000000018', continuidade: '30000000-0000-4000-8000-000000000019', 'limites-no-infinito-e-assintotas': '30000000-0000-4000-8000-000000000020', 'taxa-de-variacao-e-derivada': '30000000-0000-4000-8000-000000000022', 'regras-basicas-de-derivacao': '30000000-0000-4000-8000-000000000023', 'produto-e-quociente': '30000000-0000-4000-8000-000000000024', 'regra-da-cadeia': '30000000-0000-4000-8000-000000000025', 'derivacao-implicita-e-logaritmica': '30000000-0000-4000-8000-000000000026', 'taxas-relacionadas-e-aproximacoes': '30000000-0000-4000-8000-000000000027', 'extremos-e-valor-medio': '30000000-0000-4000-8000-000000000029', 'analise-de-graficos': '30000000-0000-4000-8000-000000000030', 'regra-de-lhopital': '30000000-0000-4000-8000-000000000031', otimizacao: '30000000-0000-4000-8000-000000000032', 'metodo-de-newton': '30000000-0000-4000-8000-000000000033',
};
const commands = ['frac','sqrt','sin','cos','ln','pi','Delta','cdot','ne','infty','ge','le','Rightarrow','prime'];
const normalize = (text) => text.replace(/\$([^$]+)\$/g, (_, raw) => {
  let math = raw
    .replaceAll(String.fromCharCode(12), '\\f')
    .replaceAll(String.fromCharCode(8), '\\b')
    .replace(/\t(?=o\b)/g, '\\t');
  for (const command of commands) math = math.replace(new RegExp(`(?<![A-Za-z\\\\])${command}(?![A-Za-z])`, 'g'), `\\${command}`);
  return `$${math}$`;
});
const sql = (value) => `'${normalize(value).replaceAll("'", "''")}'`;
const id = (prefix, value) => `${prefix}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;
const ensure = (condition, message) => { if (!condition) throw new Error(message); };
const validate = (text, number) => {
  const normalized = normalize(text); ensure((normalized.match(/\$/g) ?? []).length % 2 === 0, `LaTex inválido na questão ${number}.`);
  for (const match of normalized.matchAll(/\$([^$]+)\$/g)) katex.renderToString(match[1], { throwOnError: true, trust: false, strict: 'error' });
};
const batch = createDiverseCalculusOneBatch(padded);
ensure(batch.length === 125, 'Cada lote precisa ter 125 questões.');
ensure(new Set(batch.map((q) => q.statement)).size === 125, 'Há enunciados repetidos.');
const lines = [`-- Banco Cálculo I renovado — lote ${padded}: 125 questões autorais revisadas.`, '-- Execute os lotes 01 e 02 antes da limpeza final.', 'begin;', ''];
if (batchNumber === 1) lines.push(`update public.questions set publication_status = 'draft' where subject_id = ${sql(subjectId)} and publication_status = 'published' and coalesce(source_id::text, '') not in (${sql('10000000-0000-4000-8000-000000000242')}, ${sql('10000000-0000-4000-8000-000000000243')});`, '');
lines.push('insert into public.question_sources (id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at)', `values (${sql(sourceId)}, 'original', ${sql(`Arc original Cálculo I — banco renovado, lote ${padded}`)}, ${sql('Questões autorais da Arc, revisadas para diversidade, clareza pedagógica e consistência matemática.')}, 'Arc', 'approved', 'Equipe editorial Arc', '2026-09-09T00:00:00Z')`, 'on conflict (id) do update set label = excluded.label, licence_note = excluded.licence_note, rights_status = excluded.rights_status, verified_by = excluded.verified_by, verified_at = excluded.verified_at;', '');
for (const [index, q] of batch.entries()) {
  const number = questionStart + index; const questionId = id(4, number); const optionIds = q.options.map((_, i) => id(5, number * 10 + i + 1));
  ensure(topics[q.topic], `Tópico inválido: ${q.topic}`); ensure(q.options.length === 4 && new Set(q.options).size === 4, `Alternativas inválidas ${number}`); ensure(q.hints.length >= 3 && q.steps.length >= 5 && q.explanation.length >= 240, `Editorial insuficiente ${number}`);
  for (const text of [q.statement, ...q.options, ...q.hints, q.finalAnswer, q.explanation, ...q.steps.flat()]) validate(text, number);
  lines.push(`insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values (${sql(questionId)}, ${sql(subjectId)}, ${sql(sourceId)}, 'multiple_choice', ${sql(q.difficulty)}, 'published', ${sql(q.statement)}) on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;`, `insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ${q.options.map((option, i) => `(${sql(optionIds[i])}, ${sql(questionId)}, ${sql(String.fromCharCode(65+i))}, ${sql(option)}, ${i+1})`).join(', ')} on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;`, `insert into public.question_answer_keys (question_id, correct_option_id) values (${sql(questionId)}, ${sql(optionIds[q.correct])}) on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;`, `insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values (${sql(questionId)}, ${sql(topics[q.topic])}, true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;`, `insert into public.question_hints (id, question_id, content_markdown, sort_order) values ${q.hints.map((hint, i) => `(${sql(id(6, number*10+i+1))}, ${sql(questionId)}, ${sql(hint)}, ${i+1})`).join(', ')} on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;`, `insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values (${sql(questionId)}, ${sql(q.finalAnswer)}, ${sql(q.explanation)}) on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;`, `insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ${q.steps.map(([title, content], i) => `(${sql(id(7, number*10+i+1))}, ${sql(questionId)}, ${sql(title)}, ${sql(content)}, ${i+1})`).join(', ')} on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;`, '');
}
lines.push('commit;', ''); const output = lines.join('\n');
if (process.argv.includes('--check')) { ensure(readFileSync(outputPath, 'utf8') === output, `Migration ${padded} desatualizada.`); console.log(`Cálculo I v2 lote ${padded} validado.`); } else { mkdirSync(dirname(outputPath), { recursive: true }); writeFileSync(outputPath, output); console.log(`Migration criada: ${outputPath}`); }
