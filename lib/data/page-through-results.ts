export const queryPageSize = 500;

type PageResult<Row> = {
  data: Row[] | null;
  error: unknown;
};

/**
 * Collects every page from PostgREST-style queries without relying on the API
 * row cap. Callers must provide a deterministic order before applying range.
 */
export async function collectAllPages<Row>(
  loadPage: (from: number, to: number) => PromiseLike<PageResult<Row>>,
  pageSize = queryPageSize,
): Promise<Row[]> {
  if (!Number.isSafeInteger(pageSize) || pageSize < 1)
    throw new Error('Page size must be a positive integer.');

  const rows: Row[] = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await loadPage(from, from + pageSize - 1);
    if (error) throw error;
    const page = data ?? [];
    rows.push(...page);
    if (page.length < pageSize) return rows;
  }
}
