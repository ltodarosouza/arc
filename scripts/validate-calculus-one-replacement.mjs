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
  if (question.distractors.length !== 3 || question.options.length !== 4 || question.hints.length !== 3 || question.solution.length !== 5)
    throw new Error(`Estrutura incompleta: ${question.id}`);
  if (new Set(question.options).size !== 4 || question.options[question.correct] !== question.answer)
    throw new Error(`Alternativas ou gabarito inválidos: ${question.id}`);
  const text = [question.statement, ...question.options, ...question.hints, ...question.solution.flat()].join(' ');
  if (/item anterior|questão anterior|mesma funç/i.test(text))
    throw new Error(`Dependência indevida: ${question.id}`);
  if (/alternativa oposta|condição irrelevante/i.test(text))
    throw new Error(`Distrator genérico: ${question.id}`);
  if (/demais opções representam erros|O problema pede:|A ideia decisiva/i.test(text))
    throw new Error(`Solução-modelo genérica: ${question.id}`);
  if (/Resolva \$\d+\^x\s*=/i.test(question.statement))
    throw new Error(`Treino algébrico isolado: ${question.id}`);
  if ((text.match(/\$/g) ?? []).length % 2)
    throw new Error(`Delimitadores LaTeX inválidos: ${question.id}`);
  if (/\bcirc\b|toinfty|d\/dx,|mathbb Rsetminus|\$x(?:le|ge|ne)/.test(text))
    throw new Error(`Notação matemática não normalizada: ${question.id}`);
  if (/[\f\t\r\n]/.test(text.replace(/\s/g, ' ')))
    throw new Error(`Escape LaTeX corrompido: ${question.id}`);
}
if (bank.length !== 100) throw new Error(`Esperadas 100 questões revisadas; recebidas ${bank.length}.`);
const limitQuestions = bank.filter((question) => question.id.startsWith('c1-r03-'));
const requiredLimitCompetencies = [
  ['substituição direta', /substituiç[aã]o direta/],
  ['fatoração', /fat(or|e)/],
  ['racionalização', /racionaliz/],
  ['limites laterais', /laterais/],
  ['limites no infinito', /infty|infinito/],
  ['assíntotas', /assíntota/],
  ['continuidade', /contínua|continuidade/],
];
const corpus = limitQuestions.map((question) => [question.statement, ...question.hints].join(' ').toLowerCase()).join(' ');
for (const [competency, pattern] of requiredLimitCompetencies) {
  if (!pattern.test(corpus)) throw new Error(`Cobertura de limites ausente: ${competency}`);
}
console.log({ questions: bank.length, uniqueStatements: statements.size, limitQuestions: limitQuestions.length });
