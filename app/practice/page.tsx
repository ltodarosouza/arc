import { AppShell } from '@/components/app-shell';
import { AnimatedTitle } from '@/components/animated-title';
import { PracticeSurface } from '@/components/practice-surface';

export default function PracticePage() {
  return (
    <AppShell active="explore">
      <section className="arc-page arc-page--reading">
        <AnimatedTitle>Praticar</AnimatedTitle>
        <PracticeSurface />
      </section>
    </AppShell>
  );
}
