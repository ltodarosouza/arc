begin;

-- Use explicit fixtures so every learner-facing RPC is tested independently
-- from the authored content batches.
insert into auth.users (id) values ('90000000-0000-4000-8000-000000000001');

insert into public.questions (
  id, subject_id, kind, difficulty, publication_status, statement_markdown
)
select '90000000-0000-4000-8000-000000000010', id, 'multiple_choice', 'easy', 'draft', 'Draft multiple choice'
from public.subjects order by sort_order limit 1;

insert into public.questions (
  id, subject_id, kind, difficulty, publication_status, statement_markdown
)
select '90000000-0000-4000-8000-000000000011', id, 'reveal_answer', 'easy', 'draft', 'Draft reveal answer'
from public.subjects order by sort_order limit 1;

insert into public.questions (
  id, subject_id, kind, difficulty, publication_status, statement_markdown
)
select '90000000-0000-4000-8000-000000000012', id, 'multiple_choice', 'easy', 'archived', 'Archived multiple choice'
from public.subjects order by sort_order limit 1;

insert into public.questions (
  id, subject_id, kind, difficulty, publication_status, statement_markdown
)
select '90000000-0000-4000-8000-000000000013', id, 'multiple_choice', 'easy', 'published', 'Published multiple choice'
from public.subjects order by sort_order limit 1;

insert into public.question_options (id, question_id, label, content_markdown, sort_order) values
  ('90000000-0000-4000-8000-000000000020', '90000000-0000-4000-8000-000000000010', 'A', 'Draft answer', 1),
  ('90000000-0000-4000-8000-000000000021', '90000000-0000-4000-8000-000000000012', 'A', 'Archived answer', 1),
  ('90000000-0000-4000-8000-000000000022', '90000000-0000-4000-8000-000000000013', 'A', 'Published correct answer', 1),
  ('90000000-0000-4000-8000-000000000023', '90000000-0000-4000-8000-000000000013', 'B', 'Published distractor', 2);

insert into public.question_answer_keys (question_id, correct_option_id) values
  ('90000000-0000-4000-8000-000000000010', '90000000-0000-4000-8000-000000000020'),
  ('90000000-0000-4000-8000-000000000012', '90000000-0000-4000-8000-000000000021'),
  ('90000000-0000-4000-8000-000000000013', '90000000-0000-4000-8000-000000000022');

insert into public.question_solutions (question_id, final_answer_markdown) values
  ('90000000-0000-4000-8000-000000000010', 'Draft solution'),
  ('90000000-0000-4000-8000-000000000012', 'Archived solution'),
  ('90000000-0000-4000-8000-000000000013', 'Published solution');

insert into public.question_attempts (
  user_id, question_id, selected_option_id, outcome, grading_method
) values
  ('90000000-0000-4000-8000-000000000001', '90000000-0000-4000-8000-000000000010', '90000000-0000-4000-8000-000000000020', 'correct', 'automatic'),
  ('90000000-0000-4000-8000-000000000001', '90000000-0000-4000-8000-000000000012', '90000000-0000-4000-8000-000000000021', 'correct', 'automatic');

select set_config('request.jwt.claim.sub', '90000000-0000-4000-8000-000000000001', true);
set local role authenticated;

do $$
begin
  begin
    perform public.submit_multiple_choice_attempt(
      '90000000-0000-4000-8000-000000000010',
      '90000000-0000-4000-8000-000000000020'
    );
    raise exception 'Draft multiple-choice attempt was accepted';
  exception when others then
    if sqlerrm <> 'Question is not available.' then raise; end if;
  end;

  begin
    perform public.submit_multiple_choice_attempt(
      '90000000-0000-4000-8000-000000000012',
      '90000000-0000-4000-8000-000000000021'
    );
    raise exception 'Archived multiple-choice attempt was accepted';
  exception when others then
    if sqlerrm <> 'Question is not available.' then raise; end if;
  end;

  begin
    perform public.record_reveal_answer_attempt(
      '90000000-0000-4000-8000-000000000011',
      'not_assessed'
    );
    raise exception 'Draft reveal-answer attempt was accepted';
  exception when others then
    if sqlerrm <> 'Question is not available.' then raise; end if;
  end;

  if public.get_question_solution('90000000-0000-4000-8000-000000000010') is not null then
    raise exception 'Draft solution leaked through learner RPC';
  end if;

  if public.get_question_solution('90000000-0000-4000-8000-000000000012') is not null then
    raise exception 'Archived solution leaked through learner RPC';
  end if;

  if not exists (
    select 1 from public.submit_multiple_choice_attempt(
      '90000000-0000-4000-8000-000000000013',
      '90000000-0000-4000-8000-000000000022'
    ) where outcome = 'correct'
  ) then
    raise exception 'Published multiple-choice attempt was rejected';
  end if;

  if public.get_question_solution('90000000-0000-4000-8000-000000000013') is null then
    raise exception 'Published solution was not returned after own attempt';
  end if;
end $$;

reset role;

do $$
begin
  if (select count(*) from public.question_attempts
      where user_id = '90000000-0000-4000-8000-000000000001'
        and question_id = '90000000-0000-4000-8000-000000000010') <> 1 then
    raise exception 'Rejected draft multiple-choice attempt changed history';
  end if;

  if (select count(*) from public.question_attempts
      where user_id = '90000000-0000-4000-8000-000000000001'
        and question_id = '90000000-0000-4000-8000-000000000012') <> 1 then
    raise exception 'Rejected archived multiple-choice attempt changed history';
  end if;

  if (select count(*) from public.question_attempts
      where user_id = '90000000-0000-4000-8000-000000000001'
        and question_id = '90000000-0000-4000-8000-000000000011') <> 0 then
    raise exception 'Rejected reveal-answer attempt created a record';
  end if;

  if (select count(*) from public.question_attempts
      where user_id = '90000000-0000-4000-8000-000000000001'
        and question_id = '90000000-0000-4000-8000-000000000013') <> 1 then
    raise exception 'Published multiple-choice attempt was not recorded';
  end if;
end $$;

rollback;
