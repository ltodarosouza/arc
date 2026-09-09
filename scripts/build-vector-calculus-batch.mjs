import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import katex from 'katex';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const selectedBatch =
  process.argv.find((argument) => argument.startsWith('--batch='))?.slice(8) ??
  '01';
const batches = Object.fromEntries(
  Array.from({ length: 8 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    return [
      number,
      {
        migration: `2026090916${String((index + 1) * 10).padStart(2, '0')}00_seed_vector_calculus_batch_${number}.sql`,
        questionStart: 41001 + index * 100,
        sourceId: `10000000-0000-4000-8000-${String(201 + index).padStart(12, '0')}`,
        label: `Arc original Cálculo Vetorial — lote ${number}`,
      },
    ];
  }),
);
const configuration = batches[selectedBatch];
if (!configuration)
  throw new Error(`Lote de Cálculo Vetorial desconhecido: ${selectedBatch}.`);
const { createVectorBatch } =
  await import('../content/vector-calculus/batches.mjs');
const batch = createVectorBatch(selectedBatch);
const outputPath = resolve(
  root,
  `supabase/migrations/${configuration.migration}`,
);
const subjectId = '20000000-0000-4000-8000-000000000003';

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
];
const normalizeMath = (text) =>
  text.replace(/\$([^$]+)\$/g, (_, source) => {
    let math = source
      .replace(/\f/g, '\\f')
      .replace(/\u0008/g, '\\b')
      .replace(/\t(?=o\b)/g, '\\t');
    for (const command of texCommands) {
      math = math.replace(
        new RegExp(`(?<![A-Za-z\\\\])${command}(?![A-Za-z])`, 'g'),
        `\\${command}`,
      );
    }
    return `$${math}$`;
  });
const sql = (value) => `'${normalizeMath(value).replaceAll("'", "''")}'`;
const id = (prefix, value) =>
  `${prefix}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;
const ensure = (condition, message) => {
  if (!condition) throw new Error(message);
};

ensure(
  batch.length === 50,
  `O lote ${selectedBatch} precisa ter 50 questões; recebeu ${batch.length}.`,
);
ensure(
  new Set(batch.map((question) => question.statement)).size === batch.length,
  'Há enunciados repetidos no lote.',
);

const validateText = (text, questionNumber) => {
  const normalized = normalizeMath(text);
  ensure(
    (normalized.match(/\$/g) ?? []).length % 2 === 0,
    `Delimitador matemático sem par na questão ${questionNumber}.`,
  );
  for (const match of normalized.matchAll(/\$([^$]+)\$/g)) {
    katex.renderToString(match[1], {
      throwOnError: true,
      trust: false,
      strict: 'error',
    });
  }
};

const lines = [
  `-- Lote ${selectedBatch} de Cálculo Vetorial: 50 questões autorais revisadas para a Arc.`,
  '-- Pré-requisito: execute primeiro 20260909160000_expand_vector_calculus_catalogue.sql.',
  'begin;',
  '',
  'insert into public.question_sources (id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at)',
  `values (${sql(configuration.sourceId)}, 'original', ${sql(configuration.label)}, ${sql('Questões originais da Arc. Não reproduzem exercícios de fontes externas; revisão editorial interna concluída.')}, 'Arc', 'approved', 'Equipe editorial Arc', '2026-09-09T00:00:00Z')`,
  'on conflict (id) do update set label = excluded.label, licence_note = excluded.licence_note, rights_status = excluded.rights_status, verified_by = excluded.verified_by, verified_at = excluded.verified_at;',
  '',
];

batch.forEach((question, index) => {
  const questionNumber = configuration.questionStart + index;
  const questionId = id(4, questionNumber);
  const optionIds = question.options.map((_, optionIndex) =>
    id(5, questionNumber * 10 + optionIndex + 1),
  );
  ensure(topics[question.topic], `Tópico desconhecido: ${question.topic}.`);
  ensure(
    ['easy', 'medium', 'hard'].includes(question.difficulty),
    `Dificuldade inválida em ${questionNumber}.`,
  );
  ensure(
    question.options.length === 4,
    `A questão ${questionNumber} precisa de quatro alternativas.`,
  );
  ensure(
    new Set(question.options).size === 4,
    `A questão ${questionNumber} possui alternativas repetidas.`,
  );
  ensure(
    Number.isInteger(question.correct) &&
      question.correct >= 0 &&
      question.correct < 4,
    `Gabarito inválido em ${questionNumber}.`,
  );
  ensure(
    question.hints.length >= 2,
    `A questão ${questionNumber} precisa de pelo menos duas dicas.`,
  );
  ensure(
    question.steps.length >= 2,
    `A questão ${questionNumber} precisa de passos suficientes para ensinar.`,
  );
  ensure(
    question.explanation.length >= 110,
    `A explicação da questão ${questionNumber} está curta demais.`,
  );
  for (const text of [
    question.statement,
    ...question.options,
    ...question.hints,
    question.finalAnswer,
    question.explanation,
    ...question.steps.flat(),
  ]) {
    validateText(text, questionNumber);
  }

  lines.push(
    `insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values (${sql(questionId)}, ${sql(subjectId)}, ${sql(configuration.sourceId)}, 'multiple_choice', ${sql(question.difficulty)}, 'published', ${sql(question.statement)})`,
    'on conflict (id) do update set subject_id = excluded.subject_id, source_id = excluded.source_id, kind = excluded.kind, difficulty = excluded.difficulty, publication_status = excluded.publication_status, statement_markdown = excluded.statement_markdown;',
    `insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ${question.options.map((option, optionIndex) => `(${sql(optionIds[optionIndex])}, ${sql(questionId)}, ${sql(String.fromCharCode(65 + optionIndex))}, ${sql(option)}, ${optionIndex + 1})`).join(', ')}`,
    'on conflict (id) do update set question_id = excluded.question_id, label = excluded.label, content_markdown = excluded.content_markdown, sort_order = excluded.sort_order;',
    `insert into public.question_answer_keys (question_id, correct_option_id) values (${sql(questionId)}, ${sql(optionIds[question.correct])}) on conflict (question_id) do update set correct_option_id = excluded.correct_option_id;`,
    `insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values (${sql(questionId)}, ${sql(topics[question.topic])}, true) on conflict (question_id, taxonomy_node_id) do update set is_primary = excluded.is_primary;`,
    `insert into public.question_hints (id, question_id, content_markdown, sort_order) values ${question.hints.map((hint, hintIndex) => `(${sql(id(6, questionNumber * 10 + hintIndex + 1))}, ${sql(questionId)}, ${sql(hint)}, ${hintIndex + 1})`).join(', ')}`,
    'on conflict (id) do update set question_id = excluded.question_id, content_markdown = excluded.content_markdown, sort_order = excluded.sort_order;',
    `insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values (${sql(questionId)}, ${sql(question.finalAnswer)}, ${sql(question.explanation)}) on conflict (question_id) do update set final_answer_markdown = excluded.final_answer_markdown, explanation_markdown = excluded.explanation_markdown;`,
    `insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ${question.steps.map(([title, content], stepIndex) => `(${sql(id(7, questionNumber * 10 + stepIndex + 1))}, ${sql(questionId)}, ${sql(title)}, ${sql(content)}, ${stepIndex + 1})`).join(', ')}`,
    'on conflict (id) do update set question_id = excluded.question_id, title = excluded.title, content_markdown = excluded.content_markdown, sort_order = excluded.sort_order;',
    '',
  );
});

lines.push('commit;', '');
const output = lines.join('\n');
if (process.argv.includes('--check')) {
  ensure(
    readFileSync(outputPath, 'utf8') === output,
    'A migration está desatualizada. Execute npm run content:build:calc1.',
  );
  console.log(
    `Lote ${selectedBatch} de Cálculo Vetorial validado: 50 questões e migration sincronizada.`,
  );
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, output);
  console.log(`Migration criada: ${outputPath}`);
}
