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

export function createVectorBatch(number) {
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
