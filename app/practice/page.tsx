import { AppShell } from '@/components/app-shell';
import { PracticeSurface } from '@/components/practice-surface';

export default function PracticePage() {
  return <AppShell active="explore"><section className="mx-auto max-w-4xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16"><p className="text-sm font-medium text-[#6b766f]">Praticar</p><h1 className="mt-3 text-4xl font-medium tracking-[-0.065em] sm:text-5xl">Uma questão por vez.</h1><PracticeSurface /></section></AppShell>;
}
