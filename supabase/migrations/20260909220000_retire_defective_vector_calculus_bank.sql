-- Retira o banco vetorial parametrizado da publicação sem apagar tentativas históricas.
-- As questões substitutas usam novas fontes e identificadores.
begin;

update public.questions
set publication_status = 'draft'
where subject_id = '20000000-0000-4000-8000-000000000003'
  and publication_status = 'published';

commit;
