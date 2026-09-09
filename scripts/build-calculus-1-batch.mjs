import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import katex from 'katex';
import { dirname, resolve } from 'node:path';
import batch from '../content/calculus-1/batch-01.mjs';

const root = resolve(import.meta.dirname, '..');
const repair = process.argv.includes('--repair');
const outputPath = resolve(
  root,
  repair
    ? 'supabase/migrations/20260909140000_repair_calculus_1_batch_01_math_markup.sql'
    : 'supabase/migrations/20260909133000_seed_calculus_1_batch_01.sql',
);
const subjectId = '20000000-0000-4000-8000-000000000004';
const sourceId = '10000000-0000-4000-8000-000000000004';

const topics = {
  'representacoes-de-funcoes': '30000000-0000-4000-8000-000000000012',
  'modelos-e-funcoes-elementares': '30000000-0000-4000-8000-000000000013',
  'composicao-e-transformacoes': '30000000-0000-4000-8000-000000000014',
  'funcoes-inversas-e-logaritmicas': '30000000-0000-4000-8000-000000000015',
  'nocao-de-limite': '30000000-0000-4000-8000-000000000017',
  'calculo-de-limites': '30000000-0000-4000-8000-000000000018',
  continuidade: '30000000-0000-4000-8000-000000000019',
  'limites-no-infinito-e-assintotas': '30000000-0000-4000-8000-000000000020',
  'taxa-de-variacao-e-derivada': '30000000-0000-4000-8000-000000000022',
  'regras-basicas-de-derivacao': '30000000-0000-4000-8000-000000000023',
  'produto-e-quociente': '30000000-0000-4000-8000-000000000024',
  'regra-da-cadeia': '30000000-0000-4000-8000-000000000025',
  'derivacao-implicita-e-logaritmica': '30000000-0000-4000-8000-000000000026',
  'taxas-relacionadas-e-aproximacoes': '30000000-0000-4000-8000-000000000027',
  'extremos-e-valor-medio': '30000000-0000-4000-8000-000000000029',
  'analise-de-graficos': '30000000-0000-4000-8000-000000000030',
  'regra-de-lhopital': '30000000-0000-4000-8000-000000000031',
  otimizacao: '30000000-0000-4000-8000-000000000032',
  'metodo-de-newton': '30000000-0000-4000-8000-000000000033',
  primitivas: '30000000-0000-4000-8000-000000000034',
  'integral-definida': '30000000-0000-4000-8000-000000000036',
  'teorema-fundamental-do-calculo': '30000000-0000-4000-8000-000000000037',
  substituicao: '30000000-0000-4000-8000-000000000038',
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
        `\\\\${command}`,
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
  `O lote precisa ter 50 questões; recebeu ${batch.length}.`,
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
  repair
    ? '-- Reaplica o lote 01 de Cálculo I com marcação matemática canônica.'
    : '-- Lote 01 de Cálculo I: 50 questões autorais revisadas para a Arc.',
  '-- Pré-requisito: execute primeiro 20260909130000_add_calculus_1_catalogue.sql.',
  'begin;',
  '',
  'insert into public.question_sources (id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at)',
  `values (${sql(sourceId)}, 'original', 'Arc original Cálculo I — lote 01', ${sql('Questões originais da Arc. Não reproduzem exercícios de fontes externas; revisão editorial interna concluída.')}, 'Arc', 'approved', 'Equipe editorial Arc', '2026-09-09T00:00:00Z')`,
  'on conflict (id) do update set label = excluded.label, licence_note = excluded.licence_note, rights_status = excluded.rights_status, verified_by = excluded.verified_by, verified_at = excluded.verified_at;',
  '',
];

batch.forEach((question, index) => {
  const questionNumber = 10001 + index;
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
    `insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values (${sql(questionId)}, ${sql(subjectId)}, ${sql(sourceId)}, 'multiple_choice', ${sql(question.difficulty)}, 'published', ${sql(question.statement)})`,
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
    'Lote de Cálculo I validado: 50 questões e migration sincronizada.',
  );
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, output);
  console.log(`Migration criada: ${outputPath}`);
}
