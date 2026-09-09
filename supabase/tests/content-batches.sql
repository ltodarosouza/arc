begin;
do $$
declare amount integer;
begin
  select count(*) into amount from public.questions
  where source_id between '10000000-0000-4000-8000-000000000062' and '10000000-0000-4000-8000-000000000068';
  if amount<>84 then raise exception 'Expected 84 authored drafts, got %',amount; end if;
  if exists(select 1 from public.questions q where q.source_id between
    '10000000-0000-4000-8000-000000000062' and '10000000-0000-4000-8000-000000000068'
    and (q.publication_status<>'published'
      or (select count(*) from public.question_options o where o.question_id=q.id)<>4
      or (select count(*) from public.question_solution_steps s where s.question_id=q.id)<2
      or not exists(select 1 from public.question_answer_keys k join public.question_options o on o.id=k.correct_option_id
        where k.question_id=q.id and o.question_id=q.id)
      or not exists(select 1 from public.question_taxonomy_tags t where t.question_id=q.id and t.is_primary)))
  then raise exception 'Incomplete or unpublished reviewed content'; end if;
end $$;
set local role anon;
do $$
declare amount integer;
begin
  select count(*) into amount from public.questions where source_id between
    '10000000-0000-4000-8000-000000000062' and '10000000-0000-4000-8000-000000000068'
  ;
  if amount<>84 then raise exception 'Reviewed public content is not visible to anonymous visitors: got %', amount; end if;
end $$;
rollback;
