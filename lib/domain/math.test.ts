import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { normalizeLegacyMath } from './math';

describe('stored mathematical notation', () => {
  it('preserves canonical matrix row separators', () => {
    const matrix = String.raw`\begin{pmatrix}2&1\\3&4\end{pmatrix}`;
    expect(normalizeLegacyMath(matrix)).toBe(matrix);
    expect(() =>
      katex.renderToString(normalizeLegacyMath(matrix), { throwOnError: true }),
    ).not.toThrow();
  });

  it('renders the MVP determinant statement as two matrix rows', () => {
    const statement = String.raw`Calcule o determinante da matriz $\begin{pmatrix}2 & 1\\ 3 & 4\end{pmatrix}$.`;
    const matrix = statement.match(/\$([^$]+)\$/)?.[1];

    expect(matrix).toBeDefined();
    expect(normalizeLegacyMath(matrix!)).toBe(
      String.raw`\begin{pmatrix}2 & 1\\ 3 & 4\end{pmatrix}`,
    );
    const rendered = katex.renderToString(normalizeLegacyMath(matrix!), {
      throwOnError: true,
    });

    expect(rendered.match(/<mtr>/g)).toHaveLength(2);
  });

  it('decodes legacy SQL escaping once, including matrix rows', () => {
    const canonical = String.raw`\begin{pmatrix}2&1\\3&4\end{pmatrix}`;
    expect(normalizeLegacyMath(canonical.replaceAll('\\', '\\\\'))).toBe(
      canonical,
    );
    expect(normalizeLegacyMath(String.raw`\frac{1}{2}`)).toBe(
      String.raw`\frac{1}{2}`,
    );
  });
});
