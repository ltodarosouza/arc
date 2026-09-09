const slash = String.fromCharCode(92);
const math = (value) => '$' + value + '$';
const values = Array.from({ length: 10 }, (_, index) => index + 1);
const item = (value) => ({
  ...value,
  source: 'Arc original Cálculo I — lote 05',
  subjectId: '20000000-0000-4000-8000-000000000004',
});

const integralExplanation =
  'Uma integral não é uma receita isolada: ela desfaz uma derivada ou acumula pequenas variações. O caminho seguro é identificar a estrutura da função, escolher a regra compatível e verificar o resultado derivando-o ou comparando a área acumulada. A constante de integração só aparece quando não há limites definidos.';
const primitives = values.map((n) =>
  item({
    topic: 'primitivas',
    difficulty: 'easy',
    statement: 'Encontre uma primitiva de ' + math(n + 1 + 'x^' + n) + '.',
    options: [
      math('x^' + (n + 1) + '+C'),
      math(slash + 'frac{x^' + (n + 1) + '}{' + (n + 1) + '}+C'),
      math('x^' + n + '+C'),
      math(n + 2 + 'x^' + (n + 1) + '+C'),
    ],
    correct: 0,
    hints: [
      'Para integrar x elevado a k, aumente o expoente em uma unidade e divida pelo novo expoente.',
      'O fator n mais 1 foi escolhido para se cancelar nessa divisão.',
    ],
    finalAnswer: math('F(x)=x^' + (n + 1) + '+C') + '.',
    explanation: integralExplanation,
    steps: [
      ['Aumente o expoente', math('x^' + n + ' se torna x^' + (n + 1) + '.')],
      [
        'Divida pelo novo expoente',
        math(slash + 'int ' + (n + 1) + 'x^' + n + ' dx=x^' + (n + 1) + '+C.'),
      ],
      [
        'Verifique',
        math('(x^' + (n + 1) + ')^{\prime}=' + (n + 1) + 'x^' + n + '.'),
      ],
    ],
  }),
);

const definiteIntegrals = values.map((n) =>
  item({
    topic: 'integral-definida',
    difficulty: 'medium',
    statement:
      'Calcule ' + math(slash + 'int_0^1 ' + n + 'x^' + (n - 1) + ' dx') + '.',
    options: [math('1'), math('0'), math(String(n + 3)), math('-1')],
    correct: 0,
    hints: [
      'A integranda é a derivada de x elevado a n.',
      'Use uma primitiva e avalie primeiro no limite superior, depois no inferior.',
    ],
    finalAnswer: math('1') + '.',
    explanation: integralExplanation,
    steps: [
      [
        'Encontre a primitiva',
        math(slash + 'int ' + n + 'x^' + (n - 1) + ' dx=x^' + n + '.'),
      ],
      [
        'Aplique os limites',
        math('[x^' + n + ']_0^1=1^' + n + '-0^' + n + '.'),
      ],
      ['Conclua', math('1-0=1.')],
    ],
  }),
);

const fundamentalTheorem = values.map((n) =>
  item({
    topic: 'teorema-fundamental-do-calculo',
    difficulty: 'medium',
    statement:
      'Defina ' +
      math('A(x)=' + slash + 'int_0^x (t^2+' + n + ')dt') +
      '. Qual é ' +
      math('A^{\prime}(2)') +
      '?',
    options: [
      math(String(n + 4)),
      math(String(n + 2)),
      math('2'),
      math(String(2 * n + 4)),
    ],
    correct: 0,
    hints: [
      'O Teorema Fundamental afirma que derivar uma integral com limite superior x recupera a integranda.',
      'Depois disso, apenas substitua x igual a 2.',
    ],
    finalAnswer: math('A^{\prime}(2)=' + (n + 4)) + '.',
    explanation: integralExplanation,
    steps: [
      ['Aplique o teorema', math('A^{\prime}(x)=x^2+' + n + '.')],
      ['Avalie no ponto', math('A^{\prime}(2)=2^2+' + n + '.')],
      ['Simplifique', math('A^{\prime}(2)=' + (n + 4) + '.')],
    ],
  }),
);

const substitutions = values.map((n) =>
  item({
    topic: 'substituicao',
    difficulty: 'medium',
    statement: 'Calcule ' + math(slash + 'int 2x(x^2+' + n + ') dx') + '.',
    options: [
      math(slash + 'frac{(x^2+' + n + ')^2}{2}+C'),
      math('(x^2+' + n + ')^2+C'),
      math('x^2(x^2+' + n + ')+C'),
      math('2x(x^2+' + n + ')+C'),
    ],
    correct: 0,
    hints: [
      'Faça u igual a x ao quadrado mais n.',
      'A derivada de u é exatamente 2x dx.',
    ],
    finalAnswer: math(slash + 'frac{(x^2+' + n + ')^2}{2}+C') + '.',
    explanation: integralExplanation,
    steps: [
      ['Escolha a substituição', math('u=x^2+' + n + ' e du=2x dx.')],
      [
        'Reescreva a integral',
        math(slash + 'int u du=' + slash + 'frac{u^2}{2}+C.'),
      ],
      ['Retorne a x', math(slash + 'frac{(x^2+' + n + ')^2}{2}+C.')],
    ],
  }),
);

const rectangleOptimization = values.map((n) => {
  const side = n + 3;
  const perimeter = 4 * side;
  return item({
    topic: 'otimizacao',
    difficulty: 'hard',
    statement:
      'Um retângulo tem perímetro ' +
      perimeter +
      ' m. Qual deve ser a medida de cada lado para que sua área seja máxima?',
    options: [
      math(String(side)) + ' m',
      math(String(side + 2)) + ' m',
      math(String(n)) + ' m',
      math(String(2 * side)) + ' m',
    ],
    correct: 0,
    hints: [
      'Se os lados são x e y, então 2x mais 2y é o perímetro.',
      'A área máxima, com perímetro fixo, ocorre quando o retângulo é um quadrado.',
    ],
    finalAnswer: math('x=y=' + side) + ' m.',
    explanation:
      'A otimização começa transformando a restrição geométrica em uma função de uma variável. Com o perímetro fixo, cada aumento em um lado reduz o outro; a área se torna uma parábola côncava. Seu vértice representa a maior área possível e, neste caso, produz lados iguais.',
    steps: [
      [
        'Use o perímetro',
        math('2x+2y=' + perimeter + ' Rightarrow y=' + 2 * side + '-x.'),
      ],
      ['Escreva a área', math('A(x)=x(' + 2 * side + '-x).')],
      [
        'Localize o vértice',
        math(
          'A^{\prime}(x)=' +
            2 * side +
            '-2x=0 Rightarrow x=' +
            side +
            ', y=' +
            side +
            '.',
        ),
      ],
    ],
  });
});

export default [
  ...primitives,
  ...definiteIntegrals,
  ...fundamentalTheorem,
  ...substitutions,
  ...rectangleOptimization,
];
