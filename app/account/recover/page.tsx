'use client';
import Link from 'next/link';
import { useState, type SyntheticEvent } from 'react';
import { ArcCard, ArcButton } from '@/components/arc-ui';
import { Input } from '@/components/ui/input';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function RecoverPage() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  async function submit(event: SyntheticEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      if (!isSupabaseConfigured()) throw new Error('unavailable');
      await getSupabaseClient().auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + '/account/reset',
      });
      setMessage(
        'Se houver uma conta para esse e-mail, você receberá um link. Confira também o spam. Se não chegar, aguarde e solicite novamente.',
      );
    } catch {
      setMessage(
        'Não foi possível conectar ao serviço. Verifique sua conexão e tente novamente.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="mx-auto max-w-lg px-5 py-12">
      <ArcCard className="p-6">
        <h1 className="text-3xl font-medium">Recuperar senha</h1>
        <p className="mt-3 text-[var(--arc-text-muted)]">
          Enviaremos um link para você escolher uma nova senha.
        </p>
        <form onSubmit={submit} className="mt-6 grid gap-3">
          <label htmlFor="recovery-email">E-mail</label>
          <Input
            id="recovery-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={busy}
          />
          <ArcButton type="submit" disabled={busy}>
            {busy ? 'Enviando…' : 'Enviar link'}
          </ArcButton>
        </form>
        {message && <output className="mt-4">{message}</output>}
        <Link
          className="mt-5 inline-flex min-h-11 items-center underline"
          href="/account/sign-in"
        >
          Voltar para entrar
        </Link>
      </ArcCard>
    </main>
  );
}
