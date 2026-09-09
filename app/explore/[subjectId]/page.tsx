'use client';

import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { ArcCard } from '@/components/arc-ui';
import { FeedbackState } from '@/components/feedback-state';
import { useCatalogue } from '@/lib/data/use-catalogue';
import { getTaxonomyBranch } from '@/lib/domain/taxonomy';

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { catalogue, isLoading, error } = useCatalogue();
  const subject = catalogue?.subjects.find(
    (item) => item.id === subjectId || item.slug === subjectId,
  );
  const unitNodes =
    catalogue?.taxonomyNodes.filter(
      (item) => item.subjectId === subject?.id && item.kind === 'unit',
    ) ?? [];
  const units = unitNodes.map((unit) => {
    const branch = getTaxonomyBranch(unit.id, catalogue?.taxonomyNodes ?? []);
    const subtopicCount = (catalogue?.taxonomyNodes ?? []).filter(
      (item) => item.parentId === unit.id,
    ).length;
    const count = (catalogue?.questions ?? []).filter(
      (question) =>
        question.subjectId === subject?.id &&
        question.taxonomyTags.some((tag) =>
          branch.includes(tag.taxonomyNodeId),
        ),
    ).length;
    return { ...unit, count, subtopicCount };
  });
  return (
    <AppShell active="explore">
      <section className="arc-page arc-page--reading">
        <a
          className="inline-flex items-center gap-1 text-sm font-medium text-[#46657a] hover:underline"
          href="/explore"
        >
          <ArrowLeft className="size-4" /> Minhas disciplinas
        </a>
        <h1 className="arc-title mt-5">{subject?.name ?? 'Disciplina'}</h1>
        {subject && (
          <p className="mt-3 text-sm text-[var(--arc-text-muted)]">
            {subject.description}
          </p>
        )}
        {subject && (
          <a
            className="arc-action mt-6"
            href={`/questions?subject=${subject?.slug ?? subjectId}`}
          >
            Ver todas <ChevronRight className="size-4" />
          </a>
        )}
        {isLoading ? (
          <ArcCard className="mt-8 h-56 animate-pulse bg-[var(--arc-surface-subtle)]">
            <span className="sr-only">Carregando assuntos</span>
          </ArcCard>
        ) : error ? (
          <FeedbackState
            className="mt-8"
            title="Os assuntos não carregaram"
            description="Tente novamente para abrir esta disciplina."
            tone="error"
            action={
              <button
                className="arc-link"
                onClick={() => window.location.reload()}
              >
                Tentar novamente
              </button>
            }
          />
        ) : !subject ? (
          <FeedbackState
            className="mt-8"
            title="Disciplina não encontrada"
            description="Volte a Questões e escolha uma disciplina disponível."
          />
        ) : (
          <section className="arc-section">
            <h2 className="arc-section-title">
              Áreas de estudo{' '}
              <span className="ml-2 text-sm font-normal text-[var(--arc-text-muted)]">
                {units.length}
              </span>
            </h2>
            <div className="mt-4 divide-y divide-[var(--border)]">
              {units.map((unit) => (
                <a
                  className="group flex items-center justify-between gap-4 rounded-lg px-3 py-5 transition-colors hover:bg-[var(--arc-surface)]"
                  href={`/questions?subject=${subject?.slug ?? subjectId}&unit=${unit.slug}`}
                  key={unit.id}
                >
                  <span className="font-medium">
                    {unit.name}{' '}
                    <span className="mt-1 block text-sm font-normal text-[var(--arc-text-muted)]">
                      {unit.subtopicCount}{' '}
                      {unit.subtopicCount === 1 ? 'subassunto' : 'subassuntos'}{' '}
                      · {unit.count} {unit.count === 1 ? 'questão' : 'questões'}
                    </span>
                  </span>
                  <ChevronRight className="size-5 text-[#46657a] transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
            {!units.length && (
              <p className="arc-caption py-5">Áreas em preparação.</p>
            )}
          </section>
        )}
      </section>
    </AppShell>
  );
}
