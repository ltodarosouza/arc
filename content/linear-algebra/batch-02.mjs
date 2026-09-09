import { q, r } from './helpers.mjs';

export default [
  q({
    topic: 'subespacos-vetoriais',
    difficulty: 'easy',
    skill: 'reconhecer subespaço definido por equação homogênea',
    commandType: 'classificação por propriedade',
    commonError: 'confundir reta afim com subespaço',
    statement: r`Qual conjunto é um subespaço de $\mathbb R^2$?`,
    options: [
      r`$\{(x,y):x-2y=0\}$`,
      r`$\{(x,y):x-2y=1\}$`,
      r`$\{(x,y):x\ge0\}$`,
      r`$\{(x,y):xy=0\}$`,
    ],
    correct: 0,
    hints: [
      'Um subespaço precisa conter o vetor nulo.',
      'Equações lineares homogêneas descrevem núcleos de transformações lineares.',
      'Confira também se somas e múltiplos permanecem no conjunto.',
    ],
    finalAnswer: r`$\{(x,y):x-2y=0\}$`,
    explanation:
      'O conjunto solução de uma equação linear homogênea contém o zero e é fechado por soma e multiplicação escalar. Os demais conjuntos falham em pelo menos uma dessas condições.',
    steps: [
      ['Teste o vetor nulo', 'A igualdade $0-2\cdot0=0$ é verdadeira.'],
      [
        'Teste a soma',
        'Se $x_1-2y_1=0$ e $x_2-2y_2=0$, então $(x_1+x_2)-2(y_1+y_2)=0$.',
      ],
      [
        'Teste escalares',
        'Multiplicar uma solução por $c$ mantém a igualdade homogênea.',
      ],
      [
        'Compare os demais',
        'O segundo não contém zero; os dois últimos não são fechados pelas operações.',
      ],
    ],
  }),
  q({
    topic: 'combinacoes-e-geradores',
    difficulty: 'easy',
    skill: 'testar pertinência a subespaço gerado por um vetor',
    commandType: 'classificação por proporcionalidade',
    commonError: 'comparar apenas uma componente dos vetores',
    statement: r`Seja $L=\operatorname{span}\{(2,-1)\}\subset\mathbb R^2$. Qual vetor pertence a $L$?`,
    options: ['$(6,-3)$', '$(6,3)$', '$(-2,-2)$', '$(2,1)$'],
    correct: 0,
    hints: [
      'Um vetor em $L$ precisa ser múltiplo de $(2,-1)$.',
      'Teste se o mesmo escalar transforma as duas componentes.',
      'Procure um múltiplo inteiro simples do gerador.',
    ],
    finalAnswer: '$(6,-3)$',
    explanation:
      'Um subespaço gerado por um único vetor é a reta formada por todos os seus múltiplos escalares. É preciso verificar as duas componentes com o mesmo escalar.',
    steps: [
      ['Use a definição de gerador', r`$L=\{c(2,-1):c\in\mathbb R\}$.`],
      ['Teste a primeira alternativa', '$3(2,-1)=(6,-3)$.'],
      ['Verifique as duas componentes', 'O mesmo escalar $3$ produz simultaneamente $6$ e $-3$.'],
      ['Elimine os demais', 'Eles não são múltiplos de $(2,-1)$ com um único escalar.'],
    ],
  }),
  q({
    topic: 'independencia-linear',
    difficulty: 'easy',
    skill: 'detectar dependência imediata',
    commandType: 'identificação de contraexemplo',
    commonError: 'considerar o vetor zero independente',
    statement: r`Qual conjunto é necessariamente linearmente dependente?`,
    options: [
      r`$\{(1,0),(0,0)\}$`,
      r`$\{(1,0),(0,1)\}$`,
      r`$\{(1,1),(1,-1)\}$`,
      r`$\{(2,1)\}$`,
    ],
    correct: 0,
    hints: [
      'Dependência significa existir uma combinação nula com coeficientes não todos nulos.',
      'Observe se algum vetor pode receber coeficiente não nulo sem alterar a soma.',
      'Um conjunto que contém o vetor nulo tem uma relação imediata.',
    ],
    finalAnswer: r`$\{(1,0),(0,0)\}$`,
    explanation:
      'Se o vetor zero pertence ao conjunto, basta atribuir a ele um coeficiente não nulo e zero aos demais para obter uma combinação nula não trivial. Isso prova dependência.',
    steps: [
      [
        'Use a definição',
        'Procure coeficientes não todos zero cuja combinação seja o vetor nulo.',
      ],
      ['Explore o vetor nulo', '$0(1,0)+1(0,0)=(0,0)$.'],
      [
        'Observe os coeficientes',
        'O segundo coeficiente vale $1$, então a relação não é trivial.',
      ],
      [
        'Conclua',
        'O primeiro conjunto é dependente independentemente de qualquer cálculo adicional.',
      ],
    ],
  }),
  q({
    topic: 'bases-e-dimensao',
    difficulty: 'easy',
    skill: 'reconhecer base de espaço bidimensional',
    commandType: 'verificação estrutural',
    commonError: 'confundir dois vetores distintos com independentes',
    statement: r`Qual par forma uma base de $\mathbb R^2$?`,
    options: [
      r`$\{(1,1),(1,-1)\}$`,
      r`$\{(1,2),(2,4)\}$`,
      r`$\{(0,0),(1,0)\}$`,
      r`$\{(2,2),(-1,-1)\}$`,
    ],
    correct: 0,
    hints: [
      'Em $\mathbb R^2$, dois vetores formam base quando são independentes.',
      'Coloque os vetores como colunas de uma matriz $2\times2$.',
      'Um determinante não nulo confirma a independência.',
    ],
    finalAnswer: r`$\{(1,1),(1,-1)\}$`,
    explanation:
      'Uma base de $\mathbb R^2$ precisa ter dois vetores linearmente independentes. O primeiro par tem determinante não nulo; nos demais, há vetor zero ou vetores proporcionais.',
    steps: [
      ['Monte a matriz', r`$\begin{pmatrix}1&1\\1&-1\end{pmatrix}$.`],
      ['Calcule o determinante', '$1\cdot(-1)-1\cdot1=-2$.'],
      [
        'Interprete',
        'Como o determinante é não nulo, as colunas são independentes.',
      ],
      [
        'Conclua a geração',
        'Dois vetores independentes em $\mathbb R^2$ também geram todo o espaço.',
      ],
    ],
  }),
  q({
    topic: 'bases-e-dimensao',
    difficulty: 'easy',
    skill: 'determinar dimensão de espaço polinomial',
    commandType: 'leitura de representação',
    commonError: 'contar o grau em vez dos coeficientes',
    statement: r`Qual é a dimensão do espaço $P_2$ dos polinômios reais de grau menor ou igual a $2$?`,
    options: ['$3$', '$2$', '$1$', '$4$'],
    correct: 0,
    hints: [
      'Escreva a forma geral de um polinômio desse espaço.',
      'Conte quantos coeficientes podem variar independentemente.',
      'A base padrão começa com $1$ e termina em $x^2$.',
    ],
    finalAnswer: '$3$',
    explanation:
      'Cada polinômio de $P_2$ é determinado por três coeficientes reais independentes. A base padrão contém $1$, $x$ e $x^2$, portanto possui três elementos.',
    steps: [
      ['Escreva um elemento geral', '$p(x)=a+bx+cx^2$.'],
      ['Separe os geradores', '$p=a\cdot1+b\cdot x+c\cdot x^2$.'],
      [
        'Verifique independência',
        'Nenhuma combinação não trivial de $1,x,x^2$ é o polinômio zero.',
      ],
      ['Conte a base', 'A base tem três vetores, logo $\dim P_2=3$.'],
    ],
  }),
  q({
    topic: 'espacos-fundamentais',
    difficulty: 'easy',
    skill: 'selecionar base do espaço coluna',
    commandType: 'seleção de colunas pivô',
    commonError: 'usar colunas da forma escalonada como base original',
    statement: r`Para $A=\begin{pmatrix}1&2&0\\0&0&1\end{pmatrix}$, qual conjunto é uma base de $\operatorname{Col}(A)$?`,
    options: [
      r`$\{(1,0),(0,1)\}$`,
      r`$\{(1,0),(2,0)\}$`,
      r`$\{(2,0),(0,1)\}$`,
      r`$\{(1,0),(2,0),(0,1)\}$`,
    ],
    correct: 0,
    hints: [
      'O espaço coluna é gerado pelas colunas da matriz original.',
      'Elimine colunas que são múltiplas de outras.',
      'A primeira e a terceira colunas apontam em direções distintas.',
    ],
    finalAnswer: r`$\{(1,0),(0,1)\}$`,
    explanation:
      'As colunas primeira e terceira são independentes e já geram as duas direções de $\mathbb R^2$. A segunda coluna é duas vezes a primeira e não acrescenta dimensão.',
    steps: [
      ['Liste as colunas', '$c_1=(1,0)$, $c_2=(2,0)$ e $c_3=(0,1)$.'],
      ['Remova a redundância', '$c_2=2c_1$.'],
      ['Verifique as restantes', '$c_1$ e $c_3$ são independentes.'],
      [
        'Forme a base',
        'Assim, $\{c_1,c_3\}$ é uma base de $\operatorname{Col}(A)$.',
      ],
    ],
  }),
  q({
    topic: 'subespacos-vetoriais',
    difficulty: 'medium',
    skill: 'mostrar que união de subespaços pode falhar',
    commandType: 'análise de fechamento',
    commonError: 'confundir união com soma de subespaços',
    statement: r`Sejam $U=\{(x,0):x\in\mathbb R\}$ e $V=\{(0,y):y\in\mathbb R\}$. Por que $U\cup V$ não é subespaço de $\mathbb R^2$?`,
    options: [
      'Não é fechado por soma.',
      'Não contém o vetor nulo.',
      'Não é fechado por opostos.',
      'Não contém vetores não nulos.',
    ],
    correct: 0,
    hints: [
      'Procure um vetor simples em cada eixo.',
      'Some um elemento de $U$ com um elemento de $V$.',
      'Confira se o resultado permanece sobre algum dos dois eixos.',
    ],
    finalAnswer: 'Não é fechado por soma.',
    explanation:
      'A união contém cada eixo separadamente, mas um vetor de um eixo somado a um vetor do outro geralmente sai de ambos. A soma de subespaços, ao contrário da união, incluiria essas combinações.',
    steps: [
      ['Escolha elementos', 'Temos $(1,0)\in U$ e $(0,1)\in V$.'],
      ['Some', 'A soma é $(1,1)$.'],
      ['Teste a união', 'O vetor $(1,1)$ não pertence a $U$ nem a $V$.'],
      ['Conclua', 'A união falha no fechamento por soma e não é subespaço.'],
    ],
  }),
  q({
    topic: 'combinacoes-e-geradores',
    difficulty: 'medium',
    skill: 'decidir pertinência ao espaço gerado',
    commandType: 'resolução de representação',
    commonError: 'comparar apenas duas coordenadas',
    statement: r`O vetor $w=(4,1,5)$ pertence a $\operatorname{span}\{(1,0,1),(0,1,1)\}$. Qual combinação o produz?`,
    options: ['$4u+v$', '$u+4v$', '$4u-v$', '$5u+v$'],
    correct: 0,
    hints: [
      'Use as duas primeiras coordenadas para determinar os coeficientes.',
      'Depois confira a terceira coordenada, em vez de presumir pertinência.',
      'Nomeie os geradores como $u$ e $v$.',
    ],
    finalAnswer: '$4u+v$',
    explanation:
      'As primeiras coordenadas fixam os coeficientes da combinação, e a terceira serve como teste de compatibilidade. Aqui o mesmo par de coeficientes reproduz todas as entradas.',
    steps: [
      ['Escreva a combinação', '$au+bv=(a,b,a+b)$.'],
      ['Compare as primeiras entradas', '$a=4$ e $b=1$.'],
      ['Confira a terceira', '$a+b=4+1=5$, como em $w$.'],
      ['Conclua', 'Logo $w=4u+v$ e pertence ao espaço gerado.'],
    ],
  }),
  q({
    topic: 'independencia-linear',
    difficulty: 'medium',
    skill: 'encontrar parâmetro de dependência',
    commandType: 'análise paramétrica',
    commonError: 'testar somente vetores aos pares',
    statement: r`Os vetores $(1,0,1)$, $(0,1,1)$ e $(1,1,a)$ são linearmente dependentes para qual valor de $a$?`,
    options: ['$a=2$', '$a=0$', '$a=1$', '$a=-2$'],
    correct: 0,
    hints: [
      'Observe a soma dos dois primeiros vetores.',
      'Compare essa soma com o terceiro vetor.',
      'Alternativamente, use o determinante da matriz com esses vetores como colunas.',
    ],
    finalAnswer: '$a=2$',
    explanation:
      'A dependência ocorre quando o terceiro vetor entra no plano gerado pelos dois primeiros. Sua primeira e segunda coordenadas já exigem a soma desses vetores, fixando a terceira coordenada.',
    steps: [
      ['Some os primeiros vetores', '$(1,0,1)+(0,1,1)=(1,1,2)$.'],
      ['Compare com o terceiro', 'O terceiro é $(1,1,a)$.'],
      ['Imponha a igualdade', 'Eles coincidem exatamente quando $a=2$.'],
      [
        'Exiba a relação',
        'Nesse caso, $v_1+v_2-v_3=0$ é uma relação não trivial.',
      ],
    ],
  }),
  q({
    topic: 'bases-e-dimensao',
    difficulty: 'medium',
    skill: 'estender conjunto independente a uma base',
    commandType: 'escolha de complemento',
    commonError: 'adicionar vetor já gerado',
    statement: r`O conjunto $S=\{(1,0,1),(0,1,1)\}$ é independente em $\mathbb R^3$. Qual vetor pode ser acrescentado para formar uma base de $\mathbb R^3$?`,
    options: ['$(0,0,1)$', '$(1,1,2)$', '$(2,0,2)$', '$(-1,1,0)$'],
    correct: 0,
    hints: [
      'O terceiro vetor não pode pertencer ao plano gerado por $S$.',
      'Um vetor gerado por $S$ tem a forma $(a,b,a+b)$.',
      'Teste se a terceira coordenada do candidato é a soma das duas primeiras.',
    ],
    finalAnswer: '$(0,0,1)$',
    explanation:
      'Os vetores gerados por $S$ satisfazem $z=x+y$. O candidato $(0,0,1)$ viola essa equação, portanto está fora do plano e amplia o conjunto independente para três vetores.',
    steps: [
      ['Descreva o plano gerado', '$a(1,0,1)+b(0,1,1)=(a,b,a+b)$.'],
      [
        'Teste o primeiro candidato',
        'Para $(0,0,1)$, teríamos de ter $1=0+0$, o que é falso.',
      ],
      [
        'Conclua independência',
        'Logo o candidato não está no espaço gerado pelos dois vetores.',
      ],
      [
        'Use a dimensão',
        'Três vetores independentes em $\mathbb R^3$ formam uma base.',
      ],
    ],
  }),
  q({
    topic: 'espacos-fundamentais',
    difficulty: 'medium',
    skill: 'aplicar teorema posto-nulidade',
    commandType: 'dedução por dimensão',
    commonError: 'subtrair do contradomínio',
    statement: r`Uma transformação linear $T:\mathbb R^5\to\mathbb R^3$ tem posto $2$. Qual é a dimensão de $\ker T$?`,
    options: ['$3$', '$1$', '$2$', '$5$'],
    correct: 0,
    hints: [
      'O teorema relaciona o domínio, o núcleo e a imagem.',
      'Use a dimensão de $\mathbb R^5$, não a do contradomínio.',
      'A nulidade completa o posto até a dimensão do domínio.',
    ],
    finalAnswer: '$3$',
    explanation:
      'O teorema posto-nulidade usa a dimensão do domínio: dimensão do núcleo mais dimensão da imagem é igual a cinco. Como a imagem tem dimensão dois, restam três dimensões no núcleo.',
    steps: [
      [
        'Identifique os dados',
        '$\dim(\mathbb R^5)=5$ e $\operatorname{posto}T=2$.',
      ],
      ['Aplique o teorema', '$\dim\ker T+\dim\operatorname{Im}T=5$.'],
      ['Substitua o posto', '$\dim\ker T+2=5$.'],
      ['Conclua', '$\dim\ker T=3$.'],
    ],
  }),
  q({
    topic: 'somas-diretas',
    difficulty: 'medium',
    skill: 'calcular dimensão de interseção',
    commandType: 'uso de fórmula dimensional',
    commonError: 'somar dimensões sem descontar interseção',
    statement: r`Em um espaço vetorial finito, $\dim U=3$, $\dim V=2$ e $\dim(U+V)=4$. Quanto vale $\dim(U\cap V)$?`,
    options: ['$1$', '$0$', '$2$', '$5$'],
    correct: 0,
    hints: [
      'A dimensão da soma conta a interseção apenas uma vez.',
      'Escreva a fórmula de Grassmann.',
      'Isole a dimensão da interseção depois de substituir os três valores.',
    ],
    finalAnswer: '$1$',
    explanation:
      'Ao somar as dimensões de $U$ e $V$, as direções comuns são contadas duas vezes. A fórmula dimensional subtrai exatamente a dimensão da interseção para corrigir essa duplicidade.',
    steps: [
      ['Escreva a relação', '$\dim(U+V)=\dim U+\dim V-\dim(U\cap V)$.'],
      ['Substitua os dados', '$4=3+2-\dim(U\cap V)$.'],
      ['Isole a incógnita', '$\dim(U\cap V)=5-4$.'],
      ['Conclua', 'A interseção tem dimensão $1$.'],
    ],
  }),
  q({
    topic: 'bases-e-dimensao',
    difficulty: 'hard',
    skill: 'construir base de matrizes simétricas',
    commandType: 'reconstrução de espaço',
    commonError: 'contar quatro entradas independentes',
    statement: r`Considere o espaço $S$ das matrizes simétricas reais $2\times2$. Qual afirmação descreve corretamente uma base e a dimensão de $S$?`,
    options: [
      r`$\left\{\begin{pmatrix}1&0\\0&0\end{pmatrix},\begin{pmatrix}0&1\\1&0\end{pmatrix},\begin{pmatrix}0&0\\0&1\end{pmatrix}\right\}$ e dimensão $3$`,
      'As quatro matrizes unitárias e dimensão $4$',
      'Duas matrizes diagonais e dimensão $2$',
      'Uma matriz identidade e dimensão $1$',
    ],
    correct: 0,
    hints: [
      'Escreva a forma geral de uma matriz simétrica $2\times2$.',
      'As duas entradas fora da diagonal são obrigadas a ser iguais.',
      'Separe um gerador para cada parâmetro livre.',
    ],
    finalAnswer: r`$\left\{\begin{pmatrix}1&0\\0&0\end{pmatrix},\begin{pmatrix}0&1\\1&0\end{pmatrix},\begin{pmatrix}0&0\\0&1\end{pmatrix}\right\}$ e dimensão $3$`,
    explanation:
      'Uma matriz simétrica $2\times2$ possui três parâmetros independentes: duas entradas diagonais e uma entrada fora da diagonal compartilhada pelas posições simétricas. A base proposta isola esses parâmetros.',
    steps: [
      [
        'Parametrize o espaço',
        r`Toda matriz de $S$ é $\begin{pmatrix}a&b\\b&c\end{pmatrix}$.`,
      ],
      ['Separe os parâmetros', 'Ela é $aE_{11}+b(E_{12}+E_{21})+cE_{22}$.'],
      [
        'Verifique a base',
        'Os três geradores são simétricos, independentes e geram toda matriz dessa forma.',
      ],
      [
        'Conte',
        'Há três parâmetros livres e três vetores na base, então $\dim S=3$.',
      ],
    ],
  }),
  q({
    topic: 'subespacos-vetoriais',
    difficulty: 'hard',
    skill: 'determinar dimensão por restrição linear',
    commandType: 'análise de condição funcional',
    commonError: 'tratar a restrição como eliminação de dois graus',
    statement: r`Seja $W=\{p\in P_3:p(1)=0\}$. Qual é a dimensão de $W$?`,
    options: ['$3$', '$4$', '$2$', '$1$'],
    correct: 0,
    hints: [
      'Avaliar em $1$ define uma transformação linear de $P_3$ em $\mathbb R$.',
      'O conjunto $W$ é o núcleo dessa transformação.',
      'A avaliação não é a transformação nula, portanto sua imagem tem dimensão um.',
    ],
    finalAnswer: '$3$',
    explanation:
      'O espaço $P_3$ tem dimensão quatro. A condição $p(1)=0$ é uma única restrição linear independente, ou equivalentemente o núcleo de um funcional não nulo, reduzindo a dimensão em uma unidade.',
    steps: [
      ['Defina o funcional', '$T:P_3\to\mathbb R$ por $T(p)=p(1)$.'],
      ['Identifique o núcleo', '$W=\ker T$.'],
      [
        'Calcule o posto',
        'Como $T(1)=1$, a imagem é $\mathbb R$ e tem dimensão $1$.',
      ],
      ['Aplique posto-nulidade', '$\dim W=\dim P_3-1=4-1=3$.'],
    ],
  }),
  q({
    topic: 'somas-diretas',
    difficulty: 'hard',
    skill: 'escolher complemento direto',
    commandType: 'projeto de decomposição',
    commonError: 'escolher subespaço com interseção não trivial',
    statement: r`Em $\mathbb R^3$, seja $U=\operatorname{span}\{(1,0,0),(0,1,0)\}$. Qual subespaço $V$ satisfaz $\mathbb R^3=U\oplus V$?`,
    options: [
      r`$V=\operatorname{span}\{(0,0,1)\}$`,
      r`$V=\operatorname{span}\{(1,1,0)\}$`,
      r`$V=\operatorname{span}\{(1,0,0),(0,0,1)\}$`,
      r`$V=U$`,
    ],
    correct: 0,
    hints: [
      'Uma soma direta exige soma igual ao espaço todo e interseção apenas no zero.',
      'O subespaço $U$ é o plano $z=0$.',
      'Escolha uma direção fora desse plano, sem adicionar dimensão desnecessária.',
    ],
    finalAnswer: r`$V=\operatorname{span}\{(0,0,1)\}$`,
    explanation:
      'O eixo $z$ fornece exatamente a direção ausente do plano $xy$. Sua interseção com $U$ é apenas o vetor zero, e as dimensões dois mais um completam todo o espaço tridimensional.',
    steps: [
      ['Interprete $U$', '$U=\{(x,y,0):x,y\in\mathbb R\}$.'],
      [
        'Teste a interseção',
        'Um vetor do eixo $z$ que também tem $z=0$ só pode ser o vetor nulo.',
      ],
      [
        'Teste a soma',
        '$(x,y,z)=(x,y,0)+(0,0,z)$ para todo vetor de $\mathbb R^3$.',
      ],
      [
        'Conclua',
        'A soma cobre o espaço e a decomposição é única, logo é direta.',
      ],
    ],
  }),
  q({
    topic: 'espacos-fundamentais',
    difficulty: 'hard',
    skill: 'relacionar espaço linha e núcleo',
    commandType: 'dedução ortogonal',
    commonError: 'usar colunas em vez de linhas',
    statement: r`As linhas de $A=\begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$ geram o espaço linha. Qual vetor gera $\operatorname{Nul}(A)$ e é ortogonal a esse espaço?`,
    options: ['$(1,-1,1)$', '$(1,1,1)$', '$(1,-1,-1)$', '$(0,1,-1)$'],
    correct: 0,
    hints: [
      'Um vetor do núcleo deve satisfazer cada produto escalar com uma linha igual a zero.',
      'Resolva $x+y=0$ e $y+z=0$.',
      'Escolha um valor livre e confira as duas equações.',
    ],
    finalAnswer: '$(1,-1,1)$',
    explanation:
      'A equação $Ax=0$ afirma que $x$ é ortogonal a cada linha de $A$. Resolver as duas relações fornece uma direção unidimensional, que é o complemento ortogonal do espaço linha.',
    steps: [
      ['Traduza o núcleo', '$x+y=0$ e $y+z=0$.'],
      ['Parametrize', 'Tomando $y=-t$, obtemos $x=t$ e $z=t$.'],
      ['Escolha um gerador', 'Com $t=1$, resulta $(1,-1,1)$.'],
      [
        'Confira a ortogonalidade',
        'Os produtos com $(1,1,0)$ e $(0,1,1)$ são ambos zero.',
      ],
    ],
  }),
  q({
    topic: 'independencia-linear',
    difficulty: 'hard',
    skill: 'analisar unicidade de representação',
    commandType: 'argumento conceitual',
    commonError: 'atribuir unicidade a conjunto apenas gerador',
    statement: r`Um conjunto $S=\{v_1,v_2,v_3\}$ gera um espaço $V$, mas existe uma relação não trivial $2v_1-v_2+v_3=0$. O que isso implica sobre as representações por $S$?`,
    options: [
      'Todo vetor de $V$ possui mais de uma representação por $S$.',
      'Nenhum vetor de $V$ pode ser representado.',
      'Somente o vetor zero possui representação.',
      'As representações continuam sempre únicas.',
    ],
    correct: 0,
    hints: [
      'A relação nula pode ser somada a qualquer combinação linear sem alterar o vetor produzido.',
      'Comece com uma representação arbitrária de um vetor de $V$.',
      'Altere os coeficientes por um múltiplo da relação dada.',
    ],
    finalAnswer: 'Todo vetor de $V$ possui mais de uma representação por $S$.',
    explanation:
      'Como $S$ gera $V$, todo vetor tem ao menos uma representação. A relação não trivial permite modificar simultaneamente os três coeficientes sem mudar o resultado, destruindo a unicidade.',
    steps: [
      ['Tome uma representação', 'Escreva $w=a_1v_1+a_2v_2+a_3v_3$.'],
      ['Some a relação nula', '$w=(a_1+2t)v_1+(a_2-t)v_2+(a_3+t)v_3$.'],
      [
        'Escolha parâmetros distintos',
        'Valores diferentes de $t$ produzem triplas de coeficientes diferentes.',
      ],
      [
        'Conclua',
        'Como a relação vale para qualquer $w$, nenhuma representação por $S$ é única.',
      ],
    ],
  }),
  q({
    topic: 'subespacos-vetoriais',
    difficulty: 'hard',
    skill: 'distinguir conjunto afim de subespaço',
    commandType: 'análise de estrutura de solução',
    commonError: 'chamar todo conjunto solução de subespaço',
    statement: r`Suponha que $Ax=b$ seja consistente e que $b\ne0$. Se $x_p$ é uma solução particular, qual descrição correta do conjunto de soluções evidencia que ele geralmente não é subespaço?`,
    options: [
      r`$x_p+\operatorname{Nul}(A)$`,
      r`$\operatorname{Nul}(A)$`,
      r`$\operatorname{Col}(A)$`,
      r`$x_p\operatorname{Nul}(A)$`,
    ],
    correct: 0,
    hints: [
      'Compare duas soluções e observe o que sua diferença satisfaz.',
      'Toda solução pode ser escrita como uma particular mais uma solução homogênea.',
      'Com $b\\ne0$, o vetor zero não resolve o sistema.',
    ],
    finalAnswer: r`$x_p+\operatorname{Nul}(A)$`,
    explanation:
      'O conjunto solução é uma translação do núcleo por uma solução particular. A translação preserva a forma afim, mas com lado direito não nulo ela afasta o conjunto da origem, impedindo que seja subespaço.',
    steps: [
      ['Compare soluções', 'Se $Ax=b$ e $Ax_p=b$, então $A(x-x_p)=0$.'],
      ['Identifique a diferença', r`$x-x_p\in\operatorname{Nul}(A)$.`],
      [
        'Descreva todas as soluções',
        r`$x=x_p+z$ com $z\in\operatorname{Nul}(A)$.`,
      ],
      [
        'Teste o zero',
        'Como $A0=0\\ne b$, a origem não pertence ao conjunto e ele não é subespaço.',
      ],
    ],
  }),
];
