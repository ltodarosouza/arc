-- Arquitetura de Computadores — lote 01: 50 questões originais, revisadas e autorais.
begin;

insert into public.subjects (id, slug, name, description, sort_order, is_published) values
('20000000-0000-4000-8000-000000000005', 'arquitetura-de-computadores', 'Arquitetura de Computadores', 'Fundamentos digitais, memória, processadores e entrada/saída.', 5, true)
on conflict (id) do update set slug=excluded.slug, name=excluded.name, description=excluded.description, sort_order=excluded.sort_order, is_published=excluded.is_published;

insert into public.taxonomy_nodes (id, subject_id, parent_id, kind, slug, name, sort_order, is_published) values
('30000000-0000-4000-8000-000000001101', '20000000-0000-4000-8000-000000000005', null, 'unit', 'fundamentos-digitais', 'Fundamentos digitais', 1, true),
('30000000-0000-4000-8000-000000001102', '20000000-0000-4000-8000-000000000005', null, 'unit', 'memoria-e-processamento', 'Memória e processamento', 2, true),
('30000000-0000-4000-8000-000000001103', '20000000-0000-4000-8000-000000000005', null, 'unit', 'sistemas-e-desempenho', 'Sistemas e desempenho', 3, true),
(
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
0
0
1
'
,
 
'
2
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
0
0
0
5
'
,
 
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
1
0
1
'
,
 
'
t
o
p
i
c
'
,
 
'
r
e
p
r
e
s
e
n
t
a
c
a
o
-
e
-
a
r
i
t
m
e
t
i
c
a
'
,
 
'
R
e
p
r
e
s
e
n
t
a
ç
ã
o
 
e
 
a
r
i
t
m
é
t
i
c
a
 
b
i
n
á
r
i
a
'
,
 
1
,
 
t
r
u
e
)
,


(
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
0
0
2
'
,
 
'
2
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
0
0
0
5
'
,
 
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
1
0
1
'
,
 
'
t
o
p
i
c
'
,
 
'
l
o
g
i
c
a
-
b
o
o
l
e
a
n
a
'
,
 
'
L
ó
g
i
c
a
 
b
o
o
l
e
a
n
a
'
,
 
2
,
 
t
r
u
e
)
,


(
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
0
0
3
'
,
 
'
2
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
0
0
0
5
'
,
 
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
1
0
1
'
,
 
'
t
o
p
i
c
'
,
 
'
c
i
r
c
u
i
t
o
s
-
c
o
m
b
i
n
a
c
i
o
n
a
i
s
'
,
 
'
C
i
r
c
u
i
t
o
s
 
c
o
m
b
i
n
a
c
i
o
n
a
i
s
'
,
 
3
,
 
t
r
u
e
)
,


(
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
0
0
4
'
,
 
'
2
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
0
0
0
5
'
,
 
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
1
0
1
'
,
 
'
t
o
p
i
c
'
,
 
'
f
l
i
p
-
f
l
o
p
s
-
e
-
r
e
g
i
s
t
r
a
d
o
r
e
s
'
,
 
'
F
l
i
p
-
f
l
o
p
s
 
e
 
r
e
g
i
s
t
r
a
d
o
r
e
s
'
,
 
4
,
 
t
r
u
e
)
,


(
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
0
0
5
'
,
 
'
2
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
0
0
0
5
'
,
 
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
1
0
2
'
,
 
'
t
o
p
i
c
'
,
 
'
m
e
m
o
r
i
a
-
e
-
c
a
c
h
e
'
,
 
'
M
e
m
ó
r
i
a
 
c
a
c
h
e
'
,
 
5
,
 
t
r
u
e
)
,


(
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
0
0
6
'
,
 
'
2
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
0
0
0
5
'
,
 
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
1
0
2
'
,
 
'
t
o
p
i
c
'
,
 
'
m
e
m
o
r
i
a
-
p
r
i
n
c
i
p
a
l
-
e
-
e
n
d
e
r
e
c
a
m
e
n
t
o
'
,
 
'
M
e
m
ó
r
i
a
 
p
r
i
n
c
i
p
a
l
 
e
 
e
n
d
e
r
e
ç
a
m
e
n
t
o
'
,
 
6
,
 
t
r
u
e
)
,


(
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
0
0
7
'
,
 
'
2
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
0
0
0
5
'
,
 
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
1
0
2
'
,
 
'
t
o
p
i
c
'
,
 
'
p
r
o
c
e
s
s
a
d
o
r
-
e
-
i
n
s
t
r
u
c
o
e
s
'
,
 
'
P
r
o
c
e
s
s
a
d
o
r
 
e
 
i
n
s
t
r
u
ç
õ
e
s
'
,
 
7
,
 
t
r
u
e
)
,


(
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
0
0
8
'
,
 
'
2
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
0
0
0
5
'
,
 
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
1
0
2
'
,
 
'
t
o
p
i
c
'
,
 
'
m
o
d
o
s
-
d
e
-
e
n
d
e
r
e
c
a
m
e
n
t
o
'
,
 
'
M
o
d
o
s
 
d
e
 
e
n
d
e
r
e
ç
a
m
e
n
t
o
'
,
 
8
,
 
t
r
u
e
)
,


(
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
0
0
9
'
,
 
'
2
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
0
0
0
5
'
,
 
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
1
0
3
'
,
 
'
t
o
p
i
c
'
,
 
'
d
e
s
e
m
p
e
n
h
o
-
e
-
p
i
p
e
l
i
n
e
'
,
 
'
D
e
s
e
m
p
e
n
h
o
 
e
 
p
i
p
e
l
i
n
e
'
,
 
9
,
 
t
r
u
e
)
,


(
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
0
1
0
'
,
 
'
2
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
0
0
0
5
'
,
 
'
3
0
0
0
0
0
0
0
-
0
0
0
0
-
4
0
0
0
-
8
0
0
0
-
0
0
0
0
0
0
0
0
1
1
0
3
'
,
 
'
t
o
p
i
c
'
,
 
'
b
a
r
r
a
m
e
n
t
o
s
-
e
-
e
n
t
r
a
d
a
-
s
a
i
d
a
'
,
 
'
B
a
r
r
a
m
e
n
t
o
s
 
e
 
e
n
t
r
a
d
a
/
s
a
í
d
a
'
,
 
1
0
,
 
t
r
u
e
)


o
n
 
c
o
n
f
l
i
c
t
 
(
i
d
)
 
d
o
 
u
p
d
a
t
e
 
s
e
t
 
s
u
b
j
e
c
t
_
i
d
=
e
x
c
l
u
d
e
d
.
s
u
b
j
e
c
t
_
i
d
,
 
p
a
r
e
n
t
_
i
d
=
e
x
c
l
u
d
e
d
.
p
a
r
e
n
t
_
i
d
,
 
s
l
u
g
=
e
x
c
l
u
d
e
d
.
s
l
u
g
,
 
n
a
m
e
=
e
x
c
l
u
d
e
d
.
n
a
m
e
,
 
s
o
r
t
_
o
r
d
e
r
=
e
x
c
l
u
d
e
d
.
s
o
r
t
_
o
r
d
e
r
,
 
i
s
_
p
u
b
l
i
s
h
e
d
=
e
x
c
l
u
d
e
d
.
i
s
_
p
u
b
l
i
s
h
e
d
;

insert into public.question_sources (id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at)
values ('10000000-0000-4000-8000-000000001001', 'original', 'Arc original Arquitetura de Computadores — lote 01', 'Questões autorais da Arc. O livro de referência foi usado exclusivamente para mapear competências, dificuldade e recorte curricular; nenhum exercício foi transcrito ou parafraseado.', 'Arc', 'approved', 'Equipe editorial Arc', '2026-09-09T00:00:00Z')
on conflict (id) do update set label=excluded.label, licence_note=excluded.licence_note, rights_status=excluded.rights_status, verified_by=excluded.verified_by, verified_at=excluded.verified_at;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920001', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. O valor decimal de $101101_2$. Qual alternativa está correta?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200011', '40000000-0000-4000-8000-000000920001', 'A', '$45$', 1), ('50000000-0000-4000-8000-000009200012', '40000000-0000-4000-8000-000000920001', 'B', '$43$', 2), ('50000000-0000-4000-8000-000009200013', '40000000-0000-4000-8000-000000920001', 'C', '$44$', 3), ('50000000-0000-4000-8000-000009200014', '40000000-0000-4000-8000-000000920001', 'D', '$46$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920001', '50000000-0000-4000-8000-000009200011') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920001', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200011', '40000000-0000-4000-8000-000000920001', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200012', '40000000-0000-4000-8000-000000920001', 'Aplicar a definição diretamente.', 2), ('60000000-0000-4000-8000-000009200013', '40000000-0000-4000-8000-000000920001', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920001', '$45$', 'Cada posição binária representa uma potência de dois. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200011', '40000000-0000-4000-8000-000000920001', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200012', '40000000-0000-4000-8000-000000920001', 'Recupere a definição', 'Cada posição binária representa uma potência de dois.', 2), ('70000000-0000-4000-8000-000009200013', '40000000-0000-4000-8000-000000920001', 'Aplique ao caso', 'A informação relevante permite concluir: $45$', 3), ('70000000-0000-4000-8000-000009200014', '40000000-0000-4000-8000-000000920001', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200015', '40000000-0000-4000-8000-000000920001', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920002', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. O maior valor sem sinal representável em $8$ bits. Um estudante afirmou a opção destacada. Qual avaliação é adequada?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200021', '40000000-0000-4000-8000-000000920002', 'A', '$127$', 1), ('50000000-0000-4000-8000-000009200022', '40000000-0000-4000-8000-000000920002', 'B', '$256$', 2), ('50000000-0000-4000-8000-000009200023', '40000000-0000-4000-8000-000000920002', 'C', '$511$', 3), ('50000000-0000-4000-8000-000009200024', '40000000-0000-4000-8000-000000920002', 'D', '$255$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920002', '50000000-0000-4000-8000-000009200024') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920002', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200021', '40000000-0000-4000-8000-000000920002', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200022', '40000000-0000-4000-8000-000000920002', 'Conferir a afirmação com a definição do conceito.', 2), ('60000000-0000-4000-8000-000009200023', '40000000-0000-4000-8000-000000920002', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920002', '$255$', 'Oito bits sem sinal representam valores de $0$ a $2^8-1$. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200021', '40000000-0000-4000-8000-000000920002', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200022', '40000000-0000-4000-8000-000000920002', 'Recupere a definição', 'Oito bits sem sinal representam valores de $0$ a $2^8-1$.', 2), ('70000000-0000-4000-8000-000009200023', '40000000-0000-4000-8000-000000920002', 'Aplique ao caso', 'A informação relevante permite concluir: $255$', 3), ('70000000-0000-4000-8000-000009200024', '40000000-0000-4000-8000-000000920002', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200025', '40000000-0000-4000-8000-000000920002', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920003', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. A consequência de interpretar $11111111_2$ como inteiro com sinal em complemento de dois. Qual é a estratégia conceitualmente correta para analisar a situação?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200031', '40000000-0000-4000-8000-000000920003', 'A', '$128$', 1), ('50000000-0000-4000-8000-000009200032', '40000000-0000-4000-8000-000000920003', 'B', '$255$', 2), ('50000000-0000-4000-8000-000009200033', '40000000-0000-4000-8000-000000920003', 'C', '$-1$', 3), ('50000000-0000-4000-8000-000009200034', '40000000-0000-4000-8000-000000920003', 'D', '$127$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920003', '50000000-0000-4000-8000-000009200033') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920003', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200031', '40000000-0000-4000-8000-000000920003', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200032', '40000000-0000-4000-8000-000000920003', 'Identificar primeiro a função de cada componente.', 2), ('60000000-0000-4000-8000-000009200033', '40000000-0000-4000-8000-000000920003', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920003', '$-1$', 'No complemento de dois, o bit mais significativo tem peso negativo. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200031', '40000000-0000-4000-8000-000000920003', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200032', '40000000-0000-4000-8000-000000920003', 'Recupere a definição', 'No complemento de dois, o bit mais significativo tem peso negativo.', 2), ('70000000-0000-4000-8000-000009200033', '40000000-0000-4000-8000-000000920003', 'Aplique ao caso', 'A informação relevante permite concluir: $-1$', 3), ('70000000-0000-4000-8000-000009200034', '40000000-0000-4000-8000-000000920003', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200035', '40000000-0000-4000-8000-000000920003', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920004', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. O resultado em complemento de dois de $01111111_2+00000001_2$. Qual conclusão permanece válida após uma verificação cuidadosa?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200041', '40000000-0000-4000-8000-000000920004', 'A', '$11111111_2$', 1), ('50000000-0000-4000-8000-000009200042', '40000000-0000-4000-8000-000000920004', 'B', 'Ocorre overflow.', 2), ('50000000-0000-4000-8000-000009200043', '40000000-0000-4000-8000-000000920004', 'C', '$10000000_2$, sem ressalva.', 3), ('50000000-0000-4000-8000-000009200044', '40000000-0000-4000-8000-000000920004', 'D', '$00000000_2$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920004', '50000000-0000-4000-8000-000009200042') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920004', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200041', '40000000-0000-4000-8000-000000920004', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200042', '40000000-0000-4000-8000-000000920004', 'Separar o que o conceito garante do que ele não garante.', 2), ('60000000-0000-4000-8000-000009200043', '40000000-0000-4000-8000-000000920004', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920004', 'Ocorre overflow.', 'A soma sai do intervalo representável para inteiros de oito bits com sinal. A alternativa B expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200041', '40000000-0000-4000-8000-000000920004', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200042', '40000000-0000-4000-8000-000000920004', 'Recupere a definição', 'A soma sai do intervalo representável para inteiros de oito bits com sinal.', 2), ('70000000-0000-4000-8000-000009200043', '40000000-0000-4000-8000-000000920004', 'Aplique ao caso', 'A informação relevante permite concluir: Ocorre overflow.', 3), ('70000000-0000-4000-8000-000009200044', '40000000-0000-4000-8000-000000920004', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200045', '40000000-0000-4000-8000-000000920004', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa B é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920005', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. A quantidade de combinações diferentes formada por $n$ bits. Em uma revisão de projeto, qual decisão é compatível com esse princípio?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200051', '40000000-0000-4000-8000-000000920005', 'A', '$2^n$', 1), ('50000000-0000-4000-8000-000009200052', '40000000-0000-4000-8000-000000920005', 'B', '$n^2$', 2), ('50000000-0000-4000-8000-000009200053', '40000000-0000-4000-8000-000000920005', 'C', '$2n$', 3), ('50000000-0000-4000-8000-000009200054', '40000000-0000-4000-8000-000000920005', 'D', '$n!$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920005', '50000000-0000-4000-8000-000009200051') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920005', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200051', '40000000-0000-4000-8000-000000920005', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200052', '40000000-0000-4000-8000-000000920005', 'Relacionar o princípio ao comportamento observado.', 2), ('60000000-0000-4000-8000-000009200053', '40000000-0000-4000-8000-000000920005', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920005', '$2^n$', 'Cada bit possui duas escolhas independentes. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200051', '40000000-0000-4000-8000-000000920005', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200052', '40000000-0000-4000-8000-000000920005', 'Recupere a definição', 'Cada bit possui duas escolhas independentes.', 2), ('70000000-0000-4000-8000-000009200053', '40000000-0000-4000-8000-000000920005', 'Aplique ao caso', 'A informação relevante permite concluir: $2^n$', 3), ('70000000-0000-4000-8000-000009200054', '40000000-0000-4000-8000-000000920005', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200055', '40000000-0000-4000-8000-000000920005', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920006', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. Um colega usa essa ideia para justificar uma decisão. O valor decimal de $101101_2$. Um estudante afirmou a opção destacada. Qual avaliação é adequada?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200061', '40000000-0000-4000-8000-000000920006', 'A', '$43$', 1), ('50000000-0000-4000-8000-000009200062', '40000000-0000-4000-8000-000000920006', 'B', '$44$', 2), ('50000000-0000-4000-8000-000009200063', '40000000-0000-4000-8000-000000920006', 'C', '$46$', 3), ('50000000-0000-4000-8000-000009200064', '40000000-0000-4000-8000-000000920006', 'D', '$45$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920006', '50000000-0000-4000-8000-000009200064') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920006', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200061', '40000000-0000-4000-8000-000000920006', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200062', '40000000-0000-4000-8000-000000920006', 'Conferir a afirmação com a definição do conceito.', 2), ('60000000-0000-4000-8000-000009200063', '40000000-0000-4000-8000-000000920006', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920006', '$45$', 'Cada posição binária representa uma potência de dois. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200061', '40000000-0000-4000-8000-000000920006', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200062', '40000000-0000-4000-8000-000000920006', 'Recupere a definição', 'Cada posição binária representa uma potência de dois.', 2), ('70000000-0000-4000-8000-000009200063', '40000000-0000-4000-8000-000000920006', 'Aplique ao caso', 'A informação relevante permite concluir: $45$', 3), ('70000000-0000-4000-8000-000009200064', '40000000-0000-4000-8000-000000920006', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200065', '40000000-0000-4000-8000-000000920006', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920007', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. Um colega usa essa ideia para justificar uma decisão. O maior valor sem sinal representável em $8$ bits. Qual é a estratégia conceitualmente correta para analisar a situação?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200071', '40000000-0000-4000-8000-000000920007', 'A', '$256$', 1), ('50000000-0000-4000-8000-000009200072', '40000000-0000-4000-8000-000000920007', 'B', '$511$', 2), ('50000000-0000-4000-8000-000009200073', '40000000-0000-4000-8000-000000920007', 'C', '$255$', 3), ('50000000-0000-4000-8000-000009200074', '40000000-0000-4000-8000-000000920007', 'D', '$127$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920007', '50000000-0000-4000-8000-000009200073') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920007', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200071', '40000000-0000-4000-8000-000000920007', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200072', '40000000-0000-4000-8000-000000920007', 'Identificar primeiro a função de cada componente.', 2), ('60000000-0000-4000-8000-000009200073', '40000000-0000-4000-8000-000000920007', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920007', '$255$', 'Oito bits sem sinal representam valores de $0$ a $2^8-1$. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200071', '40000000-0000-4000-8000-000000920007', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200072', '40000000-0000-4000-8000-000000920007', 'Recupere a definição', 'Oito bits sem sinal representam valores de $0$ a $2^8-1$.', 2), ('70000000-0000-4000-8000-000009200073', '40000000-0000-4000-8000-000000920007', 'Aplique ao caso', 'A informação relevante permite concluir: $255$', 3), ('70000000-0000-4000-8000-000009200074', '40000000-0000-4000-8000-000000920007', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200075', '40000000-0000-4000-8000-000000920007', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920008', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. Um colega usa essa ideia para justificar uma decisão. A consequência de interpretar $11111111_2$ como inteiro com sinal em complemento de dois. Qual conclusão permanece válida após uma verificação cuidadosa?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200081', '40000000-0000-4000-8000-000000920008', 'A', '$255$', 1), ('50000000-0000-4000-8000-000009200082', '40000000-0000-4000-8000-000000920008', 'B', '$-1$', 2), ('50000000-0000-4000-8000-000009200083', '40000000-0000-4000-8000-000000920008', 'C', '$127$', 3), ('50000000-0000-4000-8000-000009200084', '40000000-0000-4000-8000-000000920008', 'D', '$128$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920008', '50000000-0000-4000-8000-000009200082') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920008', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200081', '40000000-0000-4000-8000-000000920008', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200082', '40000000-0000-4000-8000-000000920008', 'Separar o que o conceito garante do que ele não garante.', 2), ('60000000-0000-4000-8000-000009200083', '40000000-0000-4000-8000-000000920008', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920008', '$-1$', 'No complemento de dois, o bit mais significativo tem peso negativo. A alternativa B expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200081', '40000000-0000-4000-8000-000000920008', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200082', '40000000-0000-4000-8000-000000920008', 'Recupere a definição', 'No complemento de dois, o bit mais significativo tem peso negativo.', 2), ('70000000-0000-4000-8000-000009200083', '40000000-0000-4000-8000-000000920008', 'Aplique ao caso', 'A informação relevante permite concluir: $-1$', 3), ('70000000-0000-4000-8000-000009200084', '40000000-0000-4000-8000-000000920008', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200085', '40000000-0000-4000-8000-000000920008', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa B é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920009', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. Um colega usa essa ideia para justificar uma decisão. O resultado em complemento de dois de $01111111_2+00000001_2$. Em uma revisão de projeto, qual decisão é compatível com esse princípio?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200091', '40000000-0000-4000-8000-000000920009', 'A', 'Ocorre overflow.', 1), ('50000000-0000-4000-8000-000009200092', '40000000-0000-4000-8000-000000920009', 'B', '$10000000_2$, sem ressalva.', 2), ('50000000-0000-4000-8000-000009200093', '40000000-0000-4000-8000-000000920009', 'C', '$00000000_2$', 3), ('50000000-0000-4000-8000-000009200094', '40000000-0000-4000-8000-000000920009', 'D', '$11111111_2$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920009', '50000000-0000-4000-8000-000009200091') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920009', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200091', '40000000-0000-4000-8000-000000920009', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200092', '40000000-0000-4000-8000-000000920009', 'Relacionar o princípio ao comportamento observado.', 2), ('60000000-0000-4000-8000-000009200093', '40000000-0000-4000-8000-000000920009', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920009', 'Ocorre overflow.', 'A soma sai do intervalo representável para inteiros de oito bits com sinal. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200091', '40000000-0000-4000-8000-000000920009', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200092', '40000000-0000-4000-8000-000000920009', 'Recupere a definição', 'A soma sai do intervalo representável para inteiros de oito bits com sinal.', 2), ('70000000-0000-4000-8000-000009200093', '40000000-0000-4000-8000-000000920009', 'Aplique ao caso', 'A informação relevante permite concluir: Ocorre overflow.', 3), ('70000000-0000-4000-8000-000009200094', '40000000-0000-4000-8000-000000920009', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200095', '40000000-0000-4000-8000-000000920009', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920010', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. Um colega usa essa ideia para justificar uma decisão. A quantidade de combinações diferentes formada por $n$ bits. Qual alternativa está correta?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200101', '40000000-0000-4000-8000-000000920010', 'A', '$n^2$', 1), ('50000000-0000-4000-8000-000009200102', '40000000-0000-4000-8000-000000920010', 'B', '$2n$', 2), ('50000000-0000-4000-8000-000009200103', '40000000-0000-4000-8000-000000920010', 'C', '$n!$', 3), ('50000000-0000-4000-8000-000009200104', '40000000-0000-4000-8000-000000920010', 'D', '$2^n$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920010', '50000000-0000-4000-8000-000009200104') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920010', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200101', '40000000-0000-4000-8000-000000920010', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200102', '40000000-0000-4000-8000-000000920010', 'Aplicar a definição diretamente.', 2), ('60000000-0000-4000-8000-000009200103', '40000000-0000-4000-8000-000000920010', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920010', '$2^n$', 'Cada bit possui duas escolhas independentes. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200101', '40000000-0000-4000-8000-000000920010', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200102', '40000000-0000-4000-8000-000000920010', 'Recupere a definição', 'Cada bit possui duas escolhas independentes.', 2), ('70000000-0000-4000-8000-000009200103', '40000000-0000-4000-8000-000000920010', 'Aplique ao caso', 'A informação relevante permite concluir: $2^n$', 3), ('70000000-0000-4000-8000-000009200104', '40000000-0000-4000-8000-000000920010', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200105', '40000000-0000-4000-8000-000000920010', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920011', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. O valor decimal de $101101_2$. Qual é a estratégia conceitualmente correta para analisar a situação?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200111', '40000000-0000-4000-8000-000000920011', 'A', '$44$', 1), ('50000000-0000-4000-8000-000009200112', '40000000-0000-4000-8000-000000920011', 'B', '$46$', 2), ('50000000-0000-4000-8000-000009200113', '40000000-0000-4000-8000-000000920011', 'C', '$45$', 3), ('50000000-0000-4000-8000-000009200114', '40000000-0000-4000-8000-000000920011', 'D', '$43$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920011', '50000000-0000-4000-8000-000009200113') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920011', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200111', '40000000-0000-4000-8000-000000920011', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200112', '40000000-0000-4000-8000-000000920011', 'Identificar primeiro a função de cada componente.', 2), ('60000000-0000-4000-8000-000009200113', '40000000-0000-4000-8000-000000920011', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920011', '$45$', 'Cada posição binária representa uma potência de dois. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200111', '40000000-0000-4000-8000-000000920011', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200112', '40000000-0000-4000-8000-000000920011', 'Recupere a definição', 'Cada posição binária representa uma potência de dois.', 2), ('70000000-0000-4000-8000-000009200113', '40000000-0000-4000-8000-000000920011', 'Aplique ao caso', 'A informação relevante permite concluir: $45$', 3), ('70000000-0000-4000-8000-000009200114', '40000000-0000-4000-8000-000000920011', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200115', '40000000-0000-4000-8000-000000920011', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920012', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. O maior valor sem sinal representável em $8$ bits. Qual conclusão permanece válida após uma verificação cuidadosa?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200121', '40000000-0000-4000-8000-000000920012', 'A', '$511$', 1), ('50000000-0000-4000-8000-000009200122', '40000000-0000-4000-8000-000000920012', 'B', '$255$', 2), ('50000000-0000-4000-8000-000009200123', '40000000-0000-4000-8000-000000920012', 'C', '$127$', 3), ('50000000-0000-4000-8000-000009200124', '40000000-0000-4000-8000-000000920012', 'D', '$256$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920012', '50000000-0000-4000-8000-000009200122') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920012', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200121', '40000000-0000-4000-8000-000000920012', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200122', '40000000-0000-4000-8000-000000920012', 'Separar o que o conceito garante do que ele não garante.', 2), ('60000000-0000-4000-8000-000009200123', '40000000-0000-4000-8000-000000920012', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920012', '$255$', 'Oito bits sem sinal representam valores de $0$ a $2^8-1$. A alternativa B expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200121', '40000000-0000-4000-8000-000000920012', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200122', '40000000-0000-4000-8000-000000920012', 'Recupere a definição', 'Oito bits sem sinal representam valores de $0$ a $2^8-1$.', 2), ('70000000-0000-4000-8000-000009200123', '40000000-0000-4000-8000-000000920012', 'Aplique ao caso', 'A informação relevante permite concluir: $255$', 3), ('70000000-0000-4000-8000-000009200124', '40000000-0000-4000-8000-000000920012', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200125', '40000000-0000-4000-8000-000000920012', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa B é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920013', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. A consequência de interpretar $11111111_2$ como inteiro com sinal em complemento de dois. Em uma revisão de projeto, qual decisão é compatível com esse princípio?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200131', '40000000-0000-4000-8000-000000920013', 'A', '$-1$', 1), ('50000000-0000-4000-8000-000009200132', '40000000-0000-4000-8000-000000920013', 'B', '$127$', 2), ('50000000-0000-4000-8000-000009200133', '40000000-0000-4000-8000-000000920013', 'C', '$128$', 3), ('50000000-0000-4000-8000-000009200134', '40000000-0000-4000-8000-000000920013', 'D', '$255$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920013', '50000000-0000-4000-8000-000009200131') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920013', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200131', '40000000-0000-4000-8000-000000920013', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200132', '40000000-0000-4000-8000-000000920013', 'Relacionar o princípio ao comportamento observado.', 2), ('60000000-0000-4000-8000-000009200133', '40000000-0000-4000-8000-000000920013', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920013', '$-1$', 'No complemento de dois, o bit mais significativo tem peso negativo. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200131', '40000000-0000-4000-8000-000000920013', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200132', '40000000-0000-4000-8000-000000920013', 'Recupere a definição', 'No complemento de dois, o bit mais significativo tem peso negativo.', 2), ('70000000-0000-4000-8000-000009200133', '40000000-0000-4000-8000-000000920013', 'Aplique ao caso', 'A informação relevante permite concluir: $-1$', 3), ('70000000-0000-4000-8000-000009200134', '40000000-0000-4000-8000-000000920013', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200135', '40000000-0000-4000-8000-000000920013', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920014', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. O resultado em complemento de dois de $01111111_2+00000001_2$. Qual alternativa está correta?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200141', '40000000-0000-4000-8000-000000920014', 'A', '$10000000_2$, sem ressalva.', 1), ('50000000-0000-4000-8000-000009200142', '40000000-0000-4000-8000-000000920014', 'B', '$00000000_2$', 2), ('50000000-0000-4000-8000-000009200143', '40000000-0000-4000-8000-000000920014', 'C', '$11111111_2$', 3), ('50000000-0000-4000-8000-000009200144', '40000000-0000-4000-8000-000000920014', 'D', 'Ocorre overflow.', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920014', '50000000-0000-4000-8000-000009200144') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920014', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200141', '40000000-0000-4000-8000-000000920014', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200142', '40000000-0000-4000-8000-000000920014', 'Aplicar a definição diretamente.', 2), ('60000000-0000-4000-8000-000009200143', '40000000-0000-4000-8000-000000920014', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920014', 'Ocorre overflow.', 'A soma sai do intervalo representável para inteiros de oito bits com sinal. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200141', '40000000-0000-4000-8000-000000920014', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200142', '40000000-0000-4000-8000-000000920014', 'Recupere a definição', 'A soma sai do intervalo representável para inteiros de oito bits com sinal.', 2), ('70000000-0000-4000-8000-000009200143', '40000000-0000-4000-8000-000000920014', 'Aplique ao caso', 'A informação relevante permite concluir: Ocorre overflow.', 3), ('70000000-0000-4000-8000-000009200144', '40000000-0000-4000-8000-000000920014', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200145', '40000000-0000-4000-8000-000000920014', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920015', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. A quantidade de combinações diferentes formada por $n$ bits. Um estudante afirmou a opção destacada. Qual avaliação é adequada?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200151', '40000000-0000-4000-8000-000000920015', 'A', '$2n$', 1), ('50000000-0000-4000-8000-000009200152', '40000000-0000-4000-8000-000000920015', 'B', '$n!$', 2), ('50000000-0000-4000-8000-000009200153', '40000000-0000-4000-8000-000000920015', 'C', '$2^n$', 3), ('50000000-0000-4000-8000-000009200154', '40000000-0000-4000-8000-000000920015', 'D', '$n^2$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920015', '50000000-0000-4000-8000-000009200153') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920015', '30000000-0000-4000-8000-000000001001', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200151', '40000000-0000-4000-8000-000000920015', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200152', '40000000-0000-4000-8000-000000920015', 'Conferir a afirmação com a definição do conceito.', 2), ('60000000-0000-4000-8000-000009200153', '40000000-0000-4000-8000-000000920015', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920015', '$2^n$', 'Cada bit possui duas escolhas independentes. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200151', '40000000-0000-4000-8000-000000920015', 'Identifique o foco', 'O enunciado trata de representacao e aritmetica e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200152', '40000000-0000-4000-8000-000000920015', 'Recupere a definição', 'Cada bit possui duas escolhas independentes.', 2), ('70000000-0000-4000-8000-000009200153', '40000000-0000-4000-8000-000000920015', 'Aplique ao caso', 'A informação relevante permite concluir: $2^n$', 3), ('70000000-0000-4000-8000-000009200154', '40000000-0000-4000-8000-000000920015', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200155', '40000000-0000-4000-8000-000000920015', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920016', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. A saída de uma porta AND com entradas $1$ e $0$. Qual alternativa está correta?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200161', '40000000-0000-4000-8000-000000920016', 'A', '$0$', 1), ('50000000-0000-4000-8000-000009200162', '40000000-0000-4000-8000-000000920016', 'B', '$1$', 2), ('50000000-0000-4000-8000-000009200163', '40000000-0000-4000-8000-000000920016', 'C', 'indefinida', 3), ('50000000-0000-4000-8000-000009200164', '40000000-0000-4000-8000-000000920016', 'D', 'depende do clock', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920016', '50000000-0000-4000-8000-000009200161') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920016', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200161', '40000000-0000-4000-8000-000000920016', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200162', '40000000-0000-4000-8000-000000920016', 'Aplicar a definição diretamente.', 2), ('60000000-0000-4000-8000-000009200163', '40000000-0000-4000-8000-000000920016', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920016', '$0$', 'AND só produz um quando todas as entradas são um. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200161', '40000000-0000-4000-8000-000000920016', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200162', '40000000-0000-4000-8000-000000920016', 'Recupere a definição', 'AND só produz um quando todas as entradas são um.', 2), ('70000000-0000-4000-8000-000009200163', '40000000-0000-4000-8000-000000920016', 'Aplique ao caso', 'A informação relevante permite concluir: $0$', 3), ('70000000-0000-4000-8000-000009200164', '40000000-0000-4000-8000-000000920016', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200165', '40000000-0000-4000-8000-000000920016', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920017', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. Uma expressão equivalente a $overline{Acdot B}$. Um estudante afirmou a opção destacada. Qual avaliação é adequada?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200171', '40000000-0000-4000-8000-000000920017', 'A', '$overline Acdotoverline B$', 1), ('50000000-0000-4000-8000-000009200172', '40000000-0000-4000-8000-000000920017', 'B', '$A+ B$', 2), ('50000000-0000-4000-8000-000009200173', '40000000-0000-4000-8000-000000920017', 'C', '$Acdot B$', 3), ('50000000-0000-4000-8000-000009200174', '40000000-0000-4000-8000-000000920017', 'D', '$overline A+overline B$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920017', '50000000-0000-4000-8000-000009200174') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920017', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200171', '40000000-0000-4000-8000-000000920017', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200172', '40000000-0000-4000-8000-000000920017', 'Conferir a afirmação com a definição do conceito.', 2), ('60000000-0000-4000-8000-000009200173', '40000000-0000-4000-8000-000000920017', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920017', '$overline A+overline B$', 'É a lei de De Morgan para a negação de uma conjunção. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200171', '40000000-0000-4000-8000-000000920017', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200172', '40000000-0000-4000-8000-000000920017', 'Recupere a definição', 'É a lei de De Morgan para a negação de uma conjunção.', 2), ('70000000-0000-4000-8000-000009200173', '40000000-0000-4000-8000-000000920017', 'Aplique ao caso', 'A informação relevante permite concluir: $overline A+overline B$', 3), ('70000000-0000-4000-8000-000009200174', '40000000-0000-4000-8000-000000920017', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200175', '40000000-0000-4000-8000-000000920017', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920018', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. O valor de $Aoplus B$ quando as entradas são diferentes. Qual é a estratégia conceitualmente correta para analisar a situação?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200181', '40000000-0000-4000-8000-000000920018', 'A', '$Acdot B$', 1), ('50000000-0000-4000-8000-000009200182', '40000000-0000-4000-8000-000000920018', 'B', 'não pode ser determinado', 2), ('50000000-0000-4000-8000-000009200183', '40000000-0000-4000-8000-000000920018', 'C', '$1$', 3), ('50000000-0000-4000-8000-000009200184', '40000000-0000-4000-8000-000000920018', 'D', '$0$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920018', '50000000-0000-4000-8000-000009200183') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920018', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200181', '40000000-0000-4000-8000-000000920018', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200182', '40000000-0000-4000-8000-000000920018', 'Identificar primeiro a função de cada componente.', 2), ('60000000-0000-4000-8000-000009200183', '40000000-0000-4000-8000-000000920018', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920018', '$1$', 'XOR detecta desigualdade entre dois bits. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200181', '40000000-0000-4000-8000-000000920018', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200182', '40000000-0000-4000-8000-000000920018', 'Recupere a definição', 'XOR detecta desigualdade entre dois bits.', 2), ('70000000-0000-4000-8000-000009200183', '40000000-0000-4000-8000-000000920018', 'Aplique ao caso', 'A informação relevante permite concluir: $1$', 3), ('70000000-0000-4000-8000-000009200184', '40000000-0000-4000-8000-000000920018', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200185', '40000000-0000-4000-8000-000000920018', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920019', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. A propriedade de $A+overline A$. Qual conclusão permanece válida após uma verificação cuidadosa?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200191', '40000000-0000-4000-8000-000000920019', 'A', '$overline A$', 1), ('50000000-0000-4000-8000-000009200192', '40000000-0000-4000-8000-000000920019', 'B', '$1$', 2), ('50000000-0000-4000-8000-000009200193', '40000000-0000-4000-8000-000000920019', 'C', '$0$', 3), ('50000000-0000-4000-8000-000009200194', '40000000-0000-4000-8000-000000920019', 'D', '$A$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920019', '50000000-0000-4000-8000-000009200192') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920019', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200191', '40000000-0000-4000-8000-000000920019', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200192', '40000000-0000-4000-8000-000000920019', 'Separar o que o conceito garante do que ele não garante.', 2), ('60000000-0000-4000-8000-000009200193', '40000000-0000-4000-8000-000000920019', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920019', '$1$', 'Uma variável ou seu complemento cobre todos os casos possíveis. A alternativa B expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200191', '40000000-0000-4000-8000-000000920019', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200192', '40000000-0000-4000-8000-000000920019', 'Recupere a definição', 'Uma variável ou seu complemento cobre todos os casos possíveis.', 2), ('70000000-0000-4000-8000-000009200193', '40000000-0000-4000-8000-000000920019', 'Aplique ao caso', 'A informação relevante permite concluir: $1$', 3), ('70000000-0000-4000-8000-000009200194', '40000000-0000-4000-8000-000000920019', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200195', '40000000-0000-4000-8000-000000920019', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa B é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920020', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. O circuito universal que sozinho pode implementar qualquer função booleana. Em uma revisão de projeto, qual decisão é compatível com esse princípio?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200201', '40000000-0000-4000-8000-000000920020', 'A', 'NAND', 1), ('50000000-0000-4000-8000-000009200202', '40000000-0000-4000-8000-000000920020', 'B', 'AND', 2), ('50000000-0000-4000-8000-000009200203', '40000000-0000-4000-8000-000000920020', 'C', 'XOR', 3), ('50000000-0000-4000-8000-000009200204', '40000000-0000-4000-8000-000000920020', 'D', 'buffer', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920020', '50000000-0000-4000-8000-000009200201') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920020', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200201', '40000000-0000-4000-8000-000000920020', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200202', '40000000-0000-4000-8000-000000920020', 'Relacionar o princípio ao comportamento observado.', 2), ('60000000-0000-4000-8000-000009200203', '40000000-0000-4000-8000-000000920020', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920020', 'NAND', 'A composição adequada de portas NAND permite construir NOT, AND e OR. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200201', '40000000-0000-4000-8000-000000920020', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200202', '40000000-0000-4000-8000-000000920020', 'Recupere a definição', 'A composição adequada de portas NAND permite construir NOT, AND e OR.', 2), ('70000000-0000-4000-8000-000009200203', '40000000-0000-4000-8000-000000920020', 'Aplique ao caso', 'A informação relevante permite concluir: NAND', 3), ('70000000-0000-4000-8000-000009200204', '40000000-0000-4000-8000-000000920020', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200205', '40000000-0000-4000-8000-000000920020', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920021', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. Um colega usa essa ideia para justificar uma decisão. A saída de uma porta AND com entradas $1$ e $0$. Um estudante afirmou a opção destacada. Qual avaliação é adequada?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200211', '40000000-0000-4000-8000-000000920021', 'A', '$1$', 1), ('50000000-0000-4000-8000-000009200212', '40000000-0000-4000-8000-000000920021', 'B', 'indefinida', 2), ('50000000-0000-4000-8000-000009200213', '40000000-0000-4000-8000-000000920021', 'C', 'depende do clock', 3), ('50000000-0000-4000-8000-000009200214', '40000000-0000-4000-8000-000000920021', 'D', '$0$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920021', '50000000-0000-4000-8000-000009200214') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920021', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200211', '40000000-0000-4000-8000-000000920021', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200212', '40000000-0000-4000-8000-000000920021', 'Conferir a afirmação com a definição do conceito.', 2), ('60000000-0000-4000-8000-000009200213', '40000000-0000-4000-8000-000000920021', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920021', '$0$', 'AND só produz um quando todas as entradas são um. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200211', '40000000-0000-4000-8000-000000920021', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200212', '40000000-0000-4000-8000-000000920021', 'Recupere a definição', 'AND só produz um quando todas as entradas são um.', 2), ('70000000-0000-4000-8000-000009200213', '40000000-0000-4000-8000-000000920021', 'Aplique ao caso', 'A informação relevante permite concluir: $0$', 3), ('70000000-0000-4000-8000-000009200214', '40000000-0000-4000-8000-000000920021', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200215', '40000000-0000-4000-8000-000000920021', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920022', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. Um colega usa essa ideia para justificar uma decisão. Uma expressão equivalente a $overline{Acdot B}$. Qual é a estratégia conceitualmente correta para analisar a situação?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200221', '40000000-0000-4000-8000-000000920022', 'A', '$A+ B$', 1), ('50000000-0000-4000-8000-000009200222', '40000000-0000-4000-8000-000000920022', 'B', '$Acdot B$', 2), ('50000000-0000-4000-8000-000009200223', '40000000-0000-4000-8000-000000920022', 'C', '$overline A+overline B$', 3), ('50000000-0000-4000-8000-000009200224', '40000000-0000-4000-8000-000000920022', 'D', '$overline Acdotoverline B$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920022', '50000000-0000-4000-8000-000009200223') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920022', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200221', '40000000-0000-4000-8000-000000920022', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200222', '40000000-0000-4000-8000-000000920022', 'Identificar primeiro a função de cada componente.', 2), ('60000000-0000-4000-8000-000009200223', '40000000-0000-4000-8000-000000920022', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920022', '$overline A+overline B$', 'É a lei de De Morgan para a negação de uma conjunção. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200221', '40000000-0000-4000-8000-000000920022', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200222', '40000000-0000-4000-8000-000000920022', 'Recupere a definição', 'É a lei de De Morgan para a negação de uma conjunção.', 2), ('70000000-0000-4000-8000-000009200223', '40000000-0000-4000-8000-000000920022', 'Aplique ao caso', 'A informação relevante permite concluir: $overline A+overline B$', 3), ('70000000-0000-4000-8000-000009200224', '40000000-0000-4000-8000-000000920022', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200225', '40000000-0000-4000-8000-000000920022', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920023', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. Um colega usa essa ideia para justificar uma decisão. O valor de $Aoplus B$ quando as entradas são diferentes. Qual conclusão permanece válida após uma verificação cuidadosa?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200231', '40000000-0000-4000-8000-000000920023', 'A', 'não pode ser determinado', 1), ('50000000-0000-4000-8000-000009200232', '40000000-0000-4000-8000-000000920023', 'B', '$1$', 2), ('50000000-0000-4000-8000-000009200233', '40000000-0000-4000-8000-000000920023', 'C', '$0$', 3), ('50000000-0000-4000-8000-000009200234', '40000000-0000-4000-8000-000000920023', 'D', '$Acdot B$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920023', '50000000-0000-4000-8000-000009200232') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920023', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200231', '40000000-0000-4000-8000-000000920023', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200232', '40000000-0000-4000-8000-000000920023', 'Separar o que o conceito garante do que ele não garante.', 2), ('60000000-0000-4000-8000-000009200233', '40000000-0000-4000-8000-000000920023', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920023', '$1$', 'XOR detecta desigualdade entre dois bits. A alternativa B expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200231', '40000000-0000-4000-8000-000000920023', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200232', '40000000-0000-4000-8000-000000920023', 'Recupere a definição', 'XOR detecta desigualdade entre dois bits.', 2), ('70000000-0000-4000-8000-000009200233', '40000000-0000-4000-8000-000000920023', 'Aplique ao caso', 'A informação relevante permite concluir: $1$', 3), ('70000000-0000-4000-8000-000009200234', '40000000-0000-4000-8000-000000920023', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200235', '40000000-0000-4000-8000-000000920023', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa B é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920024', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. Um colega usa essa ideia para justificar uma decisão. A propriedade de $A+overline A$. Em uma revisão de projeto, qual decisão é compatível com esse princípio?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200241', '40000000-0000-4000-8000-000000920024', 'A', '$1$', 1), ('50000000-0000-4000-8000-000009200242', '40000000-0000-4000-8000-000000920024', 'B', '$0$', 2), ('50000000-0000-4000-8000-000009200243', '40000000-0000-4000-8000-000000920024', 'C', '$A$', 3), ('50000000-0000-4000-8000-000009200244', '40000000-0000-4000-8000-000000920024', 'D', '$overline A$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920024', '50000000-0000-4000-8000-000009200241') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920024', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200241', '40000000-0000-4000-8000-000000920024', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200242', '40000000-0000-4000-8000-000000920024', 'Relacionar o princípio ao comportamento observado.', 2), ('60000000-0000-4000-8000-000009200243', '40000000-0000-4000-8000-000000920024', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920024', '$1$', 'Uma variável ou seu complemento cobre todos os casos possíveis. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200241', '40000000-0000-4000-8000-000000920024', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200242', '40000000-0000-4000-8000-000000920024', 'Recupere a definição', 'Uma variável ou seu complemento cobre todos os casos possíveis.', 2), ('70000000-0000-4000-8000-000009200243', '40000000-0000-4000-8000-000000920024', 'Aplique ao caso', 'A informação relevante permite concluir: $1$', 3), ('70000000-0000-4000-8000-000009200244', '40000000-0000-4000-8000-000000920024', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200245', '40000000-0000-4000-8000-000000920024', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920025', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. Um colega usa essa ideia para justificar uma decisão. O circuito universal que sozinho pode implementar qualquer função booleana. Qual alternativa está correta?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200251', '40000000-0000-4000-8000-000000920025', 'A', 'AND', 1), ('50000000-0000-4000-8000-000009200252', '40000000-0000-4000-8000-000000920025', 'B', 'XOR', 2), ('50000000-0000-4000-8000-000009200253', '40000000-0000-4000-8000-000000920025', 'C', 'buffer', 3), ('50000000-0000-4000-8000-000009200254', '40000000-0000-4000-8000-000000920025', 'D', 'NAND', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920025', '50000000-0000-4000-8000-000009200254') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920025', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200251', '40000000-0000-4000-8000-000000920025', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200252', '40000000-0000-4000-8000-000000920025', 'Aplicar a definição diretamente.', 2), ('60000000-0000-4000-8000-000009200253', '40000000-0000-4000-8000-000000920025', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920025', 'NAND', 'A composição adequada de portas NAND permite construir NOT, AND e OR. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200251', '40000000-0000-4000-8000-000000920025', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200252', '40000000-0000-4000-8000-000000920025', 'Recupere a definição', 'A composição adequada de portas NAND permite construir NOT, AND e OR.', 2), ('70000000-0000-4000-8000-000009200253', '40000000-0000-4000-8000-000000920025', 'Aplique ao caso', 'A informação relevante permite concluir: NAND', 3), ('70000000-0000-4000-8000-000009200254', '40000000-0000-4000-8000-000000920025', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200255', '40000000-0000-4000-8000-000000920025', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920026', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. A saída de uma porta AND com entradas $1$ e $0$. Qual é a estratégia conceitualmente correta para analisar a situação?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200261', '40000000-0000-4000-8000-000000920026', 'A', 'indefinida', 1), ('50000000-0000-4000-8000-000009200262', '40000000-0000-4000-8000-000000920026', 'B', 'depende do clock', 2), ('50000000-0000-4000-8000-000009200263', '40000000-0000-4000-8000-000000920026', 'C', '$0$', 3), ('50000000-0000-4000-8000-000009200264', '40000000-0000-4000-8000-000000920026', 'D', '$1$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920026', '50000000-0000-4000-8000-000009200263') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920026', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200261', '40000000-0000-4000-8000-000000920026', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200262', '40000000-0000-4000-8000-000000920026', 'Identificar primeiro a função de cada componente.', 2), ('60000000-0000-4000-8000-000009200263', '40000000-0000-4000-8000-000000920026', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920026', '$0$', 'AND só produz um quando todas as entradas são um. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200261', '40000000-0000-4000-8000-000000920026', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200262', '40000000-0000-4000-8000-000000920026', 'Recupere a definição', 'AND só produz um quando todas as entradas são um.', 2), ('70000000-0000-4000-8000-000009200263', '40000000-0000-4000-8000-000000920026', 'Aplique ao caso', 'A informação relevante permite concluir: $0$', 3), ('70000000-0000-4000-8000-000009200264', '40000000-0000-4000-8000-000000920026', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200265', '40000000-0000-4000-8000-000000920026', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920027', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. Uma expressão equivalente a $overline{Acdot B}$. Qual conclusão permanece válida após uma verificação cuidadosa?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200271', '40000000-0000-4000-8000-000000920027', 'A', '$Acdot B$', 1), ('50000000-0000-4000-8000-000009200272', '40000000-0000-4000-8000-000000920027', 'B', '$overline A+overline B$', 2), ('50000000-0000-4000-8000-000009200273', '40000000-0000-4000-8000-000000920027', 'C', '$overline Acdotoverline B$', 3), ('50000000-0000-4000-8000-000009200274', '40000000-0000-4000-8000-000000920027', 'D', '$A+ B$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920027', '50000000-0000-4000-8000-000009200272') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920027', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200271', '40000000-0000-4000-8000-000000920027', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200272', '40000000-0000-4000-8000-000000920027', 'Separar o que o conceito garante do que ele não garante.', 2), ('60000000-0000-4000-8000-000009200273', '40000000-0000-4000-8000-000000920027', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920027', '$overline A+overline B$', 'É a lei de De Morgan para a negação de uma conjunção. A alternativa B expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200271', '40000000-0000-4000-8000-000000920027', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200272', '40000000-0000-4000-8000-000000920027', 'Recupere a definição', 'É a lei de De Morgan para a negação de uma conjunção.', 2), ('70000000-0000-4000-8000-000009200273', '40000000-0000-4000-8000-000000920027', 'Aplique ao caso', 'A informação relevante permite concluir: $overline A+overline B$', 3), ('70000000-0000-4000-8000-000009200274', '40000000-0000-4000-8000-000000920027', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200275', '40000000-0000-4000-8000-000000920027', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa B é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920028', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. O valor de $Aoplus B$ quando as entradas são diferentes. Em uma revisão de projeto, qual decisão é compatível com esse princípio?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200281', '40000000-0000-4000-8000-000000920028', 'A', '$1$', 1), ('50000000-0000-4000-8000-000009200282', '40000000-0000-4000-8000-000000920028', 'B', '$0$', 2), ('50000000-0000-4000-8000-000009200283', '40000000-0000-4000-8000-000000920028', 'C', '$Acdot B$', 3), ('50000000-0000-4000-8000-000009200284', '40000000-0000-4000-8000-000000920028', 'D', 'não pode ser determinado', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920028', '50000000-0000-4000-8000-000009200281') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920028', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200281', '40000000-0000-4000-8000-000000920028', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200282', '40000000-0000-4000-8000-000000920028', 'Relacionar o princípio ao comportamento observado.', 2), ('60000000-0000-4000-8000-000009200283', '40000000-0000-4000-8000-000000920028', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920028', '$1$', 'XOR detecta desigualdade entre dois bits. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200281', '40000000-0000-4000-8000-000000920028', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200282', '40000000-0000-4000-8000-000000920028', 'Recupere a definição', 'XOR detecta desigualdade entre dois bits.', 2), ('70000000-0000-4000-8000-000009200283', '40000000-0000-4000-8000-000000920028', 'Aplique ao caso', 'A informação relevante permite concluir: $1$', 3), ('70000000-0000-4000-8000-000009200284', '40000000-0000-4000-8000-000000920028', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200285', '40000000-0000-4000-8000-000000920028', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920029', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. A propriedade de $A+overline A$. Qual alternativa está correta?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200291', '40000000-0000-4000-8000-000000920029', 'A', '$0$', 1), ('50000000-0000-4000-8000-000009200292', '40000000-0000-4000-8000-000000920029', 'B', '$A$', 2), ('50000000-0000-4000-8000-000009200293', '40000000-0000-4000-8000-000000920029', 'C', '$overline A$', 3), ('50000000-0000-4000-8000-000009200294', '40000000-0000-4000-8000-000000920029', 'D', '$1$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920029', '50000000-0000-4000-8000-000009200294') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920029', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200291', '40000000-0000-4000-8000-000000920029', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200292', '40000000-0000-4000-8000-000000920029', 'Aplicar a definição diretamente.', 2), ('60000000-0000-4000-8000-000009200293', '40000000-0000-4000-8000-000000920029', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920029', '$1$', 'Uma variável ou seu complemento cobre todos os casos possíveis. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200291', '40000000-0000-4000-8000-000000920029', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200292', '40000000-0000-4000-8000-000000920029', 'Recupere a definição', 'Uma variável ou seu complemento cobre todos os casos possíveis.', 2), ('70000000-0000-4000-8000-000009200293', '40000000-0000-4000-8000-000000920029', 'Aplique ao caso', 'A informação relevante permite concluir: $1$', 3), ('70000000-0000-4000-8000-000009200294', '40000000-0000-4000-8000-000000920029', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200295', '40000000-0000-4000-8000-000000920029', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920030', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. O circuito universal que sozinho pode implementar qualquer função booleana. Um estudante afirmou a opção destacada. Qual avaliação é adequada?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200301', '40000000-0000-4000-8000-000000920030', 'A', 'XOR', 1), ('50000000-0000-4000-8000-000009200302', '40000000-0000-4000-8000-000000920030', 'B', 'buffer', 2), ('50000000-0000-4000-8000-000009200303', '40000000-0000-4000-8000-000000920030', 'C', 'NAND', 3), ('50000000-0000-4000-8000-000009200304', '40000000-0000-4000-8000-000000920030', 'D', 'AND', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920030', '50000000-0000-4000-8000-000009200303') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920030', '30000000-0000-4000-8000-000000001002', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200301', '40000000-0000-4000-8000-000000920030', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200302', '40000000-0000-4000-8000-000000920030', 'Conferir a afirmação com a definição do conceito.', 2), ('60000000-0000-4000-8000-000009200303', '40000000-0000-4000-8000-000000920030', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920030', 'NAND', 'A composição adequada de portas NAND permite construir NOT, AND e OR. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200301', '40000000-0000-4000-8000-000000920030', 'Identifique o foco', 'O enunciado trata de logica booleana e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200302', '40000000-0000-4000-8000-000000920030', 'Recupere a definição', 'A composição adequada de portas NAND permite construir NOT, AND e OR.', 2), ('70000000-0000-4000-8000-000009200303', '40000000-0000-4000-8000-000000920030', 'Aplique ao caso', 'A informação relevante permite concluir: NAND', 3), ('70000000-0000-4000-8000-000009200304', '40000000-0000-4000-8000-000000920030', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200305', '40000000-0000-4000-8000-000000920030', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920031', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. A função principal de um multiplexador $4:1$. Qual alternativa está correta?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200311', '40000000-0000-4000-8000-000000920031', 'A', 'Selecionar uma entre quatro entradas de dados.', 1), ('50000000-0000-4000-8000-000009200312', '40000000-0000-4000-8000-000000920031', 'B', 'Copiar um bit em quatro saídas.', 2), ('50000000-0000-4000-8000-000009200313', '40000000-0000-4000-8000-000000920031', 'C', 'Somar quatro operandos.', 3), ('50000000-0000-4000-8000-000009200314', '40000000-0000-4000-8000-000000920031', 'D', 'Armazenar quatro bits.', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920031', '50000000-0000-4000-8000-000009200311') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920031', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200311', '40000000-0000-4000-8000-000000920031', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200312', '40000000-0000-4000-8000-000000920031', 'Aplicar a definição diretamente.', 2), ('60000000-0000-4000-8000-000009200313', '40000000-0000-4000-8000-000000920031', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920031', 'Selecionar uma entre quatro entradas de dados.', 'Linhas de seleção escolhem qual entrada é encaminhada à saída. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200311', '40000000-0000-4000-8000-000000920031', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200312', '40000000-0000-4000-8000-000000920031', 'Recupere a definição', 'Linhas de seleção escolhem qual entrada é encaminhada à saída.', 2), ('70000000-0000-4000-8000-000009200313', '40000000-0000-4000-8000-000000920031', 'Aplique ao caso', 'A informação relevante permite concluir: Selecionar uma entre quatro entradas de dados.', 3), ('70000000-0000-4000-8000-000009200314', '40000000-0000-4000-8000-000000920031', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200315', '40000000-0000-4000-8000-000000920031', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920032', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. O componente que transforma um código binário em uma entre várias linhas ativas. Um estudante afirmou a opção destacada. Qual avaliação é adequada?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200321', '40000000-0000-4000-8000-000000920032', 'A', 'Codificador', 1), ('50000000-0000-4000-8000-000009200322', '40000000-0000-4000-8000-000000920032', 'B', 'Multiplexador', 2), ('50000000-0000-4000-8000-000009200323', '40000000-0000-4000-8000-000000920032', 'C', 'Latch', 3), ('50000000-0000-4000-8000-000009200324', '40000000-0000-4000-8000-000000920032', 'D', 'Decodificador', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920032', '50000000-0000-4000-8000-000009200324') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920032', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200321', '40000000-0000-4000-8000-000000920032', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200322', '40000000-0000-4000-8000-000000920032', 'Conferir a afirmação com a definição do conceito.', 2), ('60000000-0000-4000-8000-000009200323', '40000000-0000-4000-8000-000000920032', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920032', 'Decodificador', 'Um decodificador expande um código de entrada em linhas de saída. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200321', '40000000-0000-4000-8000-000000920032', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200322', '40000000-0000-4000-8000-000000920032', 'Recupere a definição', 'Um decodificador expande um código de entrada em linhas de saída.', 2), ('70000000-0000-4000-8000-000009200323', '40000000-0000-4000-8000-000000920032', 'Aplique ao caso', 'A informação relevante permite concluir: Decodificador', 3), ('70000000-0000-4000-8000-000009200324', '40000000-0000-4000-8000-000000920032', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200325', '40000000-0000-4000-8000-000000920032', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920033', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. A saída de soma de um meio somador com entradas $1$ e $1$. Qual é a estratégia conceitualmente correta para analisar a situação?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200331', '40000000-0000-4000-8000-000000920033', 'A', '$2$', 1), ('50000000-0000-4000-8000-000009200332', '40000000-0000-4000-8000-000000920033', 'B', 'overflow obrigatório', 2), ('50000000-0000-4000-8000-000009200333', '40000000-0000-4000-8000-000000920033', 'C', '$0$', 3), ('50000000-0000-4000-8000-000009200334', '40000000-0000-4000-8000-000000920033', 'D', '$1$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920033', '50000000-0000-4000-8000-000009200333') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920033', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200331', '40000000-0000-4000-8000-000000920033', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200332', '40000000-0000-4000-8000-000000920033', 'Identificar primeiro a função de cada componente.', 2), ('60000000-0000-4000-8000-000009200333', '40000000-0000-4000-8000-000000920033', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920033', '$0$', 'A soma é XOR; o transporte é tratado separadamente. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200331', '40000000-0000-4000-8000-000000920033', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200332', '40000000-0000-4000-8000-000000920033', 'Recupere a definição', 'A soma é XOR; o transporte é tratado separadamente.', 2), ('70000000-0000-4000-8000-000009200333', '40000000-0000-4000-8000-000000920033', 'Aplique ao caso', 'A informação relevante permite concluir: $0$', 3), ('70000000-0000-4000-8000-000009200334', '40000000-0000-4000-8000-000000920033', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200335', '40000000-0000-4000-8000-000000920033', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920034', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. O sinal de carry de um meio somador com entradas $1$ e $1$. Qual conclusão permanece válida após uma verificação cuidadosa?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200341', '40000000-0000-4000-8000-000000920034', 'A', 'indefinido', 1), ('50000000-0000-4000-8000-000009200342', '40000000-0000-4000-8000-000000920034', 'B', '$1$', 2), ('50000000-0000-4000-8000-000009200343', '40000000-0000-4000-8000-000000920034', 'C', '$0$', 3), ('50000000-0000-4000-8000-000009200344', '40000000-0000-4000-8000-000000920034', 'D', '$2$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920034', '50000000-0000-4000-8000-000009200342') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920034', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200341', '40000000-0000-4000-8000-000000920034', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200342', '40000000-0000-4000-8000-000000920034', 'Separar o que o conceito garante do que ele não garante.', 2), ('60000000-0000-4000-8000-000009200343', '40000000-0000-4000-8000-000000920034', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920034', '$1$', 'O carry é a conjunção das duas entradas. A alternativa B expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200341', '40000000-0000-4000-8000-000000920034', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200342', '40000000-0000-4000-8000-000000920034', 'Recupere a definição', 'O carry é a conjunção das duas entradas.', 2), ('70000000-0000-4000-8000-000009200343', '40000000-0000-4000-8000-000000920034', 'Aplique ao caso', 'A informação relevante permite concluir: $1$', 3), ('70000000-0000-4000-8000-000009200344', '40000000-0000-4000-8000-000000920034', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200345', '40000000-0000-4000-8000-000000920034', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa B é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920035', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. O bloco combinacional usado para comparar dois números binários. Em uma revisão de projeto, qual decisão é compatível com esse princípio?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200351', '40000000-0000-4000-8000-000000920035', 'A', 'Comparador de magnitude', 1), ('50000000-0000-4000-8000-000009200352', '40000000-0000-4000-8000-000000920035', 'B', 'Registrador', 2), ('50000000-0000-4000-8000-000009200353', '40000000-0000-4000-8000-000000920035', 'C', 'Contador', 3), ('50000000-0000-4000-8000-000009200354', '40000000-0000-4000-8000-000000920035', 'D', 'Flip-flop D', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920035', '50000000-0000-4000-8000-000009200351') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920035', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200351', '40000000-0000-4000-8000-000000920035', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200352', '40000000-0000-4000-8000-000000920035', 'Relacionar o princípio ao comportamento observado.', 2), ('60000000-0000-4000-8000-000009200353', '40000000-0000-4000-8000-000000920035', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920035', 'Comparador de magnitude', 'Ele indica relações como maior, menor ou igual sem guardar estado. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200351', '40000000-0000-4000-8000-000000920035', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200352', '40000000-0000-4000-8000-000000920035', 'Recupere a definição', 'Ele indica relações como maior, menor ou igual sem guardar estado.', 2), ('70000000-0000-4000-8000-000009200353', '40000000-0000-4000-8000-000000920035', 'Aplique ao caso', 'A informação relevante permite concluir: Comparador de magnitude', 3), ('70000000-0000-4000-8000-000009200354', '40000000-0000-4000-8000-000000920035', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200355', '40000000-0000-4000-8000-000000920035', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920036', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. Um colega usa essa ideia para justificar uma decisão. A função principal de um multiplexador $4:1$. Um estudante afirmou a opção destacada. Qual avaliação é adequada?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200361', '40000000-0000-4000-8000-000000920036', 'A', 'Copiar um bit em quatro saídas.', 1), ('50000000-0000-4000-8000-000009200362', '40000000-0000-4000-8000-000000920036', 'B', 'Somar quatro operandos.', 2), ('50000000-0000-4000-8000-000009200363', '40000000-0000-4000-8000-000000920036', 'C', 'Armazenar quatro bits.', 3), ('50000000-0000-4000-8000-000009200364', '40000000-0000-4000-8000-000000920036', 'D', 'Selecionar uma entre quatro entradas de dados.', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920036', '50000000-0000-4000-8000-000009200364') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920036', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200361', '40000000-0000-4000-8000-000000920036', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200362', '40000000-0000-4000-8000-000000920036', 'Conferir a afirmação com a definição do conceito.', 2), ('60000000-0000-4000-8000-000009200363', '40000000-0000-4000-8000-000000920036', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920036', 'Selecionar uma entre quatro entradas de dados.', 'Linhas de seleção escolhem qual entrada é encaminhada à saída. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200361', '40000000-0000-4000-8000-000000920036', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200362', '40000000-0000-4000-8000-000000920036', 'Recupere a definição', 'Linhas de seleção escolhem qual entrada é encaminhada à saída.', 2), ('70000000-0000-4000-8000-000009200363', '40000000-0000-4000-8000-000000920036', 'Aplique ao caso', 'A informação relevante permite concluir: Selecionar uma entre quatro entradas de dados.', 3), ('70000000-0000-4000-8000-000009200364', '40000000-0000-4000-8000-000000920036', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200365', '40000000-0000-4000-8000-000000920036', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920037', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. Um colega usa essa ideia para justificar uma decisão. O componente que transforma um código binário em uma entre várias linhas ativas. Qual é a estratégia conceitualmente correta para analisar a situação?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200371', '40000000-0000-4000-8000-000000920037', 'A', 'Multiplexador', 1), ('50000000-0000-4000-8000-000009200372', '40000000-0000-4000-8000-000000920037', 'B', 'Latch', 2), ('50000000-0000-4000-8000-000009200373', '40000000-0000-4000-8000-000000920037', 'C', 'Decodificador', 3), ('50000000-0000-4000-8000-000009200374', '40000000-0000-4000-8000-000000920037', 'D', 'Codificador', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920037', '50000000-0000-4000-8000-000009200373') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920037', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200371', '40000000-0000-4000-8000-000000920037', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200372', '40000000-0000-4000-8000-000000920037', 'Identificar primeiro a função de cada componente.', 2), ('60000000-0000-4000-8000-000009200373', '40000000-0000-4000-8000-000000920037', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920037', 'Decodificador', 'Um decodificador expande um código de entrada em linhas de saída. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200371', '40000000-0000-4000-8000-000000920037', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200372', '40000000-0000-4000-8000-000000920037', 'Recupere a definição', 'Um decodificador expande um código de entrada em linhas de saída.', 2), ('70000000-0000-4000-8000-000009200373', '40000000-0000-4000-8000-000000920037', 'Aplique ao caso', 'A informação relevante permite concluir: Decodificador', 3), ('70000000-0000-4000-8000-000009200374', '40000000-0000-4000-8000-000000920037', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200375', '40000000-0000-4000-8000-000000920037', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920038', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. Um colega usa essa ideia para justificar uma decisão. A saída de soma de um meio somador com entradas $1$ e $1$. Qual conclusão permanece válida após uma verificação cuidadosa?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200381', '40000000-0000-4000-8000-000000920038', 'A', 'overflow obrigatório', 1), ('50000000-0000-4000-8000-000009200382', '40000000-0000-4000-8000-000000920038', 'B', '$0$', 2), ('50000000-0000-4000-8000-000009200383', '40000000-0000-4000-8000-000000920038', 'C', '$1$', 3), ('50000000-0000-4000-8000-000009200384', '40000000-0000-4000-8000-000000920038', 'D', '$2$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920038', '50000000-0000-4000-8000-000009200382') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920038', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200381', '40000000-0000-4000-8000-000000920038', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200382', '40000000-0000-4000-8000-000000920038', 'Separar o que o conceito garante do que ele não garante.', 2), ('60000000-0000-4000-8000-000009200383', '40000000-0000-4000-8000-000000920038', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920038', '$0$', 'A soma é XOR; o transporte é tratado separadamente. A alternativa B expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200381', '40000000-0000-4000-8000-000000920038', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200382', '40000000-0000-4000-8000-000000920038', 'Recupere a definição', 'A soma é XOR; o transporte é tratado separadamente.', 2), ('70000000-0000-4000-8000-000009200383', '40000000-0000-4000-8000-000000920038', 'Aplique ao caso', 'A informação relevante permite concluir: $0$', 3), ('70000000-0000-4000-8000-000009200384', '40000000-0000-4000-8000-000000920038', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200385', '40000000-0000-4000-8000-000000920038', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa B é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920039', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. Um colega usa essa ideia para justificar uma decisão. O sinal de carry de um meio somador com entradas $1$ e $1$. Em uma revisão de projeto, qual decisão é compatível com esse princípio?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200391', '40000000-0000-4000-8000-000000920039', 'A', '$1$', 1), ('50000000-0000-4000-8000-000009200392', '40000000-0000-4000-8000-000000920039', 'B', '$0$', 2), ('50000000-0000-4000-8000-000009200393', '40000000-0000-4000-8000-000000920039', 'C', '$2$', 3), ('50000000-0000-4000-8000-000009200394', '40000000-0000-4000-8000-000000920039', 'D', 'indefinido', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920039', '50000000-0000-4000-8000-000009200391') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920039', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200391', '40000000-0000-4000-8000-000000920039', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200392', '40000000-0000-4000-8000-000000920039', 'Relacionar o princípio ao comportamento observado.', 2), ('60000000-0000-4000-8000-000009200393', '40000000-0000-4000-8000-000000920039', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920039', '$1$', 'O carry é a conjunção das duas entradas. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200391', '40000000-0000-4000-8000-000000920039', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200392', '40000000-0000-4000-8000-000000920039', 'Recupere a definição', 'O carry é a conjunção das duas entradas.', 2), ('70000000-0000-4000-8000-000009200393', '40000000-0000-4000-8000-000000920039', 'Aplique ao caso', 'A informação relevante permite concluir: $1$', 3), ('70000000-0000-4000-8000-000009200394', '40000000-0000-4000-8000-000000920039', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200395', '40000000-0000-4000-8000-000000920039', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920040', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'medium', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. Um colega usa essa ideia para justificar uma decisão. O bloco combinacional usado para comparar dois números binários. Qual alternativa está correta?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200401', '40000000-0000-4000-8000-000000920040', 'A', 'Registrador', 1), ('50000000-0000-4000-8000-000009200402', '40000000-0000-4000-8000-000000920040', 'B', 'Contador', 2), ('50000000-0000-4000-8000-000009200403', '40000000-0000-4000-8000-000000920040', 'C', 'Flip-flop D', 3), ('50000000-0000-4000-8000-000009200404', '40000000-0000-4000-8000-000000920040', 'D', 'Comparador de magnitude', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920040', '50000000-0000-4000-8000-000009200404') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920040', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200401', '40000000-0000-4000-8000-000000920040', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200402', '40000000-0000-4000-8000-000000920040', 'Aplicar a definição diretamente.', 2), ('60000000-0000-4000-8000-000009200403', '40000000-0000-4000-8000-000000920040', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920040', 'Comparador de magnitude', 'Ele indica relações como maior, menor ou igual sem guardar estado. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200401', '40000000-0000-4000-8000-000000920040', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200402', '40000000-0000-4000-8000-000000920040', 'Recupere a definição', 'Ele indica relações como maior, menor ou igual sem guardar estado.', 2), ('70000000-0000-4000-8000-000009200403', '40000000-0000-4000-8000-000000920040', 'Aplique ao caso', 'A informação relevante permite concluir: Comparador de magnitude', 3), ('70000000-0000-4000-8000-000009200404', '40000000-0000-4000-8000-000000920040', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200405', '40000000-0000-4000-8000-000000920040', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920041', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. A função principal de um multiplexador $4:1$. Qual é a estratégia conceitualmente correta para analisar a situação?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200411', '40000000-0000-4000-8000-000000920041', 'A', 'Somar quatro operandos.', 1), ('50000000-0000-4000-8000-000009200412', '40000000-0000-4000-8000-000000920041', 'B', 'Armazenar quatro bits.', 2), ('50000000-0000-4000-8000-000009200413', '40000000-0000-4000-8000-000000920041', 'C', 'Selecionar uma entre quatro entradas de dados.', 3), ('50000000-0000-4000-8000-000009200414', '40000000-0000-4000-8000-000000920041', 'D', 'Copiar um bit em quatro saídas.', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920041', '50000000-0000-4000-8000-000009200413') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920041', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200411', '40000000-0000-4000-8000-000000920041', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200412', '40000000-0000-4000-8000-000000920041', 'Identificar primeiro a função de cada componente.', 2), ('60000000-0000-4000-8000-000009200413', '40000000-0000-4000-8000-000000920041', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920041', 'Selecionar uma entre quatro entradas de dados.', 'Linhas de seleção escolhem qual entrada é encaminhada à saída. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200411', '40000000-0000-4000-8000-000000920041', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200412', '40000000-0000-4000-8000-000000920041', 'Recupere a definição', 'Linhas de seleção escolhem qual entrada é encaminhada à saída.', 2), ('70000000-0000-4000-8000-000009200413', '40000000-0000-4000-8000-000000920041', 'Aplique ao caso', 'A informação relevante permite concluir: Selecionar uma entre quatro entradas de dados.', 3), ('70000000-0000-4000-8000-000009200414', '40000000-0000-4000-8000-000000920041', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200415', '40000000-0000-4000-8000-000000920041', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920042', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. O componente que transforma um código binário em uma entre várias linhas ativas. Qual conclusão permanece válida após uma verificação cuidadosa?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200421', '40000000-0000-4000-8000-000000920042', 'A', 'Latch', 1), ('50000000-0000-4000-8000-000009200422', '40000000-0000-4000-8000-000000920042', 'B', 'Decodificador', 2), ('50000000-0000-4000-8000-000009200423', '40000000-0000-4000-8000-000000920042', 'C', 'Codificador', 3), ('50000000-0000-4000-8000-000009200424', '40000000-0000-4000-8000-000000920042', 'D', 'Multiplexador', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920042', '50000000-0000-4000-8000-000009200422') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920042', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200421', '40000000-0000-4000-8000-000000920042', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200422', '40000000-0000-4000-8000-000000920042', 'Separar o que o conceito garante do que ele não garante.', 2), ('60000000-0000-4000-8000-000009200423', '40000000-0000-4000-8000-000000920042', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920042', 'Decodificador', 'Um decodificador expande um código de entrada em linhas de saída. A alternativa B expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200421', '40000000-0000-4000-8000-000000920042', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200422', '40000000-0000-4000-8000-000000920042', 'Recupere a definição', 'Um decodificador expande um código de entrada em linhas de saída.', 2), ('70000000-0000-4000-8000-000009200423', '40000000-0000-4000-8000-000000920042', 'Aplique ao caso', 'A informação relevante permite concluir: Decodificador', 3), ('70000000-0000-4000-8000-000009200424', '40000000-0000-4000-8000-000000920042', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200425', '40000000-0000-4000-8000-000000920042', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa B é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920043', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. A saída de soma de um meio somador com entradas $1$ e $1$. Em uma revisão de projeto, qual decisão é compatível com esse princípio?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200431', '40000000-0000-4000-8000-000000920043', 'A', '$0$', 1), ('50000000-0000-4000-8000-000009200432', '40000000-0000-4000-8000-000000920043', 'B', '$1$', 2), ('50000000-0000-4000-8000-000009200433', '40000000-0000-4000-8000-000000920043', 'C', '$2$', 3), ('50000000-0000-4000-8000-000009200434', '40000000-0000-4000-8000-000000920043', 'D', 'overflow obrigatório', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920043', '50000000-0000-4000-8000-000009200431') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920043', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200431', '40000000-0000-4000-8000-000000920043', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200432', '40000000-0000-4000-8000-000000920043', 'Relacionar o princípio ao comportamento observado.', 2), ('60000000-0000-4000-8000-000009200433', '40000000-0000-4000-8000-000000920043', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920043', '$0$', 'A soma é XOR; o transporte é tratado separadamente. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200431', '40000000-0000-4000-8000-000000920043', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200432', '40000000-0000-4000-8000-000000920043', 'Recupere a definição', 'A soma é XOR; o transporte é tratado separadamente.', 2), ('70000000-0000-4000-8000-000009200433', '40000000-0000-4000-8000-000000920043', 'Aplique ao caso', 'A informação relevante permite concluir: $0$', 3), ('70000000-0000-4000-8000-000009200434', '40000000-0000-4000-8000-000000920043', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200435', '40000000-0000-4000-8000-000000920043', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920044', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. O sinal de carry de um meio somador com entradas $1$ e $1$. Qual alternativa está correta?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200441', '40000000-0000-4000-8000-000000920044', 'A', '$0$', 1), ('50000000-0000-4000-8000-000009200442', '40000000-0000-4000-8000-000000920044', 'B', '$2$', 2), ('50000000-0000-4000-8000-000009200443', '40000000-0000-4000-8000-000000920044', 'C', 'indefinido', 3), ('50000000-0000-4000-8000-000009200444', '40000000-0000-4000-8000-000000920044', 'D', '$1$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920044', '50000000-0000-4000-8000-000009200444') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920044', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200441', '40000000-0000-4000-8000-000000920044', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200442', '40000000-0000-4000-8000-000000920044', 'Aplicar a definição diretamente.', 2), ('60000000-0000-4000-8000-000009200443', '40000000-0000-4000-8000-000000920044', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920044', '$1$', 'O carry é a conjunção das duas entradas. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200441', '40000000-0000-4000-8000-000000920044', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200442', '40000000-0000-4000-8000-000000920044', 'Recupere a definição', 'O carry é a conjunção das duas entradas.', 2), ('70000000-0000-4000-8000-000009200443', '40000000-0000-4000-8000-000000920044', 'Aplique ao caso', 'A informação relevante permite concluir: $1$', 3), ('70000000-0000-4000-8000-000009200444', '40000000-0000-4000-8000-000000920044', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200445', '40000000-0000-4000-8000-000000920044', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920045', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'hard', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. A decisão proposta depende de interpretar a propriedade sem generalizações indevidas. O bloco combinacional usado para comparar dois números binários. Um estudante afirmou a opção destacada. Qual avaliação é adequada?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200451', '40000000-0000-4000-8000-000000920045', 'A', 'Contador', 1), ('50000000-0000-4000-8000-000009200452', '40000000-0000-4000-8000-000000920045', 'B', 'Flip-flop D', 2), ('50000000-0000-4000-8000-000009200453', '40000000-0000-4000-8000-000000920045', 'C', 'Comparador de magnitude', 3), ('50000000-0000-4000-8000-000009200454', '40000000-0000-4000-8000-000000920045', 'D', 'Registrador', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920045', '50000000-0000-4000-8000-000009200453') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920045', '30000000-0000-4000-8000-000000001003', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200451', '40000000-0000-4000-8000-000000920045', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200452', '40000000-0000-4000-8000-000000920045', 'Conferir a afirmação com a definição do conceito.', 2), ('60000000-0000-4000-8000-000009200453', '40000000-0000-4000-8000-000000920045', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920045', 'Comparador de magnitude', 'Ele indica relações como maior, menor ou igual sem guardar estado. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200451', '40000000-0000-4000-8000-000000920045', 'Identifique o foco', 'O enunciado trata de circuitos combinacionais e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200452', '40000000-0000-4000-8000-000000920045', 'Recupere a definição', 'Ele indica relações como maior, menor ou igual sem guardar estado.', 2), ('70000000-0000-4000-8000-000009200453', '40000000-0000-4000-8000-000000920045', 'Aplique ao caso', 'A informação relevante permite concluir: Comparador de magnitude', 3), ('70000000-0000-4000-8000-000009200454', '40000000-0000-4000-8000-000000920045', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200455', '40000000-0000-4000-8000-000000920045', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920046', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. O comportamento típico de um flip-flop D na borda ativa do clock. Qual alternativa está correta?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200461', '40000000-0000-4000-8000-000000920046', 'A', 'Copia o valor de D para Q.', 1), ('50000000-0000-4000-8000-000009200462', '40000000-0000-4000-8000-000000920046', 'B', 'Inverte Q.', 2), ('50000000-0000-4000-8000-000009200463', '40000000-0000-4000-8000-000000920046', 'C', 'Soma D a Q.', 3), ('50000000-0000-4000-8000-000009200464', '40000000-0000-4000-8000-000000920046', 'D', 'Zera Q sempre.', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920046', '50000000-0000-4000-8000-000009200461') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920046', '30000000-0000-4000-8000-000000001004', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200461', '40000000-0000-4000-8000-000000920046', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200462', '40000000-0000-4000-8000-000000920046', 'Aplicar a definição diretamente.', 2), ('60000000-0000-4000-8000-000009200463', '40000000-0000-4000-8000-000000920046', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920046', 'Copia o valor de D para Q.', 'O flip-flop D amostra uma entrada e conserva esse valor até a próxima borda. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200461', '40000000-0000-4000-8000-000000920046', 'Identifique o foco', 'O enunciado trata de flip flops e registradores e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200462', '40000000-0000-4000-8000-000000920046', 'Recupere a definição', 'O flip-flop D amostra uma entrada e conserva esse valor até a próxima borda.', 2), ('70000000-0000-4000-8000-000009200463', '40000000-0000-4000-8000-000000920046', 'Aplique ao caso', 'A informação relevante permite concluir: Copia o valor de D para Q.', 3), ('70000000-0000-4000-8000-000009200464', '40000000-0000-4000-8000-000000920046', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200465', '40000000-0000-4000-8000-000000920046', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920047', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. A condição proibida de um latch SR implementado com NOR. Um estudante afirmou a opção destacada. Qual avaliação é adequada?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200471', '40000000-0000-4000-8000-000000920047', 'A', '$S=R=0$', 1), ('50000000-0000-4000-8000-000009200472', '40000000-0000-4000-8000-000000920047', 'B', '$S=1,R=0$', 2), ('50000000-0000-4000-8000-000009200473', '40000000-0000-4000-8000-000000920047', 'C', '$S=0,R=1$', 3), ('50000000-0000-4000-8000-000009200474', '40000000-0000-4000-8000-000000920047', 'D', '$S=R=1$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920047', '50000000-0000-4000-8000-000009200474') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920047', '30000000-0000-4000-8000-000000001004', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200471', '40000000-0000-4000-8000-000000920047', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200472', '40000000-0000-4000-8000-000000920047', 'Conferir a afirmação com a definição do conceito.', 2), ('60000000-0000-4000-8000-000009200473', '40000000-0000-4000-8000-000000920047', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920047', '$S=R=1$', 'Ativar set e reset simultaneamente cria uma saída sem interpretação estável. A alternativa D expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200471', '40000000-0000-4000-8000-000000920047', 'Identifique o foco', 'O enunciado trata de flip flops e registradores e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200472', '40000000-0000-4000-8000-000000920047', 'Recupere a definição', 'Ativar set e reset simultaneamente cria uma saída sem interpretação estável.', 2), ('70000000-0000-4000-8000-000009200473', '40000000-0000-4000-8000-000000920047', 'Aplique ao caso', 'A informação relevante permite concluir: $S=R=1$', 3), ('70000000-0000-4000-8000-000009200474', '40000000-0000-4000-8000-000000920047', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200475', '40000000-0000-4000-8000-000000920047', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa D é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920048', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Em uma questão de projeto, é importante distinguir termos próximos sem confundir suas funções. A propriedade que distingue um flip-flop de um circuito combinacional. Qual é a estratégia conceitualmente correta para analisar a situação?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200481', '40000000-0000-4000-8000-000000920048', 'A', 'Ele só trabalha com zero.', 1), ('50000000-0000-4000-8000-000009200482', '40000000-0000-4000-8000-000000920048', 'B', 'Ele não depende de energia.', 2), ('50000000-0000-4000-8000-000009200483', '40000000-0000-4000-8000-000000920048', 'C', 'Ele armazena estado.', 3), ('50000000-0000-4000-8000-000009200484', '40000000-0000-4000-8000-000000920048', 'D', 'Ele não usa portas lógicas.', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920048', '50000000-0000-4000-8000-000009200483') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920048', '30000000-0000-4000-8000-000000001004', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200481', '40000000-0000-4000-8000-000000920048', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200482', '40000000-0000-4000-8000-000000920048', 'Identificar primeiro a função de cada componente.', 2), ('60000000-0000-4000-8000-000009200483', '40000000-0000-4000-8000-000000920048', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920048', 'Ele armazena estado.', 'A saída pode depender de eventos anteriores, não apenas das entradas atuais. A alternativa C expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200481', '40000000-0000-4000-8000-000000920048', 'Identifique o foco', 'O enunciado trata de flip flops e registradores e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200482', '40000000-0000-4000-8000-000000920048', 'Recupere a definição', 'A saída pode depender de eventos anteriores, não apenas das entradas atuais.', 2), ('70000000-0000-4000-8000-000009200483', '40000000-0000-4000-8000-000000920048', 'Aplique ao caso', 'A informação relevante permite concluir: Ele armazena estado.', 3), ('70000000-0000-4000-8000-000009200484', '40000000-0000-4000-8000-000000920048', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200485', '40000000-0000-4000-8000-000000920048', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa C é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920049', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Considere uma atividade de laboratório sobre arquitetura de computadores. O número de flip-flops D necessário para guardar uma palavra de $16$ bits. Qual conclusão permanece válida após uma verificação cuidadosa?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200491', '40000000-0000-4000-8000-000000920049', 'A', '$32$', 1), ('50000000-0000-4000-8000-000009200492', '40000000-0000-4000-8000-000000920049', 'B', '$16$', 2), ('50000000-0000-4000-8000-000009200493', '40000000-0000-4000-8000-000000920049', 'C', '$4$', 3), ('50000000-0000-4000-8000-000009200494', '40000000-0000-4000-8000-000000920049', 'D', '$8$', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920049', '50000000-0000-4000-8000-000009200492') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920049', '30000000-0000-4000-8000-000000001004', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200491', '40000000-0000-4000-8000-000000920049', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200492', '40000000-0000-4000-8000-000000920049', 'Separar o que o conceito garante do que ele não garante.', 2), ('60000000-0000-4000-8000-000009200493', '40000000-0000-4000-8000-000000920049', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920049', '$16$', 'Cada flip-flop D armazena um único bit. A alternativa B expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200491', '40000000-0000-4000-8000-000000920049', 'Identifique o foco', 'O enunciado trata de flip flops e registradores e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200492', '40000000-0000-4000-8000-000000920049', 'Recupere a definição', 'Cada flip-flop D armazena um único bit.', 2), ('70000000-0000-4000-8000-000009200493', '40000000-0000-4000-8000-000000920049', 'Aplique ao caso', 'A informação relevante permite concluir: $16$', 3), ('70000000-0000-4000-8000-000009200494', '40000000-0000-4000-8000-000000920049', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200495', '40000000-0000-4000-8000-000000920049', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa B é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown) values ('40000000-0000-4000-8000-000000920050', '20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000001001', 'multiple_choice', 'easy', 'published', 'Durante uma revisão de código e hardware, a equipe precisa interpretar corretamente um conceito. A utilidade de um registrador com deslocamento. Em uma revisão de projeto, qual decisão é compatível com esse princípio?') on conflict (id) do update set subject_id=excluded.subject_id, source_id=excluded.source_id, kind=excluded.kind, difficulty=excluded.difficulty, publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;
insert into public.question_options (id, question_id, label, content_markdown, sort_order) values ('50000000-0000-4000-8000-000009200501', '40000000-0000-4000-8000-000000920050', 'A', 'Mover bits uma posição a cada pulso.', 1), ('50000000-0000-4000-8000-000009200502', '40000000-0000-4000-8000-000000920050', 'B', 'Converter toda RAM em ROM.', 2), ('50000000-0000-4000-8000-000009200503', '40000000-0000-4000-8000-000000920050', 'C', 'Eliminar o clock.', 3), ('50000000-0000-4000-8000-000009200504', '40000000-0000-4000-8000-000000920050', 'D', 'Executar instruções.', 4) on conflict (id) do update set question_id=excluded.question_id, label=excluded.label, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_answer_keys (question_id, correct_option_id) values ('40000000-0000-4000-8000-000000920050', '50000000-0000-4000-8000-000009200501') on conflict (question_id) do update set correct_option_id=excluded.correct_option_id;
insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary) values ('40000000-0000-4000-8000-000000920050', '30000000-0000-4000-8000-000000001004', true) on conflict (question_id, taxonomy_node_id) do update set is_primary=excluded.is_primary;
insert into public.question_hints (id, question_id, content_markdown, sort_order) values ('60000000-0000-4000-8000-000009200501', '40000000-0000-4000-8000-000000920050', 'Nomeie o conceito principal antes de avaliar as alternativas.', 1), ('60000000-0000-4000-8000-000009200502', '40000000-0000-4000-8000-000000920050', 'Relacionar o princípio ao comportamento observado.', 2), ('60000000-0000-4000-8000-000009200503', '40000000-0000-4000-8000-000000920050', 'Compare cada alternativa com a propriedade essencial, não apenas com palavras parecidas.', 3) on conflict (id) do update set question_id=excluded.question_id, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;
insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown) values ('40000000-0000-4000-8000-000000920050', 'Mover bits uma posição a cada pulso.', 'Registradores de deslocamento transferem o estado entre estágios. A alternativa A expressa essa propriedade de modo preciso; as demais trocam o papel de componentes, extrapolam a definição ou descrevem outra técnica.') on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown, explanation_markdown=excluded.explanation_markdown;
insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) values ('70000000-0000-4000-8000-000009200501', '40000000-0000-4000-8000-000000920050', 'Identifique o foco', 'O enunciado trata de flip flops e registradores e pede uma interpretação conceitual.', 1), ('70000000-0000-4000-8000-000009200502', '40000000-0000-4000-8000-000000920050', 'Recupere a definição', 'Registradores de deslocamento transferem o estado entre estágios.', 2), ('70000000-0000-4000-8000-000009200503', '40000000-0000-4000-8000-000000920050', 'Aplique ao caso', 'A informação relevante permite concluir: Mover bits uma posição a cada pulso.', 3), ('70000000-0000-4000-8000-000009200504', '40000000-0000-4000-8000-000000920050', 'Elimine distrações', 'As outras alternativas representam confusões frequentes entre dados, endereço, estado, controle ou desempenho.', 4), ('70000000-0000-4000-8000-000009200505', '40000000-0000-4000-8000-000000920050', 'Verifique a conclusão', 'A resposta permanece coerente com a definição; portanto, a alternativa A é a correta.', 5) on conflict (id) do update set question_id=excluded.question_id, title=excluded.title, content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

commit;
