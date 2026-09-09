import { createVectorBatch } from './batches.mjs';

const targets = new Map([
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

const source = Array.from({ length: 8 }, (_, index) =>
  createVectorBatch(String(index + 1).padStart(2, '0')),
).flat();

const commandAlternatives = [
  'faça uma leitura geométrica antes de efetuar as contas.',
  'escolha a relação matemática que descreve a situação.',
  'justifique o resultado usando as coordenadas correspondentes.',
  'verifique a interpretação antes de selecionar a alternativa.',
  'registre o resultado de forma compatível com o objeto geométrico.',
];

function evenlyChoose(group, total) {
  const types = [];
  for (let index = 0; index < group.length; index += 10)
    types.push(group.slice(index, index + 10));
  const perType = Math.floor(total / types.length);
  let remainder = total % types.length;
  const chosen = types.map((type) => {
    const amount = perType + (remainder-- > 0 ? 1 : 0);
    return Array.from(
      { length: amount },
      (_, index) => type[Math.floor((index * type.length) / amount)],
    );
  });
  const output = [];
  for (let index = 0; output.length < total; index += 1)
    for (const type of chosen) {
      if (type[index]) output.push(type[index]);
      if (output.length === total) break;
    }
  while (output.length < total)
    output.push(group[(output.length * 3 + 1) % group.length]);
  return output;
}

function changeCommand(statement, variant) {
  const instruction = commandAlternatives[variant % commandAlternatives.length];
  const displacement = statement.match(
    /^(Dados os pontos .+?), encontre o vetor que parte de A e chega a B\.$/,
  );
  if (displacement) {
    const prompts = [
      'qual deslocamento transforma A em B?',
      'que vetor deve ser somado à posição A para obter B?',
      'registre a variação de coordenadas do ponto inicial até o ponto final.',
      'um móvel saiu de A e terminou em B: qual foi seu deslocamento líquido?',
      'uma translação leva A a B. Qual é o vetor dessa translação?',
    ];
    return `${displacement[1]}; ${prompts[variant % prompts.length]}`;
  }
  const sum = statement.match(/^Calcule \$u\+v\$ para (.+)\.$/);
  if (sum) {
    const prompts = [
      'combine os dois vetores para obter o vetor resultante.',
      'encontre o vetor que representa aplicar primeiro v e depois u.',
      'qual é a composição dos deslocamentos u e v?',
      'escreva a diagonal do paralelogramo formado por u e v.',
      'determine o resultado da soma componente a componente.',
    ];
    return `${sum[1]}. ${prompts[variant % prompts.length]}`;
  }
  const midpoint = statement.match(/^Encontre o ponto médio (.+)\.$/);
  if (midpoint) {
    const prompts = [
      'Localize o ponto que divide o segmento em duas partes congruentes.',
      'Determine a posição equidistante dos dois extremos.',
      'Encontre o centro do segmento indicado.',
      'Qual ponto permite escrever o segmento como duas metades iguais?',
      'Use a média das coordenadas para obter o ponto de equilíbrio.',
    ];
    return `${prompts[variant % prompts.length]} ${midpoint[1]}.`;
  }
  const classification = statement.match(/^Classifique a superfície (.+)\.$/);
  if (classification) {
    const prompts = [
      'Que lugar geométrico essa equação descreve?',
      'Identifique a família de superfície a partir dos sinais e das variáveis presentes.',
      'Qual forma tridimensional aparece ao analisar as seções da equação?',
      'Dê o nome da quádrica representada.',
      'Reconheça a superfície sem tentar isolar todas as variáveis.',
    ];
    return `${classification[1]}. ${prompts[variant % prompts.length]}`;
  }
  const startingVerbs = [
    ['Calcule ', 'Determine o resultado de '],
    ['Calcule ', 'Use a definição para obter '],
    ['Determine ', 'Encontre, justificando, '],
    ['Encontre ', 'Identifique '],
    ['Qual é ', 'Assinale '],
  ];
  for (const [from, to] of startingVerbs)
    if (statement.startsWith(from))
      return `${to}${statement.slice(from.length)} Antes de concluir, ${instruction}`;
  return `${statement} Para decidir, ${instruction}`;
}

function enrich(question, position) {
  const correctLabel = String.fromCharCode(65 + question.correct);
  const wrongLabel = String.fromCharCode(
    65 + ((question.correct + 1) % question.options.length),
  );
  return {
    ...question,
    statement: changeCommand(
      question.statement,
      position + Math.floor(position / 5),
    ),
    hints: [
      'Comece identificando qual relação vetorial ou geométrica está sendo pedida; essa escolha vem antes da substituição numérica.',
      ...question.hints,
    ],
    explanation: `A questão avalia uma habilidade específica de Geometria Analítica: reconhecer a estrutura matemática antes da conta. ${question.explanation} A alternativa ${correctLabel} respeita essa estrutura. Já a alternativa ${wrongLabel} foi incluída porque reproduz uma troca comum de ordem, sinal, direção ou interpretação; confronte-a com a definição antes de descartá-la.`,
    steps: [
      [
        'Reconheça a tarefa',
        'Leia o comando e nomeie a propriedade geométrica ou operação vetorial que ele solicita.',
      ],
      ...question.steps,
      [
        'Cheque a interpretação',
        `O resultado precisa satisfazer a relação original; essa verificação também elimina erros plausíveis das alternativas.`,
      ],
    ],
  };
}

const bank = [...targets.entries()]
  .flatMap(([topic, amount]) =>
    evenlyChoose(
      source.filter((question) => question.topic === topic),
      amount,
    ),
  )
  .map(enrich);

if (bank.length !== 250)
  throw new Error('O banco Vetorial v2 deve ter 250 questões.');
if (new Set(bank.map((question) => question.statement)).size !== bank.length)
  throw new Error('Há enunciados repetidos no banco Vetorial v2.');

export function createDiverseVectorBatch(number) {
  const batch = Number(number);
  if (!Number.isInteger(batch) || batch < 1 || batch > 5)
    throw new Error(`Lote v2 desconhecido: ${number}.`);
  return bank.slice((batch - 1) * 50, batch * 50);
}

export function getDiverseVectorBank() {
  return bank;
}
