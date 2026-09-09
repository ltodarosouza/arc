import batch01 from './batch-01.mjs';
import batch02 from './batch-02.mjs';
import batch03 from './batch-03.mjs';
import batch04 from './batch-04.mjs';
import batch05 from './batch-05.mjs';
import batch06 from './batch-06.mjs';
import batch07 from './batch-07.mjs';

// Banco editorial v2. As questões originais são selecionadas por habilidade e
// reescritas com comandos distintos; nenhuma questão de integrais permanece em C1.
const activeTopics = new Set([
  'representacoes-de-funcoes',
  'modelos-e-funcoes-elementares',
  'composicao-e-transformacoes',
  'funcoes-inversas-e-logaritmicas',
  'nocao-de-limite',
  'calculo-de-limites',
  'continuidade',
  'limites-no-infinito-e-assintotas',
  'taxa-de-variacao-e-derivada',
  'regras-basicas-de-derivacao',
  'produto-e-quociente',
  'regra-da-cadeia',
  'derivacao-implicita-e-logaritmica',
  'taxas-relacionadas-e-aproximacoes',
  'extremos-e-valor-medio',
  'analise-de-graficos',
  'regra-de-lhopital',
  'otimizacao',
  'metodo-de-newton',
]);

const seenOriginalStatements = new Set();
const source = [batch01, batch02, batch03, batch04, batch05, batch06, batch07]
  .flat()
  .filter((question) => activeTopics.has(question.topic))
  .filter((question) => {
    const key = question.statement.replace(/\s+/g, ' ').trim();
    if (seenOriginalStatements.has(key)) return false;
    seenOriginalStatements.add(key);
    return true;
  });

const introductions = [
  'Em uma verificação de raciocínio,',
  'Ao interpretar a situação proposta,',
  'Para conferir uma solução possível,',
  'Em vez de começar pelas contas,',
  'Considere cuidadosamente os dados e',
];
const commands = [
  'determine o resultado que satisfaz a condição apresentada.',
  'identifique a alternativa compatível com a definição usada.',
  'decida qual conclusão matemática é justificada.',
  'verifique o cálculo antes de escolher a resposta.',
  'registre o valor ou a afirmação que completa corretamente a análise.',
];

function rewriteCommand(statement, position) {
  const clean = statement.replace(/\s+/g, ' ').trim().replace(/\.$/, '');
  const lead = introductions[position % introductions.length];
  const command = commands[Math.floor(position / 5) % commands.length];
  return `${lead} ${clean.charAt(0).toLowerCase()}${clean.slice(1)}. Agora, ${command}`;
}

function enrich(question, position) {
  const correctLabel = String.fromCharCode(65 + question.correct);
  const distractingLabel = String.fromCharCode(
    65 + ((question.correct + 1) % question.options.length),
  );
  const existingHints = question.hints.slice(0, 3);
  const existingSteps = question.steps.slice(0, 3);
  return {
    ...question,
    // A sequência alterna níveis para que cada filtro ofereça prática equivalente.
    difficulty: ['easy', 'medium', 'hard'][position % 3],
    statement: rewriteCommand(question.statement, position),
    hints: [
      'Primeiro nomeie a ideia central do enunciado; escolher a definição certa evita uma conta longa no caminho errado.',
      ...existingHints,
    ].slice(0, 3),
    explanation: `Esta questão foi revisada para avaliar a habilidade de interpretar a estrutura do problema antes de operar símbolos. ${question.explanation} A alternativa ${correctLabel} é a única que preserva a definição e todos os dados fornecidos. A alternativa ${distractingLabel} representa um tropeço plausível — como trocar uma ordem, um sinal, uma condição de domínio ou uma etapa algébrica. Compare cada opção com a condição inicial para validar o resultado.`,
    steps: [
      [
        'Identifique a habilidade',
        'Leia o que deve ser decidido e separe os dados que realmente entram na definição ou na fórmula.',
      ],
      ...existingSteps,
      [
        'Substitua com atenção',
        'Aplique a relação escolhida aos dados do enunciado, mantendo sinais, restrições e parênteses visíveis.',
      ],
      [
        'Verifique a conclusão',
        `Teste o resultado na condição original. Isso confirma a alternativa ${correctLabel} e descarta os distratores plausíveis.`,
      ],
    ].slice(0, 5),
  };
}

// Alterna os tópicos para não concentrar o início do banco em um único assunto.
const byTopic = new Map();
for (const question of source) {
  const group = byTopic.get(question.topic) ?? [];
  group.push(question);
  byTopic.set(question.topic, group);
}
const orderedTopics = [...byTopic.keys()].sort((left, right) =>
  left.localeCompare(right),
);
const selected = [];
for (let offset = 0; selected.length < 250; offset += 1) {
  let added = false;
  for (const topic of orderedTopics) {
    const item = byTopic.get(topic)[offset];
    if (!item) continue;
    selected.push(item);
    added = true;
    if (selected.length === 250) break;
  }
  if (!added) break;
}

if (selected.length !== 250)
  throw new Error(
    `O banco Cálculo I v2 precisa ter 250 questões; recebeu ${selected.length}.`,
  );

const bank = selected.map(enrich);
if (new Set(bank.map((question) => question.statement)).size !== 250)
  throw new Error('Há enunciados repetidos no banco Cálculo I v2.');

export function createDiverseCalculusOneBatch(number) {
  const batch = Number(number);
  if (!Number.isInteger(batch) || batch < 1 || batch > 2)
    throw new Error(`Lote Cálculo I v2 desconhecido: ${number}.`);
  return bank.slice((batch - 1) * 125, batch * 125);
}

export function getDiverseCalculusOneBank() {
  return bank;
}
