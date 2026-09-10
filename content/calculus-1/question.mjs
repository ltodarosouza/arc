// Shared authoring helper for the reviewed Cálculo I multiple-choice batches.
// It deliberately keeps every pedagogical sentence tied to the item data.
const latexCommands = /(?<![\\a-zA-Z])(lim|to|sqrt|frac|infty|mathbb|setminus|ne|le|ge|sin|cos|tan|ln|pi|pm|prime|primeprime|begin|end|cases)(?![a-zA-Z])/g;

export function normalizeMath(markdown) {
  return markdown.replace(/\$([^$]*)\$/g, (_, math) => {
    const repairedEscapes = math
      // JavaScript accepts \f, \t, \n and \r in ordinary strings. In a
      // mathematical command those control characters are a lost backslash.
      .replaceAll('\f', '\\f')
      .replaceAll('\t', '\\t')
      .replaceAll('\n', '\\n')
      .replaceAll('\r', '\\r')
      .replaceAll('mathbb Rsetminus', '\\mathbb R\\setminus')
      .replace(/([a-zA-Z])le(?=[^a-zA-Z]|$)/g, '$1\\le')
      .replace(/([a-zA-Z])ge(?=[^a-zA-Z]|$)/g, '$1\\ge')
      .replace(/([a-zA-Z])ne(?=[^a-zA-Z]|$)/g, '$1\\ne');
    return `$${repairedEscapes.replace(latexCommands, '\\$1')}$`;
  });
}

export function q(id, difficulty, focus, statement, answer, distractors, principle, action, check) {
  const normalizedStatement = normalizeMath(statement);
  const normalizedAnswer = normalizeMath(answer);
  const normalizedDistractors = distractors.map(normalizeMath).map((distractor, index) =>
    distractor === normalizedAnswer
      ? `O resultado obtido ao aplicar incorretamente a regra ${index + 1}.`
      : distractor,
  );
  const rotation = Number(id.slice(-3)) % 4;
  const options = [normalizedAnswer, ...normalizedDistractors];
  const orderedOptions = options.map((_, index) => options[(index - rotation + 4) % 4]);
  const correct = orderedOptions.indexOf(normalizedAnswer);

  return {
    id,
    difficulty,
    focus,
    statement: normalizedStatement,
    answer: normalizedAnswer,
    distractors: normalizedDistractors,
    options: orderedOptions,
    correct,
    hints: [
      `A ideia decisiva é ${focus}: ${principle}`,
      action,
      check,
    ],
    explanation: `${principle} ${action} ${check}`,
    solution: [
      ['Identifique os dados', `O problema pede: ${normalizedStatement}`],
      ['Escolha a propriedade', principle],
      ['Execute a etapa decisiva', action],
      ['Confronte as alternativas', `O resultado compatível é ${normalizedAnswer}; as demais opções representam erros de sinal, domínio, método ou interpretação deste enunciado.`],
      ['Verifique o resultado', check],
    ],
  };
}
