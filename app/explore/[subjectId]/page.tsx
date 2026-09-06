'use client';

import { ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { ArcCard } from '@/components/arc-ui';
import { useCatalogue } from '@/lib/data/use-catalogue';

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { catalogue } = useCatalogue();
  const subject = catalogue?.subjects.find((item) => item.id === subjectId);
  const topics =
    catalogue?.taxonomyNodes.filter(
      (item) => item.subjectId === subjectId && item.kind === 'topic',
    ) ?? [];
  return (
    <AppShell active="explore">
      <section className="mx-auto max-w-4xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <a
          className="text-sm font-medium text-[#46657a] hover:underline"
          href="/explore"
        >
          Questões
        </a>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.06em] sm:text-5xl">
          {subject?.name ?? 'Disciplina'}
        </h1>
        <p className="mt-3 text-[var(--arc-text-muted)]">
          Escolha um assunto ou pratique todas as questões.
        </p>
        <a
          className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline"
          href={`/questions?subject=${subjectId}`}
        >
          Ver todas <ChevronRight className="size-4" />
        </a>
        <div className="mt-8 grid gap-3">
          {topics.map((topic) => (
            <a
              className="group"
              href={`/questions?subject=${subjectId}&topic=${topic.id}`}
              key={topic.id}
            >
              <ArcCard className="flex items-center justify-between p-5 hover:-translate-y-0.5 hover:border-[#becdc9] hover:shadow-[0_18px_45px_rgba(38,57,80,0.08)]">
                <span className="font-medium">{topic.name}</span>
                <ChevronRight className="size-5 text-[#46657a] transition-transform group-hover:translate-x-0.5" />
              </ArcCard>
            </a>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
