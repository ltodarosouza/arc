import { q, r } from './helpers.mjs';

export default [
  q({
    topic: 'operacoes-com-matrizes',
    difficulty: 'easy',
    skill: 'somar matrizes por componentes',
    commandType: 'cálculo direto',
    commonError: 'somar entradas de posições diferentes',
    statement: r`Uma equipe registra as matrizes $A=\begin{pmatrix}2&-1\\0&3\end{pmatrix}$ e $B=\begin{pmatrix}1&4\\-2&0\end{pmatrix}$. Qual é $A+B$?`,
    options: [
      r`$\begin{pmatrix}3&3\\-2&3\end{pmatrix}$`,
      r`$\begin{pmatrix}3&-5\\2&3\end{pmatrix}$`,
      r`$\begin{pmatrix}2&-4\\0&0\end{pmatrix}$`,
      r`$\begin{pmatrix}3&4\\-2&3\end{pmatrix}$`,
    ],
    correct: 0,
    hints: [
      'A soma de matrizes preserva a posição de cada entrada.',
      'Some separadamente as entradas da primeira linha.',
      'Confira a entrada inferior esquerda usando $0+(-2)$.',
    ],
    finalAnswer: r`$\begin{pmatrix}3&3\\-2&3\end{pmatrix}$`,
    explanation:
      'Matrizes de mesma ordem são somadas componente a componente. Nenhuma linha ou coluna muda de posição; por isso cada entrada do resultado combina apenas as entradas correspondentes.',
    steps: [
      [
        'Confirme as dimensões',
        'As duas matrizes são $2\times2$, portanto a soma está definida.',
      ],
      ['Some a primeira linha', 'Obtemos $(2+1,-1+4)=(3,3)$.'],
      ['Some a segunda linha', 'Obtemos $(0-2,3+0)=(-2,3)$.'],
      [
        'Verifique uma entrada',
        'A entrada $(2,1)$ é $-2$, confirmando a primeira alternativa.',
      ],
    ],
  }),
  q({
    topic: 'operacoes-com-matrizes',
    difficulty: 'easy',
    skill: 'calcular uma entrada de produto matricial',
    commandType: 'localização de entrada',
    commonError: 'multiplicar componentes na mesma posição',
    statement: r`Sem calcular o produto inteiro, determine a entrada $(2,1)$ de $AB$, onde $A=\begin{pmatrix}1&2\\-1&3\end{pmatrix}$ e $B=\begin{pmatrix}4&0\\2&5\end{pmatrix}$.`,
    options: ['$2$', '$10$', '$-4$', '$7$'],
    correct: 0,
    hints: [
      'Uma entrada do produto combina uma linha da primeira matriz com uma coluna da segunda.',
      'Para $(2,1)$, use a segunda linha de $A$ e a primeira coluna de $B$.',
      'O cálculo intermediário deve ter exatamente dois produtos somados.',
    ],
    finalAnswer: '$2$',
    explanation:
      'A entrada $(i,j)$ de um produto vem do produto escalar da linha $i$ da primeira matriz com a coluna $j$ da segunda. A multiplicação componente a componente de matrizes daria outra operação.',
    steps: [
      ['Escolha a linha', 'A segunda linha de $A$ é $(-1,3)$.'],
      ['Escolha a coluna', 'A primeira coluna de $B$ é $(4,2)$.'],
      ['Faça o produto escalar', '$(-1)\cdot4+3\cdot2=-4+6$.'],
      ['Conclua', 'A soma vale $2$, que corresponde à primeira alternativa.'],
    ],
  }),
  q({
    topic: 'eliminacao-gaussiana',
    difficulty: 'easy',
    skill: 'reconhecer operação elementar',
    commandType: 'diagnóstico de procedimento',
    commonError: 'alterar somente parte de uma linha',
    statement: r`Ao escalonar uma matriz, deseja-se zerar o primeiro elemento de $L_2$ sabendo que ele vale $6$ e que o primeiro elemento de $L_1$ vale $2$. Qual operação é adequada?`,
    options: [
      r`$L_2\leftarrow L_2-3L_1$`,
      r`$L_1\leftarrow L_1-3L_2$`,
      r`$L_2\leftarrow 3L_2-L_1$`,
      r`$L_2\leftarrow L_2+3L_1$`,
    ],
    correct: 0,
    hints: [
      'Procure um múltiplo do pivô que produza o oposto de $6$.',
      'A linha que deve mudar é $L_2$.',
      'Confira apenas a primeira entrada: $6-3\cdot2$.',
    ],
    finalAnswer: r`$L_2\leftarrow L_2-3L_1$`,
    explanation:
      'A operação deve agir sobre toda a segunda linha e transformar sua primeira entrada em zero. Subtrair três vezes a linha do pivô preserva o conjunto de soluções e produz exatamente esse cancelamento.',
    steps: [
      ['Identifique o pivô', 'O pivô disponível na primeira linha é $2$.'],
      [
        'Determine o multiplicador',
        'Como $6=3\cdot2$, precisamos subtrair três vezes o pivô.',
      ],
      [
        'Aplique à linha correta',
        'Usamos $L_2\leftarrow L_2-3L_1$ em todas as colunas.',
      ],
      ['Confira o cancelamento', 'Na primeira coluna, $6-3\cdot2=0$.'],
    ],
  }),
  q({
    topic: 'sistemas-lineares',
    difficulty: 'easy',
    skill: 'verificar solução de sistema',
    commandType: 'verificação de candidato',
    commonError: 'testar apenas uma equação',
    statement: r`Qual par ordenado satisfaz simultaneamente $2x-y=1$ e $x+y=5$?`,
    options: ['$(2,3)$', '$(3,2)$', '$(1,4)$', '$(4,1)$'],
    correct: 0,
    hints: [
      'Uma solução precisa tornar verdadeiras as duas equações.',
      'Use a equação $x+y=5$ para filtrar os candidatos.',
      'Depois confira o valor de $2x-y$.',
    ],
    finalAnswer: '$(2,3)$',
    explanation:
      'Resolver ou verificar um sistema significa satisfazer todas as equações ao mesmo tempo. Um par que funciona em apenas uma delas não pertence ao conjunto solução do sistema.',
    steps: [
      [
        'Use a soma',
        'Todos os candidatos somam $5$, então precisamos da outra equação.',
      ],
      ['Teste o primeiro par', 'Para $(2,3)$, temos $2\cdot2-3=1$.'],
      ['Confirme a segunda equação', 'Também $2+3=5$.'],
      [
        'Elimine a ambiguidade',
        'Os demais pares não produzem $1$ em $2x-y$, logo a resposta é $(2,3)$.',
      ],
    ],
  }),
  q({
    topic: 'sistemas-lineares',
    difficulty: 'easy',
    skill: 'resolver sistema triangular',
    commandType: 'leitura retroativa',
    commonError: 'substituir na ordem errada',
    statement: r`Um escalonamento terminou em $z=2$, $y-3z=-4$ e $x+y+z=7$. Qual é o valor de $x$?`,
    options: ['$3$', '$1$', '$5$', '$9$'],
    correct: 0,
    hints: [
      'Comece pela equação que já isola uma variável.',
      'Substitua $z$ na equação que contém $y$.',
      'Antes de encontrar $x$, confira se $y=2$.',
    ],
    finalAnswer: '$3$',
    explanation:
      'Em um sistema triangular, a substituição retroativa começa pela última variável e sobe pelas equações. Essa ordem evita criar novas incógnitas e mantém cada etapa determinada.',
    steps: [
      ['Leia a última variável', 'A primeira informação direta é $z=2$.'],
      ['Recupere $y$', '$y-3\cdot2=-4$, então $y=2$.'],
      ['Recupere $x$', '$x+2+2=7$, logo $x=3$.'],
      [
        'Verifique',
        'Os valores $(3,2,2)$ satisfazem as três equações apresentadas.',
      ],
    ],
  }),
  q({
    topic: 'inversas-e-fatoracoes',
    difficulty: 'easy',
    skill: 'usar matriz inversa diagonal',
    commandType: 'aplicação de definição',
    commonError: 'trocar o sinal sem inverter o valor',
    statement: r`A matriz $D=\begin{pmatrix}2&0\\0&-4\end{pmatrix}$ é invertível. Qual é $D^{-1}$?`,
    options: [
      r`$\begin{pmatrix}1/2&0\\0&-1/4\end{pmatrix}$`,
      r`$\begin{pmatrix}-2&0\\0&4\end{pmatrix}$`,
      r`$\begin{pmatrix}2&0\\0&1/4\end{pmatrix}$`,
      r`$\begin{pmatrix}1/2&0\\0&1/4\end{pmatrix}$`,
    ],
    correct: 0,
    hints: [
      'A inversa deve produzir a identidade quando multiplicada por $D$.',
      'Em uma matriz diagonal invertível, trate cada entrada diagonal separadamente.',
      'O inverso multiplicativo de $-4$ mantém o sinal negativo.',
    ],
    finalAnswer: r`$\begin{pmatrix}1/2&0\\0&-1/4\end{pmatrix}$`,
    explanation:
      'Uma matriz diagonal é invertida tomando o recíproco de cada entrada diagonal não nula. As entradas fora da diagonal continuam zero, e o sinal de cada recíproco é preservado.',
    steps: [
      [
        'Observe a estrutura',
        '$D$ é diagonal e suas entradas diagonais são não nulas.',
      ],
      ['Inverta a primeira entrada', 'O recíproco de $2$ é $1/2$.'],
      ['Inverta a segunda entrada', 'O recíproco de $-4$ é $-1/4$.'],
      ['Confira o produto', '$D D^{-1}=\operatorname{diag}(1,1)=I$.'],
    ],
  }),
  q({
    topic: 'operacoes-com-matrizes',
    difficulty: 'medium',
    skill: 'isolar matriz em equação',
    commandType: 'reconstrução algébrica',
    commonError: 'inverter a ordem da multiplicação',
    statement: r`Se $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ e $AX=\begin{pmatrix}3&1\\2&4\end{pmatrix}$, qual é $X$?`,
    options: [
      r`$\begin{pmatrix}1&-3\\2&4\end{pmatrix}$`,
      r`$\begin{pmatrix}3&1\\-1&3\end{pmatrix}$`,
      r`$\begin{pmatrix}5&5\\2&4\end{pmatrix}$`,
      r`$\begin{pmatrix}1&1\\2&4\end{pmatrix}$`,
    ],
    correct: 0,
    hints: [
      'Para isolar $X$, multiplique à esquerda por $A^{-1}$.',
      r`A inversa de $A$ troca o $1$ superior direito por $-1$.`,
      'Confira o resultado multiplicando a primeira linha de $A$ por cada coluna de $X$.',
    ],
    finalAnswer: r`$\begin{pmatrix}1&-3\\2&4\end{pmatrix}$`,
    explanation:
      'Como a multiplicação matricial não é comutativa, a inversa deve atuar no mesmo lado em que aparece $A$. Multiplicar à esquerda por $A^{-1}$ preserva a ordem e isola $X$.',
    steps: [
      [
        'Encontre a inversa',
        r`$A^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$.`,
      ],
      ['Isole a incógnita', 'De $AX=B$, obtemos $X=A^{-1}B$.'],
      [
        'Calcule o produto',
        r`$X=\begin{pmatrix}1&-1\\0&1\end{pmatrix}\begin{pmatrix}3&1\\2&4\end{pmatrix}=\begin{pmatrix}1&-3\\2&4\end{pmatrix}$.`,
      ],
      [
        'Verifique a ordem',
        'Multiplicar $A$ por essa matriz recupera exatamente o lado direito.',
      ],
    ],
  }),
  q({
    topic: 'eliminacao-gaussiana',
    difficulty: 'medium',
    skill: 'interpretar linha nula aumentada',
    commandType: 'análise de escalonamento',
    commonError: 'confundir variável livre com contradição',
    statement: r`Após operações elementares, a matriz aumentada de um sistema é $\begin{pmatrix}1&2&|&3\\0&0&|&1\end{pmatrix}$. O que se conclui?`,
    options: [
      'O sistema é inconsistente.',
      'O sistema possui uma variável livre.',
      'O sistema tem solução única.',
      'O sistema é homogêneo.',
    ],
    correct: 0,
    hints: [
      'Traduza cada linha novamente como uma equação.',
      'Observe especialmente a linha cujo lado esquerdo é todo zero.',
      'Uma igualdade do tipo $0=c$ só pode ser satisfeita quando $c=0$.',
    ],
    finalAnswer: 'O sistema é inconsistente.',
    explanation:
      'A segunda linha representa uma afirmação impossível, $0=1$. Operações elementares preservam o conjunto de soluções; portanto a contradição mostra que o sistema original não possui solução.',
    steps: [
      ['Leia a primeira linha', 'Ela representa $x+2y=3$.'],
      ['Leia a segunda linha', 'Ela representa $0x+0y=1$, isto é, $0=1$.'],
      [
        'Interprete a contradição',
        'Nenhum par de números torna $0=1$ verdadeiro.',
      ],
      [
        'Conclua sobre o sistema',
        'O conjunto solução é vazio, logo o sistema é inconsistente.',
      ],
    ],
  }),
  q({
    topic: 'sistemas-lineares',
    difficulty: 'medium',
    skill: 'determinar parâmetro por solução prescrita',
    commandType: 'reconstrução de dado',
    commonError: 'usar somente uma das equações',
    statement: r`O sistema $kx+y=5$ e $x-y=1$ deve ter $(2,1)$ como solução. Qual valor de $k$ satisfaz essa exigência?`,
    options: ['$k=2$', '$k=3$', '$k=1$', '$k=-2$'],
    correct: 0,
    hints: [
      'Uma solução prescrita pode ser substituída diretamente nas equações.',
      'A segunda equação serve para confirmar que o par é admissível.',
      'Na primeira equação, obtenha uma equação apenas em $k$.',
    ],
    finalAnswer: '$k=2$',
    explanation:
      'O parâmetro precisa fazer o par indicado satisfazer todas as equações. Como a segunda já é verdadeira para o par, a primeira determina unicamente o valor necessário de $k$.',
    steps: [
      [
        'Confira a equação sem parâmetro',
        '$2-1=1$, portanto a segunda equação é satisfeita.',
      ],
      ['Substitua na primeira', 'Temos $2k+1=5$.'],
      ['Isole o parâmetro', '$2k=4$, logo $k=2$.'],
      [
        'Verifique o sistema',
        'Com $k=2$, a primeira equação dá $4+1=5$ e o par funciona em ambas.',
      ],
    ],
  }),
  q({
    topic: 'eliminacao-gaussiana',
    difficulty: 'medium',
    skill: 'identificar variável livre em forma escalonada',
    commandType: 'interpretação paramétrica',
    commonError: 'atribuir pivô a coluna sem pivô',
    statement: r`A forma escalonada de um sistema em $x,y,z$ é $\begin{pmatrix}1&0&2&|&4\\0&1&-1&|&3\\0&0&0&|&0\end{pmatrix}$. Qual descrição do conjunto solução é correta?`,
    options: [
      r`$(x,y,z)=(4-2t,3+t,t)$, $t\in\mathbb R$`,
      r`$(x,y,z)=(4,3,0)$ apenas`,
      r`$(x,y,z)=(4+2t,3-t,t)$, $t\in\mathbb R$`,
      'O sistema não possui solução.',
    ],
    correct: 0,
    hints: [
      'Colunas sem pivô correspondem a variáveis livres.',
      'Escolha um parâmetro para $z$.',
      'Isole $x$ e $y$ nas duas linhas não nulas.',
    ],
    finalAnswer: r`$(x,y,z)=(4-2t,3+t,t)$, $t\in\mathbb R$`,
    explanation:
      'Há pivôs nas colunas de $x$ e $y$, mas não na de $z$. Assim $z$ é livre e cada escolha do parâmetro produz uma solução, sem qualquer linha contraditória.',
    steps: [
      [
        'Localize os pivôs',
        'As duas primeiras colunas têm pivôs; a terceira não tem.',
      ],
      ['Parametrize a variável livre', 'Defina $z=t$.'],
      [
        'Isole as variáveis básicas',
        '$x+2t=4$ dá $x=4-2t$, e $y-t=3$ dá $y=3+t$.',
      ],
      [
        'Apresente e confira',
        'A família $(4-2t,3+t,t)$ satisfaz ambas as equações para todo $t$ real.',
      ],
    ],
  }),
  q({
    topic: 'operacoes-com-matrizes',
    difficulty: 'medium',
    skill: 'decidir compatibilidade dimensional e ordem',
    commandType: 'escolha de estratégia',
    commonError: 'supor comutatividade matricial',
    statement: r`Uma transformação aplica primeiro uma matriz $B$ de ordem $3\times2$ a vetores de $\mathbb R^2$ e depois uma matriz $A$ de ordem $2\times3$. Qual matriz representa a composição e qual é sua ordem?`,
    options: [
      '$AB$, de ordem $2\times2$',
      '$BA$, de ordem $3\times3$',
      '$AB$, de ordem $3\times3$',
      '$A+B$, de ordem $2\times3$',
    ],
    correct: 0,
    hints: [
      'Na composição, a operação aplicada primeiro aparece mais à direita.',
      'A saída de $B$ tem três componentes, compatíveis com a entrada de $A$.',
      'As dimensões externas do produto determinam a ordem final.',
    ],
    finalAnswer: '$AB$, de ordem $2\times2$',
    explanation:
      'Vetores coluna são transformados como $v\mapsto Bv\mapsto A(Bv)$. A associatividade escreve o resultado como $(AB)v$, e as dimensões externas são duas por duas.',
    steps: [
      [
        'Registre o fluxo',
        '$B$ leva $\mathbb R^2$ a $\mathbb R^3$ e $A$ leva $\mathbb R^3$ a $\mathbb R^2$.',
      ],
      ['Escreva a composição', 'Aplicar $B$ antes de $A$ produz $A(Bv)$.'],
      ['Associe o produto', '$A(Bv)=(AB)v$.'],
      [
        'Confira as dimensões',
        'O produto $(2\times3)(3\times2)$ tem ordem $2\times2$.',
      ],
    ],
  }),
  q({
    topic: 'inversas-e-fatoracoes',
    difficulty: 'medium',
    skill: 'resolver sistema usando fatoração LU',
    commandType: 'sequência de método',
    commonError: 'resolver diretamente $Ux=b$ sem calcular $y$',
    statement: r`Considere $A=LU$, com $L=\begin{pmatrix}1&0\\2&1\end{pmatrix}$, $U=\begin{pmatrix}3&1\\0&2\end{pmatrix}$ e $b=(4,10)$. Ao resolver $Ax=b$, qual é $x$?`,
    options: ['$(1,1)$', '$(4,10)$', '$(2,-2)$', '$(0,2)$'],
    correct: 0,
    hints: [
      'Introduza um vetor intermediário $y$ com $Ly=b$.',
      'Resolva primeiro o sistema triangular inferior.',
      'Depois use $Ux=y$ por substituição retroativa.',
    ],
    finalAnswer: '$(1,1)$',
    explanation:
      'A fatoração $LU$ divide o problema em dois sistemas triangulares. Primeiro obtemos o vetor intermediário pela matriz inferior; só então resolvemos o sistema superior para $x$.',
    steps: [
      ['Resolva $Ly=b$', '$y_1=4$ e $2y_1+y_2=10$, portanto $y=(4,2)$.'],
      ['Monte o segundo sistema', 'Agora resolvemos $Ux=y$.'],
      [
        'Faça a substituição retroativa',
        '$2x_2=2$ dá $x_2=1$; então $3x_1+x_2=4$ dá $x_1=1$.',
      ],
      ['Verifique', '$LU(1,1)=L(4,2)=(4,10)=b$.'],
    ],
  }),
  q({
    topic: 'sistemas-lineares',
    difficulty: 'hard',
    skill: 'classificar sistema dependente de parâmetro',
    commandType: 'análise de casos',
    commonError: 'dividir por expressão que pode ser zero',
    statement: r`Para quais valores de $a$ o sistema $x+ay=1$ e $ax+y=1$ não possui solução única?`,
    options: [
      '$a=1$ ou $a=-1$',
      'Somente $a=1$',
      'Somente $a=0$',
      'Todo $a$ real',
    ],
    correct: 0,
    hints: [
      'Solução única equivale a uma matriz de coeficientes invertível.',
      'Calcule o determinante da matriz dos coeficientes.',
      'Fatore $1-a^2$ antes de analisar os casos.',
    ],
    finalAnswer: '$a=1$ ou $a=-1$',
    explanation:
      'O sistema perde unicidade exatamente quando sua matriz de coeficientes é singular. Isso inclui tanto o caso de infinitas soluções quanto o caso inconsistente, por isso ambos os valores críticos entram.',
    steps: [
      ['Monte a matriz', r`$A=\begin{pmatrix}1&a\\a&1\end{pmatrix}$.`],
      [
        'Use o critério de unicidade',
        'Há solução única se e somente se $\det A\ne0$.',
      ],
      [
        'Encontre os valores críticos',
        '$\det A=1-a^2=(1-a)(1+a)$, que zera em $a=\pm1$.',
      ],
      [
        'Interprete os casos',
        'Em $a=1$ as equações coincidem; em $a=-1$ os lados esquerdos são opostos mas os direitos não, e nenhum caso é único.',
      ],
    ],
  }),
  q({
    topic: 'sistemas-lineares',
    difficulty: 'hard',
    skill: 'modelar conservação de fluxo',
    commandType: 'aplicação contextual',
    commonError: 'inverter entradas e saídas',
    statement: r`Em um nó de uma rede, entram fluxos de $40$ e $x$ unidades por minuto, enquanto saem $25$ e $y$. Em outro nó, entram $y$ e $5$, e saem $3x$ unidades. Se há conservação em ambos, qual é $(x,y)$?`,
    options: ['$(10,25)$', '$(25,40)$', '$(15,30)$', '$(5,20)$'],
    correct: 0,
    hints: [
      'Em cada nó, iguale a soma dos fluxos de entrada à soma dos de saída.',
      'O primeiro nó fornece uma relação entre $x$ e $y$.',
      'Use a segunda relação para eliminar uma variável.',
    ],
    finalAnswer: '$(10,25)$',
    explanation:
      'A conservação transforma cada nó em uma equação linear. É essencial manter o sentido dos fluxos: entradas ficam de um lado e saídas do outro antes de resolver o sistema resultante.',
    steps: [
      ['Modele o primeiro nó', '$40+x=25+y$, portanto $y=x+15$.'],
      ['Modele o segundo nó', '$y+5=3x$.'],
      [
        'Combine as relações',
        'Substituindo $y=x+15$, obtemos $x+20=3x$, então $x=10$.',
      ],
      ['Recupere e confira', 'Assim $y=25$; nos nós, $50=50$ e $30=30$.'],
    ],
  }),
  q({
    topic: 'inversas-e-fatoracoes',
    difficulty: 'hard',
    skill: 'obter inversa por identidade polinomial',
    commandType: 'estratégia por propriedade',
    commonError: 'ignorar o termo identidade',
    statement: r`Uma matriz quadrada satisfaz $A^2-3A+2I=0$. Sabendo que $A$ é invertível, qual expressão representa $A^{-1}$?`,
    options: [
      r`$\frac{1}{2}(3I-A)$`,
      r`$A-3I$`,
      r`$\frac{1}{2}(A-3I)$`,
      r`$3I-A$`,
    ],
    correct: 0,
    hints: [
      'Procure produzir um fator $A$ multiplicando uma expressão.',
      'Reorganize a identidade deixando o termo com $I$ sozinho.',
      'Depois multiplique pela inversa de $A$ e isole $A^{-1}$.',
    ],
    finalAnswer: r`$\frac{1}{2}(3I-A)$`,
    explanation:
      'Uma identidade polinomial pode fornecer a inversa sem escalonamento. Ao fatorar os termos que contêm $A$, obtemos uma matriz que, multiplicada por $A$, produz um múltiplo da identidade.',
    steps: [
      ['Reorganize a igualdade', '$A^2-3A=-2I$.'],
      ['Fatore $A$', '$A(A-3I)=-2I$, ou $A(3I-A)=2I$.'],
      ['Normalize o produto', r`$A\left[\frac12(3I-A)\right]=I$.`],
      [
        'Conclua e confira',
        'Como $A$ é invertível, a matriz entre colchetes é $A^{-1}$.',
      ],
    ],
  }),
  q({
    topic: 'eliminacao-gaussiana',
    difficulty: 'hard',
    skill: 'impor consistência em sistema sobredeterminado',
    commandType: 'reconstrução por condição',
    commonError: 'resolver apenas duas equações',
    statement: r`O sistema $x+y=2$, $2x-y=1$ e $3x=\lambda$ deve ser consistente. Qual valor de $\lambda$ é necessário?`,
    options: ['$\lambda=3$', '$\lambda=1$', '$\lambda=6$', '$\lambda=9$'],
    correct: 0,
    hints: [
      'As duas primeiras equações já determinam $x$ e $y$.',
      'Some relações convenientes para eliminar $y$.',
      'A terceira equação deve concordar com o valor encontrado de $x$.',
    ],
    finalAnswer: '$\lambda=3$',
    explanation:
      'Em um sistema com mais equações do que incógnitas, as equações adicionais precisam ser compatíveis com a solução determinada pelas primeiras. A terceira não cria liberdade; ela impõe uma condição ao parâmetro.',
    steps: [
      [
        'Resolva as duas primeiras',
        'Somando as equações, $3x=3$, portanto $x=1$.',
      ],
      ['Encontre a outra incógnita', 'De $x+y=2$, segue $y=1$.'],
      ['Imponha a equação extra', 'A terceira exige $3\cdot1=\lambda$.'],
      [
        'Verifique todas as linhas',
        'Com $\lambda=3$, o par $(1,1)$ satisfaz as três equações.',
      ],
    ],
  }),
  q({
    topic: 'eliminacao-gaussiana',
    difficulty: 'hard',
    skill: 'comparar sistemas por posto',
    commandType: 'comparação de cenários',
    commonError: 'usar apenas o número de equações',
    statement: r`Dois sistemas têm três incógnitas. No sistema I, $\operatorname{posto}(A)=\operatorname{posto}([A|b])=3$. No sistema II, $\operatorname{posto}(A)=2$ e $\operatorname{posto}([A|b])=3$. Qual comparação está correta?`,
    options: [
      'I tem solução única e II é inconsistente.',
      'Ambos têm solução única.',
      'I é inconsistente e II tem infinitas soluções.',
      'Ambos têm infinitas soluções.',
    ],
    correct: 0,
    hints: [
      'Compare primeiro o posto da matriz de coeficientes com o da aumentada.',
      'Postos diferentes indicam uma linha contraditória.',
      'Quando os postos coincidem com o número de incógnitas, não há variável livre.',
    ],
    finalAnswer: 'I tem solução única e II é inconsistente.',
    explanation:
      'O critério de Rouché-Capelli separa consistência de unicidade. Postos iguais garantem consistência; o valor comum igual ao número de incógnitas elimina variáveis livres. Postos diferentes tornam o sistema impossível.',
    steps: [
      [
        'Analise o sistema I',
        'Os postos são iguais, então o sistema é consistente.',
      ],
      [
        'Conte variáveis livres em I',
        'O posto $3$ coincide com as três incógnitas, logo a solução é única.',
      ],
      [
        'Analise o sistema II',
        'O posto da aumentada excede o de $A$, indicando contradição.',
      ],
      ['Compare', 'Assim, I tem solução única e II não possui solução.'],
    ],
  }),
  q({
    topic: 'inversas-e-fatoracoes',
    difficulty: 'hard',
    skill: 'usar inversa de produto na ordem correta',
    commandType: 'análise de argumento',
    commonError: 'manter a ordem ao inverter produto',
    statement: r`Um estudante afirma que $(ABC)^{-1}=A^{-1}B^{-1}C^{-1}$ para matrizes invertíveis. Qual correção torna a afirmação válida?`,
    options: [
      r`$(ABC)^{-1}=C^{-1}B^{-1}A^{-1}$`,
      r`$(ABC)^{-1}=B^{-1}A^{-1}C^{-1}$`,
      r`$(ABC)^{-1}=A^{-1}C^{-1}B^{-1}$`,
      'A inversa de um produto nunca existe.',
    ],
    correct: 0,
    hints: [
      'A matriz candidata deve desfazer primeiro a última transformação aplicada.',
      'Multiplique o produto por uma candidata e procure cancelamentos adjacentes.',
      'Os fatores inversos precisam aparecer ao lado de seus fatores originais.',
    ],
    finalAnswer: r`$(ABC)^{-1}=C^{-1}B^{-1}A^{-1}$`,
    explanation:
      'A inversa desfaz uma composição na ordem reversa. Somente a ordem invertida coloca cada matriz ao lado de sua inversa durante a multiplicação, permitindo os cancelamentos que produzem a identidade.',
    steps: [
      [
        'Considere a composição',
        '$ABC$ aplica $C$, depois $B$ e por fim $A$ a um vetor.',
      ],
      [
        'Desfaça a última ação',
        'Começamos por $A^{-1}$, depois usamos $B^{-1}$ e $C^{-1}$.',
      ],
      [
        'Escreva como produto à direita',
        'Isso corresponde a $C^{-1}B^{-1}A^{-1}$.',
      ],
      ['Verifique', '$(ABC)(C^{-1}B^{-1}A^{-1})=ABIB^{-1}A^{-1}=I$.'],
    ],
  }),
];
