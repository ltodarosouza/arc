# Auditoria final — reconstrução de Cálculo II

Data da revisão: 10 de setembro de 2026.

## Escopo e proveniência

- Banco final: 100 questões autorais de Cálculo II.
- Organização: bloco 01 com 33 itens, bloco 02 com 33 e bloco 03 com 34.
- Referência de competências: George B. Thomas, *Cálculo*, volume 2, 11ª
  edição, consultado somente para escopo, progressão e variedade.
- Não houve transcrição, paráfrase próxima nem preservação da sequência de
  exercícios do livro.
- Os três registros de origem são `original`, pertencem à Arc e estão com
  `rights_status = approved`.

## Contagens verificadas

| Elemento | Quantidade |
| --- | ---: |
| Questões | 100 |
| Alternativas | 400 |
| Chaves de resposta | 100 |
| Dicas progressivas | 300 |
| Soluções | 100 |
| Passos de solução | 500 |

Distribuição editorial final: 33 fáceis, 46 médias e 21 difíceis. A diferença
entre as faixas é intencional: itens originalmente marcados como difíceis que
dependiam apenas de uma rotina conhecida foram reclassificados como médios. Os
21 itens difíceis restantes combinam decisões de método, parâmetros, análise
de extremos, comportamento assintótico ou mais de uma técnica.

## Correções realizadas

- A chave e a resposta do polinômio de Maclaurin de grau 3 de
  $\sin(2x)$ foram corrigidas para $2x-4x^3/3+O(x^5)$.
- O intervalo de uma questão de área entre $y=4-x$ e $y=x^2$ foi corrigido
  para que a ordem declarada das curvas seja verdadeira em todo o domínio.
- Todas as dicas e todos os passos genéricos do bloco 02 foram substituídos
  por orientação matemática específica ao item.
- Problemas fáceis ou médios indevidamente rotulados como difíceis foram
  reclassificados; o bloco 02 também recebeu problemas difíceis com parâmetros,
  alternância assimétrica, produto de séries e análise de extremos.
- Foi acrescentada a centésima questão, sobre diferenciação sucessiva da série
  geométrica para calcular $\sum_{n=1}^{\infty}n^2/2^n$.

## Resultado das auditorias

O script `content/calculo-2/audit-reconstruction.mjs` confirmou:

- 100 enunciados distintos, sem duplicatas exatas nem pares com alta
  similaridade após normalização de números e notação;
- quatro alternativas distintas, uma chave existente, três dicas distintas e
  cinco passos distintos por questão;
- 300 dicas únicas e 500 passos únicos no conjunto completo;
- ausência dos moldes genéricos usados na versão anterior do bloco 02;
- delimitadores LaTeX balanceados e nenhum comando matemático conhecido sem
  barra invertida dentro de `$...$`;
- referências de chave estrangeira das respostas apontando para alternativas
  presentes na mesma entrega.

A passagem matemática foi feita item a item, conferindo resultado, sinal,
domínio, condições de convergência, extremos e unicidade da alternativa
correta. A passagem editorial conferiu clareza do comando, progressão das
dicas, especificidade da resolução e adequação da dificuldade à rubrica.
