---
id: calculo-2-b01-q01
status: technical_review
kind: multiple_choice
subject: Cálculo II
primary_taxonomy_tag: Mudança de variável
secondary_taxonomy_tags: [Integral definida]
difficulty: easy
source_kind: original
source_label: Arc original — reconstrução de Cálculo II, bloco 01
rights_status: approved
author: Equipe editorial Arc
created_at: 2026-09-10
reference_scope: Thomas, Cálculo vol. 2, 11ª ed.; somente competências e progressão.
---

## Statement

Calcule $\int_0^{\ln 2} 3e^x(1+e^x)^2\,dx$.

## Answer options

- A. $8$
- B. $19$
- C. $\frac{13}{2}$
- D. $\frac{27}{2}$

## Correct answer

`B`

## Final answer

$19$

## Hints

1. A expressão $1+e^x$ aparece elevada a uma potência, e sua derivada está presente no integrando.
2. Faça $u=1+e^x$ e substitua os limites antes de integrar.
3. Confira que, nos extremos originais, os novos valores de $u$ são $2$ e $3$.

## Commented solution

1. O fator $e^x$ sugere usar como nova variável a expressão composta $1+e^x$.
2. Defina $u=1+e^x$. Então $du=e^x\,dx$, de modo que $3e^x\,dx=3\,du$.
3. Quando $x=0$, $u=2$; quando $x=\ln2$, $u=3$.
4. A integral se transforma em $3\int_2^3u^2\,du=[u^3]_2^3$.
5. Portanto, o valor é $27-8=19$, correspondente à alternativa B. A mudança dos limites confirma que nenhuma constante de integração deve ser acrescentada.
