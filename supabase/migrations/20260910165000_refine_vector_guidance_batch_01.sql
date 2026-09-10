-- Revisão individual de vetores e componentes.
begin;
update public.questions set difficulty='easy' where id in ('40000000-0000-4000-8000-000000050003','40000000-0000-4000-8000-000000050008','40000000-0000-4000-8000-000000050011','40000000-0000-4000-8000-000000050016','40000000-0000-4000-8000-000000050020');
update public.questions set difficulty='medium' where id in ('40000000-0000-4000-8000-000000050004','40000000-0000-4000-8000-000000050005','40000000-0000-4000-8000-000000050006','40000000-0000-4000-8000-000000050007','40000000-0000-4000-8000-000000050010','40000000-0000-4000-8000-000000050012','40000000-0000-4000-8000-000000050014','40000000-0000-4000-8000-000000050015','40000000-0000-4000-8000-000000050017','40000000-0000-4000-8000-000000050019');
with revised(question_id,hint) as (values
('40000000-0000-4000-8000-000000050001'::uuid,'Some o deslocamento calculado a $A$ e confira se o resultado recupera exatamente $B$.'),
('40000000-0000-4000-8000-000000050002'::uuid,'A posição dos segmentos pode mudar sem alterar direção, sentido ou comprimento.'),
('40000000-0000-4000-8000-000000050003'::uuid,'Subtraia a origem da extremidade candidata: a diferença deve ser exatamente $v$.'),
('40000000-0000-4000-8000-000000050004'::uuid,'Um único escalar negativo deve relacionar simultaneamente as três componentes.'),
('40000000-0000-4000-8000-000000050005'::uuid,'O valor obtido na primeira componente também precisa satisfazer a segunda.'),
('40000000-0000-4000-8000-000000050006'::uuid,'Depois de obter $B$, recalcule $(A+B)/2$ e compare com $M$.'),
('40000000-0000-4000-8000-000000050007'::uuid,'O ponto intermediário não altera o deslocamento total entre início e fim.'),
('40000000-0000-4000-8000-000000050008'::uuid,'A componente nula indica ausência de movimento naquele eixo, não distância nula.'),
('40000000-0000-4000-8000-000000050009'::uuid,'Confira separadamente os sinais das três somas coordenadas.'),
('40000000-0000-4000-8000-000000050010'::uuid,'Calcule primeiro $2u$; só então subtraia cada componente de $v$.'),
('40000000-0000-4000-8000-000000050011'::uuid,'A expressão correta deve cancelar cada componente de $u$, não apenas seu módulo.'),
('40000000-0000-4000-8000-000000050012'::uuid,'O mesmo $k$ precisa reproduzir as três componentes de $w-(1,2,-1)$.'),
('40000000-0000-4000-8000-000000050013'::uuid,'A seta deve começar em $A$ e terminar em $B$; a ordem das letras registra esse sentido.'),
('40000000-0000-4000-8000-000000050014'::uuid,'Use a relação de Chasles e confira se as extremidades intermediárias se cancelam.'),
('40000000-0000-4000-8000-000000050015'::uuid,'Recalcule somente a terceira diferença, onde ocorreu a troca de sinal.'),
('40000000-0000-4000-8000-000000050016'::uuid,'Apenas a coordenada $y$ varia, e o sinal negativo determina o sentido do movimento.'),
('40000000-0000-4000-8000-000000050017'::uuid,'Compare a soma das duas etapas do primeiro robô com o único deslocamento do segundo.'),
('40000000-0000-4000-8000-000000050018'::uuid,'O vetor posição parte da origem; suas componentes coincidem com as coordenadas do ponto.'),
('40000000-0000-4000-8000-000000050019'::uuid,'O fator $1/3$ deve ser aplicado às três componentes de $\overrightarrow{AB}$.'),
('40000000-0000-4000-8000-000000050020'::uuid,'Verifique a extremidade calculando $X-A$ e comparando com o deslocamento fornecido.'))
update public.question_hints h set content_markdown=r.hint from revised r where h.question_id=r.question_id and h.sort_order=3;
commit;
