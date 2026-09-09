import { describe, expect, it } from 'vitest';

import { collectAllPages } from '@/lib/data/page-through-results';

describe('collectAllPages', () => {
  for (const total of [499, 500, 501]) {
    it(`collects ${total} rows without truncating the page boundary`, async () => {
      const rows = Array.from({ length: total }, (_, id) => id);
      const requestedPages: [number, number][] = [];

      await expect(
        collectAllPages((from, to) => {
          requestedPages.push([from, to]);
          return Promise.resolve({
            data: rows.slice(from, to + 1),
            error: null,
          });
        }),
      ).resolves.toEqual(rows);

      expect(requestedPages).toEqual(
        total < 500
          ? [[0, 499]]
          : [
              [0, 499],
              [500, 999],
            ],
      );
    });
  }

  it('surfaces an error instead of returning a partial result', async () => {
    await expect(
      collectAllPages((from) =>
        Promise.resolve({
          data: from === 0 ? Array.from({ length: 500 }, (_, id) => id) : null,
          error: from === 0 ? null : new Error('Unavailable'),
        }),
      ),
    ).rejects.toThrow('Unavailable');
  });

  it('continues past a 1,000-row API cap', async () => {
    const rows = Array.from({ length: 1001 }, (_, id) => id);

    await expect(
      collectAllPages(
        (from, to) =>
          Promise.resolve({
            data: rows.slice(from, to + 1),
            error: null,
          }),
        1000,
      ),
    ).resolves.toEqual(rows);
  });
});
