-- Improve the learner-facing explanations for the seven published
-- antiderivative questions. This is an additive editorial correction: answer
-- keys and learner attempts are intentionally left unchanged.
begin;

update public.question_solutions as solution
set
  final_answer_markdown = revision.final_answer_markdown,
  explanation_markdown = revision.explanation_markdown
from (
  values
    (
      '40000000-0000-4000-8000-000000000011'::uuid,
      '$x^6-2x^2+3x+C$',
      $q11$A integral é linear, então cada parcela pode ser tratada separadamente pela regra da potência. Para $x^n$, aumentamos o expoente em uma unidade e dividimos pelo novo expoente; a exceção $n=-1$ não aparece aqui. A constante $C$ é necessária porque todas as primitivas de uma mesma função diferem por uma constante.$q11$
    ),
    (
      '40000000-0000-4000-8000-000000000012'::uuid,
      '$\ln x+C$',
      $q12$No intervalo $x>0$, a função cuja derivada é $1/x$ é $\ln x$. A condição do enunciado é importante: fora desse intervalo a forma geral seria $\ln|x|+C$. Comparar por derivação evita confundir uma função com sua própria derivada.$q12$
    ),
    (
      '40000000-0000-4000-8000-000000000013'::uuid,
      '$\frac{8}{3}x^{3/2}+\frac{3}{x}+C$',
      $q13$Antes de aplicar a regra da potência, reescrevemos raiz e denominador como potências. Isso transforma $4\sqrt{x}-3/x^2$ em $4x^{1/2}-3x^{-2}$. Ao integrar $-3x^{-2}$, o divisor $-1$ troca o sinal do resultado; esse é o erro mais comum nesta questão.$q13$
    ),
    (
      '40000000-0000-4000-8000-000000000014'::uuid,
      '$\frac{1}{2}e^{2x}+C$',
      $q14$A exponencial tem uma função interna, $2x$. Pela regra da cadeia, derivar $e^{2x}$ produz $2e^{2x}$; por isso a primitiva precisa do fator compensatório $1/2$. A verificação por derivação confirma que esse fator não pode ser omitido.$q14$
    ),
    (
      '40000000-0000-4000-8000-000000000015'::uuid,
      '$F(x)+7$',
      $q15$Se $F$ é uma primitiva de $f$, então $F'=f$. Somar uma constante não muda a derivada, portanto $(F+7)'=F'=f$. As outras alternativas alteram a derivada: multiplicar por $7$, somar $x$ ou elevar ao quadrado não preserva necessariamente $f$.$q15$
    ),
    (
      '40000000-0000-4000-8000-000000000016'::uuid,
      '$3\sin x+2\cos x+C$',
      $q16$Integramos termo a termo. A parte que exige cuidado é $-2\sin x$: como a derivada de $\cos x$ já é $-\sin x$, sua primitiva é $2\cos x$. Ao derivar $3\sin x+2\cos x$, recuperamos exatamente $3\cos x-2\sin x$.$q16$
    ),
    (
      '40000000-0000-4000-8000-000000000017'::uuid,
      '$10$',
      $q17$A derivada dada determina uma família de primitivas, não uma única função. Primeiro integramos $F'(x)$; depois usamos $F(1)=4$ para encontrar a constante. Só após essa etapa é válido substituir $x=2$, pois a condição inicial muda o valor final.$q17$
    )
) as revision(question_id, final_answer_markdown, explanation_markdown)
where solution.question_id = revision.question_id;

insert into public.question_hints (id, question_id, content_markdown, sort_order) values
  ('60000000-0000-4000-8000-000000000010', '40000000-0000-4000-8000-000000000011', 'A regra da potência pode ser aplicada a cada parcela separadamente.', 1),
  ('60000000-0000-4000-8000-000000000101', '40000000-0000-4000-8000-000000000011', 'Em $x^n$, aumente o expoente para $n+1$ e divida pelo novo expoente.', 2),
  ('60000000-0000-4000-8000-000000000011', '40000000-0000-4000-8000-000000000012', 'No intervalo indicado, procure uma função cuja derivada seja $1/x$.', 1),
  ('60000000-0000-4000-8000-000000000102', '40000000-0000-4000-8000-000000000012', 'Derive as alternativas; a correta deve voltar exatamente a $1/x$.', 2),
  ('60000000-0000-4000-8000-000000000012', '40000000-0000-4000-8000-000000000013', 'Reescreva $\sqrt{x}$ como $x^{1/2}$ e $1/x^2$ como $x^{-2}$.', 1),
  ('60000000-0000-4000-8000-000000000103', '40000000-0000-4000-8000-000000000013', 'Aplique a regra da potência separadamente e observe o sinal ao dividir por $-1$.', 2),
  ('60000000-0000-4000-8000-000000000013', '40000000-0000-4000-8000-000000000014', 'Derivar $e^{2x}$ produz um fator $2$.', 1),
  ('60000000-0000-4000-8000-000000000104', '40000000-0000-4000-8000-000000000014', 'Qual constante deve multiplicar $e^{2x}$ para compensar esse fator?', 2),
  ('60000000-0000-4000-8000-000000000014', '40000000-0000-4000-8000-000000000015', 'Duas primitivas de uma mesma função só podem diferir por uma constante.', 1),
  ('60000000-0000-4000-8000-000000000105', '40000000-0000-4000-8000-000000000015', 'Derive cada expressão candidata e verifique qual preserva exatamente $F''(x)$.', 2),
  ('60000000-0000-4000-8000-000000000015', '40000000-0000-4000-8000-000000000016', 'A derivada de $\sin x$ é $\cos x$; a de $\cos x$ é $-\sin x$.', 1),
  ('60000000-0000-4000-8000-000000000106', '40000000-0000-4000-8000-000000000016', 'Integre cada termo e faça uma derivação rápida para conferir os sinais.', 2),
  ('60000000-0000-4000-8000-000000000016', '40000000-0000-4000-8000-000000000017', 'Primeiro encontre a família de primitivas; ainda haverá uma constante desconhecida.', 1),
  ('60000000-0000-4000-8000-000000000107', '40000000-0000-4000-8000-000000000017', 'Use $F(1)=4$ antes de calcular $F(2)$.', 2)
on conflict (question_id, sort_order) do update
set content_markdown = excluded.content_markdown;

insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values
  ('70000000-0000-4000-8000-000000000012', '40000000-0000-4000-8000-000000000011', 'Separe as parcelas', '$\int(6x^5-4x+3)\,dx=\int6x^5\,dx-\int4x\,dx+\int3\,dx$.', 1),
  ('70000000-0000-4000-8000-000000000013', '40000000-0000-4000-8000-000000000011', 'Aplique a regra da potência', '$\int6x^5\,dx=x^6$, $\int-4x\,dx=-2x^2$ e $\int3\,dx=3x$.', 2),
  ('70000000-0000-4000-8000-000000000201', '40000000-0000-4000-8000-000000000011', 'Confira por derivação', 'A derivada de $x^6-2x^2+3x+C$ é $6x^5-4x+3$, o integrando original.', 3),
  ('70000000-0000-4000-8000-000000000014', '40000000-0000-4000-8000-000000000012', 'Use a primitiva logarítmica', '$\frac{d}{dx}\ln x=1/x$ para $x>0$.', 1),
  ('70000000-0000-4000-8000-000000000202', '40000000-0000-4000-8000-000000000012', 'Escreva a família de primitivas', 'Assim, toda primitiva no intervalo é $\ln x+C$.', 2),
  ('70000000-0000-4000-8000-000000000203', '40000000-0000-4000-8000-000000000012', 'Interprete a condição de domínio', 'A hipótese $x>0$ permite usar $\ln x$; em outro intervalo a forma usual é $\ln|x|+C$.', 3),
  ('70000000-0000-4000-8000-000000000015', '40000000-0000-4000-8000-000000000013', 'Reescreva com expoentes', '$4\sqrt{x}-3/x^2=4x^{1/2}-3x^{-2}$.', 1),
  ('70000000-0000-4000-8000-000000000016', '40000000-0000-4000-8000-000000000013', 'Integre cada potência', '$\int4x^{1/2}\,dx=\frac{8}{3}x^{3/2}$ e $\int-3x^{-2}\,dx=3x^{-1}$.', 2),
  ('70000000-0000-4000-8000-000000000204', '40000000-0000-4000-8000-000000000013', 'Volte à forma usual', 'Como $x^{-1}=1/x$, a resposta é $\frac{8}{3}x^{3/2}+\frac{3}{x}+C$.', 3),
  ('70000000-0000-4000-8000-000000000017', '40000000-0000-4000-8000-000000000014', 'Identifique a derivada interna', 'A derivada de $2x$ é $2$, logo derivar $e^{2x}$ gera $2e^{2x}$.', 1),
  ('70000000-0000-4000-8000-000000000205', '40000000-0000-4000-8000-000000000014', 'Compense o fator', '$\frac{d}{dx}\left(\frac12e^{2x}\right)=\frac12\cdot2e^{2x}=e^{2x}$.', 2),
  ('70000000-0000-4000-8000-000000000206', '40000000-0000-4000-8000-000000000014', 'Conclua', 'Portanto, uma primitiva é $\frac12e^{2x}+C$.', 3),
  ('70000000-0000-4000-8000-000000000018', '40000000-0000-4000-8000-000000000015', 'Use a propriedade das primitivas', 'Se $F''(x)=f(x)$, então $(F(x)+k)''=F''(x)=f(x)$ para toda constante $k$.', 1),
  ('70000000-0000-4000-8000-000000000207', '40000000-0000-4000-8000-000000000015', 'Teste a alternativa A', '$\frac{d}{dx}[F(x)+7]=F''(x)+0=f(x)$.', 2),
  ('70000000-0000-4000-8000-000000000208', '40000000-0000-4000-8000-000000000015', 'Elimine as outras formas', 'Elas acrescentam fatores ou termos cuja derivada não é necessariamente zero.', 3),
  ('70000000-0000-4000-8000-000000000019', '40000000-0000-4000-8000-000000000016', 'Integre termo a termo', '$\int3\cos x\,dx=3\sin x$ e $\int-2\sin x\,dx=2\cos x$.', 1),
  ('70000000-0000-4000-8000-000000000209', '40000000-0000-4000-8000-000000000016', 'Reúna os termos', 'A primitiva obtida é $3\sin x+2\cos x+C$.', 2),
  ('70000000-0000-4000-8000-000000000210', '40000000-0000-4000-8000-000000000016', 'Confira o sinal', 'Derivando, $3\sin x+2\cos x$ volta a $3\cos x-2\sin x$.', 3),
  ('70000000-0000-4000-8000-000000000020', '40000000-0000-4000-8000-000000000017', 'Integre a derivada', '$F(x)=x^3+2/x+C$, pois uma primitiva de $-2/x^2$ é $2/x$.', 1),
  ('70000000-0000-4000-8000-000000000021', '40000000-0000-4000-8000-000000000017', 'Use a condição inicial', '$F(1)=1+2+C=4$, logo $C=1$.', 2),
  ('70000000-0000-4000-8000-000000000211', '40000000-0000-4000-8000-000000000017', 'Avalie no ponto pedido', '$F(2)=2^3+2/2+1=8+1+1=10$.', 3)
on conflict (question_id, sort_order) do update
set title = excluded.title, content_markdown = excluded.content_markdown;

commit;
