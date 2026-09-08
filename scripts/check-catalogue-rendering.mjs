import { spawnSync } from 'node:child_process';
import katex from 'katex';
import { normalizeLegacyMath } from '../lib/domain/math.ts';

const container = process.env.ARC_TEST_POSTGRES_CONTAINER;
if (!container)
  throw new Error(
    'Set ARC_TEST_POSTGRES_CONTAINER to the disposable local test database.',
  );
const query = `select coalesce(json_agg(row_to_json(t)), '[]') from (
select id::text, statement_markdown as content from public.questions
union all select id::text,content_markdown from public.question_options
union all select question_id::text,final_answer_markdown from public.question_solutions
union all select question_id::text,explanation_markdown from public.question_solutions
union all select id::text,content_markdown from public.question_solution_steps
union all select id::text,content_markdown from public.question_hints
) t;`;
const result = spawnSync(
  'docker',
  [
    'exec',
    container,
    'psql',
    '-U',
    'postgres',
    '-d',
    process.env.ARC_TEST_POSTGRES_DB ?? 'postgres',
    '-At',
    '-c',
    query,
  ],
  { encoding: 'utf8', maxBuffer: 10_000_000 },
);
if (result.status !== 0) throw new Error(result.stderr);
const rows = JSON.parse(result.stdout);
let expressions = 0;
for (const row of rows) {
  const content = String(row.content ?? '');
  if ((content.match(/\$/g) ?? []).length % 2 !== 0)
    throw new Error(`Unpaired math delimiter in ${row.id}`);
  for (const match of content.matchAll(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g)) {
    try {
      const expression = match[1] ?? match[2];
      if (
        /(^|[^\\])\b(?:int|frac|sqrt|sum|sin|cos|tan|ln|infty)\b/.test(
          expression,
        )
      )
        throw new Error('LaTeX command is missing its backslash');
      katex.renderToString(normalizeLegacyMath(expression), {
        throwOnError: true,
        trust: false,
        macros: { '\\sen': '\\sin' },
      });
      expressions++;
    } catch (error) {
      throw new Error(`Invalid math in ${row.id}: ${error.message}`);
    }
  }
}
console.log(
  `${rows.length} catalogue fields; ${expressions} formulas rendered without errors.`,
);
