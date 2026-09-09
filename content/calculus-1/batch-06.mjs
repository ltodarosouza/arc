const slash = String.fromCharCode(92);
const math = (value) => '$' + value + '$';
const values = Array.from({ length: 10 }, (_, index) => index + 1);
const item = (value) => ({
  ...value,
  source: 'Arc original Cálculo I — lote 06',
  subjectId: '20000000-0000-4000-8000-000000000004',
});
const steps = (items) => [
  ['Identifique a informação', items[0]],
  ['Escreva a condição', items[1]],
  ['Faça o cálculo', items[2]],
  ['Interprete o resultado', items[3]],
  ['Confira a restrição', items[4]],
];

const domains = values.map((n) => {
  const cutoff = n + 1;
  return item({
    topic: 'representacoes-de-funcoes',
    difficulty: n <= 3 ? 'easy' : n <= 7 ? 'medium' : 'hard',
    statement:
      'Qual é o domínio real de ' +
      math('f(x)=' + slash + 'sqrt{' + cutoff + '-x}') +
      '?',
    options: [
      math('(-' + slash + 'infty,' + cutoff + ']'),
      math('[' + cutoff + ',' + slash + 'infty)'),
      math('(-' + slash + 'infty,' + cutoff + ')'),
      math('mathbb{R}'),
    ],
    correct: 0,
    hints: [
      'O radicando de uma raiz quadrada precisa ser não negativo.',
      'Resolva a desigualdade antes de escrever o intervalo.',
    ],
    finalAnswer: math('(-' + slash + 'infty,' + cutoff + ']') + '.',
    explanation:
      'Uma raiz quadrada real só existe quando a expressão interna é maior ou igual a zero. O ponto em que o radicando zera deve ser incluído, pois a raiz de zero existe. A desigualdade determina todos os valores permitidos de x e o intervalo é a forma mais clara de registrar o domínio.',
    steps: steps([
      'A raiz quadrada é a única parte que pode restringir x.',
      math(cutoff + '-x' + slash + 'ge0') + '.',
      math('x' + slash + 'le' + cutoff) + '.',
      'Todos os números menores ou iguais a ' + cutoff + ' são aceitos.',
      math('x=' + cutoff) +
        ' produz raiz de zero e precisa permanecer no domínio.',
    ]),
  });
});

const inversesAndLogs = values.map((n) => {
  const base = n + 1;
  const isInverse = n % 2 === 1;
  return item(
    isInverse
      ? {
          topic: 'funcoes-inversas-e-logaritmicas',
          difficulty: n <= 3 ? 'easy' : 'medium',
          statement:
            'Se ' +
            math('f(x)=' + base + 'x-' + n) +
            ', qual é ' +
            math('f^{-1}(x)') +
            '?',
          options: [
            math(slash + 'frac{x+' + n + '}{' + base + '}'),
            math(slash + 'frac{x-' + n + '}{' + base + '}'),
            math(base + 'x+' + n),
            math(slash + 'frac{' + base + '}{x+' + n + '}'),
          ],
          correct: 0,
          hints: [
            'Troque f de x por y e isole x.',
            'A inversa desfaz a multiplicação por ' +
              base +
              ' e a subtração de ' +
              n +
              '.',
          ],
          finalAnswer:
            math('f^{-1}(x)=' + slash + 'frac{x+' + n + '}{' + base + '}') +
            '.',
          explanation:
            'Para encontrar uma inversa, começamos com a saída y e recuperamos a entrada x. A ordem das operações precisa ser desfeita ao contrário: primeiro somamos o termo que havia sido subtraído, depois dividimos pelo coeficiente. A fórmula final pode ser conferida compondo f com sua inversa e obtendo x.',
          steps: steps([
            math('y=' + base + 'x-' + n) + '.',
            math('y+' + n + '=' + base + 'x') + '.',
            math('x=' + slash + 'frac{y+' + n + '}{' + base + '}') + '.',
            'Troque y por x para nomear a função inversa.',
            math('f(f^{-1}(x))=x') + ' confirma a inversão.',
          ]),
        }
      : {
          topic: 'funcoes-inversas-e-logaritmicas',
          difficulty: n <= 4 ? 'easy' : 'medium',
          statement: 'Resolva, nos reais, ' + math(slash + 'ln(x)=' + n) + '.',
          options: [
            math('x=e^{' + n + '}'),
            math('x=' + n + 'e'),
            math('x=e^{- ' + n + '}'),
            math('x=' + n),
          ],
          correct: 0,
          hints: [
            'Exponencie os dois lados com base e.',
            'Lembre que o logaritmo natural só aceita entradas positivas.',
          ],
          finalAnswer: math('x=e^{' + n + '}') + '.',
          explanation:
            'O logaritmo natural e a exponencial de base e são funções inversas. Ao aplicar a exponencial aos dois lados, o logaritmo é desfeito e resta x. A solução encontrada é automaticamente positiva, portanto respeita o domínio do logaritmo e não exige descartar nenhuma raiz adicional.',
          steps: steps([
            math('ln(x)') + ' é definido somente para valores positivos de x.',
            math('e^{ln(x)}=e^{' + n + '}') + '.',
            math('x=e^{' + n + '}') + '.',
            'A exponencial desfaz o logaritmo natural.',
            math('e^{' + n + '}>0') +
              ', logo a condição de domínio é satisfeita.',
          ]),
        },
  );
});

const transformations = values.map((n) => {
  const shift = n + 1;
  return item({
    topic: 'composicao-e-transformacoes',
    difficulty: n <= 3 ? 'easy' : n <= 7 ? 'medium' : 'hard',
    statement:
      'Partindo de ' +
      math('y=x^2') +
      ', qual transformação produz ' +
      math('g(x)=(x-' + shift + ')^2+' + n) +
      '?',
    options: [
      'Deslocar ' + shift + ' unidades à direita e ' + n + ' para cima.',
      'Deslocar ' + shift + ' unidades à esquerda e ' + n + ' para cima.',
      'Deslocar ' + n + ' unidades à direita e ' + shift + ' para cima.',
      'Refletir no eixo x e deslocar para cima.',
    ],
    correct: 0,
    hints: [
      'Em f(x-a), o sinal interno desloca o gráfico para a direita.',
      'O termo somado fora da função controla o deslocamento vertical.',
    ],
    finalAnswer:
      'Deslocar ' + shift + ' unidades à direita e ' + n + ' para cima.',
    explanation:
      'Transformações horizontais agem dentro do argumento da função e têm sinal aparentemente invertido: x menos a desloca o gráfico a unidades para a direita. Transformações verticais aparecem fora da função e mantêm o sinal usual. Separar essas duas leituras evita confundir o deslocamento do vértice da parábola.',
    steps: steps([
      math('g(x)=(x-' + shift + ')^2+' + n) + ' vem de uma parábola padrão.',
      math('x-' + shift) + ' controla a posição horizontal.',
      'O vértice muda de ' +
        math('(0,0)') +
        ' para ' +
        math('(' + shift + ',' + n + ')') +
        '.',
      'Isso equivale a mover para a direita e depois para cima.',
      'A abertura continua para cima, pois o coeficiente quadrático é positivo.',
    ]),
  });
});

const limits = values.map((n) => {
  const a = n + 1;
  return item({
    topic: 'calculo-de-limites',
    difficulty: n <= 3 ? 'easy' : n <= 7 ? 'medium' : 'hard',
    statement:
      'Calcule ' +
      math(
        slash +
          'lim_{x' +
          slash +
          'to' +
          a +
          '}' +
          slash +
          'frac{x^2-' +
          a ** 2 +
          '}{x-' +
          a +
          '}',
      ) +
      '.',
    options: [
      math(String(2 * a)),
      math(String(a)),
      math(String(a ** 2 + 1)),
      'Não existe.',
    ],
    correct: 0,
    hints: [
      'A substituição direta produz a forma indeterminada zero sobre zero.',
      'Fatore diferença de quadrados e simplifique antes de tomar o limite.',
    ],
    finalAnswer: math(String(2 * a)) + '.',
    explanation:
      'A forma zero sobre zero não é uma resposta: ela sinaliza que a expressão deve ser reorganizada. A diferença de quadrados revela um fator x menos a que pode ser cancelado fora do ponto problemático. Depois da simplificação, a função restante é contínua e pode ser avaliada diretamente no ponto de aproximação.',
    steps: steps([
      'Substituir ' + a + ' inicialmente gera zero sobre zero.',
      math('x^2-' + a ** 2 + '=(x-' + a + ')(x+' + a + ')') + '.',
      math(
        slash +
          'frac{x^2-' +
          a ** 2 +
          '}{x-' +
          a +
          '}=x+' +
          a +
          ',\;x' +
          slash +
          'ne' +
          a,
      ) + '.',
      math('lim_{x' + slash + 'to' + a + '}(x+' + a + ')=' + 2 * a) + '.',
      'O cancelamento vale perto do ponto, exatamente o que o limite exige.',
    ]),
  });
});

const continuity = values.map((n) => {
  const a = n + 1;
  const right = 2 * a;
  return item({
    topic: 'continuidade',
    difficulty: n <= 3 ? 'easy' : n <= 7 ? 'medium' : 'hard',
    statement:
      'Para qual valor de ' +
      math('c') +
      ' a função ' +
      math(
        'f(x)=' +
          slash +
          'begin{cases}x+' +
          a +
          ',&x<' +
          a +
          slash +
          slash +
          'c,&x' +
          slash +
          'ge' +
          a +
          slash +
          'end{cases}',
      ) +
      ' é contínua em ' +
      math('x=' + a) +
      '?',
    options: [
      math(String(right)),
      math(String(a)),
      math(String(right + 1)),
      math('0'),
    ],
    correct: 0,
    hints: [
      'Para haver continuidade, o limite pela esquerda deve coincidir com o valor da função.',
      'A expressão da esquerda vale x mais ' + a + '.',
    ],
    finalAnswer: math('c=' + right) + '.',
    explanation:
      'Em uma função definida por partes, a continuidade no ponto de troca depende de três valores compatíveis: limite pela esquerda, limite pela direita e valor da função. Como o lado direito é constante c, basta escolher c igual ao valor que a expressão da esquerda se aproxima quando x tende ao ponto de corte.',
    steps: steps([
      'O possível salto ocorre no ponto ' + math('x=' + a) + '.',
      math('lim_{x' + slash + 'to' + a + '^-}(x+' + a + ')=' + a + '+' + a) +
        '.',
      math('lim_{x' + slash + 'to' + a + '^-}f(x)=' + right) + '.',
      'O valor do lado direito é ' + math('f(' + a + ')=c') + '.',
      math('c=' + right) + ' iguala limite e valor da função.',
    ]),
  });
});

export default [
  ...domains,
  ...inversesAndLogs,
  ...transformations,
  ...limits,
  ...continuity,
];
