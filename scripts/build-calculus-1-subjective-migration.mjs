import { writeFile } from 'node:fs/promises';
import { auditSubjectiveCalculusOneBank, subjectiveCalculusOneBank } from '../content/calculus-1/subjective-bank.mjs';

const quote = (value) => `'${value.replaceAll("'", "''")}'`;
const uuid = (kind, index, order = 0) => `${kind}0000000-0000-4000-8000-${String(index * 100 + order).padStart(12, '0')}`;
const sourceId = '10000000-0000-4000-8000-000000001300';
const subjectId = '20000000-0000-4000-8000-000000000004';
let sql = `-- Banco autoral de Cálculo I: 125 questões discursivas independentes.\nbegin;\n`;
sql += `insert into public.question_sources (id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at) values (${quote(sourceId)}, 'original', 'Arc original Cálculo I — resposta aberta 2026', 'Conteúdo autoral; a referência é usada somente para competências e diversidade.', 'Arc', 'approved', 'Equipe editorial Arc', '2026-09-09T00:00:00Z') on conflict (id) do update set label=excluded.label, licence_note=excluded.licence_note;\n`;
// Preserve attempts while ensuring that exactly this reviewed bank is visible.
sql += `update public.questions set publication_status='archived' where subject_id=${quote(subjectId)};\n`;
for (const [index, question] of subjectiveCalculusOneBank.entries()) {
  const n = index + 1;
  const id = uuid(41, n);
  sql += `insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values (${quote(id)}, ${quote(subjectId)}, ${quote(sourceId)}, 'reveal_answer', ${quote(question.difficulty)}, 'published', ${quote(question.statement)}) on conflict (id) do update set statement_markdown=excluded.statement_markdown, difficulty=excluded.difficulty, publication_status=excluded.publication_status;\n`;
  sql += `insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values (${quote(id)}, ${quote(question.topic)}, true) on conflict (question_id, taxonomy_node_id) do update set is_primary=true;\n`;
  question.hints.forEach((hint, order) => { sql += `insert into public.question_hints (id, question_id, content_markdown, sort_order) values (${quote(uuid(61, n, order + 1))}, ${quote(id)}, ${quote(hint)}, ${order + 1}) on conflict (id) do update set content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;\n`; });
  sql += `insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values (${quote(id)}, ${quote(question.finalAnswer)}, ${quote(question.explanation)}) on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;\n`;
  question.steps.forEach(([title, content], order) => { sql += `insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values (${quote(uuid(71, n, order + 1))}, ${quote(id)}, ${quote(title)}, ${quote(content)}, ${order + 1}) on conflict (id) do update set title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;\n`; });
}
sql += `commit;\n`;
auditSubjectiveCalculusOneBank();
await writeFile('supabase/migrations/20260910090000_publish_calculus_1_subjective_bank.sql', sql);
