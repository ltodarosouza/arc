const math = (value) => '$' + value + '$';
const vector = (values) => '(' + values.join(',') + ')';
const item = (value) => ({
  ...value,
  source: 'Arc original Cálculo Vetorial',
  subjectId: '20000000-0000-4000-8000-000000000003',
});
const baseExplanation =
  'A representação por coordenadas permite executar a operação componente a componente, sempre preservando a ordem dos eixos. A conferência substitui o resultado na relação original e evita trocas de sinal ou de posição.';
const parameters = Array.from({ length: 10 }, (_, index) => index + 1);

const displacement = parameters.map((n) => {
  const a = [n, 2 - n, n + 1];
  const b = [n + 2, n + 1, 2 * n + 1];
  const answer = b.map((value, index) => value - a[index]);
  return item({
    topic: 'componentes-e-base',
    difficulty: 'easy',
    statement:
      'Dados os pontos ' +
      math('A=' + vector(a)) +
      ' e ' +
      math('B=' + vector(b)) +
      ', encontre o vetor que parte de A e chega a B.',
    options: [
      math(vector(answer)),
      math(vector(a.map((value, index) => value - b[index]))),
      math(vector(b)),
      math(vector(a.map((value, index) => value + b[index]))),
    ],
    correct: 0,
    hints: [
      'O vetor de A até B é obtido fazendo ponto final menos ponto inicial.',
      'Subtraia separadamente as coordenadas x, y e z.',
    ],
    finalAnswer: math('AB=' + vector(answer)) + '.',
    explanation: baseExplanation,
    steps: [
      ['Organize a subtração', math('AB=B-A.')],
      [
        'Calcule as componentes',
        math('AB=' + vector(b) + '-' + vector(a) + '.'),
      ],
      [
        'Confira o sentido',
        math('A+AB=' + vector(b) + '=B') + ', portanto o sentido está correto.',
      ],
    ],
  });
});

const sums = parameters.map((n) => {
  const u = [n, 1 - n, 2];
  const v = [2, n + 1, -n];
  const answer = u.map((value, index) => value + v[index]);
  return item({
    topic: 'componentes-e-base',
    difficulty: 'easy',
    statement:
      'Calcule ' +
      math('u+v') +
      ' para ' +
      math('u=' + vector(u)) +
      ' e ' +
      math('v=' + vector(v)) +
      '.',
    options: [
      math(vector(answer)),
      math(vector(u.map((value, index) => value - v[index]))),
      math(vector(v.map((value, index) => value - u[index]))),
      math(vector(answer.slice().reverse())),
    ],
    correct: 0,
    hints: [
      'Vetores na mesma base são somados componente a componente.',
      'Não misture a primeira coordenada com a segunda ou a terceira.',
    ],
    finalAnswer: math('u+v=' + vector(answer)) + '.',
    explanation: baseExplanation,
    steps: [
      ['Alinhe as coordenadas', math(vector(u) + '+' + vector(v) + '.')],
      [
        'Some cada posição',
        'Some primeiras, segundas e terceiras componentes separadamente.',
      ],
      ['Registre o vetor', math('u+v=' + vector(answer) + '.')],
    ],
  });
});

const combinations = parameters.map((n) => {
  const u = [n, 1, -1];
  const v = [1, n, 2];
  const answer = u.map((value, index) => 2 * value - v[index]);
  return item({
    topic: 'componentes-e-base',
    difficulty: 'medium',
    statement:
      'Se ' +
      math('u=' + vector(u)) +
      ' e ' +
      math('v=' + vector(v)) +
      ', determine ' +
      math('2u-v') +
      '.',
    options: [
      math(vector(answer)),
      math(vector(u.map((value, index) => 2 * value + v[index]))),
      math(vector(u.map((value, index) => value - 2 * v[index]))),
      math(vector(v.map((value, index) => 2 * value - u[index]))),
    ],
    correct: 0,
    hints: [
      'Primeiro multiplique todas as componentes de u por 2.',
      'Depois subtraia de 2u a componente correspondente de v.',
    ],
    finalAnswer: math('2u-v=' + vector(answer)) + '.',
    explanation: baseExplanation,
    steps: [
      [
        'Faça o produto escalar',
        math('2u=' + vector(u.map((value) => 2 * value)) + '.'),
      ],
      [
        'Subtraia v',
        math(
          '2u-v=' + vector(u.map((value) => 2 * value)) + '-' + vector(v) + '.',
        ),
      ],
      ['Confira', math('2u-v=' + vector(answer) + '.')],
    ],
  });
});

const equality = parameters.map((n) => {
  const target = [n + 2, 2 * n, 3 - n];
  return item({
    topic: 'componentes-e-base',
    difficulty: 'easy',
    statement:
      'Para qual valor de x os vetores ' +
      math('u=' + vector([n + 2, 'x', 3 - n])) +
      ' e ' +
      math('v=' + vector(target)) +
      ' são iguais?',
    options: [
      math('x=' + 2 * n),
      math('x=' + n),
      math('x=' + (3 * n + 1)),
      math('x=' + -2 * n),
    ],
    correct: 0,
    hints: [
      'Vetores são iguais quando todas as componentes correspondentes são iguais.',
      'Compare a segunda componente, que é a única desconhecida.',
    ],
    finalAnswer: math('x=' + 2 * n) + '.',
    explanation: baseExplanation,
    steps: [
      [
        'Compare as posições',
        'A primeira e a terceira componentes já coincidem.',
      ],
      ['Use a componente desconhecida', math('x=' + 2 * n + '.')],
      ['Verifique', math('u=v=' + vector(target) + '.')],
    ],
  });
});

const midpoints = parameters.map((n) => {
  const a = [n, -n, 2];
  const b = [n + 4, n + 2, 2 * n];
  const answer = a.map((value, index) => (value + b[index]) / 2);
  return item({
    topic: 'componentes-e-base',
    difficulty: 'medium',
    statement:
      'Encontre o ponto médio do segmento com extremos ' +
      math('A=' + vector(a)) +
      ' e ' +
      math('B=' + vector(b)) +
      '.',
    options: [
      math(vector(answer)),
      math(vector(a.map((value, index) => value + b[index]))),
      math(vector(b.map((value, index) => value - a[index]))),
      math(vector(a)),
    ],
    correct: 0,
    hints: [
      'O ponto médio divide o segmento em duas partes de mesmo comprimento.',
      'Calcule a média aritmética de cada par de coordenadas.',
    ],
    finalAnswer: math('M=' + vector(answer)) + '.',
    explanation: baseExplanation,
    steps: [
      [
        'Use a fórmula',
        'Some as coordenadas dos extremos na mesma posição e divida cada soma por 2.',
      ],
      ['Calcule as médias', math('M=' + vector(answer) + '.')],
      [
        'Confira a simetria',
        'Os vetores de M até os dois extremos têm mesmo módulo e sentidos opostos.',
      ],
    ],
  });
});

const moduleExplanation =
  'O cálculo preserva a ordem das componentes e distingue o vetor de seu módulo e de sua direção. A verificação recompõe a definição utilizada, confirmando o resultado numérico e sua interpretação geométrica.';
const normQuestions = parameters.map((n) =>
  item({
    topic: 'norma-e-versores',
    difficulty: 'easy',
    statement:
      'Calcule o módulo de ' + math('u=' + vector([n, 2 * n, 2 * n])) + '.',
    options: [
      math(String(3 * n)),
      math(String(5 * n)),
      math(String(9 * n)),
      math(String(n)),
    ],
    correct: 0,
    hints: [
      'Eleve cada componente ao quadrado e some.',
      'O módulo é a raiz quadrada da soma obtida.',
    ],
    finalAnswer: math('|u|=' + 3 * n) + '.',
    explanation: moduleExplanation,
    steps: [
      [
        'Aplique a definição',
        math('|u|=sqrt{' + n + '^2+(' + 2 * n + ')^2+(' + 2 * n + ')^2}.'),
      ],
      ['Some os quadrados', math('|u|=sqrt{' + 9 * n * n + '}.')],
      ['Extraia a raiz', math('|u|=' + 3 * n + '.')],
    ],
  }),
);
const unitQuestions = parameters.map((n) =>
  item({
    topic: 'norma-e-versores',
    difficulty: 'medium',
    statement:
      'Qual é o versor de ' + math('u=' + vector([3 * n, 4 * n, 0])) + '?',
    options: [
      math(vector(['3/5', '4/5', 0])),
      math(vector(['4/5', '3/5', 0])),
      math(vector([3, 4, 0])),
      math(vector(['-3/5', '-4/5', 0])),
    ],
    correct: 0,
    hints: [
      'Um versor tem módulo 1 e o mesmo sentido do vetor original.',
      'Divida todas as componentes pelo módulo de u.',
    ],
    finalAnswer: math(vector(['3/5', '4/5', 0])) + '.',
    explanation: moduleExplanation,
    steps: [
      ['Calcule o módulo', math('|u|=' + 5 * n + '.')],
      [
        'Normalize',
        math(
          'u/|u|=' +
            vector([3 * n + '/' + 5 * n, 4 * n + '/' + 5 * n, 0]) +
            '.',
        ),
      ],
      ['Simplifique', math(vector(['3/5', '4/5', 0])) + ' tem módulo 1.'],
    ],
  }),
);
const scalarQuestions = parameters.map((n) => {
  const u = [n, -2, 3],
    k = n + 1,
    answer = u.map((value) => k * value);
  return item({
    topic: 'norma-e-versores',
    difficulty: 'easy',
    statement:
      'Calcule ' + math(k + 'u') + ' para ' + math('u=' + vector(u)) + '.',
    options: [
      math(vector(answer)),
      math(vector(u.map((value) => value + k))),
      math(vector(u.map((value) => -k * value))),
      math(vector([k, k, k])),
    ],
    correct: 0,
    hints: [
      'Multiplique todas as componentes pelo escalar.',
      'Preserve o sinal da componente negativa.',
    ],
    finalAnswer: math(k + 'u=' + vector(answer)) + '.',
    explanation: moduleExplanation,
    steps: [
      ['Distribua o escalar', math(k + 'u=' + k + vector(u) + '.')],
      ['Multiplique as entradas', 'Aplique o mesmo fator às três componentes.'],
      ['Confira', math(k + 'u=' + vector(answer) + '.')],
    ],
  });
});
const originDistances = parameters.map((n) =>
  item({
    topic: 'norma-e-versores',
    difficulty: 'easy',
    statement:
      'Qual é a distância da origem ao ponto ' +
      math('P=' + vector([2 * n, -2 * n, n])) +
      '?',
    options: [
      math(String(3 * n)),
      math(String(5 * n)),
      math(String(9 * n)),
      math(String(2 * n)),
    ],
    correct: 0,
    hints: [
      'A distância da origem é o módulo do vetor posição.',
      'Some os quadrados das coordenadas antes da raiz.',
    ],
    finalAnswer: math('d(O,P)=' + 3 * n) + '.',
    explanation: moduleExplanation,
    steps: [
      ['Forme o vetor posição', math('OP=' + vector([2 * n, -2 * n, n]) + '.')],
      ['Some os quadrados', math('d=sqrt{' + 9 * n * n + '}.')],
      ['Extraia a raiz', math('d=' + 3 * n + '.')],
    ],
  }),
);
const directionFactors = parameters.map((n) => {
  const u = [n, 2 * n, -n],
    k = n + 2,
    v = u.map((value) => k * value);
  return item({
    topic: 'norma-e-versores',
    difficulty: 'medium',
    statement:
      'Determine k em ' +
      math('v=ku') +
      ', com ' +
      math('u=' + vector(u)) +
      ' e ' +
      math('v=' + vector(v)) +
      '.',
    options: [
      math('k=' + k),
      math('k=' + n),
      math('k=' + -k),
      math('k=' + 2 * k),
    ],
    correct: 0,
    hints: [
      'Compare componentes correspondentes não nulas.',
      'O mesmo fator precisa funcionar nas três coordenadas.',
    ],
    finalAnswer: math('k=' + k) + '.',
    explanation: moduleExplanation,
    steps: [
      ['Compare uma componente', math(k * n + '=k' + n + '.')],
      ['Isole o escalar', math('k=' + k + '.')],
      [
        'Verifique',
        'As outras duas componentes recebem exatamente o mesmo fator.',
      ],
    ],
  });
});
const batch02 = [
  ...normQuestions,
  ...unitQuestions,
  ...scalarQuestions,
  ...originDistances,
  ...directionFactors,
];

export function createVectorBatch(number) {
  if (number === '02') return batch02;
  if (number === '01')
    return [
      ...displacement,
      ...sums,
      ...combinations,
      ...equality,
      ...midpoints,
    ];
  throw new Error('Lote vetorial ainda não definido: ' + number);
}
