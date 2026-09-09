import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createComputerArchitectureBank } from '../content/computer-architecture/bank.mjs';

const root = resolve(import.meta.dirname, '..');
const selected =
  process.argv.find((arg) => arg.startsWith('--batch='))?.slice(8) ?? '01';
const batchNumber = Number(selected);
if (![1, 2, 3].includes(batchNumber))
  throw new Error('Use --batch=01, 02 ou 03.');
const padded = String(batchNumber).padStart(2, '0');
const outputPath = resolve(
  root,
  `supabase/migrations/2026090921${String(batchNumber).padStart(2, '0')}00_seed_computer_architecture_batch_${padded}.sql`,
);
const subjectId = '20000000-0000-4000-8000-000000000005';
const sourceId = `10000000-0000-4000-8000-00000000100${batchNumber}`;
const questionStart = 920001 + (batchNumber - 1) * 50;
const topicIds = Object.fromEntries(
  [
    'representacao-e-aritmetica',
    'logica-booleana',
    'circuitos-combinacionais',
    'flip-flops-e-registradores',
    'memoria-e-cache',
    'memoria-principal-e-enderecamento',
    'processador-e-instrucoes',
    'modos-de-enderecamento',
    'desempenho-e-pipeline',
    'barramentos-e-entrada-saida',
  ].map((key, index) => [
    key,
    `30000000-0000-4000-8000-${String(1001 + index).padStart(12, '0')}`,
  ]),
);
const sql = (value) => `'${String(value).replaceAll("'", "''")}'`;
const id = (prefix, value) =>
  `${prefix}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;
const ensure = (condition, message) => {
  if (!condition) throw new Error(message);
};
const bank = createComputerArchitectureBank();
ensure(bank.length === 150, 'O banco deve ter 150 questões.');
ensure(
  new Set(bank.map((item) => item.statement)).size === 150,
  'Há enunciados repetidos.',
);
const batch = bank.slice((batchNumber - 1) * 50, batchNumber * 50);
ensure(
  batch.filter((item) => item.difficulty === 'easy').length +
    batch.filter((item) => item.difficulty === 'medium').length +
    batch.filter((item) => item.difficulty === 'hard').length ===
    50,
  'Distribuição inválida.',
);
const lines = [
  `-- Arquitetura de Computadores — lote ${padded}: 50 questões originais, revisadas e autorais.`,
  'begin;',
];
if (batchNumber === 1)
  lines.push(
    '',
    'insert into public.subjects (id, slug, name, description, sort_order, is_published) values',
    `(${sql(subjectId)}, 'arquitetura-de-computadores', 'Arquitetura de Computadores', 'Fundamentos digitais, memória, processadores e entrada/saída.', 5, true)`,
    'on conflict (id) do update set slug=excluded.slug, name=excluded.name, description=excluded.description, sort_order=excluded.sort_order, is_published=excluded.is_published;',
    '',
    'insert into public.taxonomy_nodes (id, subject_id, parent_id, kind, slug, name, sort_order, is_published) values',
    `('30000000-0000-4000-8000-000000001101', ${sql(subjectId)}, null, 'unit', 'fundamentos-digitais', 'Fundamentos digitais', 1, true),`,
    `('30000000-0000-4000-8000-000000001102', ${sql(subjectId)}, null, 'unit', 'memoria-e-processamento', 'Memória e processamento', 2, true),`,
    `('30000000-0000-4000-8000-000000001103', ${sql(subjectId)}, null, 'unit', 'sistemas-e-desempenho', 'Sistemas e desempenho', 3, true),`,
    Object.entries(topicIds)
      .map(([key, nodeId], index) => {
        const unit = index < 4 ? '1101' : index < 8 ? '1102' : '1103';
        const names = [
          'Representação e aritmética binária',
          'Lógica booleana',
          'Circuitos combinacionais',
          'Flip-flops e registradores',
          'Memória cache',
          'Memória principal e endereçamento',
          'Processador e instruções',
          'Modos de endereçamento',
          'Desempenho e pipeline',
          'Barramentos e entrada/saída',
        ];
        return `(${sql(nodeId)}, ${sql(subjectId)}, '30000000-0000-4000-8000-00000000${unit}', 'topic', ${sql(key)}, ${sql(names[index])}, ${index + 1}, true)`;
      })
      .join(',\n') +
      '\n' +
      'on conflict (id) do update set subject_id=excluded.subject_id, parent_id=excluded.parent_id, slug=excluded.slug, name=excluded.name, sort_order=excluded.sort_order, is_published=excluded.is_published;',
  );
lines.push(
  '',
  'insert into public.question_sources (id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at)',
  `values (${sql(sourceId)}, 'original', ${sql(`Arc original Arquitetura de Computadores — lote ${padded}`)}, ${sql('Questões autorais da Arc. O livro de referência foi usado exclusivamente para mapear competências, dificuldade e recorte curricular; nenhum exercício foi transcrito ou parafraseado.')}, 'Arc', 'approved', 'Equipe editorial Arc', '2026-09-09T00:00:00Z')`,
  'on conflict (id) do update set label=excluded.label, licence_note=excluded.licence_note, rights_status=excluded.rights_status, verified_by=excluded.verified_by, verified_at=excluded.verified_at;',
  '',
);
for (const [index, question] of batch.entries()) {
  const number = questionStart + index;
  const questionId = id(4, number);
  const optionIds = question.options.map((_, option) =>
    id(5, number * 10 + option + 1),
  );
  ensure(
    question.options.length === 4 && new Set(question.options).size === 4,
    `Alternativas inválidas: ${number}`,
  );
  ensure(
    question.hints.length >= 3 && question.steps.length >= 5,
    `Conteúdo incompleto: ${number}`,
  );
  lines.push(
    `insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values (${sql(questionId)}, ${sql(subjectId)}, ${sql(sourceId)}, 'multiple_choice', ${sql(question.difficulty)}, 'published', ${sql(question.statement)}) on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;`,
    `insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ${question.options.map((option, position) => `(${sql(optionIds[position])}, ${sql(questionId)}, ${sql(String.fromCharCode(65 + position))}, ${sql(option)}, ${position + 1})`).join(', ')} on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;`,
    `insert into public.question_answer_keys (question_id, correct_option_id) values (${sql(questionId)}, ${sql(optionIds[question.correct])}) on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;`,
    `insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values (${sql(questionId)}, ${sql(topicIds[question.topic])}, true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;`,
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
  console.log(`Arquitetura de Computadores, lote ${padded}, validado.`);
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, output);
  console.log(`Migration criada: ${outputPath}`);
}
