# Auditoria — Cálculo II, questões abertas

## Escopo e proveniência

Este banco contém 125 questões abertas, autorais e independentes de Cálculo II.
O mapa de lançamento em `docs/calculus-2-launch-map.md` orientou competências,
níveis e cobertura; não serviu para reproduzir enunciados. A proveniência de
cada lote é registrada como `original` nas migrations.

## Controle por bloco

| Bloco | Questões | Checagem antes de gerar o próximo bloco |
| --- | ---: | --- |
| 01 | 25 | Releitura do modelo Markdown, três dicas, cinco passos e LaTex válido. |
| 02 | 25 | Releitura do modelo Markdown, independência dos enunciados e LaTex válido. |
| 03 | 25 | Releitura do modelo Markdown, equilíbrio temático e passos didáticos. |
| 04 | 25 | Releitura do modelo Markdown, ausência de referência a item anterior e LaTex válido. |
| 05 | 25 | Releitura final do modelo Markdown, resposta, dicas e solução completas. |

## Cobertura

- Antiderivadas, integral definida, substituição, por partes, frações parciais,
  trigonométricas, impróprias, sequências e séries: 7 ou 8 questões por
  subassunto.
- Dificuldade proposta: 43 fáceis, 44 médias e 38 difíceis.
- Todas as questões têm três dicas progressivas, cinco passos de solução e
  são `reveal_answer`: o estudante desenvolve uma resposta antes de revelar o
  gabarito e se autoavaliar.

## Verificações automatizadas

`node scripts/build-diverse-calculus-2-batch.mjs --batch=NN --check` verifica
o tamanho de cada bloco, enunciados distintos no bloco, mínimos editoriais,
delimitadores matemáticos e renderização KaTeX estrita de cada expressão.
