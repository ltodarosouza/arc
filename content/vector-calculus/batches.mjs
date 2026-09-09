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
      math(String(n + 7)),
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

const productExplanation =
  'O produto escalar combina componentes correspondentes e produz um número real. Ele conecta a álgebra à geometria por meio de ortogonalidade, ângulos, projeções e trabalho; por isso conferimos também o significado do resultado.';
const dotQuestions = parameters.map((n) => {
  const u = [n, 1, -1],
    v = [2, n, 1],
    answer = 3 * n - 1;
  return item({
    topic: 'produto-escalar-e-projecao',
    difficulty: 'easy',
    statement:
      'Calcule ' +
      math('u cdot v') +
      ' para ' +
      math('u=' + vector(u)) +
      ' e ' +
      math('v=' + vector(v)) +
      '.',
    options: [
      math(String(answer)),
      math(String(3 * n + 1)),
      math(String(3 * n)),
      math(String(-answer)),
    ],
    correct: 0,
    hints: [
      'Multiplique componentes correspondentes.',
      'Some os três produtos, preservando o sinal negativo.',
    ],
    finalAnswer: math('u cdot v=' + answer) + '.',
    explanation: productExplanation,
    steps: [
      ['Multiplique', math(n + ' cdot2+1 cdot' + n + '+(-1) cdot1.')],
      ['Some', math(2 * n + '+' + n + '-1.')],
      ['Conclua', math('u cdot v=' + answer + '.')],
    ],
  });
});
const orthogonalQuestions = parameters.map((n) =>
  item({
    topic: 'produto-escalar-e-projecao',
    difficulty: 'medium',
    statement:
      'Para qual valor de k os vetores ' +
      math('u=' + vector([n, 1])) +
      ' e ' +
      math('v=' + vector([1, 'k'])) +
      ' são ortogonais?',
    options: [
      math('k=' + -n),
      math('k=' + n),
      math('k=' + (n + 1)),
      math('k=0'),
    ],
    correct: 0,
    hints: [
      'Vetores ortogonais têm produto escalar zero.',
      'Escreva n vezes 1 mais 1 vezes k igual a zero.',
    ],
    finalAnswer: math('k=' + -n) + '.',
    explanation: productExplanation,
    steps: [
      ['Imponha ortogonalidade', math('u cdot v=0.')],
      ['Monte a equação', math(n + '+k=0.')],
      ['Isole k', math('k=' + -n + '.')],
    ],
  }),
);
const projectionQuestions = parameters.map((n) => {
  const u = [n, n + 1, 1 - n];
  return item({
    topic: 'produto-escalar-e-projecao',
    difficulty: 'easy',
    statement:
      'Qual é a projeção ortogonal de ' +
      math('u=' + vector(u)) +
      ' sobre o eixo x?',
    options: [
      math(vector([n, 0, 0])),
      math(vector([0, n + 1, 0])),
      math(vector(u)),
      math(vector([0, 0, 1 - n])),
    ],
    correct: 0,
    hints: [
      'O eixo x é gerado pelo vetor unitário da primeira coordenada.',
      'A projeção mantém a componente paralela ao eixo e zera as demais.',
    ],
    finalAnswer: math('proj_x u=' + vector([n, 0, 0])) + '.',
    explanation: productExplanation,
    steps: [
      ['Identifique a direção', math('e_1=' + vector([1, 0, 0]) + '.')],
      ['Calcule a componente', math('u cdot e_1=' + n + '.')],
      ['Monte a projeção', math(n + 'e_1=' + vector([n, 0, 0]) + '.')],
    ],
  });
});
const angleQuestions = parameters.map((n) =>
  item({
    topic: 'produto-escalar-e-projecao',
    difficulty: 'easy',
    statement:
      'Qual é o ângulo entre ' +
      math('u=' + vector([n, 0, 0])) +
      ' e ' +
      math('v=' + vector([0, n + 1, 0])) +
      '?',
    options: [
      math('90^circ'),
      math('0^circ'),
      math('45^circ'),
      math('180^circ'),
    ],
    correct: 0,
    hints: [
      'Calcule o produto escalar.',
      'Produto escalar zero entre vetores não nulos indica perpendicularidade.',
    ],
    finalAnswer: math('90^circ') + '.',
    explanation: productExplanation,
    steps: [
      ['Calcule o produto', math('u cdot v=0.')],
      ['Use a relação angular', math('u cdot v=|u||v|cos theta.')],
      ['Conclua', math('cos theta=0 Rightarrow theta=90^circ.')],
    ],
  }),
);
const workQuestions = parameters.map((n) => {
  const force = [n, 2, 1],
    move = [2, n, -1],
    answer = 4 * n - 1;
  return item({
    topic: 'produto-escalar-e-projecao',
    difficulty: 'medium',
    statement:
      'Uma força constante ' +
      math('F=' + vector(force)) +
      ' desloca um objeto por ' +
      math('d=' + vector(move)) +
      ' metros. Calcule o trabalho ' +
      math('W=F cdot d') +
      '.',
    options: [
      math(String(answer)) + ' J',
      math(String(4 * n + 1)) + ' J',
      math(String(2 * n)) + ' J',
      math(String(-answer)) + ' J',
    ],
    correct: 0,
    hints: [
      'Trabalho de uma força constante é produto escalar.',
      'Multiplique as componentes correspondentes e some.',
    ],
    finalAnswer: math('W=' + answer) + ' J.',
    explanation: productExplanation,
    steps: [
      [
        'Escreva o produto',
        math('W=' + n + ' cdot2+2 cdot' + n + '+1 cdot(-1).'),
      ],
      ['Some as parcelas', math('W=' + 2 * n + '+' + 2 * n + '-1.')],
      ['Inclua a unidade', math('W=' + answer) + ' joules.'],
    ],
  });
});
const batch03 = [
  ...dotQuestions,
  ...orthogonalQuestions,
  ...projectionQuestions,
  ...angleQuestions,
  ...workQuestions,
];

const crossExplanation =
  'O produto vetorial produz um vetor perpendicular aos dois fatores, com sentido determinado pela regra da mão direita. Seu módulo também mede a área do paralelogramo; o produto misto acrescenta um terceiro vetor e mede volume orientado.';
const crossBasic = parameters.map((n) => {
  const value = n * (n + 1);
  return item({
    topic: 'produto-vetorial-e-misto',
    difficulty: 'easy',
    statement:
      'Calcule ' +
      math('u times v') +
      ' para ' +
      math('u=' + vector([n, 0, 0])) +
      ' e ' +
      math('v=' + vector([0, n + 1, 0])) +
      '.',
    options: [
      math(vector([0, 0, value])),
      math(vector([0, 0, -value])),
      math(vector([value, 0, 0])),
      math(vector([0, value, 0])),
    ],
    correct: 0,
    hints: [
      'Use a orientação positiva dos eixos coordenados.',
      'O produto do eixo x pelo eixo y aponta para o eixo z.',
    ],
    finalAnswer: math('u times v=' + vector([0, 0, value])) + '.',
    explanation: crossExplanation,
    steps: [
      [
        'Monte o determinante',
        'As duas primeiras direções são os eixos x e y.',
      ],
      ['Calcule o módulo', math(n + ' cdot' + (n + 1) + '=' + value + '.')],
      [
        'Defina o sentido',
        'Pela regra da mão direita, o resultado aponta para z positivo.',
      ],
    ],
  });
});
const reverseCross = parameters.map((n) => {
  const value = n * (n + 2);
  return item({
    topic: 'produto-vetorial-e-misto',
    difficulty: 'medium',
    statement:
      'Calcule ' +
      math('v times u') +
      ' para ' +
      math('u=' + vector([n, 0, 0])) +
      ' e ' +
      math('v=' + vector([0, n + 2, 0])) +
      '.',
    options: [
      math(vector([0, 0, -value])),
      math(vector([0, 0, value])),
      math(vector([-value, 0, 0])),
      math(vector([0, -value, 0])),
    ],
    correct: 0,
    hints: [
      'A ordem dos fatores altera o sinal do produto vetorial.',
      'Primeiro calcule u vezes v e depois use a anticomutatividade.',
    ],
    finalAnswer: math('v times u=' + vector([0, 0, -value])) + '.',
    explanation: crossExplanation,
    steps: [
      [
        'Calcule na ordem direta',
        math('u times v=' + vector([0, 0, value]) + '.'),
      ],
      ['Inverta a ordem', math('v times u=-(u times v).')],
      ['Conclua', math('v times u=' + vector([0, 0, -value]) + '.')],
    ],
  });
});
const parallelogramAreas = parameters.map((n) => {
  const area = n * (n + 3);
  return item({
    topic: 'volumes-e-areas',
    difficulty: 'easy',
    statement:
      'Qual é a área do paralelogramo gerado por ' +
      math('u=' + vector([n, 0, 0])) +
      ' e ' +
      math('v=' + vector([0, n + 3, 0])) +
      '?',
    options: [
      math(String(area)),
      math(String(area / 2)),
      math(String(2 * area)),
      math(String(area + n + 1)),
    ],
    correct: 0,
    hints: [
      'A área do paralelogramo é o módulo do produto vetorial.',
      'Os vetores são perpendiculares, então a área também é o produto dos módulos.',
    ],
    finalAnswer: math('A=' + area) + '.',
    explanation: crossExplanation,
    steps: [
      ['Calcule o produto', math('u times v=' + vector([0, 0, area]) + '.')],
      ['Tome o módulo', math('|u times v|=' + area + '.')],
      ['Interprete', 'Esse módulo é a área do paralelogramo.'],
    ],
  });
});
const triangleAreas = parameters.map((n) => {
  const cross = 2 * n * (n + 1),
    area = cross / 2;
  return item({
    topic: 'volumes-e-areas',
    difficulty: 'medium',
    statement:
      'Calcule a área do triângulo formado por ' +
      math('u=' + vector([2 * n, 0, 0])) +
      ' e ' +
      math('v=' + vector([0, n + 1, 0])) +
      ' a partir da mesma origem.',
    options: [
      math(String(area)),
      math(String(cross)),
      math(String(area + n)),
      math(String(area + 2 * n + 1)),
    ],
    correct: 0,
    hints: [
      'O módulo do produto vetorial fornece a área do paralelogramo.',
      'O triângulo ocupa metade do paralelogramo.',
    ],
    finalAnswer: math('A=' + area) + '.',
    explanation: crossExplanation,
    steps: [
      ['Encontre o produto', math('|u times v|=' + cross + '.')],
      ['Divida por dois', math('A=' + cross + '/2.')],
      ['Simplifique', math('A=' + area + '.')],
    ],
  });
});
const boxVolumes = parameters.map((n) => {
  const volume = n * (n + 1) * (n + 2);
  return item({
    topic: 'produto-vetorial-e-misto',
    difficulty: 'medium',
    statement:
      'Qual é o volume do paralelepípedo gerado por ' +
      math('u=' + vector([n, 0, 0])) +
      ', ' +
      math('v=' + vector([0, n + 1, 0])) +
      ' e ' +
      math('w=' + vector([0, 0, n + 2])) +
      '?',
    options: [
      math(String(volume)),
      math(String(volume / 2)),
      math(String(2 * volume)),
      math(String(volume + n)),
    ],
    correct: 0,
    hints: [
      'O volume é o valor absoluto do produto misto.',
      'Como os vetores estão nos eixos, o determinante é o produto das entradas não nulas.',
    ],
    finalAnswer: math('V=' + volume) + '.',
    explanation: crossExplanation,
    steps: [
      ['Monte o produto misto', math('V=|(u times v) cdot w|.')],
      [
        'Use a estrutura diagonal',
        math('V=|' + n + ' cdot' + (n + 1) + ' cdot' + (n + 2) + '|.'),
      ],
      ['Calcule', math('V=' + volume + '.')],
    ],
  });
});
const batch04 = [
  ...crossBasic,
  ...reverseCross,
  ...parallelogramAreas,
  ...triangleAreas,
  ...boxVolumes,
];

const lineExplanation =
  'Uma reta espacial fica determinada por um ponto e um vetor diretor não nulo. A forma paramétrica soma ao ponto um múltiplo real da direção; por isso, substituir o parâmetro ou comparar componentes permite verificar cada resultado sem ambiguidade.';
const lineEvaluation = parameters.map((n) => {
  const p = [n, 1, -1],
    d = [1, 2, -1],
    answer = p.map((value, index) => value + n * d[index]);
  return item({
    topic: 'equacoes-de-retas',
    difficulty: 'easy',
    statement:
      'Na reta ' +
      math('r(t)=' + vector(p) + '+t' + vector(d)) +
      ', qual ponto corresponde a ' +
      math('t=' + n) +
      '?',
    options: [
      math(vector(answer)),
      math(vector(p.map((value, index) => value - d[index]))),
      math(vector(d)),
      math(vector(p)),
    ],
    correct: 0,
    hints: [
      'Substitua o parâmetro na expressão vetorial.',
      'Multiplique t por todas as componentes da direção antes de somar o ponto.',
    ],
    finalAnswer: math('r(' + n + ')=' + vector(answer)) + '.',
    explanation: lineExplanation,
    steps: [
      [
        'Substitua t',
        math('r(' + n + ')=' + vector(p) + '+' + n + vector(d) + '.'),
      ],
      [
        'Distribua',
        math(n + vector(d) + '=' + vector(d.map((value) => n * value)) + '.'),
      ],
      ['Some', math('r(' + n + ')=' + vector(answer) + '.')],
    ],
  });
});
const lineDirections = parameters.map((n) => {
  const a = [n, 0, 1],
    b = [n + 2, n, -1],
    answer = b.map((value, index) => value - a[index]);
  return item({
    topic: 'equacoes-de-retas',
    difficulty: 'easy',
    statement:
      'Qual vetor pode ser usado como direção da reta que passa por ' +
      math('A=' + vector(a)) +
      ' e ' +
      math('B=' + vector(b)) +
      '?',
    options: [
      math(vector(answer)),
      math(vector(b)),
      math(vector(a)),
      math(vector(a.map((value, index) => value + b[index]))),
    ],
    correct: 0,
    hints: [
      'Uma direção é obtida ligando um ponto ao outro.',
      'Faça B menos A componente a componente.',
    ],
    finalAnswer: math('d=' + vector(answer)) + '.',
    explanation: lineExplanation,
    steps: [
      ['Escolha o sentido', math('d=B-A.')],
      ['Subtraia', math('d=' + vector(b) + '-' + vector(a) + '.')],
      ['Confira', math('A+d=B.')],
    ],
  });
});
const lineParameters = parameters.map((n) => {
  const p = [1, -1, 2],
    d = [2, 1, -1],
    q = p.map((value, index) => value + n * d[index]);
  return item({
    topic: 'equacoes-de-retas',
    difficulty: 'medium',
    statement:
      'O ponto ' +
      math('Q=' + vector(q)) +
      ' pertence a ' +
      math('r(t)=' + vector(p) + '+t' + vector(d)) +
      '. Qual é o parâmetro correspondente?',
    options: [
      math('t=' + n),
      math('t=' + -n),
      math('t=' + (n + 1)),
      math('t=' + 3 * n + 1),
    ],
    correct: 0,
    hints: [
      'Iguale uma componente do ponto à componente correspondente da reta.',
      'Depois confira o mesmo t nas outras duas equações.',
    ],
    finalAnswer: math('t=' + n) + '.',
    explanation: lineExplanation,
    steps: [
      ['Compare a primeira componente', math('1+2t=' + (1 + 2 * n) + '.')],
      ['Resolva', math('t=' + n + '.')],
      ['Verifique', 'A segunda e a terceira componentes também produzem Q.'],
    ],
  });
});
const lineForms = parameters.map((n) => {
  const p = [n, 1 - n, 2],
    d = [1, n, 2];
  return item({
    topic: 'equacoes-de-retas',
    difficulty: 'medium',
    statement:
      'Qual equação paramétrica representa a reta que passa por ' +
      math('P=' + vector(p)) +
      ' com direção ' +
      math('d=' + vector(d)) +
      '?',
    options: [
      math('r(t)=' + vector(p) + '+t' + vector(d)),
      math('r(t)=' + vector(d) + '+t' + vector(p)),
      math('r(t)=' + vector(p) + '+t' + vector(d.map((value) => -value))),
      math('r(t)=t' + vector(p)),
    ],
    correct: 0,
    hints: [
      'Use a forma ponto mais parâmetro vezes direção.',
      'O vetor constante deve ser o ponto dado e o coeficiente de t deve ser a direção.',
    ],
    finalAnswer: math('r(t)=' + vector(p) + '+t' + vector(d)) + '.',
    explanation: lineExplanation,
    steps: [
      ['Recorde o modelo', math('r(t)=P+td.')],
      [
        'Substitua os dados',
        math('r(t)=' + vector(p) + '+t' + vector(d) + '.'),
      ],
      ['Confira', 'Em t igual a zero, a reta passa exatamente por P.'],
    ],
  });
});
const xyIntersections = parameters.map((n) => {
  const p = [n, 1, 2 * n],
    d = [1, -1, -2],
    answer = [2 * n, 1 - n, 0];
  return item({
    topic: 'equacoes-de-retas',
    difficulty: 'medium',
    statement:
      'Onde a reta ' +
      math('r(t)=' + vector(p) + '+t' + vector(d)) +
      ' encontra o plano xy?',
    options: [
      math(vector(answer)),
      math(vector(p)),
      math(vector([0, 1 - n, 2 * n])),
      math(vector([2 * n, 1, 0])),
    ],
    correct: 0,
    hints: [
      'No plano xy, a coordenada z é zero.',
      'Use a terceira equação para encontrar t e depois calcule x e y.',
    ],
    finalAnswer: math(vector(answer)) + '.',
    explanation: lineExplanation,
    steps: [
      ['Imponha z igual a zero', math(2 * n + '-2t=0.')],
      ['Encontre t', math('t=' + n + '.')],
      ['Calcule o ponto', math('r(' + n + ')=' + vector(answer) + '.')],
    ],
  });
});
const batch05 = [
  ...lineEvaluation,
  ...lineDirections,
  ...lineParameters,
  ...lineForms,
  ...xyIntersections,
];

const planeExplanation =
  'Um plano é identificado por um ponto e um vetor normal. Na equação cartesiana, os coeficientes de x, y e z formam esse normal; substituir um ponto ou comparar normais é uma forma direta de conferir pertencimento, paralelismo e perpendicularidade.';
const planeMembership = parameters.map((n) => {
  const normal = [1, 2, -1],
    point = [n, 1, n + 2],
    constant =
      normal[0] * point[0] + normal[1] * point[1] + normal[2] * point[2];
  const candidate = [n + 1, 1, n + 3];
  return item({
    topic: 'equacoes-de-planos',
    difficulty: 'easy',
    statement:
      'O ponto ' +
      math('P=' + vector(point)) +
      ' pertence ao plano ' +
      math('x+2y-z=' + constant) +
      '. Qual dos pontos abaixo também pertence a ele?',
    options: [
      math(vector(candidate)),
      math(vector([n, 2, n + 1])),
      math(vector([n + 1, 1, n + 2])),
      math(vector([n, 0, n + 2])),
    ],
    correct: 0,
    hints: [
      'Substitua as coordenadas de cada candidato na equação do plano.',
      'O ponto pertence quando os dois lados da igualdade coincidem.',
    ],
    finalAnswer: math(vector(candidate)) + '.',
    explanation: planeExplanation,
    steps: [
      [
        'Calcule o lado esquerdo',
        math(n + 1 + '+2-(' + (n + 3) + ')=' + constant + '.'),
      ],
      ['Compare', math(constant + '=' + constant + '.')],
      ['Conclua', 'Esse ponto satisfaz a equação do plano.'],
    ],
  });
});
const planeNormals = parameters.map((n) =>
  item({
    topic: 'equacoes-de-planos',
    difficulty: 'easy',
    statement:
      'Qual vetor é normal ao plano ' +
      math(n + 'x-' + (n + 1) + 'y+2z=5') +
      '?',
    options: [
      math(vector([n, -(n + 1), 2])),
      math(vector([2, n, -(n + 1)])),
      math(vector([n, n + 1, -2])),
      math(vector([1, 1, 1])),
    ],
    correct: 0,
    hints: [
      'Os coeficientes de x, y e z formam um vetor normal.',
      'Mantenha o sinal do coeficiente de y.',
    ],
    finalAnswer: math('n=' + vector([n, -(n + 1), 2])) + '.',
    explanation: planeExplanation,
    steps: [
      [
        'Leia os coeficientes',
        'A equação está na forma ax mais by mais cz igual a d.',
      ],
      ['Forme o normal', math('n=' + vector([n, -(n + 1), 2]) + '.')],
      [
        'Verifique',
        'Esse vetor é perpendicular a qualquer direção contida no plano.',
      ],
    ],
  }),
);
const parallelPlanes = parameters.map((n) =>
  item({
    topic: 'paralelismo-e-intersecao',
    difficulty: 'medium',
    statement: 'Qual plano é paralelo a ' + math('' + n + 'x+2y-z=4') + '?',
    options: [
      math('' + n + 'x+2y-z=' + (n + 5)),
      math('2x+' + n + 'y-z=4'),
      math('' + n + 'x-2y-z=4'),
      math('x+2y-' + n + 'z=4'),
    ],
    correct: 0,
    hints: [
      'Planos paralelos têm vetores normais proporcionais.',
      'Mudar apenas o termo independente desloca o plano sem girá-lo.',
    ],
    finalAnswer: math('' + n + 'x+2y-z=' + (n + 5)) + '.',
    explanation: planeExplanation,
    steps: [
      ['Leia o normal', math('n_1=' + vector([n, 2, -1]) + '.')],
      ['Compare candidatos', 'O primeiro mantém os mesmos coeficientes.'],
      ['Conclua', 'Ele tem a mesma orientação e termo independente diferente.'],
    ],
  }),
);
const planeDistances = parameters.map((n) => {
  const point = [n, 0, 0];
  return item({
    topic: 'distancias-e-angulos',
    difficulty: 'medium',
    statement:
      'Calcule a distância do ponto ' +
      math('P=' + vector(point)) +
      ' ao plano ' +
      math('x=0') +
      '.',
    options: [
      math(String(n)),
      math(String(n + 3)),
      math('0'),
      math(String(n + 7)),
    ],
    correct: 0,
    hints: [
      'O plano x igual a zero é o plano yz.',
      'A distância perpendicular é o valor absoluto da coordenada x.',
    ],
    finalAnswer: math('d=' + n) + '.',
    explanation: planeExplanation,
    steps: [
      ['Identifique a normal', math('n=' + vector([1, 0, 0]) + '.')],
      [
        'Meça o afastamento',
        'A projeção perpendicular zera apenas a coordenada x.',
      ],
      ['Calcule', math('d=|' + n + '|=' + n + '.')],
    ],
  });
});
const planeIntersections = parameters.map((n) => {
  const y = n + 1;
  return item({
    topic: 'equacoes-de-planos',
    difficulty: 'medium',
    statement:
      'A reta ' +
      math('r(t)=' + vector([0, n, 0]) + '+t' + vector([1, 1, 1])) +
      ' encontra o plano ' +
      math('x+y+z=' + (4 * n + 3)) +
      '. Qual é o parâmetro t?',
    options: [
      math('t=' + (n + 1)),
      math('t=' + n),
      math('t=' + (2 * n + 1)),
      math('t=0'),
    ],
    correct: 0,
    hints: [
      'Substitua as coordenadas paramétricas da reta no plano.',
      'A soma das três coordenadas será n mais 3t.',
    ],
    finalAnswer: math('t=' + (n + 1)) + '.',
    explanation: planeExplanation,
    steps: [
      ['Escreva as coordenadas', math('x=t, y=' + n + '+t, z=t.')],
      ['Substitua no plano', math('t+(' + n + '+t)+t=' + (4 * n + 3) + '.')],
      ['Resolva', math('3t=' + (3 * n + 3) + ' Rightarrow t=' + (n + 1) + '.')],
    ],
  });
});
const batch06 = [
  ...planeMembership,
  ...planeNormals,
  ...parallelPlanes,
  ...planeDistances,
  ...planeIntersections,
];

const relationExplanation =
  'Relações espaciais são determinadas pelas direções: vetores diretores descrevem retas e vetores normais descrevem planos. Comparar proporcionalidade e produto escalar permite decidir paralelismo e perpendicularidade sem depender de um desenho em perspectiva.';
const lineParallel = parameters.map((n) =>
  item({
    topic: 'paralelismo-e-intersecao',
    difficulty: 'medium',
    statement:
      'A reta r tem vetor diretor ' +
      math('d=' + vector([n, 1, -1])) +
      '. Qual vetor pode ser diretor de uma reta paralela a r?',
    options: [
      math(vector([2 * n, 2, -2])),
      math(vector([2 * n, 1, -2])),
      math(vector([n, -1, 1])),
      math(vector([1, 2 * n, -2])),
    ],
    correct: 0,
    hints: [
      'Retas paralelas têm vetores diretores proporcionais.',
      'Multiplique todas as três coordenadas do vetor pelo mesmo número.',
    ],
    finalAnswer: math(vector([2 * n, 2, -2])) + '.',
    explanation: relationExplanation,
    steps: [
      ['Leia a direção', math('d=' + vector([n, 1, -1]) + '.')],
      ['Use um mesmo fator', math('2d=' + vector([2 * n, 2, -2]) + '.')],
      [
        'Conclua',
        'Como todos os componentes foram multiplicados por 2, a direção é a mesma.',
      ],
    ],
  }),
);
const linePlanePerpendicular = parameters.map((n) =>
  item({
    topic: 'paralelismo-e-intersecao',
    difficulty: 'medium',
    statement:
      'A reta r tem vetor diretor ' +
      math('d=' + vector([n, 1, -1])) +
      ' e o plano pi tem equação ' +
      math(n + 'x+y-z=4') +
      '. Qual relação é garantida?',
    options: [
      'A reta é perpendicular ao plano.',
      'A reta é paralela ao plano.',
      'A reta está contida no plano.',
      'Não é possível concluir nenhuma relação.',
    ],
    correct: 0,
    hints: [
      'Os coeficientes do plano formam seu vetor normal.',
      'Uma reta é perpendicular a um plano quando seu diretor é paralelo ao normal.',
    ],
    finalAnswer: 'A reta é perpendicular ao plano.',
    explanation: relationExplanation,
    steps: [
      ['Extraia o normal', math('n_{pi}=' + vector([n, 1, -1]) + '.')],
      ['Compare', math('d=n_{pi}.')],
      [
        'Conclua',
        'O diretor da reta tem a direção normal ao plano; portanto, a reta o corta perpendicularmente.',
      ],
    ],
  }),
);
const planeOrthogonal = parameters.map((n) =>
  item({
    topic: 'paralelismo-e-intersecao',
    difficulty: 'medium',
    statement:
      'Considere os planos ' +
      math('pi_1:' + n + 'x+y=2') +
      ' e ' +
      math('pi_2:x-' + n + 'y=3') +
      '. Como eles se relacionam?',
    options: [
      'São perpendiculares.',
      'São paralelos distintos.',
      'São o mesmo plano.',
      'Não se pode comparar planos por suas equações.',
    ],
    correct: 0,
    hints: [
      'Use os normais ' +
        math('n_1=' + vector([n, 1, 0])) +
        ' e ' +
        math('n_2=' + vector([1, -n, 0])) +
        '.',
      'Planos são perpendiculares quando seus normais têm produto escalar zero.',
    ],
    finalAnswer: 'São perpendiculares.',
    explanation: relationExplanation,
    steps: [
      [
        'Liste os normais',
        math('n_1=' + vector([n, 1, 0]) + ', n_2=' + vector([1, -n, 0]) + '.'),
      ],
      ['Calcule o produto', math('n_1 cdot n_2=' + n + '-' + n + '=0.')],
      ['Conclua', 'Normais ortogonais determinam planos perpendiculares.'],
    ],
  }),
);
const pointPlaneDistances = parameters.map((n) =>
  item({
    topic: 'distancias-e-angulos',
    difficulty: 'easy',
    statement:
      'Qual é a distância do ponto ' +
      math('P=' + vector([n, 1, n + 2])) +
      ' ao plano ' +
      math('z=0') +
      '?',
    options: [
      math(String(n + 2)),
      math(String(n + 5)),
      math('1'),
      math(String(3 * n + 8)),
    ],
    correct: 0,
    hints: [
      'O plano z igual a zero é o plano xy.',
      'A distância perpendicular é o valor absoluto da coordenada z.',
    ],
    finalAnswer: math('d=' + (n + 2)) + '.',
    explanation: relationExplanation,
    steps: [
      ['Localize o plano', 'No plano xy, toda coordenada z vale zero.'],
      ['Compare a altura', math('z_P=' + (n + 2) + '.')],
      ['Aplique valor absoluto', math('d=|' + (n + 2) + '|=' + (n + 2) + '.')],
    ],
  }),
);
const linePlaneAngles = parameters.map((n) =>
  item({
    topic: 'distancias-e-angulos',
    difficulty: 'hard',
    statement:
      'A reta r tem diretor ' +
      math('d=' + vector([n, 1, 0])) +
      ' e o plano pi tem normal ' +
      math('n=' + vector([1, -n, 0])) +
      '. Qual é o ângulo entre r e pi?',
    options: [
      math('0^circ'),
      math('90^circ'),
      math('45^circ'),
      math('180^circ'),
    ],
    correct: 0,
    hints: [
      'Calcule o produto escalar entre o diretor da reta e o normal do plano.',
      'Se esse produto é zero, a reta é paralela ao plano e o ângulo reta-plano é zero.',
    ],
    finalAnswer: math('0^circ') + '.',
    explanation: relationExplanation,
    steps: [
      ['Calcule o produto', math('d cdot n=' + n + '-' + n + '=0.')],
      ['Interprete', 'O diretor da reta é ortogonal ao normal do plano.'],
      [
        'Conclua',
        'A reta é paralela ao plano; assim, o menor ângulo entre eles é zero grau.',
      ],
    ],
  }),
);
const batch07 = [
  ...lineParallel,
  ...linePlanePerpendicular,
  ...planeOrthogonal,
  ...pointPlaneDistances,
  ...linePlaneAngles,
];

const quadricExplanation =
  'Quádricas são superfícies descritas por equações de segundo grau em três variáveis. A forma algébrica revela a geometria: três quadrados somados descrevem uma esfera ou elipsoide, enquanto uma variável ausente indica que a curva do plano se prolonga naquela direção.';
const sphereClassification = parameters.map((n) =>
  item({
    topic: 'classificacao-de-quadricas',
    difficulty: 'easy',
    statement:
      'A equação ' +
      math('(x-' + n + ')^2+(y+1)^2+(z-2)^2=' + (n + 3) ** 2) +
      ' descreve qual superfície?',
    options: [
      'Uma esfera.',
      'Um plano.',
      'Um paraboloide elíptico.',
      'Um cilindro circular.',
    ],
    correct: 0,
    hints: [
      'Compare a equação com a distância ao quadrado de um ponto fixo.',
      'Os três termos quadráticos têm o mesmo sinal e sua soma é uma constante positiva.',
    ],
    finalAnswer: 'Uma esfera.',
    explanation: quadricExplanation,
    steps: [
      ['Reconheça o padrão', 'Há três quadrados de diferenças de coordenadas.'],
      ['Compare com a forma padrão', math('(x-a)^2+(y-b)^2+(z-c)^2=r^2.')],
      ['Conclua', 'Essa é exatamente a equação de uma esfera.'],
    ],
  }),
);
const sphereCenters = parameters.map((n) =>
  item({
    topic: 'classificacao-de-quadricas',
    difficulty: 'medium',
    statement:
      'Determine o centro da esfera ' +
      math('(x-' + n + ')^2+(y+1)^2+(z-2)^2=9') +
      '.',
    options: [
      math(vector([n, -1, 2])),
      math(vector([-n, 1, -2])),
      math(vector([n, 1, 2])),
      math(vector([n, -1, -2])),
    ],
    correct: 0,
    hints: [
      'Na forma x menos a, a coordenada central é a.',
      'Escreva y mais 1 como y menos menos 1.',
    ],
    finalAnswer: math('C=' + vector([n, -1, 2])) + '.',
    explanation: quadricExplanation,
    steps: [
      ['Compare o termo x', math('x-' + n + ' indica a=' + n + '.')],
      ['Observe os sinais', math('y+1=y-(-1) e z-2=z-2.')],
      ['Monte o centro', math('C=' + vector([n, -1, 2]) + '.')],
    ],
  }),
);
const ellipsoidClassification = parameters.map((n) =>
  item({
    topic: 'classificacao-de-quadricas',
    difficulty: 'medium',
    statement:
      'Classifique a superfície ' +
      math(
        'x^2/' +
          (n + 1) ** 2 +
          '+y^2/' +
          (n + 2) ** 2 +
          '+z^2/' +
          (n + 3) ** 2 +
          '=1',
      ) +
      '.',
    options: [
      'Um elipsoide.',
      'Um cone duplo.',
      'Um hiperboloide de uma folha.',
      'Um cilindro elíptico.',
    ],
    correct: 0,
    hints: [
      'As três variáveis aparecem ao quadrado com sinal positivo.',
      'Não há variável ausente e o lado direito é 1.',
    ],
    finalAnswer: 'Um elipsoide.',
    explanation: quadricExplanation,
    steps: [
      ['Observe os sinais', 'Os três termos quadráticos são positivos.'],
      [
        'Observe as variáveis',
        'x, y e z aparecem; portanto, a superfície não se prolonga como um cilindro.',
      ],
      [
        'Classifique',
        'A soma de três quadrados normalizados igual a 1 define um elipsoide.',
      ],
    ],
  }),
);
const cylinderAxes = parameters.map((n) =>
  item({
    topic: 'classificacao-de-quadricas',
    difficulty: 'easy',
    statement:
      'Qual é o eixo do cilindro dado por ' +
      math('x^2+y^2=' + (n + 2) ** 2) +
      '?',
    options: ['O eixo z.', 'O eixo x.', 'O eixo y.', 'A reta x igual a y.'],
    correct: 0,
    hints: [
      'Identifique qual coordenada não aparece na equação.',
      'A curva x ao quadrado mais y ao quadrado constante é um círculo em cada altura z.',
    ],
    finalAnswer: 'O eixo z.',
    explanation: quadricExplanation,
    steps: [
      ['Localize a variável ausente', 'A coordenada z não ocorre na equação.'],
      [
        'Interprete uma seção',
        'Para cada valor de z, x e y formam o mesmo círculo.',
      ],
      ['Conclua', 'Os círculos se empilham paralelamente ao eixo z.'],
    ],
  }),
);
const paraboloidClassification = parameters.map((n) =>
  item({
    topic: 'classificacao-de-quadricas',
    difficulty: 'hard',
    statement:
      'Classifique a superfície ' +
      math('z=x^2/' + (n + 1) + '+y^2/' + (n + 2)) +
      '.',
    options: [
      'Um paraboloide elíptico aberto para cima.',
      'Um hiperboloide de duas folhas.',
      'Um plano inclinado.',
      'Uma esfera.',
    ],
    correct: 0,
    hints: [
      'A variável z aparece de primeiro grau isolada.',
      'Os termos x ao quadrado e y ao quadrado são não negativos.',
    ],
    finalAnswer: 'Um paraboloide elíptico aberto para cima.',
    explanation: quadricExplanation,
    steps: [
      [
        'Examine os quadrados',
        'As parcelas que dependem de x e y nunca são negativas.',
      ],
      ['Encontre o vértice', math('x=0 e y=0 fornecem z=0.')],
      [
        'Conclua',
        'As seções horizontais crescem como elipses; a superfície abre no sentido positivo de z.',
      ],
    ],
  }),
);
const batch08 = [
  ...sphereClassification,
  ...sphereCenters,
  ...ellipsoidClassification,
  ...cylinderAxes,
  ...paraboloidClassification,
];

export function createVectorBatch(number) {
  if (number === '08') return batch08;
  if (number === '07') return batch07;
  if (number === '06') return batch06;
  if (number === '05') return batch05;
  if (number === '04') return batch04;
  if (number === '03') return batch03;
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
