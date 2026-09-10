import { writeFileSync } from 'node:fs';

export const SUBJECT_ID = '20000000-0000-4000-8000-000000000001';
export const uuid = (prefix, suffix) => prefix + '-0000-4000-8000-' + String(suffix).padStart(12, '0');
export const taxonomyId = (suffix) => uuid('30000000', suffix);
const literal = (value) => "'" + String(value).replaceAll("'", "''") + "'";

export function validateBank(items, expectedCount = 33) {
  const errors = [];
  if (items.length !== expectedCount) errors.push('esperadas ' + expectedCount + ', recebidas ' + items.length);
  items.forEach((item, index) => {
    const label = item.id || 'item ' + (index + 1);
    if (!['easy', 'medium', 'hard'].includes(item.difficulty)) errors.push(label + ': dificuldade inválida');
    if (!item.statement || !item.statement.trim()) errors.push(label + ': enunciado vazio');
    if (!item.options || item.options.length !== 4 || new Set(item.options).size !== 4) errors.push(label + ': alternativas inválidas');
    if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct > 3) errors.push(label + ': chave inválida');
    if (!item.hints || item.hints.length !== 3 || new Set(item.hints).size !== 3) errors.push(label + ': dicas inválidas');
    if (!item.steps || item.steps.length !== 5 || new Set(item.steps).size !== 5) errors.push(label + ': passos inválidos');
    if (item.options && item.options[item.correct] !== item.answer) errors.push(label + ': resposta final difere da alternativa correta');
    [item.statement, ...(item.options || []), ...(item.hints || []), ...(item.steps || [])].forEach((text) => {
      if (((text || '').match(/\$/g) || []).length % 2) errors.push(label + ': delimitadores LaTeX ímpares');
      if ((text || '').includes('$$')) errors.push(label + ': usa $$');
    });
  });
  const statements = items.map((item) => item.statement.trim().toLowerCase());
  if (new Set(statements).size !== statements.length) errors.push('enunciados duplicados');
  const hints = items.flatMap((item) => item.hints);
  if (new Set(hints).size !== hints.length) errors.push('dicas repetidas no lote');
  const steps = items.flatMap((item) => item.steps);
  if (new Set(steps).size !== steps.length) errors.push('passos repetidos no lote');
  if (errors.length) throw new Error(errors.join('\n'));
}

export function renderMigration(config) {
  const {items, output, sourceId, sourceLabel, questionBase, expectedCount = 33, resetTags = false} = config;
  validateBank(items, expectedCount);
  const lines = ['-- Conteúdo autoral Arc; referência usada somente para competências.', 'begin;'];
  lines.push('insert into public.question_sources (id,kind,label,licence_note,rights_holder,rights_status,verified_by,verified_at) values (' + literal(sourceId) + ",'original'," + literal(sourceLabel) + ",'Questões e soluções autorais; Thomas, vol. 2, 11ª ed., foi usado somente para mapear competências.','Arc','approved','Equipe editorial Arc','2026-09-10T00:00:00Z') on conflict (id) do update set label=excluded.label,licence_note=excluded.licence_note,rights_status=excluded.rights_status;");
  items.forEach((item, index) => {
    const qid = item.id || uuid('40000000', questionBase + index + 1);
    const base = Number(qid.slice(-12)) * 10;
    lines.push('insert into public.questions (id,subject_id,source_id,kind,difficulty,publication_status,statement_markdown) values (' + literal(qid) + ',' + literal(SUBJECT_ID) + ',' + literal(sourceId) + ",'multiple_choice'," + literal(item.difficulty) + ",'published'," + literal(item.statement) + ') on conflict (id) do update set source_id=excluded.source_id,difficulty=excluded.difficulty,publication_status=excluded.publication_status,statement_markdown=excluded.statement_markdown;');
    if (resetTags) lines.push('delete from public.question_taxonomy_tags where question_id=' + literal(qid) + ';');
    lines.push('insert into public.question_taxonomy_tags (question_id,taxonomy_node_id,is_primary) values (' + literal(qid) + ',' + literal(taxonomyId(item.tag)) + ',true) on conflict (question_id,taxonomy_node_id) do update set is_primary=true;');
    item.options.forEach((option, j) => lines.push('insert into public.question_options (id,question_id,label,content_markdown,sort_order) values (' + literal(uuid('50000000', base+j+1)) + ',' + literal(qid) + ',' + literal('ABCD'[j]) + ',' + literal(option) + ',' + (j+1) + ') on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;'));
    lines.push('insert into public.question_answer_keys (question_id,correct_option_id) values (' + literal(qid) + ',' + literal(uuid('50000000', base+item.correct+1)) + ') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;');
    item.hints.forEach((hint, j) => lines.push('insert into public.question_hints (id,question_id,content_markdown,sort_order) values (' + literal(uuid('60000000', base+j+1)) + ',' + literal(qid) + ',' + literal(hint) + ',' + (j+1) + ') on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;'));
    lines.push('insert into public.question_solutions (question_id,final_answer_markdown,explanation_markdown) values (' + literal(qid) + ',' + literal(item.answer) + ',' + literal(item.steps.join(' ')) + ') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown,explanation_markdown=excluded.explanation_markdown;');
    item.steps.forEach((step, j) => lines.push('insert into public.question_solution_steps (id,question_id,content_markdown,sort_order) values (' + literal(uuid('70000000', base+j+1)) + ',' + literal(qid) + ',' + literal(step) + ',' + (j+1) + ') on conflict (id) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;'));
  });
  lines.push('commit;', '');
  writeFileSync(output, lines.join('\n'));
}
