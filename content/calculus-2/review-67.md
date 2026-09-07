# Lote #67 — 5 questões para revisão

Autoria: Codex, por solicitação do responsável pelo projeto. Data: 2026-09-07.

Estado: rascunho. Revisor técnico: pendente. Revisão pedagógica e aprovação de direitos: pendentes.

A alternativa marcada é o gabarito proposto, ainda sujeito à revisão independente.

## 1. Séries alternadas — easy

ID: 40000000-0000-4000-8000-000000006700

A série $\sum_{n=1}^\infty(-1)^{n+1}/n$ é:

A. Condicionalmente convergente.
B. Absolutamente convergente.
C. Divergente, pois alterna sinais.
D. Divergente, pois o termo geral não tende a zero.

Gabarito proposto: **A**

1. Os módulos $1/n$ decrescem para zero; o teste de Leibniz garante convergência.
2. A série dos módulos é a harmônica e diverge. Logo a convergência é condicional.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 2. Séries alternadas — easy

ID: 40000000-0000-4000-8000-000000006701

A série $\sum_{n=1}^\infty(-1)^{n+1}/n^2$ é:

A. Convergente para zero porque alterna sinais.
B. Absolutamente convergente.
C. Somente condicionalmente convergente.
D. Divergente.

Gabarito proposto: **B**

1. A série dos módulos é $\sum1/n^2$, convergente pois $p=2>1$.
2. Convergência absoluta implica convergência da série com sinais.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 3. Séries alternadas — medium

ID: 40000000-0000-4000-8000-000000006702

Ao aproximar $\sum_{n=1}^\infty(-1)^{n+1}/n$ pelos primeiros dez termos, qual cota de Leibniz se obtém para o erro absoluto?

A. $1/100$
B. $1/9$
C. $1/11$
D. $1/10$

Gabarito proposto: **C**

1. Os módulos decrescem para zero, satisfazendo as hipóteses do teorema do resto.
2. O erro é no máximo o módulo do primeiro termo omitido: $1/(10+1)=1/11$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 4. Séries alternadas — medium

ID: 40000000-0000-4000-8000-000000006703

Qual é o menor número $N$ de termos que garante, pela cota de Leibniz, erro no máximo $0{,}01$ em $\sum_{n=1}^\infty(-1)^{n+1}/n^2$?

A. $10$
B. $99$
C. $8$
D. $9$

Gabarito proposto: **D**

1. A cota é $1/(N+1)^2$. Exija $1/(N+1)^2\le1/100$.
2. Temos $N+1\ge10$, logo $N\ge9$. Para $N=8$, a cota é $1/81>0{,}01$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 5. Séries alternadas — hard

ID: 40000000-0000-4000-8000-000000006704

Se $S$ é a soma de $\sum_{n=1}^\infty(-1)^{n+1}/n$ e $S_{20}$ sua soma parcial, qual intervalo certificado pelo primeiro termo omitido contém $S$?

A. $[S_{20},S_{20}+1/21]$
B. $[S_{20}-1/21,S_{20}]$
C. $[S_{20},S_{20}+1/22]$
D. $[S_{20}-1/22,S_{20}]$

Gabarito proposto: **A**

1. Após um número par de termos, o próximo termo é positivo. O resto tem esse sinal.
2. Seu módulo não supera $1/21$. Portanto $0\le S-S_{20}\le1/21$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos
