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
