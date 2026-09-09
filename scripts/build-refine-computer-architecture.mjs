import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createComputerArchitectureBank } from '../content/computer-architecture/bank.mjs';

const root = resolve(import.meta.dirname, '..');
const outputPath = resolve(
  root,
  'supabase/migrations/20260909211000_refine_computer_architecture_questions.sql',
);
const sql = (value) => `'${String(value).replaceAll("'", "''")}'`;
const id = (prefix, value) =>
  `${prefix}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;
const ensure = (condition, message) => {
  if (!condition) throw new Error(message);
};
const bank = createComputerArchitectureBank();
ensure(bank.length === 150, 'O banco revisado deve ter 150 questões.');
ensure(
  new Set(bank.map((item) => item.statement)).size === 150,
  'Há enunciados repetidos no banco revisado.',
);

const lines = [
  '-- Revisão editorial: enunciados diretos, dicas específicas e diagramas locais.',
  'begin;',
  '',
];
for (const [index, question] of bank.entries()) {
  const number = 920001 + index;
  const questionId = id(4, number);
  const optionIds = question.options.map((_, option) =>
    id(5, number * 10 + option + 1),
  );
  ensure(
    question.hints.length >= 3 && question.steps.length >= 5,
    `Questão ${number} incompleta.`,
  );
  lines.push(
    `update public.questions set statement_markdown=${sql(question.statement)} where id=${sql(questionId)};`,
    ...question.options.map(
      (option, position) =>
        `update public.question_options set content_markdown=${sql(option)}, sort_order=${position + 1} where id=${sql(optionIds[position])};`,
    ),
    ...question.hints.map(
      (hint, position) =>
        `update public.question_hints set content_markdown=${sql(hint)}, sort_order=${position + 1} where id=${sql(id(6, number * 10 + position + 1))};`,
    ),
    `update public.question_solutions set final_answer_markdown=${sql(question.finalAnswer)}, explanation_markdown=${sql(question.explanation)} where question_id=${sql(questionId)};`,
    ...question.steps.map(
      ([title, content], position) =>
        `update public.question_solution_steps set title=${sql(title)}, content_markdown=${sql(content)}, sort_order=${position + 1} where id=${sql(id(7, number * 10 + position + 1))};`,
    ),
    '',
  );
}
lines.push('commit;', '');
const output = lines.join('\n');
if (process.argv.includes('--check')) {
  ensure(
    readFileSync(outputPath, 'utf8') === output,
    'Migration de revisão está desatualizada.',
  );
  console.log('Revisão de Arquitetura de Computadores validada.');
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, output);
  console.log(`Migration criada: ${outputPath}`);
}
