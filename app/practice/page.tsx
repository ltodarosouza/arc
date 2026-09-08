import { AppShell } from '@/components/app-shell';
import { PracticeSurface } from '@/components/practice-surface';

export default function PracticePage() {
  return (
    <AppShell active="explore">
      <section className="arc-page arc-page--reading">
        <h1 className="arc-title">Praticar</h1>
        <PracticeSurface />
      </section>
    </AppShell>
  );
}
