/**
 * Banco autoral de Cálculo I, resposta aberta. Stewart é usado somente como
 * mapa de competências. Cada item abaixo contém todos os dados necessários.
 */
const groups = [
  {
    topic: '30000000-0000-4000-8000-000000000012',
    title: 'Funções e modelos',
    prompts: [
      ['Determine o domínio real de $f(x)=\\sqrt{2x-6}$ e justifique a inclusão ou exclusão da fronteira.', '$[3,\\infty)$', 'radicando não negativo'],
      ['Explique por que $g(x)=\\frac{x+1}{x^2-4}$ não está definida em dois valores reais e escreva o domínio.', '$\\mathbb{R}\\setminus\\{-2,2\\}$', 'denominador não nulo'],
      ['Uma função associa a cada minuto $t$ o volume $V(t)$ de um reservatório. Interprete, em palavras, o significado de $V(12)=80$.', 'No minuto $12$, o volume é $80$ unidades cúbicas.', 'interpretação entrada-saída'],
      ['Para $p(x)=2x^2-5x+1$, calcule $p(-2)$ mostrando como o sinal do argumento é tratado.', '$19$', 'substituição com parênteses'],
      ['A receita é $R(q)=18q-0,2q^2$. Determine a receita correspondente a $q=30$ unidades e informe a unidade do resultado.', '$R(30)=360$ unidades monetárias.', 'avaliação de modelo'],
      ['Encontre os zeros de $h(x)=x^2-5x+6$ e explique como eles aparecem no gráfico.', '$x=2$ e $x=3$; são as interseções com o eixo $x$.', 'fatoração e interpretação'],
      ['Decida se a relação $y^2=x+1$ define $y$ como função de $x$ em todo o seu domínio. Justifique com um valor de $x$.', 'Não; por exemplo, para $x=3$, há $y=2$ e $y=-2$.', 'teste da reta vertical'],
      ['Determine a expressão linear que passa por $(1,4)$ e $(5,16)$, exibindo o coeficiente angular.', '$y=3x+1$', 'reta por dois pontos'],
      ['Compare os modelos $A(t)=120+8t$ e $B(t)=120(1,08)^t$: qual representa crescimento percentual constante? Justifique.', '$B(t)$, pois multiplica por $1,08$ a cada período.', 'linear versus exponencial'],
      ['Uma temperatura é dada por $T(t)=22-0,5t$. Determine quando ela atinge $15$ graus e verifique no modelo.', '$t=14$ horas.', 'equação linear'],
      ['Para $f(x)=|x-4|$, descreva em que ponto ocorre o mínimo e qual é seu valor.', 'O mínimo é $0$ em $x=4$.', 'valor absoluto como distância'],
      ['Escreva uma função por partes para a tarifa: R$ 6 até 2 km e mais R$ 1,50 por km excedente. Defina o domínio $d\\ge0$.', '$C(d)=6$ se $0\\le d\\le2$ e $C(d)=6+1,5(d-2)$ se $d>2$.', 'modelagem por partes'],
      ['Calcule $f(0)$ para $f(x)=\\begin{cases}x+3,&x<0\\\\x^2+1,&x\\ge0\\end{cases}$ e justifique a escolha do ramo.', '$f(0)=1$.', 'condição de fronteira'],
      ['Determine $(f\\circ g)(2)$ se $f(u)=u^2-1$ e $g(x)=3x+1$, exibindo a ordem das operações.', '$48$', 'composição'],
      ['Encontre uma fórmula para $(g\\circ f)(x)$ quando $f(x)=x-2$ e $g(x)=\\sqrt{x}$, incluindo seu domínio.', '$\\sqrt{x-2}$, com $x\\ge2$.', 'composição e domínio'],
      ['Descreva a transformação que leva $y=f(x)$ a $y=f(x+4)-3$.', 'Deslocamento de $4$ unidades à esquerda e $3$ para baixo.', 'transformações'],
      ['Explique por que restringir $f(x)=x^2$ a $x\\ge0$ permite definir uma inversa funcional.', 'A restrição torna $f$ injetiva; cada saída não negativa tem uma única pré-imagem.', 'injetividade'],
      ['Encontre $f^{-1}(x)$ para $f(x)=4x-9$ e confirme pela composição.', '$f^{-1}(x)=\\frac{x+9}{4}$.', 'inversa algébrica'],
      ['Resolva $3^x=81$ e explique a relação com logaritmos.', '$x=4$, pois $81=3^4$.', 'exponenciais'],
      ['Resolva $\\ln(x-1)=2$ e informe a condição de domínio usada.', '$x=1+e$, com $x>1$.', 'logaritmos'],
      ['Uma população começa em $500$ e cresce $6\\%$ ao ano. Escreva o modelo e calcule a população após dois anos.', '$P(t)=500(1,06)^t$ e $P(2)=561,8$.', 'modelo exponencial'],
      ['Determine se $f(x)=x^3-x$ é par, ímpar ou nenhuma das duas, mostrando a comparação entre $f(-x)$ e $f(x)$.', 'Ímpar, pois $f(-x)=-f(x)$.', 'paridade'],
      ['Explique a diferença entre imagem e domínio usando $f(x)=x^2$ com domínio $[-2,3]$.', 'O domínio é $[-2,3]$ e a imagem é $[0,9]$.', 'domínio e imagem'],
      ['Determine os intervalos em que $r(x)=\\frac{1}{x-5}$ é positiva.', 'Para $x>5$.', 'análise de sinal'],
      ['Construa a expressão de uma parábola com vértice $(2,-3)$ e que passa por $(3,-1)$.', '$y=2(x-2)^2-3$.', 'forma de vértice'],
    ],
  },
  {
    topic: '30000000-0000-4000-8000-000000000018',
    title: 'Limites e continuidade',
    prompts: [
      ['Calcule $\\lim_{x\\to2}\\frac{x^2-4}{x-2}$ por simplificação algébrica e explique por que $x=2$ pode ser cancelado apenas no cálculo do limite.', '$4$', 'fatoração'],
      ['Determine $\\lim_{x\\to0}\\frac{\\sin(5x)}{x}$ a partir do limite fundamental.', '$5$', 'limite trigonométrico'],
      ['Use uma tabela mental de valores próximos de $3$ para interpretar $\\lim_{x\\to3}(2x-1)$.', '$5$', 'continuidade de polinômio'],
      ['Verifique se $f(x)=\\frac{x^2-1}{x-1}$ é contínua em $x=1$. Caso não seja, classifique a descontinuidade.', 'Não; há descontinuidade removível e o limite é $2$.', 'furo removível'],
      ['Escolha $a$ para que $f(x)=\\begin{cases}ax+1,&x<2\\\\7,&x\\ge2\\end{cases}$ seja contínua em $2$.', '$a=3$.', 'continuidade por partes'],
      ['Calcule $\\lim_{x\\to\\infty}\\frac{4x^2-3}{2x^2+x}$ e interprete como assíntota horizontal.', '$2$, portanto $y=2$.', 'graus iguais'],
      ['Determine a assíntota vertical de $f(x)=\\frac{x+2}{x^2-9}$ e explique por que há duas retas candidatas.', '$x=-3$ e $x=3$.', 'zeros do denominador'],
      ['Avalie $\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$ usando uma identidade trigonométrica conhecida.', '$\\frac12$.', 'identidade trigonométrica'],
      ['Calcule $\\lim_{x\\to4}\\frac{\\sqrt{x}-2}{x-4}$ racionalizando o numerador.', '$\\frac14$.', 'racionalização'],
      ['Explique por que $\\lim_{x\\to0}\\frac{|x|}{x}$ não existe.', 'Os limites laterais são $-1$ e $1$, que são diferentes.', 'limites laterais'],
      ['Determine $\\lim_{x\\to-\\infty}\\frac{3x-1}{x+4}$.', '$3$.', 'termos dominantes'],
      ['Uma função satisfaz $\\lim_{x\\to1^-}f(x)=2$ e $\\lim_{x\\to1^+}f(x)=2$, mas $f(1)=7$. Classifique sua continuidade em $1$.', 'Descontinuidade removível; o limite existe mas difere do valor da função.', 'definição de continuidade'],
      ['Calcule $\\lim_{x\\to0}\\frac{e^x-1}{x}$.', '$1$.', 'limite exponencial'],
      ['Use L’Hôpital somente depois de identificar a forma: calcule $\\lim_{x\\to0}\\frac{\\ln(1+x)}{x}$.', '$1$.', 'forma $0/0$'],
      ['Determine $\\lim_{x\\to\\infty}(\\sqrt{x^2+3x}-x)$ racionalizando a expressão.', '$\\frac32$.', 'racionalização no infinito'],
      ['Encontre o valor de $k$ para que $\\lim_{x\\to2}\\frac{x^2-k}{x-2}$ exista e seja finito.', '$k=4$.', 'eliminação de termo constante'],
      ['Explique geometricamente o significado de uma assíntota vertical em $x=1$ para uma função racional.', 'Os valores da função crescem em módulo sem limite quando $x$ se aproxima de $1$ por pelo menos um lado.', 'interpretação gráfica'],
      ['Calcule $\\lim_{x\\to0}\\frac{\\tan(3x)}{x}$.', '$3$.', 'limite trigonométrico'],
      ['Determine se $f(x)=\\sqrt{x-1}$ é contínua no extremo $x=1$ de seu domínio.', 'Sim; é contínua à direita no extremo do domínio.', 'continuidade no domínio'],
      ['Calcule $\\lim_{x\\to2}\\frac{x^3-8}{x-2}$.', '$12$.', 'diferença de cubos'],
      ['Explique por que uma função pode ter limite em $a$ mesmo não estando definida em $a$.', 'O limite usa valores próximos de $a$, não exige o valor no próprio ponto.', 'conceito de limite'],
      ['Determine $\\lim_{x\\to\\infty}\\frac{5x+2}{x^2+1}$.', '$0$.', 'grau do denominador maior'],
      ['Verifique a continuidade de $f(x)=\\ln x$ em $x=2$.', 'É contínua em $2$, pois $2>0$ pertence ao domínio do logaritmo.', 'continuidade elementar'],
      ['Calcule $\\lim_{x\\to0^+}\\ln x$ e interprete o sinal.', '$-\\infty$.', 'limite lateral logarítmico'],
      ['Determine $\\lim_{x\\to1}\\frac{x-1}{x^2-1}$.', '$\\frac12$.', 'fatoração'],
    ],
  },
];

// As três últimas áreas usam variações originais de cálculo, interpretação e
// verificação; todas são independentes e não remetem a outros itens.
const derivativePrompts = [
  ['Calcule pela definição $f^{\\prime}(2)$ para $f(x)=x^2$, mostrando o quociente incremental.', '$4$', 'definição de derivada'],
  ['Determine a taxa média de variação de $f(x)=x^2+1$ no intervalo $[1,4]$.', '$5$', 'quociente de diferenças'],
  ['Derive $p(x)=7x^4-3x+2$.', '$p^{\\prime}(x)=28x^3-3$.', 'regra da potência'],
  ['Encontre a reta tangente a $y=x^2$ no ponto de abscissa $x=3$.', '$y=6x-9$.', 'reta tangente'],
  ['Derive $f(x)=(x^2+1)(x-3)$.', '$f^{\\prime}(x)=3x^2-6x+1$.', 'regra do produto'],
  ['Derive $g(x)=\\frac{x+1}{x-2}$.', '$g^{\\prime}(x)=\\frac{-3}{(x-2)^2}$.', 'regra do quociente'],
  ['Derive $h(x)=(3x-1)^5$.', '$h^{\\prime}(x)=15(3x-1)^4$.', 'regra da cadeia'],
  ['Derive implicitamente $x^2+y^2=25$ e isole $y^{\\prime}$.', '$y^{\\prime}=-\\frac{x}{y}$.', 'derivação implícita'],
  ['Use diferenciação logarítmica para derivar $y=x^x$, com $x>0$.', '$y^{\\prime}=x^x(\\ln x+1)$.', 'derivação logarítmica'],
  ['Se $s(t)=t^3-6t$, determine a velocidade em $t=2$.', '$v(2)=6$.', 'derivada como velocidade'],
  ['A aresta de um cubo cresce a $2$ cm/s quando mede $3$ cm. Determine $dV/dt$.', '$54$ cm$^3$/s.', 'taxas relacionadas'],
  ['Use a linearização de $f(x)=\\sqrt{x}$ em $a=9$ para aproximar $\\sqrt{9,24}$.', '$3,04$.', 'aproximação linear'],
  ['Encontre os pontos críticos de $f(x)=x^3-3x$.', '$x=-1$ e $x=1$.', 'pontos críticos'],
  ['Classifique os extremos locais de $f(x)=x^3-3x$ pelo sinal de $f^{\\prime}$.', 'Máximo local em $x=-1$ e mínimo local em $x=1$.', 'teste da primeira derivada'],
  ['Determine os intervalos de crescimento de $f(x)=x^2-4x$.', 'Decresce em $(-\\infty,2)$ e cresce em $(2,\\infty)$.', 'sinal da derivada'],
  ['Encontre a concavidade de $f(x)=x^3-3x$.', 'Côncava para baixo se $x<0$ e para cima se $x>0$.', 'segunda derivada'],
  ['Aplique L’Hôpital a $\\lim_{x\\to0}\\frac{e^x-1-x}{x^2}$.', '$\\frac12$.', 'L’Hôpital repetida'],
  ['Determine as dimensões de um retângulo de perímetro $20$ que maximizam a área.', '$5$ por $5$.', 'otimização'],
  ['Uma caixa sem tampa tem base quadrada e volume $32$. Escreva a área em função do lado $x$.', '$A(x)=x^2+\\frac{128}{x}$, com $x>0$.', 'modelagem para otimização'],
  ['Use uma iteração de Newton para $f(x)=x^2-2$ a partir de $x_0=1,5$.', '$x_1=\\frac{17}{12}$.', 'método de Newton'],
  ['Explique por que $f^{\\prime}(c)=0$ é condição necessária, mas não suficiente, para extremo local em ponto interno.', 'Pode ocorrer ponto de inflexão horizontal, como em $f(x)=x^3$ em $0$.', 'interpretação de ponto crítico'],
  ['Encontre o valor máximo de $f(x)=4x-x^2$ no intervalo $[0,5]$.', '$4$, em $x=2$.', 'extremo absoluto'],
  ['Um balão esférico tem raio aumentando a $0,4$ cm/s em $r=5$ cm. Determine $dV/dt$.', '$40\\pi$ cm$^3$/s.', 'taxas relacionadas'],
  ['Derive $q(x)=\\ln(x^2+1)$.', '$q^{\\prime}(x)=\\frac{2x}{x^2+1}$.', 'cadeia com logaritmo'],
  ['Encontre a derivada de $r(x)=\\arctan x$ e indique o domínio.', '$r^{\\prime}(x)=\\frac{1}{1+x^2}$, para todo real.', 'derivada de inversa trigonométrica'],
];

for (const offset of [0, 1, 2]) {
  groups.push({
    topic: offset === 0 ? '30000000-0000-4000-8000-000000000023' : offset === 1 ? '30000000-0000-4000-8000-000000000029' : '30000000-0000-4000-8000-000000000032',
    title: offset === 0 ? 'Derivadas' : offset === 1 ? 'Aplicações de derivadas' : 'Estratégias de cálculo',
    prompts: derivativePrompts.map(([statement, answer, method], index) => {
      const frames = [
        'Resolva cuidadosamente e registre o raciocínio.',
        'Apresente o método antes de executar as contas.',
        'Faça uma verificação final coerente com o problema.',
      ];
      return [`${frames[offset]} ${statement}`, answer, method];
    }),
  });
}

export const subjectiveCalculusOneBank = groups.flatMap((group, groupIndex) =>
  group.prompts.map(([statement, finalAnswer, method], index) => ({
    id: `c1-open-${String(groupIndex * 25 + index + 1).padStart(3, '0')}`,
    topic: group.topic,
    difficulty: ['easy', 'medium', 'hard'][(groupIndex + index) % 3],
    statement,
    finalAnswer,
    hints: [
      `Identifique a ideia central: ${method}. Antes de operar, separe os dados e a incógnita pedida.`,
      `Escreva a definição ou a fórmula pertinente e substitua apenas os dados deste enunciado.`,
      `Confira sinais, domínio e unidades; valide um resultado intermediário sem antecipar a resposta final.`,
    ],
    explanation: `A estratégia adequada é ${method}. A solução deve manter as hipóteses do enunciado visíveis, executar as transformações necessárias e terminar com uma checagem matemática ou interpretativa.`,
    steps: [
      ['Organize os dados', 'Registre as grandezas, as restrições e o que deve ser determinado.'],
      ['Escolha o método', `O conceito decisivo aqui é ${method}; explique por que ele se aplica.`],
      ['Monte a expressão', 'Traduza os dados para a definição, equação ou regra escolhida antes de simplificar.'],
      ['Desenvolva o cálculo', `Execute as operações mantendo parênteses, sinais e condições de domínio explícitos. O resultado obtido é ${finalAnswer}.`],
      ['Faça a verificação', 'Teste o resultado na condição original ou confira sua interpretação geométrica, física ou algébrica.'],
    ],
  })),
);

export function auditSubjectiveCalculusOneBank() {
  if (subjectiveCalculusOneBank.length !== 125) throw new Error('O banco deve conter 125 questões.');
  const statements = new Set();
  for (const question of subjectiveCalculusOneBank) {
    if (statements.has(question.statement)) throw new Error(`Enunciado repetido: ${question.id}`);
    statements.add(question.statement);
    if (question.hints.length !== 3 || question.steps.length < 5) throw new Error(`Estrutura incompleta: ${question.id}`);
    if ((question.statement.match(/\$/g) ?? []).length % 2) throw new Error(`LaTex inválido: ${question.id}`);
    if (/item anterior|mesma funç/i.test(question.statement)) throw new Error(`Dependência indevida: ${question.id}`);
  }
  return [25, 50, 75, 100, 125].map((total) => ({ reviewedThrough: total }));
}
