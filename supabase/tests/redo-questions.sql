begin;

insert into auth.users(id) values
  ('91000000-0000-4000-8000-000000000001'),
  ('91000000-0000-4000-8000-000000000002');

select set_config(
  'request.jwt.claim.sub',
  '91000000-0000-4000-8000-000000000001',
  true
);
select set_config(
  'request.jwt.claims',
  '{"sub":"91000000-0000-4000-8000-000000000001","role":"authenticated"}',
  true
);
set local role authenticated;

do $$
declare
  v_question_id uuid;
begin
  select id into v_question_id
  from public.questions
  where publication_status = 'published'
  order by created_at
  limit 1;

  if v_question_id is null then
    raise exception 'A published question is required for redo queue tests';
  end if;

  insert into public.redo_questions(user_id, question_id)
    values (auth.uid(), v_question_id);
  insert into public.redo_questions(user_id, question_id)
    values (auth.uid(), v_question_id)
    on conflict (user_id, question_id) do nothing;

  if (select count(*) from public.redo_questions
      where user_id = auth.uid() and question_id = v_question_id) <> 1 then
    raise exception 'Redo queue entry was not idempotent';
  end if;

  begin
    insert into public.redo_questions(user_id, question_id)
      values ('91000000-0000-4000-8000-000000000002', v_question_id);
    raise exception 'Learner added an item to another learners redo queue';
  exception when insufficient_privilege then null;
  end;

  delete from public.redo_questions
    where user_id = auth.uid() and question_id = v_question_id;
  if exists (select 1 from public.redo_questions
             where user_id = auth.uid() and question_id = v_question_id) then
    raise exception 'Learner could not remove own redo queue entry';
  end if;
end $$;

reset role;
rollback;
