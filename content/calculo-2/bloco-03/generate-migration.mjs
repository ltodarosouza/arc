import { renderMigration, validateBank } from '../question-bank-utils.mjs';
import { questions } from './questions.mjs';

validateBank(questions, 34);
renderMigration({
  items: questions,
  output: new URL('../../../supabase/migrations/20260910150000_seed_calculus_2_reconstruction_block_03.sql', import.meta.url),
  sourceId: '10000000-0000-4000-8000-000000009903',
  sourceLabel: 'Arc original — Cálculo II, reconstrução, bloco 03',
  questionBase: 993000,
  expectedCount: 34,
});
