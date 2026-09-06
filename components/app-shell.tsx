'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Compass, House, Layers3, TrendingUp } from 'lucide-react';

import { AuthScreen } from '@/components/auth-screen';
import {
  ensureLearnerSession,
  getSupabaseClient,
  isSupabaseConfigured,
} from '@/lib/supabase/client';

type Destination = 'home' | 'explore' | 'progress' | 'subjects';

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
  const [authReady, setAuthReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setAuthReady(true);
      return;
    }
    const supabase = getSupabaseClient();
    void ensureLearnerSession()
      .then((session) => {
        setUserEmail(session.user.email ?? null);
        setIsAnonymous(Boolean(session.user.is_anonymous));
        setAuthReady(true);
      })
      .catch(() => setAuthReady(true));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
      setIsAnonymous(Boolean(session?.user.is_anonymous));
      setAuthReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (isSupabaseConfigured()) await getSupabaseClient().auth.signOut();
  };
  if (!authReady)
    return <main className="min-h-screen bg-[var(--background)]" />;
  if (!userEmail && !isAnonymous && isSupabaseConfigured())
    return <AuthScreen />;

  return (
    <main className="min-h-screen bg-[var(--background)] pb-24 text-[var(--foreground)] sm:pb-10">
      <a
        className="sr-only fixed left-4 top-4 z-50 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] focus:not-sr-only"
        href="#main-content"
      >
        Pular para o conteúdo
      </a>
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          className="flex items-center gap-2.5 font-semibold tracking-[-0.045em]"
          href="/"
        >
          <span className="grid size-8 place-items-center rounded-[11px] bg-[var(--primary)] text-sm text-[var(--primary-foreground)]">
            a
          </span>
          <span className="text-[18px]">arc</span>
        </a>
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--arc-surface)]/75 p-1 text-sm text-[var(--arc-text-muted)] md:flex"
        >
          {destinations.map((destination) => (
            <a
              aria-current={active === destination.id ? 'page' : undefined}
              className={`rounded-full px-4 py-2 transition-all duration-300 ${active === destination.id ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_2px_8px_rgba(38,57,80,0.16)]' : 'hover:bg-black/[0.035] hover:text-[var(--foreground)]'}`}
              href={destination.href}
              key={destination.id}
            >
              {destination.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isAnonymous ? (
            <a
              className="text-sm font-medium text-[#46657a] hover:underline"
              href="/account"
            >
              Entrar
            </a>
          ) : (
            <>
              <span className="hidden max-w-44 truncate text-sm text-[var(--arc-text-muted)] sm:block">
                {userEmail}
              </span>
              <button
                aria-label="Sair da conta"
                className="grid size-9 place-items-center rounded-full bg-[var(--arc-accent)] text-sm font-medium text-[#30475a] transition-colors hover:bg-[#c8d8d6]"
                onClick={() => void signOut()}
              >
                {userEmail?.charAt(0).toUpperCase()}
              </button>
            </>
          )}
        </div>
      </header>
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <nav
        aria-label="Navegação móvel"
        className="fixed inset-x-4 bottom-4 z-10 flex items-center justify-around rounded-2xl border border-[var(--border)] bg-[var(--arc-surface)]/90 p-1.5 shadow-[0_12px_40px_rgba(38,57,80,0.12)] backdrop-blur md:hidden"
      >
        {destinations.map((destination) => {
          const Icon = destination.icon;
          const isActive = active === destination.id;
          return (
            <a
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition-all duration-300 ${isActive ? 'bg-[var(--arc-accent)] text-[#263950] shadow-[0_2px_8px_rgba(38,57,80,0.08)]' : 'text-[var(--arc-text-muted)] active:scale-[0.97]'}`}
              href={destination.href}
              key={destination.id}
            >
              <Icon aria-hidden="true" className="size-4" />
              {destination.label}
            </a>
          );
        })}
      </nav>
    </main>
  );
}
