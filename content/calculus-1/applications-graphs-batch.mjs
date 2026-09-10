/* oxlint-disable typescript/no-unsafe-unary-minus */
// Lote autoral orientado por competências do cap. 4 de Stewart, sem reutilizar enunciados ou figuras.
const M = (value) => `$${value}$`;

function question(
  id,
  topic,
  difficulty,
  statement,
  answer,
  distractors,
  hints,
  steps,
  skill,
  commandType,
  commonError,
) {
  const options = [answer, ...distractors];
  return {
    id,
    topic,
    difficulty,
    statement,
    options,
    correct: 0,
    finalAnswer: answer,
    hints,
    steps,
    skill,
    commandType,
    commonError,
    explanation: `Esta questão avalia ${skill}. ${steps.map(([, content]) => content).join(' ')} A conclusão é ${answer}; os demais resultados correspondem a ${commonError}.`,
  };
}

const extrema = [
  [-1, 3, 'easy'],
  [0, 4, 'easy'],
  [1, 2, 'easy'],
  [2, 5, 'easy'],
  [3, 1, 'easy'],
  [4, 7, 'easy'],
  [-2, 6, 'easy'],
  [5, -3, 'easy'],
].map(([v, k, difficulty], index) => {
  const f = `f(x)=-(x-${v})^2+${k}`;
  return question(
    `c1-am-${String(index + 1).padStart(2, '0')}`,
    'extremos-e-valor-medio',
    difficulty,
    `A parábola ${M(f)} representa uma grandeza para todo $x\\in\\mathbb R$. Em que ponto ocorre seu máximo global?`,
    M(`(${v},${k})`),
    [M(`(${v},${k - 1})`), M(`(${v + 10},${k})`), M(`(${v + 1},${k})`)],
    [
      'Observe o sinal do termo quadrático.',
      'A forma de vértice já mostra a abscissa do extremo.',
      'Substitua a abscissa do vértice na expressão para conferir a ordenada.',
    ],
    [
      ['Identifique a forma', `A expressão está na forma de vértice: ${M(f)}.`],
      [
        'Localize o vértice',
        `O termo ${v >= 0 ? `x-${v}` : `x+${-v}`} se anula em ${M(`x=${v}`)}.`,
      ],
      [
        'Classifique a concavidade',
        'O coeficiente de $(x-v)^2$ é negativo, portanto a parábola abre para baixo.',
      ],
      [
        'Calcule a altura',
        `No vértice, o termo quadrático vale zero e ${M(`f(${v})=${k}`)}.`,
      ],
      [
        'Verifique',
        'Todos os outros valores subtraem um quadrado de $k$, logo não podem ser maiores.',
      ],
    ],
    'localizar o máximo de uma parábola',
    'leitura da forma de vértice',
    'trocar o sinal da abscissa ou ignorar a concavidade',
  );
});

const intervalSpecs = [
  ['x^2-4x+1', '[0,5]', '(-3,1,6)', '-3', '6', '1'],
  ['x^2-6x+5', '[1,6]', '(-4,0,5)', '-4', '5', '0'],
  ['-x^2+4x+1', '[0,5]', '(-4,1,5)', '-4', '5', '1'],
  ['x^2+2x-3', '[-3,2]', '(-4,0,5)', '-4', '5', '0'],
  ['-x^2-2x+4', '[-3,2]', '(-4,1,5)', '-4', '5', '1'],
  ['x^2-2x-8', '[-2,4]', '(0,-8,0)', '-9', '0', '4'],
  ['-x^2+6x-2', '[1,5]', '(3,1,3)', '7', '3', '-2'],
  ['x^2+4x+1', '[-4,1]', '(1,-7,6)', '-3', '1', '6'],
];
const intervals = intervalSpecs.map(
  ([formula, range, values, min, max, endpoint], index) =>
    question(
      `c1-am-${String(index + 9).padStart(2, '0')}`,
      'extremos-e-valor-medio',
      'medium',
      `Determine os valores mínimo e máximo absolutos de ${M(`f(x)=${formula}`)} no intervalo fechado ${M(range)}.`,
      `mínimo ${M(min)} e máximo ${M(max)}`,
      [
        `mínimo ${M(max)} e máximo ${M(min)}`,
        `mínimo ${M(endpoint)} e máximo ${M(max)}`,
        'não há extremos absolutos',
      ],
      [
        'Em intervalo fechado, compare críticos internos e extremidades.',
        'Derive a função e resolva $f^{\\prime}(x)=0$.',
        `Monte uma tabela com os valores nos candidatos; nesta questão, eles são ${M(values)}.`,
      ],
      [
        [
          'Use o Teorema do Valor Extremo',
          'Um polinômio é contínuo; em um intervalo fechado ele atinge máximo e mínimo absolutos.',
        ],
        [
          'Encontre candidatos internos',
          'A derivada é linear e seu zero fornece o vértice, quando ele pertence ao intervalo.',
        ],
        [
          'Inclua as extremidades',
          `Avalie também os dois extremos do intervalo. Os valores relevantes são ${M(values)}.`,
        ],
        [
          'Compare os valores',
          `O menor valor é ${M(min)} e o maior é ${M(max)}.`,
        ],
        [
          'Conclua',
          'A comparação inclui todos os únicos candidatos possíveis, portanto a classificação é absoluta.',
        ],
      ],
      'comparar candidatos de extremo absoluto',
      'análise em intervalo fechado',
      'considerar somente o ponto crítico ou somente as extremidades',
    ),
);

const tests = [
  ['x^3-3x', '-1,1', 'mínimo local em $x=1$ e máximo local em $x=-1$', 'hard'],
  ['x^3-12x', '-2,2', 'mínimo local em $x=2$ e máximo local em $x=-2$', 'hard'],
  [
    'x^4-8x^2',
    '-2,0,2',
    'máximos locais em $x=0$ e mínimos locais em $x=-2$ e $x=2$',
    'hard',
  ],
  [
    'x^3-6x^2+9x',
    '1,3',
    'máximo local em $x=1$ e mínimo local em $x=3$',
    'hard',
  ],
  [
    'x^4-2x^2',
    '-1,0,1',
    'máximo local em $x=0$ e mínimos locais em $x=-1$ e $x=1$',
    'hard',
  ],
  [
    'x^3+3x^2-9x',
    '-3,1',
    'máximo local em $x=-3$ e mínimo local em $x=1$',
    'hard',
  ],
  [
    'x^3-3x^2-9x',
    '-1,3',
    'máximo local em $x=-1$ e mínimo local em $x=3$',
    'hard',
  ],
].map(([formula, critical, answer, difficulty], index) =>
  question(
    `c1-am-${String(index + 17).padStart(2, '0')}`,
    'extremos-e-valor-medio',
    difficulty,
    `Para ${M(`f(x)=${formula}`)}, use o sinal de ${M('f^{\\prime}')} nos números críticos ${M(critical)} para classificar os extremos locais.`,
    answer,
    [
      'todos os números críticos são mínimos locais',
      'todos os números críticos são máximos locais',
      'não há extremos locais',
    ],
    [
      'Número crítico não é automaticamente máximo ou mínimo.',
      'Faça uma tabela de sinais para $f^{\\prime}$ nos intervalos separados pelos críticos.',
      'A mudança de positivo para negativo indica máximo; a inversa indica mínimo.',
    ],
    [
      [
        'Derive a função',
        `A derivada de ${M(`f(x)=${formula}`)} determina onde a função cresce ou decresce.`,
      ],
      [
        'Separe os intervalos',
        `Os números críticos ${M(critical)} dividem a reta em intervalos de teste.`,
      ],
      [
        'Analise o sinal',
        'Use um ponto de cada intervalo ou os fatores da derivada para saber se $f$ cresce ou decresce.',
      ],
      [
        'Classifique as mudanças',
        'Crescer e depois decrescer produz máximo; decrescer e depois crescer produz mínimo.',
      ],
      ['Conclua', `A tabela de sinais fornece: ${answer}.`],
    ],
    'classificar extremos pelo teste da primeira derivada',
    'tabela de sinais',
    'confundir número crítico com extremo sem testar a mudança de sinal',
  ),
);

const graphKinds = [
  [
    'máximo local seguido de mínimo local',
    'a função cresce, depois decresce e volta a crescer',
    'hard',
  ],
  [
    'mínimo local seguido de máximo local',
    'a função decresce, depois cresce e volta a decrescer',
    'medium',
  ],
  [
    'um mínimo local e depois um máximo local',
    'a inclinação muda de negativa para positiva e depois para negativa',
    'hard',
  ],
  [
    'dois máximos locais e um mínimo local entre eles',
    'a inclinação alterna positivo, negativo, positivo, negativo',
    'hard',
  ],
];
const graphCommands = [
  'Qual descrição de variação é compatível com a curva?',
  'Em que situação uma reta tangente horizontal é esperada?',
  'Qual afirmação sobre o sinal de $f^{\\prime}$ é compatível?',
  'Qual esboço de uma tabela de monotonia corresponde à figura?',
  'Que sequência de extremos locais a figura sugere?',
];
const graphs = Array.from({ length: 20 }, (_, index) => {
  const [description, variation] = graphKinds[index % graphKinds.length];
  const difficulty = ['easy', 'medium', 'hard'][index % 3];
  const number = String(index + 1).padStart(2, '0');
  return question(
    `c1-ag-${number}`,
    'analise-de-graficos',
    difficulty,
    `Considere o gráfico vetorial autoral abaixo. [[diagram:curve-${number}]] ${graphCommands[index % graphCommands.length]}`,
    description,
    [
      'a função é estritamente crescente em todo o domínio',
      'a curva não possui mudança de concavidade',
      'o gráfico representa necessariamente uma reta',
    ],
    [
      'Leia o gráfico da esquerda para a direita.',
      'Compare a direção da curva antes e depois de cada topo ou vale.',
      'Uma tangente horizontal pode ocorrer onde o sentido de variação muda.',
    ],
    [
      [
        'Leia os eixos',
        'O eixo horizontal representa a variável independente e a altura representa o valor da função.',
      ],
      ['Observe a variação', `A curva mostra que ${variation}.`],
      [
        'Relacione com derivadas',
        'Onde a curva sobe, $f^{\\prime}$ é positiva; onde desce, $f^{\\prime}$ é negativa.',
      ],
      [
        'Identifique as mudanças',
        'Uma troca de crescimento para decrescimento sugere máximo; a troca contrária sugere mínimo.',
      ],
      ['Conclua', `A descrição compatível é: ${description}.`],
    ],
    'interpretar crescimento, decrescimento e extremos a partir de um gráfico',
    'leitura de gráfico',
    'desconsiderar a direção da curva ou inferir uma fórmula inexistente',
  );
});

export const applicationsAndGraphsBatch = [
  ...extrema,
  ...intervals,
  ...tests,
  ...graphs,
];
if (applicationsAndGraphsBatch.length !== 43)
  throw new Error('O lote deve conter 43 questões.');
