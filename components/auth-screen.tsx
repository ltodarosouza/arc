'use client';
import Link from 'next/link';
import { useEffect, useState, type SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArcButton, ArcCard } from '@/components/arc-ui';
import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/password-field';
import { useAuth } from '@/components/auth-provider';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

export function AuthScreen() {
  const { session } = useAuth();
  const router = useRouter();
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logoutWarning, setLogoutWarning] = useState(false);
  useEffect(() => {
    setLogoutWarning(
      new URLSearchParams(window.location.search).get('logout') ===
        'unconfirmed',
    );
  }, []);
  useEffect(() => {
    if (session?.user.email && !session.user.is_anonymous)
      router.replace('/account');
  }, [session, router]);
  async function submit(event: SyntheticEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (!isSupabaseConfigured())
        throw new Error('O acesso não está configurado neste ambiente.');
      const client = getSupabaseClient();
      const result = signup
        ? await client.auth.signUp({
            email: email.trim(),
            password,
            options: { emailRedirectTo: window.location.origin + '/account' },
          })
        : await client.auth.signInWithPassword({
            email: email.trim(),
            password,
          });
      if (result.error) {
        const code = result.error.code;
        throw new Error(
          code === 'invalid_credentials'
            ? 'E-mail ou senha incorretos.'
            : code === 'email_not_confirmed'
              ? 'Confirme seu e-mail antes de entrar.'
              : code === 'over_request_rate_limit' ||
                  code === 'over_email_send_rate_limit'
                ? 'Aguarde alguns instantes antes de tentar novamente.'
                : 'Não foi possível concluir o acesso. Confira os dados e tente novamente.',
        );
      }
      setPassword('');
      if (result.data.session) {
        try {
          sessionStorage.removeItem('arc:signed-out');
        } catch {
          /* optional local preference */
        }
        router.replace('/account');
      } else
        setMessage(
          'Confira seu e-mail para confirmar o acesso e depois entre por aqui.',
        );
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : 'Não foi possível conectar. Tente novamente.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10">
      <section className="mx-auto max-w-md">
        <Link href="/" className="text-xl font-semibold">
          arc
        </Link>
        <ArcCard className="mt-10 p-6 sm:p-8">
          <h1 className="text-3xl font-medium tracking-tight">
            {signup ? 'Crie sua conta' : 'Entre na sua conta'}
          </h1>
          <p className="mt-3 text-[var(--arc-text-muted)]">
            Salve suas disciplinas, tentativas e revisões.
          </p>
          {session?.user.is_anonymous && (
            <p className="mt-3 text-sm">
              O histórico de visitante fica separado da conta. Você pode
              continuar praticando como visitante pelo início.
            </p>
          )}
          <form className="mt-6 grid gap-4" onSubmit={submit}>
            <label htmlFor="email" className="font-medium">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              disabled={busy}
              onChange={(event) => setEmail(event.target.value)}
            />
            <PasswordField
              id="password"
              label="Senha"
              value={password}
              onChange={setPassword}
              autoComplete={signup ? 'new-password' : 'current-password'}
              minLength={signup ? 8 : 1}
              disabled={busy}
            />
            {signup && (
              <p className="text-sm text-[var(--arc-text-muted)]">
                Use pelo menos 8 caracteres.
              </p>
            )}
            {logoutWarning && (
              <p role="alert">
                Seu acesso neste navegador foi encerrado. Não foi possível
                confirmar a revogação da sessão no servidor; entre novamente
                quando sua conexão voltar.
              </p>
            )}
            {error && (
              <p role="alert" className="text-[var(--arc-error-text)]">
                {error}
              </p>
            )}
            {message && (
              <output className="text-[var(--arc-success-text)]">
                {message}
              </output>
            )}
            <ArcButton type="submit" disabled={busy}>
              {busy ? 'Só um instante…' : signup ? 'Criar conta' : 'Entrar'}
            </ArcButton>
          </form>
          <Link
            href="/account/recover"
            className="mt-5 inline-flex min-h-11 items-center underline"
          >
            Esqueci minha senha
          </Link>
          <button
            className="mt-2 block min-h-11 underline"
            type="button"
            disabled={busy}
            onClick={() => {
              setSignup((value) => !value);
              setError(null);
              setMessage(null);
              setPassword('');
            }}
          >
            {signup ? 'Já tenho conta. Entrar' : 'Ainda não tenho conta'}
          </button>
        </ArcCard>
      </section>
    </main>
  );
}
