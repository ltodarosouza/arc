-- #102: private, optional display name; no public handles or fabricated profiles.
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  updated_at timestamptz not null default now(),
  constraint profile_name_valid check (
    char_length(display_name) between 1 and 60
    and display_name = btrim(display_name)
    and display_name not like '%  %'
    and display_name !~ '[[:cntrl:]<>]'
  )
);
alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant insert (user_id, display_name), update (display_name) on public.profiles to authenticated;
create policy "Learners read own profile" on public.profiles for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Learners create own profile" on public.profiles for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Learners update own profile" on public.profiles for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create function public.stamp_profile_update() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
create trigger profile_updated_at before update on public.profiles
for each row execute function public.stamp_profile_update();
revoke all on function public.stamp_profile_update() from public;

