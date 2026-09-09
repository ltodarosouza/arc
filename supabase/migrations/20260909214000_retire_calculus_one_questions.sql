begin;
update public.questions set publication_status='draft' where subject_id='20000000-0000-4000-8000-000000000004' and publication_status='published';
commit;
