-- Runs in a separate test database, inside a transaction that never survives.
begin;
insert into auth.users(id) values
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');
insert into public.profiles(user_id,display_name) values
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','Ana'),
('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','Bruno');
set local role authenticated;
select set_config('request.jwt.claim.sub','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',true);
select set_config('request.jwt.claims','{"sub":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","role":"authenticated"}',true);
do $$
begin
  if (select count(*) from public.profiles) <> 1 then raise exception 'Profiles leak across accounts'; end if;
  update public.profiles set display_name='Not allowed' where user_id='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  if found then raise exception 'Cross-account update succeeded'; end if;
  update public.profiles set display_name='Ana Maria' where user_id=auth.uid();
  if not found then raise exception 'Own profile update failed'; end if;
  begin
    update public.profiles set display_name='<script>' where user_id=auth.uid();
    raise exception 'Invalid name accepted';
  exception when check_violation then null;
  end;
  begin
    update public.profiles set user_id='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' where user_id=auth.uid();
    raise exception 'Owner change accepted';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;
delete from auth.users where id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
do $$ begin
  if exists(select 1 from public.profiles where user_id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa') then
    raise exception 'Profile did not cascade on account deletion';
  end if;
  if (select display_name from public.profiles where user_id='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb') <> 'Bruno' then
    raise exception 'Other account was modified';
  end if;
end $$;
rollback;

