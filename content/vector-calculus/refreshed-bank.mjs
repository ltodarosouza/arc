import { createVectorBatch } from './batches.mjs';

const styles = [
  {
    lead: 'Em um esboço tridimensional preparado para uma aula,',
    lens: 'Trate as coordenadas como informações de posição: alinhar cada eixo antes de operar evita conclusões visuais enganosas.',
    extraHint:
      'Faça primeiro um pequeno registro das grandezas conhecidas e daquilo que a pergunta realmente pede.',
  },
  {
    lead: 'Uma equipe de modelagem precisa conferir o cálculo abaixo.',
    lens: 'Uma boa conferência separa a ideia geométrica da conta numérica e testa o resultado na relação inicial.',
    extraHint:
      'Escreva a relação matemática antes de substituir os valores; isso torna sinais e denominadores mais visíveis.',
  },
  {
    lead: 'Durante uma correção de prova, considere a seguinte situação:',
    lens: 'O resultado deve respeitar tanto a definição algébrica quanto a interpretação geométrica do objeto em três dimensões.',
    extraHint:
      'Ao final, pergunte se o sinal, a direção ou a dimensão do resultado fazem sentido para a situação.',
  },
  {
    lead: 'No painel de um aplicativo de geometria espacial aparece o problema:',
    lens: 'A notação compacta não substitui o raciocínio: identificar o tipo de objeto é o passo que determina qual fórmula usar.',
    extraHint:
      'Não tente calcular tudo de uma vez: destaque primeiro a propriedade que caracteriza o problema.',
  },
  {
    lead: 'Para validar um resultado de laboratório de geometria analítica, resolva:',
    lens: 'A resolução fica mais segura quando cada transformação é justificada e o resultado é verificado no enunciado original.',
    extraHint:
      'Escolha uma alternativa apenas depois de comparar o resultado final com cada possibilidade, incluindo o sinal.',
  },
];

const limits = new Map([
  ['componentes-e-base', 25],
  ['norma-e-versores', 25],
  ['produto-escalar-e-projecao', 25],
  ['produto-vetorial-e-misto', 25],
  ['volumes-e-areas', 25],
  ['equacoes-de-retas', 25],
  ['equacoes-de-planos', 25],
  ['paralelismo-e-intersecao', 25],
  ['distancias-e-angulos', 25],
  ['classificacao-de-quadricas', 25],
]);

const allQuestions = Array.from({ length: 8 }, (_, index) =>
  createVectorBatch(String(index + 1).padStart(2, '0')),
).flat();

function selectFromTemplate(template, amount) {
  if (amount >= template.length) return template;
  const selected = [];
  for (let index = 0; index < amount; index += 1) {
    const position = Math.floor((index * template.length) / amount);
    selected.push(template[position]);
  }
  return selected;
}

function selectTopic(topic, target) {
  const candidates = allQuestions.filter(
    (question) => question.topic === topic,
  );
  if (!candidates.length)
    throw new Error(`Não há questões para o tópico ${topic}.`);
  const templates = [];
  for (let index = 0; index < candidates.length; index += 10)
    templates.push(candidates.slice(index, index + 10));

  const base = Math.floor(target / templates.length);
  let remainder = target % templates.length;
  const selected = templates.flatMap((template) =>
    selectFromTemplate(template, base + (remainder-- > 0 ? 1 : 0)),
  );

  // Volumes e áreas tinha somente 20 itens no catálogo anterior. As cinco
  // complementares retomam os tipos mais úteis com outra situação e números.
  for (let index = selected.length; index < target; index += 1) {
    const original = candidates[(index * 2 + 1) % candidates.length];
    selected.push({
      ...original,
      supplementalContext:
        'Use também a interpretação geométrica da grandeza, e não apenas a conta algébrica, para justificar a escolha.',
    });
  }
  return selected;
}

function rewritePrompt(statement, style) {
  const rewritten = statement
    .replace(/^Calcule /, 'determine cuidadosamente ')
    .replace(/^Determine /, 'encontre de forma justificada ')
    .replace(/^Encontre /, 'registre, com as etapas essenciais, ')
    .replace(/^Qual é /, 'identifique ')
    .replace(/^Classifique /, 'analise e classifique ')
    .replace(/^Se /, 'sabendo que ');
  return `${style.lead} ${rewritten}`;
}

function enrich(question, position) {
  const style = styles[position % styles.length];
  const answerIndex = question.correct;
  const distractor =
    question.options[(answerIndex + 1) % question.options.length];
  return {
    ...question,
    statement: `${rewritePrompt(question.statement, style)}${question.supplementalContext ? ` ${question.supplementalContext}` : ''}`,
    hints: [style.extraHint, ...question.hints],
    explanation: `${style.lens} ${question.explanation} A alternativa ${String.fromCharCode(65 + answerIndex)} coincide com a relação obtida; a alternativa ${String.fromCharCode(65 + ((answerIndex + 1) % question.options.length))} (${distractor}) representa um erro de operação, direção ou interpretação comum neste tipo de exercício.`,
    steps: [
      [
        'Leia a situação',
        'Identifique as informações dadas, o objeto geométrico envolvido e a grandeza solicitada.',
      ],
      ...question.steps,
      [
        'Valide a escolha',
        `Compare o resultado com a definição usada e descarte as alternativas que trocam sinais, ordem das componentes ou interpretação geométrica.`,
      ],
    ],
  };
}

const selected = [...limits.entries()].flatMap(([topic, target]) =>
  selectTopic(topic, target),
);

if (selected.length !== 250)
  throw new Error(
    `O banco renovado precisa ter 250 questões; recebeu ${selected.length}.`,
  );

if (new Set(selected.map((question) => question.topic)).size !== limits.size)
  throw new Error('O banco renovado não cobre todos os tópicos de Vetorial.');

const refreshed = selected.map(enrich);

export function createRefreshedVectorBatch(number) {
  const batchNumber = Number(number);
  if (!Number.isInteger(batchNumber) || batchNumber < 1 || batchNumber > 5)
    throw new Error(`Lote renovado desconhecido: ${number}.`);
  return refreshed.slice((batchNumber - 1) * 50, batchNumber * 50);
}

export function getRefreshedVectorBank() {
  return refreshed;
}
