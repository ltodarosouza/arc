import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import katex from 'katex';
import { createReviewedCalculusTwoBatch } from '../content/calculus-2/diverse-bank-v3.mjs';

const root = resolve(import.meta.dirname, '..');
const number = Number(process.argv.find((arg) => arg.startsWith('--batch='))?.slice(8) ?? '01');
if (!Number.isInteger(number) || number < 1 || number > 5) throw new Error('Use um lote entre 01 e 05.');
const batch = String(number).padStart(2, '0');
const outputPath = resolve(root, `supabase/migrations/20260909300${number}00_reviewed_calculus_2_open_batch_${batch}.sql`);
const subjectId = '20000000-0000-4000-8000-000000000001';
const sourceId = `10000000-0000-4000-8000-${String(281 + number).padStart(12, '0')}`;
const topics = {
  'antiderivadas-e-integrais-indefinidas': 15, 'integral-definida': 4, substituicao: 2, 'integracao-por-partes': 11, 'fracoes-parciais': 101, 'integrais-trigonometricas': 102, 'intervalos-infinitos': 104, descontinuidades: 105, 'limite-de-sequencia': 107, 'monotonicidade-e-convergencia': 108, 'series-geometricas': 6, 'convergencia-e-divergencia': 109, 'testes-de-convergencia': 110, 'series-alternadas': 111, 'series-de-potencias': 112, 'taylor-e-maclaurin': 113,
};
const sql = (value) => `'${String(value).replaceAll("'", "''")}'`;
const id = (prefix, value) => `${prefix}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;
const ensure = (ok, message) => { if (!ok) throw new Error(message); };
const validate = (text, questionNumber) => {
  ensure((text.match(/\$/g) ?? []).length % 2 === 0, `Cifrão sem par na questão ${questionNumber}.`);
  for (const part of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(part[1], { throwOnError: true, strict: 'error', trust: false });
};
const openStatement = (text) => text
  .replace(/^(Em uma ficha de revisão individual|Ao conferir uma resolução curta|Em uma questão de diagnóstico|Durante a escolha de uma estratégia|Ao revisar um cálculo no quadro|Em uma comparação de métodos|No fechamento de uma etapa de estudo|Ao validar uma conclusão escrita|Em uma leitura atenta da notação|Ao testar uma alternativa de prova|Em uma discussão sobre o método adequado|Ao localizar um erro frequente|Em uma checagem de consistência|Ao resumir o raciocínio de uma colega|No momento de verificar as hipóteses|Em uma atividade de consolidação), /, '')
  .replace(/ (Calcule a expressão e escolha a alternativa correta\.|Uma estudante propôs um resultado\. Qual conclusão corrige adequadamente o raciocínio\?|Antes de efetuar a conta, identifique o resultado compatível com a definição\.|Escolha a alternativa que permanece válida após uma verificação independente\.|Em uma revisão, qual resultado respeita todos os sinais e condições do problema\?|Qual opção descreve corretamente a estratégia e a conclusão\?|Analise a estrutura apresentada e complete a decisão matemática\.|Selecione a única afirmação que passa pela checagem final\.)$/, ' Desenvolva a resolução e justifique a conclusão.');
const questions = createReviewedCalculusTwoBatch(batch);
ensure(questions.length === 25, 'Cada lote deve ter exatamente 25 questões.');
ensure(new Set(questions.map((question) => question.statement)).size === 25, 'Há enunciados repetidos no lote.');
const lines = [`-- Cálculo II: lote aberto ${batch}; 25 questões autorais, independentes e auditadas.`, 'begin;', ''];
if (number === 1) lines.push(`update public.questions set publication_status='draft' where subject_id=${sql(subjectId)} and publication_status='published' and coalesce(source_id::text,'') not in (${Array.from({ length: 5 }, (_, index) => sql(`10000000-0000-4000-8000-${String(282 + index).padStart(12, '0')}`)).join(', ')});`, '');
lines.push(`insert into public.question_sources (id,kind,label,licence_note,rights_holder,rights_status,verified_by,verified_at) values (${sql(sourceId)},'original',${sql(`Arc original Cálculo II — questões abertas, lote ${batch}`)},${sql('Questões autorais; a referência registrada no mapa de lançamento foi usada apenas para competências, dificuldade e diversidade.')},'Arc','approved','Equipe editorial Arc','2026-09-09T00:00:00Z') on conflict (id) do update set label=excluded.label,licence_note=excluded.licence_note,rights_status=excluded.rights_status,verified_by=excluded.verified_by,verified_at=excluded.verified_at;`, '');
for (const [index, item] of questions.entries()) {
  const itemNumber = 99501 + (number - 1) * 25 + index;
  const questionId = id(4, itemNumber); const statement = openStatement(item.statement); const tagId = topics[item.topic];
  ensure(tagId, `Tópico desconhecido: ${item.topic}`);
  ensure(item.hints.length >= 3 && item.steps.length >= 5 && item.explanation.length >= 240, `Conteúdo pedagógico insuficiente: ${itemNumber}`);
  for (const text of [statement, ...item.hints.slice(0, 3), item.finalAnswer, item.explanation, ...item.steps.flat()]) validate(text, itemNumber);
  lines.push(
    `insert into public.questions (id,subject_id,source_id,kind,difficulty,publication_status,statement_markdown) values (${sql(questionId)},${sql(subjectId)},${sql(sourceId)},'reveal_answer',${sql(item.difficulty)},'published',${sql(statement)}) on conflict (id) do update set subject_id=excluded.subject_id,source_id=excluded.source_id,kind=excluded.kind,difficulty=excluded.difficulty,publication_status=excluded.publication_status,statement_markdown=excluded.statement_markdown;`,
    `insert into public.question_taxonomy_tags (question_id,taxonomy_node_id,is_primary) values (${sql(questionId)},${sql(id(3, tagId))},true) on conflict (question_id,taxonomy_node_id) do update set is_primary=excluded.is_primary;`,
    `insert into public.question_hints (id,question_id,content_markdown,sort_order) values ${item.hints.slice(0, 3).map((hint, position) => `(${sql(id(6,itemNumber*10+position+1))},${sql(questionId)},${sql(hint)},${position+1})`).join(',')} on conflict (id) do update set question_id=excluded.question_id,content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`,
    `insert into public.question_solutions (question_id,final_answer_markdown,explanation_markdown) values (${sql(questionId)},${sql(item.finalAnswer)},${sql(item.explanation)}) on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown,explanation_markdown=excluded.explanation_markdown;`,
    `insert into public.question_solution_steps (id,question_id,title,content_markdown,sort_order) values ${item.steps.map(([title,content],position) => `(${sql(id(7,itemNumber*10+position+1))},${sql(questionId)},${sql(title)},${sql(content)},${position+1})`).join(',')} on conflict (id) do update set question_id=excluded.question_id,title=excluded.title,content_markdown=excluded.content_markdown,sort_order=excluded.sort_order;`, '');
}
lines.push('commit;', ''); const output = lines.join('\n');
if (process.argv.includes('--check')) { ensure(readFileSync(outputPath, 'utf8') === output, `Migration ${batch} está desatualizada.`); console.log(`Lote ${batch} validado.`); }
else { mkdirSync(dirname(outputPath), { recursive: true }); writeFileSync(outputPath, output); console.log(`Migration criada: ${outputPath}`); }
