import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import katex from 'katex';
import { dirname, resolve } from 'node:path';
import { createRefreshedVectorBatch } from '../content/vector-calculus/refreshed-bank.mjs';

const root = resolve(import.meta.dirname, '..');
const selectedBatch =
  process.argv.find((argument) => argument.startsWith('--batch='))?.slice(8) ??
  '01';
const batchNumber = Number(selectedBatch);
if (!Number.isInteger(batchNumber) || batchNumber < 1 || batchNumber > 5)
  throw new Error(`Lote renovado desconhecido: ${selectedBatch}.`);

const paddedBatch = String(batchNumber).padStart(2, '0');
const outputPath = resolve(
  root,
  `supabase/migrations/2026090917${String(batchNumber).padStart(2, '0')}00_refresh_vector_calculus_batch_${paddedBatch}.sql`,
);
const subjectId = '20000000-0000-4000-8000-000000000003';
const sourceId = `10000000-0000-4000-8000-${String(221 + batchNumber).padStart(12, '0')}`;
const questionStart = 48001 + (batchNumber - 1) * 100;
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
const texCommands = [
  'frac',
  'sqrt',
  'sin',
  'cos',
  'ln',
  'pi',
  'int',
  'Delta',
  'cdot',
  'ne',
  'infty',
  'ge',
  'le',
  'circ',
  'big',
  'times',
  'Rightarrow',
  'theta',
  'mapsto',
  'left',
  'right',
];
const normalizeMath = (text) =>
  text.replace(/\$([^$]+)\$/g, (_, source) => {
    let math = source
      .replace(/\f/g, '\\f')
      .replace(/\u0008/g, '\\b')
      .replace(/\t(?=o\b)/g, '\\t');
    for (const command of texCommands)
      math = math.replace(
        new RegExp(`(?<![A-Za-z\\\\])${command}(?![A-Za-z])`, 'g'),
        `\\${command}`,
      );
    return `$${math}$`;
  });
const sql = (value) => `'${normalizeMath(value).replaceAll("'", "''")}'`;
const id = (prefix, value) =>
  `${prefix}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;
const ensure = (condition, message) => {
  if (!condition) throw new Error(message);
};
const validateText = (text, number) => {
  const normalized = normalizeMath(text);
  ensure(
    (normalized.match(/\$/g) ?? []).length % 2 === 0,
    `Delimitador matemático sem par na questão ${number}.`,
  );
  for (const match of normalized.matchAll(/\$([^$]+)\$/g))
    katex.renderToString(match[1], {
      throwOnError: true,
      trust: false,
      strict: 'error',
    });
};
const batch = createRefreshedVectorBatch(paddedBatch);
ensure(batch.length === 50, `O lote ${paddedBatch} precisa ter 50 questões.`);
ensure(
  new Set(batch.map((question) => question.statement)).size === 50,
  `Há enunciados repetidos no lote ${paddedBatch}.`,
);

const lines = [
  `-- Banco renovado de Cálculo Vetorial — lote ${paddedBatch}: 50 questões autorais, variadas e revisadas.`,
  '-- Pré-requisito: execute 20260909160000_expand_vector_calculus_catalogue.sql e os lotes anteriores deste banco.',
  'begin;',
  '',
];
if (batchNumber === 1)
  lines.push(
    '-- Preserva tentativas já registradas, mas tira da navegação as questões antigas do banco vetorial.',
    `update public.questions set publication_status = 'draft' where subject_id = ${sql(subjectId)} and publication_status = 'published' and coalesce(source_id::text, '') not in ('10000000-0000-4000-8000-000000000222', '10000000-0000-4000-8000-000000000223', '10000000-0000-4000-8000-000000000224', '10000000-0000-4000-8000-000000000225', '10000000-0000-4000-8000-000000000226');`,
    '',
  );
lines.push(
  'insert into public.question_sources (id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at)',
  `values (${sql(sourceId)}, 'original', ${sql(`Arc original Cálculo Vetorial — banco renovado, lote ${paddedBatch}`)}, ${sql('Questões originais da Arc, redigidas e revisadas para diversidade de abordagem e clareza pedagógica.')}, 'Arc', 'approved', 'Equipe editorial Arc', '2026-09-09T00:00:00Z')`,
  'on conflict (id) do update set label = excluded.label, licence_note = excluded.licence_note, rights_status = excluded.rights_status, verified_by = excluded.verified_by, verified_at = excluded.verified_at;',
  '',
);
batch.forEach((question, index) => {
  const number = questionStart + index;
  const questionId = id(4, number);
  const optionIds = question.options.map((_, optionIndex) =>
    id(5, number * 10 + optionIndex + 1),
  );
  ensure(topics[question.topic], `Tópico desconhecido: ${question.topic}.`);
  ensure(
    question.options.length === 4 && new Set(question.options).size === 4,
    `Alternativas inválidas na questão ${number}.`,
  );
  ensure(
    question.hints.length >= 3 && question.steps.length >= 4,
    `Explicação insuficiente na questão ${number}.`,
  );
  ensure(
    question.explanation.length >= 240,
    `Explicação curta na questão ${number}.`,
  );
  for (const text of [
    question.statement,
    ...question.options,
    ...question.hints,
    question.finalAnswer,
    question.explanation,
    ...question.steps.flat(),
  ])
    validateText(text, number);
  lines.push(
    `insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values (${sql(questionId)}, ${sql(subjectId)}, ${sql(sourceId)}, 'multiple_choice', ${sql(question.difficulty)}, 'published', ${sql(question.statement)}) on conflict (id) do update set subject_id = excluded.subject_id, source_id = excluded.source_id, kind = excluded.kind, difficulty = excluded.difficulty, publication_status = excluded.publication_status, statement_markdown = excluded.statement_markdown;`,
    `insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ${question.options.map((option, optionIndex) => `(${sql(optionIds[optionIndex])}, ${sql(questionId)}, ${sql(String.fromCharCode(65 + optionIndex))}, ${sql(option)}, ${optionIndex + 1})`).join(', ')} on conflict (id) do update set question_id = excluded.question_id, label = excluded.label, content_markdown = excluded.content_markdown, sort_order = excluded.sort_order;`,
    `insert into public.question_answer_keys (question_id, correct_option_id) values (${sql(questionId)}, ${sql(optionIds[question.correct])}) on conflict (question_id) do update set correct_option_id = excluded.correct_option_id;`,
    `insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values (${sql(questionId)}, ${sql(topics[question.topic])}, true) on conflict (question_id, taxonomy_node_id) do update set is_primary = excluded.is_primary;`,
    `insert into public.question_hints (id, question_id, content_markdown, sort_order) values ${question.hints.map((hint, hintIndex) => `(${sql(id(6, number * 10 + hintIndex + 1))}, ${sql(questionId)}, ${sql(hint)}, ${hintIndex + 1})`).join(', ')} on conflict (id) do update set question_id = excluded.question_id, content_markdown = excluded.content_markdown, sort_order = excluded.sort_order;`,
    `insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values (${sql(questionId)}, ${sql(question.finalAnswer)}, ${sql(question.explanation)}) on conflict (question_id) do update set final_answer_markdown = excluded.final_answer_markdown, explanation_markdown = excluded.explanation_markdown;`,
    `insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ${question.steps.map(([title, content], stepIndex) => `(${sql(id(7, number * 10 + stepIndex + 1))}, ${sql(questionId)}, ${sql(title)}, ${sql(content)}, ${stepIndex + 1})`).join(', ')} on conflict (id) do update set question_id = excluded.question_id, title = excluded.title, content_markdown = excluded.content_markdown, sort_order = excluded.sort_order;`,
    '',
  );
});
lines.push('commit;', '');
const output = lines.join('\n');
if (process.argv.includes('--check')) {
  ensure(
    readFileSync(outputPath, 'utf8') === output,
    `A migration ${paddedBatch} está desatualizada.`,
  );
  console.log(`Lote renovado ${paddedBatch} validado.`);
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, output);
  console.log(`Migration criada: ${outputPath}`);
}
