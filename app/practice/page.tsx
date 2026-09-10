import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { PracticeSurface } from '@/components/practice-surface';

export default function PracticePage() {
  return (
    <AppShell active="explore">
      <section className="arc-page arc-page--reading">
        <PageHeader title="Praticar" />
        <PracticeSurface />
      </section>
    </AppShell>
  );
}
