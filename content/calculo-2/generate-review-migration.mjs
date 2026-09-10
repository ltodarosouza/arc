import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../../', import.meta.url);
const inputs = [
  'supabase/migrations/20260910130000_seed_calculus_2_reconstruction_block_01.sql',
  'supabase/migrations/20260910140000_seed_calculus_2_reconstruction_block_02.sql',
];

const body = inputs.map((path) => readFileSync(new URL(path, root), 'utf8')
  .split('\n')
  .filter((line) => !/^\s*(begin|commit);\s*$/i.test(line))
  .join('\n'))
  .join('\n');

const header = `-- Revisão editorial e matemática dos blocos 01 e 02 de Cálculo II.
-- Mantém os IDs públicos e atualiza conteúdo, dificuldade, chaves, dicas e soluções.
begin;
`;

writeFileSync(
  new URL('supabase/migrations/20260910151000_review_calculus_2_reconstruction_blocks_01_02.sql', root),
  `${header}${body}\ncommit;\n`,
);
