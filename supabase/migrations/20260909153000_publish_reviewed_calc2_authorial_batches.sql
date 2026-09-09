-- Publica os 84 rascunhos autorais de Cálculo II após a auditoria técnica local.
-- Pré-requisitos: migrations draft 20260907110000 a 20260907110600 e
-- 20260908120000_improve_calc2_draft_editorial_quality.sql.
begin;

update public.question_sources
set
  licence_note = 'Questões originais da Arc, revisadas tecnicamente e editorialmente pela equipe Arc em 2026-09-09; sem transcrição de banco externo.',
  rights_holder = 'Arc',
  rights_status = 'approved',
  verified_by = 'Equipe editorial Arc',
  verified_at = '2026-09-09T00:00:00Z'
where id in (
  '10000000-0000-4000-8000-000000000062',
  '10000000-0000-4000-8000-000000000063',
  '10000000-0000-4000-8000-000000000064',
  '10000000-0000-4000-8000-000000000065',
  '10000000-0000-4000-8000-000000000066',
  '10000000-0000-4000-8000-000000000067',
  '10000000-0000-4000-8000-000000000068'
);

update public.questions
set publication_status = 'published'
where source_id in (
  '10000000-0000-4000-8000-000000000062',
  '10000000-0000-4000-8000-000000000063',
  '10000000-0000-4000-8000-000000000064',
  '10000000-0000-4000-8000-000000000065',
  '10000000-0000-4000-8000-000000000066',
  '10000000-0000-4000-8000-000000000067',
  '10000000-0000-4000-8000-000000000068'
);

commit;
