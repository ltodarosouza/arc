-- Revisão individual: produto vetorial e produto misto.
begin;

update public.questions set statement_markdown='Se $u\times v\ne 0$, a quais vetores $u\times v$ é perpendicular?'
where id='40000000-0000-4000-8000-000000050206';
update public.questions set difficulty='easy' where id in (
'40000000-0000-4000-8000-000000050203','40000000-0000-4000-8000-000000050204',
'40000000-0000-4000-8000-000000050208','40000000-0000-4000-8000-000000050210',
'40000000-0000-4000-8000-000000050211','40000000-0000-4000-8000-000000050212',
'40000000-0000-4000-8000-000000050214','40000000-0000-4000-8000-000000050215',
'40000000-0000-4000-8000-000000050217');
update public.questions set difficulty='medium' where id in (
'40000000-0000-4000-8000-000000050207','40000000-0000-4000-8000-000000050209',
'40000000-0000-4000-8000-000000050213','40000000-0000-4000-8000-000000050219');

with revised(question_id,hint) as (values
('40000000-0000-4000-8000-000000050201'::uuid,'Confira o sentido pela ordem cíclica $i,j,k$; inverter os fatores inverteria o sinal.'),
('40000000-0000-4000-8000-000000050202'::uuid,'A inversão deve trocar simultaneamente os sinais das três componentes.'),
('40000000-0000-4000-8000-000000050203'::uuid,'Como os vetores são ortogonais, o seno do ângulo não reduz a área.'),
('40000000-0000-4000-8000-000000050204'::uuid,'Depois de obter a área do paralelogramo, verifique se aplicou o fator $1/2$.'),
('40000000-0000-4000-8000-000000050206'::uuid,'Teste a conclusão calculando os dois produtos escalares com $u\times v$.'),
('40000000-0000-4000-8000-000000050207'::uuid,'Mantenha a ordem $u_yv_z-u_zv_y$ para não inverter o sinal da primeira componente.'),
('40000000-0000-4000-8000-000000050208'::uuid,'A ortogonalidade dos três eixos faz o volume coincidir com o produto dos comprimentos.'),
('40000000-0000-4000-8000-000000050209'::uuid,'Volume nulo indica dependência linear, mas não exige que algum vetor seja nulo.'),
('40000000-0000-4000-8000-000000050210'::uuid,'Confira a normal candidata tomando seu produto escalar com os dois geradores.'),
('40000000-0000-4000-8000-000000050211'::uuid,'Use o seno do ângulo, não o cosseno empregado no produto escalar.'),
('40000000-0000-4000-8000-000000050212'::uuid,'Separe orientação, dada pelo sinal, da área, dada pelo módulo.'),
('40000000-0000-4000-8000-000000050213'::uuid,'Uma direção perpendicular ao plano $xy$ deve ter apenas componente $z$ não nula.'),
('40000000-0000-4000-8000-000000050214'::uuid,'O sinal do produto misto registra orientação e desaparece ao calcular volume.'),
('40000000-0000-4000-8000-000000050215'::uuid,'A regra cíclica $j\times k=i$ determina o sentido antes de multiplicar os módulos.'),
('40000000-0000-4000-8000-000000050216'::uuid,'Verifique se a expressão escolhida mede metade do paralelogramo.'),
('40000000-0000-4000-8000-000000050217'::uuid,'A anticomutatividade preserva o módulo e troca a orientação.'),
('40000000-0000-4000-8000-000000050218'::uuid,'Se $\overrightarrow{AB}$ e $\overrightarrow{AC}$ são paralelos, o paralelogramo associado degenera.'),
('40000000-0000-4000-8000-000000050219'::uuid,'Teste a identidade expandindo a soma e lembrando que $u\times u=0$.'),
('40000000-0000-4000-8000-000000050220'::uuid,'Faça uma análise dimensional: dois comprimentos multiplicados produzem área.')
)
update public.question_hints h set content_markdown=r.hint from revised r
where h.question_id=r.question_id and h.sort_order=3;

with titles(question_id,names) as (values
('40000000-0000-4000-8000-000000050201'::uuid,array['Fixe a ordem da base','Use a orientação cíclica','Determine o versor resultante','Teste a troca de fatores']),
('40000000-0000-4000-8000-000000050202'::uuid,array['Leia o produto fornecido','Inverta os fatores','Troque as três componentes','Confira a anticomutatividade']),
('40000000-0000-4000-8000-000000050203'::uuid,array['Reconheça o paralelogramo','Use a ortogonalidade','Multiplique os comprimentos','Confirme a unidade de área']),
('40000000-0000-4000-8000-000000050204'::uuid,array['Relacione triângulo e paralelogramo','Calcule o produto vetorial','Tome metade do módulo','Confira o fator geométrico']),
('40000000-0000-4000-8000-000000050206'::uuid,array['Identifique o plano dos fatores','Use a normal do produto','Teste os produtos escalares','Interprete a condição não nula']),
('40000000-0000-4000-8000-000000050207'::uuid,array['Selecione a componente $x$','Mantenha a ordem dos termos','Calcule a diferença','Cheque o sinal']),
('40000000-0000-4000-8000-000000050208'::uuid,array['Reconheça os três eixos','Relacione ao produto misto','Calcule os comprimentos','Confira o volume']),
('40000000-0000-4000-8000-000000050209'::uuid,array['Traduza o produto misto nulo','Relacione volume e dependência','Caracterize a coplanaridade','Exclua conclusões excessivas']),
('40000000-0000-4000-8000-000000050210'::uuid,array['Liste os geradores do plano','Construa uma normal','Compare com as alternativas','Teste a ortogonalidade']),
('40000000-0000-4000-8000-000000050211'::uuid,array['Escolha a fórmula de área','Substitua módulos e ângulo','Use o seno de $30^\circ$','Interprete o módulo']),
('40000000-0000-4000-8000-000000050212'::uuid,array['Separe vetor e módulo','Calcule o comprimento','Interprete o sinal','Conclua sobre área e orientação']),
('40000000-0000-4000-8000-000000050213'::uuid,array['Localize o plano dos vetores','Escolha a direção normal','Teste o primeiro produto','Teste o segundo produto']),
('40000000-0000-4000-8000-000000050214'::uuid,array['Leia o volume orientado','Tome o valor absoluto','Obtenha o volume geométrico','Explique o sinal descartado']),
('40000000-0000-4000-8000-000000050215'::uuid,array['Associe vetores aos eixos','Aplique a regra cíclica','Multiplique os módulos','Cheque direção e sentido']),
('40000000-0000-4000-8000-000000050216'::uuid,array['Identifique a figura pedida','Parta da área vetorial','Aplique o fator $1/2$','Compare as fórmulas']),
('40000000-0000-4000-8000-000000050217'::uuid,array['Identifique a transformação','Aplique anticomutatividade','Compare os módulos','Compare os sentidos']),
('40000000-0000-4000-8000-000000050218'::uuid,array['Converta pontos em lados','Use a colinearidade','Obtenha produto nulo','Interprete a área degenerada']),
('40000000-0000-4000-8000-000000050219'::uuid,array['Liste as propriedades candidatas','Expanda a distributividade','Use o produto de vetor consigo','Valide a identidade']),
('40000000-0000-4000-8000-000000050220'::uuid,array['Relacione produto vetorial e área','Conte fatores de comprimento','Determine a dimensão','Escolha a unidade compatível']))
)
update public.question_solution_steps s set title=t.names[s.sort_order]
from titles t where s.question_id=t.question_id and s.sort_order between 1 and 4;

commit;
