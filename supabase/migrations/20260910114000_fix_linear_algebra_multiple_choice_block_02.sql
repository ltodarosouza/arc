-- Álgebra Linear — correção do bloco 2 (questões 900035 a 900071).
begin;

delete from public.question_hints
where question_id = '40000000-0000-4000-8000-000000900053';

delete from public.question_solution_steps
where question_id in (
  '40000000-0000-4000-8000-000000900040',
  '40000000-0000-4000-8000-000000900042',
  '40000000-0000-4000-8000-000000900050',
  '40000000-0000-4000-8000-000000900054',
  '40000000-0000-4000-8000-000000900061',
  '40000000-0000-4000-8000-000000900065',
  '40000000-0000-4000-8000-000000900068'
);

insert into public.question_hints (id, question_id, content_markdown, sort_order) values
  ('68100000-0000-4000-8000-000000900531', '40000000-0000-4000-8000-000000900053', 'A projeção é definida pela decomposição $u+v$, com $u\in U$ e $v\in V$.', 1),
  ('68100000-0000-4000-8000-000000900532', '40000000-0000-4000-8000-000000900053', 'Escreva $u=(a,0)$ e $v=(b,b)$ antes de comparar as componentes de $(3,2)$.', 2),
  ('68100000-0000-4000-8000-000000900533', '40000000-0000-4000-8000-000000900053', 'A componente vertical determina $b$; use a componente horizontal para obter $a$.', 3);

insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values
  ('78100000-0000-4000-8000-000000900401', '40000000-0000-4000-8000-000000900040', 'Identifique o sentido da conversão', 'A matriz procurada recebe $[v]_B$ e devolve $v$ em coordenadas padrão.', 1),
  ('78100000-0000-4000-8000-000000900402', '40000000-0000-4000-8000-000000900040', 'Use o primeiro vetor da base', 'A primeira coluna deve ser $b_1=(2,1)$.', 2),
  ('78100000-0000-4000-8000-000000900403', '40000000-0000-4000-8000-000000900040', 'Use o segundo vetor da base', 'A segunda coluna deve ser $b_2=(0,3)$.', 3),
  ('78100000-0000-4000-8000-000000900404', '40000000-0000-4000-8000-000000900040', 'Forme a matriz de colunas', 'Assim, $P_{E\leftarrow B}=\begin{pmatrix}2&0\\1&3\end{pmatrix}$.', 4),
  ('78100000-0000-4000-8000-000000900405', '40000000-0000-4000-8000-000000900040', 'Verifique a ação', 'De fato, $P_{E\leftarrow B}(a,b)=a(2,1)+b(0,3)$, como exige a alternativa D.', 5),
  ('78100000-0000-4000-8000-000000900421', '40000000-0000-4000-8000-000000900042', 'Separe a parcela horizontal', 'Como $U$ é o eixo horizontal, sua parcela tem a forma $(a,0)$.', 1),
  ('78100000-0000-4000-8000-000000900422', '40000000-0000-4000-8000-000000900042', 'Separe a parcela vertical', 'Como $V$ é o eixo vertical, sua parcela tem a forma $(0,b)$.', 2),
  ('78100000-0000-4000-8000-000000900423', '40000000-0000-4000-8000-000000900042', 'Compare com o vetor dado', 'De $(a,0)+(0,b)=(3,-2)$, obtemos $a=3$ e $b=-2$.', 3),
  ('78100000-0000-4000-8000-000000900424', '40000000-0000-4000-8000-000000900042', 'Escreva a decomposição', 'Logo, $(3,-2)=(3,0)+(0,-2)$.', 4),
  ('78100000-0000-4000-8000-000000900425', '40000000-0000-4000-8000-000000900042', 'Confirme a unicidade', 'Temos $U\cap V=\{0\}$, então a decomposição é única e corresponde à alternativa B.', 5),
  ('78100000-0000-4000-8000-000000900501', '40000000-0000-4000-8000-000000900050', 'Registre a primeira mudança', '$P_{C\leftarrow B}$ leva $[v]_B$ para $[v]_C$.', 1),
  ('78100000-0000-4000-8000-000000900502', '40000000-0000-4000-8000-000000900050', 'Registre a segunda mudança', '$P_{D\leftarrow C}$ leva $[v]_C$ para $[v]_D$.', 2),
  ('78100000-0000-4000-8000-000000900503', '40000000-0000-4000-8000-000000900050', 'Escreva as duas igualdades', '$[v]_C=P_{C\leftarrow B}[v]_B$ e $[v]_D=P_{D\leftarrow C}[v]_C$.', 3),
  ('78100000-0000-4000-8000-000000900504', '40000000-0000-4000-8000-000000900050', 'Substitua a coordenada intermediária', 'Portanto, $[v]_D=P_{D\leftarrow C}P_{C\leftarrow B}[v]_B$.', 4),
  ('78100000-0000-4000-8000-000000900505', '40000000-0000-4000-8000-000000900050', 'Leia a composição correta', 'A primeira conversão fica à direita; a alternativa B é a matriz direta.', 5),
  ('78100000-0000-4000-8000-000000900541', '40000000-0000-4000-8000-000000900054', 'Cheque a pertinência', 'Temos $3-1-2=0$, então o vetor pertence ao plano $W$.', 1),
  ('78100000-0000-4000-8000-000000900542', '40000000-0000-4000-8000-000000900054', 'Introduza os coeficientes', '$a(1,-1,0)+b(1,0,-1)=(3,-1,-2)$.', 2),
  ('78100000-0000-4000-8000-000000900543', '40000000-0000-4000-8000-000000900054', 'Use a segunda coordenada', '$-a=-1$, logo $a=1$.', 3),
  ('78100000-0000-4000-8000-000000900544', '40000000-0000-4000-8000-000000900054', 'Use a terceira coordenada', '$-b=-2$, logo $b=2$.', 4),
  ('78100000-0000-4000-8000-000000900545', '40000000-0000-4000-8000-000000900054', 'Valide na primeira coordenada', 'Como $a+b=3$, $[(3,-1,-2)]_B=(1,2)$, a alternativa B.', 5),
  ('78100000-0000-4000-8000-000000900611', '40000000-0000-4000-8000-000000900061', 'Leia domínio e posto', 'O domínio é $\mathbb R^4$, de dimensão $4$, e o posto é $4$.', 1),
  ('78100000-0000-4000-8000-000000900612', '40000000-0000-4000-8000-000000900061', 'Aplique posto-nulidade', 'Vale $\dim\ker T+\operatorname{posto}(T)=4$.', 2),
  ('78100000-0000-4000-8000-000000900613', '40000000-0000-4000-8000-000000900061', 'Substitua o posto máximo', 'Obtemos $\dim\ker T+4=4$.', 3),
  ('78100000-0000-4000-8000-000000900614', '40000000-0000-4000-8000-000000900061', 'Determine o núcleo', 'Assim, $\dim\ker T=0$ e $\ker T=\{0\}$.', 4),
  ('78100000-0000-4000-8000-000000900615', '40000000-0000-4000-8000-000000900061', 'Conclua a propriedade', 'Núcleo trivial caracteriza injetividade; a alternativa correta afirma que $T$ é injetiva.', 5),
  ('78100000-0000-4000-8000-000000900651', '40000000-0000-4000-8000-000000900065', 'Escolha um vetor do núcleo', 'Tome $v\in\ker T$; então $T(v)=0$.', 1),
  ('78100000-0000-4000-8000-000000900652', '40000000-0000-4000-8000-000000900065', 'Aplique a composição', '$(S\circ T)(v)=S(T(v))=S(0)$.', 2),
  ('78100000-0000-4000-8000-000000900653', '40000000-0000-4000-8000-000000900065', 'Use a linearidade', 'Como $S$ é linear, $S(0)=0$.', 3),
  ('78100000-0000-4000-8000-000000900654', '40000000-0000-4000-8000-000000900065', 'Conclua a inclusão', 'Logo, $v\in\ker(S\circ T)$.', 4),
  ('78100000-0000-4000-8000-000000900655', '40000000-0000-4000-8000-000000900065', 'Compare os conjuntos', 'Portanto, $\ker T\subseteq\ker(S\circ T)$, exatamente a alternativa C.', 5),
  ('78100000-0000-4000-8000-000000900681', '40000000-0000-4000-8000-000000900068', 'Use a sobrejetividade', 'Como $T:\mathbb R^3\to\mathbb R^2$ é sobrejetiva, seu posto é $2$.', 1),
  ('78100000-0000-4000-8000-000000900682', '40000000-0000-4000-8000-000000900068', 'Calcule a nulidade', 'Pelo posto-nulidade, $\dim\ker T=3-2=1$.', 2),
  ('78100000-0000-4000-8000-000000900683', '40000000-0000-4000-8000-000000900068', 'Use o complemento', 'Como $U$ complementa $\ker T$, $\mathbb R^3=U\oplus\ker T$ e $\dim U=2$.', 3),
  ('78100000-0000-4000-8000-000000900684', '40000000-0000-4000-8000-000000900068', 'Restrinja sem criar núcleo', '$U\cap\ker T=\{0\}$ mostra que $T|_U$ é injetiva.', 4),
  ('78100000-0000-4000-8000-000000900685', '40000000-0000-4000-8000-000000900068', 'Compare as dimensões finais', 'A restrição é injetiva entre espaços de dimensão $2$; logo é um isomorfismo.', 5);

update public.question_solutions
set explanation_markdown = 'A matriz de transição $P_{C\leftarrow B}$ recebe coordenadas em $B$ e devolve coordenadas em $C$. Suas colunas são as coordenadas, em $C$, dos vetores da base de partida.'
where question_id = '40000000-0000-4000-8000-000000900049';

update public.question_options
set content_markdown = case label
  when 'A' then '$\operatorname{Im}S\subseteq\ker T$'
  when 'B' then '$\ker(S\circ T)\subseteq\ker T$'
  when 'C' then '$\ker T\subseteq\ker(S\circ T)$'
  when 'D' then '$\ker S\subseteq\ker T$'
end
where question_id = '40000000-0000-4000-8000-000000900065';

update public.question_solutions
set final_answer_markdown = '$\ker T\subseteq\ker(S\circ T)$',
    explanation_markdown = 'Se $T$ envia um vetor a zero, aplicar a transformação linear $S$ em seguida ainda produz zero. A inclusão inversa não é garantida, pois $S$ pode anular vetores que não pertencem ao núcleo de $T$.'
where question_id = '40000000-0000-4000-8000-000000900065';

commit;
