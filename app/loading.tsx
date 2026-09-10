export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="arc-page arc-page--reading"
    >
      <span className="sr-only">Carregando…</span>
      <div
        aria-hidden="true"
        className="h-11 w-2/3 animate-pulse rounded-control bg-surface-subtle"
      />
      <div className="mt-8 grid gap-4">
        <div className="h-40 animate-pulse rounded-card bg-surface-subtle" />
        <div className="h-40 animate-pulse rounded-card bg-surface-subtle" />
      </div>
    </div>
  );
}
