# Arquitetura de Computadores - auditoria do banco inicial

## Escopo e proveniência

O banco contém 150 questões originais da Arc. O PDF _Organização Estruturada
de Computadores_ foi inspecionado apenas para escolher competências e o recorte
curricular: representação binária, lógica, circuitos, flip-flops, memória,
cache, CPU, endereçamento, pipeline e entrada/saída. Nenhum enunciado,
alternativa ou solução foi copiado ou parafraseado do livro.

## Distribuição

| Assunto específico                 | Questões |
| ---------------------------------- | -------: |
| Representação e aritmética binária |       15 |
| Lógica booleana                    |       15 |
| Circuitos combinacionais           |       15 |
| Flip-flops e registradores         |       15 |
| Memória cache                      |       15 |
| Memória principal e endereçamento  |       15 |
| Processador e instruções           |       15 |
| Modos de endereçamento             |       15 |
| Desempenho e pipeline              |       15 |
| Barramentos e entrada/saída        |       15 |
| **Total**                          |  **150** |

- Fácil: 50
- Média: 50
- Difícil: 50

## Validações aplicadas

- Os 150 enunciados são distintos e alternam pergunta direta, diagnóstico,
  escolha de estratégia, verificação e contexto de projeto.
- Cada questão possui quatro alternativas distintas, uma única resposta,
  três dicas progressivas e cinco passos de resolução.
- A resposta foi conferida contra a definição técnica apresentada; os
  distratores representam trocas plausíveis entre componentes e conceitos.
- Todo trecho matemático usa pares válidos de `$...$`.
- As migrations são idempotentes e devem ser executadas na ordem dos lotes
  01, 02 e 03. O lote 01 cria a disciplina e sua taxonomia.
