import { AppShell } from '@/components/app-shell';
import { AnimatedTitle } from '@/components/animated-title';
import { SubjectsManager } from '@/components/subjects-manager';

export default function SubjectsPage() {
  return (
    <AppShell active="subjects">
      <section className="arc-page arc-page--reading">
        <div className="animate-enter max-w-xl">
          <AnimatedTitle>Minhas disciplinas</AnimatedTitle>
          <p className="mt-3 text-sm text-muted-foreground">
            Escolha o que aparece no Início e em Questões.
          </p>
        </div>
        <SubjectsManager />
      </section>
    </AppShell>
  );
}
