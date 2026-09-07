/** Old SQL seeds doubled every backslash; canonical LaTeX must retain matrix rows. */
export function normalizeLegacyMath(expression: string) {
  const legacyCommand =
    /\\\\(?:int|frac|sqrt|sum|lim|begin|end|sin|sen|cos|tan|ln|pi|infty|cdot|left|right|arctan|sec)\b/;
  return legacyCommand.test(expression)
    ? expression.replace(/\\\\/g, '\\')
    : expression;
}
