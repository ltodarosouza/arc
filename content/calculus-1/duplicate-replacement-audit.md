# Auditoria — substituição de duplicatas de Cálculo I

## Proveniência

- Referência de competências: `Stewart_1_ptbr.pdf`, fornecido pelo usuário em
  `/Users/ltodaro/Downloads/Stewart_1_ptbr.pdf` e consultado em 10 de setembro
  de 2026.
- Uso permitido: somente mapeamento de competências e progressão dos capítulos
  de Funções e Modelos, Limites e Derivadas.
- Origem de cada novo item: `original`; os enunciados, valores, dicas e
  resoluções foram escritos para a Arc e não reproduzem exercícios ou soluções
  do livro.
- Revisão de direitos: Equipe editorial Arc, 10 de setembro de 2026.

## Matriz de cobertura

- Funções e modelos: 10 itens, distribuídos entre representação, modelagem,
  composição, transformações, inversas e logaritmos.
- Limites e continuidade: 10 itens, incluindo limites algébricos,
  laterais, continuidade, assíntotas, racionalização e limite trigonométrico.
- Derivadas: 15 itens, incluindo definição, regras, produto, quociente,
  cadeia, implícita, logarítmica, diferenciais e taxas relacionadas.
- Aplicações de derivadas: 15 itens, incluindo extremos absolutos,
  concavidade, otimização, L'Hôpital, Newton e Teorema do Valor Médio.
- Dificuldade: 17 fáceis, 17 médios e 16 difíceis.

## Auditoria editorial e matemática

- As 50 questões duplicadas de IDs correspondentes aos antigos itens 76–125
  passam para `archived`; tentativas não são apagadas.
- As 50 substitutas usam novos IDs, quatro tópicos principais e 50 comandos
  distintos. A comparação normalizada com os 125 enunciados anteriores não
  encontrou colisões literais.
- Cada item tem três dicas ordenadas, uma resposta final, explicação e cinco
  etapas de resolução. As etapas incorporam os dados, método, transformação e
  verificação específicos de seu item.
- Foi conferida a paridade dos delimitadores matemáticos em todos os itens e a
  compatibilidade das respostas com os cálculos registrados.
- Pontos especialmente conferidos: domínio físico/modelar, sinais em limites
  laterais, condições de logaritmo e raiz, unidade em taxas e extremos em
  intervalos fechados.

## Arquivo de publicação

`supabase/migrations/20260910100000_replace_duplicate_calculus_1_questions.sql`
arquiva as cópias e publica as substitutas em uma única transação idempotente.
