import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outputDirectory = resolve(root, 'supabase/manual-imports');

const groups = {
  'calculo-2': [
    '20260906140000_seed_initial_mvp_catalogue.sql',
    '20260906153000_seed_ten_question_mvp.sql',
    '20260906160000_seed_calc2_antiderivatives.sql',
    '20260906161000_improve_mvp_math_and_solutions.sql',
    '20260906162000_seed_calc2_definite_integrals.sql',
    '20260906163000_seed_calc2_substitution.sql',
    '20260906164000_return_correct_option_after_attempt.sql',
    '20260907110000_draft_calc2_batch_62.sql',
    '20260907110100_draft_calc2_batch_63.sql',
    '20260907110200_draft_calc2_batch_64.sql',
    '20260907110300_draft_calc2_batch_65.sql',
    '20260907110400_draft_calc2_batch_66.sql',
    '20260907110500_draft_calc2_batch_67.sql',
    '20260907110600_draft_calc2_batch_68.sql',
    '20260907120000_correct_existing_calc2_answers.sql',
    '20260907130000_require_published_questions_for_learner_rpcs.sql',
    '20260908120000_improve_calc2_draft_editorial_quality.sql',
    '20260908130000_repair_mvp_matrix_rendering_and_answer_key.sql',
    '20260909100000_enrich_published_antiderivative_solutions.sql',
    '20260909103000_enrich_published_definite_integral_solutions.sql',
    '20260909110000_enrich_published_substitution_solutions.sql',
    '20260909123000_enforce_five_step_mvp_solutions.sql',
    '20260909123500_enforce_five_step_draft_solutions.sql',
    '20260909153000_publish_reviewed_calc2_authorial_batches.sql',
  ],
  'calculo-1': [
    '20260909130000_add_calculus_1_catalogue.sql',
    '20260909133000_seed_calculus_1_batch_01.sql',
    '20260909140000_repair_calculus_1_batch_01_math_markup.sql',
    '20260909143000_seed_calculus_1_batch_02.sql',
    '20260909150000_seed_calculus_1_batch_03.sql',
    '20260909170000_seed_calculus_1_batch_04.sql',
    '20260909171000_seed_calculus_1_batch_05.sql',
    '20260909171500_reorganize_calculus_1_and_move_integrals_to_calculus_2.sql',
    '20260909172000_seed_calculus_1_batch_06.sql',
    '20260909173000_seed_calculus_1_batch_07.sql',
  ],
  'calculo-vetorial': [
    '20260909160000_expand_vector_calculus_catalogue.sql',
    '20260909161000_seed_vector_calculus_batch_01.sql',
    '20260909162000_seed_vector_calculus_batch_02.sql',
    '20260909163000_seed_vector_calculus_batch_03.sql',
    '20260909164000_seed_vector_calculus_batch_04.sql',
    '20260909165000_seed_vector_calculus_batch_05.sql',
    '20260909166000_seed_vector_calculus_batch_06.sql',
    '20260909167000_seed_vector_calculus_batch_07.sql',
    '20260909168000_seed_vector_calculus_batch_08.sql',
  ],
};

const maxBytesPerPackage = 650_000;
mkdirSync(outputDirectory, { recursive: true });
for (const file of readdirSync(outputDirectory)) {
  if (file.endsWith('.sql')) rmSync(resolve(outputDirectory, file));
}

for (const [name, migrations] of Object.entries(groups)) {
  const entries = migrations.map((migration) => {
    const content = readFileSync(
      resolve(root, 'supabase/migrations', migration),
      'utf8',
    ).trim();
    return { migration, content, bytes: Buffer.byteLength(content) };
  });
  const parts = [];
  let current = [];
  let currentBytes = 0;
  for (const entry of entries) {
    if (current.length && currentBytes + entry.bytes > maxBytesPerPackage) {
      parts.push(current);
      current = [];
      currentBytes = 0;
    }
    current.push(entry);
    currentBytes += entry.bytes;
  }
  if (current.length) parts.push(current);

  for (const [index, part] of parts.entries()) {
    const header = [
      `-- Pacote ${name}: parte ${index + 1} de ${parts.length}.`,
      '-- Execute cada parte uma única vez, sempre em ordem numérica.',
      '-- Não execute depois as migrations individuais já incorporadas aqui.',
      '-- Pré-requisito: o schema base da Arc já deve existir.',
      '-- Ordem segura dos conjuntos: calculo-2, calculo-1, calculo-vetorial.',
      '',
    ].join('\n');
    const body = part
      .map(
        ({ migration, content }) => `-- ===== ${migration} =====\n${content}`,
      )
      .join('\n\n');
    writeFileSync(
      resolve(
        outputDirectory,
        `${name}-parte-${String(index + 1).padStart(2, '0')}.sql`,
      ),
      header + body + '\n',
    );
  }
}

console.log(`Pacotes criados em ${outputDirectory}`);
