// Banco Cálculo II v3. Questões autorais da Arc, planejadas a partir de
// competências (não de enunciados) do material de referência.
const r = String.raw;

const topicDefinitions = [
  {
    topic: 'antiderivadas-e-integrais-indefinidas',
    count: 16,
    build: (n) => {
      const power = n + 1;
      const coefficient = n % 3 === 0 ? 2 : 1;
      const integrand =
        coefficient === 1 ? `x^${power}` : `${coefficient}x^${power}`;
      const answer =
        coefficient === 1
          ? `x^${power + 1}/${power + 1}+C`
          : `${coefficient}x^${power + 1}/${power + 1}+C`;
      return directIntegral(
        n,
        'antiderivadas-e-integrais-indefinidas',
        integrand,
        answer,
        `A potência aumenta de ${power} para ${power + 1} e o novo expoente passa a dividir o coeficiente.`,
      );
    },
  },
  {
    topic: 'integral-definida',
    count: 16,
    build: (n) => {
      const end = n + 2;
      const answer = `${end ** 2}/2`;
      return definiteIntegral(
        n,
        `\\int_0^${end}x\\,dx`,
        `$${answer}$`,
        `A área sob $y=x$ entre $0$ e $${end}$ é a área de um triângulo de base e altura $${end}$.`,
      );
    },
  },
  {
    topic: 'substituicao',
    count: 16,
    build: (n) => {
      const a = (n % 6) + 2;
      return directIntegral(
        n,
        'substituicao',
        `${2 * a}x\\cos(${a}x^2)`,
        `\\sin(${a}x^2)+C`,
        `A derivada de $${a}x^2$ é $${2 * a}x$, exatamente o fator que acompanha o cosseno.`,
      );
    },
  },
  {
    topic: 'integracao-por-partes',
    count: 16,
    build: (n) => {
      const a = (n % 4) + 1;
      return directIntegral(
        n,
        'integracao-por-partes',
        `xe^{${a}x}`,
        `e^{${a}x}\\left(\\frac{x}{${a}}-\\frac{1}{${a ** 2}}\\right)+C`,
        `Há um produto: derivar $x$ o simplifica e integrar $e^{${a}x}$ é direto.`,
      );
    },
  },
  {
    topic: 'fracoes-parciais',
    count: 16,
    build: (n) => {
      const a = (n % 6) + 1;
      return directIntegral(
        n,
        'fracoes-parciais',
        `\\frac{1}{x(x+${a})}`,
        `\\frac{1}{${a}}\\ln\\left|\\frac{x}{x+${a}}\\right|+C`,
        `O denominador possui dois fatores lineares distintos; decomponha a fração antes de integrar.`,
      );
    },
  },
  {
    topic: 'integrais-trigonometricas',
    count: 16,
    build: (n) => {
      const power = (n % 4) + 2;
      return directIntegral(
        n,
        'integrais-trigonometricas',
        `\\sin x\\cos^${power}x`,
        `-\\frac{\\cos^${power + 1}x}{${power + 1}}+C`,
        `Separe $\\sin x\\,dx$; a derivada de $\\cos x$ fornece o sinal negativo.`,
      );
    },
  },
  {
    topic: 'intervalos-infinitos',
    count: 16,
    build: (n) => {
      const p = (n % 5) + 2;
      const answer = `Converge e vale $\\frac{1}{${p - 1}}$.`;
      return convergenceQuestion(
        n,
        'intervalos-infinitos',
        `\\int_1^{\\infty}\\frac{1}{x^${p}}\\,dx`,
        answer,
        `Como $p=${p}>1$, trata-se de uma integral de potência convergente.`,
      );
    },
  },
  {
    topic: 'descontinuidades',
    count: 16,
    build: (n) => {
      const denominator = (n % 4) + 2;
      const exponent = `${denominator - 1}/${denominator}`;
      return convergenceQuestion(
        n,
        'descontinuidades',
        `\\int_0^1\\frac{1}{x^{${exponent}}}\\,dx`,
        `Converge e vale $${denominator}$.`,
        `A descontinuidade está em $x=0$; como o expoente $${exponent}$ é menor que $1$, o limite existe.`,
      );
    },
  },
  {
    topic: 'limite-de-sequencia',
    count: 15,
    build: (n) => {
      const top = (n % 7) + 2;
      const bottom = (n % 5) + 3;
      return sequenceQuestion(
        n,
        'limite-de-sequencia',
        `a_n=\\frac{${top}n^2-${n + 1}n+1}{${bottom}n^2+${n + 2}}`,
        `$\\frac{${top}}{${bottom}}$`,
        `Divida numerador e denominador por $n^2$, a maior potência do índice.`,
      );
    },
  },
  {
    topic: 'monotonicidade-e-convergencia',
    count: 15,
    build: (n) => {
      const base = (n % 6) + 1;
      return sequenceQuestion(
        n,
        'monotonicidade-e-convergencia',
        `a_n=${base}+\\frac{1}{n+${n + 1}}`,
        `É decrescente, limitada inferiormente por $${base}$ e converge para $${base}$.`,
        `A parcela $1/(n+${n + 1})$ diminui e permanece positiva quando $n$ cresce.`,
      );
    },
  },
  {
    topic: 'series-geometricas',
    count: 15,
    build: (n) => {
      const first = (n % 5) + 1;
      const numerator = (n % 4) + 1;
      const denominator = (n % 4) + 3;
      const answer = `\\frac{${first * denominator}}{${denominator - numerator}}`;
      return seriesQuestion(
        n,
        'series-geometricas',
        `\\sum_{k=0}^{\\infty}${first}\\left(\\frac{${numerator}}{${denominator}}\\right)^k`,
        `$${answer}$`,
        `Identifique o primeiro termo e a razão; o módulo da razão é menor que $1$.`,
      );
    },
  },
  {
    topic: 'convergencia-e-divergencia',
    count: 15,
    build: (n) => {
      const a = (n % 6) + 1;
      const b = a + (n % 3) + 1;
      return seriesQuestion(
        n,
        'convergencia-e-divergencia',
        `\\sum_{n=1}^{\\infty}\\frac{${a}n+1}{${b}n+2}`,
        'Diverge pelo teste do termo geral.',
        `O termo geral tende a $${a}/${b}$, que não é zero; essa condição já impede convergência.`,
      );
    },
  },
  {
    topic: 'testes-de-convergencia',
    count: 16,
    build: (n) => {
      const p = (n % 7) + 2;
      return seriesQuestion(
        n,
        'testes-de-convergencia',
        `\\sum_{n=1}^{\\infty}\\frac{1}{n^${p}}`,
        `Converge; é uma série $p$ com $p=${p}>1$.`,
        `A forma já é a de uma série de potência de $n$, portanto o teste $p$ é o mais direto.`,
      );
    },
  },
  {
    topic: 'series-alternadas',
    count: 15,
    build: (n) => {
      const p = (n % 4) + 1;
      return seriesQuestion(
        n,
        'series-alternadas',
        `\\sum_{n=1}^{\\infty}\\frac{(-1)^{n+1}}{n^${p}}`,
        p === 1
          ? 'Converge condicionalmente pelo teste alternado.'
          : 'Converge absolutamente.',
        `O módulo dos termos é $1/n^${p}$; compare a série sem sinais alternados antes de classificar.`,
      );
    },
  },
  {
    topic: 'series-de-potencias',
    count: 16,
    build: (n) => {
      const radius = (n % 6) + 2;
      return seriesQuestion(
        n,
        'series-de-potencias',
        `\\sum_{n=0}^{\\infty}\\left(\\frac{x-${n % 3}}{${radius}}\\right)^n`,
        `O raio de convergência é $${radius}$.`,
        `Compare a expressão com uma série geométrica; a razão depende de $x$.`,
      );
    },
  },
  {
    topic: 'taylor-e-maclaurin',
    count: 15,
    build: (n) => {
      const degree = (n % 4) + 2;
      return seriesQuestion(
        n,
        'taylor-e-maclaurin',
        `e^x`,
        `O polinômio de Maclaurin até grau $${degree}$ é $\\sum_{k=0}^{${degree}}\\frac{x^k}{k!}$.`,
        `Use as derivadas de $e^x$: todas valem $e^x$ e assumem valor $1$ no centro $0$.`,
      );
    },
  },
];

const modes = [
  'Calcule a expressão e escolha a alternativa correta.',
  'Uma estudante propôs um resultado. Qual conclusão corrige adequadamente o raciocínio?',
  'Antes de efetuar a conta, identifique o resultado compatível com a definição.',
  'Escolha a alternativa que permanece válida após uma verificação independente.',
  'Em uma revisão, qual resultado respeita todos os sinais e condições do problema?',
  'Qual opção descreve corretamente a estratégia e a conclusão?',
  'Analise a estrutura apresentada e complete a decisão matemática.',
  'Selecione a única afirmação que passa pela checagem final.',
];
const contexts = [
  'Em uma ficha de revisão individual,',
  'Ao conferir uma resolução curta,',
  'Em uma questão de diagnóstico,',
  'Durante a escolha de uma estratégia,',
  'Ao revisar um cálculo no quadro,',
  'Em uma comparação de métodos,',
  'No fechamento de uma etapa de estudo,',
  'Ao validar uma conclusão escrita,',
  'Em uma leitura atenta da notação,',
  'Ao testar uma alternativa de prova,',
  'Em uma discussão sobre o método adequado,',
  'Ao localizar um erro frequente,',
  'Em uma checagem de consistência,',
  'Ao resumir o raciocínio de uma colega,',
  'No momento de verificar as hipóteses,',
  'Em uma atividade de consolidação,',
];

function withEditorial({
  topic,
  difficulty,
  statement,
  answer,
  insight,
  n,
  options: suppliedOptions,
}) {
  const correct = n % 4;
  const variants = suppliedOptions ?? [
    answer,
    'Ocorre um erro de sinal ou de ordem na etapa decisiva.',
    'A conclusão usa uma fórmula fora de suas hipóteses.',
    'A expressão ignora uma condição necessária do enunciado.',
  ];
  const options = variants.map(
    (_, index) => variants[(index - correct + 4) % 4],
  );
  return {
    topic,
    difficulty,
    statement: `${contexts[(n - 1) % contexts.length]} ${statement} ${modes[n % modes.length]}`,
    options,
    correct,
    hints: [
      `Nomeie primeiro a ideia central: ${insight}`,
      'Escreva a definição ou a relação escolhida antes de substituir os dados.',
      'Ao final, teste se o resultado preserva as condições do enunciado e descarte erros de sinal, domínio ou hipótese.',
    ],
    finalAnswer: answer,
    explanation: `A habilidade avaliada é reconhecer a estrutura matemática antes de operar símbolos. ${insight} A alternativa correta é a única que aplica essa relação com todas as condições exigidas. As demais representam erros usuais: alterar um sinal, usar uma fórmula sem a hipótese necessária ou concluir antes de verificar o resultado.`,
    steps: [
      [
        'Leia o objetivo',
        'Separe o que o enunciado fornece da grandeza ou conclusão que ele pede.',
      ],
      ['Reconheça a ideia', insight],
      [
        'Escreva a relação',
        'Registre a definição, fórmula ou teste que se aplica antes de simplificar.',
      ],
      [
        'Desenvolva a análise',
        `Execute a transformação necessária e obtenha: ${answer}`,
      ],
      [
        'Confira a conclusão',
        'Verifique sinais, domínio e hipóteses; só então compare o resultado com as quatro alternativas.',
      ],
    ],
  };
}

function directIntegral(n, topic, integrand, answer, insight) {
  const answerText = `$${answer}$`;
  const core = answer.replace(/\+C$/, '');
  return withEditorial({
    topic,
    difficulty: ['easy', 'medium', 'hard'][n % 3],
    statement: `Considere a antiderivada $\\int ${integrand}\\,dx$.`,
    answer: answerText,
    insight,
    n,
    options: [answerText, `$${integrand}+C$`, `$-${core}+C$`, `$${core}$`],
  });
}
function definiteIntegral(n, integrand, answer, insight) {
  return withEditorial({
    topic: 'integral-definida',
    difficulty: ['easy', 'medium', 'hard'][n % 3],
    statement: `Avalie $${integrand}$.`,
    answer,
    insight,
    n,
    options: [
      answer,
      answer.replace('/2', ''),
      answer.replace('/2', '/4'),
      '$0$',
    ],
  });
}
function convergenceQuestion(n, topic, expression, answer, insight) {
  return withEditorial({
    topic,
    difficulty: ['medium', 'hard', 'easy'][n % 3],
    statement: `Examine ${expression}.`,
    answer,
    insight,
    n,
  });
}
function sequenceQuestion(n, topic, expression, answer, insight) {
  return withEditorial({
    topic,
    difficulty: ['easy', 'medium', 'hard'][n % 3],
    statement: `Considere a sequência $${expression}$.`,
    answer,
    insight,
    n,
  });
}
function seriesQuestion(n, topic, expression, answer, insight) {
  return withEditorial({
    topic,
    difficulty: ['medium', 'easy', 'hard'][n % 3],
    statement: `Estude a série ou função indicada: $${expression}$.`,
    answer,
    insight,
    n,
  });
}

const bank = topicDefinitions.flatMap((definition) =>
  Array.from({ length: definition.count }, (_, index) =>
    definition.build(index + 1),
  ),
);

if (bank.length !== 250)
  throw new Error(`Esperadas 250 questões, recebidas ${bank.length}.`);
if (new Set(bank.map((question) => question.statement)).size !== 250)
  throw new Error('Há enunciados repetidos no banco Cálculo II v3.');

export function createDiverseCalculusTwoBatch(number) {
  const batch = Number(number);
  if (!Number.isInteger(batch) || batch < 1 || batch > 5)
    throw new Error(`Lote Cálculo II v3 desconhecido: ${number}.`);
  return bank.slice((batch - 1) * 50, batch * 50);
}

export function getDiverseCalculusTwoBank() {
  return bank;
}
