import { describe, expect, it } from 'vitest';

import {
  calculusOneSubject,
  calculusOneTaxonomyNodes,
} from '@/lib/data/calculus-1-taxonomy';
import { validateTaxonomy } from '@/lib/domain/taxonomy';

describe('Cálculo I taxonomy', () => {
  it('has a valid structure attached to its subject', () => {
    expect(validateTaxonomy(calculusOneTaxonomyNodes)).toEqual([]);
    expect(calculusOneTaxonomyNodes).not.toHaveLength(0);
    expect(calculusOneTaxonomyNodes.some((node) => node.kind === 'unit')).toBe(
      true,
    );
    expect(
      calculusOneTaxonomyNodes.every(
        (node) => node.subjectId === calculusOneSubject.id,
      ),
    ).toBe(true);
  });
});
