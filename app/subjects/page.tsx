import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { SubjectsManager } from '@/components/subjects-manager';

export default function SubjectsPage() {
  return (
    <AppShell active="subjects">
      <section className="arc-page arc-page--reading">
        <PageHeader
          title="Minhas disciplinas"
          description="Escolha o que aparece no Início e em Questões."
        />
        <SubjectsManager />
      </section>
    </AppShell>
  );
}
