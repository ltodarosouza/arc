import { AppShell } from '@/components/app-shell';
import { SubjectsManager } from '@/components/subjects-manager';

export default function SubjectsPage() {
  return (
    <AppShell active="subjects">
      <section className="arc-page arc-page--reading">
        <h1 className="arc-title">Minhas disciplinas</h1>
        <p className="mt-3 text-sm text-[var(--arc-text-muted)]">
          Escolha o que aparece no Início e em Questões.
        </p>
        <SubjectsManager />
      </section>
    </AppShell>
  );
}
