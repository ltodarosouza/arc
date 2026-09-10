-- Revisão individual de equações de retas.
begin;
update public.questions set difficulty='easy' where id in ('40000000-0000-4000-8000-000000050304','40000000-0000-4000-8000-000000050305','40000000-0000-4000-8000-000000050306','40000000-0000-4000-8000-000000050310','40000000-0000-4000-8000-000000050314','40000000-0000-4000-8000-000000050318','40000000-0000-4000-8000-000000050320');
update public.questions set difficulty='medium' where id in ('40000000-0000-4000-8000-000000050308','40000000-0000-4000-8000-000000050309','40000000-0000-4000-8000-000000050312','40000000-0000-4000-8000-000000050315','40000000-0000-4000-8000-000000050319');
with revised(question_id,hint) as (values
('40000000-0000-4000-8000-000000050301'::uuid,'O vetor diretor é o coeficiente do parâmetro, independentemente do ponto inicial.'),
('40000000-0000-4000-8000-000000050302'::uuid,'O mesmo parâmetro deve produzir simultaneamente as três coordenadas do ponto.'),
('40000000-0000-4000-8000-000000050303'::uuid,'Em $t=0$, a parametrização escolhida precisa devolver $P$.'),
('40000000-0000-4000-8000-000000050304'::uuid,'Leia apenas a segunda componente da equação vetorial e mantenha o coeficiente $4$.'),
('40000000-0000-4000-8000-000000050305'::uuid,'Diretores paralelos são múltiplos escalares completos, não apenas vetores com sinais parecidos.'),
('40000000-0000-4000-8000-000000050306'::uuid,'Confirme a perpendicularidade calculando um produto escalar igual a zero.'),
('40000000-0000-4000-8000-000000050307'::uuid,'Substitua $t=2$ nas três coordenadas e confira cada sinal.'),
('40000000-0000-4000-8000-000000050308'::uuid,'Use primeiro a coordenada $z$ para determinar o parâmetro de interseção.'),
('40000000-0000-4000-8000-000000050309'::uuid,'Além de diretor proporcional, o novo ponto-base deve pertencer à reta original.'),
('40000000-0000-4000-8000-000000050310'::uuid,'Um ponto comum elimina a possibilidade de duas retas paralelas distintas.'),
('40000000-0000-4000-8000-000000050311'::uuid,'Tanto $B-A$ quanto qualquer múltiplo não nulo dele serve como direção.'),
('40000000-0000-4000-8000-000000050312'::uuid,'Confira se a diferença entre os pontos é proporcional ao diretor da alternativa.'),
('40000000-0000-4000-8000-000000050313'::uuid,'No eixo $z$, as coordenadas $x$ e $y$ permanecem nulas para todo parâmetro.'),
('40000000-0000-4000-8000-000000050314'::uuid,'Depois de achar $t$ pela coordenada $x$, não é necessário impor valores a $y$ e $z$.'),
('40000000-0000-4000-8000-000000050315'::uuid,'Resolva as coordenadas $x$ e $y$ em conjunto e confirme que $z$ coincide.'),
('40000000-0000-4000-8000-000000050317'::uuid,'O sinal negativo do diretor faz $x$ diminuir quando o parâmetro aumenta.'),
('40000000-0000-4000-8000-000000050318'::uuid,'Os denominadores da forma simétrica fornecem as componentes do diretor.'),
('40000000-0000-4000-8000-000000050319'::uuid,'Procure uma combinação linear das coordenadas que permaneça constante ao variar $t$.'),
('40000000-0000-4000-8000-000000050320'::uuid,'Uma reta perpendicular ao plano deve usar um diretor paralelo à normal do plano.'))
update public.question_hints h set content_markdown=r.hint from revised r where h.question_id=r.question_id and h.sort_order=3;
update public.question_solution_steps set title=case sort_order when 1 then 'Extraia ponto e direção' when 2 then 'Imponha a condição da reta' when 3 then 'Resolva o parâmetro' when 4 then 'Teste a representação' else title end
where question_id between '40000000-0000-4000-8000-000000050301' and '40000000-0000-4000-8000-000000050320';
commit;
