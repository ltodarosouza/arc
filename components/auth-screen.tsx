'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { ArcButton, ArcCard } from '@/components/arc-ui';
import { Input } from '@/components/ui/input';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

type AuthMode = 'sign-in' | 'sign-up';

function readableAuthError(message: string) {
  if (message.toLowerCase().includes('invalid login credentials'))
    return 'E-mail ou senha incorretos.';
  if (message.toLowerCase().includes('email not confirmed'))
    return 'Confirme seu e-mail antes de entrar.';
  return message;
}

export function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isSignUp = mode === 'sign-up';

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
    setMessage(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSupabaseConfigured()) {
      setError(
        'O acesso ainda está sendo preparado. Tente novamente em alguns instantes.',
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    const supabase = getSupabaseClient();
    const result = isSignUp
      ? await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        })
      : await supabase.auth.signInWithPassword({ email, password });

    setIsSubmitting(false);
    if (result.error) {
      setError(readableAuthError(result.error.message));
      return;
    }

    if (isSignUp && !result.data.session) {
      setMessage(
        'Conta criada. Confira seu e-mail para confirmar o acesso e depois entre por aqui.',
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-6 text-[#161616] sm:px-8 sm:py-8">
      <header className="mx-auto flex max-w-6xl items-center">
        <a
          className="flex items-center gap-2.5 font-semibold tracking-[-0.045em]"
          href="#top"
        >
          <span className="grid size-8 place-items-center rounded-[11px] bg-[#1d221d] text-sm text-white">
            a
          </span>
          <span className="text-[18px]">arc</span>
        </a>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-112px)] max-w-md items-center py-12 sm:py-16">
        <ArcCard className="w-full p-5 sm:p-8">
          <p className="text-sm font-medium text-[#5f8f71]">
            Seu espaço de prática
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-[-0.055em] sm:text-4xl">
            {isSignUp ? 'Comece de onde você está.' : 'Bom ter você por aqui.'}
          </h1>
          <p className="mt-3 max-w-sm text-[15px] leading-6 text-[#68706b]">
            {isSignUp
              ? 'Salve suas disciplinas, tentativas e revisões em um só lugar.'
              : 'Entre para continuar suas questões e manter seu progresso.'}
          </p>

          {message ? (
            <div
              className="mt-8 rounded-2xl bg-[var(--arc-success-bg)] p-4 text-sm leading-6 text-[var(--arc-success-text)]"
              role="status"
            >
              <CheckCircle2 aria-hidden="true" className="mb-2 size-5" />
              {message}
              <button
                className="mt-3 block font-medium underline underline-offset-4"
                onClick={() => changeMode('sign-in')}
                type="button"
              >
                Ir para entrar
              </button>
            </div>
          ) : (
            <form className="mt-8 grid gap-4" onSubmit={submit}>
              <label className="grid gap-2 text-sm font-medium" htmlFor="email">
                E-mail
                <Input
                  autoComplete="email"
                  className="h-11 rounded-xl border-black/[0.11] bg-white px-3 text-sm focus-visible:border-[#79a88a]"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@universidade.edu"
                  required
                  type="email"
                  value={email}
                />
              </label>
              <label
                className="grid gap-2 text-sm font-medium"
                htmlFor="password"
              >
                Senha
                <Input
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  className="h-11 rounded-xl border-black/[0.11] bg-white px-3 text-sm focus-visible:border-[#79a88a]"
                  id="password"
                  minLength={6}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Mínimo de 6 caracteres"
                  required
                  type="password"
                  value={password}
                />
              </label>
              {error && (
                <p
                  className="rounded-xl bg-[var(--arc-error-bg)] px-3 py-2.5 text-sm text-[var(--arc-error-text)]"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <ArcButton
                className="mt-2 w-full"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting
                  ? 'Só um instante…'
                  : isSignUp
                    ? 'Criar conta'
                    : 'Entrar'}{' '}
                {!isSubmitting && <ArrowRight className="size-4" />}
              </ArcButton>
            </form>
          )}

          {!message && (
            <p className="mt-6 text-center text-sm text-[#68706b]">
              {isSignUp ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}{' '}
              <button
                className="font-medium text-[#435f50] underline-offset-4 hover:underline"
                onClick={() => changeMode(isSignUp ? 'sign-in' : 'sign-up')}
                type="button"
              >
                {isSignUp ? 'Entrar' : 'Criar conta'}
              </button>
            </p>
          )}
        </ArcCard>
      </section>
    </main>
  );
}
