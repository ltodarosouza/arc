# Lote #62 — 20 questões para revisão

Autoria: Codex, por solicitação do responsável pelo projeto. Data: 2026-09-07.

Estado: rascunho. Revisor técnico: pendente. Revisão pedagógica e aprovação de direitos: pendentes.

A alternativa marcada é o gabarito proposto, ainda sujeito à revisão independente.

## 1. Integração por partes — easy

ID: 40000000-0000-4000-8000-000000006200

Calcule $\int xe^x\,dx$.

A. $e^x(x-1)+C$
B. $xe^x+C$
C. $e^x(x+1)+C$
D. $x^2e^x/2+C$

Gabarito proposto: **A**

1. Escolha $u=x$ e $dv=e^x dx$, logo $du=dx$ e $v=e^x$.
2. Por partes, $\int xe^x dx=xe^x-\int e^x dx=e^x(x-1)+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 2. Integração por partes — easy

ID: 40000000-0000-4000-8000-000000006201

Para $x>0$, calcule $\int\ln x\,dx$.

A. $x\ln x+x+C$
B. $x\ln x-x+C$
C. $x\ln x+C$
D. $1/x+C$

Gabarito proposto: **B**

1. Use $u=\ln x$ e $dv=dx$, de modo que $du=dx/x$ e $v=x$.
2. A fórmula dá $x\ln x-\int 1\,dx=x\ln x-x+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 3. Integração por partes — medium

ID: 40000000-0000-4000-8000-000000006202

Calcule $\int x\cos x\,dx$.

A. $x\cos x-\sin x+C$
B. $\sin x+C$
C. $x\sin x+\cos x+C$
D. $x\sin x-\cos x+C$

Gabarito proposto: **C**

1. Tome $u=x$, $dv=\cos x\,dx$. Então $v=\sin x$.
2. Obtemos $x\sin x-\int\sin x\,dx=x\sin x+\cos x+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 4. Integração por partes — medium

ID: 40000000-0000-4000-8000-000000006203

Calcule $\int xe^{2x}\,dx$.

A. $e^{2x}(x-1)+C$
B. $xe^{2x}/2+C$
C. $e^{2x}(x/2+1/4)+C$
D. $e^{2x}(x/2-1/4)+C$

Gabarito proposto: **D**

1. Com $u=x$ e $dv=e^{2x}dx$, temos $v=e^{2x}/2$.
2. Subtraia $\frac12\int e^{2x}dx$ de $xe^{2x}/2$, obtendo $e^{2x}(x/2-1/4)+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 5. Integração por partes — medium

ID: 40000000-0000-4000-8000-000000006204

Para $x>0$, calcule $\int x\ln x\,dx$.

A. $x^2\ln x/2-x^2/4+C$
B. $x^2\ln x/2-x^2/2+C$
C. $x^2\ln x-x^2+C$
D. $x^2\ln x/2+C$

Gabarito proposto: **A**

1. Escolha $u=\ln x$ e $dv=x\,dx$, com $v=x^2/2$.
2. O termo restante é $\frac12\int x\,dx=x^2/4$, que deve ser subtraído de $x^2\ln x/2$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 6. Integração por partes — hard

ID: 40000000-0000-4000-8000-000000006205

Calcule $\int x^2e^x\,dx$.

A. $e^x(x^2-x+1)+C$
B. $e^x(x^2-2x+2)+C$
C. $e^x(x^2-2x)+C$
D. $e^x(x^2+2x+2)+C$

Gabarito proposto: **B**

1. Uma integração por partes resulta em $x^2e^x-2\int xe^x dx$.
2. Repita por partes: $\int xe^x dx=e^x(x-1)$. Substituindo, resulta $e^x(x^2-2x+2)+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 7. Integração por partes — hard

ID: 40000000-0000-4000-8000-000000006206

Calcule $\int e^x\sin x\,dx$.

A. $e^x(\sin x-\cos x)+C$
B. $e^x\sin x+C$
C. $e^x(\sin x-\cos x)/2+C$
D. $e^x(\sin x+\cos x)/2+C$

Gabarito proposto: **C**

1. Defina $I=\int e^x\sin x dx$. Por partes, $I=e^x\sin x-\int e^x\cos x dx$.
2. A segunda integral é $e^x\cos x+I$. Logo $2I=e^x(\sin x-\cos x)$; divida por dois.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 8. Funções racionais e frações parciais — easy

ID: 40000000-0000-4000-8000-000000006207

Em um intervalo que não contém $0$ nem $-1$, calcule $\int\frac{dx}{x(x+1)}$.

A. $\ln|x|+\ln|x+1|+C$
B. $-1/[x(x+1)]+C$
C. $\ln|x+1|-\ln|x|+C$
D. $\ln|x|-\ln|x+1|+C$

Gabarito proposto: **D**

1. Decomponha $1/[x(x+1)]=1/x-1/(x+1)$.
2. Integre cada fração: $\ln|x|-\ln|x+1|+C$. Os módulos permitem os intervalos admissíveis.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 9. Funções racionais e frações parciais — easy

ID: 40000000-0000-4000-8000-000000006208

Para $x>2$, calcule $\int\frac{3}{(x-2)(x+1)}\,dx$.

A. $\ln(x-2)-\ln(x+1)+C$
B. $3\ln(x-2)-3\ln(x+1)+C$
C. $\ln(x-2)+\ln(x+1)+C$
D. $\ln(x+1)-\ln(x-2)+C$

Gabarito proposto: **A**

1. Busque $A/(x-2)+B/(x+1)$. A identidade $3=A(x+1)+B(x-2)$ dá $A=1$, $B=-1$.
2. Integre as duas parcelas; como $x>2$, os argumentos dos logaritmos são positivos.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 10. Funções racionais e frações parciais — medium

ID: 40000000-0000-4000-8000-000000006209

Para $x>0$, calcule $\int\frac{2x+3}{x(x+1)}\,dx$.

A. $3\ln x+\ln(x+1)+C$
B. $3\ln x-\ln(x+1)+C$
C. $2\ln x+3\ln(x+1)+C$
D. $\ln x+\ln(x+1)+C$

Gabarito proposto: **B**

1. A identidade $2x+3=A(x+1)+Bx$ fornece $A=3$ e $B=-1$.
2. Integre $3/x-1/(x+1)$ para obter $3\ln x-\ln(x+1)+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 11. Funções racionais e frações parciais — medium

ID: 40000000-0000-4000-8000-000000006210

Para $x>1$, calcule $\int\frac{dx}{x^2-1}$.

A. $\frac12\ln(x^2-1)+C$
B. $\arctan x+C$
C. $\frac12\ln(x-1)-\frac12\ln(x+1)+C$
D. $\ln(x-1)-\ln(x+1)+C$

Gabarito proposto: **C**

1. Fatore $x^2-1=(x-1)(x+1)$. As frações têm coeficientes $1/2$ e $-1/2$.
2. Integre $1/[2(x-1)]-1/[2(x+1)]$, conservando o fator $1/2$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 12. Funções racionais e frações parciais — hard

ID: 40000000-0000-4000-8000-000000006211

Para $x>0$, calcule $\int\frac{dx}{x(x+1)^2}$.

A. $\ln x-\ln(x+1)-1/(x+1)+C$
B. $\ln x-2\ln(x+1)+C$
C. $1/(x+1)+C$
D. $\ln x-\ln(x+1)+1/(x+1)+C$

Gabarito proposto: **D**

1. O fator repetido exige $A/x+B/(x+1)+D/(x+1)^2$. A identidade dos numeradores dá $A=1$, $B=-1$, $D=-1$.
2. A primitiva de $-(x+1)^{-2}$ é $+(x+1)^{-1}$. Some esse termo aos dois logaritmos.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 13. Funções racionais e frações parciais — hard

ID: 40000000-0000-4000-8000-000000006212

Para $x>0$, calcule $\int\frac{x^2+1}{x(x+1)}\,dx$.

A. $x+\ln x-2\ln(x+1)+C$
B. $\ln x-2\ln(x+1)+C$
C. $x+\ln x+2\ln(x+1)+C$
D. $x-\ln x+C$

Gabarito proposto: **A**

1. Faça primeiro a divisão: $(x^2+1)/(x^2+x)=1+(1-x)/(x(x+1))$.
2. A parte própria é $1/x-2/(x+1)$. Integrando com o termo polinomial, resulta $x+\ln x-2\ln(x+1)+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 14. Integrais trigonométricas — easy

ID: 40000000-0000-4000-8000-000000006213

Calcule $\int\sin^2x\,dx$.

A. $x-\sin(2x)/2+C$
B. $x/2-\sin(2x)/4+C$
C. $x/2+\sin(2x)/4+C$
D. $-\cos^3x/3+C$

Gabarito proposto: **B**

1. Use a identidade $\sin^2x=(1-\cos2x)/2$.
2. A primitiva de $\cos2x$ é $\sin2x/2$; logo o segundo termo é $-\sin2x/4$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 15. Integrais trigonométricas — easy

ID: 40000000-0000-4000-8000-000000006214

Calcule $\int\cos^2x\,dx$.

A. $\sin^3x/3+C$
B. $x/2+\sin(2x)/2+C$
C. $x/2+\sin(2x)/4+C$
D. $x/2-\sin(2x)/4+C$

Gabarito proposto: **C**

1. Escreva $\cos^2x=(1+\cos2x)/2$.
2. Integre termo a termo, incluindo o fator da regra da cadeia: $x/2+\sin2x/4+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 16. Integrais trigonométricas — medium

ID: 40000000-0000-4000-8000-000000006215

Calcule $\int\sin^3x\,dx$.

A. $-\cos x-\cos^3x/3+C$
B. $\sin^4x/4+C$
C. $\cos x-\cos^3x/3+C$
D. $-\cos x+\cos^3x/3+C$

Gabarito proposto: **D**

1. Separe $\sin x$ e use $\sin^2x=1-\cos^2x$. Com $u=\cos x$, $du=-\sin x dx$.
2. Integre $-\int(1-u^2)du=-u+u^3/3+C$ e retorne a $x$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 17. Integrais trigonométricas — medium

ID: 40000000-0000-4000-8000-000000006216

Calcule $\int\cos^3x\,dx$.

A. $\sin x-\sin^3x/3+C$
B. $\sin x+\sin^3x/3+C$
C. $\cos^4x/4+C$
D. $-\sin x+\sin^3x/3+C$

Gabarito proposto: **A**

1. Escreva $\cos^3x=(1-\sin^2x)\cos x$. Use $u=\sin x$.
2. A integral vira $\int(1-u^2)du=u-u^3/3+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 18. Integrais trigonométricas — medium

ID: 40000000-0000-4000-8000-000000006217

Em $(-\pi/2,\pi/2)$, calcule $\int\tan^2x\,dx$.

A. $\sec^2x+C$
B. $\tan x-x+C$
C. $\tan x+x+C$
D. $\tan^3x/3+C$

Gabarito proposto: **B**

1. A identidade $1+\tan^2x=\sec^2x$ fornece $\tan^2x=\sec^2x-1$.
2. Integre as parcelas: a primitiva de $\sec^2x$ é $\tan x$, resultando $\tan x-x+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 19. Integrais trigonométricas — hard

ID: 40000000-0000-4000-8000-000000006218

Calcule $\int\sin^2x\cos^2x\,dx$.

A. $x/8+\sin(4x)/32+C$
B. $\sin^3x\cos^3x/3+C$
C. $x/8-\sin(4x)/32+C$
D. $x/4-\sin(4x)/16+C$

Gabarito proposto: **C**

1. Use $\sin x\cos x=\sin2x/2$, depois $\sin^22x=(1-\cos4x)/2$. O integrando é $(1-\cos4x)/8$.
2. Integre; a frequência quatro introduz mais um fator $1/4$, dando $x/8-\sin4x/32+C$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos

## 20. Integrais trigonométricas — hard

ID: 40000000-0000-4000-8000-000000006219

Em $(-\pi/2,\pi/2)$, calcule $\int\sec^4x\,dx$.

A. $\tan x-\tan^3x/3+C$
B. $\tan^5x/5+C$
C. $\sec^5x/5+C$
D. $\tan x+\tan^3x/3+C$

Gabarito proposto: **D**

1. Separe $\sec^2x\,dx$ e substitua $u=\tan x$, usando $\sec^2x=1+\tan^2x$.
2. Resta $\int(1+u^2)du=u+u^3/3+C$. Volte a $x$.

Revisão: [ ] gabarito [ ] distratores [ ] clareza [ ] dificuldade [ ] direitos
