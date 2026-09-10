import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const migrationDir = resolve(root, 'supabase/migrations');
const files = readdirSync(migrationDir)
  .filter((name) => /^20260909221[1-8]00_seed_authorial_vector_calculus_batch_\d+\.sql$/.test(name))
  .sort();
const correction = readFileSync(resolve(migrationDir, '20260910160000_review_vector_calculus_bank.sql'), 'utf8');
const deletion = readFileSync(resolve(migrationDir, '20260910161000_delete_duplicate_vector_calculus_questions.sql'), 'utf8');
const source = files.map((name) => readFileSync(resolve(migrationDir, name), 'utf8')).join('\n');
const fail = (message) => { throw new Error(message); };
const questionStarts = [...source.matchAll(/insert into public\.questions[^;]+?values \('([^']+)'/g)];
const blocks = questionStarts.map((match, index) => source.slice(match.index, questionStarts[index + 1]?.index));
const ids = questionStarts.map((match) => match[1]);
if (ids.length !== 160 || new Set(ids).size !== 160) fail(`Esperadas 160 questões com IDs únicos; encontradas ${ids.length}.`);
const archived = [...correction.matchAll(/'40000000-0000-4000-8000-00000005\d{4}'/g)]
  .map((match) => match[0].slice(1, -1)).filter((id) => /050(205|316|509|515|7\d{2})$/.test(id));
if (new Set(archived).size !== 24) fail('A lista de arquivamento deve conter 24 IDs distintos.');
for (const id of archived) if (!ids.includes(id)) fail(`ID arquivado inexistente: ${id}`);
const taxonomy = new Set([
  '30000000-0000-4000-8000-000000000209', '30000000-0000-4000-8000-000000000210',
  '30000000-0000-4000-8000-000000000211', '30000000-0000-4000-8000-000000000212',
  '30000000-0000-4000-8000-000000000213', '30000000-0000-4000-8000-000000000214',
  '30000000-0000-4000-8000-000000000215', '30000000-0000-4000-8000-000000000216',
  '30000000-0000-4000-8000-000000000217', '30000000-0000-4000-8000-000000000218',
]);
const statements = new Map();
for (const [index, id] of ids.entries()) {
  const block = blocks[index];
  const statement = block.match(/'published','((?:[^']|'')*)'\) on conflict \(id\) do update set statement_markdown/)?.[1];
  if (!statement) fail(`${id}: enunciado não foi lido.`);
  if (statements.has(statement)) fail(`${id}: duplica exatamente ${statements.get(statement)}.`);
  statements.set(statement, id);
  const optionIds = [...block.matchAll(new RegExp(`\\('([^']+)','${id}','[A-D]'`, 'g'))].map((match) => match[1]);
  if (optionIds.length !== 4) fail(`${id}: não há quatro alternativas.`);
  if (new Set(optionIds).size !== 4) fail(`${id}: alternativas duplicadas.`);
  const key = block.match(new RegExp(`question_answer_keys[^;]+?values \\('${id}','([^']+)'`))?.[1];
  if (!key || !optionIds.includes(key)) fail(`${id}: chave não referencia uma alternativa.`);
  const hints = [...block.matchAll(new RegExp(`\\('[^']+','${id}','(?:[^']|'')*',\\d+\\)`, 'g'))];
  if (hints.length < 3) fail(`${id}: não há três dicas.`);
  const steps = [...block.matchAll(new RegExp(`\\('[^']+','${id}','(?:[^']|'')*','(?:[^']|'')*',\\d+\\)`, 'g'))];
  if (steps.length < 4) fail(`${id}: passos de solução insuficientes.`);
  const tag = block.match(new RegExp(`question_taxonomy_tags[^;]+?values \\('${id}','([^']+)',true`))?.[1];
  if (!tag || !taxonomy.has(tag)) fail(`${id}: tag primária inexistente.`);
  if (/\$\$/.test(block) || (block.match(/\$/g)?.length ?? 0) % 2) fail(`${id}: delimitadores LaTeX inválidos.`);
  if (/Aplique o método|Substitua os valores|Etapa \d+ da resolução/i.test(block)) fail(`${id}: frase-modelo encontrada.`);
}
if (!correction.includes("'ucdot', '\\\\cdot'") || !correction.includes("'^circ', '^\\\\circ'"))
  fail('A normalização de LaTeX inválido está ausente.');
for (const phrase of ['Identifique a grandeza', 'Aplique a definição', 'Obtenha o resultado'])
  if (!correction.includes(`step.title in`) || !correction.includes(`'${phrase}'`)) fail(`Cabeçalho-modelo não tratado: ${phrase}`);
if (!deletion.includes('delete from public.question_attempts') || !deletion.includes('delete from public.questions'))
  fail('A exclusão de duplicatas e de tentativas dependentes está ausente.');
console.log(JSON.stringify({
  sourceQuestions: ids.length,
  deletedDuplicates: new Set(archived).size,
  publishedAfterDeletion: ids.length - new Set(archived).size,
  optionsPerQuestion: 4,
  hintsPerQuestion: 3,
  status: 'static preflight passed',
}, null, 2));
