const tex = String.raw;

const question = (item) => ({
  ...item,
  source: 'Arc original Cálculo I — lote 02',
  subjectId: '20000000-0000-4000-8000-000000000004',
});

const domainQuestions = [
  [4, 1],
  [9, 1],
  [12, 2],
  [15, 3],
  [20, 4],
].map(([a, b]) => {
  const bound = a / b;
  return question({
    topic: 'representacoes-de-funcoes',
    difficulty: 'easy',
    statement: tex`Qual é o domínio real de $f(x)=\sqrt{${a}-${b}x}$?`,
    options: [
      tex`$x\le${bound}$`,
      tex`$x<${bound}$`,
      tex`$x\ge${bound}$`,
      'Todos os reais',
    ],
    correct: 0,
    hints: [
      'O radicando de uma raiz quadrada real deve ser não negativo.',
      tex`Resolva a desigualdade $${a}-${b}x\ge0$.`,
    ],
    finalAnswer: tex`$(-\infty,${bound}]$`,
    explanation:
      'O domínio reúne as entradas que tornam a expressão real. Em raízes quadradas, o cuidado é incluir o valor que faz o radicando ser zero: a raiz de zero existe e deve pertencer ao domínio.',
    steps: [
      ['Imponha a condição', tex`Exigimos $${a}-${b}x\ge0$.`],
      [
        'Isole a variável',
        tex`Isso equivale a $${b}x\le${a}$ e, como $${b}>0$, a $x\le${bound}$.`,
      ],
      [
        'Inclua o extremo',
        tex`Em $x=${bound}$, o radicando é zero; portanto o extremo é permitido.`,
      ],
    ],
  });
});

const compositionQuestions = [
  [2, 1, 3],
  [3, -2, 2],
  [4, 1, 2],
  [5, -3, 1],
  [2, 4, 3],
].map(([a, b, input]) => {
  const inner = input ** 2 + 1;
  const answer = a * inner + b;
  return question({
    topic: 'composicao-e-transformacoes',
    difficulty: 'easy',
    statement: tex`Se $f(x)=${a}x${b >= 0 ? '+' : ''}${b}$ e $g(x)=x^2+1$, calcule $(f\circ g)(${input})$.`,
    options: [
      tex`$${answer}$`,
      tex`$${a * input + b}$`,
      tex`$${inner}$`,
      tex`$${answer + a}$`,
    ],
    correct: 0,
    hints: [
      'Na composição indicada, a função mais próxima da entrada é aplicada primeiro.',
      tex`Comece encontrando $g(${input})$.`,
    ],
    finalAnswer: tex`$${answer}$`,
    explanation:
      'A notação de composição define uma ordem: primeiro avaliamos a função interna e depois entregamos sua saída à função externa. Trocar essa ordem é um erro comum, porque em geral as duas funções não comutam.',
    steps: [
      ['Aplique a função interna', tex`$g(${input})=${input}^2+1=${inner}$.`],
      [
        'Use esse resultado em $f$',
        tex`$f(${inner})=${a}\cdot${inner}${b >= 0 ? '+' : ''}${b}$.`,
      ],
      ['Conclua', tex`$(f\circ g)(${input})=${answer}$.`],
    ],
  });
});

const factoringLimits = [2, 3, 4, 5, 6].map((a) =>
  question({
    topic: 'calculo-de-limites',
    difficulty: 'easy',
    statement: tex`Calcule $\lim_{x\to${a}}\frac{x^2-${a ** 2}}{x-${a}}$.`,
    options: [tex`$${2 * a}$`, tex`$${a}$`, '$0$', 'O limite não existe'],
    correct: 0,
    hints: [
      'A substituição direta produz a forma indeterminada zero sobre zero.',
      tex`Use $x^2-${a ** 2}=(x-${a})(x+${a})$.`,
    ],
    finalAnswer: tex`$${2 * a}$`,
    explanation:
      'O valor da fração no ponto não é necessário para calcular o limite. Depois de fatorar e cancelar o fator que causa a indeterminação, usamos uma expressão equivalente apenas nos pontos próximos do valor procurado.',
    steps: [
      ['Fatore o numerador', tex`$x^2-${a ** 2}=(x-${a})(x+${a})$.`],
      [
        'Simplifique perto do ponto',
        tex`Para $x\ne${a}$, a fração vale $x+${a}$.`,
      ],
      ['Tome o limite', tex`Quando $x\to${a}$, temos $x+${a}\to${2 * a}$.`],
    ],
  }),
);

const conjugateLimits = [
  [1, 3],
  [4, 4],
  [5, 3],
  [7, 5],
  [8, 4],
].map(([c, d]) => {
  const point = d ** 2 - c;
  return question({
    topic: 'calculo-de-limites',
    difficulty: 'medium',
    statement: tex`Calcule $\lim_{x\to${point}}\frac{\sqrt{x+${c}}-${d}}{x-${point}}$.`,
    options: [tex`$1/${2 * d}$`, tex`$1/${d}$`, tex`$${2 * d}$`, '$0$'],
    correct: 0,
    hints: [
      'A substituição inicial dá zero sobre zero.',
      tex`Multiplique pela expressão conjugada $\sqrt{x+${c}}+${d}$.`,
    ],
    finalAnswer: tex`$1/${2 * d}$`,
    explanation:
      'A racionalização transforma a diferença de raízes em uma diferença de quadrados. Assim aparece o fator do denominador, que pode ser cancelado antes de avaliarmos a tendência no ponto.',
    steps: [
      [
        'Use o conjugado',
        tex`Multiplique numerador e denominador por $\sqrt{x+${c}}+${d}$.`,
      ],
      ['Simplifique o numerador', tex`$(x+${c})-${d ** 2}=x-${point}$.`],
      [
        'Cancele e avalie',
        tex`Resta $1/(\sqrt{x+${c}}+${d})$, cujo limite é $1/${2 * d}$.`,
      ],
    ],
  });
});

const polynomialDerivatives = [
  [3, 4, -2, 5],
  [2, 5, 3, -1],
  [4, 3, -5, 2],
  [5, 2, 4, -7],
  [6, 3, -1, 4],
].map(([coefficient, power, linear, constant]) => {
  const derivative = `${coefficient * power}x^${power - 1}${linear >= 0 ? '+' : ''}${linear}`;
  return question({
    topic: 'regras-basicas-de-derivacao',
    difficulty: 'easy',
    statement: tex`Qual é a derivada de $f(x)=${coefficient}x^${power}${linear >= 0 ? '+' : ''}${linear}x${constant >= 0 ? '+' : ''}${constant}$?`,
    options: [
      tex`$${derivative}$`,
      tex`$${coefficient}x^${power - 1}${linear >= 0 ? '+' : ''}${linear}$`,
      tex`$${coefficient * power}x^${power}${linear >= 0 ? '+' : ''}${constant}$`,
      tex`$${derivative}${constant >= 0 ? '+' : ''}${constant}$`,
    ],
    correct: 0,
    hints: [
      'Derive cada parcela independentemente.',
      'Uma constante não varia quando a entrada muda.',
    ],
    finalAnswer: tex`$${derivative}$`,
    explanation:
      'A regra da potência multiplica o coeficiente pelo expoente e reduz o expoente em uma unidade. O termo linear mantém apenas seu coeficiente, enquanto o termo constante desaparece na derivada.',
    steps: [
      [
        'Derive a potência',
        tex`$(${coefficient}x^${power})^{\\prime}=${coefficient * power}x^${power - 1}$.`,
      ],
      [
        'Derive os termos restantes',
        tex`$(${linear}x)^{\\prime}=${linear}$ e $(${constant})^{\\prime}=0$.`,
      ],
      ['Reúna os termos', tex`$f^{\\prime}(x)=${derivative}$.`],
    ],
  });
});

const productDerivatives = [1, 2, 3, 4, 5].map((a) => {
  const answer = `3x^2+${2 * a}x`;
  return question({
    topic: 'produto-e-quociente',
    difficulty: 'medium',
    statement: tex`Calcule a derivada de $f(x)=x^2(x+${a})$.`,
    options: [
      tex`$${answer}$`,
      tex`$2x(x+${a})$`,
      tex`$3x^2+${a}$`,
      tex`$x^3+${a}x^2$`,
    ],
    correct: 0,
    hints: [
      'Você pode expandir o produto antes de derivar.',
      'A derivada de $x^3$ é $3x^2$.',
    ],
    finalAnswer: tex`$${answer}$`,
    explanation:
      'Expandir um produto polinomial simples deixa todas as parcelas visíveis. Esse caminho é equivalente à regra do produto e ajuda a não esquecer a variação de nenhum dos dois fatores.',
    steps: [
      ['Expanda', tex`$x^2(x+${a})=x^3+${a}x^2$.`],
      ['Derive termo a termo', tex`$(x^3+${a}x^2)^{\\prime}=3x^2+${2 * a}x$.`],
      ['Apresente a derivada', tex`$f^{\\prime}(x)=${answer}$.`],
    ],
  });
});

const chainDerivatives = [
  [2, 1, 4],
  [3, -2, 3],
  [4, 1, 5],
  [5, -3, 2],
  [2, 4, 6],
].map(([a, b, power]) => {
  const factor = a * power;
  return question({
    topic: 'regra-da-cadeia',
    difficulty: 'medium',
    statement: tex`Qual é a derivada de $f(x)=(${a}x${b >= 0 ? '+' : ''}${b})^${power}$?`,
    options: [
      tex`$${factor}(${a}x${b >= 0 ? '+' : ''}${b})^${power - 1}$`,
      tex`$${power}(${a}x${b >= 0 ? '+' : ''}${b})^${power - 1}$`,
      tex`$${factor}(${a}x${b >= 0 ? '+' : ''}${b})^${power}$`,
      tex`$(${a}x${b >= 0 ? '+' : ''}${b})^${power - 1}$`,
    ],
    correct: 0,
    hints: [
      'Há uma função externa, a potência, e uma função interna linear.',
      'Depois de derivar a potência, multiplique pela derivada da parte interna.',
    ],
    finalAnswer: tex`$${factor}(${a}x${b >= 0 ? '+' : ''}${b})^${power - 1}$`,
    explanation:
      'A regra da cadeia mede duas variações: a da potência externa e a da expressão interna. O fator da derivada interna é indispensável, mesmo quando a expressão interna parece simples.',
    steps: [
      [
        'Derive a camada externa',
        tex`A derivada de $u^${power}$ é $${power}u^${power - 1}$.`,
      ],
      [
        'Reponha a expressão',
        tex`Isso produz $${power}(${a}x${b >= 0 ? '+' : ''}${b})^${power - 1}$.`,
      ],
      [
        'Aplique a cadeia',
        tex`Como $(${a}x${b >= 0 ? '+' : ''}${b})^{\\prime}=${a}$, resulta $${factor}(${a}x${b >= 0 ? '+' : ''}${b})^${power - 1}$.`,
      ],
    ],
  });
});

const implicitDerivatives = [3, 4, 5, 6, 7].map((radius) =>
  question({
    topic: 'derivacao-implicita-e-logaritmica',
    difficulty: 'medium',
    statement: tex`Se $x^2+y^2=${radius ** 2}$, qual é $dy/dx$?`,
    options: [tex`$-x/y$`, tex`$x/y$`, tex`$-y/x$`, tex`$2x+2y$`],
    correct: 0,
    hints: [
      'Derive a igualdade inteira em relação a $x$.',
      'Ao derivar $y^2$, use a regra da cadeia.',
    ],
    finalAnswer: tex`$-x/y$`,
    explanation:
      'A equação determina pontos de uma circunferência, mas não escreve explicitamente uma única função de x. A derivação implícita preserva essa relação e introduz a taxa desconhecida de y em relação a x.',
    steps: [
      ['Derive os dois lados', tex`$2x+2y\\,y^{\\prime}=0$.`],
      ['Isole o termo com a derivada', tex`$2y\\,y^{\\prime}=-2x$.`],
      ['Divida pelos fatores', tex`$y^{\\prime}=-x/y$.`],
    ],
  }),
);

const tangentQuestions = [1, 2, 3, 4, 5].map((point) => {
  const slope = 2 * point;
  const intercept = -(point ** 2);
  return question({
    topic: 'taxa-de-variacao-e-derivada',
    difficulty: 'medium',
    statement: tex`Qual é a reta tangente a $f(x)=x^2$ em $x=${point}$?`,
    options: [
      tex`$y=${slope}x${intercept >= 0 ? '+' : ''}${intercept}$`,
      tex`$y=${point}x$`,
      tex`$y=${slope}x$`,
      tex`$y=x^2+${point}$`,
    ],
    correct: 0,
    hints: [
      'A inclinação da reta tangente é a derivada no ponto.',
      tex`O ponto de contato é $(${point},f(${point}))$.`,
    ],
    finalAnswer: tex`$y=${slope}x${intercept >= 0 ? '+' : ''}${intercept}$`,
    explanation:
      'A reta tangente precisa satisfazer duas condições simultâneas: passar pelo ponto do gráfico e possuir a inclinação instantânea naquele ponto. Usar só a derivada não basta para fixar a reta.',
    steps: [
      [
        'Encontre o ponto',
        tex`$f(${point})=${point ** 2}$, então o ponto é $(${point},${point ** 2})$.`,
      ],
      [
        'Encontre a inclinação',
        tex`$f^{\\prime}(x)=2x$ e $f^{\\prime}(${point})=${slope}$.`,
      ],
      [
        'Monte a reta',
        tex`$y-${point ** 2}=${slope}(x-${point})$, isto é, $y=${slope}x${intercept >= 0 ? '+' : ''}${intercept}$.`,
      ],
    ],
  });
});

const optimizationQuestions = [
  [10, 5],
  [12, 6],
  [14, 7],
  [16, 8],
  [18, 9],
].map(([sum, optimum]) =>
  question({
    topic: 'otimizacao',
    difficulty: 'medium',
    statement: `Dois números positivos somam ${sum}. Quais valores maximizam o produto entre eles?`,
    options: [
      `${optimum} e ${optimum}`,
      `${sum - 1} e 1`,
      `${optimum - 2} e ${optimum + 2}`,
      `${sum} e 0`,
    ],
    correct: 0,
    hints: [
      'Represente um dos números por x e o outro pela soma menos x.',
      'O produto resultante é uma parábola voltada para baixo.',
    ],
    finalAnswer: `${optimum} e ${optimum}.`,
    explanation:
      'Com soma fixa, aumentar demais um fator reduz demais o outro. A função produto é uma parábola com concavidade para baixo, e seu vértice representa o equilíbrio que produz o maior valor possível.',
    steps: [
      ['Modele o produto', tex`$P(x)=x(${sum}-x)=${sum}x-x^2$.`],
      [
        'Encontre o ponto crítico',
        tex`$P^{\\prime}(x)=${sum}-2x=0$, então $x=${optimum}$.`,
      ],
      [
        'Recupere o outro valor',
        `${sum}-${optimum}=${optimum}; como a parábola abre para baixo, esse ponto é máximo.`,
      ],
    ],
  }),
);

export default [
  ...domainQuestions,
  ...compositionQuestions,
  ...factoringLimits,
  ...conjugateLimits,
  ...polynomialDerivatives,
  ...productDerivatives,
  ...chainDerivatives,
  ...implicitDerivatives,
  ...tangentQuestions,
  ...optimizationQuestions,
];
