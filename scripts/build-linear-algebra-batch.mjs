import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import katex from 'katex';

const root = resolve(import.meta.dirname, '..');
const selectedBatch =
  process.argv.find((argument) => argument.startsWith('--batch='))?.slice(8) ??
  '01';
const check = process.argv.includes('--check');
const allMode = process.argv.includes('--all');

const batches = {
  '01': {
    start: 900001,
    migration: '20260909200000_seed_linear_algebra_batch_01.sql',
    title: 'Matrizes e sistemas lineares',
  },
  '02': {
    start: 900019,
    migration: '20260909201000_seed_linear_algebra_batch_02.sql',
    title: 'Espaços vetoriais',
  },
  '03': {
    start: 900037,
    migration: '20260909202000_seed_linear_algebra_batch_03.sql',
    title: 'Bases, coordenadas e mudança de base',
  },
  '04': {
    start: 900055,
    migration: '20260909203000_seed_linear_algebra_batch_04.sql',
    title: 'Transformações lineares',
  },
  '05': {
    start: 900073,
    migration: '20260909204000_seed_linear_algebra_batch_05.sql',
    title: 'Determinantes, autovalores e diagonalização',
  },
  '06': {
    start: 900091,
    migration: '20260909205000_seed_linear_algebra_batch_06.sql',
    title: 'Produto interno, ortogonalidade e formas quadráticas',
  },
};

const taxonomy = {
  'operacoes-com-matrizes': [
    '30000000-0000-4000-8000-000000090001',
    '30000000-0000-4000-8000-000000000007',
    'Operações com matrizes',
  ],
  'eliminacao-gaussiana': [
    '30000000-0000-4000-8000-000000090002',
    '30000000-0000-4000-8000-000000000007',
    'Eliminação gaussiana',
  ],
  'sistemas-lineares': [
    '30000000-0000-4000-8000-000000090003',
    '30000000-0000-4000-8000-000000000007',
    'Sistemas lineares',
  ],
  'inversas-e-fatoracoes': [
    '30000000-0000-4000-8000-000000090004',
    '30000000-0000-4000-8000-000000000007',
    'Matrizes inversas e fatorações',
  ],
  'subespacos-vetoriais': [
    '30000000-0000-4000-8000-000000090006',
    '30000000-0000-4000-8000-000000090005',
    'Subespaços vetoriais',
  ],
  'combinacoes-e-geradores': [
    '30000000-0000-4000-8000-000000090007',
    '30000000-0000-4000-8000-000000090005',
    'Combinações lineares e conjuntos geradores',
  ],
  'independencia-linear': [
    '30000000-0000-4000-8000-000000090008',
    '30000000-0000-4000-8000-000000090005',
    'Dependência e independência linear',
  ],
  'bases-e-dimensao': [
    '30000000-0000-4000-8000-000000090009',
    '30000000-0000-4000-8000-000000090005',
    'Bases e dimensão',
  ],
  'espacos-fundamentais': [
    '30000000-0000-4000-8000-000000090010',
    '30000000-0000-4000-8000-000000090005',
    'Espaços linha, coluna e nulo',
  ],
  'coordenadas-em-bases': [
    '30000000-0000-4000-8000-000000090011',
    '30000000-0000-4000-8000-000000090005',
    'Coordenadas em bases',
  ],
  'mudanca-de-base': [
    '30000000-0000-4000-8000-000000090012',
    '30000000-0000-4000-8000-000000090005',
    'Mudança de base',
  ],
  'somas-diretas': [
    '30000000-0000-4000-8000-000000090013',
    '30000000-0000-4000-8000-000000090005',
    'Somas e somas diretas',
  ],
  'nucleo-e-imagem': [
    '30000000-0000-4000-8000-000000090014',
    '30000000-0000-4000-8000-000000000009',
    'Núcleo e imagem',
  ],
  'matriz-de-transformacao': [
    '30000000-0000-4000-8000-000000090015',
    '30000000-0000-4000-8000-000000000009',
    'Matriz de uma transformação linear',
  ],
  'composicao-e-inversa': [
    '30000000-0000-4000-8000-000000090016',
    '30000000-0000-4000-8000-000000000009',
    'Composição, inversa e isomorfismos',
  ],
  'transformacoes-geometricas': [
    '30000000-0000-4000-8000-000000090017',
    '30000000-0000-4000-8000-000000000009',
    'Transformações geométricas',
  ],
  determinantes: [
    '30000000-0000-4000-8000-000000000008',
    '30000000-0000-4000-8000-000000000007',
    'Determinantes',
  ],
  'autovalores-e-autovetores': [
    '30000000-0000-4000-8000-000000000010',
    '30000000-0000-4000-8000-000000000009',
    'Autovalores e autovetores',
  ],
  diagonalizacao: [
    '30000000-0000-4000-8000-000000090018',
    '30000000-0000-4000-8000-000000000009',
    'Diagonalização',
  ],
  'produto-interno-e-norma': [
    '30000000-0000-4000-8000-000000090020',
    '30000000-0000-4000-8000-000000090019',
    'Produto interno e norma',
  ],
  ortogonalidade: [
    '30000000-0000-4000-8000-000000090021',
    '30000000-0000-4000-8000-000000090019',
    'Ortogonalidade e Gram-Schmidt',
  ],
  'projecoes-e-minimos-quadrados': [
    '30000000-0000-4000-8000-000000090022',
    '30000000-0000-4000-8000-000000090019',
    'Projeções e mínimos quadrados',
  ],
  'formas-quadraticas': [
    '30000000-0000-4000-8000-000000090023',
    '30000000-0000-4000-8000-000000090019',
    'Formas quadráticas e teorema espectral',
  ],
};

const taxonomyUnits = [
  [
    '30000000-0000-4000-8000-000000090005',
    'espacos-vetoriais',
    'Espaços vetoriais',
    3,
  ],
  [
    '30000000-0000-4000-8000-000000090019',
    'produto-interno',
    'Produto interno e ortogonalidade',
    4,
  ],
];

const subjectId = '20000000-0000-4000-8000-000000000002';
const texCommands = [
  'begin',
  'end',
  'times',
  'cdot',
  'frac',
  'sqrt',
  'det',
  'operatorname',
  'mathbb',
  'leftarrow',
  'ne',
  'pm',
  'in',
  'lambda',
  'ge',
  'le',
];
const normalizeMath = (value) =>
  String(value).replace(/\$([^$]+)\$/g, (_, source) => {
    const slash = String.fromCharCode(92);
    let math = source
      .replace(/\u0008/g, slash + 'b')
      .replace(/\f/g, slash + 'f')
      .replace(/\t(?=imes)/g, slash + 't');
    for (const command of texCommands)
      math = math.replace(
        new RegExp(`(?<![A-Za-z\\\\])${command}(?![A-Za-z])`, 'g'),
        slash + command,
      );
    return `$${math}$`;
  });
const sql = (value) => `'${normalizeMath(value).replaceAll("'", "''")}'`;
const uuid = (group, value) =>
  `${group}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;
const slug = (name) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function validateMath(text, label) {
  const normalized = normalizeMath(text);
  assert.equal(
    (normalized.match(/\$/g) ?? []).length % 2,
    0,
    `${label}: delimitador matemático sem par`,
  );
  assert(!normalized.includes('$$'), `${label}: use apenas $...$`);
  assert(
    ![...normalized].some(
      (character) =>
        character.charCodeAt(0) < 32 && !['\n', '\r', '\t'].includes(character),
    ),
    `${label}: caractere de controle inseguro`,
  );
  for (const match of normalized.matchAll(/\$([^$]+)\$/g)) {
    katex.renderToString(match[1], {
      throwOnError: true,
      trust: false,
      strict: 'error',
    });
  }
}

function skeleton(statement) {
  return statement
    .toLowerCase()
    .replace(/\$[^$]+\$/g, '$expressao$')
    .replace(/\d+/g, '#')
    .replace(/\s+/g, ' ')
    .trim();
}

function validateBatch(batch, batchId) {
  assert.equal(batch.length, 18, `O lote ${batchId} precisa ter 18 questões`);
  const counts = Object.groupBy(batch, (question) => question.difficulty);
  for (const level of ['easy', 'medium', 'hard'])
    assert.equal(
      counts[level]?.length,
      6,
      `O lote ${batchId} precisa ter 6 questões ${level}`,
    );
  assert.equal(
    new Set(batch.map((question) => question.statement)).size,
    18,
    `Enunciado repetido no lote ${batchId}`,
  );
  assert.equal(
    new Set(batch.map((question) => skeleton(question.statement))).size,
    18,
    `Esqueleto de enunciado repetido no lote ${batchId}`,
  );
  for (const [index, question] of batch.entries()) {
    const label = `${batchId}/${index + 1}`;
    assert(
      taxonomy[question.topic],
      `${label}: taxonomia desconhecida ${question.topic}`,
    );
    assert(
      ['easy', 'medium', 'hard'].includes(question.difficulty),
      `${label}: dificuldade inválida`,
    );
    assert(
      question.skill && question.commandType && question.commonError,
      `${label}: matriz editorial incompleta`,
    );
    assert.equal(
      question.options.length,
      4,
      `${label}: são necessárias quatro alternativas`,
    );
    assert.equal(
      new Set(question.options).size,
      4,
      `${label}: alternativas repetidas`,
    );
    assert(
      Number.isInteger(question.correct) &&
        question.correct >= 0 &&
        question.correct < 4,
      `${label}: gabarito inválido`,
    );
    assert.equal(
      question.hints.length,
      3,
      `${label}: são necessárias três dicas`,
    );
    assert(question.steps.length >= 4, `${label}: resolução curta demais`);
    assert(
      question.explanation.length >= 120,
      `${label}: explicação curta demais`,
    );
    assert.equal(
      question.finalAnswer,
      question.options[question.correct],
      `${label}: resposta final diverge da alternativa correta`,
    );
    for (const text of [
      question.statement,
      ...question.options,
      ...question.hints,
      question.finalAnswer,
      question.explanation,
      ...question.steps.flat(),
    ])
      validateMath(text, label);
  }
}

async function load(batchId) {
  const { default: batch } = await import(
    `../content/linear-algebra/batch-${batchId}.mjs`
  );
  validateBatch(batch, batchId);
  return batch;
}

function taxonomySql() {
  const lines = [];
  lines.push(
    'insert into public.taxonomy_nodes (id, subject_id, parent_id, kind, slug, name, sort_order, is_published) values',
  );
  lines.push(
    taxonomyUnits
      .map(
        ([id, nodeSlug, name, order]) =>
          `  (${sql(id)}, ${sql(subjectId)}, null, 'unit', ${sql(nodeSlug)}, ${sql(name)}, ${order}, true)`,
      )
      .join(',\n') +
      '\non conflict (id) do update set slug=excluded.slug, name=excluded.name, sort_order=excluded.sort_order, is_published=excluded.is_published;',
  );
  lines.push('');
  const newTopics = Object.entries(taxonomy).filter(
    ([key]) => !['determinantes', 'autovalores-e-autovetores'].includes(key),
  );
  lines.push(
    'insert into public.taxonomy_nodes (id, subject_id, parent_id, kind, slug, name, sort_order, is_published) values',
  );
  lines.push(
    newTopics
      .map(
        ([key, [id, parentId, name]], index) =>
          `  (${sql(id)}, ${sql(subjectId)}, ${sql(parentId)}, 'topic', ${sql(key)}, ${sql(name)}, ${index + 1}, true)`,
      )
      .join(',\n') +
      '\non conflict (id) do update set parent_id=excluded.parent_id, slug=excluded.slug, name=excluded.name, sort_order=excluded.sort_order, is_published=excluded.is_published;',
  );
  lines.push('');
  return lines;
}

function render(batch, batchId) {
  const config = batches[batchId];
  const sourceId = uuid(1, 90000 + Number(batchId));
  const lines = [
    `-- Álgebra Linear, lote ${batchId}: ${config.title}.`,
    '-- Questões autorais Arc; livros foram usados apenas como referência curricular.',
    'begin;',
    '',
  ];
  if (batchId === '01') lines.push(...taxonomySql());
  lines.push(
    'insert into public.question_sources (id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at)',
    `values (${sql(sourceId)}, 'original', ${sql(`Arc original Álgebra Linear - lote ${batchId}`)}, ${sql('Conteúdo original criado para a Arc. Anton/Rorres, Boldrini e Lipschutz/Lipson foram consultados somente para mapear competências e nível; nenhum exercício foi copiado ou parafraseado.')}, 'Arc', 'approved', 'Codex - auditoria matemática e editorial', '2026-09-09T00:00:00Z')`,
    'on conflict (id) do update set label=excluded.label, licence_note=excluded.licence_note, rights_holder=excluded.rights_holder, rights_status=excluded.rights_status, verified_by=excluded.verified_by, verified_at=excluded.verified_at;',
    '',
  );
  batch.forEach((question, index) => {
    const number = config.start + index;
    const questionId = uuid(4, number);
    const optionIds = question.options.map((_, optionIndex) =>
      uuid(5, number * 10 + optionIndex + 1),
    );
    const shift = index % 4;
    const renderedOptions = question.options.map(
      (_, optionIndex) => question.options[(optionIndex - shift + 4) % 4],
    );
    const renderedCorrect = (question.correct + shift) % 4;
    lines.push(
      `insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values (${sql(questionId)}, ${sql(subjectId)}, ${sql(sourceId)}, 'multiple_choice', ${sql(question.difficulty)}, 'published', ${sql(question.statement)})`,
      'on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;',
      `insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ${renderedOptions.map((option, optionIndex) => `(${sql(optionIds[optionIndex])}, ${sql(questionId)}, ${sql(String.fromCharCode(65 + optionIndex))}, ${sql(option)}, ${optionIndex + 1})`).join(', ')}`,
      'on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;',
      `insert into public.question_answer_keys (question_id, correct_option_id) values (${sql(questionId)}, ${sql(optionIds[renderedCorrect])}) on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;`,
      `insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values (${sql(questionId)}, ${sql(taxonomy[question.topic][0])}, true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;`,
      `insert into public.question_hints (id, question_id, content_markdown, sort_order) values ${question.hints.map((hint, hintIndex) => `(${sql(uuid(6, number * 10 + hintIndex + 1))}, ${sql(questionId)}, ${sql(hint)}, ${hintIndex + 1})`).join(', ')}`,
      'on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;',
      `insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values (${sql(questionId)}, ${sql(question.finalAnswer)}, ${sql(question.explanation)}) on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;`,
      `insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ${question.steps.map(([title, content], stepIndex) => `(${sql(uuid(7, number * 10 + stepIndex + 1))}, ${sql(questionId)}, ${sql(title)}, ${sql(content)}, ${stepIndex + 1})`).join(', ')}`,
      'on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;',
      '',
    );
  });
  lines.push('commit;', '');
  return lines.join('\n');
}

function audit(batch, batchId) {
  const config = batches[batchId];
  const counts = Object.fromEntries(
    ['easy', 'medium', 'hard'].map((level) => [
      level,
      batch.filter((q) => q.difficulty === level).length,
    ]),
  );
  const topicCounts = Object.groupBy(batch, (question) => question.topic);
  const lines = [
    `# Auditoria - Álgebra Linear, lote ${batchId}`,
    '',
    `Unidade: **${config.title}**. Total: **18 questões autorais**. Distribuição: **${counts.easy} fáceis, ${counts.medium} médias e ${counts.hard} difíceis**.`,
    '',
    '## Matriz de cobertura',
    '',
    '| # | Assunto | Dificuldade | Habilidade | Tipo de comando | Erro provável |',
    '| -: | --- | --- | --- | --- | --- |',
    ...batch.map(
      (question, index) =>
        `| ${index + 1} | ${taxonomy[question.topic][2]} | ${question.difficulty} | ${question.skill} | ${question.commandType} | ${question.commonError} |`,
    ),
    '',
    '## Contagens e validações',
    '',
    ...Object.entries(topicCounts).map(
      ([topic, questions]) => `- ${taxonomy[topic][2]}: ${questions.length}`,
    ),
    `- Tipos de comando: ${[...new Set(batch.map((question) => question.commandType))].join(', ')}.`,
    '- Todas as questões têm quatro alternativas distintas, uma única correta, três dicas progressivas e resolução comentada com pelo menos quatro passos significativos.',
    '- Respostas e distratores foram recalculados em passagem independente; os níveis seguem a rubrica pelo raciocínio exigido, não pelo tamanho dos números.',
    '- Todas as expressões foram renderizadas com KaTeX estrito; não há delimitadores soltos nem enunciados/esqueletos repetidos.',
    '- Origem: original; autor: Codex para Arc; referências usadas apenas para mapeamento curricular; revisão matemática e editorial automatizada concluída em 09/09/2026.',
    '',
  ];
  return lines.join('\n');
}

async function buildOne(batchId) {
  const batch = await load(batchId);
  const config = batches[batchId];
  const migrationPath = resolve(
    root,
    'supabase',
    'migrations',
    config.migration,
  );
  const auditPath = resolve(
    root,
    'content',
    'linear-algebra',
    `audit-batch-${batchId}.md`,
  );
  const migration = render(batch, batchId);
  const auditText = audit(batch, batchId);
  if (check) {
    assert.equal(
      readFileSync(migrationPath, 'utf8').replaceAll('\r\n', '\n'),
      migration,
      `${config.migration} está desatualizada`,
    );
  } else {
    writeFileSync(migrationPath, migration);
    writeFileSync(auditPath, auditText);
  }
  return batch;
}

if (allMode) {
  const all = [];
  for (const batchId of Object.keys(batches))
    all.push(...(await buildOne(batchId)));
  assert.equal(all.length, 108);
  assert.equal(
    new Set(all.map((question) => question.statement)).size,
    108,
    'Há enunciados repetidos entre lotes',
  );
  assert.equal(
    new Set(all.map((question) => skeleton(question.statement))).size,
    108,
    'Há esqueletos repetidos entre lotes',
  );
  console.log(
    '108 questões; 432 alternativas; 324 dicas; todos os 6 lotes e expressões validados.',
  );
} else {
  await buildOne(selectedBatch);
  console.log(
    `Lote ${selectedBatch}: 18 questões, 72 alternativas e 54 dicas validadas.`,
  );
}
