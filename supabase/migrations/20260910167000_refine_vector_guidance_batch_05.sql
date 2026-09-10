-- Revisão individual de equações de planos.
begin;
update public.questions set difficulty='easy' where id in ('40000000-0000-4000-8000-000000050405','40000000-0000-4000-8000-000000050407','40000000-0000-4000-8000-000000050410','40000000-0000-4000-8000-000000050411','40000000-0000-4000-8000-000000050413','40000000-0000-4000-8000-000000050415','40000000-0000-4000-8000-000000050418','40000000-0000-4000-8000-000000050420');
update public.questions set difficulty='medium' where id in ('40000000-0000-4000-8000-000000050404','40000000-0000-4000-8000-000000050406','40000000-0000-4000-8000-000000050409','40000000-0000-4000-8000-000000050412','40000000-0000-4000-8000-000000050414','40000000-0000-4000-8000-000000050419');
with revised(question_id,hint) as (values
('40000000-0000-4000-8000-000000050401'::uuid,'Os coeficientes de $x$, $y$ e $z$ formam diretamente uma normal.'),
('40000000-0000-4000-8000-000000050402'::uuid,'Substitua cada ponto e aceite apenas aquele que torna o lado esquerdo igual a $2$.'),
('40000000-0000-4000-8000-000000050403'::uuid,'Após expandir a forma ponto-normal, confira se o ponto dado satisfaz a equação.'),
('40000000-0000-4000-8000-000000050404'::uuid,'Os três pontos têm a mesma coordenada $z$; use isso para identificar o plano.'),
('40000000-0000-4000-8000-000000050405'::uuid,'Planos paralelos têm vetores normais proporcionais, mas podem ter termos independentes distintos.'),
('40000000-0000-4000-8000-000000050406'::uuid,'Para planos perpendiculares, procure normais cujo produto escalar seja zero.'),
('40000000-0000-4000-8000-000000050407'::uuid,'No eixo $x$, imponha $y=z=0$ antes de resolver a equação.'),
('40000000-0000-4000-8000-000000050408'::uuid,'Todo ponto do plano $yz$ tem primeira coordenada nula.'),
('40000000-0000-4000-8000-000000050409'::uuid,'Divida o módulo do termo independente pela norma da normal.'),
('40000000-0000-4000-8000-000000050410'::uuid,'O valor de $c$ é obtido avaliando o lado esquerdo no ponto fornecido.'),
('40000000-0000-4000-8000-000000050411'::uuid,'Um vetor paralelo ao plano deve ter produto escalar zero com a normal.'),
('40000000-0000-4000-8000-000000050412'::uuid,'Teste o ponto-base e o diretor: o primeiro deve pertencer e o segundo deve ser paralelo ao plano.'),
('40000000-0000-4000-8000-000000050413'::uuid,'Compare toda a equação após multiplicar a primeira por $2$, incluindo o termo independente.'),
('40000000-0000-4000-8000-000000050414'::uuid,'Use a forma de interceptos $x/a+y/b+z/c=1$ antes de eliminar denominadores.'),
('40000000-0000-4000-8000-000000050415'::uuid,'O produto vetorial dos dois geradores fornece uma normal ao plano.'),
('40000000-0000-4000-8000-000000050416'::uuid,'No eixo $z$, faça $x=0$ e resolva apenas a coordenada restante.'),
('40000000-0000-4000-8000-000000050417'::uuid,'Normais opostas ainda são paralelas e determinam planos paralelos ou coincidentes.'),
('40000000-0000-4000-8000-000000050418'::uuid,'Um plano perpendicular ao eixo $z$ tem normal paralela a $(0,0,1)$.'),
('40000000-0000-4000-8000-000000050419'::uuid,'Substitua as coordenadas de cada alternativa e compare o resultado com $5$.'),
('40000000-0000-4000-8000-000000050420'::uuid,'O diretor da reta perpendicular deve ser múltiplo da normal $(3,1,-2)$.'))
update public.question_hints h set content_markdown=r.hint from revised r where h.question_id=r.question_id and h.sort_order=3;
update public.question_solution_steps set title=case sort_order when 1 then 'Identifique ponto e normal' when 2 then 'Construa a condição planar' when 3 then 'Desenvolva a equação' when 4 then 'Verifique no plano' else title end
where question_id between '40000000-0000-4000-8000-000000050401' and '40000000-0000-4000-8000-000000050420';
commit;
