# Auditoria completa — Álgebra Linear

Data: 2026-09-10. Escopo reconstruído pelas migrations locais aplicadas à disciplina `algebra-linear`; somente questões com `publication_status = 'published'`. Não houve alteração de questões de múltipla escolha.

## Resumo executivo

- Total publicado: **111** questões.
- Por tipo: **111 `multiple_choice`**; **0 `reveal_answer`**.
- Questões `reveal_answer` a excluir: **0**. A migration entregue é propositalmente *no-op* no estado atual, mas excluirá fisicamente qualquer questão aberta futura da disciplina.
- Múltipla escolha: **111**. Há 4 alternativas e uma chave de resposta em todas; 108 têm 3 dicas e 4 passos. As 3 questões legadas abaixo não cumprem a regra das três dicas.
- Recalculo dos gabaritos: não encontrei resultado matemático incorreto, nem segunda alternativa correta, nos 111 itens. As falhas encontradas são de pedagogia, proveniência, duplicidade e notação/LaTeX.

## Problemas por questão

| ID | Enunciado resumido | Tipo / gravidade | Evidência concreta | Correção recomendada |
| --- | --- | --- | --- | --- |
| `...000003` | Determinante de matriz 2×2 | estrutura e proveniência / alta | Não possui registro em `question_hints`; a fonte `Arc development fixture` ficou com `rights_status = unverified`. | Manter fora de nova publicação até registrar proveniência aprovada e criar 3 dicas progressivas. |
| `...000008` | Determinante de matriz 2×2 | estrutura e proveniência / alta | Tem somente 1 dica; usa a mesma fonte `unverified`. | Registrar direitos aprovados e incluir 2 dicas específicas. |
| `...000009` | Autovalores de matriz diagonal 2×2 | duplicidade, estrutura e proveniência / alta | Tem somente 1 dica; fonte `unverified`; repete a habilidade/comando de `...900077` (ler diretamente autovalores de matriz diagonal). | Substituir ou reescrever com outra habilidade; aprovar origem e completar as dicas. |
| `...900011` | Composição de matrizes 3×2 e 2×3 | LaTeX / média | Solução contém `$vmapsto Bvmapsto A(Bv)$`, sem `\\mapsto`; a semântica da cadeia fica visualmente inválida. | Usar `v\\mapsto Bv\\mapsto A(Bv)`. |
| `...900023` | Dimensão de $P_2$ | LaTeX / média | Passo traz `$p=acdot1+bcdot x+ccdot x^2$` e `$dim P_2=3$`; comandos foram concatenados após perda de barra. | Usar `$p=a\\cdot1+b\\cdot x+c\\cdot x^2$` e `$\\dim P_2=3$`. |
| `...900029` | Posto-nulidade de $T:\mathbb R^5\\to\mathbb R^3$ | LaTeX / alta | Passos têm `dimker`, `dimoperatorname` e `mathbb R^5` sem comandos separados. | Corrigir para `\\dim\\ker T + \\operatorname{Im}T = 5` e `\\mathbb R^5`. |
| `...900030` | Dimensão de $U\\cap V$ | LaTeX / alta | Passos apresentam `dim(Ucap V)`; `\\dim` e `\\cap` não renderizam como operadores. | Usar `\\dim(U\\cap V)`. |
| `...900031` | Base das matrizes simétricas | LaTeX / média | Passo final usa `$dim S=3$`. | Usar `$\\dim S=3$`. |
| `...900032` | Dimensão de $\{p\in P_3:p(1)=0\}$ | LaTeX / alta | Passo 1 contém tab e `$T:P_3\tomathbb R$`; os demais usam `$W=ker T$` e `$dim W=...$`. | Usar `$T:P_3\\to\\mathbb R$`, `$W=\\ker T$`, `$\\dim W=\\dim P_3-1=3$`. |
| `...900033` | Complemento direto em $\mathbb R^3$ | LaTeX / média | Passo contém `$x,yinmathbb R$`. | Usar `$x,y\\in\\mathbb R$`. |
| `...900040` | Matriz de coordenadas de $B$ para $E$ | LaTeX / média | Conferência usa `$P_{Eleftarrow B}` sem `\\leftarrow`. | Usar `$P_{E\\leftarrow B}`. |
| `...900042` | Decomposição em soma direta | LaTeX / média | Passo de verificação usa `$Ucap V={0}$`. | Usar `$U\\cap V=\\{0\\}$`. |
| `...900049` | Mudança de base $B$ para $C$ | LaTeX / média | Explicação usa `$Cleftarrow B$`. | Usar `$C\\leftarrow B$`. |
| `...900050` | Composição de mudanças de base | LaTeX / alta | Quatro passos usam `P_{Cleftarrow B}`, `P_{Dleftarrow C}` e `P_{Dleftarrow B}` sem barra. | Restaurar `\\leftarrow` em todas as matrizes de transição. |
| `...900053` | Projeção sobre $U$ ao longo de $V$ | LaTeX / média | Primeira dica mostra `$uin U$` e `$vin V$`. | Usar `$u\\in U$` e `$v\\in V$`. |
| `...900054` | Coordenadas em plano de $\mathbb R^3$ | LaTeX / média | Passo final usa `mathbb R^3` sem barra. | Usar `\\mathbb R^3`. |
| `...900061` | Posto 4 implica injetividade | LaTeX / alta | Passos usam `dimker`, `operatorname{posto}` e `mathbb R^5` sem as barras. | Reescrever cada expressão com `\\dim`, `\\ker`, `\\operatorname` e `\\mathbb`. |
| `...900065` | Inclusão entre núcleos na composição | LaTeX / alta | Alternativas, gabarito e passos têm `ker Tsubseteqker(Scirc T)` e `vinker T`; a notação central está quebrada. | Usar `\\ker T\\subseteq\\ker(S\\circ T)` e `$v\\in\\ker T$`. |
| `...900068` | Restrição a complemento do núcleo | LaTeX / alta | Passos têm `dimker T`, `dim U` e `Ucapker T`. | Usar `\\dim\\ker T`, `\\dim U` e `$U\\cap\\ker T=\\{0\\}$`. |
| `...900073`–`...900090` | Lote de determinantes, autovalores e diagonalização | dicas repetidas/genéricas / média | As mesmas dicas aparecem 18 vezes: “Identifique a propriedade estrutural…”, “Faça o cálculo simbólico…” e “Confira o resultado por traço, determinante, dimensão ou substituição.” | Reescrever as 54 dicas de modo progressivo e ligado a cada questão. |
| `...900091`–`...900108` | Lote de produto interno, ortogonalidade e projeções | dicas repetidas/genéricas / média | As mesmas 3 dicas aparecem 18 vezes: “Identifique a definição…”, “Calcule cada produto…” e “Verifique sinal, dimensão e ortogonalidade…”. | Reescrever as 54 dicas por conceito, decisão e verificação intermediária. |
| `...900097` | Ângulo entre $(1,1)$ e $(1,-1)$ | LaTeX / alta | Solução e passos contêm tabs em `$\theta$` e `$cos\theta$`; faltam `\\theta` e `\\cos`. | Usar `$\\theta=90^\\circ$` e `$\\cos\\theta=0$`. |

Os IDs abreviados preservam o sufixo único do UUID completo `40000000-0000-4000-8000-000000…`.

## Duplicidade e padrões

- Duplicidade muito semelhante: `...000009` e `...900077` pedem leitura direta de autovalores de uma matriz diagonal. Não há outros enunciados idênticos; os 108 itens dos seis lotes têm esqueletos de enunciado distintos.
- Dicas: os dois blocos de 18 itens acima são repetição literal e não satisfazem a progressão exigida pelo protocolo.
- Passos: não há blocos de conteúdo de resolução copiados literalmente. Há 44 títulos finais `Conclua`; isoladamente, isso é apenas um padrão de estrutura e os conteúdos finais permanecem específicos. Recomenda-se variar a formulação quando as revisões de dicas forem feitas.

## Distribuição

### Assunto primário

| Assunto | Questões |
| --- | ---: |
| Determinantes | 9 |
| Coordenadas em bases | 9 |
| Autovalores e autovetores | 7 |
| Núcleo e imagem | 7 |
| Mudança de base | 6 |
| Eliminação gaussiana; Sistemas lineares; Bases e dimensão; Produto interno e norma; Projeções e mínimos quadrados; Diagonalização | 5 cada |
| Operações com matrizes; Matrizes inversas e fatorações; Subespaços vetoriais; Somas diretas; Matriz de uma transformação; Composição, inversa e isomorfismos; Ortogonalidade; Formas quadráticas | 4 cada |
| Dependência e independência linear; Espaços linha, coluna e nulo; Transformações geométricas | 3 cada |
| Combinações lineares e conjuntos geradores | 2 |

Não há concentração excessiva no banco completo: os maiores grupos representam 9/111 (8,1%) cada. Há oportunidade de reforçar combinações/geradores (2 itens).

### Dificuldade e gabarito

| Dificuldade | Questões | Alternativa correta | Questões |
| --- | ---: | --- | ---: |
| easy | 38 | A | 30 |
| medium | 37 | B | 27 |
| hard | 36 | C | 27 |
|  |  | D | 27 |

A distribuição de dificuldade é equilibrada. A alternativa A excede as demais em 3 ocorrências, diferença pequena e explicada pelas três questões legadas.

## Checklist matemático e editorial

- [x] Todos os 111 itens são `multiple_choice`; há exatamente quatro alternativas e uma chave.
- [x] Não foi encontrado gabarito matematicamente incorreto, alternativa duplicada ou dupla resposta correta.
- [x] Os distratores, fora das falhas de renderização listadas, representam erros plausíveis.
- [x] Os 108 itens recentes têm 3 dicas e pelo menos 4 passos; as questões legadas têm passos completados por migration posterior.
- [ ] `...000003`, `...000008` e `...000009` não têm 3 dicas.
- [ ] A fonte das três questões legadas é `unverified`, incompatível com publicação.
- [ ] 17 itens listados têm LaTex/notação corrompidos em pelo menos uma dica, solução ou passo.
- [ ] 36 itens têm dicas repetidas e genéricas.
- [ ] Há uma duplicidade pedagógica (`...000009` / `...900077`).

## Migration de exclusão

Arquivo: `supabase/migrations/20260910112000_delete_linear_algebra_reveal_answer_questions.sql`.

Ela é transacional e idempotente: seleciona `subjects.slug = 'algebra-linear'` e `kind = 'reveal_answer'`, remove `question_attempts` (a única dependência com `ON DELETE RESTRICT`), estado de revisão, chave, opções e conteúdos, e então remove a questão. As relações com `ON DELETE CASCADE` também são apagadas explicitamente; `question_sources` é preservada como histórico de proveniência.
