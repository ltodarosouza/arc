-- Editorial revision for the original ten-question MVP. This migration does
-- not add content volume: it improves wording and turns terse answer keys into
-- useful, step-by-step commented solutions.

update public.questions as question_row
set statement_markdown = revision.statement_markdown
from (
  values
    ('40000000-0000-4000-8000-000000000001'::uuid, 'Calcule a integral indefinida $\int 2x\cos(x^2)\,dx$.'),
    ('40000000-0000-4000-8000-000000000002'::uuid, 'Considere a série $\sum_{n=0}^{\infty}(1/3)^n$. Ela converge? Se convergir, determine sua soma.'),
    ('40000000-0000-4000-8000-000000000003'::uuid, 'Calcule o determinante da matriz $\begin{pmatrix}2 & 1\\ 3 & 4\end{pmatrix}$.'),
    ('40000000-0000-4000-8000-000000000004'::uuid, 'Avalie a integral definida $\int_0^1 3x^2\,dx$.'),
    ('40000000-0000-4000-8000-000000000005'::uuid, 'Qual alternativa apresenta uma primitiva correta de $xe^x$?'),
    ('40000000-0000-4000-8000-000000000006'::uuid, 'Determine o limite da sequência $a_n=(2n+1)/(n+3)$ quando $n$ tende ao infinito.'),
    ('40000000-0000-4000-8000-000000000007'::uuid, 'Considere a série geométrica $\sum_{n=1}^{\infty}(1/2)^n$. Qual é sua soma?'),
    ('40000000-0000-4000-8000-000000000008'::uuid, 'Calcule o determinante da matriz $\begin{pmatrix}1 & 2\\ 3 & 1\end{pmatrix}$.'),
    ('40000000-0000-4000-8000-000000000009'::uuid, 'Quais são os autovalores da matriz diagonal $\begin{pmatrix}2 & 0\\ 0 & 5\end{pmatrix}$?'),
    ('40000000-0000-4000-8000-000000000010'::uuid, 'Calcule o produto escalar entre $u=(1,2,-1)$ e $v=(2,0,3)$.')
) as revision(question_id, statement_markdown)
where question_row.id = revision.question_id;

update public.question_solutions as solution
set
  final_answer_markdown = revision.final_answer_markdown,
  explanation_markdown = revision.explanation_markdown
from (
  values
    ('40000000-0000-4000-8000-000000000001'::uuid, '$\sen(x^2)+C$', 'A derivada de $x^2$ é $2x$, que já aparece multiplicando o cosseno. Por isso, a substituição transforma a integral em uma primitiva trigonométrica direta.'),
    ('40000000-0000-4000-8000-000000000002'::uuid, 'A série converge e sua soma é $3/2$.', 'É uma série geométrica. Primeiro verificamos que a razão tem módulo menor que $1$; depois usamos a fórmula da soma infinita.'),
    ('40000000-0000-4000-8000-000000000003'::uuid, '$5$', 'Para uma matriz $2\times2$, o determinante é o produto da diagonal principal menos o produto da diagonal secundária.'),
    ('40000000-0000-4000-8000-000000000004'::uuid, '$1$', 'Use uma primitiva de $3x^2$ e aplique os limites superior e inferior. A constante de integração não aparece em uma integral definida.'),
    ('40000000-0000-4000-8000-000000000005'::uuid, '$(x-1)e^x+C$', 'O produto $x\,e^x$ pede integração por partes. Escolher $u=x$ reduz o polinômio a uma constante e encerra o cálculo em uma etapa.'),
    ('40000000-0000-4000-8000-000000000006'::uuid, '$2$', 'Em uma razão de polinômios com o mesmo grau, os termos de maior grau determinam o limite. Os termos divididos por $n$ desaparecem.'),
    ('40000000-0000-4000-8000-000000000007'::uuid, '$1$', 'A série começa em $n=1$, não em $n=0$. Portanto, seu primeiro termo é $1/2$ e a fórmula da soma deve usar esse valor.'),
    ('40000000-0000-4000-8000-000000000008'::uuid, '$-5$', 'Aplique a regra $ad-bc$ aos elementos da matriz, tomando cuidado com o sinal da segunda parcela.'),
    ('40000000-0000-4000-8000-000000000009'::uuid, '$2$ e $5$', 'Em uma matriz diagonal, cada elemento da diagonal principal já é um autovalor. Os vetores das direções correspondentes são autovetores.'),
    ('40000000-0000-4000-8000-000000000010'::uuid, '$-1$', 'Produto escalar é a soma dos produtos das coordenadas correspondentes. O sinal negativo da terceira coordenada precisa ser preservado.')
) as revision(question_id, final_answer_markdown, explanation_markdown)
where solution.question_id = revision.question_id;

update public.question_solution_steps as step
set title = revision.title, content_markdown = revision.content_markdown
from (
  values
    ('70000000-0000-4000-8000-000000000001'::uuid, 'Escolha a substituição', 'Defina $u=x^2$. Então $du=2x\,dx$, exatamente o fator que acompanha $\cos(x^2)$.'),
    ('70000000-0000-4000-8000-000000000002'::uuid, 'Integre e retorne à variável original', '$\int 2x\cos(x^2)\,dx=\int\cos(u)\,du=\sen(u)+C=\sen(x^2)+C$.'),
    ('70000000-0000-4000-8000-000000000003'::uuid, 'Identifique os parâmetros', 'A série tem primeiro termo $a=1$ e razão $r=1/3$.'),
    ('70000000-0000-4000-8000-000000000004'::uuid, 'Aplique a regra do determinante', '$\det\begin{pmatrix}2 & 1\\ 3 & 4\end{pmatrix}=2\cdot4-1\cdot3=8-3=5$.'),
    ('70000000-0000-4000-8000-000000000005'::uuid, 'Encontre uma primitiva', 'Uma primitiva de $3x^2$ é $x^3$.'),
    ('70000000-0000-4000-8000-000000000006'::uuid, 'Escolha os termos', 'Use $u=x$ e $dv=e^x\,dx$. Assim, $du=dx$ e $v=e^x$.'),
    ('70000000-0000-4000-8000-000000000007'::uuid, 'Simplifique a razão', 'Dividindo numerador e denominador por $n$, obtemos $(2+1/n)/(1+3/n)$.'),
    ('70000000-0000-4000-8000-000000000008'::uuid, 'Identifique o primeiro termo', 'Como a soma começa em $n=1$, temos $a=1/2$ e razão $r=1/2$.'),
    ('70000000-0000-4000-8000-000000000009'::uuid, 'Aplique $ad-bc$', '$\det\begin{pmatrix}1 & 2\\ 3 & 1\end{pmatrix}=1\cdot1-2\cdot3=1-6=-5$.'),
    ('70000000-0000-4000-8000-000000000010'::uuid, 'Leia a diagonal principal', 'A matriz já é diagonal, com entradas $2$ e $5$ na diagonal principal.'),
    ('70000000-0000-4000-8000-000000000011'::uuid, 'Multiplique coordenadas correspondentes', '$u\cdot v=1\cdot2+2\cdot0+(-1)\cdot3$.')
) as revision(id, title, content_markdown)
where step.id = revision.id;

insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values
  ('70000000-0000-4000-8000-000000000022', '40000000-0000-4000-8000-000000000002', 'Verifique a convergência', 'Como $|r|=1/3<1$, a série geométrica converge.' , 2),
  ('70000000-0000-4000-8000-000000000023', '40000000-0000-4000-8000-000000000002', 'Calcule a soma', '$S=\frac{a}{1-r}=\frac{1}{1-1/3}=\frac{3}{2}$.' , 3),
  ('70000000-0000-4000-8000-000000000024', '40000000-0000-4000-8000-000000000003', 'Conclua', 'Logo, o determinante da matriz é $5$.' , 2),
  ('70000000-0000-4000-8000-000000000025', '40000000-0000-4000-8000-000000000004', 'Avalie nos limites', '$\left[x^3\right]_0^1=1^3-0^3=1$.' , 2),
  ('70000000-0000-4000-8000-000000000026', '40000000-0000-4000-8000-000000000005', 'Aplique integração por partes', '$\int xe^x\,dx=xe^x-\int e^x\,dx$.' , 2),
  ('70000000-0000-4000-8000-000000000027', '40000000-0000-4000-8000-000000000005', 'Simplifique', '$xe^x-e^x+C=(x-1)e^x+C$.' , 3),
  ('70000000-0000-4000-8000-000000000028', '40000000-0000-4000-8000-000000000006', 'Tome o limite', 'Quando $n$ tende ao infinito, $1/n$ e $3/n$ tendem a zero. Portanto, o limite é $2/1=2$.' , 2),
  ('70000000-0000-4000-8000-000000000029', '40000000-0000-4000-8000-000000000007', 'Use a fórmula da soma', '$S=\frac{a}{1-r}=\frac{1/2}{1-1/2}=1$.' , 2),
  ('70000000-0000-4000-8000-000000000030', '40000000-0000-4000-8000-000000000007', 'Por que não é $2$?', 'O valor $2$ seria a soma se a série começasse em $n=0$. Aqui falta esse primeiro termo $1$.' , 3),
  ('70000000-0000-4000-8000-000000000031', '40000000-0000-4000-8000-000000000008', 'Conclua', 'Portanto, o determinante é $-5$.' , 2),
  ('70000000-0000-4000-8000-000000000032', '40000000-0000-4000-8000-000000000009', 'Conclua', 'Assim, os autovalores são $2$ e $5$.' , 2),
  ('70000000-0000-4000-8000-000000000033', '40000000-0000-4000-8000-000000000010', 'Some os termos', '$2+0-3=-1$.' , 2)
on conflict (id) do update
set
  title = excluded.title,
  content_markdown = excluded.content_markdown,
  sort_order = excluded.sort_order;
