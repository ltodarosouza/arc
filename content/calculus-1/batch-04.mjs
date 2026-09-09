const slash = String.fromCharCode(92);
const math = (value) => '$' + value + '$';
const values = Array.from({ length: 10 }, (_, index) => index + 1);
const item = (value) => ({
  ...value,
  source: 'Arc original Cálculo I — lote 04',
  subjectId: '20000000-0000-4000-8000-000000000004',
});

const derivativeExplanation =
  'A derivada mede a taxa de variação instantânea. Em vez de apenas memorizar uma regra, é útil separar a expressão em partes, aplicar a regra apropriada e só então substituir o valor pedido. Essa ordem reduz erros de sinal e deixa claro o significado de cada etapa.';
const polynomialRates = values.map((n) =>
  item({
    topic: 'taxa-de-variacao-e-derivada',
    difficulty: 'easy',
    statement:
      'Se ' +
      math('f(x)=x^2+' + n + 'x') +
      ', qual é o valor de ' +
      math('f^{\prime}(1)') +
      '?',
    options: [
      math(String(n + 2)),
      math(String(n + 1)),
      math(String(3 * n + 1)),
      math(String(5 * n + 9)),
    ],
    correct: 0,
    hints: [
      'Derive cada parcela do polinômio separadamente.',
      'Depois de derivar, substitua x igual a 1.',
    ],
    finalAnswer: math('f^{\prime}(1)=' + (n + 2)) + '.',
    explanation: derivativeExplanation,
    steps: [
      ['Derive a potência', math('(x^2)^{\prime}=2x.')],
      ['Derive o termo linear', math('(' + n + 'x)^{\prime}=' + n + '.')],
      ['Avalie em 1', math('f^{\prime}(1)=2+' + n + '=' + (n + 2) + '.')],
    ],
  }),
);

const chainRule = values.map((n) =>
  item({
    topic: 'regra-da-cadeia',
    difficulty: 'medium',
    statement: 'Calcule a derivada de ' + math('g(x)=(x^2+' + n + ')^3') + '.',
    options: [
      math('6x(x^2+' + n + ')^2'),
      math('3(x^2+' + n + ')^2'),
      math('6x(x^2+' + n + ')^3'),
      math('2x(x^2+' + n + ')^2'),
    ],
    correct: 0,
    hints: [
      'Há uma função externa, o cubo, aplicada a uma função interna.',
      'Multiplique a derivada da parte externa pela derivada de x ao quadrado mais n.',
    ],
    finalAnswer: math('g^{\prime}(x)=6x(x^2+' + n + ')^2') + '.',
    explanation: derivativeExplanation,
    steps: [
      ['Defina a parte interna', math('u=x^2+' + n + '.')],
      ['Derive a parte externa', math('(u^3)^{\prime}=3u^2.')],
      [
        'Multiplique por u linha',
        math(
          'g^{\prime}(x)=3(x^2+' +
            n +
            ')^2' +
            slash +
            'cdot 2x=6x(x^2+' +
            n +
            ')^2.',
        ),
      ],
    ],
  }),
);

const maxima = values.map((n) =>
  item({
    topic: 'extremos-e-valor-medio',
    difficulty: 'medium',
    statement:
      'Para ' +
      math('f(x)=-x^2+' + 2 * n + 'x') +
      ', em qual x ocorre o máximo global?',
    options: [math('x=' + n), math('x=' + 2 * n), math('x=-' + n), math('x=0')],
    correct: 0,
    hints: [
      'Uma parábola com coeficiente negativo em x ao quadrado abre para baixo.',
      'Encontre o ponto em que a derivada se anula.',
    ],
    finalAnswer: math('x=' + n) + '.',
    explanation:
      'Uma função quadrática com coeficiente principal negativo tem concavidade voltada para baixo; por isso, seu único ponto crítico é um máximo global. A derivada permite localizar esse ponto sem depender de um esboço do gráfico e confirma onde a taxa de variação muda de positiva para negativa.',
    steps: [
      ['Derive', math('f^{\prime}(x)=-2x+' + 2 * n + '.')],
      [
        'Encontre o crítico',
        math('-2x+' + 2 * n + '=0 Rightarrow x=' + n + '.'),
      ],
      [
        'Classifique',
        math('f^{\prime\prime}(x)=-2<0,') + ' portanto é máximo.',
      ],
    ],
  }),
);

const lhopital = values.map((n) =>
  item({
    topic: 'regra-de-lhopital',
    difficulty: 'medium',
    statement:
      'Calcule ' +
      math(
        slash +
          'lim_{x' +
          slash +
          'to 0}' +
          slash +
          'frac{' +
          slash +
          'sin(' +
          n +
          'x)}{x}',
      ) +
      '.',
    options: [
      math(String(n)),
      math(String(n + 2)),
      math('-' + n),
      math(String(n ** 2 + 1)),
    ],
    correct: 0,
    hints: [
      'Ao substituir x igual a zero, aparece a forma indeterminada zero sobre zero.',
      'Derive numerador e denominador uma vez.',
    ],
    finalAnswer: math(String(n)) + '.',
    explanation:
      'A regra de L’Hôpital só pode ser usada depois de confirmar uma forma indeterminada adequada. Aqui, seno de zero e zero no denominador produzem zero sobre zero. Derivar os dois lados da fração transforma o limite em uma avaliação direta, pois a nova razão deixa de ser indeterminada.',
    steps: [
      ['Teste a substituição', math('' + slash + 'sin(0)/0=0/0.')],
      [
        'Derive numerador e denominador',
        math(
          '(' +
            slash +
            'sin(' +
            n +
            'x))^{\prime}=' +
            n +
            slash +
            'cos(' +
            n +
            'x) e (x)^{\prime}=1.',
        ),
      ],
      ['Avalie o novo limite', math(n + slash + 'cos(0)=' + n + '.')],
    ],
  }),
);

const newtonSteps = values.map((n) => {
  const start = n + 1;
  const radicand = n ** 2 + n;
  const next = (start + radicand / start) / 2;
  return item({
    topic: 'metodo-de-newton',
    difficulty: 'hard',
    statement:
      'Use uma iteração do método de Newton para aproximar uma raiz de ' +
      math('f(x)=x^2-' + radicand) +
      ', partindo de ' +
      math('x_0=' + start) +
      '. Qual é ' +
      math('x_1') +
      '?',
    options: [
      math(slash + 'frac{' + (start ** 2 + radicand) + '}{' + 2 * start + '}'),
      math(String(start)),
      math(String(n)),
      math(slash + 'frac{' + radicand + '}{' + start + '}'),
    ],
    correct: 0,
    hints: [
      'A fórmula é x próximo igual a x menos f de x dividido por f linha de x.',
      'Para x ao quadrado menos uma constante, a derivada é 2x.',
    ],
    finalAnswer:
      math(
        'x_1=' +
          slash +
          'frac{' +
          (start ** 2 + radicand) +
          '}{' +
          2 * start +
          '}',
      ) + '.',
    explanation:
      'O método de Newton troca a curva por sua reta tangente no palpite atual e usa o ponto em que essa tangente encontra o eixo horizontal como novo palpite. Para uma função quadrática simples, a substituição na fórmula pode ser organizada como a média entre o palpite atual e a constante dividida por ele.',
    steps: [
      ['Derive', math('f^{\prime}(x)=2x.')],
      [
        'Aplique Newton',
        math(
          'x_1=' +
            start +
            '-' +
            slash +
            'frac{' +
            start ** 2 +
            '-' +
            radicand +
            '}{2' +
            slash +
            'cdot ' +
            start +
            '}.',
        ),
      ],
      [
        'Simplifique',
        math(
          'x_1=' +
            slash +
            'frac{' +
            (start ** 2 + radicand) +
            '}{' +
            2 * start +
            '}.',
        ),
      ],
    ],
  });
});

export default [
  ...polynomialRates,
  ...chainRule,
  ...maxima,
  ...lhopital,
  ...newtonSteps,
];
