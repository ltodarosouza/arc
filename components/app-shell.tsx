'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Compass, House, Layers3, TrendingUp } from 'lucide-react';

import { AuthScreen } from '@/components/auth-screen';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

type Destination = 'home' | 'explore' | 'progress' | 'subjects';

const destinations = [
  { id: 'home' as const, href: '/', label: 'Início', icon: House },
  { id: 'explore' as const, href: '/explore', label: 'Explorar', icon: Compass },
  { id: 'progress' as const, href: '/progress', label: 'Progresso', icon: TrendingUp },
  { id: 'subjects' as const, href: '/subjects', label: 'Disciplinas', icon: Layers3 },
];

export function AppShell({ active, children }: { active: Destination; children: ReactNode }) {
  const [authReady, setAuthReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) { setAuthReady(true); return; }
    const supabase = getSupabaseClient();
    void supabase.auth.getSession().then(({ data: { session } }) => { setUserEmail(session?.user.email ?? null); setAuthReady(true); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setUserEmail(session?.user.email ?? null); setAuthReady(true); });
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => { if (isSupabaseConfigured()) await getSupabaseClient().auth.signOut(); };
  if (!authReady) return <main className="min-h-screen bg-[#f7f7f5]" />;
  if (!userEmail) return <AuthScreen />;

  return <main className="min-h-screen bg-[#f7f7f5] pb-24 text-[#161616] sm:pb-10">
    <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8"><a className="flex items-center gap-2.5 font-semibold tracking-[-0.045em]" href="/"><span className="grid size-8 place-items-center rounded-[11px] bg-[#1d221d] text-sm text-white">a</span><span className="text-[18px]">arc</span></a><nav aria-label="Navegação principal" className="hidden items-center gap-1 rounded-full border border-black/[0.07] bg-white/60 p-1 text-sm text-zinc-500 md:flex">{destinations.map((destination) => <a aria-current={active === destination.id ? 'page' : undefined} className={`rounded-full px-4 py-2 transition-colors ${active === destination.id ? 'bg-[#1d221d] text-white' : 'hover:text-zinc-950'}`} href={destination.href} key={destination.id}>{destination.label}</a>)}</nav><div className="flex items-center gap-2"><span className="hidden max-w-44 truncate text-sm text-[#68706b] sm:block">{userEmail}</span><button aria-label="Sair da conta" className="grid size-9 place-items-center rounded-full bg-[#dfebe5] text-sm font-medium text-[#30453d] transition-colors hover:bg-[#c8e1d4]" onClick={() => void signOut()}>{userEmail.charAt(0).toUpperCase()}</button></div></header>
    {children}
    <nav aria-label="Navegação móvel" className="fixed inset-x-4 bottom-4 z-10 flex items-center justify-around rounded-2xl border border-black/[0.08] bg-white/90 p-1.5 shadow-[0_12px_40px_rgba(31,37,33,0.12)] backdrop-blur md:hidden">{destinations.map((destination) => { const Icon = destination.icon; const isActive = active === destination.id; return <a aria-current={isActive ? 'page' : undefined} className={`flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition-colors ${isActive ? 'bg-[#eff4f0] text-[#26362d]' : 'text-zinc-500'}`} href={destination.href} key={destination.id}><Icon aria-hidden="true" className="size-4" />{destination.label}</a>; })}</nav>
  </main>;
}
