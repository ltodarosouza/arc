'use client';
import Link from 'next/link';

import { useEffect, useState, type SyntheticEvent } from 'react';
import { PasswordUpdate } from '@/components/password-update';
import { AccountDeletion } from '@/components/account-deletion';
import { useAuth } from '@/components/auth-provider';
import { AppShell } from '@/components/app-shell';
import { ArcButton, ArcCard } from '@/components/arc-ui';
import { AuthScreen } from '@/components/auth-screen';
import { Input } from '@/components/ui/input';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { profileNameError } from '@/lib/domain/profile';

export function AccountProfile() {
  const auth = useAuth();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setName(auth.profileName ?? '');
  }, [auth.profileName, auth.session?.user.id]);

  if (!auth.ready)
    return (
      <main className="p-8" role="status">
        Carregando sua conta…
      </main>
    );
  if (!isSupabaseConfigured())
    return (
      <main className="mx-auto max-w-lg p-8">
        <h1 className="text-2xl">Conta indisponível neste ambiente</h1>
        <p className="mt-4">
          Você pode praticar com os exemplos locais. Contas precisam da conexão
          com o serviço de autenticação.
        </p>
        <Link className="mt-4 block underline" href="/">
          Voltar ao início
        </Link>
      </main>
    );
  if (!auth.session) return <AuthScreen />;

  async function save(event: SyntheticEvent) {
    event.preventDefault();
    const invalid = profileNameError(name);
    if (invalid) {
      setError(invalid);
      return;
    }
    setSaving(true);
    setFeedback(null);
    setError(null);
    try {
      await auth.saveName(name);
      setFeedback('Nome de perfil salvo.');
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : 'Não foi possível salvar.',
      );
    } finally {
      setSaving(false);
    }
  }
  async function leave() {
    setLeaving(true);
    setError(null);
    try {
      await auth.signOut();
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : 'Não foi possível sair.',
      );
      setLeaving(false);
    }
  }

  return (
    <AppShell active="account">
      <section className="arc-page max-w-3xl">
        <div className="arc-profile-hero animate-enter">
          <span className="arc-profile-avatar" aria-hidden="true">
            {(auth.profileName ?? auth.session.user.email ?? 'a')
              .charAt(0)
              .toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
              Espaço pessoal
            </p>
            <h1 className="mt-1 font-[var(--font-arc-display)] text-3xl tracking-[-0.05em] sm:text-4xl">
              {auth.profileName ?? 'Seu perfil'}
            </h1>
            <p className="mt-1 text-sm text-white/70">
              Dados, segurança e acesso em um só lugar.
            </p>
          </div>
        </div>
        {auth.session.user.is_anonymous && (
          <ArcCard className="mt-6 p-5">
            <h2 className="font-medium">Você está como visitante</h2>
            <p className="mt-2">
              O progresso está ligado a esta sessão. Entrar em outra conta não
              transfere esse histórico.
            </p>
            <Link
              className="mt-3 inline-block underline"
              href="/account/sign-in"
            >
              Entrar ou criar conta
            </Link>
          </ArcCard>
        )}
        <ArcCard className="arc-panel mt-6 p-5 sm:p-6">
          <h2 className="arc-section-title">Identidade</h2>
          {auth.session.user.email && (
            <p className="mt-2 break-all text-sm text-[var(--arc-text-muted)]">
              E-mail da conta: {auth.session.user.email}
            </p>
          )}
          {auth.profileLoading ? (
            <output className="mt-4">Carregando nome…</output>
          ) : (
            <form onSubmit={save} className="mt-5 grid gap-3">
              {auth.profileError && (
                <div>
                  <p role="alert">{auth.profileError}</p>
                  <ArcButton
                    className="mt-3"
                    type="button"
                    onClick={auth.reloadProfile}
                  >
                    Tentar novamente
                  </ArcButton>
                </div>
              )}
              <label htmlFor="profile-name" className="font-medium">
                Como quer ser chamado
              </label>
              <Input
                id="profile-name"
                autoComplete="nickname"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setError(null);
                }}
                aria-describedby="name-help"
                aria-invalid={Boolean(error && profileNameError(name))}
                disabled={saving}
              />
              <p
                id="name-help"
                className="text-sm text-[var(--arc-text-muted)]"
              >
                Até 60 caracteres. Esse nome é privado e não precisa ser único.
              </p>
              <ArcButton
                className="justify-self-start"
                type="submit"
                disabled={saving}
              >
                {saving ? 'Salvando…' : 'Salvar nome'}
              </ArcButton>
            </form>
          )}
        </ArcCard>
        <section className="arc-section border-t border-[var(--border)] pt-6">
          <h2 className="arc-section-title">Sessão</h2>
          <p className="mt-2 text-[var(--arc-text-muted)]">
            Sair encerra o acesso neste navegador e preserva seus dados na
            conta.
          </p>
          <ArcButton
            className="mt-4"
            tone="quiet"
            onClick={() => void leave()}
            disabled={leaving}
          >
            {leaving ? 'Saindo…' : 'Sair da conta'}
          </ArcButton>
        </section>
        {!auth.session.user.is_anonymous && (
          <>
            <section className="arc-section border-t border-[var(--border)] pt-6">
              <h2 className="arc-section-title">Segurança</h2>
              <PasswordUpdate />
            </section>
            <section className="arc-section border-t border-[var(--border)] pt-6">
              <h2 className="arc-section-title text-[var(--arc-error-text)]">
                Zona de perigo
              </h2>
              <p className="mt-2">
                Excluir a conta remove seu histórico e seus dados privados
                definitivamente.
              </p>
              <AccountDeletion />
            </section>
          </>
        )}
        {feedback && (
          <output className="mt-4 text-[var(--arc-success-text)]">
            {feedback}
          </output>
        )}
        {error && (
          <p className="mt-4 text-[var(--arc-error-text)]" role="alert">
            {error}
          </p>
        )}
      </section>
    </AppShell>
  );
}
