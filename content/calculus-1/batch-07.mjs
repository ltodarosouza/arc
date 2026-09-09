const slash = String.fromCharCode(92);
const math = (value) => '$' + value + '$';
const values = Array.from({ length: 10 }, (_, index) => index + 1);
const item = (value) => ({
  ...value,
  source: 'Arc original Cálculo I — lote 07',
  subjectId: '20000000-0000-4000-8000-000000000004',
});
const steps = (items) => [
  ['Observe a estrutura', items[0]],
  ['Escolha a regra', items[1]],
  ['Calcule', items[2]],
  ['Interprete', items[3]],
  ['Confira', items[4]],
];

const rates = values.map((n) =>
  item({
    topic: 'taxa-de-variacao-e-derivada',
    difficulty: n <= 3 ? 'easy' : n <= 7 ? 'medium' : 'hard',
    statement:
      'A posição de uma partícula é ' +
      math('s(t)=' + n + 't^2-3t') +
      '. Qual é sua velocidade em ' +
      math('t=2') +
      '?',
    options: [
      math(String(4 * n - 3)),
      math(String(2 * n - 3)),
      math(String(4 * n)),
      math(String(n - 3)),
    ],
    correct: 0,
    hints: [
      'Velocidade instantânea é a derivada da posição.',
      'Derive antes de substituir o instante.',
    ],
    finalAnswer: math('v(2)=' + (4 * n - 3)) + '.',
    explanation:
      'A derivada transforma a posição em velocidade porque mede a variação instantânea no tempo. O termo quadrático gera uma expressão linear e o termo linear contribui com uma constante negativa. Só depois de obter a regra geral de velocidade substituímos o instante pedido; isso evita usar uma taxa média por engano.',
    steps: steps([
      math('v(t)=s^{\prime}(t)'),
      math('s^{\prime}(t)=' + 2 * n + 't-3'),
      math('v(2)=' + 2 * n + slash + 'cdot2-3'),
      math('v(2)=' + (4 * n - 3)),
      'A resposta usa unidades de posição por unidade de tempo.',
    ]),
  }),
);

const basicDerivatives = values.map((n) =>
  item({
    topic: 'regras-basicas-de-derivacao',
    difficulty: n <= 3 ? 'easy' : n <= 7 ? 'medium' : 'hard',
    statement:
      'Calcule a derivada de ' +
      math('f(x)=' + n + 'x^{' + (n + 1) + '}') +
      '.',
    options: [
      math(n * (n + 1) + 'x^' + n),
      math(n + 'x^' + n),
      math(n * (n + 1) + 'x^' + (n + 1)),
      math(n + 2 + 'x^' + n),
    ],
    correct: 0,
    hints: [
      'Use a regra da potência.',
      'O coeficiente original continua multiplicando o resultado.',
    ],
    finalAnswer: math('f^{\prime}(x)=' + n * (n + 1) + 'x^' + n) + '.',
    explanation:
      'A regra da potência multiplica o coeficiente pelo expoente e reduz esse expoente em uma unidade. Como a função tem um coeficiente externo, ele participa da multiplicação. É importante reduzir somente o expoente de x: alterar a potência sem ajustar o coeficiente produz um resultado que não devolve a função original ao ser integrado.',
    steps: steps([
      math('f(x)=' + n + 'x^{' + (n + 1) + '}'),
      'O expoente é ' + n + 1 + '.',
      math('f^{\prime}(x)=' + n + slash + 'cdot' + (n + 1) + 'x^' + n),
      math('f^{\prime}(x)=' + n * (n + 1) + 'x^' + n),
      'A potência caiu de ' + (n + 1) + ' para ' + n + '.',
    ]),
  }),
);

const products = values.map((n) =>
  item({
    topic: 'produto-e-quociente',
    difficulty: n <= 3 ? 'easy' : n <= 7 ? 'medium' : 'hard',
    statement:
      'Se ' +
      math('f(x)=x(x+' + n + ')') +
      ', qual é ' +
      math('f^{\prime}(x)') +
      '?',
    options: [math('2x+' + n), math('x+' + n), math('2x'), math('x^2+' + n)],
    correct: 0,
    hints: [
      'Você pode expandir o produto ou aplicar a regra do produto.',
      'A derivada de x é 1.',
    ],
    finalAnswer: math('f^{\prime}(x)=2x+' + n) + '.',
    explanation:
      'A regra do produto considera a variação dos dois fatores, por isso não basta derivar apenas um deles. Também é possível expandir primeiro e derivar termo a termo. As duas rotas chegam ao mesmo resultado e servem como verificação uma da outra; essa dupla leitura é útil para evitar esquecer uma parcela da derivada.',
    steps: steps([
      math('f(x)=x^2+' + n + 'x'),
      'Use a regra da potência em cada termo.',
      math('f^{\prime}(x)=2x+' + n),
      'A expressão é uma função linear.',
      math('1(x+' + n + ')+x(1)=2x+' + n) + ' confirma a regra do produto.',
    ]),
  }),
);

const extrema = values.map((n) => {
  const a = n + 1;
  return item({
    topic: n % 2 ? 'extremos-e-valor-medio' : 'otimizacao',
    difficulty: n <= 3 ? 'easy' : n <= 7 ? 'medium' : 'hard',
    statement:
      'Em qual valor de ' +
      math('x') +
      ' a função ' +
      math('f(x)=-(x-' + a + ')^2+' + n) +
      ' atinge seu máximo?',
    options: [math(String(a)), math(String(n)), math(String(-a)), math('0')],
    correct: 0,
    hints: [
      'A parábola está na forma de vértice.',
      'O coeficiente negativo indica abertura para baixo.',
    ],
    finalAnswer: math('x=' + a) + '.',
    explanation:
      'Uma parábola com sinal negativo abre para baixo, então seu vértice representa o maior valor possível. A forma quadrada mostra diretamente a posição horizontal do vértice: o quadrado é mínimo quando vale zero. Assim, maximizar a função equivale a escolher o valor de x que anula o termo entre parênteses.',
    steps: steps([
      math('f(x)=-(x-' + a + ')^2+' + n),
      'O quadrado é sempre não negativo.',
      math('(x-' + a + ')^2=0'),
      math('x=' + a),
      'Com sinal negativo, afastar-se do vértice só diminui a função.',
    ]),
  });
});

const graphAnalysis = values.map((n) =>
  item({
    topic: n % 2 ? 'analise-de-graficos' : 'metodo-de-newton',
    difficulty: n <= 3 ? 'easy' : n <= 7 ? 'medium' : 'hard',
    statement:
      'Para ' +
      math('f(x)=x^2-' + n ** 2) +
      ', qual ponto pertence ao gráfico e está sobre o eixo x?',
    options: [
      math('(' + n + ',0)'),
      math('(0,' + n + ')'),
      math('(' + (n ** 2 + 1) + ',0)'),
      math('(0,-' + n ** 2 + ')'),
    ],
    correct: 0,
    hints: [
      'Pontos do eixo x têm coordenada y igual a zero.',
      'Iguale a função a zero e fatorize.',
    ],
    finalAnswer: math('(' + n + ',0)') + '.',
    explanation:
      'Interseções com o eixo x são zeros da função, pois nesses pontos a altura do gráfico é zero. Ao fatorar uma diferença de quadrados, encontramos duas raízes simétricas. A alternativa pedida apresenta a raiz positiva; verificar a substituição mostra que o valor da função realmente se anula, confirmando que o ponto pertence ao gráfico.',
    steps: steps([
      'No eixo x, a coordenada vertical vale zero.',
      math('x^2-' + n ** 2 + '=0'),
      math('(x-' + n + ')(x+' + n + ')=0'),
      math('x=' + n) + ' ou ' + math('x=-' + n),
      math('f(' + n + ')=0') + ' confirma o ponto escolhido.',
    ]),
  }),
);

export default [
  ...rates,
  ...basicDerivatives,
  ...products,
  ...extrema,
  ...graphAnalysis,
];
