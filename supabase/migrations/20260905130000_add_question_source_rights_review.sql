create type public.source_rights_status as enum ('unverified', 'review_required', 'approved', 'rejected');

alter table public.question_sources
  add column licence_id text,
  add column licence_url text,
  add column rights_holder text,
  add column permission_reference text,
  add column rights_status public.source_rights_status not null default 'unverified',
  add column verified_by text,
  add column verified_at timestamptz;

create index question_sources_rights_review_index
  on public.question_sources(rights_status, kind);
