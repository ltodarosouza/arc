import { AppShell } from '@/components/app-shell';
import { SubjectsManager } from '@/components/subjects-manager';

export default function SubjectsPage() {
  return (
    <AppShell active="subjects">
      <section className="mx-auto max-w-4xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <p className="text-sm font-medium text-[#6b766f]">Disciplinas</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.065em] sm:text-5xl">
          Seu espaço, suas matérias.
        </h1>
        <p className="mt-4 max-w-lg text-[15px] leading-6 text-[#68706b]">
          Use esta área para manter as disciplinas que você quer encontrar
          rapidamente no Início.
        </p>
        <SubjectsManager />
      </section>
    </AppShell>
  );
}
