/**
 * Editorial scaffolding shared by the Cálculo II drafts.
 *
 * The concrete algebra remains in each question's authored `steps`; this file
 * guarantees that every draft also explains how to choose a method, offers
 * progressive hints, and ends with a meaningful check.  It deliberately keeps
 * `review_required`: this is a quality floor, not a substitute for a professor
 * reviewing the pedagogical wording and distractors.
 */
const r = String.raw;
const byTopic = {
  partes: {
    method:
      'Procure um produto em que derivar um fator o simplifique e integrar o outro seja direto. Esse é o sinal de integração por partes.',
    hints: [
      'Antes de calcular, escolha qual fator fica em $u$. Em geral, prefira o fator que fica mais simples quando derivado.',
      r`Escreva separadamente $u$, $du$, $dv$ e $v$ antes de aplicar $\int u\,dv=uv-\int v\,du$.`,
    ],
    check:
      'Derive a expressão final. Se a derivada não reproduzir o integrando, revise principalmente o sinal do termo subtraído.',
  },
  fracoes: {
    method:
      'Transforme a função racional em parcelas mais simples antes de integrar. A decomposição deve ser conferida recompondo o numerador.',
    hints: [
      'Compare os graus do numerador e do denominador; se necessário, faça a divisão polinomial antes das frações parciais.',
      'Depois de encontrar os coeficientes, substitua-os de volta na identidade para conferir o numerador.',
    ],
    check:
      'Diferencie o resultado e observe o domínio dos logaritmos. Em intervalos que cruzam raízes do denominador, os módulos são importantes.',
  },
  trigonometricas: {
    method:
      'Use identidades trigonométricas para criar uma derivada presente no integrando ou reduzir as potências antes de integrar.',
    hints: [
      'Verifique se há uma potência ímpar de seno ou cosseno que pode ser separada para uma substituição.',
      'Quando as potências forem pares, tente as identidades de meio ângulo antes de integrar.',
    ],
    check: r`Derive o resultado usando as mesmas identidades. Preste atenção aos fatores internos, como o $2$ em $\sin(2x)$.`,
  },
  infinitos: {
    method:
      'Uma integral imprópria é definida por limite. Nunca substitua um limite infinito diretamente na primitiva.',
    hints: [
      'Troque o extremo infinito por $b$ e escreva o limite quando $b$ tende ao infinito.',
      'Decida primeiro se o limite existe e é finito; só então conclua que a integral converge.',
    ],
    check:
      'Confira se o resultado respeita a comparação com integrais de potência, especialmente o limiar $p=1$.',
  },
  descontinuidades: {
    method:
      'Quando o integrando não está definido dentro do intervalo, separe a integral nos pontos problemáticos e calcule limites independentes.',
    hints: [
      'Localize os pontos em que o denominador zera ou a expressão deixa de estar definida antes de integrar.',
      'Cada lado da descontinuidade precisa convergir por conta própria; não cancele infinitos de sinais opostos.',
    ],
    check:
      'Teste os limites laterais separadamente. Uma soma só converge se todos os trechos necessários forem finitos.',
  },
  'limites-sequencias': {
    method:
      'Para limites de sequências, exponha o comportamento dominante ou aplique uma transformação que preserve o limite.',
    hints: [
      'Em quocientes de polinômios, divida numerador e denominador pela maior potência de $n$.',
      'Depois da simplificação, identifique os termos que tendem a zero e os que permanecem.',
    ],
    check:
      'Confira se o valor proposto é compatível com alguns termos grandes da sequência; isso ajuda a detectar sinais e coeficientes trocados.',
  },
  monotonicidade: {
    method:
      'Compare termos consecutivos para decidir monotonicidade e combine essa informação com um limite ou cota para concluir sobre convergência.',
    hints: [
      'Escreva $a_{n+1}-a_n$ ou a razão $a_{n+1}/a_n$; escolha a forma que simplifica melhor.',
      'Monotonicidade sozinha não basta: indique também uma cota ou o limite relevante.',
    ],
    check:
      'Verifique o sentido da desigualdade em alguns índices iniciais e confirme que a cota vale para todo índice do domínio.',
  },
  geometricas: {
    method:
      'Reconheça o primeiro termo e a razão constante. A fórmula de soma infinita só é válida quando o módulo da razão é menor que um.',
    hints: [
      'Calcule a razão entre dois termos consecutivos; ela deve ser constante em uma série geométrica.',
      'Observe onde a soma começa: o primeiro termo muda entre $n=0$ e $n=1$.',
    ],
    check:
      'Compare a soma encontrada com as primeiras somas parciais. Elas devem se aproximar do valor final.',
  },
  convergencia: {
    method:
      'Antes de escolher um teste, verifique a condição necessária: os termos da série precisam tender a zero.',
    hints: [
      'Escreva o termo geral $a_n$ e calcule seu limite quando $n$ tende ao infinito.',
      'Se o limite for zero, compare o formato com uma série conhecida em vez de concluir convergência automaticamente.',
    ],
    check:
      'Diga explicitamente qual condição do teste foi usada e por que ela se aplica à série deste enunciado.',
  },
  testes: {
    method:
      'Escolha o teste pelo formato do termo geral: razões e fatoriais favorecem razão; raízes em potência favorecem raiz; termos positivos comparáveis favorecem comparação.',
    hints: [
      'Escreva a expressão que o teste pede antes de simplificar, mantendo todos os fatores dependentes de $n$.',
      'Compare o limite obtido com o valor de corte do teste escolhido.',
    ],
    check:
      'Confira se as hipóteses do teste valem, especialmente positividade para comparações e termos não nulos para razão ou raiz.',
  },
  alternadas: {
    method:
      'Para uma série alternada, separe o sinal de $b_n$ e verifique se $b_n$ decresce para zero antes de aplicar Leibniz.',
    hints: [
      'Ignore temporariamente o sinal alternado e estude o módulo dos termos.',
      'Para a cota do erro, use o primeiro termo que ficou de fora da soma parcial.',
    ],
    check:
      'Diferencie convergência condicional de absoluta: examine também a série formada pelos módulos.',
  },
  potencias: {
    method:
      'Para séries de potências, determine primeiro o raio de convergência; os extremos do intervalo exigem testes separados.',
    hints: [
      'Aplique razão ou raiz ao coeficiente que multiplica a potência de $x$.',
      'Depois de obter o raio, substitua cada extremo separadamente na série original.',
    ],
    check:
      'Não transfira automaticamente o resultado de um extremo para o outro: os sinais podem mudar a convergência.',
  },
  taylor: {
    method:
      'Use a série conhecida ou calcule derivadas no centro, mantendo a potência e o fatorial correspondentes a cada ordem.',
    hints: [
      'Escreva os primeiros termos da série ao redor do centro indicado antes de substituir valores.',
      'Para estimar erro, identifique a primeira potência omitida e a cota pedida pelo enunciado.',
    ],
    check:
      'Confira o termo constante avaliando a aproximação no centro; ele deve coincidir com o valor da função nesse ponto.',
  },
};

export function enrichEditorial(item) {
  const profile = byTopic[item.topic];
  if (!profile) throw new Error(`Missing editorial profile for ${item.topic}.`);
  const coreSteps = item.steps.map((content, index) => ({
    title: index === 0 ? 'Desenvolva a estratégia' : 'Complete o cálculo',
    content,
  }));
  return {
    ...item,
    hints: item.hints ?? profile.hints,
    explanation:
      item.explanation ??
      `${profile.method} ${item.steps.join(' ')} ${profile.check}`,
    solutionSteps: [
      { title: 'Escolha o método', content: profile.method },
      ...coreSteps,
      { title: 'Confira o resultado', content: profile.check },
    ],
  };
}
