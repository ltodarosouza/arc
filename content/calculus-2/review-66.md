# Lote #66 — 12 questões para revisão

Autoria: Codex, por solicitação do responsável pelo projeto. Data: 2026-09-07.

Estado: rascunho. Revisor técnico: pendente. Revisão pedagógica e aprovação de direitos: pendentes.

A alternativa marcada é o gabarito proposto, ainda sujeito à revisão independente.

## 1. Testes de comparação, razão e raiz — easy

ID: 40000000-0000-4000-8000-000000006600

Qual comparação prova a convergência de $\sum_{n=1}^\infty1/(n^2+1)$?

A. $0<1/(n^2+1)\le1/n^2$.
B. $1/(n^2+1)\le1/n$.
C. $1/(n^2+1)\ge1/n^2$.
D. O termo geral tende a zero, o que basta.

Gabarito proposto: **A**

1. Como $n^2+1\ge n^2$, o inverso é menor ou igual a $1/n^2$.
2. A série maior é convergente, com $p=2$; a comparação direta conclui.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 2. Testes de comparação, razão e raiz — easy

ID: 40000000-0000-4000-8000-000000006601

Qual comparação prova que $\sum_{n=1}^\infty1/\sqrt n$ diverge?

A. O termo tende a zero, logo a série diverge.
B. $1/\sqrt n\ge1/n$ e a série harmônica diverge.
C. $1/\sqrt n\le1$ e a série constante diverge.
D. $1/\sqrt n\ge1/n^2$ e a série de quadrados converge.

Gabarito proposto: **B**

1. Para $n\ge1$, $\sqrt n\le n$, então $1/\sqrt n\ge1/n$.
2. A série menor já diverge; as somas parciais da maior também são ilimitadas.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 3. Testes de comparação, razão e raiz — medium

ID: 40000000-0000-4000-8000-000000006602

Ao comparar $a_n=(3n+1)/(n^3+2)$ com $b_n=1/n^2$, qual conclusão é correta?

A. $a_n/b_n\to3$; a série diverge.
B. $a_n/b_n\to\infty$; a série converge.
C. $a_n/b_n\to3$; a série de $a_n$ converge.
D. $a_n/b_n\to0$; a série diverge.

Gabarito proposto: **C**

1. A razão é $(3n^3+n^2)/(n^3+2)$ e tende a $3$.
2. Esse limite é positivo e finito; as duas séries têm o mesmo comportamento. Como $\sum1/n^2$ converge, a série proposta também converge.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 4. Testes de comparação, razão e raiz — hard

ID: 40000000-0000-4000-8000-000000006603

Compare $a_n=1/\sqrt{n^2+3n}$ com $b_n=1/n$.

A. A razão tende a $1$, e $\sum a_n$ converge.
B. A razão tende a $0$, e $\sum a_n$ converge.
C. A razão tende a $3$, e $\sum a_n$ diverge.
D. A razão tende a $1$, e $\sum a_n$ diverge.

Gabarito proposto: **D**

1. A razão é $n/\sqrt{n^2+3n}=1/\sqrt{1+3/n}\to1$.
2. A comparação pelo limite com a série harmônica garante divergência, apesar de cada termo ser menor que $1/n$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 5. Testes de comparação, razão e raiz — easy

ID: 40000000-0000-4000-8000-000000006604

Pelo teste da razão, $\sum_{n=1}^\infty n/3^n$:

A. Converge, com limite da razão $1/3$.
B. Diverge, com limite da razão $3$.
C. Converge, com limite da razão $0$.
D. O teste é inconclusivo, pois o limite é $1$.

Gabarito proposto: **A**

1. A razão entre termos consecutivos é $(n+1)/(3n)$.
2. Seu limite é $1/3<1$; a série converge.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 6. Testes de comparação, razão e raiz — medium

ID: 40000000-0000-4000-8000-000000006605

Pelo teste da razão, $\sum_{n=1}^\infty2^n/n!$:

A. Converge, com limite da razão $1/2$.
B. Converge, com limite da razão $0$.
C. Diverge, com limite da razão $2$.
D. O teste é inconclusivo, com limite $1$.

Gabarito proposto: **B**

1. Usando $(n+1)!=(n+1)n!$, a razão é $2/(n+1)$.
2. Ela tende a zero, menor que um, garantindo convergência.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 7. Testes de comparação, razão e raiz — medium

ID: 40000000-0000-4000-8000-000000006606

Pelo teste da razão, $\sum_{n=1}^\infty n!/4^n$:

A. Converge, pois a razão tende a $1/4$.
B. O teste é inconclusivo, pois a razão tende a $1$.
C. Diverge, pois a razão tende a $+\infty$.
D. Converge, pois a razão tende a $0$.

Gabarito proposto: **C**

1. A razão é $(n+1)/4$.
2. Ela ultrapassa um e tende a infinito; em particular os termos não tendem a zero.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 8. Testes de comparação, razão e raiz — hard

ID: 40000000-0000-4000-8000-000000006607

Para $\sum_{n=1}^\infty1/n^2$, o teste da razão:

A. Prova divergência porque o limite é $1$.
B. Prova convergência porque o limite é $1$.
C. Prova convergência porque o limite é $0$.
D. É inconclusivo: o limite é $1$, mas a série converge pelo critério $p>1$.

Gabarito proposto: **D**

1. A razão é $n^2/(n+1)^2\to1$. O teste da razão não decide nesse caso.
2. Outro critério resolve: a série tem $p=2>1$, logo converge.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 9. Testes de comparação, razão e raiz — easy

ID: 40000000-0000-4000-8000-000000006608

Pelo teste da raiz, $\sum_{n=1}^\infty(2/5)^n$:

A. Converge, com limite da raiz $2/5$.
B. Diverge, com limite da raiz $5/2$.
C. É inconclusivo, com limite $1$.
D. Converge, com limite da raiz $0$.

Gabarito proposto: **A**

1. A raiz de ordem $n$ do termo positivo é exatamente $2/5$.
2. Como $2/5<1$, o teste garante convergência.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 10. Testes de comparação, razão e raiz — medium

ID: 40000000-0000-4000-8000-000000006609

Pelo teste da raiz, $\sum_{n=1}^\infty[(n+1)/(3n)]^n$:

A. Converge, com limite da raiz $0$.
B. Converge, com limite da raiz $1/3$.
C. Diverge, com limite da raiz $3$.
D. É inconclusivo, com limite $1$.

Gabarito proposto: **B**

1. A raiz de ordem $n$ cancela a potência, deixando $(n+1)/(3n)$.
2. Esse valor tende a $1/3<1$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 11. Testes de comparação, razão e raiz — medium

ID: 40000000-0000-4000-8000-000000006610

Pelo teste da raiz, $\sum_{n=1}^\infty(2n/(n+1))^n$:

A. É inconclusivo, com limite $1$.
B. Converge, com limite da raiz $0$.
C. Diverge, com limite da raiz $2$.
D. Converge, com limite da raiz $1/2$.

Gabarito proposto: **C**

1. A raiz de ordem $n$ é $2n/(n+1)$.
2. Seu limite é $2>1$, o que implica divergência.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 12. Testes de comparação, razão e raiz — hard

ID: 40000000-0000-4000-8000-000000006611

Pelo teste da raiz, $\sum_{n=1}^\infty n^3/2^n$:

A. Diverge, com limite da raiz $2$.
B. É inconclusivo, com limite $1$.
C. Converge, com limite da raiz $0$.
D. Converge, com limite da raiz $1/2$.

Gabarito proposto: **D**

1. A raiz é $n^{3/n}/2$. Escreva $n^{3/n}=e^{3\ln n/n}$.
2. Como $\ln n/n\to0$, o numerador tende a $1$. O limite é $1/2<1$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos
