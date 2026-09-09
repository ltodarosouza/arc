'use client';
// oiii

import type { ReactNode } from 'react';
import { Compass, House, Layers3, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/components/auth-provider';
import { AuthScreen } from '@/components/auth-screen';
import { isSupabaseConfigured } from '@/lib/supabase/client';

type Destination = 'home' | 'explore' | 'progress' | 'subjects' | 'account';

const destinations = [
  { id: 'home' as const, href: '/', label: 'Início', icon: House },
  {
    id: 'explore' as const,
    href: '/explore',
    label: 'Questões',
    icon: Compass,
  },
  {
    id: 'progress' as const,
    href: '/progress',
    label: 'Progresso',
    icon: TrendingUp,
  },
  {
    id: 'subjects' as const,
    href: '/subjects',
    label: 'Disciplinas',
    icon: Layers3,
  },
];

export function AppShell({
  active,
  children,
}: {
  active: Destination;
  children: ReactNode;
}) {
  const { session, ready: authReady, profileName } = useAuth();
  const profileLabel = profileName ?? 'Minha conta';
  if (!authReady)
    return (
      <main
        aria-busy="true"
        className="min-h-screen bg-[var(--background)] px-5 py-12"
      >
        <div className="mx-auto max-w-md">
          <p role="status" className="arc-caption">
            Carregando sua conta…
          </p>
          <div
            aria-hidden="true"
            className="mt-6 h-48 animate-pulse rounded-[var(--arc-radius-card)] bg-[var(--arc-surface-subtle)]"
          />
        </div>
      </main>
    );
  if (!session && isSupabaseConfigured()) return <AuthScreen />;

  return (
    <main className="min-h-screen bg-[var(--background)] pb-[calc(8rem+env(safe-area-inset-bottom))] text-[var(--foreground)] md:pb-12">
      <a
        className="sr-only fixed left-4 top-4 z-50 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] focus:not-sr-only"
        href="#main-content"
      >
        Pular para o conteúdo
      </a>
      <header className="arc-sticky-header">
        <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between gap-3 px-5 sm:px-8">
          <Link
            className="flex min-h-11 items-center gap-2.5 font-semibold tracking-[-0.045em]"
            href="/"
          >
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-[11px] bg-[var(--primary)] text-sm font-semibold text-[var(--primary-foreground)]"
            >
              a
            </span>
            <span className="text-[18px]">arc</span>
          </Link>
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-1 text-sm text-[var(--arc-text-muted)] md:flex"
          >
            {destinations.map((destination) => (
              <Link
                aria-current={active === destination.id ? 'page' : undefined}
                className={`flex min-h-11 items-center rounded-lg px-4 py-2 transition-colors duration-200 ${active === destination.id ? 'bg-[var(--arc-accent)] font-medium text-[var(--primary)]' : 'hover:bg-black/[0.035] hover:text-[var(--foreground)]'}`}
                href={destination.href}
                key={destination.id}
              >
                {destination.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              aria-label="Abrir perfil"
              aria-current={active === 'account' ? 'page' : undefined}
              href="/account"
              className="flex min-h-11 items-center gap-2 rounded-full px-3 hover:bg-[var(--arc-accent)]"
            >
              <span className="hidden max-w-36 truncate text-sm sm:block">
                {profileLabel}
              </span>
              <span
                className="grid size-9 place-items-center rounded-full bg-[var(--arc-accent)]"
                aria-hidden="true"
              >
                {profileLabel.charAt(0).toUpperCase()}
              </span>
            </Link>
          </div>
        </div>
      </header>
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <nav
        aria-label="Navegação móvel"
        className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-10 flex min-h-[72px] items-center justify-around rounded-2xl border border-[var(--border)] bg-[var(--arc-surface)]/90 p-1.5 shadow-[0_12px_40px_rgba(38,57,80,0.12)] backdrop-blur md:hidden"
      >
        {destinations.map((destination) => {
          const Icon = destination.icon;
          const isActive = active === destination.id;
          return (
            <Link
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium transition-colors duration-200 ${isActive ? 'bg-[var(--arc-accent)] text-[#263950]' : 'text-[var(--arc-text-muted)]'}`}
              href={destination.href}
              key={destination.id}
            >
              <Icon aria-hidden="true" className="size-4" />
              {destination.label}
            </Link>
          );
        })}
      </nav>
    </main>
  );
}
