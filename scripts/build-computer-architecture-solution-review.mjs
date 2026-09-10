import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const selected = process.argv
  .find((arg) => arg.startsWith('--batch='))
  ?.slice(8);
const check = process.argv.includes('--check');
const batches = Array.from({ length: 6 }, (_, index) =>
  String(index + 1).padStart(2, '0'),
);

if (selected && !batches.includes(selected))
  throw new Error('Use --batch=01 até --batch=06.');

const sql = (value) => `'${String(value).replaceAll("'", "''")}'`;
const id = (prefix, value) =>
  `${prefix}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;

async function load(batch) {
  const { default: questions } = await import(
    `../content/computer-architecture/replacement/batch-${batch}.mjs`
  );
  assert.equal(questions.length, 25, `Lote ${batch} deve ter 25 questões.`);
  return questions;
}

function validate(questions) {
  const steps = questions.flatMap((question) =>
    question.solution.map(([, text]) => text),
  );
  assert.equal(
    new Set(steps).size,
    steps.length,
    'Há textos de passos repetidos; a revisão precisa ser específica para cada caso.',
  );
  for (const question of questions) {
    assert.equal(
      question.solution.length,
      5,
      `${question.id}: resolução incompleta.`,
    );
    assert(
      question.explanation.length >= 180,
      `${question.id}: explicação curta.`,
    );
    for (const distractor of question.distractors)
      assert(
        question.explanation.includes(`“${distractor}”`),
        `${question.id}: o distrator não foi explicado: ${distractor}`,
      );
  }
}

function render(batch, questions) {
  const batchIndex = Number(batch) - 1;
  const lines = [
    `-- Arquitetura de Computadores: revisão de gabaritos, lote ${batch}.`,
    '-- Atualiza apenas soluções e passos; tentativas e alternativas são preservadas.',
    'begin;',
    '',
  ];
  for (const [index, question] of questions.entries()) {
    const number = 930001 + batchIndex * 25 + index;
    const questionId = id(4, number);
    lines.push(
      `update public.question_solutions set final_answer_markdown=${sql(question.answer)}, explanation_markdown=${sql(question.explanation)} where question_id=${sql(questionId)};`,
      ...question.solution.map(
        ([title, content], stepIndex) =>
          `update public.question_solution_steps set title=${sql(title)}, content_markdown=${sql(content)}, sort_order=${stepIndex + 1} where id=${sql(id(7, number * 10 + stepIndex + 1))};`,
      ),
      '',
    );
  }
  lines.push('commit;', '');
  return lines.join('\n');
}

for (const batch of selected ? [selected] : batches) {
  const questions = await load(batch);
  validate(questions);
  const filename = `2026091011${batch}00_refine_computer_architecture_solutions_batch_${batch}.sql`;
  const target = resolve(root, 'supabase', 'migrations', filename);
  const output = render(batch, questions);
  if (check) {
    assert.equal(
      readFileSync(target, 'utf8'),
      output,
      `${filename} está desatualizada.`,
    );
    console.log(`Lote ${batch} validado.`);
  } else {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, output);
    console.log(`Migration criada: ${target}`);
  }
}
