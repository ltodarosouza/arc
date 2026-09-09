begin;

\echo 'Question inventory (diagnostic only; counts do not determine pass/fail)'
select
  subject.slug as subject,
  question.publication_status,
  question.difficulty,
  count(*) as questions
from public.questions question
join public.subjects subject on subject.id = question.subject_id
group by subject.slug, question.publication_status, question.difficulty
order by subject.slug, question.publication_status, question.difficulty;

-- Exercise every publication state even when the current seed happens to have
-- no draft or archived questions. The transaction rollback removes fixtures.
insert into public.questions (
  subject_id,
  kind,
  difficulty,
  publication_status,
  statement_markdown
)
select
  subject.id,
  'reveal_answer',
  'easy',
  fixture.publication_status::public.question_publication_status,
  'Catalogue publication contract fixture: ' || fixture.publication_status
from (values ('published'), ('draft'), ('archived')) fixture(publication_status)
cross join lateral (
  select id
  from public.subjects
  where is_published
  order by id
  limit 1
) subject;

-- Capture the catalogue that each public role should see. These values come
-- from the current database state instead of freezing a seed batch size.
select set_config(
  'arc_test.published_subjects',
  (select count(*)::text from public.subjects where is_published),
  true
);
select set_config(
  'arc_test.published_taxonomy_nodes',
  (select count(*)::text from public.taxonomy_nodes where is_published),
  true
);
select set_config(
  'arc_test.published_questions',
  (select count(*)::text from public.questions where publication_status = 'published'),
  true
);
select set_config(
  'arc_test.published_sources',
  (
    select count(distinct source_id)::text
    from public.questions
    where publication_status = 'published' and source_id is not null
  ),
  true
);
select set_config(
  'arc_test.published_tags',
  (
    select count(*)::text
    from public.question_taxonomy_tags tag
    join public.questions question on question.id = tag.question_id
    where question.publication_status = 'published'
  ),
  true
);
select set_config(
  'arc_test.published_options',
  (
    select count(*)::text
    from public.question_options option
    join public.questions question on question.id = option.question_id
    where question.publication_status = 'published'
  ),
  true
);
select set_config(
  'arc_test.published_hints',
  (
    select count(*)::text
    from public.question_hints hint
    join public.questions question on question.id = hint.question_id
    where question.publication_status = 'published'
  ),
  true
);

-- Validate content relationships without assuming how many questions exist.
do $$
begin
  if exists (
    select 1
    from public.taxonomy_nodes taxonomy
    join public.subjects subject on subject.id = taxonomy.subject_id
    where taxonomy.is_published and not subject.is_published
  ) then
    raise exception 'Published taxonomy belongs to an unpublished subject';
  end if;

  if exists (
    select 1
    from public.questions question
    join public.subjects subject on subject.id = question.subject_id
    where question.publication_status = 'published' and not subject.is_published
  ) then
    raise exception 'Published question belongs to an unpublished subject';
  end if;

  if exists (
    select 1
    from public.questions question
    where question.publication_status = 'published'
      and question.kind = 'multiple_choice'
      and (
        (select count(*) from public.question_options option where option.question_id = question.id) < 2
        or not exists (
          select 1
          from public.question_answer_keys answer_key
          join public.question_options option on option.id = answer_key.correct_option_id
          where answer_key.question_id = question.id
            and option.question_id = question.id
        )
      )
  ) then
    raise exception 'Published multiple-choice question lacks usable options or a valid answer key';
  end if;

  if exists (
    select 1
    from public.questions question
    join public.question_sources source on source.id = question.source_id
    where question.publication_status = 'published'
      and source.rights_status in ('review_required', 'rejected')
  ) then
    raise exception 'Question from a blocked source is published';
  end if;
end
$$;

set local role anon;

do $$
begin
  if exists (select 1 from public.subjects where not is_published)
    or (select count(*) from public.subjects) <> current_setting('arc_test.published_subjects')::bigint then
    raise exception 'Anonymous catalogue does not expose exactly the published subjects';
  end if;

  if exists (select 1 from public.taxonomy_nodes where not is_published)
    or (select count(*) from public.taxonomy_nodes) <> current_setting('arc_test.published_taxonomy_nodes')::bigint then
    raise exception 'Anonymous catalogue does not expose exactly the published taxonomy';
  end if;

  if exists (select 1 from public.questions where publication_status <> 'published')
    or (select count(*) from public.questions) <> current_setting('arc_test.published_questions')::bigint then
    raise exception 'Anonymous catalogue does not expose exactly the published questions';
  end if;

  if (select count(*) from public.question_sources) <> current_setting('arc_test.published_sources')::bigint then
    raise exception 'Anonymous catalogue exposes sources unrelated to published questions or hides required sources';
  end if;

  if exists (
    select 1 from public.question_taxonomy_tags tag
    left join public.questions question on question.id = tag.question_id
    where question.id is null
  ) or (select count(*) from public.question_taxonomy_tags) <> current_setting('arc_test.published_tags')::bigint then
    raise exception 'Anonymous catalogue exposes tags from unpublished questions or hides published tags';
  end if;

  if exists (
    select 1 from public.question_options option
    left join public.questions question on question.id = option.question_id
    where question.id is null
  ) or (select count(*) from public.question_options) <> current_setting('arc_test.published_options')::bigint then
    raise exception 'Anonymous catalogue exposes options from unpublished questions or hides published options';
  end if;

  if exists (
    select 1 from public.question_hints hint
    left join public.questions question on question.id = hint.question_id
    where question.id is null
  ) or (select count(*) from public.question_hints) <> current_setting('arc_test.published_hints')::bigint then
    raise exception 'Anonymous catalogue exposes hints from unpublished questions or hides published hints';
  end if;
end
$$;

reset role;
set local role authenticated;

do $$
begin
  if exists (select 1 from public.subjects where not is_published)
    or (select count(*) from public.subjects) <> current_setting('arc_test.published_subjects')::bigint then
    raise exception 'Authenticated catalogue does not expose exactly the published subjects';
  end if;

  if exists (select 1 from public.taxonomy_nodes where not is_published)
    or (select count(*) from public.taxonomy_nodes) <> current_setting('arc_test.published_taxonomy_nodes')::bigint then
    raise exception 'Authenticated catalogue does not expose exactly the published taxonomy';
  end if;

  if exists (select 1 from public.questions where publication_status <> 'published')
    or (select count(*) from public.questions) <> current_setting('arc_test.published_questions')::bigint then
    raise exception 'Authenticated catalogue does not expose exactly the published questions';
  end if;

  if (select count(*) from public.question_sources) <> current_setting('arc_test.published_sources')::bigint then
    raise exception 'Authenticated catalogue exposes sources unrelated to published questions or hides required sources';
  end if;

  if exists (
    select 1 from public.question_taxonomy_tags tag
    left join public.questions question on question.id = tag.question_id
    where question.id is null
  ) or (select count(*) from public.question_taxonomy_tags) <> current_setting('arc_test.published_tags')::bigint then
    raise exception 'Authenticated catalogue exposes tags from unpublished questions or hides published tags';
  end if;

  if exists (
    select 1 from public.question_options option
    left join public.questions question on question.id = option.question_id
    where question.id is null
  ) or (select count(*) from public.question_options) <> current_setting('arc_test.published_options')::bigint then
    raise exception 'Authenticated catalogue exposes options from unpublished questions or hides published options';
  end if;

  if exists (
    select 1 from public.question_hints hint
    left join public.questions question on question.id = hint.question_id
    where question.id is null
  ) or (select count(*) from public.question_hints) <> current_setting('arc_test.published_hints')::bigint then
    raise exception 'Authenticated catalogue exposes hints from unpublished questions or hides published hints';
  end if;
end
$$;

reset role;
rollback;
