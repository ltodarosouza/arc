-- Conclusão da revisão: métricas, quádricas e 15 questões difíceis autorais.
begin;

-- As antigas questões difíceis destes blocos são aplicações diretas ou de poucos passos.
update public.questions set difficulty='easy' where id in (
'40000000-0000-4000-8000-000000050501','40000000-0000-4000-8000-000000050502','40000000-0000-4000-8000-000000050504','40000000-0000-4000-8000-000000050508','40000000-0000-4000-8000-000000050510','40000000-0000-4000-8000-000000050511','40000000-0000-4000-8000-000000050513','40000000-0000-4000-8000-000000050514','40000000-0000-4000-8000-000000050516','40000000-0000-4000-8000-000000050517','40000000-0000-4000-8000-000000050518','40000000-0000-4000-8000-000000050519',
'40000000-0000-4000-8000-000000050601','40000000-0000-4000-8000-000000050602','40000000-0000-4000-8000-000000050603','40000000-0000-4000-8000-000000050605','40000000-0000-4000-8000-000000050608','40000000-0000-4000-8000-000000050612','40000000-0000-4000-8000-000000050613','40000000-0000-4000-8000-000000050614','40000000-0000-4000-8000-000000050615','40000000-0000-4000-8000-000000050616');
update public.questions set difficulty='medium' where subject_id='20000000-0000-4000-8000-000000000003' and difficulty='hard' and id between '40000000-0000-4000-8000-000000050501' and '40000000-0000-4000-8000-000000050620';

with revised(question_id,hint) as (values
('40000000-0000-4000-8000-000000050501'::uuid,'Apenas a coordenada $z$ muda; a distância é o módulo dessa variação.'),
('40000000-0000-4000-8000-000000050502'::uuid,'A distância ao plano $xy$ é o valor absoluto da coordenada $z$.'),
('40000000-0000-4000-8000-000000050503'::uuid,'Confira o numerador e divida pela norma $(1,2,2)$ da normal.'),
('40000000-0000-4000-8000-000000050504'::uuid,'Normalize o produto escalar antes de aplicar o arco cosseno.'),
('40000000-0000-4000-8000-000000050505'::uuid,'Diretor paralelo à normal significa encontro perpendicular com o plano.'),
('40000000-0000-4000-8000-000000050506'::uuid,'O produto do diretor com a normal deve ser exatamente zero.'),
('40000000-0000-4000-8000-000000050507'::uuid,'Como os planos são paralelos, use a diferença dos termos independentes sobre a norma comum.'),
('40000000-0000-4000-8000-000000050508'::uuid,'Normais ortogonais produzem planos cujo menor ângulo também é reto.'),
('40000000-0000-4000-8000-000000050510'::uuid,'O ângulo reta-plano é complementar ao ângulo entre diretor e normal.'),
('40000000-0000-4000-8000-000000050511'::uuid,'Projete o ponto no eixo $x$ e meça o segmento perpendicular restante.'),
('40000000-0000-4000-8000-000000050512'::uuid,'Substitua a parametrização no plano e verifique se surge um valor único de $t$.'),
('40000000-0000-4000-8000-000000050513'::uuid,'Para o plano $z=0$, compare apenas os valores absolutos das coordenadas $z$.'),
('40000000-0000-4000-8000-000000050514'::uuid,'A projeção em $z=0$ conserva $x,y$ e elimina somente a altura.'),
('40000000-0000-4000-8000-000000050516'::uuid,'Pertencer ao plano já fornece um caminho de comprimento zero.'),
('40000000-0000-4000-8000-000000050517'::uuid,'Produto escalar positivo equivale a cosseno positivo para vetores não nulos.'),
('40000000-0000-4000-8000-000000050518'::uuid,'Impor $x=y=0$ deixa livre apenas a coordenada do eixo $z$.'),
('40000000-0000-4000-8000-000000050519'::uuid,'A distância ao plano $x=2$ depende somente da diferença na coordenada $x$.'),
('40000000-0000-4000-8000-000000050520'::uuid,'Uma reta paralela que contém um ponto do plano fica inteiramente contida nele.'),
('40000000-0000-4000-8000-000000050601'::uuid,'Três quadrados com o mesmo coeficiente e soma constante caracterizam uma esfera.'),
('40000000-0000-4000-8000-000000050602'::uuid,'Leia o centro trocando os sinais dentro de cada quadrado.'),
('40000000-0000-4000-8000-000000050603'::uuid,'O raio é a raiz positiva do termo à direita.'),
('40000000-0000-4000-8000-000000050604'::uuid,'Os três termos quadráticos positivos e os denominadores distintos determinam os semieixos.'),
('40000000-0000-4000-8000-000000050605'::uuid,'A variável ausente é livre e indica a direção do eixo do cilindro.'),
('40000000-0000-4000-8000-000000050606'::uuid,'A ausência de $y$ estende a elipse do plano $xz$ ao longo desse eixo.'),
('40000000-0000-4000-8000-000000050607'::uuid,'Seções horizontais são círculos cujo raio cresce com $z$.'),
('40000000-0000-4000-8000-000000050608'::uuid,'O vértice aparece quando os dois quadrados atingem simultaneamente zero.'),
('40000000-0000-4000-8000-000000050609'::uuid,'A homogeneidade quadrática e as duas folhas que se encontram na origem caracterizam o cone.'),
('40000000-0000-4000-8000-000000050610'::uuid,'Dois sinais positivos e um negativo, com lado direito positivo, indicam uma folha.'),
('40000000-0000-4000-8000-000000050611'::uuid,'O termo positivo isolado determina o eixo e as duas folhas separadas.'),
('40000000-0000-4000-8000-000000050612'::uuid,'Fixar $z=0$ reduz a esfera a uma circunferência no plano $xy$.'),
('40000000-0000-4000-8000-000000050613'::uuid,'Com $y=0$, resta uma parábola no plano $xz$.'),
('40000000-0000-4000-8000-000000050614'::uuid,'Use distância ao centro igual a $2$ e conserve os deslocamentos de cada coordenada.'),
('40000000-0000-4000-8000-000000050615'::uuid,'A variável $z$ ausente permanece livre, impedindo uma superfície fechada.'),
('40000000-0000-4000-8000-000000050616'::uuid,'O sinal negativo faz $z$ diminuir à medida que $x^2+y^2$ cresce.'),
('40000000-0000-4000-8000-000000050617'::uuid,'Soma de quadrados nula força $x=y=0$, mas deixa $z$ livre.'),
('40000000-0000-4000-8000-000000050618'::uuid,'O maior denominador identifica o maior semieixo e sua direção.'),
('40000000-0000-4000-8000-000000050619'::uuid,'O centro da circunferência geradora fixa a reta paralela ao eixo da variável ausente.'),
('40000000-0000-4000-8000-000000050620'::uuid,'Compare a assinatura: duas folhas exigem um termo positivo isolado e constante positiva.'))
update public.question_hints h set content_markdown=r.hint from revised r where h.question_id=r.question_id and h.sort_order=3;

insert into public.question_sources(id,kind,label,licence_note,rights_holder,rights_status,verified_by,verified_at)
values('10000000-0000-4000-8000-000000000251','original','Arc original — Cálculo Vetorial difícil 2026','Questões autorais. Steinbruch e Winterle foi consultado somente para mapear competências e progressão; nenhum exercício foi copiado ou parafraseado.','Arc','approved','Equipe editorial Arc','2026-09-10T00:00:00Z')
on conflict(id) do update set label=excluded.label,licence_note=excluded.licence_note,rights_status=excluded.rights_status,verified_by=excluded.verified_by,verified_at=excluded.verified_at;

do $body$ declare q jsonb; qid uuid; option_id uuid; i int; begin
for q in select * from jsonb_array_elements(replace($json$[
{"n":1,"tag":"209","s":"Os pontos $A=(1,0,2)$, $B=(3,-1,5)$ e $C=(a,2,1)$ têm baricentro no plano $x+y+z=4$. Qual é $a$?","o":["$-1$","$0$","$1$","$2$"],"c":0,"h":["Calcule o baricentro coordenada a coordenada.","Aplique ao baricentro a equação do plano.","Multiplique a igualdade por $3$ antes de isolar $a$."],"f":"$a=-1$.","p":["$G=((a+4)/3,1/3,8/3)$.","Imponha $(a+4)/3+1/3+8/3=4$.","Isso fornece $a+13=12$.","Logo, $a=-1$.","Com esse valor, as coordenadas de $G$ somam $4$."]},
{"n":2,"tag":"210","s":"O vetor $u=(a,2,2)$ tem norma $3$ e forma ângulo obtuso com $v=(1,0,0)$. Qual é $a$?","o":["$-1$","$1$","$-\sqrt5$","$\sqrt5$"],"c":0,"h":["A norma fornece dois candidatos.","Use o sinal de $u\cdot v$ para escolher entre eles.","Ângulo obtuso exige $a<0$."],"f":"$a=-1$.","p":["Da norma, $a^2+8=9$.","Assim, $a=\pm1$.","Como $u\cdot v=a$, o produto deve ser negativo.","Escolha $a=-1$.","A norma é $3$ e o produto é $-1$, confirmando as duas condições."]},
{"n":3,"tag":"211","s":"Para $u=(1,2,-1)$, determine $a$ para que $\operatorname{proj}_u(a,1,2)=-\frac13u$.","o":["$-2$","$-1$","$0$","$1$"],"c":0,"h":["Compare o coeficiente da fórmula de projeção.","Calcule $u\cdot u$ e $(a,1,2)\cdot u$.","O numerador se reduz a $a$."],"f":"$a=-2$.","p":["Use $\operatorname{proj}_u v=(v\cdot u)/(u\cdot u)u$.","O denominador vale $6$.","O numerador vale $a+2-2=a$.","De $a/6=-1/3$, obtenha $a=-2$.","A substituição recupera exatamente o coeficiente $-1/3$."]},
{"n":4,"tag":"212","s":"Para qual $a$ os vetores $(1,a,0)$, $(0,1,a)$ e $(a,0,1)$ são coplanares?","o":["$-1$","$0$","$1$","$2$"],"c":0,"h":["Coplanares têm produto misto nulo.","Monte o determinante das três componentes.","A expansão resulta em $1+a^3$."],"f":"$a=-1$.","p":["Imponha determinante nulo.","Use $\det\begin{pmatrix}1&a&0\\0&1&a\\a&0&1\end{pmatrix}$.","O determinante é $1+a^3$.","Resolva $a^3=-1$.","Para $a=-1$, os vetores são linearmente dependentes."]},
{"n":5,"tag":"213","s":"As retas $r=(1,0,1)+t(1,1,0)$ e $s=(0,1,a)+u(1,-1,1)$ se interceptam. Qual é $a$?","o":["$0$","$1$","$2$","$-1$"],"c":0,"h":["Iguale as três coordenadas.","Resolva primeiro as equações em $x$ e $y$.","Elas fornecem $t=0$ e $u=1$."],"f":"$a=0$.","p":["Iguale $1+t=u$ e $t=1-u$.","Obtenha $t=0$ e $u=1$.","Na coordenada $z$, imponha $1=a+u$.","Logo, $a=0$.","As duas retas passam então por $(1,0,1)$."]},
{"n":6,"tag":"214","s":"Um plano contém a reta $(1,0,2)+t(1,-1,1)$ e o ponto $P=(0,1,0)$. Qual equação o representa?","o":["$x+z=3$","$y+z=2$","$x+y=1$","$x-y-z=-1$"],"c":2,"h":["Obtenha duas direções contidas no plano.","Cruze o diretor da reta com o vetor até $P$.","A normal resultante é paralela a $(1,1,0)$."],"f":"$x+y=1$.","p":["Use $d=(1,-1,1)$ e $P-(1,0,2)=(-1,1,-2)$.","O produto vetorial é paralelo a $(1,1,0)$.","A forma ponto-normal é $(x-1)+y=0$.","Portanto, $x+y=1$.","A reta e $P$ satisfazem a equação."]},
{"n":7,"tag":"215","s":"Calcule a distância entre as retas reversas $r=(0,0,0)+t(1,0,1)$ e $s=(0,1,0)+u(0,1,1)$.","o":["$1/\sqrt3$","$1/\sqrt2$","$1$","$\sqrt3$"],"c":0,"h":["Projete um vetor entre as retas sobre a normal comum.","Calcule o produto vetorial dos diretores.","Use o vetor $(0,1,0)$ entre os pontos-base."],"f":"$1/\sqrt3$.","p":["A normal comum é $(-1,-1,1)$.","Seu módulo é $\sqrt3$.","O produto com $(0,1,0)$ tem módulo $1$.","A distância é $1/\sqrt3$.","O valor é positivo e menor que a distância entre os pontos-base."]},
{"n":8,"tag":"216","s":"Para qual $a$ a reta $(1,0,0)+t(1,a,1)$ é paralela e distinta do plano $2x-y-z=3$?","o":["$1$","$2$","$-1$","$-2$"],"c":0,"h":["Diretor e normal devem ser ortogonais.","Use a normal $(2,-1,-1)$.","Depois teste se o ponto-base pertence ao plano."],"f":"$a=1$.","p":["Imponha $(1,a,1)\cdot(2,-1,-1)=0$.","Da igualdade $1-a=0$, vem $a=1$.","No ponto-base, o lado esquerdo do plano vale $2$.","Como $2\ne3$, a reta não está contida.","As duas condições são satisfeitas."]},
{"n":9,"tag":"217","s":"O tetraedro com vértices $O$, $A=(1,1,0)$, $B=(0,2,1)$ e $C=(2,0,a)$ tem volume $1$. Qual é o valor positivo de $a$?","o":["$1$","$2$","$3$","$4$"],"c":1,"h":["Use um sexto do módulo do produto misto.","Expanda o determinante formado por $A,B,C$.","O determinante vale $2a+2$."],"f":"$a=2$.","p":["Escreva $V=|[A,B,C]|/6$.","Calcule $[A,B,C]=2a+2$.","Imponha $|2a+2|=6$.","As soluções são $2$ e $-4$; escolha a positiva.","Para $a=2$, o volume é $6/6=1$."]},
{"n":10,"tag":"218","s":"A superfície $x^2+y^2-z^2-2x+4y=4$ é cortada por $z=0$. Qual é a área da seção limitada?","o":["$9\pi$","$4\pi$","$3\pi$","Não há seção limitada"],"c":0,"h":["Complete quadrados em $x$ e $y$.","Depois fixe $z=0$ na forma central.","A seção é um círculo; identifique seu raio antes de calcular a área."],"f":"$9\pi$.","p":["Complete os quadrados em $x$ e $y$.","Obtenha $(x-1)^2+(y+2)^2-z^2=9$.","No plano $z=0$, resta um círculo de raio $3$.","Sua área é $\pi\cdot3^2=9\pi$.","A equação da seção é fechada, confirmando que a área é limitada."]},
{"n":11,"tag":"211","s":"Vetores não nulos satisfazem $|u+v|=|u-v|$ e $|u|=2|v|$. Qual é $|u+v|/|v|$?","o":["$\sqrt3$","$\sqrt5$","$2$","$3$"],"c":1,"h":["Compare os quadrados das duas normas.","Os termos mistos têm sinais opostos.","A igualdade implica $u\cdot v=0$."],"f":"$\sqrt5$.","p":["Expanda os quadrados das duas normas.","Igualá-los fornece $4u\cdot v=0$.","Logo, $u$ e $v$ são ortogonais.","Então $|u+v|^2=4|v|^2+|v|^2$.","Divida por $|v|$ e obtenha $\sqrt5$."]},
{"n":12,"tag":"212","s":"Se $u\times v=(1,2,-1)$ e $w=(a,1,1)$, para quais $a$ o volume do paralelepípedo é $4$?","o":["$1$ apenas","$3$ apenas","$3$ ou $-5$","$5$ ou $-3$"],"c":2,"h":["Use o módulo do produto misto.","Calcule $(u\times v)\cdot w$.","Resolva $|a+1|=4$."],"f":"$a=3$ ou $a=-5$.","p":["O volume é $|(u\times v)\cdot w|$.","O produto escalar vale $a+1$.","Imponha $|a+1|=4$.","Resolva os dois sinais: $a=3$ ou $a=-5$.","Ambos produzem volume $4$."]},
{"n":13,"tag":"214","s":"Os planos $x+y+z=1$ e $x-y+2z=3$ se cortam numa reta. Qual é a distância da origem a essa reta?","o":["$\sqrt{3/2}$","$\sqrt{2/3}$","$\sqrt{21}$","$1/\sqrt{14}$"],"c":0,"h":["Encontre um ponto e um diretor da reta de interseção.","Use o produto vetorial das normais como diretor.","A distância da origem à reta é $|p\times d|/|d|$."],"f":"$\sqrt{3/2}$.","p":["Parametrize a interseção por $p=(2,-1,0)$ e $d=(-3,1,2)$.","Calcule $p\times d=(-2,-4,-1)$.","Os módulos são $\sqrt{21}$ e $\sqrt{14}$.","A razão é $\sqrt{21/14}=\sqrt{3/2}$.","O produto escalar do vetor mínimo com $d$ é zero, confirmando a perpendicularidade."]},
{"n":14,"tag":"215","s":"O ponto $P=(1,1,a)$ é equidistante dos planos $x+2y+2z=3$ e $x+2y+2z=9$. Qual é a distância de $P$ à origem?","o":["$\sqrt{17}/2$","$3/2$","$\sqrt{13}/2$","$17/4$"],"c":0,"h":["Primeiro determine $a$ usando o plano médio.","Substitua $P$ em $x+2y+2z=6$.","Depois calcule a norma do vetor posição de $P$."],"f":"$\sqrt{17}/2$.","p":["O plano médio é $x+2y+2z=6$.","De $1+2+2a=6$, obtenha $a=3/2$.","Então $|OP|^2=1^2+1^2+(3/2)^2$.","Isso vale $17/4$, logo $|OP|=\sqrt{17}/2$.","As distâncias de $P$ aos dois planos têm numeradores iguais a $3$."]},
{"n":15,"tag":"218","s":"Para quais $k$ a seção de $x^2+y^2+z^2-2z=8$ pelo plano $z=k$ é um círculo de raio $2$?","o":["$1$","$1\pm2$","$1\pm\sqrt5$","$\pm2$"],"c":2,"h":["Complete o quadrado em $z$.","Relacione o raio da esfera, o da seção e a distância ao plano.","A distância do centro ao plano é $|k-1|$."],"f":"$k=1\pm\sqrt5$.","p":["Reescreva como $x^2+y^2+(z-1)^2=9$.","O raio da esfera é $3$.","Use $2^2=3^2-|k-1|^2$.","Obtenha $|k-1|=\sqrt5$.","As duas soluções cortam a esfera porque $\sqrt5<3$."]}
]$json$,chr(92),chr(92)||chr(92))::jsonb) loop
  qid:=('40000000-0000-4000-8000-'||lpad((51000+(q->>'n')::int)::text,12,'0'))::uuid;
  insert into public.questions(id,subject_id,source_id,kind,difficulty,publication_status,statement_markdown) values(qid,'20000000-0000-4000-8000-000000000003','10000000-0000-4000-8000-000000000251','multiple_choice','hard','published',q->>'s') on conflict(id) do update set source_id=excluded.source_id,difficulty='hard',publication_status='published',statement_markdown=excluded.statement_markdown;
  for i in 0..3 loop insert into public.question_options(id,question_id,label,content_markdown,sort_order) values(gen_random_uuid(),qid,chr(65+i),q->'o'->>i,i+1) on conflict(question_id,label) do update set content_markdown=excluded.content_markdown,sort_order=excluded.sort_order; end loop;
  select id into option_id from public.question_options where question_id=qid and label=chr(65+(q->>'c')::int);
  insert into public.question_answer_keys values(qid,option_id) on conflict(question_id) do update set correct_option_id=excluded.correct_option_id;
  insert into public.question_taxonomy_tags values(qid,('30000000-0000-4000-8000-000000000'||(q->>'tag'))::uuid,true) on conflict(question_id,taxonomy_node_id) do update set is_primary=true;
  for i in 0..2 loop insert into public.question_hints(id,question_id,content_markdown,sort_order) values(gen_random_uuid(),qid,q->'h'->>i,i+1) on conflict(question_id,sort_order) do update set content_markdown=excluded.content_markdown; end loop;
  insert into public.question_solutions values(qid,q->>'f',(select string_agg(value,' ' order by ordinality) from jsonb_array_elements_text(q->'p') with ordinality as step(value,ordinality))) on conflict(question_id) do update set final_answer_markdown=excluded.final_answer_markdown,explanation_markdown=excluded.explanation_markdown;
  for i in 0..4 loop insert into public.question_solution_steps(id,question_id,title,content_markdown,sort_order) values(gen_random_uuid(),qid,left(replace(q->'p'->>i,'$',''),70),q->'p'->>i,i+1) on conflict(question_id,sort_order) do update set title=excluded.title,content_markdown=excluded.content_markdown; end loop;
end loop; end $body$;

commit;
