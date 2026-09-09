const batches = await Promise.all(
  [1, 2, 3, 4, 5, 6].map(async (number) => {
    try {
      return (await import(`../content/calculus-1/replacement-batch-0${number}.mjs`)).default;
    } catch {
      return [];
    }
  }),
);

const bank = batches.flat();
const statements = new Set(bank.map((question) => question.statement));
if (statements.size !== bank.length) throw new Error('Há enunciados repetidos.');
for (const question of bank) {
  if (question.distractors.length !== 3 || question.hints.length !== 3 || question.solution.length !== 5)
    throw new Error(`Estrutura incompleta: ${question.id}`);
}
console.log({ questions: bank.length, uniqueStatements: statements.size });
