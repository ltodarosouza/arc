import { readFileSync, writeFileSync } from 'node:fs';

// Input is produced by `supabase status -o env` and contains LOCAL credentials.
// Never print the input or generated environment file.
const values = Object.fromEntries(
  readFileSync('.env.supabase-test', 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.includes('='))
    .map((line) => {
      const index = line.indexOf('=');
      return [
        line.slice(0, index),
        line.slice(index + 1).replace(/^"|"$/g, ''),
      ];
    }),
);
if (!['localhost', '127.0.0.1'].includes(new URL(values.API_URL).hostname))
  throw new Error('QA requires local Supabase.');
const configuration = {
  NEXT_PUBLIC_SUPABASE_URL: values.API_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    values.PUBLISHABLE_KEY ?? values.ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: values.SERVICE_ROLE_KEY,
  NEXT_PUBLIC_SITE_URL: 'http://127.0.0.1:3000',
};
if (Object.values(configuration).some((value) => !value))
  throw new Error('Local Supabase credentials are incomplete.');
writeFileSync(
  '.env.local',
  Object.entries(configuration)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n') + '\n',
  { mode: 0o600 },
);
console.log('Configured local disposable account QA; no credentials printed.');
