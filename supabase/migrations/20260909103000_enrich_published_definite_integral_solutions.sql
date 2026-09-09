-- Learner-facing editorial revision for the ten published questions on
-- definite integrals and the Fundamental Theorem of Calculus. Answer keys and
-- historical attempts are intentionally unchanged.
begin;

update public.question_solutions as solution
set explanation_markdown = revision.explanation_markdown
from (
  values
    ('40000000-0000-4000-8000-000000000018'::uuid, $q$Uma integral definida é calculada por uma primitiva avaliada nos extremos: $F(b)-F(a)$. A constante de integração não aparece porque ela se cancela na subtração. Aqui, uma primitiva de $3x$ é $3x^2/2$.$q$),
    ('40000000-0000-4000-8000-000000000019'::uuid, $q$A integral de uma constante representa a altura constante multiplicada pela largura do intervalo. Como a altura é $2$ e o intervalo vai de $1$ a $3$, a largura é $2$.$q$),
    ('40000000-0000-4000-8000-000000000020'::uuid, $q$A integral é linear: primeiro encontramos uma primitiva para cada parcela e depois aplicamos os limites. Avaliar em zero simplifica a expressão, mas esse zero ainda deve ser mostrado para evitar perder um termo.$q$),
    ('40000000-0000-4000-8000-000000000021'::uuid, $q$O Teorema Fundamental permite usar qualquer primitiva do integrando. Como $3x^2+1$ tem primitiva $x^3+x$, a integral é a diferença entre seus valores em $2$ e em $0$.$q$),
    ('40000000-0000-4000-8000-000000000022'::uuid, $q$Pelo Teorema Fundamental do Cálculo, a derivada de $\int_1^x f(t)\,dt$ é $f(x)$. Não é necessário calcular a integral primeiro; basta substituir o limite superior na função integranda.$q$),
    ('40000000-0000-4000-8000-000000000023'::uuid, $q$A função $x$ é ímpar e o intervalo é simétrico em torno de zero. As áreas assinadas em $[-1,0]$ e $[0,1]$ têm mesmo módulo e sinais opostos, portanto se cancelam.$q$),
    ('40000000-0000-4000-8000-000000000024'::uuid, $q$Trocar a ordem dos limites muda o sinal de uma integral definida. Primeiro calcule a integral no sentido usual, de $0$ até $2$, e só então aplique o sinal negativo pedido pela ordem inversa.$q$),
    ('40000000-0000-4000-8000-000000000025'::uuid, $q$Quando a variável está no limite inferior, a regra do Teorema Fundamental introduz um sinal negativo: $\frac{d}{dx}\int_x^2 f(t)\,dt=-f(x)$. Depois disso, basta avaliar a derivada em $x=-1$.$q$),
    ('40000000-0000-4000-8000-000000000026'::uuid, $q$O valor absoluto muda a expressão da função onde seu interior muda de sinal. Como $|x|=-x$ para $x<0$ e $|x|=x$ para $x\ge0$, a integral precisa ser separada em zero.$q$),
    ('40000000-0000-4000-8000-000000000027'::uuid, $q$Depois de integrar, a condição produz uma equação em $c$. A hipótese $c>0$ é decisiva: ela seleciona a raiz positiva e evita aceitar automaticamente as duas soluções de uma equação quadrática.$q$)
) as revision(question_id, explanation_markdown)
where solution.question_id = revision.question_id;

insert into public.question_hints (id, question_id, content_markdown, sort_order) values
  ('60000000-0000-4000-8000-000000000301', '40000000-0000-4000-8000-000000000018', 'Encontre uma primitiva de $3x$ antes de substituir os extremos.', 1),
  ('60000000-0000-4000-8000-000000000302', '40000000-0000-4000-8000-000000000018', 'Use a notação $[F(x)]_0^2=F(2)-F(0)$.', 2),
  ('60000000-0000-4000-8000-000000000303', '40000000-0000-4000-8000-000000000019', 'A integral de uma constante pode ser interpretada como área de um retângulo.', 1),
  ('60000000-0000-4000-8000-000000000304', '40000000-0000-4000-8000-000000000019', 'Multiplique a altura $2$ pela largura $3-1$.', 2),
  ('60000000-0000-4000-8000-000000000305', '40000000-0000-4000-8000-000000000020', 'Integre $x^2$ e $2x$ separadamente.', 1),
  ('60000000-0000-4000-8000-000000000306', '40000000-0000-4000-8000-000000000020', 'Aplique os limites à primitiva $x^3/3+x^2$.', 2),
  ('60000000-0000-4000-8000-000000000307', '40000000-0000-4000-8000-000000000021', 'Procure uma função cuja derivada seja $3x^2+1$.', 1),
  ('60000000-0000-4000-8000-000000000308', '40000000-0000-4000-8000-000000000021', 'Avalie a primitiva em $2$ e em $0$, nessa ordem.', 2),
  ('60000000-0000-4000-8000-000000000309', '40000000-0000-4000-8000-000000000022', 'Reconheça uma integral com limite superior variável.', 1),
  ('60000000-0000-4000-8000-000000000310', '40000000-0000-4000-8000-000000000022', 'Pelo TFC, derive e substitua $x=3$ no integrando.', 2),
  ('60000000-0000-4000-8000-000000000311', '40000000-0000-4000-8000-000000000023', 'Observe a simetria do intervalo em torno de zero.', 1),
  ('60000000-0000-4000-8000-000000000312', '40000000-0000-4000-8000-000000000023', 'Verifique se $f(-x)=-f(x)$ antes de calcular primitivas.', 2),
  ('60000000-0000-4000-8000-000000000313', '40000000-0000-4000-8000-000000000024', 'Compare a ordem dos limites com a ordem usual, do menor para o maior.', 1),
  ('60000000-0000-4000-8000-000000000314', '40000000-0000-4000-8000-000000000024', 'Inverta os limites e coloque um sinal negativo fora da integral.', 2),
  ('60000000-0000-4000-8000-000000000315', '40000000-0000-4000-8000-000000000025', 'A variável está no limite inferior, portanto a derivada recebe sinal negativo.', 1),
  ('60000000-0000-4000-8000-000000000316', '40000000-0000-4000-8000-000000000025', 'Depois de derivar, substitua $x=-1$.', 2),
  ('60000000-0000-4000-8000-000000000317', '40000000-0000-4000-8000-000000000026', 'Descubra onde $|x|$ muda de fórmula dentro do intervalo.', 1),
  ('60000000-0000-4000-8000-000000000318', '40000000-0000-4000-8000-000000000026', 'Separe a integral em $[-1,0]$ e $[0,2]$.', 2),
  ('60000000-0000-4000-8000-000000000319', '40000000-0000-4000-8000-000000000027', 'Integre $2x$ e transforme a condição em uma equação para $c$.', 1),
  ('60000000-0000-4000-8000-000000000320', '40000000-0000-4000-8000-000000000027', 'Use a condição $c>0$ ao escolher a raiz de $c^2=8$.', 2)
on conflict (question_id, sort_order) do update set content_markdown = excluded.content_markdown;

insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values
  ('70000000-0000-4000-8000-000000000034', '40000000-0000-4000-8000-000000000018', 'Encontre uma primitiva', '$\int3x\,dx=3x^2/2$.', 1),
  ('70000000-0000-4000-8000-000000000401', '40000000-0000-4000-8000-000000000018', 'Aplique os extremos', '$[3x^2/2]_0^2=3\cdot4/2-0=6$.', 2),
  ('70000000-0000-4000-8000-000000000402', '40000000-0000-4000-8000-000000000018', 'Conclua', 'Logo, o valor da integral definida é $6$.', 3),
  ('70000000-0000-4000-8000-000000000035', '40000000-0000-4000-8000-000000000019', 'Use a área do retângulo', 'A função tem altura constante $2$ no intervalo.', 1),
  ('70000000-0000-4000-8000-000000000403', '40000000-0000-4000-8000-000000000019', 'Calcule a largura', 'O intervalo tem largura $3-1=2$.', 2),
  ('70000000-0000-4000-8000-000000000404', '40000000-0000-4000-8000-000000000019', 'Multiplique', '$2\cdot2=4$.', 3),
  ('70000000-0000-4000-8000-000000000036', '40000000-0000-4000-8000-000000000020', 'Encontre uma primitiva', '$\int(x^2+2x)\,dx=x^3/3+x^2$.', 1),
  ('70000000-0000-4000-8000-000000000405', '40000000-0000-4000-8000-000000000020', 'Avalie os limites', '$[x^3/3+x^2]_0^1=(1/3+1)-0=4/3$.', 2),
  ('70000000-0000-4000-8000-000000000406', '40000000-0000-4000-8000-000000000020', 'Conclua', 'A alternativa correta é $4/3$.', 3),
  ('70000000-0000-4000-8000-000000000037', '40000000-0000-4000-8000-000000000021', 'Encontre uma primitiva', '$F(x)=x^3+x$ tem derivada $3x^2+1$.', 1),
  ('70000000-0000-4000-8000-000000000407', '40000000-0000-4000-8000-000000000021', 'Aplique o Teorema Fundamental', '$[x^3+x]_0^2=(8+2)-0=10$.', 2),
  ('70000000-0000-4000-8000-000000000408', '40000000-0000-4000-8000-000000000021', 'Conclua', 'Portanto, a integral vale $10$.', 3),
  ('70000000-0000-4000-8000-000000000038', '40000000-0000-4000-8000-000000000022', 'Aplique o TFC', '$G''(x)=x^2+2$.', 1),
  ('70000000-0000-4000-8000-000000000409', '40000000-0000-4000-8000-000000000022', 'Avalie no ponto', '$G''(3)=3^2+2=11$.', 2),
  ('70000000-0000-4000-8000-000000000410', '40000000-0000-4000-8000-000000000022', 'Interprete', 'Não foi necessário calcular a integral para achar sua derivada.', 3),
  ('70000000-0000-4000-8000-000000000039', '40000000-0000-4000-8000-000000000023', 'Reconheça a simetria', '$f(x)=x$ é ímpar porque $f(-x)=-f(x)$.', 1),
  ('70000000-0000-4000-8000-000000000411', '40000000-0000-4000-8000-000000000023', 'Use os limites simétricos', 'O intervalo $[-1,1]$ é simétrico em torno de zero.', 2),
  ('70000000-0000-4000-8000-000000000412', '40000000-0000-4000-8000-000000000023', 'Conclua', 'A integral de uma função ímpar em limites simétricos é $0$.', 3),
  ('70000000-0000-4000-8000-000000000040', '40000000-0000-4000-8000-000000000024', 'Inverta os limites', '$\int_2^0(x+1)\,dx=-\int_0^2(x+1)\,dx$.', 1),
  ('70000000-0000-4000-8000-000000000413', '40000000-0000-4000-8000-000000000024', 'Calcule no sentido usual', '$\int_0^2(x+1)\,dx=[x^2/2+x]_0^2=4$.', 2),
  ('70000000-0000-4000-8000-000000000414', '40000000-0000-4000-8000-000000000024', 'Aplique o sinal', 'Logo, $\int_2^0(x+1)\,dx=-4$.', 3),
  ('70000000-0000-4000-8000-000000000041', '40000000-0000-4000-8000-000000000025', 'Derive o limite inferior', '$H''(x)=-x^3$.', 1),
  ('70000000-0000-4000-8000-000000000415', '40000000-0000-4000-8000-000000000025', 'Avalie em $-1$', '$H''(-1)=-(-1)^3=1$.', 2),
  ('70000000-0000-4000-8000-000000000416', '40000000-0000-4000-8000-000000000025', 'Conclua', 'O sinal negativo vem exclusivamente do limite inferior variável.', 3),
  ('70000000-0000-4000-8000-000000000042', '40000000-0000-4000-8000-000000000026', 'Separe no ponto de mudança', '$\int_{-1}^2|x|\,dx=\int_{-1}^0-x\,dx+\int_0^2x\,dx$.', 1),
  ('70000000-0000-4000-8000-000000000417', '40000000-0000-4000-8000-000000000026', 'Calcule cada trecho', '$\int_{-1}^0-x\,dx=1/2$ e $\int_0^2x\,dx=2$.', 2),
  ('70000000-0000-4000-8000-000000000418', '40000000-0000-4000-8000-000000000026', 'Some as áreas', '$1/2+2=5/2$.', 3),
  ('70000000-0000-4000-8000-000000000043', '40000000-0000-4000-8000-000000000027', 'Integre e aplique a condição', '$[x^2]_0^c=c^2=8$.', 1),
  ('70000000-0000-4000-8000-000000000419', '40000000-0000-4000-8000-000000000027', 'Resolva a equação', '$c=\pm\sqrt8$.', 2),
  ('70000000-0000-4000-8000-000000000420', '40000000-0000-4000-8000-000000000027', 'Use a restrição', 'Como $c>0$, escolhemos $c=\sqrt8$, e não $2$.', 3)
on conflict (question_id, sort_order) do update
set title = excluded.title, content_markdown = excluded.content_markdown;

commit;
