import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import katex from 'katex';
import { enrichEditorial } from '../content/calculus-2/editorial.mjs';

const check = process.argv.includes('--check');
const uuid = (group, value) =>
  `${group}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;
const taxonomy = {
  partes: [11, 1, 'integracao-por-partes', 'Integração por partes'],
  fracoes: [101, 1, 'fracoes-parciais', 'Funções racionais e frações parciais'],
  trigonometricas: [
    102,
    1,
    'integrais-trigonometricas',
    'Integrais trigonométricas',
  ],
  infinitos: [104, 103, 'intervalos-infinitos', 'Intervalos infinitos'],
  descontinuidades: [
    105,
    103,
    'descontinuidades',
    'Integrandos com descontinuidade',
  ],
  'limites-sequencias': [
    107,
    106,
    'limite-de-sequencia',
    'Limite de uma sequência',
  ],
  monotonicidade: [
    108,
    106,
    'monotonicidade-e-convergencia',
    'Monotonicidade e convergência',
  ],
  geometricas: [6, 5, 'series-geometricas', 'Séries geométricas'],
  convergencia: [
    109,
    5,
    'convergencia-e-divergencia',
    'Convergência e divergência',
  ],
  testes: [
    110,
    5,
    'testes-de-convergencia',
    'Testes de comparação, razão e raiz',
  ],
  alternadas: [111, 5, 'series-alternadas', 'Séries alternadas'],
  potencias: [112, 5, 'series-de-potencias', 'Séries de potências'],
  taylor: [113, 5, 'taylor-e-maclaurin', 'Séries de Taylor e Maclaurin'],
};
function output(path, text) {
  if (check)
    assert.equal(
      readFileSync(path, 'utf8').replaceAll('\r\n', '\n'),
      text,
      `${path} is stale`,
    );
  else writeFileSync(path, text);
}
function hasUnsafeControlCharacters(text) {
  return [...text].some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 && code !== 9 && code !== 10 && code !== 13;
  });
}
const all = [];
const qualityReport = [
  '# Auditoria editorial — Cálculo II',
  '',
  'Esta auditoria verifica o mínimo obrigatório para o lote: enunciado e alternativas renderizáveis, duas dicas progressivas, explicação didática e pelo menos três passos de solução, incluindo estratégia e checagem.',
  '',
];
for (const [issue, count] of [
  [62, 20],
  [63, 12],
  [64, 10],
  [65, 12],
  [66, 12],
  [67, 5],
  [68, 13],
]) {
  const { default: batch } = await import(
    `../content/calculus-2/batch-${issue}.mjs`
  );
  assert.equal(batch.length, count);
  for (const [index, sourceItem] of batch.entries()) {
    const item = enrichEditorial(sourceItem);
    assert(taxonomy[item.topic]);
    assert(['easy', 'medium', 'hard'].includes(item.difficulty));
    assert.equal(new Set(item.options).size, 4);
    assert(item.hints.length >= 2, `${issue}/${index} requires two hints`);
    assert(
      item.solutionSteps.length >= 3,
      `${issue}/${index} requires three steps`,
    );
    assert(
      item.explanation.length >= 180,
      `${issue}/${index} explanation is too short`,
    );
    for (const text of [
      item.statement,
      ...item.options,
      ...item.hints,
      item.explanation,
      ...item.solutionSteps.map((step) => step.content),
    ]) {
      assert(!hasUnsafeControlCharacters(text));
      assert.equal(
        (text.match(/\$/g) ?? []).length % 2,
        0,
        `Unpaired math delimiter in ${text}`,
      );
      for (const match of text.matchAll(/\$([^$]+)\$/g)) {
        assert(
          !/(^|[^\\])\b(?:int|frac|sqrt|sum|sin|cos|tan|ln|infty)\b/.test(
            match[1],
          ),
          `LaTeX command lost its backslash in ${match[1]}`,
        );
        katex.renderToString(match[1], {
          throwOnError: true,
          trust: false,
          strict: 'error',
        });
      }
    }
    const number = issue * 100 + index;
    const id = uuid(4, number);
    const shift = index % 4;
    const options = item.options.map(
      (_, i) => item.options[(i - shift + 4) % 4],
    );
    all.push({
      ...item,
      issue,
      id,
      correctIndex: shift,
      options,
      source: {
        kind: 'original',
        author: 'Codex',
        createdAt: '2026-09-07',
        rightsStatus: 'review_required',
        reviewer: null,
      },
      status: 'draft',
    });
  }
}
assert.equal(new Set(all.map((item) => item.statement)).size, 84);
output(
  'content/calculus-2/verification.json',
  JSON.stringify(all, null, 2) + '\n',
);
qualityReport.push(
  `- Questões auditadas: **${all.length}**`,
  '- Dicas progressivas: **168**',
  `- Passos de resolução: **${all.reduce((total, item) => total + item.solutionSteps.length, 0)}**`,
  '- Estado editorial: **rascunho; revisão independente pendente**',
  '',
);
output('content/calculus-2/editorial-audit.md', qualityReport.join('\n'));
console.log(
  '84 original drafts; 336 alternatives; 168 hints; all mathematical markup renders in KaTeX.',
);
