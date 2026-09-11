import { writeFileSync } from 'node:fs';
import katex from 'katex';
import { advancedDerivativesLimitsBatch } from '../content/calculus-1/advanced-derivatives-limits-batch.mjs';

const topics = {
  'produto-e-quociente': '024',
  'regra-da-cadeia': '025',
  'derivacao-implicita-e-logaritmica': '026',
  'regra-de-lhopital': '031',
  'calculo-de-limites': '018',
  'limites-no-infinito-e-assintotas': '020',
  'teorema-fundamental-do-calculo': '037',
};
const subjectId = '20000000-0000-4000-8000-000000000004';
const sourceId = '10000000-0000-4000-8000-000000001503';
const output = 'supabase/migrations/20260910170000_reorganize_calculus_1_advanced_derivatives_limits.sql';
const sql = (value) => `'${String(value).replaceAll("'", "''")}'`;
const uuid = (prefix, number) => `${prefix}-0000-4000-8000-${String(number).padStart(12, '0')}`;

const retiredReviewedIds = [
  19, 21, 22, 23, 25,
  ...Array.from({ length: 25 }, (_, index) => 26 + index),
  51, 54, 57, 60, 63, 66, 69, 72,
  ...Array.from({ length: 25 }, (_, index) => 76 + index),
];

if (advancedDerivativesLimitsBatch.length !== 20) throw new Error('O lote deve conter 20 questões.');
if (new Set(advancedDerivativesLimitsBatch.map((question) => question.statement)).size !== 20)
  throw new Error('Há enunciados repetidos.');

for (const question of advancedDerivativesLimitsBatch) {
  if (!topics[question.topic]) throw new Error(`Tópico desconhecido: ${question.id}`);
  if (question.difficulty !== 'hard') throw new Error(`Dificuldade inválida: ${question.id}`);
  if (question.options.length !== 4 || new Set(question.options).size !== 4)
    throw new Error(`Alternativas inválidas: ${question.id}`);
  if (question.options[question.correct] !== question.finalAnswer)
    throw new Error(`Gabarito incompatível: ${question.id}`);
  if (question.hints.length !== 3 || question.steps.length !== 5)
    throw new Error(`Orientação incompleta: ${question.id}`);
  if (!question.skill || !question.command || !question.error)
    throw new Error(`Matriz incompleta: ${question.id}`);
  const texts = [
    question.statement,
    ...question.options,
    ...question.hints,
    question.finalAnswer,
    question.explanation,
    ...question.steps.flat(),
  ];
  for (const text of texts) {
    if ((text.match(/\$/g) ?? []).length % 2) throw new Error(`LaTeX sem par: ${question.id}`);
    if (/\$\$/.test(text)) throw new Error(`LaTeX em bloco proibido: ${question.id}`);
    for (const match of text.matchAll(/\$([^$]+)\$/g))
      katex.renderToString(match[1], { throwOnError: true, strict: 'error' });
  }
}

const lines = [
  '-- Reorganiza Cálculo I: retira itens de treino elementar e publica 20 questões difíceis autorais.',
  '-- O PDF Thomas, Cálculo, v. 2, 11. ed. foi usado apenas para mapear competências e rigor.',
  '-- As questões não copiam nem parafraseiam exercícios da obra.',
  'begin;',
  `insert into public.question_sources (id,kind,label,licence_note,rights_holder,rights_status,verified_by,verified_at) values (${sql(sourceId)},'original',${sql('Arc original Cálculo I — derivadas e limites avançados')},${sql('Questões autorais. Thomas, Cálculo, volume 2, 11ª edição, foi consultado somente para mapear rigor, limites frequentes e composição por regra da cadeia; nenhum exercício foi reproduzido.')},'Arc','approved','Equipe editorial Arc','2026-09-10T00:00:00Z') on conflict (id) do update set label=excluded.label,licence_note=excluded.licence_note,rights_status=excluded.rights_status,verified_by=excluded.verified_by,verified_at=excluded.verified_at;`,
  '-- Preserva tentativas: os itens triviais deixam o catálogo, mas continuam no histórico.',
  `update public.questions set publication_status='archived' where subject_id=${sql(subjectId)} and id in (${retiredReviewedIds.map((number) => sql(uuid('00000042', number * 100))).join(',')});`,
];

for (const [index, question] of advancedDerivativesLimitsBatch.entries()) {
  const n = 15300 + index;
  const questionId = uuid('00000043', n);
  const optionIds = question.options.map((_, optionIndex) => uuid('00000053', n * 10 + optionIndex + 1));
  lines.push(
    `insert into public.questions (id,subject_id,source_id,kind,difficulty,publication_status,statement_markdown) values (${sql(questionId)},${sql(subjectId)},${sql(sourceId)},'multiple_choice','hard','published',${sql(question.statement)}) on conflict (id) do update set source_id=excluded.source_id,difficulty=excluded.difficulty,publication_status=excluded.publication_status,statement_markdown=excluded.statement_markdown;`,
    `insert into public.question_options (id,question_id,label,content_markdown,sort_order) values ${question.options.map((option, optionIndex) => `(${sql(optionIds[optionIndex])},${sql(questionId)},${sql(String.fromCharCode(65 + optionIndex))},${sql(option)},${optionIndex + 1})`).join(',')} on conflict (id) do update set label=excluded.label,content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`,
    `insert into public.question_answer_keys (question_id,correct_option_id) values (${sql(questionId)},${sql(optionIds[question.correct])}) on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;`,
    `insert into public.question_taxonomy_tags (question_id,taxonomy_node_id,is_primary) values (${sql(questionId)},${sql(`30000000-0000-4000-8000-000000000${topics[question.topic]}`)},true) on conflict (question_id,taxonomy_node_id) do update set is_primary=true;`,
    `insert into public.question_hints (id,question_id,content_markdown,sort_order) values ${question.hints.map((hint, hintIndex) => `(${sql(uuid('00000063', n * 10 + hintIndex + 1))},${sql(questionId)},${sql(hint)},${hintIndex + 1})`).join(',')} on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`,
    `insert into public.question_solutions (question_id,final_answer_markdown,explanation_markdown) values (${sql(questionId)},${sql(question.finalAnswer)},${sql(question.explanation)}) on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown,explanation_markdown=excluded.explanation_markdown;`,
    `insert into public.question_solution_steps (id,question_id,title,content_markdown,sort_order) values ${question.steps.map(([title, content], stepIndex) => `(${sql(uuid('00000073', n * 10 + stepIndex + 1))},${sql(questionId)},${sql(title)},${sql(content)},${stepIndex + 1})`).join(',')} on conflict (id) do update set title=excluded.title,content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`,
  );
}

lines.push('commit;', '');
writeFileSync(output, lines.join('\n'));
console.log({
  output,
  retired: retiredReviewedIds.length,
  questions: advancedDerivativesLimitsBatch.length,
  options: advancedDerivativesLimitsBatch.length * 4,
  hints: advancedDerivativesLimitsBatch.length * 3,
  steps: advancedDerivativesLimitsBatch.length * 5,
});
