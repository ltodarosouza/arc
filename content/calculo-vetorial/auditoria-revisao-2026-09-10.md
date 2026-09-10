# Auditoria de Cálculo Vetorial — revisão 2026-09-10

## Escopo e proveniência

Foram examinadas as 160 questões autorais publicadas nos lotes 01–08. Cada uma
mantém seu ID e sua fonte `original` aprovada. A referência bibliográfica já
registrada nas fontes, Steinbruch e Winterle, permanece somente como mapa de
competências e progressão; esta revisão não importou, copiou ou parafraseou
exercícios externos e não criou questões novas.

A migration `20260910160000_review_vector_calculus_bank.sql` arquiva, sem
apagar, 24 itens com comando central redundante: quatro duplicatas conceituais
e o bloco de 20 quádricas que repetia o bloco anterior. Restam 136 questões
publicadas, com os mesmos IDs das questões preservadas.

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

- Arquivamento não destrutivo de duplicatas e variações por troca de números.
- Recalibração de itens com dificuldade inflada para `easy` ou `medium` quando
  o procedimento é direto ou tem poucos passos.
- Correção das tags de produto escalar/projeção que estavam em norma e
  versores.
- Normalização de `\cdot`, `\circ` e `\theta` em todos os campos textuais.
- Troca de títulos de solução-modelo por títulos ligados à competência de cada
  questão; o desenvolvimento e a verificação específicos já existentes são
  preservados.

## Validação

Execute `node scripts/audit-vector-calculus.mjs` para o pré-voo estático. O
script confirma a contagem, IDs, quatro alternativas, três dicas, a lista de
arquivamento e a presença das correções de LaTeX e de cabeçalhos. Depois de
aplicar as migrations em PostgreSQL, `scripts/check-migrations.mjs` valida as
chaves estrangeiras e a execução integral do histórico.
