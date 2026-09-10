import { readFileSync } from 'node:fs';

const migrations = [
  '20260910130000_seed_calculus_2_reconstruction_block_01.sql',
  '20260910140000_seed_calculus_2_reconstruction_block_02.sql',
  '20260910150000_seed_calculus_2_reconstruction_block_03.sql',
];
const root = new URL('../../supabase/migrations/', import.meta.url);
const tables = ['questions', 'question_options', 'question_answer_keys', 'question_hints', 'question_solutions', 'question_solution_steps'];
const rows = Object.fromEntries(tables.map((table) => [table, []]));
const errors = [];

function valuesFrom(line) {
  const start = line.indexOf(' values (');
  if (start < 0) return [];
  const source = line.slice(start + 9);
  const values = [];
  let current = '';
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === "'") {
      if (quoted && source[index + 1] === "'") {
        current += "'";
        index += 1;
      } else quoted = !quoted;
    } else if (!quoted && char === ',') {
      values.push(current.trim());
      current = '';
    } else if (!quoted && char === ')' && source.slice(index).startsWith(') on conflict')) {
      values.push(current.trim());
      break;
    } else current += char;
  }
  return values;
}

for (const migration of migrations) {
  const text = readFileSync(new URL(migration, root), 'utf8');
  for (const line of text.split('\n')) {
    for (const table of tables) {
      if (line.startsWith(`insert into public.${table} `)) rows[table].push({ migration, values: valuesFrom(line) });
    }
  }
}

const expected = {
  questions: 100,
  question_options: 400,
  question_answer_keys: 100,
  question_hints: 300,
  question_solutions: 100,
  question_solution_steps: 500,
};
for (const [table, count] of Object.entries(expected)) {
  if (rows[table].length !== count) errors.push(`${table}: esperado ${count}, encontrado ${rows[table].length}`);
}

const optionsByQuestion = new Map();
for (const row of rows.question_options) {
  const [id, questionId, label, content, sortOrder] = row.values;
  if (!optionsByQuestion.has(questionId)) optionsByQuestion.set(questionId, []);
  optionsByQuestion.get(questionId).push({ id, label, content, sortOrder });
}
const hintsByQuestion = new Map();
for (const row of rows.question_hints) {
  const [, questionId, content] = row.values;
  if (!hintsByQuestion.has(questionId)) hintsByQuestion.set(questionId, []);
  hintsByQuestion.get(questionId).push(content);
}
const stepsByQuestion = new Map();
for (const row of rows.question_solution_steps) {
  const [, questionId, content] = row.values;
  if (!stepsByQuestion.has(questionId)) stepsByQuestion.set(questionId, []);
  stepsByQuestion.get(questionId).push(content);
}
const optionIds = new Set(rows.question_options.map((row) => row.values[0]));
for (const row of rows.question_answer_keys) {
  if (!optionIds.has(row.values[1])) errors.push(`${row.values[0]}: chave aponta para alternativa inexistente`);
}
for (const row of rows.questions) {
  const questionId = row.values[0];
  const options = optionsByQuestion.get(questionId) || [];
  const hints = hintsByQuestion.get(questionId) || [];
  const steps = stepsByQuestion.get(questionId) || [];
  if (options.length !== 4 || new Set(options.map((item) => item.content)).size !== 4) errors.push(`${questionId}: alternativas inválidas`);
  if (hints.length !== 3 || new Set(hints).size !== 3) errors.push(`${questionId}: dicas inválidas`);
  if (steps.length !== 5 || new Set(steps).size !== 5) errors.push(`${questionId}: passos inválidos`);
}

const contentColumns = [
  ...rows.questions.map((row) => row.values[6]),
  ...rows.question_options.map((row) => row.values[3]),
  ...rows.question_hints.map((row) => row.values[2]),
  ...rows.question_solutions.flatMap((row) => [row.values[1], row.values[2]]),
  ...rows.question_solution_steps.map((row) => row.values[2]),
];
const generic = /Etapa \d|Escolha a transformação ou teste apropriado|Confira limites, sinal e hipótese|A resolução usa/i;
const bareCommand = /(?<!\\)\b(?:int|sum|sqrt|ln|lim|pi|infty|to|ge|le|cdot|frac|prime|cos|sin|tan|sec|arctan)\b/;
for (const content of contentColumns) {
  if ((content.match(/\$/g) || []).length % 2 || content.includes('$$')) errors.push(`LaTeX delimitado incorretamente: ${content}`);
  if (generic.test(content)) errors.push(`texto genérico: ${content}`);
  for (const math of content.matchAll(/\$([^$]+)\$/g)) {
    if (bareCommand.test(math[1])) errors.push(`comando LaTeX sem barra: $${math[1]}$`);
  }
}

for (const [label, content] of [
  ['enunciados', rows.questions.map((row) => row.values[6])],
  ['dicas', rows.question_hints.map((row) => row.values[2])],
  ['passos', rows.question_solution_steps.map((row) => row.values[2])],
]) {
  if (new Set(content).size !== content.length) errors.push(`${String(label)}: há duplicatas exatas`);
}

const normalize = (text) => new Set(text.toLowerCase().replace(/\d+(?:[,.]\d+)?/g, '#').normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/[a-z]+|#|[+*/^=-]+/g) || []);
const statements = rows.questions.map((row) => ({ id: row.values[0], text: row.values[6], words: normalize(row.values[6]) }));
for (let left = 0; left < statements.length; left += 1) {
  for (let right = left + 1; right < statements.length; right += 1) {
    const a = statements[left].words;
    const b = statements[right].words;
    const intersection = [...a].filter((word) => b.has(word)).length;
    const union = new Set([...a, ...b]).size;
    if (union >= 8 && intersection / union >= 0.9) errors.push(`enunciados possivelmente semelhantes: ${statements[left].id} e ${statements[right].id}`);
  }
}

const difficulties = Object.groupBy(rows.questions, (row) => row.values[4]);
console.log(JSON.stringify({
  questions: rows.questions.length,
  options: rows.question_options.length,
  hints: rows.question_hints.length,
  steps: rows.question_solution_steps.length,
  difficulties: Object.fromEntries(Object.entries(difficulties).map(([key, value]) => [key, value.length])),
  errors,
}, null, 2));
if (errors.length) process.exitCode = 1;
