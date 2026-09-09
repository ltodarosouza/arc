-- Remove the repeated instructional suffix from the renewed Vector Calculus bank.
-- Prerequisite: run this after the five 20260909180x00 diversify migrations.
-- The mathematical command, options, hints, answer key, and solution remain unchanged.

update public.questions
set statement_markdown = regexp_replace(
  statement_markdown,
  '[[:space:]]+Para decidir,.*$',
  '',
  'i'
)
where source_id in (
  '10000000-0000-4000-8000-000000000232',
  '10000000-0000-4000-8000-000000000233',
  '10000000-0000-4000-8000-000000000234',
  '10000000-0000-4000-8000-000000000235',
  '10000000-0000-4000-8000-000000000236'
)
  and statement_markdown ~* '[[:space:]]Para decidir,';

do $validation$
declare
  remaining_count integer;
begin
  select count(*)
  into remaining_count
  from public.questions
  where source_id in (
    '10000000-0000-4000-8000-000000000232',
    '10000000-0000-4000-8000-000000000233',
    '10000000-0000-4000-8000-000000000234',
    '10000000-0000-4000-8000-000000000235',
    '10000000-0000-4000-8000-000000000236'
  )
    and statement_markdown ~* '[[:space:]]Para decidir,';

  if remaining_count <> 0 then
    raise exception 'Vector prompt cleanup left % repeated suffixes', remaining_count;
  end if;
end;
$validation$;
