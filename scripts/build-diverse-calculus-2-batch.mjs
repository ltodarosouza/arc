import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import katex from 'katex';
import { createDiverseCalculusTwoBatch } from '../content/calculus-2/diverse-bank-v3.mjs';

const root = resolve(import.meta.dirname, '..');
const selected =
  process.argv.find((item) => item.startsWith('--batch='))?.slice(8) ?? '01';
const batchNumber = Number(selected);
if (!Number.isInteger(batchNumber) || batchNumber < 1 || batchNumber > 5)
  throw new Error('Use um lote entre 01 e 05.');

const padded = String(batchNumber).padStart(2, '0');
const outputPath = resolve(
  root,
  `supabase/migrations/20260909200${batchNumber}00_diversify_calculus_2_batch_${padded}.sql`,
);
const subjectId = '20000000-0000-4000-8000-000000000001';
const sourceId = `10000000-0000-4000-8000-${String(260 + batchNumber).padStart(12, '0')}`;
const questionStart = 99001 + (batchNumber - 1) * 50;
const topics = {
  'antiderivadas-e-integrais-indefinidas':
    '30000000-0000-4000-8000-000000000015',
  'integral-definida': '30000000-0000-4000-8000-000000000004',
  substituicao: '30000000-0000-4000-8000-000000000002',
  'integracao-por-partes': '30000000-0000-4000-8000-000000000011',
  'fracoes-parciais': '30000000-0000-4000-8000-000000000101',
  'integrais-trigonometricas': '30000000-0000-4000-8000-000000000102',
  'intervalos-infinitos': '30000000-0000-4000-8000-000000000104',
  descontinuidades: '30000000-0000-4000-8000-000000000105',
  'limite-de-sequencia': '30000000-0000-4000-8000-000000000107',
  'monotonicidade-e-convergencia': '30000000-0000-4000-8000-000000000108',
  'series-geometricas': '30000000-0000-4000-8000-000000000006',
  'convergencia-e-divergencia': '30000000-0000-4000-8000-000000000109',
  'testes-de-convergencia': '30000000-0000-4000-8000-000000000110',
  'series-alternadas': '30000000-0000-4000-8000-000000000111',
  'series-de-potencias': '30000000-0000-4000-8000-000000000112',
  'taylor-e-maclaurin': '30000000-0000-4000-8000-000000000113',
};
const sql = (value) => `'${value.replaceAll("'", "''")}'`;
const id = (prefix, value) =>
  `${prefix}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;
const ensure = (condition, message) => {
  if (!condition) throw new Error(message);
};
const validate = (text, number) => {
  ensure(
    (text.match(/\$/g) ?? []).length % 2 === 0,
    `Cifrão sem par na questão ${number}.`,
  );
  for (const match of text.matchAll(/\$([^$]+)\$/g))
    katex.renderToString(match[1], {
      throwOnError: true,
      trust: false,
      strict: 'error',
    });
};
const batch = createDiverseCalculusTwoBatch(padded);
ensure(batch.length === 50, `Lote ${padded} deve ter 50 questões.`);
ensure(
  new Set(batch.map((question) => question.statement)).size === 50,
  'Há enunciados repetidos no lote.',
);
const lines = [
  `-- Banco Cálculo II v3 — lote ${padded}: 50 questões autorais com auditoria de formatação.`,
  '-- Execute os cinco lotes na ordem antes de considerar a substituição concluída.',
  'begin;',
  '',
];
if (batchNumber === 1)
  lines.push(
    '-- Mantém tentativas antigas, mas retira o banco anterior da prática pública.',
    `update public.questions set publication_status = 'draft' where subject_id = ${sql(subjectId)} and publication_status = 'published' and coalesce(source_id::text, '') not in (${Array.from({ length: 5 }, (_, index) => sql(`10000000-0000-4000-8000-${String(261 + index).padStart(12, '0')}`)).join(', ')});`,
    '',
  );
lines.push(
  'insert into public.question_sources (id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at)',
  `values (${sql(sourceId)}, 'original', ${sql(`Arc original Cálculo II — banco v3, lote ${padded}`)}, ${sql('Questões autorais da Arc. O livro de referência foi usado apenas para mapear competências, dificuldade e variedade de formatos; nenhum enunciado ou solução foi transcrito.')}, 'Arc', 'approved', 'Equipe editorial Arc', '2026-09-09T00:00:00Z')`,
  'on conflict (id) do update set label=excluded.label, licence_note=excluded.licence_note, rights_status=excluded.rights_status, verified_by=excluded.verified_by, verified_at=excluded.verified_at;',
  '',
);
for (const [index, question] of batch.entries()) {
  const number = questionStart + index;
  const questionId = id(4, number);
  const optionIds = question.options.map((_, option) =>
    id(5, number * 10 + option + 1),
  );
  ensure(topics[question.topic], `Tópico desconhecido: ${question.topic}`);
  ensure(
    question.options.length === 4 && new Set(question.options).size === 4,
    `Alternativas inválidas: ${number}`,
  );
  ensure(
    question.hints.length >= 3 &&
      question.steps.length >= 5 &&
      question.explanation.length >= 240,
    `Editorial insuficiente: ${number}`,
  );
  for (const text of [
    question.statement,
    ...question.options,
    ...question.hints,
    question.finalAnswer,
    question.explanation,
    ...question.steps.flat(),
  ])
    validate(text, number);
  lines.push(
    `insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values (${sql(questionId)}, ${sql(subjectId)}, ${sql(sourceId)}, 'multiple_choice', ${sql(question.difficulty)}, 'published', ${sql(question.statement)}) on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;`,
    `insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ${question.options.map((option, position) => `(${sql(optionIds[position])}, ${sql(questionId)}, ${sql(String.fromCharCode(65 + position))}, ${sql(option)}, ${position + 1})`).join(', ')} on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;`,
    `insert into public.question_answer_keys (question_id, correct_option_id) values (${sql(questionId)}, ${sql(optionIds[question.correct])}) on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;`,
    `insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values (${sql(questionId)}, ${sql(topics[question.topic])}, true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;`,
    `insert into public.question_hints (id, question_id, content_markdown, sort_order) values ${question.hints.map((hint, position) => `(${sql(id(6, number * 10 + position + 1))}, ${sql(questionId)}, ${sql(hint)}, ${position + 1})`).join(', ')} on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;`,
    `insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values (${sql(questionId)}, ${sql(question.finalAnswer)}, ${sql(question.explanation)}) on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;`,
    `insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ${question.steps.map(([title, content], position) => `(${sql(id(7, number * 10 + position + 1))}, ${sql(questionId)}, ${sql(title)}, ${sql(content)}, ${position + 1})`).join(', ')} on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;`,
    '',
  );
}
lines.push('commit;', '');
const output = lines.join('\n');
if (process.argv.includes('--check')) {
  ensure(
    readFileSync(outputPath, 'utf8') === output,
    `Migration ${padded} está desatualizada.`,
  );
  console.log(`Cálculo II v3 lote ${padded} validado.`);
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, output);
  console.log(`Migration criada: ${outputPath}`);
}
