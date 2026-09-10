-- Corrige o bloco 1: preserva o texto revisado, mas substitui fisicamente os
-- registros anteriores de dicas e passos antes de seguir para os demais blocos.
begin;

create temporary table c1_block_01_question_ids (question_id uuid primary key) on commit drop;
insert into c1_block_01_question_ids
select format('00000042-0000-4000-8000-%s', lpad((n * 100)::text, 12, '0'))::uuid
from generate_series(1, 33) as n;

create temporary table c1_block_01_hints on commit drop as
select question_id, content_markdown, sort_order
from public.question_hints
where question_id in (select question_id from c1_block_01_question_ids);

create temporary table c1_block_01_solution_steps on commit drop as
select question_id, title, content_markdown, sort_order
from public.question_solution_steps
where question_id in (select question_id from c1_block_01_question_ids);

delete from public.question_hints where question_id in (select question_id from c1_block_01_question_ids);
delete from public.question_solution_steps where question_id in (select question_id from c1_block_01_question_ids);

insert into public.question_hints (id, question_id, content_markdown, sort_order)
select format('00000084-0000-4000-8000-%s', lpad((row_number() over(order by question_id, sort_order))::text, 12, '0'))::uuid,
question_id, content_markdown, sort_order
from c1_block_01_hints;

insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order)
select format('00000094-0000-4000-8000-%s', lpad((row_number() over(order by question_id, sort_order))::text, 12, '0'))::uuid,
question_id, title, content_markdown, sort_order
from c1_block_01_solution_steps;

commit;
