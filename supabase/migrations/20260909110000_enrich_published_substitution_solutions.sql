-- Editorial improvement for published substitution questions. Keeps answer
-- keys and learner attempts intact.
begin;

update public.question_solutions as solution
set explanation_markdown = revision.explanation_markdown
from (values
  ('40000000-0000-4000-8000-000000000028'::uuid, $q$A expressão interna é $x^2$ e sua derivada, $2x$, já aparece no integrando. Por isso $u=x^2$ transforma a integral diretamente em uma primitiva de cosseno.$q$),
  ('40000000-0000-4000-8000-000000000029'::uuid, $q$A derivada de $x^3$ é $3x^2$, exatamente o fator externo. A substituição elimina a variável original e torna a integral de $e^u$ imediata.$q$),
  ('40000000-0000-4000-8000-000000000030'::uuid, $q$O denominador sugere $u=x^2+4$, mas $du=2x\,dx$. O fator $1/2$ aparece porque o integrando tem apenas $x\,dx$, metade de $du$.$q$),
  ('40000000-0000-4000-8000-000000000031'::uuid, $q$Em uma integral definida, a substituição também muda os limites. Ao usar $u=x^2+1$, os extremos $0$ e $1$ se tornam $1$ e $2$, sem necessidade de voltar a $x$.$q$),
  ('40000000-0000-4000-8000-000000000032'::uuid, $q$Uma boa substituição transforma a parte complicada e tem derivada proporcional ao fator externo. Para $u=x^2+9$, temos $du=2x\,dx$, deixando a raiz escrita apenas em função de $u$.$q$),
  ('40000000-0000-4000-8000-000000000033'::uuid, $q$Com $u=3x^2+5$, o diferencial é $du=6x\,dx$, presente inteiro no numerador. A integral vira $\int u^{-2}\,du=-u^{-1}+C$, sem fator adicional.$q$),
  ('40000000-0000-4000-8000-000000000034'::uuid, $q$A substituição $u=x^2+3$ produz $du=2x\,dx$. Como há somente $x\,dx$, surge o fator $1/2$; os limites mudam de $1,2$ para $4,7$.$q$),
  ('40000000-0000-4000-8000-000000000035'::uuid, $q$A expressão interna é $x^4$, cuja derivada é $4x^3$. Como o integrando tem $x^3\,dx$, compensamos o fator ausente com $1/4$ antes de integrar o cosseno.$q$)
) as revision(question_id, explanation_markdown)
where solution.question_id = revision.question_id;

insert into public.question_hints (id, question_id, content_markdown, sort_order) values
  ('60000000-0000-4000-8000-000000000501','40000000-0000-4000-8000-000000000028','Compare a expressão dentro do cosseno com o fator que a acompanha.',1),
  ('60000000-0000-4000-8000-000000000502','40000000-0000-4000-8000-000000000028','Tente $u=x^2$ e escreva $du$.',2),
  ('60000000-0000-4000-8000-000000000503','40000000-0000-4000-8000-000000000029','Procure uma expressão cuja derivada seja $3x^2$.',1),
  ('60000000-0000-4000-8000-000000000504','40000000-0000-4000-8000-000000000029','Use $u=x^3$ antes de integrar a exponencial.',2),
  ('60000000-0000-4000-8000-000000000505','40000000-0000-4000-8000-000000000030','Observe o denominador $x^2+4$.',1),
  ('60000000-0000-4000-8000-000000000506','40000000-0000-4000-8000-000000000030','A derivada interna é $2x$; ajuste o diferencial.',2),
  ('60000000-0000-4000-8000-000000000507','40000000-0000-4000-8000-000000000031','Em integrais definidas, transforme também os limites.',1),
  ('60000000-0000-4000-8000-000000000508','40000000-0000-4000-8000-000000000031','Com $u=x^2+1$, calcule os novos limites.',2),
  ('60000000-0000-4000-8000-000000000509','40000000-0000-4000-8000-000000000032','A derivada da expressão sob a raiz deve aparecer fora dela.',1),
  ('60000000-0000-4000-8000-000000000510','40000000-0000-4000-8000-000000000032','Teste $u=x^2+9$.',2),
  ('60000000-0000-4000-8000-000000000511','40000000-0000-4000-8000-000000000033','A expressão elevada a $-2$ é a candidata natural a $u$.',1),
  ('60000000-0000-4000-8000-000000000512','40000000-0000-4000-8000-000000000033','Verifique que $du=6x\,dx$.',2),
  ('60000000-0000-4000-8000-000000000513','40000000-0000-4000-8000-000000000034','Use a expressão do denominador como nova variável.',1),
  ('60000000-0000-4000-8000-000000000514','40000000-0000-4000-8000-000000000034','Transforme os limites antes de integrar.',2),
  ('60000000-0000-4000-8000-000000000515','40000000-0000-4000-8000-000000000035','A derivada de $x^4$ contém o fator $x^3$.',1),
  ('60000000-0000-4000-8000-000000000516','40000000-0000-4000-8000-000000000035','Use $u=x^4$ e compense o fator $4$.',2)
on conflict (question_id, sort_order) do update set content_markdown=excluded.content_markdown;

insert into public.question_solution_steps (id,question_id,title,content_markdown,sort_order) values
  ('70000000-0000-4000-8000-000000000044','40000000-0000-4000-8000-000000000028','Faça a substituição','$u=x^2$ e $du=2x\,dx$.',1),('70000000-0000-4000-8000-000000000601','40000000-0000-4000-8000-000000000028','Integre em $u$','$\int\cos u\,du=\sin u+C$.',2),('70000000-0000-4000-8000-000000000602','40000000-0000-4000-8000-000000000028','Retorne a $x$','$\sin(x^2)+C$.',3),
  ('70000000-0000-4000-8000-000000000045','40000000-0000-4000-8000-000000000029','Faça a substituição','$u=x^3$ e $du=3x^2\,dx$.',1),('70000000-0000-4000-8000-000000000603','40000000-0000-4000-8000-000000000029','Integre','$\int e^u\,du=e^u+C$.',2),('70000000-0000-4000-8000-000000000604','40000000-0000-4000-8000-000000000029','Conclua','$e^{x^3}+C$.',3),
  ('70000000-0000-4000-8000-000000000046','40000000-0000-4000-8000-000000000030','Ajuste o diferencial','$u=x^2+4$ e $x\,dx=du/2$.',1),('70000000-0000-4000-8000-000000000605','40000000-0000-4000-8000-000000000030','Integre','$\frac12\int du/u=\frac12\ln u+C$.',2),('70000000-0000-4000-8000-000000000606','40000000-0000-4000-8000-000000000030','Retorne a $x$','$\frac12\ln(x^2+4)+C$.',3),
  ('70000000-0000-4000-8000-000000000047','40000000-0000-4000-8000-000000000031','Troque os limites','$u=x^2+1$ leva $0,1$ em $1,2$.',1),('70000000-0000-4000-8000-000000000607','40000000-0000-4000-8000-000000000031','Integre','$\int_1^2du/u=[\ln u]_1^2$.',2),('70000000-0000-4000-8000-000000000608','40000000-0000-4000-8000-000000000031','Conclua','$\ln2-\ln1=\ln2$.',3),
  ('70000000-0000-4000-8000-000000000048','40000000-0000-4000-8000-000000000032','Escolha a substituição','$u=x^2+9$ deixa $x\,dx=du/2$.',1),('70000000-0000-4000-8000-000000000609','40000000-0000-4000-8000-000000000032','Observe a nova forma','A raiz passa a ser $\sqrt{u}$.',2),('70000000-0000-4000-8000-000000000610','40000000-0000-4000-8000-000000000032','Conclua','A substituição correta é $u=x^2+9$.',3),
  ('70000000-0000-4000-8000-000000000049','40000000-0000-4000-8000-000000000033','Faça a substituição','$u=3x^2+5$ e $du=6x\,dx$.',1),('70000000-0000-4000-8000-000000000611','40000000-0000-4000-8000-000000000033','Integre a potência','$\int u^{-2}\,du=-u^{-1}+C$.',2),('70000000-0000-4000-8000-000000000612','40000000-0000-4000-8000-000000000033','Retorne a $x$','$-1/(3x^2+5)+C$.',3),
  ('70000000-0000-4000-8000-000000000050','40000000-0000-4000-8000-000000000034','Ajuste e mude limites','$u=x^2+3$, $x\,dx=du/2$, e os limites viram $4,7$.',1),('70000000-0000-4000-8000-000000000613','40000000-0000-4000-8000-000000000034','Integre','$\frac12\int_4^7du/u=\frac12[\ln u]_4^7$.',2),('70000000-0000-4000-8000-000000000614','40000000-0000-4000-8000-000000000034','Conclua','$\frac12\ln(7/4)$.',3),
  ('70000000-0000-4000-8000-000000000051','40000000-0000-4000-8000-000000000035','Ajuste o diferencial','$u=x^4$ implica $x^3\,dx=du/4$.',1),('70000000-0000-4000-8000-000000000615','40000000-0000-4000-8000-000000000035','Integre','$\frac14\int\cos u\,du=\frac14\sin u+C$.',2),('70000000-0000-4000-8000-000000000616','40000000-0000-4000-8000-000000000035','Retorne a $x$','$\frac14\sin(x^4)+C$.',3)
on conflict (question_id,sort_order) do update set title=excluded.title,content_markdown=excluded.content_markdown;

commit;
