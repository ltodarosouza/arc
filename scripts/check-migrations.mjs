import { readFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const container = process.env.ARC_TEST_POSTGRES_CONTAINER;
if (!container)
  throw new Error(
    'Set ARC_TEST_POSTGRES_CONTAINER to a disposable PostgreSQL container.',
  );
function sql(input) {
  const result = spawnSync(
    'docker',
    [
      'exec',
      '-i',
      container,
      'psql',
      '-U',
      'postgres',
      '-d',
      'arc_preflight',
      '-v',
      'ON_ERROR_STOP=1',
    ],
    { input, encoding: 'utf8' },
  );
  if (result.status !== 0)
    throw new Error(result.stderr || result.error?.message);
}
sql(`create schema auth;
create table auth.users(id uuid primary key);
create function auth.uid() returns uuid language sql stable as 'select nullif(current_setting(''request.jwt.claim.sub'', true), '''')::uuid';
create role anon nologin;
create role authenticated nologin;
grant usage on schema auth to authenticated, anon;`);
for (const name of readdirSync('supabase/migrations')
  .filter((n) => n.endsWith('.sql'))
  .sort()) {
  sql(readFileSync('supabase/migrations/' + name, 'utf8'));
  console.log('Applied ' + name);
}
for (const name of readdirSync('supabase/tests')
  .filter((n) => n.endsWith('.sql'))
  .sort()) {
  sql(readFileSync('supabase/tests/' + name, 'utf8'));
  console.log('Passed ' + name);
}
