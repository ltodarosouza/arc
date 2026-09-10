import { ArcCard } from '@/components/arc-ui';

export function QuestionListSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Carregando questões"
      className="mt-8 grid gap-3"
    >
      {[0, 1, 2].map((item) => (
        <ArcCard className="animate-pulse p-5 sm:p-6" key={item}>
          <div className="h-4 w-24 rounded-full bg-surface-subtle" />
          <div className="mt-6 h-6 max-w-xl rounded-full bg-surface-subtle" />
          <div className="mt-3 h-6 w-3/5 rounded-full bg-surface-subtle" />
          <div className="mt-7 h-8 w-28 rounded-full bg-surface-subtle" />
        </ArcCard>
      ))}
    </div>
  );
}
