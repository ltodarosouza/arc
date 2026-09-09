// Banco de Arquitetura de Computadores. Conteúdo original da Arc: o livro de
// referência orienta competências e recorte curricular, nunca enunciados.

const r = String.raw;

const topics = [
  {
    key: 'representacao-e-aritmetica',
    facts: [
      [
        'O valor decimal de $101101_2$',
        '$45$',
        ['$43$', '$44$', '$46$'],
        'Cada posição binária representa uma potência de dois.',
      ],
      [
        'O maior valor sem sinal representável em $8$ bits',
        '$255$',
        ['$127$', '$256$', '$511$'],
        'Oito bits sem sinal representam valores de $0$ a $2^8-1$.',
      ],
      [
        'A consequência de interpretar $11111111_2$ como inteiro com sinal em complemento de dois',
        '$-1$',
        ['$127$', '$128$', '$255$'],
        'No complemento de dois, o bit mais significativo tem peso negativo.',
      ],
      [
        'O resultado em complemento de dois de $01111111_2+00000001_2$',
        'Ocorre overflow.',
        ['$10000000_2$, sem ressalva.', '$00000000_2$', '$11111111_2$'],
        'A soma sai do intervalo representável para inteiros de oito bits com sinal.',
      ],
      [
        'A quantidade de combinações diferentes formada por $n$ bits',
        '$2^n$',
        ['$n^2$', '$2n$', '$n!$'],
        'Cada bit possui duas escolhas independentes.',
      ],
    ],
  },
  {
    key: 'logica-booleana',
    facts: [
      [
        'A saída de uma porta AND com entradas $1$ e $0$',
        '$0$',
        ['$1$', 'indefinida', 'depende do clock'],
        'AND só produz um quando todas as entradas são um.',
      ],
      [
        'Uma expressão equivalente a $\overline{A\cdot B}$',
        '$\overline A+\overline B$',
        ['$\overline A\cdot\overline B$', '$A+ B$', '$A\cdot B$'],
        'É a lei de De Morgan para a negação de uma conjunção.',
      ],
      [
        'O valor de $A\oplus B$ quando as entradas são diferentes',
        '$1$',
        ['$0$', '$A\cdot B$', 'não pode ser determinado'],
        'XOR detecta desigualdade entre dois bits.',
      ],
      [
        'A propriedade de $A+\overline A$',
        '$1$',
        ['$0$', '$A$', '$\overline A$'],
        'Uma variável ou seu complemento cobre todos os casos possíveis.',
      ],
      [
        'O circuito universal que sozinho pode implementar qualquer função booleana',
        'NAND',
        ['AND', 'XOR', 'buffer'],
        'A composição adequada de portas NAND permite construir NOT, AND e OR.',
      ],
    ],
  },
  {
    key: 'circuitos-combinacionais',
    facts: [
      [
        'A função principal de um multiplexador $4:1$',
        'Selecionar uma entre quatro entradas de dados.',
        [
          'Copiar um bit em quatro saídas.',
          'Somar quatro operandos.',
          'Armazenar quatro bits.',
        ],
        'Linhas de seleção escolhem qual entrada é encaminhada à saída.',
      ],
      [
        'O componente que transforma um código binário em uma entre várias linhas ativas',
        'Decodificador',
        ['Codificador', 'Multiplexador', 'Latch'],
        'Um decodificador expande um código de entrada em linhas de saída.',
      ],
      [
        'A saída de soma de um meio somador com entradas $1$ e $1$',
        '$0$',
        ['$1$', '$2$', 'overflow obrigatório'],
        'A soma é XOR; o transporte é tratado separadamente.',
      ],
      [
        'O sinal de carry de um meio somador com entradas $1$ e $1$',
        '$1$',
        ['$0$', '$2$', 'indefinido'],
        'O carry é a conjunção das duas entradas.',
      ],
      [
        'O bloco combinacional usado para comparar dois números binários',
        'Comparador de magnitude',
        ['Registrador', 'Contador', 'Flip-flop D'],
        'Ele indica relações como maior, menor ou igual sem guardar estado.',
      ],
    ],
  },
  {
    key: 'flip-flops-e-registradores',
    facts: [
      [
        'O comportamento típico de um flip-flop D na borda ativa do clock',
        'Copia o valor de D para Q.',
        ['Inverte Q.', 'Soma D a Q.', 'Zera Q sempre.'],
        'O flip-flop D amostra uma entrada e conserva esse valor até a próxima borda.',
      ],
      [
        'A condição proibida de um latch SR implementado com NOR',
        '$S=R=1$',
        ['$S=R=0$', '$S=1,R=0$', '$S=0,R=1$'],
        'Ativar set e reset simultaneamente cria uma saída sem interpretação estável.',
      ],
      [
        'A propriedade que distingue um flip-flop de um circuito combinacional',
        'Ele armazena estado.',
        [
          'Ele não usa portas lógicas.',
          'Ele só trabalha com zero.',
          'Ele não depende de energia.',
        ],
        'A saída pode depender de eventos anteriores, não apenas das entradas atuais.',
      ],
      [
        'O número de flip-flops D necessário para guardar uma palavra de $16$ bits',
        '$16$',
        ['$4$', '$8$', '$32$'],
        'Cada flip-flop D armazena um único bit.',
      ],
      [
        'A utilidade de um registrador com deslocamento',
        'Mover bits uma posição a cada pulso.',
        [
          'Converter toda RAM em ROM.',
          'Eliminar o clock.',
          'Executar instruções.',
        ],
        'Registradores de deslocamento transferem o estado entre estágios.',
      ],
    ],
  },
  {
    key: 'memoria-e-cache',
    facts: [
      [
        'A razão de a cache reduzir o tempo médio de acesso',
        'Ela explora a localidade das referências.',
        [
          'Ela elimina completamente a RAM.',
          'Ela aumenta o tamanho do programa.',
          'Ela dispensa endereços.',
        ],
        'Dados usados recentemente ou próximos tendem a ser reutilizados.',
      ],
      [
        'A situação chamada cache hit',
        'O bloco procurado está na cache.',
        [
          'A cache está desligada.',
          'A RAM foi apagada.',
          'Uma escrita falhou.',
        ],
        'Um hit evita buscar o bloco na memória de nível inferior.',
      ],
      [
        'A unidade normalmente transferida entre cache e memória principal',
        'Bloco ou linha de cache',
        ['Um único transistor', 'Um programa inteiro', 'Um registrador da CPU'],
        'A cache trabalha com blocos para aproveitar localidade espacial.',
      ],
      [
        'A política write-through',
        'Atualiza cache e memória principal em cada escrita.',
        [
          'Escreve apenas na cache para sempre.',
          'Impede leituras.',
          'Troca a RAM por ROM.',
        ],
        'Ela simplifica consistência ao custo de mais tráfego de memória.',
      ],
      [
        'O efeito esperado ao aumentar a taxa de hits, mantendo os demais tempos',
        'Diminuir o tempo médio de acesso.',
        [
          'Aumentar sempre o tamanho da RAM.',
          'Eliminar o clock.',
          'Aumentar obrigatoriamente misses.',
        ],
        'Menos acessos ao nível lento reduzem a média ponderada.',
      ],
    ],
  },
  {
    key: 'memoria-principal-e-enderecamento',
    facts: [
      [
        'A diferença essencial entre RAM e ROM',
        'A RAM é volátil; a ROM preserva conteúdo sem energia.',
        [
          'ROM é sempre mais rápida.',
          'RAM só armazena textos.',
          'ROM perde dados a cada leitura.',
        ],
        'Volatilidade descreve se a informação sobrevive à remoção de energia.',
      ],
      [
        'A capacidade endereçável por $12$ linhas de endereço, com um byte por endereço',
        '$4096$ bytes',
        ['$12$ bytes', '$2048$ bytes', '$8192$ bytes'],
        'Doze linhas selecionam $2^{12}$ endereços.',
      ],
      [
        'A finalidade de um endereço de memória',
        'Identificar a posição de um dado.',
        [
          'Determinar o valor do dado.',
          'Substituir o barramento de dados.',
          'Codificar uma instrução inteira.',
        ],
        'O endereço indica onde ler ou escrever, não o conteúdo em si.',
      ],
      [
        'O benefício da memória virtual',
        'Dar a cada processo a visão de um espaço de endereços amplo.',
        [
          'Eliminar toda memória secundária.',
          'Tornar registradores não voláteis.',
          'Dispensar o sistema operacional.',
        ],
        'Mapeamentos traduzem endereços virtuais para físicos quando necessário.',
      ],
      [
        'A ocorrência de page fault',
        'A página referenciada não está na memória principal.',
        [
          'A cache sempre acertou.',
          'A CPU perdeu o clock.',
          'A instrução é inválida.',
        ],
        'O sistema precisa buscar a página em armazenamento secundário antes de continuar.',
      ],
    ],
  },
  {
    key: 'processador-e-instrucoes',
    facts: [
      [
        'O papel da unidade de controle na CPU',
        'Coordenar os sinais que executam uma instrução.',
        [
          'Guardar todos os programas.',
          'Substituir a ALU.',
          'Aumentar a capacidade da cache.',
        ],
        'Ela sequencia microoperações e habilita os caminhos de dados apropriados.',
      ],
      [
        'O componente que realiza adições e comparações aritméticas',
        'ALU',
        ['PC', 'cache', 'barramento de endereço'],
        'A unidade lógico-aritmética executa operações sobre operandos.',
      ],
      [
        'O registrador que normalmente guarda o endereço da próxima instrução',
        'PC',
        ['IR', 'MAR', 'MDR'],
        'O contador de programa avança ou recebe um novo alvo em desvios.',
      ],
      [
        'A etapa de busca de instrução',
        'Lê da memória a instrução apontada pelo PC.',
        [
          'Escreve o resultado na cache.',
          'Decodifica antes de buscar.',
          'Substitui a ALU.',
        ],
        'A instrução precisa estar disponível antes de poder ser decodificada e executada.',
      ],
      [
        'A vantagem típica de uma ISA RISC',
        'Instruções simples e regulares facilitam a implementação.',
        [
          'Não precisa de registradores.',
          'Não possui instruções de salto.',
          'Usa memória apenas uma vez.',
        ],
        'O conjunto tende a privilegiar formatos previsíveis e operações simples.',
      ],
    ],
  },
  {
    key: 'modos-de-enderecamento',
    facts: [
      [
        'No endereçamento imediato, o operando está',
        'Na própria instrução.',
        ['Apenas na cache.', 'No registrador PC.', 'No disco.'],
        'O valor literal vem codificado junto ao opcode.',
      ],
      [
        'No endereçamento por registrador, o operando é obtido',
        'De um registrador indicado.',
        ['Sempre da RAM.', 'Da pilha sem referência.', 'De uma porta lógica.'],
        'A instrução nomeia o registrador que contém o dado.',
      ],
      [
        'No endereçamento indireto por registrador, um registrador contém',
        'O endereço do operando.',
        ['O próprio opcode.', 'A taxa do clock.', 'O bit de paridade.'],
        'Há uma etapa adicional: usar o conteúdo do registrador como endereço.',
      ],
      [
        'O modo base mais deslocamento é útil para',
        'Acessar campos em estruturas e elementos próximos.',
        [
          'Eliminar endereços.',
          'Trocar RAM por registradores.',
          'Remover saltos condicionais.',
        ],
        'Um registrador base aponta a região e o deslocamento seleciona a posição relativa.',
      ],
      [
        'O risco de confundir valor imediato com endereço imediato',
        'Ler um dado diferente do pretendido.',
        [
          'Aumentar a capacidade da ROM.',
          'Criar uma cache hit.',
          'Desligar o barramento.',
        ],
        'Um modo usa o campo como valor; o outro usa o campo para localizar um valor.',
      ],
    ],
  },
  {
    key: 'desempenho-e-pipeline',
    facts: [
      [
        'A ideia central do pipeline de instruções',
        'Sobrepor etapas de instruções diferentes.',
        [
          'Executar várias instruções em uma única etapa.',
          'Eliminar a busca de instrução.',
          'Impedir desvios.',
        ],
        'Enquanto uma instrução executa, outra pode estar sendo buscada ou decodificada.',
      ],
      [
        'Um hazard de dados ocorre quando',
        'Uma instrução precisa de um resultado ainda não produzido.',
        ['A RAM tem capacidade alta.', 'O clock para.', 'A cache tem hit.'],
        'A dependência entre instruções pode exigir espera, encaminhamento ou reorganização.',
      ],
      [
        'O efeito de uma previsão de desvio incorreta',
        'Parte do pipeline precisa ser descartada e refeita.',
        [
          'A instrução anterior muda de valor.',
          'A RAM se torna ROM.',
          'Todos os registradores zeram.',
        ],
        'Instruções carregadas no caminho errado não devem completar seus efeitos.',
      ],
      [
        'A relação correta entre clock mais rápido e desempenho',
        'Depende também de ciclos por instrução e do trabalho executado.',
        [
          'Clock maior garante desempenho dobrado.',
          'Clock não influencia desempenho.',
          'Só a RAM define desempenho.',
        ],
        'Tempo de execução combina frequência, CPI e quantidade de instruções.',
      ],
      [
        'A técnica de forwarding no pipeline',
        'Encaminha um resultado diretamente a uma etapa que precisa dele.',
        [
          'Copia programas para a ROM.',
          'Transforma desvio em chamada.',
          'Remove a ALU.',
        ],
        'Ela reduz esperas em dependências de dados específicas.',
      ],
    ],
  },
  {
    key: 'barramentos-e-entrada-saida',
    facts: [
      [
        'O barramento de dados transporta principalmente',
        'Valores entre componentes.',
        ['Somente endereços.', 'Apenas sinais de clock.', 'Senhas de usuário.'],
        'Ele carrega o conteúdo lido ou escrito.',
      ],
      [
        'O barramento de endereços informa',
        'Qual posição ou dispositivo será acessado.',
        [
          'O valor final da operação.',
          'O código de correção.',
          'A frequência do processador.',
        ],
        'O endereço seleciona o destino da transferência.',
      ],
      [
        'A função de uma interrupção de E/S',
        'Avisar a CPU sobre um evento que requer atenção.',
        [
          'Apagar o dispositivo.',
          'Aumentar a largura do barramento.',
          'Converter RAM em cache.',
        ],
        'Ela evita que a CPU precise consultar continuamente o periférico.',
      ],
      [
        'DMA é vantajoso porque',
        'Permite transferências entre dispositivo e memória com pouca intervenção da CPU.',
        [
          'Elimina a memória principal.',
          'Substitui toda interrupção.',
          'Impede acesso a periféricos.',
        ],
        'O controlador DMA assume a transferência e sinaliza a conclusão.',
      ],
      [
        'A arbitragem de barramento resolve',
        'Qual mestre pode usar o barramento em um momento.',
        [
          'Qual bit vale um.',
          'Qual cache deve ser apagada.',
          'Qual instrução é inválida.',
        ],
        'Vários componentes podem solicitar o mesmo recurso compartilhado.',
      ],
    ],
  },
];

const modes = [
  [
    'direct',
    'Qual alternativa está correta?',
    'Aplicar a definição diretamente.',
  ],
  [
    'diagnosis',
    'Um estudante afirmou a opção destacada. Qual avaliação é adequada?',
    'Conferir a afirmação com a definição do conceito.',
  ],
  [
    'strategy',
    'Qual é a estratégia conceitualmente correta para analisar a situação?',
    'Identificar primeiro a função de cada componente.',
  ],
  [
    'verification',
    'Qual conclusão permanece válida após uma verificação cuidadosa?',
    'Separar o que o conceito garante do que ele não garante.',
  ],
  [
    'context',
    'Em uma revisão de projeto, qual decisão é compatível com esse princípio?',
    'Relacionar o princípio ao comportamento observado.',
  ],
];

function makeOptions(answer, distractors, offset) {
  const values = [answer, ...distractors];
  const shift = offset % values.length;
  const ordered = [...values.slice(shift), ...values.slice(0, shift)];
  return { options: ordered, correct: ordered.indexOf(answer) };
}

function makeQuestion(topic, factIndex, difficultyIndex) {
  const [statement, answer, distractors, reason] = topic.facts[factIndex];
  const [mode, command, action] =
    modes[(factIndex + difficultyIndex) % modes.length];
  const difficulty = ['easy', 'medium', 'hard'][difficultyIndex];
  const intro = [
    'Considere uma atividade de laboratório sobre arquitetura de computadores.',
    'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito.',
    'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções.',
  ][(factIndex + difficultyIndex) % 3];
  const prompt =
    difficulty === 'easy'
      ? `${intro} ${statement}. ${command}`
      : difficulty === 'medium'
        ? `${intro} Um colega usa essa ideia para justificar uma decisão. ${statement}. ${command}`
        : `${intro} A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. ${statement}. ${command}`;
  const { options, correct } = makeOptions(
    answer,
    distractors,
    factIndex + difficultyIndex,
  );
  const label = ['A', 'B', 'C', 'D'][correct];
  return {
    topic: topic.key,
    difficulty,
    statement: prompt,
    options,
    correct,
    hints: [
      `Nomeie o conceito principal antes de avaliar as alternativas.`,
      action,
      `Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.`,
    ],
    finalAnswer: answer,
    explanation: `${reason} A alternativa ${label} expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.`,
    steps: [
      [
        'Identifique o foco',
        `O enunciado trata de ${topic.key.replaceAll('-', ' ')} e pede uma interpretação conceitual.`,
      ],
      ['Recupere a definição', reason],
      ['Aplique ao caso', `A informação relevante permite concluir: ${answer}`],
      [
        'Elimine distrações',
        'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.',
      ],
      [
        'Verifique a conclusão',
        `A resposta permanece coerente com a definição; portanto, a alternativa ${label} é a correta.`,
      ],
    ],
    mode,
  };
}

export function createComputerArchitectureBank() {
  return topics.flatMap((topic) =>
    Array.from({ length: 15 }, (_, index) =>
      makeQuestion(topic, index % 5, Math.floor(index / 5)),
    ),
  );
}

export const architectureTopics = topics.map((topic) => topic.key);
