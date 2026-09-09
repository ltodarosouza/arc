const restoreMath = (text) =>
  typeof text === 'string'
    ? text.replace(
        /\$([^$]+)\$/g,
        (_, math) =>
          `$${math.replace(/\f/g, '\\f').replace(/(?<![A-Za-z\\])(overrightarrow|mathbb|frac|sqrt)(?![A-Za-z])/g, '\\$1')}$`,
      )
    : text;
const restore = (value) =>
  Array.isArray(value) ? value.map(restore) : restoreMath(value);
const q = (value) => ({
  source: 'Arc original Cálculo Vetorial — lote autoral 01',
  subjectId: '20000000-0000-4000-8000-000000000003',
  ...Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, restore(item)]),
  ),
});

export default [
  q({
    topic: 'componentes-e-base',
    difficulty: 'easy',
    skill: 'obter deslocamento orientado',
    statement:
      'Um drone sai de $A=(2,-1,3)$ e termina em $B=(-1,4,5)$. Qual vetor descreve esse deslocamento?',
    options: ['$(-3,5,2)$', '$(3,-5,-2)$', '$(1,3,8)$', '$(-1,4,5)$'],
    correct: 0,
    hints: [
      'O deslocamento deve ser somado à posição inicial para produzir a final.',
      'Escreva $\overrightarrow{AB}=B-A$.',
      'Confira se $A+\overrightarrow{AB}$ devolve $B$.',
    ],
    finalAnswer: '$\overrightarrow{AB}=(-3,5,2)$.',
    explanation:
      'Um deslocamento orientado depende da ordem dos pontos. Subtrair a posição inicial da final registra a variação em cada eixo e evita inverter o sentido.',
    steps: [
      ['Fixe a orientação', 'O vetor pedido parte de $A$ e chega a $B$.'],
      ['Subtraia as coordenadas', '$(-1-2,4-(-1),5-3)=(-3,5,2)$.'],
      ['Teste a recomposição', '$(2,-1,3)+(-3,5,2)=(-1,4,5)$.'],
      ['Conclua', 'A alternativa A tem o sentido e as componentes corretos.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'easy',
    skill: 'interpretar segmentos equipolentes',
    statement:
      'Os segmentos orientados $\overrightarrow{AB}$ e $\overrightarrow{CD}$ têm a mesma direção, o mesmo sentido e o mesmo comprimento. Qual afirmação é correta?',
    options: [
      'Eles representam o mesmo vetor.',
      'Eles têm necessariamente a mesma origem.',
      'Eles determinam a mesma reta.',
      'Eles têm extremidades idênticas.',
    ],
    correct: 0,
    hints: [
      'Um vetor é uma classe de segmentos orientados equipolentes.',
      'A posição do segmento não faz parte das características do vetor.',
      'Compare direção, sentido e módulo.',
    ],
    finalAnswer: 'Eles representam o mesmo vetor.',
    explanation:
      'Vetores livres não ficam presos ao ponto onde foram desenhados. Segmentos com direção, sentido e comprimento iguais são representantes do mesmo vetor, mesmo em retas paralelas distintas.',
    steps: [
      [
        'Liste os dados',
        'As três propriedades que caracterizam um vetor coincidem.',
      ],
      ['Use a definição', 'Segmentos com essas propriedades são equipolentes.'],
      [
        'Separe posição de vetor',
        'Origem e extremidade podem mudar sem mudar o vetor.',
      ],
      ['Conclua', 'Somente a alternativa A expressa essa equivalência.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'medium',
    skill: 'reconstruir extremidade por translação',
    statement:
      'Um vetor $v=(-4,3,1)$ é aplicado com origem em $P=(5,-2,0)$. Qual é sua extremidade?',
    options: ['$(1,1,1)$', '$(9,-5,-1)$', '$(-4,3,1)$', '$(1,-5,1)$'],
    correct: 0,
    hints: [
      'A extremidade é obtida somando o vetor à origem.',
      'Some componentes de mesma posição.',
      'Não use subtração: o vetor já informa a variação orientada.',
    ],
    finalAnswer: '$Q=(1,1,1)$.',
    explanation:
      'Aplicar um vetor em um ponto é fazer uma translação. Cada componente de $v$ informa quanto a coordenada correspondente de $P$ deve variar.',
    steps: [
      ['Escreva a translação', '$Q=P+v$.'],
      ['Some a primeira coordenada', '$5+(-4)=1$.'],
      ['Complete as demais', '$-2+3=1$ e $0+1=1$.'],
      ['Verifique', '$Q-P=(-4,3,1)$, como exigido.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'medium',
    skill: 'verificar colinearidade por proporcionalidade',
    statement: 'Qual vetor é colinear a $u=(2,-3,1)$ e tem sentido oposto?',
    options: ['$(-4,6,-2)$', '$(4,-6,2)$', '$(-2,-3,-1)$', '$(2,3,-1)$'],
    correct: 0,
    hints: [
      'Vetores colineares são múltiplos escalares um do outro.',
      'Sentido oposto exige escalar negativo.',
      'Teste se um único fator funciona nas três componentes.',
    ],
    finalAnswer: '$(-4,6,-2)$.',
    explanation:
      'A colinearidade exige proporcionalidade global, não apenas sinais parecidos. Multiplicar $u$ por $-2$ preserva a direção da reta e inverte o sentido.',
    steps: [
      ['Imponha a forma', 'Procure $v=ku$ com $k<0$.'],
      ['Escolha o fator', '$k=-2$ produz sentido oposto.'],
      ['Calcule', '$-2(2,-3,1)=(-4,6,-2)$.'],
      [
        'Elimine distrações',
        'Nas demais, as componentes não têm o mesmo fator negativo.',
      ],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'medium',
    skill: 'determinar parâmetro pela igualdade vetorial',
    statement:
      'Para qual valor de $t$ os vetores $(t,2t-1,4)$ e $(3,5,4)$ são iguais?',
    options: ['$t=3$', '$t=2$', '$t=5$', '$t=-3$'],
    correct: 0,
    hints: [
      'Vetores iguais possuem todas as componentes correspondentes iguais.',
      'A primeira componente já determina $t$.',
      'Use a segunda componente para conferir, não para criar outra resposta.',
    ],
    finalAnswer: '$t=3$.',
    explanation:
      'A igualdade vetorial equivale a um conjunto de igualdades escalares. Como as componentes devem coincidir simultaneamente, uma solução só é válida se respeitar todas elas.',
    steps: [
      ['Compare a primeira entrada', '$t=3$.'],
      ['Cheque a segunda', '$2(3)-1=5$.'],
      ['Cheque a terceira', 'As duas terceiras componentes já valem $4$.'],
      ['Conclua', 'O único parâmetro compatível é $3$.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'hard',
    skill: 'usar ponto médio para recuperar extremo',
    statement:
      'O ponto médio de $AB$ é $M=(1,3,-2)$ e $A=(-2,5,4)$. Qual é o ponto $B$?',
    options: ['$(4,1,-8)$', '$(-1,4,1)$', '$(3,-2,-6)$', '$(2,6,0)$'],
    correct: 0,
    hints: [
      'Use $M=(A+B)/2$.',
      'Isole $B$ antes de substituir as coordenadas.',
      'A resposta deve deixar $M$ exatamente no meio de $A$ e $B$.',
    ],
    finalAnswer: '$B=(4,1,-8)$.',
    explanation:
      'O ponto médio é a média componente a componente. Recuperar uma extremidade exige desfazer essa média, isto é, dobrar o ponto médio e subtrair a extremidade conhecida.',
    steps: [
      ['Isole a incógnita', '$B=2M-A$.'],
      ['Dobre o ponto médio', '$2M=(2,6,-4)$.'],
      ['Subtraia A', '$(2,6,-4)-(-2,5,4)=(4,1,-8)$.'],
      ['Confira', 'A média de $A$ e $B$ é $(1,3,-2)$.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'hard',
    skill: 'decompor deslocamento por pontos intermediários',
    statement:
      'Um percurso vai de $A=(1,0,-1)$ para $B=(3,2,0)$ e depois para $C=(2,5,4)$. Qual é o deslocamento direto de $A$ para $C$?',
    options: ['$(1,5,5)$', '$(-1,3,4)$', '$(5,7,3)$', '$(-1,-5,-5)$'],
    correct: 0,
    hints: [
      'O deslocamento total independe do caminho intermediário.',
      'Você pode calcular $C-A$ ou somar $\overrightarrow{AB}$ e $\overrightarrow{BC}$.',
      'Compare o resultado com a mudança de cada coordenada entre A e C.',
    ],
    finalAnswer: '$\overrightarrow{AC}=(1,5,5)$.',
    explanation:
      'Deslocamentos se compõem pela regra do triângulo. O ponto intermediário cancela ao somar os dois vetores, deixando apenas a diferença entre chegada e partida.',
    steps: [
      ['Calcule diretamente', '$\overrightarrow{AC}=C-A$.'],
      ['Subtraia coordenadas', '$(2-1,5-0,4-(-1))=(1,5,5)$.'],
      [
        'Relacione ao caminho',
        '$\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$.',
      ],
      ['Conclua', 'A alternativa A mede a variação líquida do percurso.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'hard',
    skill: 'interpretar coordenada nula em deslocamento',
    statement:
      'Um objeto se desloca de $P=(-1,4,2)$ para $Q=(3,4,-5)$. Qual interpretação geométrica é correta?',
    options: [
      'A coordenada y permanece constante durante a translação.',
      'O deslocamento é paralelo ao eixo y.',
      'O objeto não varia em z.',
      'O deslocamento tem módulo zero.',
    ],
    correct: 0,
    hints: [
      'Calcule ou observe a diferença entre coordenadas correspondentes.',
      'Uma componente nula indica ausência de variação naquele eixo.',
      'Não confunda componente nula com vetor nulo.',
    ],
    finalAnswer: 'A coordenada y permanece constante durante a translação.',
    explanation:
      'A segunda coordenada vale $4$ nos dois pontos, então a componente y do deslocamento é zero. Ainda há variações em x e z; portanto o vetor não é nulo nem paralelo ao eixo y.',
    steps: [
      ['Compare y', '$4-4=0$.'],
      ['Forme o deslocamento', '$Q-P=(4,0,-7)$.'],
      ['Interprete o zero', 'Não há deslocamento na direção y.'],
      ['Conclua', 'A altura y é preservada entre P e Q.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'easy',
    skill: 'calcular soma vetorial',
    statement:
      'Dois deslocamentos são $u=(3,-2,1)$ e $v=(-5,4,0)$. Qual é o deslocamento resultante $u+v$?',
    options: ['$(-2,2,1)$', '$(8,-6,1)$', '$(-2,-2,1)$', '$(2,-2,1)$'],
    correct: 0,
    hints: [
      'A soma de vetores usa componentes correspondentes.',
      'Não altere o sinal já presente em cada parcela.',
      'O resultado deve combinar as três variações dos eixos.',
    ],
    finalAnswer: '$u+v=(-2,2,1)$.',
    explanation:
      'A adição vetorial soma separadamente as variações em x, y e z. Ela representa aplicar um deslocamento e depois o outro.',
    steps: [
      [
        'Alinhe componentes',
        'Some primeira com primeira, segunda com segunda e terceira com terceira.',
      ],
      ['Calcule', '$(3-5,-2+4,1+0)=(-2,2,1)$.'],
      [
        'Interprete',
        'O resultado descreve o efeito combinado dos dois deslocamentos.',
      ],
      ['Confira sinais', 'A componente y é positiva porque $4$ supera $-2$.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'medium',
    skill: 'calcular combinação linear',
    statement: 'Para $u=(1,-2,3)$ e $v=(4,1,-1)$, determine $2u-v$.',
    options: ['$(-2,-5,7)$', '$(6,-3,5)$', '$(-2,-3,7)$', '$(2,-5,7)$'],
    correct: 0,
    hints: [
      'Multiplique primeiro todas as componentes de u por 2.',
      'Depois subtraia a componente correspondente de v.',
      'A terceira componente envolve subtrair um número negativo.',
    ],
    finalAnswer: '$2u-v=(-2,-5,7)$.',
    explanation:
      'Em uma combinação linear, o escalar distribui-se por todas as componentes. A subtração seguinte deve preservar especialmente os sinais de v.',
    steps: [
      ['Escale u', '$2u=(2,-4,6)$.'],
      ['Subtraia v', '$(2,-4,6)-(4,1,-1)$.'],
      ['Calcule entradas', '$(-2,-5,7)$.'],
      ['Verifique o sinal', '$6-(-1)=7$, não $5$.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'medium',
    skill: 'identificar combinação que produz vetor nulo',
    statement: 'Se $u=(2,-1,3)$, qual expressão produz o vetor nulo?',
    options: ['$u+(-u)$', '$2u-u$', '$u-2u$', '$u+(2,-1,3)$'],
    correct: 0,
    hints: [
      'O oposto de um vetor troca o sinal de todas as componentes.',
      'Um vetor somado a seu oposto cancela em cada eixo.',
      'Teste uma componente para distinguir as alternativas.',
    ],
    finalAnswer: '$u+(-u)=(0,0,0)$.',
    explanation:
      'O vetor oposto tem mesma direção e módulo, mas sentido contrário. A soma de um vetor com seu oposto cancela todas as componentes.',
    steps: [
      ['Encontre o oposto', '$-u=(-2,1,-3)$.'],
      ['Some', '$(2,-1,3)+(-2,1,-3)=(0,0,0)$.'],
      ['Compare B e C', 'Elas produzem $u$ e $-u$, que não são nulos.'],
      ['Conclua', 'Apenas a alternativa A representa cancelamento total.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'hard',
    skill: 'resolver parâmetro em combinação linear',
    statement:
      'Para qual valor de $k$ o vetor $w=(7,-1,5)$ pode ser escrito como $ku+(1,2,-1)$, onde $u=(2,-1,2)$?',
    options: ['$k=3$', '$k=2$', '$k=-3$', '$k=4$'],
    correct: 0,
    hints: [
      'Subtraia o vetor conhecido de w.',
      'O resultado deve ser um múltiplo de u.',
      'Use mais de uma componente para confirmar o escalar.',
    ],
    finalAnswer: '$k=3$.',
    explanation:
      'Isolar a parcela desconhecida transforma a expressão vetorial em uma proporcionalidade. O mesmo escalar precisa explicar as três componentes.',
    steps: [
      ['Isole ku', '$ku=w-(1,2,-1)=(6,-3,6)$.'],
      ['Compare com u', '$(6,-3,6)=3(2,-1,2)$.'],
      ['Leia o escalar', '$k=3$.'],
      ['Verifique', '$3u+(1,2,-1)=(7,-1,5)$.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'easy',
    skill: 'distinguir ponto de vetor',
    statement:
      'Qual notação representa corretamente o vetor que vai de $A$ até $B$?',
    options: [
      '$\overrightarrow{AB}=B-A$',
      '$\overrightarrow{AB}=A-B$',
      '$\overrightarrow{AB}=A+B$',
      '$\overrightarrow{AB}=|B-A|$',
    ],
    correct: 0,
    hints: [
      'A ordem do símbolo indica partida e chegada.',
      'O vetor deve apontar de A para B.',
      'O módulo é um número, não o vetor solicitado.',
    ],
    finalAnswer: '$\overrightarrow{AB}=B-A$.',
    explanation:
      'A diferença final menos inicial produz a variação que, somada a A, chega a B. Inverter a ordem produz o vetor de B para A.',
    steps: [
      ['Leia a orientação', 'AB significa partir de A e chegar a B.'],
      ['Monte a diferença', 'Chegada menos partida: $B-A$.'],
      ['Teste', '$A+(B-A)=B$.'],
      ['Elimine D', '$|B-A|$ perde direção e vira escalar.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'medium',
    skill: 'usar relação de Chasles',
    statement:
      'Sabendo que $\overrightarrow{AB}=(2,1,-3)$ e $\overrightarrow{BC}=(-4,0,5)$, determine $\overrightarrow{AC}$.',
    options: ['$(-2,1,2)$', '$(6,1,-8)$', '$(-2,-1,2)$', '$(2,1,-3)$'],
    correct: 0,
    hints: [
      'Use a regra do triângulo para vetores consecutivos.',
      'Some AB e BC componente a componente.',
      'A letra B deve desaparecer no deslocamento total.',
    ],
    finalAnswer: '$\overrightarrow{AC}=(-2,1,2)$.',
    explanation:
      'A relação de Chasles decompõe um deslocamento em etapas consecutivas. Somar as duas etapas leva diretamente de A a C.',
    steps: [
      [
        'Use a relação',
        '$\overrightarrow{AC}=\overrightarrow{AB}+\overrightarrow{BC}$.',
      ],
      ['Some', '$(2-4,1+0,-3+5)$.'],
      ['Obtenha o total', '$(-2,1,2)$.'],
      ['Interprete', 'O resultado não depende da posição intermediária B.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'hard',
    skill: 'diagnosticar erro de sinal em deslocamento',
    statement:
      'Uma estudante calculou $\overrightarrow{PQ}$ para $P=(1,-2,4)$ e $Q=(5,3,1)$ e obteve $(4,5,3)$. Qual correção é necessária?',
    options: [
      'A terceira componente deve ser $-3$.',
      'A primeira componente deve ser $-4$.',
      'A segunda componente deve ser $-5$.',
      'Nenhuma: o cálculo está correto.',
    ],
    correct: 0,
    hints: [
      'Recalcule apenas a componente z.',
      'A variação em z é coordenada final menos inicial.',
      'Observe que 1 é menor que 4.',
    ],
    finalAnswer: 'A terceira componente deve ser $-3$.',
    explanation:
      'O erro está na subtração da terceira coordenada. Como o ponto final tem z menor, o deslocamento nessa direção precisa ser negativo.',
    steps: [
      ['Calcule z', '$1-4=-3$.'],
      ['Confira x e y', '$5-1=4$ e $3-(-2)=5$.'],
      ['Monte o vetor', '$\overrightarrow{PQ}=(4,5,-3)$.'],
      ['Diagnostique', 'Foi perdido o sinal negativo na última componente.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'medium',
    skill: 'interpretar deslocamento em plano coordenado',
    statement:
      'Um vetor em $\mathbb R^3$ é $v=(0,-6,0)$. Qual movimento ele representa?',
    options: [
      'Seis unidades no sentido negativo de y.',
      'Seis unidades no sentido positivo de y.',
      'Seis unidades no sentido negativo de x.',
      'Um deslocamento nulo.',
    ],
    correct: 0,
    hints: [
      'Componentes nulas não geram movimento nos respectivos eixos.',
      'O sinal da componente não nula define o sentido.',
      'O módulo é 6, mas a direção é y.',
    ],
    finalAnswer: 'Seis unidades no sentido negativo de y.',
    explanation:
      'O vetor tem apenas a segunda componente diferente de zero. Por isso o movimento fica restrito ao eixo y e seu sinal negativo aponta no sentido decrescente.',
    steps: [
      ['Observe x e z', 'As componentes nulas preservam x e z.'],
      ['Leia y', '$-6$ indica seis unidades no sentido negativo.'],
      ['Calcule o módulo', '$|v|=6$.'],
      ['Conclua', 'A alternativa A inclui módulo, eixo e sentido corretos.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'hard',
    skill: 'comparar trajetos por deslocamento líquido',
    statement:
      'Dois robôs partem da origem. O primeiro executa $(2,1,0)$ e depois $(1,-3,4)$; o segundo executa $(3,-2,4)$. O que se conclui?',
    options: [
      'Eles terminam no mesmo ponto.',
      'O primeiro percorre distância total menor.',
      'O segundo termina no oposto do primeiro.',
      'Os trajetos têm o mesmo primeiro deslocamento.',
    ],
    correct: 0,
    hints: [
      'Some os dois deslocamentos do primeiro robô.',
      'Compare o vetor resultante, não apenas o número de etapas.',
      'Trajetos diferentes podem ter a mesma posição final.',
    ],
    finalAnswer: 'Eles terminam no mesmo ponto.',
    explanation:
      'A posição final depende da soma dos deslocamentos. O primeiro robô realiza duas etapas cuja resultante coincide com o único deslocamento do segundo.',
    steps: [
      ['Some o primeiro trajeto', '$(2,1,0)+(1,-3,4)=(3,-2,4)$.'],
      ['Leia o segundo', 'Ele já executa $(3,-2,4)$.'],
      ['Compare resultados', 'As posições finais são iguais.'],
      [
        'Diferencie percurso',
        'O caminho e o comprimento percorrido podem ser distintos.',
      ],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'easy',
    skill: 'identificar vetor posição',
    statement: 'Qual é o vetor posição do ponto $R=(-3,2,6)$?',
    options: [
      '$(-3,2,6)$',
      '$(3,-2,-6)$',
      '$\overrightarrow{R0}$',
      '$\sqrt{49}$',
    ],
    correct: 0,
    hints: [
      'O vetor posição parte da origem.',
      'Sua extremidade é o ponto dado.',
      'As componentes registram a posição do ponto.',
    ],
    finalAnswer: '$\overrightarrow{OR}=(-3,2,6)$.',
    explanation:
      'O vetor posição liga a origem ao ponto. Como a origem possui coordenadas nulas, a diferença R-O coincide com as coordenadas de R.',
    steps: [
      ['Defina o vetor', '$\overrightarrow{OR}=R-O$.'],
      ['Use a origem', '$O=(0,0,0)$.'],
      ['Subtraia', '$(-3,2,6)-(0,0,0)=(-3,2,6)$.'],
      [
        'Conclua',
        'O vetor e as coordenadas do ponto têm a mesma lista de componentes.',
      ],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'medium',
    skill: 'encontrar ponto que divide segmento em razão',
    statement:
      'O ponto $T$ está no segmento de $A=(0,0,0)$ a $B=(6,3,-3)$ e satisfaz $\overrightarrow{AT}=\frac{1}{3}\overrightarrow{AB}$. Qual é T?',
    options: [
      '$(2,1,-1)$',
      '$(3,\frac{3}{2},-\frac{3}{2})$',
      '$(6,3,-3)$',
      '$(-2,-1,1)$',
    ],
    correct: 0,
    hints: [
      'Primeiro calcule o vetor AB.',
      'Multiplique todas as componentes por um terço.',
      'Como A é a origem, o vetor AT já fornece as coordenadas de T.',
    ],
    finalAnswer: '$T=(2,1,-1)$.',
    explanation:
      'Dividir um segmento em uma razão usa um múltiplo do vetor que liga suas extremidades. O fator um terço posiciona T a um terço do caminho a partir de A.',
    steps: [
      ['Calcule AB', '$\overrightarrow{AB}=(6,3,-3)$.'],
      ['Aplique a razão', '$\overrightarrow{AT}=(2,1,-1)$.'],
      ['Use a origem', '$T=A+\overrightarrow{AT}=(2,1,-1)$.'],
      ['Verifique', '$3\overrightarrow{AT}=\overrightarrow{AB}$.'],
    ],
  }),
  q({
    topic: 'componentes-e-base',
    difficulty: 'hard',
    skill: 'determinar ponto por condição vetorial',
    statement:
      'Encontre $X$ sabendo que $\overrightarrow{AX}=(3,-4,2)$ e que $A=(-1,5,0)$.',
    options: ['$(2,1,2)$', '$(-4,9,-2)$', '$(3,-4,2)$', '$(4,-9,2)$'],
    correct: 0,
    hints: [
      'A relação vetorial significa $X-A=\overrightarrow{AX}$.',
      'Isole X somando A aos dois lados.',
      'Confira subtraindo A do ponto encontrado.',
    ],
    finalAnswer: '$X=(2,1,2)$.',
    explanation:
      'Um vetor com origem conhecida determina sua extremidade por translação. Somar suas componentes às coordenadas de A encontra o único ponto X compatível.',
    steps: [
      ['Isole a extremidade', '$X=A+\overrightarrow{AX}$.'],
      ['Some as coordenadas', '$(-1,5,0)+(3,-4,2)$.'],
      ['Obtenha X', '$(2,1,2)$.'],
      ['Confira', '$X-A=(3,-4,2)$.'],
    ],
  }),
];
