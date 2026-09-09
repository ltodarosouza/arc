const q = (item) => ({
  ...item,
  source: 'Arc original Cálculo I — lote 01',
  subjectId: '20000000-0000-4000-8000-000000000004',
});

export default [
  q({
    topic: 'representacoes-de-funcoes',
    difficulty: 'easy',
    statement: 'Qual é o domínio real de $f(x)=\\sqrt{4-x}$?',
    options: ['$x\\le4$', '$x<4$', '$x\\ge4$', 'Todos os números reais'],
    correct: 0,
    hints: [
      'Em uma raiz quadrada real, o radicando não pode ser negativo.',
      'Resolva a desigualdade $4-x\\ge0$.',
    ],
    finalAnswer: '$(-\\infty,4]$',
    explanation:
      'A raiz quadrada representa um número real apenas quando seu radicando é não negativo. A condição vem da expressão dentro da raiz, e o valor que zera o radicando também é permitido.',
    steps: [
      [
        'Observe a restrição',
        'Precisamos de $4-x\\ge0$ para que $\\sqrt{4-x}$ exista nos reais.',
      ],
      [
        'Isole $x$',
        'Somando $x$ aos dois lados, obtemos $4\\ge x$, ou $x\\le4$.',
      ],
      [
        'Inclua o extremo',
        'Em $x=4$, a raiz vale $0$, que é real. Portanto $4$ pertence ao domínio.',
      ],
    ],
  }),
  q({
    topic: 'composicao-e-transformacoes',
    difficulty: 'easy',
    statement:
      'Se $f(x)=3x-1$ e $g(x)=x^2+1$, qual é o valor de $(f\\circ g)(2)$?',
    options: ['$14$', '$12$', '$8$', '$6$'],
    correct: 0,
    hints: [
      'A composição $f\\circ g$ manda primeiro o valor para $g$.',
      'Calcule $g(2)$ antes de usar a fórmula de $f$.',
    ],
    finalAnswer: '$14$',
    explanation:
      'Na composição indicada, a saída de $g$ se torna a entrada de $f$. Trocar a ordem das funções é um erro comum e leva a outro resultado.',
    steps: [
      ['Comece pela função interna', '$g(2)=2^2+1=5$.'],
      ['Use a saída em $f$', '$f(5)=3\\cdot5-1$.'],
      ['Conclua', '$15-1=14$, portanto $(f\\circ g)(2)=14$.'],
    ],
  }),
  q({
    topic: 'funcoes-inversas-e-logaritmicas',
    difficulty: 'easy',
    statement: 'Para $f(x)=2x-5$, qual é o valor de $f^{-1}(7)$?',
    options: ['$6$', '$1$', '$9$', '$12$'],
    correct: 0,
    hints: [
      'A inversa desfaz o que a função original faz.',
      'Procure o número $x$ para o qual $2x-5=7$.',
    ],
    finalAnswer: '$6$',
    explanation:
      'Encontrar $f^{-1}(7)$ significa descobrir qual entrada produz saída $7$ na função original. Não significa calcular o recíproco de $f(7)$.',
    steps: [
      ['Traduza a inversa', 'Escrevemos $f(x)=7$, isto é, $2x-5=7$.'],
      [
        'Resolva a equação',
        'Somando $5$, resulta $2x=12$; dividindo por $2$, resulta $x=6$.',
      ],
      ['Verifique', '$f(6)=12-5=7$, então $f^{-1}(7)=6$.'],
    ],
  }),
  q({
    topic: 'modelos-e-funcoes-elementares',
    difficulty: 'easy',
    statement: 'Resolva a equação $e^{2x}=e^6$.',
    options: ['$x=3$', '$x=12$', '$x=4$', '$x=6$'],
    correct: 0,
    hints: [
      'A função exponencial de base $e$ é injetiva.',
      'Se as bases são iguais, compare os expoentes.',
    ],
    finalAnswer: '$x=3$',
    explanation:
      'Como ambos os lados têm a mesma base positiva e diferente de $1$, a igualdade das potências implica igualdade dos expoentes.',
    steps: [
      ['Compare as potências', 'Temos $e^{2x}=e^6$ com a mesma base $e$.'],
      ['Iguale os expoentes', 'Logo $2x=6$.'],
      ['Resolva', 'Dividindo por $2$, encontramos $x=3$.'],
    ],
  }),
  q({
    topic: 'composicao-e-transformacoes',
    difficulty: 'medium',
    statement:
      'O gráfico de $g(x)=f(x-2)+3$ é obtido a partir do gráfico de $f$. Qual transformação é correta?',
    options: [
      '2 unidades à direita e 3 para cima',
      '2 unidades à esquerda e 3 para cima',
      '2 unidades à direita e 3 para baixo',
      'Uma dilatação vertical de fator 3',
    ],
    correct: 0,
    hints: [
      'Alterações dentro do argumento afetam o eixo horizontal.',
      'Em $f(x-a)$, o gráfico se desloca na direção oposta ao sinal visível.',
    ],
    finalAnswer: '2 unidades à direita e 3 para cima.',
    explanation:
      'O termo $x-2$ faz cada valor que antes aparecia em $x$ surgir agora em $x+2$, deslocando o desenho para a direita. O $+3$ externo soma três a cada altura.',
    steps: [
      [
        'Leia a transformação horizontal',
        'A expressão $f(x-2)$ desloca o gráfico de $f$ em $2$ unidades para a direita.',
      ],
      [
        'Leia a transformação vertical',
        'O termo externo $+3$ acrescenta $3$ a todo valor de saída.',
      ],
      [
        'Combine os efeitos',
        'O resultado é direita $2$ e cima $3$, sem dilatação.',
      ],
    ],
  }),
  q({
    topic: 'funcoes-inversas-e-logaritmicas',
    difficulty: 'medium',
    statement: 'Resolva $\\log_2(x-1)=3$.',
    options: ['$x=9$', '$x=8$', '$x=7$', '$x=4$'],
    correct: 0,
    hints: [
      'Transforme a igualdade logarítmica em uma igualdade exponencial.',
      'Depois de obter $x-1$, lembre-se de recuperar $x$.',
    ],
    finalAnswer: '$x=9$',
    explanation:
      'O logaritmo informa o expoente necessário para produzir o argumento. Além de resolver a equação, é preciso respeitar a condição $x-1>0$.',
    steps: [
      ['Converta a forma', '$\\log_2(x-1)=3$ equivale a $x-1=2^3$.'],
      ['Calcule a potência', '$2^3=8$, então $x-1=8$.'],
      [
        'Recupere a variável',
        'Somando $1$, obtemos $x=9$, que satisfaz $x>1$.',
      ],
    ],
  }),

  q({
    topic: 'nocao-de-limite',
    difficulty: 'easy',
    statement: 'Calcule $\\lim_{x\\to3}\\frac{x^2-9}{x-3}$.',
    options: ['$6$', '$0$', '$3$', 'O limite não existe'],
    correct: 0,
    hints: [
      'A substituição direta dá uma forma $0/0$; isso pede simplificação.',
      'Fatore $x^2-9$ como diferença de quadrados.',
    ],
    finalAnswer: '$6$',
    explanation:
      'Embora a expressão original não esteja definida em $x=3$, o limite depende dos valores próximos de $3$. Após cancelar o fator que causa o zero no denominador, a tendência fica visível.',
    steps: [
      ['Fatore o numerador', '$x^2-9=(x-3)(x+3)$.'],
      ['Simplifique perto de $3$', 'Para $x\\ne3$, a fração é igual a $x+3$.'],
      ['Avalie a tendência', 'Quando $x$ tende a $3$, $x+3$ tende a $6$.'],
    ],
  }),
  q({
    topic: 'calculo-de-limites',
    difficulty: 'medium',
    statement: 'Calcule $\\lim_{x\\to5}\\frac{\\sqrt{x+4}-3}{x-5}$.',
    options: ['$1/6$', '$1/3$', '$6$', '$0$'],
    correct: 0,
    hints: [
      'A forma inicial é $0/0$; procure uma expressão conjugada.',
      'Multiplique numerador e denominador por $\\sqrt{x+4}+3$.',
    ],
    finalAnswer: '$1/6$',
    explanation:
      'A racionalização elimina a raiz da diferença no numerador. Só depois dessa simplificação é seguro substituir $x=5$.',
    steps: [
      [
        'Escolha o conjugado',
        'Multiplicamos por $\\sqrt{x+4}+3$ no numerador e no denominador.',
      ],
      ['Use produto notável', 'O numerador vira $(x+4)-9=x-5$.'],
      ['Cancele o fator comum', 'Para $x\\ne5$, resta $1/(\\sqrt{x+4}+3)$.'],
      ['Tome o limite', 'Em $x=5$, o denominador é $3+3=6$, dando $1/6$.'],
    ],
  }),
  q({
    topic: 'calculo-de-limites',
    difficulty: 'medium',
    statement: 'Calcule $\\lim_{x\\to0}\\frac{\\sin(4x)}{x}$.',
    options: ['$4$', '$0$', '$1$', 'O limite não existe'],
    correct: 0,
    hints: [
      'Use o limite fundamental $\\lim_{u\\to0}\\sin u/u=1$.',
      'Faça aparecer $4x$ também no denominador.',
    ],
    finalAnswer: '$4$',
    explanation:
      'O argumento do seno é $4x$, e não apenas $x$. Separar um fator $4$ permite aplicar exatamente o limite fundamental.',
    steps: [
      [
        'Reescreva a fração',
        '$\\frac{\\sin(4x)}x=4\\cdot\\frac{\\sin(4x)}{4x}$.',
      ],
      [
        'Aplique o limite fundamental',
        'Quando $x\\to0$, também $4x\\to0$, então a fração tende a $1$.',
      ],
      ['Multiplique o fator externo', 'O limite total é $4\\cdot1=4$.'],
    ],
  }),
  q({
    topic: 'limites-no-infinito-e-assintotas',
    difficulty: 'easy',
    statement: 'Qual é $\\lim_{x\\to\\infty}\\frac{3x^2-x+1}{2x^2+5}$?',
    options: ['$3/2$', '$0$', '$2/3$', '$3$'],
    correct: 0,
    hints: [
      'Compare os graus do numerador e do denominador.',
      'Divida todos os termos por $x^2$.',
    ],
    finalAnswer: '$3/2$',
    explanation:
      'Em uma razão de polinômios de mesmo grau, os termos de maior grau controlam o comportamento no infinito. Os termos com potências menores desaparecem ao dividir por $x^2$.',
    steps: [
      ['Identifique os graus', 'Numerador e denominador têm grau $2$.'],
      [
        'Normalize a expressão',
        'Dividindo por $x^2$, obtemos $(3-1/x+1/x^2)/(2+5/x^2)$.',
      ],
      [
        'Passe ao limite',
        'Os termos com $1/x$ e $1/x^2$ tendem a zero; sobra $3/2$.',
      ],
    ],
  }),
  q({
    topic: 'continuidade',
    difficulty: 'medium',
    statement:
      'Para qual valor de $a$ a função $f(x)=ax+1$ se $x<2$ e $f(x)=x^2$ se $x\\ge2$ é contínua em $x=2$?',
    options: ['$a=3$', '$a=2$', '$a=1$', '$a=4$'],
    correct: 0,
    hints: [
      'Continuidade exige que limite à esquerda, limite à direita e valor da função coincidam.',
      'Em $x=2$, o ramo da direita vale $2^2$.',
    ],
    finalAnswer: '$a=3$',
    explanation:
      'A função por partes só pode ser contínua na junção quando as duas fórmulas produzem o mesmo valor ali. O ramo que inclui igualdade define também o valor de $f(2)$.',
    steps: [
      ['Avalie o lado direito', 'Como $2\\ge2$, $f(2)=2^2=4$.'],
      [
        'Calcule o limite à esquerda',
        'Pelo primeiro ramo, quando $x\\to2^-$, o valor tende a $2a+1$.',
      ],
      ['Iguale os valores', 'A continuidade pede $2a+1=4$; portanto $a=3$.'],
    ],
  }),
  q({
    topic: 'nocao-de-limite',
    difficulty: 'easy',
    statement: 'O limite $\\lim_{x\\to0}\\frac{|x|}{x}$ é:',
    options: ['Não existe', '$0$', '$1$', '$-1$'],
    correct: 0,
    hints: [
      'Compare as aproximações pela esquerda e pela direita.',
      'Para $x>0$, $|x|=x$; para $x<0$, $|x|=-x$.',
    ],
    finalAnswer: 'Não existe.',
    explanation:
      'Um limite bilateral existe apenas quando as tendências pelos dois lados são iguais. Aqui, o módulo altera a fórmula em cada lado de zero.',
    steps: [
      ['Aproxime pela direita', 'Se $x>0$, $|x|/x=x/x=1$.'],
      ['Aproxime pela esquerda', 'Se $x<0$, $|x|/x=(-x)/x=-1$.'],
      [
        'Compare os resultados',
        'Como $1\\ne-1$, os limites laterais diferem e o limite bilateral não existe.',
      ],
    ],
  }),
  q({
    topic: 'calculo-de-limites',
    difficulty: 'medium',
    statement: 'Calcule $\\lim_{x\\to1}\\frac{\\ln x}{x-1}$.',
    options: ['$1$', '$0$', '$e$', 'O limite não existe'],
    correct: 0,
    hints: [
      'A expressão tem forma $0/0$.',
      "A derivada de $\\ln x$ é $1/x$; a Regra de l'Hôpital é aplicável aqui.",
    ],
    finalAnswer: '$1$',
    explanation:
      "Perto de $x=1$, $\\ln x$ cresce aproximadamente como $x-1$. A Regra de l'Hôpital formaliza essa comparação ao derivar numerador e denominador.",
    steps: [
      [
        'Identifique a indeterminação',
        '$\\ln1=0$ e $1-1=0$, portanto temos $0/0$.',
      ],
      ['Derive numerador e denominador', 'A razão passa a ser $(1/x)/1$.'],
      ['Avalie em $1$', '$1/x$ tende a $1$ quando $x$ tende a $1$.'],
    ],
  }),
  q({
    topic: 'limites-no-infinito-e-assintotas',
    difficulty: 'medium',
    statement:
      'A função $f(x)=\\frac{2x+1}{x-4}$ possui qual assíntota vertical?',
    options: ['$x=4$', '$y=2$', '$x=-4$', '$y=4$'],
    correct: 0,
    hints: [
      'Assíntotas verticais podem ocorrer onde o denominador zera sem cancelamento.',
      'Resolva $x-4=0$ e confira o numerador nesse ponto.',
    ],
    finalAnswer: '$x=4$',
    explanation:
      'O denominador fica zero em $x=4$, enquanto o numerador vale $9$, não zero. Assim, os valores de $f(x)$ crescem em módulo sem limite perto dessa reta vertical.',
    steps: [
      ['Encontre o zero do denominador', '$x-4=0$ fornece $x=4$.'],
      [
        'Cheque o numerador',
        'Em $x=4$, $2x+1=9$, portanto não há cancelamento.',
      ],
      ['Conclua', 'A reta $x=4$ é a assíntota vertical.'],
    ],
  }),
  q({
    topic: 'taxa-de-variacao-e-derivada',
    difficulty: 'easy',
    statement: "Se $f(x)=x^2$, qual é $f'(3)$?",
    options: ['$6$', '$9$', '$3$', '$12$'],
    correct: 0,
    hints: [
      'A derivada de $x^n$ é $nx^{n-1}$.',
      'Derive antes de substituir $x=3$.',
    ],
    finalAnswer: '$6$',
    explanation:
      'A derivada mede a taxa de variação instantânea, isto é, a inclinação da reta tangente. Para a parábola $x^2$, essa taxa cresce linearmente com $x$, por isso o valor em $3$ é maior que o valor no ponto $1$.',
    steps: [
      ['Derive a função', "$f'(x)=2x$."],
      ['Avalie no ponto', "$f'(3)=2\cdot3$."],
      ['Conclua', "$f'(3)=6$."],
    ],
  }),
  q({
    topic: 'regras-basicas-de-derivacao',
    difficulty: 'easy',
    statement: 'Qual é a derivada de $f(x)=5x^4-3x+7$?',
    options: ['$20x^3-3$', '$20x^4-3$', '$5x^3-3$', '$20x^3+7$'],
    correct: 0,
    hints: [
      'Derive cada termo separadamente.',
      'A derivada de uma constante é zero.',
    ],
    finalAnswer: '$20x^3-3$',
    explanation:
      'A regra da potência reduz o expoente e multiplica pelo expoente antigo. O termo constante não altera quando $x$ varia.',
    steps: [
      ['Derive o primeiro termo', "$(5x^4)'=5\cdot4x^3=20x^3$."],
      ['Derive os demais', "$(-3x)'=-3$ e $7'=0$."],
      ['Some os resultados', "$f'(x)=20x^3-3$."],
    ],
  }),
  q({
    topic: 'produto-e-quociente',
    difficulty: 'medium',
    statement: 'Calcule a derivada de $f(x)=x^2(x+1)$.',
    options: ['$3x^2+2x$', '$2x(x+1)$', '$3x^2+1$', '$x^3+x^2$'],
    correct: 0,
    hints: [
      'Você pode usar a regra do produto ou expandir antes.',
      'Ao expandir, obtenha $x^3+x^2$.',
    ],
    finalAnswer: '$3x^2+2x$',
    explanation:
      'Em produtos de polinômios simples, expandir pode tornar a derivação transparente. A alternativa que repete apenas parte do produto esquece a contribuição de um fator.',
    steps: [
      ['Expanda o produto', '$x^2(x+1)=x^3+x^2$.'],
      ['Derive termo a termo', "$(x^3+x^2)'=3x^2+2x$."],
      ['Escreva o resultado', "$f'(x)=3x^2+2x$."],
    ],
  }),
  q({
    topic: 'regra-da-cadeia',
    difficulty: 'medium',
    statement: 'Qual é a derivada de $f(x)=(3x-2)^5$?',
    options: ['$15(3x-2)^4$', '$5(3x-2)^4$', '$15(3x-2)^5$', '$(3x-2)^4$'],
    correct: 0,
    hints: [
      'Há uma função externa elevada à quinta potência e uma função interna $3x-2$.',
      'Multiplique pela derivada da parte interna.',
    ],
    finalAnswer: '$15(3x-2)^4$',
    explanation:
      'A regra da cadeia combina a variação da potência externa com a variação da expressão interna. Esquecer o fator $3$ é o deslize mais comum.',
    steps: [
      ['Derive a camada externa', 'A derivada de $u^5$ é $5u^4$.'],
      ['Substitua a expressão interna', 'Isso dá $5(3x-2)^4$.'],
      ['Aplique a cadeia', "Como $(3x-2)'=3$, o resultado é $15(3x-2)^4$."],
    ],
  }),
  q({
    topic: 'produto-e-quociente',
    difficulty: 'medium',
    statement: 'Qual é a derivada de $f(x)=\frac{x+1}{x-2}$?',
    options: ['$-3/(x-2)^2$', '$1/(x-2)^2$', '$3/(x-2)^2$', '$-3/(x-2)$'],
    correct: 0,
    hints: ["Use $(u/v)'=(u'v-uv')/v^2$.", "Aqui $u'=1$ e $v'=1$."],
    finalAnswer: '$-3/(x-2)^2$',
    explanation:
      'No quociente, a ordem da subtração importa. O numerador da derivada mede a diferença entre a contribuição do numerador e a do denominador.',
    steps: [
      ['Identifique as partes', "$u=x+1$, $v=x-2$ e $u'=v'=1$."],
      ['Aplique a regra', "$f'=((x-2)-(x+1))/(x-2)^2$."],
      ['Simplifique', 'O numerador é $-3$, resultando em $-3/(x-2)^2$.'],
    ],
  }),
  q({
    topic: 'regra-da-cadeia',
    difficulty: 'medium',
    statement: 'Determine $\frac{d}{dx}\sqrt{1+x^2}$.',
    options: [
      '$x/\sqrt{1+x^2}$',
      '$1/(2\sqrt{1+x^2})$',
      '$2x/\sqrt{1+x^2}$',
      '$\sqrt{1+x^2}$',
    ],
    correct: 0,
    hints: [
      'Reescreva a raiz como $(1+x^2)^{1/2}$.',
      'A regra da cadeia introduz a derivada de $1+x^2$.',
    ],
    finalAnswer: '$x/\sqrt{1+x^2}$',
    explanation:
      'A raiz é uma potência de expoente $1/2$. A derivada externa cria o fator $1/2$, que se cancela com o $2$ da derivada interna.',
    steps: [
      ['Reescreva a raiz', '$\sqrt{1+x^2}=(1+x^2)^{1/2}$.'],
      ['Derive pela cadeia', '$\frac12(1+x^2)^{-1/2}\cdot2x$.'],
      ['Simplifique', 'Os fatores $1/2$ e $2$ se cancelam: $x/\sqrt{1+x^2}$.'],
    ],
  }),
  q({
    topic: 'derivacao-implicita-e-logaritmica',
    difficulty: 'medium',
    statement: 'Se $x^2+y^2=25$, qual é $dy/dx$ em termos de $x$ e $y$?',
    options: ['$-x/y$', '$x/y$', '$-y/x$', '$2x+2y$'],
    correct: 0,
    hints: [
      'Derive os dois lados em relação a $x$.',
      "Ao derivar $y^2$, lembre-se de $y'$ pela regra da cadeia.",
    ],
    finalAnswer: '$-x/y$',
    explanation:
      'A equação define $y$ implicitamente como função de $x$. Por isso, a derivada de $y^2$ precisa carregar a taxa desconhecida $dy/dx$.',
    steps: [
      ['Derive a igualdade', "$2x+2y\,y'=0$."],
      ['Isole o termo com $y\$', "$2y\,y'=-2x$."],
      ['Divida por $2y$', "$y'=-x/y$."],
    ],
  }),
  q({
    topic: 'derivacao-implicita-e-logaritmica',
    difficulty: 'medium',
    statement: 'Qual é a derivada de $f(x)=\ln(x^3)$ para $x>0$?',
    options: ['$3/x$', '$1/x^3$', '$3x^2$', '$\ln(3x^2)$'],
    correct: 0,
    hints: ["Use $\frac d{dx}\ln u=u'/u$.", 'A derivada de $x^3$ é $3x^2$.'],
    finalAnswer: '$3/x$',
    explanation:
      'A derivada do logaritmo natural divide a taxa de variação do argumento pelo próprio argumento. O resultado pode ser simplificado cancelando duas potências de $x$.',
    steps: [
      ['Escolha o argumento', "Tome $u=x^3$, então $u'=3x^2$."],
      ['Aplique a fórmula', "$f'=3x^2/x^3$."],
      ['Simplifique', '$3x^2/x^3=3/x$.'],
    ],
  }),
  q({
    topic: 'regras-basicas-de-derivacao',
    difficulty: 'easy',
    statement:
      'Uma posição é dada por $s(t)=4t^2-2t$. Qual é a velocidade em $t=1$?',
    options: ['$6$', '$2$', '$4$', '$8$'],
    correct: 0,
    hints: ['Velocidade é a derivada da posição.', "Primeiro calcule $s'(t)$."],
    finalAnswer: '$6$',
    explanation:
      'A velocidade instantânea mostra a taxa de mudança da posição no tempo. Não se deve confundi-la com a posição $s(1)$.',
    steps: [
      ['Derive a posição', "$s'(t)=8t-2$."],
      ['Use o instante indicado', "$s'(1)=8\cdot1-2$."],
      ['Conclua', 'A velocidade é $6$.'],
    ],
  }),
  q({
    topic: 'taxas-relacionadas-e-aproximacoes',
    difficulty: 'medium',
    statement:
      'Para $f(x)=x^2$, use a linearização em $a=4$ para aproximar $f(4,1)$.',
    options: ['$16,8$', '$16,1$', '$17,2$', '$8,2$'],
    correct: 0,
    hints: [
      "A linearização é $L(x)=f(a)+f'(a)(x-a)$.",
      "Calcule $f(4)$ e $f'(4)$ antes.",
    ],
    finalAnswer: '$16,8$',
    explanation:
      'A reta tangente em $x=4$ fornece uma aproximação local para a função. Como $4,1$ está perto de $4$, ela é apropriada para estimar o quadrado.',
    steps: [
      ['Calcule os dados no ponto', "$f(4)=16$ e $f'(x)=2x$, logo $f'(4)=8$."],
      ['Monte a reta tangente', '$L(x)=16+8(x-4)$.'],
      ['Aproxime em $4,1$', '$L(4,1)=16+8(0,1)=16,8$.'],
    ],
  }),
  q({
    topic: 'regra-da-cadeia',
    difficulty: 'medium',
    statement: 'Qual é a derivada de $f(x)=\sin(x^2)$?',
    options: ['$2x\cos(x^2)$', '$\cos(x^2)$', '$2x\sin(x)$', '$\cos(x)$'],
    correct: 0,
    hints: [
      'A derivada externa de seno é cosseno.',
      'O argumento $x^2$ também varia com $x$.',
    ],
    finalAnswer: '$2x\cos(x^2)$',
    explanation:
      'O cosseno mantém o mesmo argumento interno. O fator $2x$ vem da taxa de variação desse argumento: $x^2$ não cresce uma unidade para cada unidade de $x$, então a derivada não pode ser apenas $\cos(x^2)$.',
    steps: [
      ['Identifique a composição', 'A função externa é $\sin u$ com $u=x^2$.'],
      ['Derive a parte externa', 'A derivada é $\cos(u)$.'],
      ['Multiplique pela interna', "Como $u'=2x$, fica $2x\cos(x^2)$."],
    ],
  }),
  q({
    topic: 'produto-e-quociente',
    difficulty: 'medium',
    statement: 'Qual é a derivada de $f(x)=xe^x$?',
    options: ['$e^x(x+1)$', '$xe^x$', '$e^x$', '$x^2e^x$'],
    correct: 0,
    hints: [
      'É um produto de duas funções que dependem de $x$.',
      "Use $u'v+uv'$ e lembre-se de que $(e^x)'=e^x$.",
    ],
    finalAnswer: '$e^x(x+1)$',
    explanation:
      'Cada fator do produto pode variar. A regra do produto soma as duas maneiras pelas quais o valor total muda: variar $x$ mantendo momentaneamente $e^x$, e variar $e^x$ mantendo momentaneamente $x$.',
    steps: [
      ['Aplique a regra do produto', "$(xe^x)'=1\cdot e^x+x\cdot e^x$."],
      ['Fatore o termo comum', '$e^x+xe^x=e^x(1+x)$.'],
      ['Organize', "$f'(x)=e^x(x+1)$."],
    ],
  }),
  q({
    topic: 'regras-basicas-de-derivacao',
    difficulty: 'easy',
    statement: "Se $f(x)=\frac{1}{x}$, qual é $f'(x)$?",
    options: ['$-1/x^2$', '$1/x^2$', '$-1/x$', '$x$'],
    correct: 0,
    hints: [
      'Escreva $1/x$ como $x^{-1}$.',
      'A regra da potência também vale para expoentes negativos.',
    ],
    finalAnswer: '$-1/x^2$',
    explanation:
      'A forma de potência revela que o expoente diminui de $-1$ para $-2$. O sinal negativo vem do próprio expoente.',
    steps: [
      ['Reescreva a função', '$1/x=x^{-1}$.'],
      ['Aplique a regra da potência', "$(x^{-1})'=-1x^{-2}$."],
      ['Use fração novamente', '$-x^{-2}=-1/x^2$.'],
    ],
  }),
  q({
    topic: 'taxa-de-variacao-e-derivada',
    difficulty: 'medium',
    statement:
      'Qual é a equação da reta tangente a $f(x)=x^2$ no ponto de abscissa $x=2$?',
    options: ['$y=4x-4$', '$y=2x$', '$y=4x$', '$y=2x-2$'],
    correct: 0,
    hints: ["A inclinação é $f'(2)$.", 'A reta passa pelo ponto $(2,f(2))$.'],
    finalAnswer: '$y=4x-4$',
    explanation:
      'Uma reta tangente é determinada pelo ponto de contato e pela inclinação instantânea. É preciso usar ambos; apenas a derivada não define sua posição.',
    steps: [
      ['Encontre o ponto', '$f(2)=4$, logo o ponto é $(2,4)$.'],
      ['Encontre a inclinação', "$f'(x)=2x$, então $f'(2)=4$."],
      ['Use ponto-inclinação', '$y-4=4(x-2)$, isto é, $y=4x-4$.'],
    ],
  }),
  q({
    topic: 'extremos-e-valor-medio',
    difficulty: 'easy',
    statement: 'Em qual ponto crítico de $f(x)=x^2-4x$ a derivada se anula?',
    options: ['$x=2$', '$x=-2$', '$x=4$', '$x=0$'],
    correct: 0,
    hints: [
      "Pontos críticos candidatos ocorrem onde $f'(x)=0$ ou não existe.",
      'Derive o polinômio.',
    ],
    finalAnswer: '$x=2$',
    explanation:
      'Para uma função polinomial, a derivada existe em todo lugar. Assim, basta resolver a equação que faz a inclinação ser zero.',
    steps: [
      ['Derive a função', "$f'(x)=2x-4$."],
      ['Anule a derivada', '$2x-4=0$.'],
      ['Resolva', '$2x=4$, portanto $x=2$.'],
    ],
  }),
  q({
    topic: 'extremos-e-valor-medio',
    difficulty: 'medium',
    statement: 'Qual é o valor máximo de $f(x)=-x^2+6x$ nos reais?',
    options: ['$9$', '$6$', '$-9$', '$0$'],
    correct: 0,
    hints: [
      'Encontre o ponto onde a derivada é zero.',
      'A parábola abre para baixo, então o ponto crítico é máximo.',
    ],
    finalAnswer: '$9$',
    explanation:
      'A derivada localiza o vértice da parábola. Como o coeficiente de $x^2$ é negativo, o vértice fornece o maior valor da função.',
    steps: [
      ['Derive', "$f'(x)=-2x+6$."],
      ['Encontre o crítico', '$-2x+6=0$ dá $x=3$.'],
      ['Avalie a função', '$f(3)=-(3)^2+6\cdot3=-9+18=9$.'],
    ],
  }),
  q({
    topic: 'analise-de-graficos',
    difficulty: 'medium',
    statement:
      "Se $f'(x)>0$ em um intervalo, como $f$ se comporta nesse intervalo?",
    options: [
      'É crescente',
      'É decrescente',
      'É constante',
      'Tem necessariamente um máximo',
    ],
    correct: 0,
    hints: [
      'A derivada indica a inclinação local do gráfico.',
      'Inclinações positivas apontam para cima da esquerda para a direita.',
    ],
    finalAnswer: 'É crescente.',
    explanation:
      'Derivada positiva significa que pequenos aumentos em $x$ produzem aumentos em $f(x)$. Isso caracteriza crescimento no intervalo, sem garantir por si só um máximo.',
    steps: [
      ['Interprete o sinal', "$f'(x)>0$ significa inclinação positiva."],
      [
        'Compare valores próximos',
        'Ao aumentar $x$, a função aumenta localmente.',
      ],
      [
        'Conclua no intervalo',
        'Se isso vale em todo o intervalo, $f$ é crescente nele.',
      ],
    ],
  }),
  q({
    topic: 'regra-de-lhopital',
    difficulty: 'medium',
    statement: 'Calcule $\lim_{x\to0}\frac{e^x-1}{x}$.',
    options: ['$1$', '$0$', '$e$', 'Não existe'],
    correct: 0,
    hints: [
      'A substituição dá $0/0$.',
      "Pela Regra de l'Hôpital, derive numerador e denominador.",
    ],
    finalAnswer: '$1$',
    explanation:
      "A diferença $e^x-1$ é aproximadamente igual a $x$ perto de zero. A Regra de l'Hôpital confirma essa taxa comparando suas derivadas.",
    steps: [
      ['Verifique a forma', '$e^0-1=0$ e o denominador também é $0$.'],
      ['Derive os dois termos', 'A razão vira $e^x/1$.'],
      ['Avalie no limite', '$e^x$ tende a $e^0=1$.'],
    ],
  }),
  q({
    topic: 'otimizacao',
    difficulty: 'medium',
    statement:
      'Um retângulo tem perímetro $20$ e lados $x$ e $10-x$. Para qual $x$ sua área é máxima?',
    options: ['$5$', '$10$', '$4$', '$2,5$'],
    correct: 0,
    hints: [
      'Escreva a área usando apenas $x$.',
      'Maximize a parábola $A(x)=x(10-x)$.',
    ],
    finalAnswer: '$5$',
    explanation:
      'Com perímetro fixo, a área do retângulo é uma parábola voltada para baixo. O máximo ocorre no vértice, quando os lados são iguais.',
    steps: [
      ['Monte a área', '$A(x)=x(10-x)=10x-x^2$.'],
      ['Derive', "$A'(x)=10-2x$."],
      [
        'Anule e interprete',
        '$10-2x=0$ dá $x=5$; como a parábola abre para baixo, é máximo.',
      ],
    ],
  }),
  q({
    topic: 'taxas-relacionadas-e-aproximacoes',
    difficulty: 'medium',
    statement:
      'O raio de um círculo cresce a $2$ cm/s. Quando $r=3$ cm, qual é $dA/dt$ para $A=\pi r^2$?',
    options: ['$12\pi$ cm²/s', '$6\pi$ cm²/s', '$18\pi$ cm²/s', '$4\pi$ cm²/s'],
    correct: 0,
    hints: [
      'Diferencie a fórmula da área em relação ao tempo.',
      'Use $dA/dt=2\pi r\,dr/dt$.',
    ],
    finalAnswer: '$12\pi$ cm²/s',
    explanation:
      'A área muda porque o raio muda. A regra da cadeia relaciona diretamente a taxa do raio à taxa da área; o valor de $r$ é indispensável, pois um mesmo aumento de raio cria uma área adicional maior em círculos maiores.',
    steps: [
      ['Escreva a relação', '$A=\pi r^2$.'],
      ['Derive no tempo', '$dA/dt=2\pi r\,dr/dt$.'],
      ['Substitua os dados', '$2\pi\cdot3\cdot2=12\pi$ cm²/s.'],
    ],
  }),
  q({
    topic: 'metodo-de-newton',
    difficulty: 'medium',
    statement:
      'Para aproximar uma raiz de $f(x)=x^2-2$ pelo método de Newton, partindo de $x_0=1$, qual é $x_1$?',
    options: ['$3/2$', '$2$', '$1/2$', '$\sqrt2$'],
    correct: 0,
    hints: ["Use $x_{n+1}=x_n-f(x_n)/f'(x_n)$.", "Calcule $f(1)$ e $f'(1)$."],
    finalAnswer: '$3/2$',
    explanation:
      'O método de Newton usa a interseção com o eixo da reta tangente como próximo palpite. Uma iteração ainda não entrega a raiz exata, mas aproxima $\sqrt2$.',
    steps: [
      ['Calcule função e derivada', "$f(1)=-1$ e $f'(x)=2x$, logo $f'(1)=2$."],
      ['Aplique a fórmula', '$x_1=1-(-1)/2$.'],
      ['Simplifique', '$x_1=1+1/2=3/2$.'],
    ],
  }),
  q({
    topic: 'extremos-e-valor-medio',
    difficulty: 'medium',
    statement:
      'A temperatura $T(t)=t^3-6t^2+9t$ tem ponto crítico não nulo em qual instante?',
    options: ['$t=3$', '$t=6$', '$t=9$', '$t=1$'],
    correct: 0,
    hints: [
      "Encontre $T'(t)$ e fatore.",
      'Além de $t=0$, procure o outro zero da derivada.',
    ],
    finalAnswer: '$t=3$',
    explanation:
      'Os instantes críticos são aqueles em que a taxa de variação da temperatura se anula. Fatorar a derivada revela os dois candidatos.',
    steps: [
      ['Derive', "$T'(t)=3t^2-12t+9$."],
      ['Fatore', "$T'(t)=3(t^2-4t+3)=3(t-1)(t-3)$."],
      [
        'Escolha o crítico pedido',
        'Os críticos são $1$ e $3$; o não nulo destacado é $3$.',
      ],
    ],
  }),
  q({
    topic: 'analise-de-graficos',
    difficulty: 'easy',
    statement:
      "Se $f'(x)<0$ para $x<2$ e $f'(x)>0$ para $x>2$, o que ocorre em $x=2$?",
    options: [
      'Um mínimo local',
      'Um máximo local',
      'Nenhum extremo pode ser concluído',
      'Uma assíntota vertical',
    ],
    correct: 0,
    hints: [
      'Observe a mudança do sinal da derivada.',
      'A função passa de decrescente a crescente.',
    ],
    finalAnswer: 'Um mínimo local.',
    explanation:
      'Antes de $2$, a função desce; depois de $2$, ela sobe. Essa troca de negativo para positivo caracteriza um vale local.',
    steps: [
      [
        'Leia o lado esquerdo',
        "$f'<0$ indica função decrescente antes de $2$.",
      ],
      ['Leia o lado direito', "$f'>0$ indica função crescente depois de $2$."],
      [
        'Conclua pelo teste da primeira derivada',
        'A mudança de $-$ para $+$ produz mínimo local.',
      ],
    ],
  }),
  q({
    topic: 'otimizacao',
    difficulty: 'medium',
    statement:
      'A soma de dois números positivos é $12$. Quais valores maximizam o produto entre eles?',
    options: ['$6$ e $6$', '$12$ e $0$', '$8$ e $4$', '$10$ e $2$'],
    correct: 0,
    hints: [
      'Se um número é $x$, o outro é $12-x$.',
      'Maximize $P(x)=x(12-x)$.',
    ],
    finalAnswer: '$6$ e $6$',
    explanation:
      'O produto sob soma fixa é máximo quando os dois números se equilibram. O cálculo confirma a simetria por meio do vértice de uma parábola.',
    steps: [
      ['Modele o produto', '$P(x)=x(12-x)=12x-x^2$.'],
      ['Encontre o crítico', "$P'(x)=12-2x=0$ dá $x=6$."],
      ['Recupere o outro número', '$12-6=6$, portanto os dois são $6$.'],
    ],
  }),
  q({
    topic: 'primitivas',
    difficulty: 'easy',
    statement: 'Uma primitiva de $f(x)=6x^2$ é:',
    options: ['$2x^3+C$', '$6x^3+C$', '$3x^2+C$', '$2x^2+C$'],
    correct: 0,
    hints: [
      'Procure uma função cuja derivada seja $6x^2$.',
      'A integral de $x^n$ é $x^{n+1}/(n+1)$, com $n\\ne-1$.',
    ],
    finalAnswer: '$2x^3+C$',
    explanation:
      'Integrar desfaz a derivação. A constante $C$ é necessária porque todas as constantes têm derivada zero; portanto, não há uma única primitiva, mas uma família inteira de funções com a mesma derivada.',
    steps: [
      ['Aumente o expoente', 'A antiderivada de $x^2$ terá termo em $x^3$.'],
      [
        'Ajuste o coeficiente',
        "Para derivar em $6x^2$, usamos $2x^3$, pois $(2x^3)'=6x^2$.",
      ],
      ['Acrescente a constante', 'A família completa é $2x^3+C$.'],
    ],
  }),
  q({
    topic: 'integral-definida',
    difficulty: 'easy',
    statement: 'Calcule $\int_0^2 3x\,dx$.',
    options: ['$6$', '$12$', '$3$', '$4$'],
    correct: 0,
    hints: [
      'Encontre uma primitiva de $3x$.',
      'Depois avalie o limite superior menos o inferior.',
    ],
    finalAnswer: '$6$',
    explanation:
      'A integral definida acumula a variação entre os limites. O Teorema Fundamental do Cálculo permite calculá-la usando uma primitiva.',
    steps: [
      ['Encontre a primitiva', '$\int3x\,dx=\frac32x^2$.'],
      ['Avalie em $2$', '$\frac32(2)^2=6$.'],
      [
        'Avalie em $0$ e subtraia',
        '$\frac32(0)^2=0$, então o valor é $6-0=6$.',
      ],
    ],
  }),
  q({
    topic: 'teorema-fundamental-do-calculo',
    difficulty: 'easy',
    statement: "Se $F(x)=\int_1^x (t^2+1)\,dt$, qual é $F'(x)$?",
    options: ['$x^2+1$', '$2x$', '$x^3/3+x$', '$1$'],
    correct: 0,
    hints: [
      'Use a primeira parte do Teorema Fundamental do Cálculo.',
      'A derivada de uma integral com limite superior $x$ recupera o integrando em $x$.',
    ],
    finalAnswer: '$x^2+1$',
    explanation:
      'A integral acumulada define uma nova função. Derivá-la recupera a taxa que estava sendo acumulada, sem necessidade de calcular a integral primeiro.',
    steps: [
      ['Observe a forma', 'O limite superior é a variável $x$.'],
      ['Aplique o teorema', '$\frac d{dx}\int_1^x f(t)\,dt=f(x)$.'],
      ['Substitua o integrando', "$F'(x)=x^2+1$."],
    ],
  }),
  q({
    topic: 'substituicao',
    difficulty: 'medium',
    statement: 'Calcule $\int 2x\cos(x^2)\,dx$.',
    options: [
      '$\sin(x^2)+C$',
      '$2\sin(x^2)+C$',
      '$x^2\sin x+C$',
      '$-\sin(x^2)+C$',
    ],
    correct: 0,
    hints: [
      'A expressão $x^2$ está dentro do cosseno.',
      'Use $u=x^2$ e $du=2x\,dx$.',
    ],
    finalAnswer: '$\sin(x^2)+C$',
    explanation:
      'A substituição reconhece uma função interna acompanhada exatamente por sua derivada. Isso transforma a integral em uma forma básica de cosseno.',
    steps: [
      ['Escolha a substituição', 'Tome $u=x^2$, então $du=2x\,dx$.'],
      ['Troque as partes', 'A integral vira $\int\cos u\,du$.'],
      ['Integre e retorne', '$\int\cos u\,du=\sin u+C=\sin(x^2)+C$.'],
    ],
  }),
  q({
    topic: 'primitivas',
    difficulty: 'easy',
    statement: 'Calcule $\int (4x^3-2)\,dx$.',
    options: ['$x^4-2x+C$', '$4x^4-2+C$', '$x^4-2+C$', '$x^4-2x$'],
    correct: 0,
    hints: [
      'Integre cada termo separadamente.',
      'A integral de uma constante $-2$ é $-2x$.',
    ],
    finalAnswer: '$x^4-2x+C$',
    explanation:
      'A integral é linear: podemos tratar o termo polinomial e a constante independentemente. A constante de integração representa todas as primitivas possíveis.',
    steps: [
      ['Integre o primeiro termo', '$\int4x^3\,dx=x^4$.'],
      ['Integre a constante', '$\int-2\,dx=-2x$.'],
      ['Junte e acrescente $C$', '$x^4-2x+C$.'],
    ],
  }),
  q({
    topic: 'integral-definida',
    difficulty: 'medium',
    statement: 'Calcule $\int_1^3 (2x+1)\,dx$.',
    options: ['$10$', '$8$', '$12$', '$6$'],
    correct: 0,
    hints: [
      'Uma primitiva de $2x+1$ é $x^2+x$.',
      'Avalie em $3$ e em $1$, nesta ordem.',
    ],
    finalAnswer: '$10$',
    explanation:
      'A integral definida é a diferença entre os valores da primitiva nos extremos. Esquecer de subtrair o valor em $1$ cria um resultado excessivo.',
    steps: [
      ['Encontre a primitiva', '$\int(2x+1)\,dx=x^2+x$.'],
      ['Avalie no limite superior', '$3^2+3=12$.'],
      ['Subtraia o limite inferior', '$1^2+1=2$, então $12-2=10$.'],
    ],
  }),
  q({
    topic: 'teorema-fundamental-do-calculo',
    difficulty: 'medium',
    statement: "Se $G(x)=\int_{x}^{4} t^2\,dt$, qual é $G'(x)$?",
    options: ['$-x^2$', '$x^2$', '$16-x^2$', '$2x$'],
    correct: 0,
    hints: [
      'O limite variável está embaixo, não em cima.',
      'Trocar os limites de uma integral muda seu sinal.',
    ],
    finalAnswer: '$-x^2$',
    explanation:
      'Quando a variável é o limite inferior, aumentar $x$ remove uma pequena faixa positiva da área acumulada. Por isso surge o sinal negativo.',
    steps: [
      ['Reescreva os limites', '$G(x)=-\int_4^x t^2\,dt$.'],
      ['Aplique o Teorema Fundamental', '$\frac d{dx}\int_4^x t^2\,dt=x^2$.'],
      ['Considere o sinal', "$G'(x)=-x^2$."],
    ],
  }),
  q({
    topic: 'substituicao',
    difficulty: 'medium',
    statement: 'Calcule $\int \frac{3x^2}{1+x^3}\,dx$.',
    options: [
      '$\ln|1+x^3|+C$',
      '$3\ln|1+x^3|+C$',
      '$1/(1+x^3)+C$',
      '$x^3/(1+x^3)+C$',
    ],
    correct: 0,
    hints: ['O denominador tem derivada $3x^2$.', 'Use $u=1+x^3$.'],
    finalAnswer: '$\ln|1+x^3|+C$',
    explanation:
      'Quando o numerador é a derivada do denominador, a substituição reduz a integral à forma $\int du/u$. O valor absoluto faz a fórmula valer nos intervalos permitidos.',
    steps: [
      ['Faça a substituição', '$u=1+x^3$ e $du=3x^2\,dx$.'],
      ['Reescreva a integral', 'Obtemos $\int\frac1u\,du$.'],
      ['Integre', '$\ln|u|+C=\ln|1+x^3|+C$.'],
    ],
  }),
  q({
    topic: 'integral-definida',
    difficulty: 'medium',
    statement: 'Qual é $\int_0^1 x^2\,dx$?',
    options: ['$1/3$', '$1/2$', '$1$', '$0$'],
    correct: 0,
    hints: ['A primitiva de $x^2$ é $x^3/3$.', 'Use os dois limites.'],
    finalAnswer: '$1/3$',
    explanation:
      'A integral mede a área sob $x^2$ entre zero e um. A primitiva permite obter esse valor exato sem estimativa geométrica.',
    steps: [
      ['Integre', '$\int x^2\,dx=x^3/3$.'],
      ['Avalie em $1$', '$1^3/3=1/3$.'],
      ['Avalie em $0$', '$0^3/3=0$, logo o resultado é $1/3$.'],
    ],
  }),
  q({
    topic: 'primitivas',
    difficulty: 'medium',
    statement: 'Encontre uma primitiva de $f(x)=1/\sqrt{x}$, para $x>0$.',
    options: ['$2\sqrt{x}+C$', '$\sqrt{x}+C$', '$-2/\sqrt{x}+C$', '$\ln x+C$'],
    correct: 0,
    hints: [
      'Escreva $1/\sqrt{x}$ como $x^{-1/2}$.',
      'Aumente o expoente para $1/2$ e divida pelo novo expoente.',
    ],
    finalAnswer: '$2\sqrt{x}+C$',
    explanation:
      'Expoentes fracionários obedecem à mesma regra de potência. O coeficiente $2$ é necessário porque a derivada de $\sqrt{x}$ isolada teria apenas metade da taxa desejada.',
    steps: [
      ['Reescreva a potência', '$1/\sqrt{x}=x^{-1/2}$.'],
      ['Integre pela regra da potência', '$x^{1/2}/(1/2)+C$.'],
      ['Simplifique', '$2x^{1/2}+C=2\sqrt{x}+C$.'],
    ],
  }),
  q({
    topic: 'substituicao',
    difficulty: 'medium',
    statement: 'Calcule $\int_0^1 2x e^{x^2}\,dx$.',
    options: ['$e-1$', '$e$', '$1$', '$2e$'],
    correct: 0,
    hints: [
      'Use $u=x^2$; os limites também devem mudar.',
      'Quando $x=0$, $u=0$; quando $x=1$, $u=1$.',
    ],
    finalAnswer: '$e-1$',
    explanation:
      'A substituição funciona também em integrais definidas. Trocar os limites para a nova variável evita ter que retornar a $x$ antes de avaliar.',
    steps: [
      ['Substitua', '$u=x^2$ e $du=2x\,dx$.'],
      [
        'Atualize os limites',
        'Os limites $0$ e $1$ continuam $0$ e $1$ para $u$.',
      ],
      ['Integre', '$\int_0^1e^u\,du=e^u\big|_0^1=e-1$.'],
    ],
  }),
  q({
    topic: 'integral-definida',
    difficulty: 'medium',
    statement:
      'A velocidade é $v(t)=3t^2$ m/s. Qual deslocamento ocorre entre $t=0$ e $t=2$?',
    options: ['$8$ m', '$12$ m', '$6$ m', '$4$ m'],
    correct: 0,
    hints: [
      'Deslocamento é a integral da velocidade no tempo.',
      'Calcule $\int_0^2 3t^2\,dt$.',
    ],
    finalAnswer: '$8$ m',
    explanation:
      'Somar pequenas variações de posição ao longo do tempo equivale a integrar a velocidade. Como a velocidade é positiva, deslocamento e distância coincidem neste intervalo.',
    steps: [
      ['Modele o deslocamento', '$\Delta s=\int_0^2 3t^2\,dt$.'],
      ['Encontre a primitiva', '$\int3t^2\,dt=t^3$.'],
      ['Avalie os limites', '$2^3-0^3=8$ m.'],
    ],
  }),
];
