-- Álgebra Linear — correção do bloco 1 (primeiras 37 questões publicadas).
-- Preserva enunciados, alternativas e gabaritos; substitui fisicamente somente
-- dicas e passos apontados na auditoria. A questão duplicada ...000009 é removida.
begin;

-- A duplicata legada repete a leitura direta de autovalores diagonais da ...900077.
delete from public.question_attempts
where question_id = '40000000-0000-4000-8000-000000000009';
delete from public.redo_questions
where question_id = '40000000-0000-4000-8000-000000000009';
delete from public.question_answer_keys
where question_id = '40000000-0000-4000-8000-000000000009';
delete from public.question_taxonomy_tags
where question_id = '40000000-0000-4000-8000-000000000009';
delete from public.question_hints
where question_id = '40000000-0000-4000-8000-000000000009';
delete from public.question_solution_steps
where question_id = '40000000-0000-4000-8000-000000000009';
delete from public.question_solutions
where question_id = '40000000-0000-4000-8000-000000000009';
delete from public.question_options
where question_id = '40000000-0000-4000-8000-000000000009';
delete from public.questions
where id = '40000000-0000-4000-8000-000000000009'
  and subject_id = '20000000-0000-4000-8000-000000000002'
  and kind = 'multiple_choice';

delete from public.question_hints
where question_id in (
  '40000000-0000-4000-8000-000000000003',
  '40000000-0000-4000-8000-000000000008'
);

delete from public.question_solution_steps
where question_id in (
  '40000000-0000-4000-8000-000000000003',
  '40000000-0000-4000-8000-000000000008',
  '40000000-0000-4000-8000-000000900023',
  '40000000-0000-4000-8000-000000900029',
  '40000000-0000-4000-8000-000000900030',
  '40000000-0000-4000-8000-000000900031',
  '40000000-0000-4000-8000-000000900032',
  '40000000-0000-4000-8000-000000900033',
  '40000000-0000-4000-8000-000000900034'
);

insert into public.question_hints (id, question_id, content_markdown, sort_order) values
  ('68000000-0000-4000-8000-000000000031', '40000000-0000-4000-8000-000000000003', 'Nomeie as quatro entradas da matriz como $a$, $b$, $c$ e $d$.', 1),
  ('68000000-0000-4000-8000-000000000032', '40000000-0000-4000-8000-000000000003', 'Para uma matriz $2\times2$, use a diferença entre os produtos das diagonais.', 2),
  ('68000000-0000-4000-8000-000000000033', '40000000-0000-4000-8000-000000000003', 'Confira se o produto $bc$ foi subtraído, e não somado.', 3),
  ('68000000-0000-4000-8000-000000000081', '40000000-0000-4000-8000-000000000008', 'Identifique as posições $a$, $b$, $c$ e $d$ na matriz apresentada.', 1),
  ('68000000-0000-4000-8000-000000000082', '40000000-0000-4000-8000-000000000008', 'Aplique $ad-bc$ antes de escolher uma alternativa.', 2),
  ('68000000-0000-4000-8000-000000000083', '40000000-0000-4000-8000-000000000008', 'O segundo produto é $2\cdot3$; compare-o com o primeiro para conferir o sinal.', 3);

insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values
  ('78000000-0000-4000-8000-000000000031', '40000000-0000-4000-8000-000000000003', 'Identifique a ordem', 'A matriz tem duas linhas e duas colunas, então a regra de determinante $2\times2$ se aplica.', 1),
  ('78000000-0000-4000-8000-000000000032', '40000000-0000-4000-8000-000000000003', 'Associe as entradas', 'Na forma $\begin{pmatrix}a&b\\c&d\end{pmatrix}$, temos $a=2$, $b=1$, $c=3$ e $d=4$.', 2),
  ('78000000-0000-4000-8000-000000000033', '40000000-0000-4000-8000-000000000003', 'Forme os produtos diagonais', 'Calculamos $ad=2\cdot4=8$ e $bc=1\cdot3=3$.', 3),
  ('78000000-0000-4000-8000-000000000034', '40000000-0000-4000-8000-000000000003', 'Subtraia na ordem correta', 'Pela fórmula, $\det(A)=ad-bc=8-3=5$.', 4),
  ('78000000-0000-4000-8000-000000000035', '40000000-0000-4000-8000-000000000003', 'Confronte o resultado', 'O determinante é um escalar igual a $5$, portanto corresponde somente à alternativa A.', 5),
  ('78000000-0000-4000-8000-000000000081', '40000000-0000-4000-8000-000000000008', 'Reconheça a fórmula', 'Para $\begin{pmatrix}a&b\\c&d\end{pmatrix}$, o determinante é $ad-bc$.', 1),
  ('78000000-0000-4000-8000-000000000082', '40000000-0000-4000-8000-000000000008', 'Leia os valores da matriz', 'Aqui $a=1$, $b=2$, $c=3$ e $d=1$.', 2),
  ('78000000-0000-4000-8000-000000000083', '40000000-0000-4000-8000-000000000008', 'Calcule a diagonal principal', 'O primeiro produto é $ad=1\cdot1=1$.', 3),
  ('78000000-0000-4000-8000-000000000084', '40000000-0000-4000-8000-000000000008', 'Desconte a diagonal secundária', 'O segundo produto é $bc=2\cdot3=6$, logo $ad-bc=1-6=-5$.', 4),
  ('78000000-0000-4000-8000-000000000085', '40000000-0000-4000-8000-000000000008', 'Valide a escolha', 'O sinal é negativo porque o segundo produto é maior; a alternativa A é a única com $-5$.', 5),
  ('78000000-0000-4000-8000-000000900231', '40000000-0000-4000-8000-000000900023', 'Descreva um polinômio qualquer', 'Todo elemento de $P_2$ tem a forma $p(x)=a+bx+cx^2$, com $a$, $b$ e $c$ reais.', 1),
  ('78000000-0000-4000-8000-000000900232', '40000000-0000-4000-8000-000000900023', 'Exiba os geradores naturais', 'Podemos escrever $p=a\cdot1+b\cdot x+c\cdot x^2$.', 2),
  ('78000000-0000-4000-8000-000000900233', '40000000-0000-4000-8000-000000900023', 'Verifique a independência', 'A igualdade $a+b x+c x^2=0$ para todo $x$ força $a=b=c=0$.', 3),
  ('78000000-0000-4000-8000-000000900234', '40000000-0000-4000-8000-000000900023', 'Conte a base', 'Assim, $(1,x,x^2)$ é uma base com três vetores.', 4),
  ('78000000-0000-4000-8000-000000900235', '40000000-0000-4000-8000-000000900023', 'Relacione à alternativa', 'Logo, $\dim P_2=3$, valor apresentado na alternativa A.', 5),
  ('78000000-0000-4000-8000-000000900291', '40000000-0000-4000-8000-000000900029', 'Localize domínio e posto', 'O domínio é $\mathbb R^5$, cuja dimensão é $5$, e o posto de $T$ é $2$.', 1),
  ('78000000-0000-4000-8000-000000900292', '40000000-0000-4000-8000-000000900029', 'Escolha o teorema adequado', 'Pelo teorema posto-nulidade, $\dim\ker T+\dim\operatorname{Im}T=\dim\mathbb R^5$.', 2),
  ('78000000-0000-4000-8000-000000900293', '40000000-0000-4000-8000-000000900029', 'Troque imagem por posto', 'Como $\dim\operatorname{Im}T=\operatorname{posto}(T)=2$, obtemos $\dim\ker T+2=5$.', 3),
  ('78000000-0000-4000-8000-000000900294', '40000000-0000-4000-8000-000000900029', 'Isole a nulidade', 'Subtraindo $2$ dos dois lados, resulta $\dim\ker T=3$.', 4),
  ('78000000-0000-4000-8000-000000900295', '40000000-0000-4000-8000-000000900029', 'Cheque a contagem', 'Posto $2$ mais nulidade $3$ recompõe a dimensão $5$ do domínio; portanto a alternativa C é correta.', 5),
  ('78000000-0000-4000-8000-000000900301', '40000000-0000-4000-8000-000000900030', 'Recorde a relação dimensional', 'Para subespaços finitos, $\dim(U+V)=\dim U+\dim V-\dim(U\cap V)$.', 1),
  ('78000000-0000-4000-8000-000000900302', '40000000-0000-4000-8000-000000900030', 'Substitua as três dimensões dadas', 'A fórmula fica $4=3+2-\dim(U\cap V)$.', 2),
  ('78000000-0000-4000-8000-000000900303', '40000000-0000-4000-8000-000000900030', 'Agrupe o lado conhecido', 'Como $3+2=5$, temos $4=5-\dim(U\cap V)$.', 3),
  ('78000000-0000-4000-8000-000000900304', '40000000-0000-4000-8000-000000900030', 'Encontre a interseção', 'Portanto, $\dim(U\cap V)=5-4=1$.', 4),
  ('78000000-0000-4000-8000-000000900305', '40000000-0000-4000-8000-000000900030', 'Interprete a correção', 'Há exatamente uma direção contada duas vezes na soma; isso confirma a alternativa D.', 5),
  ('78000000-0000-4000-8000-000000900311', '40000000-0000-4000-8000-000000900031', 'Imponha a simetria', 'Uma matriz simétrica $2\times2$ deve ter a forma $\begin{pmatrix}a&b\\b&c\end{pmatrix}$.', 1),
  ('78000000-0000-4000-8000-000000900312', '40000000-0000-4000-8000-000000900031', 'Identifique os graus de liberdade', 'As escolhas independentes são $a$, $b$ e $c$; as duas posições fora da diagonal compartilham $b$.', 2),
  ('78000000-0000-4000-8000-000000900313', '40000000-0000-4000-8000-000000900031', 'Separe a combinação linear', 'A matriz vale $aE_{11}+b(E_{12}+E_{21})+cE_{22}$.', 3),
  ('78000000-0000-4000-8000-000000900314', '40000000-0000-4000-8000-000000900031', 'Justifique que é uma base', 'As três matrizes propostas são simétricas, independentes e geram toda matriz dessa forma.', 4),
  ('78000000-0000-4000-8000-000000900315', '40000000-0000-4000-8000-000000900031', 'Compare dimensão e conjunto', 'A base possui três elementos, então $\dim S=3$ e a alternativa A é a correta.', 5),
  ('78000000-0000-4000-8000-000000900321', '40000000-0000-4000-8000-000000900032', 'Defina a avaliação', 'Considere $T:P_3\to\mathbb R$ dada por $T(p)=p(1)$.', 1),
  ('78000000-0000-4000-8000-000000900322', '40000000-0000-4000-8000-000000900032', 'Relacione a condição ao núcleo', 'O conjunto pedido é $W=\ker T$, pois seus polinômios são exatamente os enviados a zero.', 2),
  ('78000000-0000-4000-8000-000000900323', '40000000-0000-4000-8000-000000900032', 'Determine o posto do funcional', 'Como $T(1)=1$, a imagem contém um escalar não nulo e, por estar em $\mathbb R$, tem dimensão $1$.', 3),
  ('78000000-0000-4000-8000-000000900324', '40000000-0000-4000-8000-000000900032', 'Aplique posto-nulidade', 'Como $\dim P_3=4$, vale $\dim W+1=4$.', 4),
  ('78000000-0000-4000-8000-000000900325', '40000000-0000-4000-8000-000000900032', 'Confirme a dimensão', 'Assim $\dim W=3$, coincidindo com a alternativa B.', 5),
  ('78000000-0000-4000-8000-000000900331', '40000000-0000-4000-8000-000000900033', 'Descreva o subespaço dado', 'Os vetores de $U$ têm a forma $(x,y,0)$, portanto $U$ é o plano $z=0$.', 1),
  ('78000000-0000-4000-8000-000000900332', '40000000-0000-4000-8000-000000900033', 'Procure a direção ausente', 'Para completar esse plano em $\mathbb R^3$, é preciso acrescentar uma direção com terceira coordenada não nula.', 2),
  ('78000000-0000-4000-8000-000000900333', '40000000-0000-4000-8000-000000900033', 'Teste a interseção', 'O único vetor simultaneamente em $U$ e em $\operatorname{span}\{(0,0,1)\}$ é $(0,0,0)$.', 3),
  ('78000000-0000-4000-8000-000000900334', '40000000-0000-4000-8000-000000900033', 'Monte qualquer vetor do espaço', 'Para todo $(x,y,z)$, temos $(x,y,z)=(x,y,0)+(0,0,z)$.', 4),
  ('78000000-0000-4000-8000-000000900335', '40000000-0000-4000-8000-000000900033', 'Conclua pela unicidade', 'A soma gera $\mathbb R^3$ e a interseção é nula; logo a alternativa C define a soma direta.', 5),
  ('78000000-0000-4000-8000-000000900341', '40000000-0000-4000-8000-000000900034', 'Escreva a condição de núcleo', 'Para $v=(x,y,z)$, a equação $Av=0$ produz $x+y=0$ e $y+z=0$.', 1),
  ('78000000-0000-4000-8000-000000900342', '40000000-0000-4000-8000-000000900034', 'Escolha o parâmetro livre', 'Tomando $y=-t$, a primeira equação dá $x=t$ e a segunda dá $z=t$.', 2),
  ('78000000-0000-4000-8000-000000900343', '40000000-0000-4000-8000-000000900034', 'Exiba uma direção do núcleo', 'Com $t=1$, obtemos o vetor não nulo $(1,-1,1)$.', 3),
  ('78000000-0000-4000-8000-000000900344', '40000000-0000-4000-8000-000000900034', 'Verifique os produtos escalares', 'Temos $(1,1,0)\cdot(1,-1,1)=0$ e $(0,1,1)\cdot(1,-1,1)=0$.', 4),
  ('78000000-0000-4000-8000-000000900345', '40000000-0000-4000-8000-000000900034', 'Vincule ao espaço linha', 'O vetor é nulo sob $A$ e ortogonal às duas linhas, portanto a alternativa D é a única adequada.', 5);

update public.question_solutions
set explanation_markdown = 'Vetores coluna percorrem a composição como $v\mapsto Bv\mapsto A(Bv)$. Pela associatividade, $A(Bv)=(AB)v$; as dimensões externas confirmam que $AB$ tem ordem $2\times2$.'
where question_id = '40000000-0000-4000-8000-000000900011';

commit;
