'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
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
  const { session, ready: authReady, profileName, signOut } = useAuth();
  const profileLabel = profileName ?? 'Minha conta';
  const [isNavigating, setIsNavigating] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  async function leave() {
    setLeaving(true);
    setLogoutError(null);
    try {
      await signOut();
    } catch (failure) {
      setLogoutError(
        failure instanceof Error ? failure.message : 'Não foi possível sair.',
      );
      setLeaving(false);
    }
  }

  useEffect(() => setIsNavigating(false), [active]);

  if (!authReady)
    return <main className="min-h-screen bg-[var(--background)]" />;
  if (!session && isSupabaseConfigured()) return <AuthScreen />;

  return (
    <main className="min-h-screen bg-[var(--background)] pb-[calc(9.5rem+env(safe-area-inset-bottom))] text-[var(--foreground)] sm:pb-12">
      <span
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[var(--arc-accent-strong)] transition-transform duration-300 ease-out ${isNavigating ? 'scale-x-100' : 'scale-x-0'}`}
      />
      <a
        className="sr-only fixed left-4 top-4 z-50 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] focus:not-sr-only"
        href="#main-content"
      >
        Pular para o conteúdo
      </a>
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          className="flex min-h-11 items-center gap-2.5 font-semibold tracking-[-0.045em]"
          href="/"
        >
          <span className="grid size-8 place-items-center rounded-[11px] bg-[var(--primary)] text-sm text-[var(--primary-foreground)]">
            a
          </span>
          <span className="text-[18px]">arc</span>
        </Link>
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--arc-surface)]/75 p-1 text-sm text-[var(--arc-text-muted)] md:flex"
        >
          {destinations.map((destination) => (
            <Link
              aria-current={active === destination.id ? 'page' : undefined}
              className={`flex min-h-11 items-center rounded-full px-4 py-2 transition-all duration-300 ${active === destination.id ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_2px_8px_rgba(38,57,80,0.16)]' : 'hover:bg-black/[0.035] hover:text-[var(--foreground)]'}`}
              href={destination.href}
              key={destination.id}
              onNavigate={() => setIsNavigating(true)}
            >
              {destination.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            aria-label="Abrir perfil"
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
          {session && (
            <button
              disabled={leaving}
              className="min-h-11 px-2 text-sm underline"
              onClick={() => void leave()}
            >
              {leaving ? 'Saindo…' : 'Sair'}
            </button>
          )}
        </div>
      </header>
      {logoutError && (
        <p
          role="alert"
          className="mx-auto max-w-6xl px-5 text-[var(--arc-error-text)]"
        >
          {logoutError}
        </p>
      )}
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
              className={`flex min-h-14 min-w-[70px] flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition-all duration-300 ${isActive ? 'bg-[var(--arc-accent)] text-[#263950] shadow-[0_2px_8px_rgba(38,57,80,0.08)]' : 'text-[var(--arc-text-muted)] active:scale-[0.97]'}`}
              href={destination.href}
              key={destination.id}
              onNavigate={() => setIsNavigating(true)}
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
