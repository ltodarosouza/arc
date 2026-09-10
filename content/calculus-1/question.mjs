// Shared authoring helper for the reviewed Cálculo I multiple-choice batches.
// It deliberately keeps every pedagogical sentence tied to the item data.
const latexCommands = /(?<![\\a-zA-Z])(lim|to|sqrt|frac|infty|mathbb|setminus|ne|le|ge|sin|cos|tan|sec|log|ln|pi|pm|circ|prime|primeprime|begin|end|cases)(?![a-zA-Z])/g;

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
      .replace(/([a-zA-Z0-9])circ(?=\s)/g, '$1\\circ')
      .replace(/toinfty/g, 'to\\infty')
      .replace(/xln(?=\d|\s|[)}])/g, 'x\\ln')
      .replace(/([a-zA-Z])le(?=[^a-zA-Z]|$)/g, '$1\\le')
      .replace(/([a-zA-Z])ge(?=[^a-zA-Z]|$)/g, '$1\\ge')
      .replace(/([a-zA-Z])ne(?=[^a-zA-Z]|$)/g, '$1\\ne');
    return `$${repairedEscapes.replace(latexCommands, '\\$1')}$`;
  });
}

function normalizeStatement(markdown) {
  const derivativeAtPoint = markdown.replace(
    /^Calcule d\/dx,\((.+)\)\$ em \$x=(.+)\$\.$/,
    'Calcule $\\frac{d}{dx}($1)$ em $x=$2$.',
  );
  const repairedDerivative = derivativeAtPoint.replace(
    /^Calcule d\/dx,\((.+)\)\.$/,
    'Calcule $\\frac{d}{dx}($1)$.',
  );
  return normalizeMath(repairedDerivative);
}

export function q(id, difficulty, focus, statement, answer, distractors, principle, action, check) {
  const normalizedStatement = normalizeStatement(statement);
  const normalizedAnswer = normalizeMath(answer);
  const normalizedDistractors = distractors.map(normalizeMath).map((distractor, index) =>
    distractor === normalizedAnswer
      ? `O resultado obtido ao aplicar incorretamente a regra ${index + 1}.`
      : distractor,
  );
  const normalizedPrinciple = normalizeMath(principle);
  const normalizedAction = normalizeMath(action);
  const normalizedCheck = normalizeMath(check);
  const rotation = Number(id.slice(-3)) % 4;
  const options = [normalizedAnswer, ...normalizedDistractors];
  const orderedOptions = options.map((_, index) => options[(index - rotation + 4) % 4]);
  const correct = orderedOptions.indexOf(normalizedAnswer);
  const elimination = normalizedDistractors
    .map((distractor, index) => {
      const reasons = [normalizedAction, normalizedPrinciple, normalizedCheck];
      return `A opção “${distractor}” é descartada porque ${reasons[index].charAt(0).toLowerCase()}${reasons[index].slice(1)}`;
    })
    .join(' ');

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
      `Nesta questão de ${focus}, use a propriedade: ${normalizedPrinciple}`,
      normalizedAction,
      normalizedCheck,
    ],
    explanation: `${normalizedPrinciple} ${normalizedAction} ${normalizedCheck}`,
    solution: [
      ['Leia a condição', `Os dados fornecidos são: ${normalizedStatement}`],
      ['Justifique o método', normalizedPrinciple],
      ['Faça o cálculo', normalizedAction],
      ['Elimine cada distrator', `${elimination} Portanto, a única opção compatível é “${normalizedAnswer}”.`],
      ['Cheque a conclusão', normalizedCheck],
    ],
  };
}
