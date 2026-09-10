import { writeFile } from 'node:fs/promises';

const batches = await Promise.all(
  [1, 2, 3, 4, 5, 6].map((number) => import(`../content/calculus-1/replacement-batch-0${number}.mjs`)),
);
const bank = batches.flatMap((batch) => batch.default);

const quote = (value) => `'${String(value).replaceAll("'", "''")}'`;
const id = (prefix, question, order = 0) =>
  `${prefix}-0000-4000-8000-${String(question * 100 + order).padStart(12, '0')}`;
const subjectId = '20000000-0000-4000-8000-000000000004';
const sourceId = '10000000-0000-4000-8000-000000001400';

function taxonomyFor(question) {
  if (question.id.startsWith('c1-r02-')) return '015';
  if (question.id.startsWith('c1-r03-')) {
    const text = `${question.statement} ${question.focus}`.toLowerCase();
    if (/assíntota|infty|infinito|vertical/.test(text)) return '020';
    if (/contínua|descontínua|descontinuidade|\bln x/.test(text)) return '019';
    if (/laterais|significa/.test(text)) return '017';
    return '018';
  }
  if (question.id.startsWith('c1-r04-'))
    return / em \$x=/.test(question.statement) ? '022' : '023';
  if (/composição|transformação/.test(question.focus)) return '014';
  if (/inversa|logaritmo|exponencial/.test(question.focus)) return '015';
  if (/modelo|taxa média|racional|assíntota/.test(question.focus)) return '013';
  return '012';
}

let sql = `-- Banco Cálculo I revisado: 100 itens de múltipla escolha, sem apagar histórico.\nbegin;\n`;
sql += `insert into public.question_sources (id,kind,label,licence_note,rights_holder,rights_status,verified_by,verified_at) values (${quote(sourceId)},'original','Arc original Cálculo I — revisão editorial 2026','Conteúdo autoral; referências serviram exclusivamente ao mapeamento de competências.','Arc','approved','Equipe editorial Arc','2026-09-10T00:00:00Z') on conflict (id) do update set label=excluded.label,licence_note=excluded.licence_note;\n`;
// Archiving preserves question_attempts and redo_questions; no historical row is deleted.
sql += `update public.questions set publication_status='archived' where subject_id=${quote(subjectId)} and publication_status='published';\n`;

for (const [index, question] of bank.entries()) {
  const n = index + 1;
  const questionId = id('00000042', n);
  const tagId = `30000000-0000-4000-8000-000000000${taxonomyFor(question)}`;
  sql += `insert into public.questions (id,subject_id,source_id,kind,difficulty,publication_status,statement_markdown) values (${quote(questionId)},${quote(subjectId)},${quote(sourceId)},'multiple_choice',${quote(question.difficulty)},'published',${quote(question.statement)}) on conflict (id) do update set source_id=excluded.source_id,difficulty=excluded.difficulty,publication_status=excluded.publication_status,statement_markdown=excluded.statement_markdown;\n`;
  sql += `insert into public.question_taxonomy_tags (question_id,taxonomy_node_id,is_primary) values (${quote(questionId)},${quote(tagId)},true) on conflict (question_id,taxonomy_node_id) do update set is_primary=true;\n`;
  question.options.forEach((option, order) => {
    const optionId = id('00000052', n, order + 1);
    sql += `insert into public.question_options (id,question_id,label,content_markdown,sort_order) values (${quote(optionId)},${quote(questionId)},${quote(String.fromCharCode(65 + order))},${quote(option)},${order + 1}) on conflict (id) do update set label=excluded.label,content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;\n`;
  });
  sql += `insert into public.question_answer_keys (question_id,correct_option_id) values (${quote(questionId)},${quote(id('00000052', n, question.correct + 1))}) on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;\n`;
  question.hints.forEach((hint, order) => {
    sql += `insert into public.question_hints (id,question_id,content_markdown,sort_order) values (${quote(id('00000062', n, order + 1))},${quote(questionId)},${quote(hint)},${order + 1}) on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;\n`;
  });
  sql += `insert into public.question_solutions (question_id,final_answer_markdown,explanation_markdown) values (${quote(questionId)},${quote(question.answer)},${quote(question.explanation)}) on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown,explanation_markdown=excluded.explanation_markdown;\n`;
  question.solution.forEach(([title, content], order) => {
    sql += `insert into public.question_solution_steps (id,question_id,title,content_markdown,sort_order) values (${quote(id('00000072', n, order + 1))},${quote(questionId)},${quote(title)},${quote(content)},${order + 1}) on conflict (id) do update set title=excluded.title,content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;\n`;
  });
}
sql += 'commit;\n';
await writeFile('supabase/migrations/20260910093000_publish_reviewed_calculus_1_mc_bank.sql', sql);
console.log({ questions: bank.length, output: 'supabase/migrations/20260910093000_publish_reviewed_calculus_1_mc_bank.sql' });
