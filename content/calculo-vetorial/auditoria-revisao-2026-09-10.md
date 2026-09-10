# Auditoria de Cálculo Vetorial — revisão 2026-09-10

## Escopo e proveniência

Foram examinadas as 160 questões autorais publicadas nos lotes 01–08. Cada uma
mantém seu ID e sua fonte `original` aprovada. A referência bibliográfica já
registrada nas fontes, Steinbruch e Winterle, permanece somente como mapa de
competências e progressão; esta revisão não importou, copiou ou parafraseou
exercícios externos e não criou questões novas.

As migrations `20260910160000_review_vector_calculus_bank.sql` e
`20260910161000_delete_duplicate_vector_calculus_questions.sql` removem 24
itens com comando central redundante: quatro duplicatas conceituais e o bloco
de 20 quádricas que repetia o bloco anterior. A segunda migration também apaga
tentativas desses IDs, pois a chave estrangeira impede excluir uma questão que
tenha tentativas. Restam 136 questões publicadas.

## Matriz de cobertura publicada

| Tag existente | Competências mantidas |
| --- | --- |
| Componentes e base | deslocamento, soma, combinação linear e ponto médio |
| Norma e versores | norma, direção, vetor unitário e distância |
| Produto escalar e projeção | ortogonalidade, ângulos, projeções e trabalho |
| Produto vetorial e misto | orientação, áreas, normais e volume |
| Equações de retas | forma vetorial, paramétrica, interseção e paralelismo |
| Equações de planos | normal, equação, pertencimento e interseções |
| Distâncias e ângulos | ponto–plano, plano–plano e posições espaciais |
| Paralelismo e interseção | retas reversas, coincidência e contenção |
| Volumes e áreas | áreas vetoriais e produto misto |
| Classificação de quádricas | esfera, cilindro, elipsoide, cone, paraboloide e hiperboloide |

Não foram adicionados conteúdos sem tags existentes.

## Correções aplicadas

- Exclusão dos 24 IDs duplicados e de suas tentativas dependentes.
- Recalibração de itens com dificuldade inflada para `easy` ou `medium` quando
  o procedimento é direto ou tem poucos passos.
- Correção das tags de produto escalar/projeção que estavam em norma e
  versores.
- Normalização de `\cdot`, `\circ` e `\theta` em todos os campos textuais.
- Troca de títulos de solução-modelo por títulos ligados à competência de cada
  questão; o desenvolvimento e a verificação específicos já existentes são
  preservados.

## Passagem editorial de dicas e resoluções

O banco **ainda não atende integralmente** ao critério de exclusividade
pedagógica. A leitura dos lotes encontrou 102 títulos-modelo nos dados de
origem (`Identifique a grandeza`, `Aplique a definição`, `Obtenha o resultado`
e `Confira`). A migration de revisão os substitui por títulos associados à tag,
mas vários ainda se repetem entre questões do mesmo tópico.

Não foram encontradas as frases-modelo proibidas `Aplique o método`,
`Substitua os valores` ou `Etapa n da resolução`. Ainda assim, a maioria dos
itens dos lotes 02–08 segue o mesmo molde de quatro passos e a explicação
frequentemente recompõe as três dicas. As terceiras dicas de questões diretas
também dão, em alguns casos, a conta completa; por exemplo, norma, produto
escalar e versor. Portanto, elas são específicas ao conteúdo, mas nem sempre
preservam a progressão sem revelar demais.

Essa passagem diagnosticou a necessidade de revisão individual, executada nas
migrations complementares descritas a seguir.

## Conclusão da revisão

As migrations `20260910163000` a `20260910168000` fazem a passagem individual
dos sete blocos preservados. Questões antigas de aplicação direta foram
reclassificadas como fáceis ou médias; nenhuma delas permanece artificialmente
como difícil. A migration final acrescenta 15 itens difíceis autorais, com
parâmetros, combinação de conceitos, interpretação espacial, cinco passos e
verificação própria. O banco final contém 151 questões publicadas: 136
preservadas e 15 novas difíceis.

O PDF *Geometria Analítica*, de Alfredo Steinbruch e Paulo Winterle, foi usado
somente para mapear a progressão entre vetores, produtos, retas, planos,
métricas e quádricas. Nenhum enunciado, sequência numérica ou solução do livro
foi copiado ou parafraseado.

## Validação

Execute `node scripts/audit-vector-calculus.mjs` para o pré-voo estático. O
script confirma a contagem, IDs, quatro alternativas, três dicas, a lista de
arquivamento e a presença das correções de LaTeX e de cabeçalhos. Depois de
aplicar as migrations em PostgreSQL, `scripts/check-migrations.mjs` valida as
chaves estrangeiras e a execução integral do histórico.
