const slash = String.fromCharCode(92);
const math = (value) => '$' + value + '$';
const item = (value) => ({
  ...value,
  source: 'Arc original Cálculo I — lote 03',
  subjectId: '20000000-0000-4000-8000-000000000004',
});

const continuity = [1, 2, 3, 4, 5].map((a) =>
  item({
    topic: 'continuidade',
    difficulty: 'easy',
    statement:
      'Considere ' +
      math('f(x)=x^2') +
      ' se ' +
      math('x' + slash + 'ne' + a) +
      ' e ' +
      math('f(' + a + ')=k') +
      '. Qual valor de k torna f contínua em ' +
      math('x=' + a) +
      '?',
    options: [
      math(String(a ** 2)),
      math(String(a ** 2 + 1)),
      math('0'),
      math(String(3 * a + 2)),
    ],
    correct: 0,
    hints: [
      'Em uma função contínua, o valor no ponto coincide com o limite.',
      'Calcule o limite do polinômio quando x se aproxima do ponto.',
    ],
    finalAnswer: math('k=' + a ** 2) + '.',
    explanation:
      'A continuidade exige que o valor atribuído no ponto seja igual ao valor para o qual a expressão se aproxima pelas duas direções. Como polinômios são contínuos, basta avaliar a expressão x ao quadrado no ponto indicado.',
    steps: [
      [
        'Calcule o limite',
        math(slash + 'lim_{x' + slash + 'to' + a + '}x^2=' + a ** 2 + '.'),
      ],
      [
        'Use a continuidade',
        math('f(' + a + ')=' + slash + 'lim_{x' + slash + 'to' + a + '}f(x).'),
      ],
      ['Defina k', math('k=' + a ** 2 + '.')],
    ],
  }),
);

const logarithms = [1, 2, 3, 4, 5].map((a) =>
  item({
    topic: 'funcoes-inversas-e-logaritmicas',
    difficulty: 'easy',
    statement:
      'Qual é o domínio real de ' +
      math('f(x)=' + slash + 'ln(x-' + a + ')') +
      '?',
    options: [
      math('x>' + a),
      math('x' + slash + 'ge' + a),
      math('x<' + a),
      'Todos os reais',
    ],
    correct: 0,
    hints: [
      'O argumento de um logaritmo real deve ser estritamente positivo.',
      'Imponha que x menos a seja maior do que zero.',
    ],
    finalAnswer: math('(' + a + ',' + slash + 'infty)') + '.',
    explanation:
      'O logaritmo natural não está definido nos reais para zero ou valores negativos. Por isso, procuramos as entradas que tornam seu argumento positivo e não incluímos o ponto que faria o argumento se anular.',
    steps: [
      ['Imponha a condição', math('x-' + a + '>0.')],
      ['Isole a variável', math('x>' + a + '.')],
      ['Escreva o domínio', math('(' + a + ',' + slash + 'infty).')],
    ],
  }),
);

const quotients = [
  [1, 3],
  [2, 5],
  [4, 1],
  [3, 7],
  [5, 2],
].map(([a, b]) => {
  const difference = b - a;
  const denominator = '(x+' + b + ')^2';
  return item({
    topic: 'produto-e-quociente',
    difficulty: 'medium',
    statement:
      'Calcule a derivada de ' +
      math('f(x)=' + slash + 'frac{x+' + a + '}{x+' + b + '}') +
      '.',
    options: [
      math(slash + 'frac{' + difference + '}{' + denominator + '}'),
      math(slash + 'frac{1}{x+' + b + '}'),
      math(slash + 'frac{' + (a - b) + '}{' + denominator + '}'),
      math(slash + 'frac{x+' + a + '}{' + denominator + '}'),
    ],
    correct: 0,
    hints: [
      'Use a regra do quociente: derivada do numerador vezes denominador, menos numerador vezes derivada do denominador.',
      'As duas expressões lineares têm derivada igual a 1.',
    ],
    finalAnswer: math(
      'f^{\\prime}(x)=' +
        slash +
        'frac{' +
        difference +
        '}{' +
        denominator +
        '}.',
    ),
    explanation:
      'A regra do quociente exige atenção à ordem da subtração. Neste caso, as derivadas das duas expressões lineares são iguais a 1, então os termos com x se cancelam e resta apenas a diferença entre as constantes.',
    steps: [
      [
        'Nomeie as partes',
        math('u=x+' + a + ', v=x+' + b + ' e u^{\\prime}=v^{\\prime}=1.'),
      ],
      [
        'Aplique a regra',
        math(
          'f^{\\prime}(x)=' +
            slash +
            'frac{(x+' +
            b +
            ')-(x+' +
            a +
            ')}{(x+' +
            b +
            ')^2}.',
        ),
      ],
      [
        'Simplifique',
        math(
          'f^{\\prime}(x)=' +
            slash +
            'frac{' +
            difference +
            '}{' +
            denominator +
            '}.',
        ),
      ],
    ],
  });
});

const rates = [
  [2, 3],
  [3, 2],
  [4, 5],
  [5, 2],
  [6, 4],
].map(([side, velocity]) =>
  item({
    topic: 'taxas-relacionadas-e-aproximacoes',
    difficulty: 'medium',
    statement:
      'A área de um quadrado é ' +
      math('A=s^2') +
      '. Quando ' +
      math('s=' + side) +
      ' cm e o lado cresce a ' +
      velocity +
      ' cm/s, qual é ' +
      math('dA/dt') +
      '?',
    options: [
      math(String(2 * side * velocity)) + ' cm²/s',
      math(String(side * velocity)) + ' cm²/s',
      math(String(2 * side + velocity + 1)) + ' cm²/s',
      math(String(velocity ** 2)) + ' cm²/s',
    ],
    correct: 0,
    hints: [
      'Área e lado mudam com o tempo, então diferencie ambos em relação a t.',
      'A regra da cadeia conecta a velocidade do lado à velocidade da área.',
    ],
    finalAnswer: math('dA/dt=' + 2 * side * velocity) + ' cm²/s.',
    explanation:
      'Em uma taxa relacionada, primeiro derivamos a relação geométrica em relação ao tempo. Só então inserimos os valores do instante observado. Isso preserva a relação entre a velocidade de crescimento do lado e a velocidade de crescimento da área.',
    steps: [
      [
        'Derive no tempo',
        math(slash + 'frac{dA}{dt}=2s' + slash + 'frac{ds}{dt}.'),
      ],
      [
        'Substitua o instante',
        math('s=' + side + ' e ' + slash + 'frac{ds}{dt}=' + velocity + '.'),
      ],
      [
        'Calcule',
        math(
          slash +
            'frac{dA}{dt}=2' +
            slash +
            'cdot' +
            side +
            slash +
            'cdot' +
            velocity +
            '=' +
            2 * side * velocity +
            '.',
        ),
      ],
    ],
  }),
);

const extrema = [1, 2, 3, 4, 5].map((a) =>
  item({
    topic: 'extremos-e-valor-medio',
    difficulty: 'medium',
    statement:
      'Para ' +
      math('f(x)=x^3-3(' + a + '^2)x') +
      ', em qual valor de x há máximo local?',
    options: [
      math('x=-' + a),
      math('x=' + a),
      math('x=0'),
      math('x=-' + (a + 2)),
    ],
    correct: 0,
    hints: [
      'Encontre os pontos em que a derivada se anula.',
      'A segunda derivada negativa caracteriza um máximo local.',
    ],
    finalAnswer: math('x=-' + a) + '.',
    explanation:
      'Os pontos críticos localizam candidatos a extremos, mas ainda precisam ser classificados. A segunda derivada informa a concavidade: negativa significa que o gráfico se curva para baixo, que é a característica de um máximo local.',
    steps: [
      ['Derive', math('f^{\\prime}(x)=3(x-' + a + ')(x+' + a + ').')],
      [
        'Encontre candidatos',
        math(
          'f^{\\prime}(x)=0' +
            slash +
            'Rightarrow x=-' +
            a +
            ' ou x=' +
            a +
            '.',
        ),
      ],
      [
        'Classifique',
        math('f^{\\prime\\prime}(x)=6x<0') + ' em ' + math('x=-' + a + '.'),
      ],
    ],
  }),
);

const graphs = [1, 2, 3, 4, 5].map((a) =>
  item({
    topic: 'analise-de-graficos',
    difficulty: 'easy',
    statement:
      'Se ' +
      math('f^{\\prime}(x)>0') +
      ' no intervalo ' +
      math('(' + a + ',' + (a + 2) + ')') +
      ', como f se comporta nele?',
    options: [
      'É crescente.',
      'É decrescente.',
      'É constante.',
      'Tem necessariamente máximo.',
    ],
    correct: 0,
    hints: [
      'A derivada mede a inclinação instantânea.',
      'Inclinações positivas fazem o gráfico subir da esquerda para a direita.',
    ],
    finalAnswer: 'A função é crescente no intervalo.',
    explanation:
      'O sinal positivo da derivada em todos os pontos de um intervalo informa que cada reta tangente aponta para cima quando x aumenta. Isso garante crescimento; não determina, por si só, a existência de um máximo local.',
    steps: [
      ['Leia o sinal', math('f^{\\prime}(x)>0') + ' no intervalo inteiro.'],
      [
        'Interprete',
        'Inclinação positiva corresponde a aumento dos valores de f.',
      ],
      ['Conclua', 'A função é crescente.'],
    ],
  }),
);

const primitives = [
  [2, 3],
  [3, 2],
  [4, 4],
  [5, 3],
  [6, 2],
].map(([coefficient, power]) => {
  const exponent = power + 1;
  const factor = coefficient / exponent;
  return item({
    topic: 'primitivas',
    difficulty: 'easy',
    statement:
      'Encontre uma primitiva de ' + math(coefficient + 'x^' + power) + '.',
    options: [
      math(factor + 'x^' + exponent + '+C'),
      math(coefficient * power + 'x^' + (power - 1) + '+C'),
      math(coefficient + 'x^' + exponent + '+C'),
      math(factor + 'x^' + power + '+C'),
    ],
    correct: 0,
    hints: [
      'Na integração da potência, aumente o expoente em uma unidade.',
      'Divida o coeficiente pelo novo expoente e acrescente a constante C.',
    ],
    finalAnswer: math(factor + 'x^' + exponent + '+C') + '.',
    explanation:
      'A regra da potência para primitivas desfaz a derivação. Aumentamos o expoente e dividimos pelo novo expoente para compensar a derivada posterior. A constante C aparece porque qualquer constante desaparece quando derivada.',
    steps: [
      [
        'Aumente o expoente',
        math('x^' + power + ' ' + slash + 'mapsto x^' + exponent + '.'),
      ],
      [
        'Ajuste o coeficiente',
        math(
          slash + 'frac{' + coefficient + '}{' + exponent + '}=' + factor + '.',
        ),
      ],
      ['Inclua C', math(factor + 'x^' + exponent + '+C.')],
    ],
  });
});

const definite = [1, 2, 3, 4, 5].map((power) => {
  const result = 1 / (power + 1);
  return item({
    topic: 'integral-definida',
    difficulty: 'easy',
    statement:
      'Calcule ' +
      math(slash + 'int_0^1 x^' + power + ' ' + slash + ',dx') +
      '.',
    options: [
      math(String(result)),
      math(String(power + 2)),
      math('1'),
      math('0'),
    ],
    correct: 0,
    hints: [
      'Encontre uma primitiva pela regra da potência.',
      'Avalie a primitiva no limite superior menos o limite inferior.',
    ],
    finalAnswer: math(slash + 'frac{1}{' + (power + 1) + '}.'),
    explanation:
      'Uma integral definida é a diferença entre os valores de uma primitiva nos dois limites. Aqui, o valor no limite inferior é zero, e o valor no limite superior deixa apenas a fração indicada.',
    steps: [
      [
        'Integre',
        math(
          slash +
            'int x^' +
            power +
            ' ' +
            slash +
            ',dx=' +
            slash +
            'frac{x^' +
            (power + 1) +
            '}{' +
            (power + 1) +
            '}+C.',
        ),
      ],
      [
        'Avalie os limites',
        math(
          slash +
            'left.' +
            slash +
            'frac{x^' +
            (power + 1) +
            '}{' +
            (power + 1) +
            '}' +
            slash +
            'right|_0^1.',
        ),
      ],
      ['Simplifique', math(slash + 'frac{1}{' + (power + 1) + '}.')],
    ],
  });
});

const theorem = [1, 2, 3, 4, 5].map((power) =>
  item({
    topic: 'teorema-fundamental-do-calculo',
    difficulty: 'easy',
    statement:
      'Se ' +
      math('F(x)=' + slash + 'int_0^x t^' + power + ' ' + slash + ',dt') +
      ', qual é ' +
      math('F^{\\prime}(x)') +
      '?',
    options: [
      math('x^' + power),
      math(power + 'x^' + (power - 1)),
      math(slash + 'frac{x^' + (power + 1) + '}{' + (power + 1) + '}'),
      math('0'),
    ],
    correct: 0,
    hints: [
      'O limite superior é a variável x.',
      'O Teorema Fundamental recupera o integrando nesse limite.',
    ],
    finalAnswer: math('F^{\\prime}(x)=x^' + power + '.'),
    explanation:
      'O Teorema Fundamental do Cálculo afirma que derivar uma integral acumulada cujo limite superior é x recupera o integrando avaliado em x. Portanto não é necessário calcular a integral antes de encontrar essa derivada.',
    steps: [
      [
        'Reconheça a acumulação',
        math('F(x)') + ' acumula a função ' + math('t^' + power + '.'),
      ],
      [
        'Aplique o teorema',
        math(
          slash +
            'frac{d}{dx}' +
            slash +
            'int_0^x t^' +
            power +
            ' ' +
            slash +
            ',dt=x^' +
            power +
            '.',
        ),
      ],
      ['Conclua', math('F^{\\prime}(x)=x^' + power + '.')],
    ],
  }),
);

const substitution = [1, 2, 3, 4, 5].map((a) =>
  item({
    topic: 'substituicao',
    difficulty: 'medium',
    statement:
      'Calcule ' +
      math(slash + 'int 2x(x^2+' + a + ')^2' + slash + ',dx') +
      '.',
    options: [
      math(slash + 'frac{(x^2+' + a + ')^3}{3}+C'),
      math('2x(x^2+' + a + ')+C'),
      math('(x^2+' + a + ')^2+C'),
      math(slash + 'frac{(x^2+' + a + ')^2}{2}+C'),
    ],
    correct: 0,
    hints: [
      'A expressão interna tem derivada igual a 2x.',
      'Troque a expressão interna por u antes de integrar.',
    ],
    finalAnswer: math(slash + 'frac{(x^2+' + a + ')^3}{3}+C.'),
    explanation:
      'A substituição é apropriada porque o fator fora do parêntese é exatamente a derivada da expressão interna. Isso transforma a integral composta em uma potência simples de u e evita aplicar regras que não se encaixam.',
    steps: [
      ['Escolha u', math('u=x^2+' + a + ' e du=2x' + slash + ',dx.')],
      ['Reescreva', math(slash + 'int u^2' + slash + ',du.')],
      [
        'Volte a x',
        math(
          slash + 'frac{u^3}{3}+C=' + slash + 'frac{(x^2+' + a + ')^3}{3}+C.',
        ),
      ],
    ],
  }),
);

export default [
  ...continuity,
  ...logarithms,
  ...quotients,
  ...rates,
  ...extrema,
  ...graphs,
  ...primitives,
  ...definite,
  ...theorem,
  ...substitution,
];
