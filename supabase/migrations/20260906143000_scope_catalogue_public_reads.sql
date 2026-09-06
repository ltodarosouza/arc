-- Public catalogue tables must expose records only when they belong to a
-- published question. This prevents draft alternatives, hints and source
-- metadata from being visible through direct browser queries.

drop policy if exists "Question sources are readable" on public.question_sources;
drop policy if exists "Question tags are readable" on public.question_taxonomy_tags;
drop policy if exists "Question options are readable" on public.question_options;
drop policy if exists "Question hints are readable" on public.question_hints;

create policy "Published question sources are readable" on public.question_sources for select
  to anon, authenticated using (
    exists (
      select 1 from public.questions question
      where question.source_id = question_sources.id
        and question.publication_status = 'published'
    )
  );

create policy "Published question tags are readable" on public.question_taxonomy_tags for select
  to anon, authenticated using (
    exists (
      select 1 from public.questions question
      where question.id = question_taxonomy_tags.question_id
        and question.publication_status = 'published'
    )
  );

create policy "Published question options are readable" on public.question_options for select
  to anon, authenticated using (
    exists (
      select 1 from public.questions question
      where question.id = question_options.question_id
        and question.publication_status = 'published'
    )
  );

create policy "Published question hints are readable" on public.question_hints for select
  to anon, authenticated using (
    exists (
      select 1 from public.questions question
      where question.id = question_hints.question_id
        and question.publication_status = 'published'
    )
  );
