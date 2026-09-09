import { describe, expect, it } from 'vitest';

import {
  calculusOneSubject,
  calculusOneTaxonomyNodes,
} from '@/lib/data/calculus-1-taxonomy';
import { validateTaxonomy } from '@/lib/domain/taxonomy';

describe('Cálculo I taxonomy', () => {
  it('has a valid complete Volume I structure', () => {
    expect(validateTaxonomy(calculusOneTaxonomyNodes)).toEqual([]);
    expect(
      calculusOneTaxonomyNodes.filter((node) => node.kind === 'unit'),
    ).toHaveLength(8);
    expect(
      calculusOneTaxonomyNodes.every(
        (node) => node.subjectId === calculusOneSubject.id,
      ),
    ).toBe(true);
  });
});
