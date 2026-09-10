'use client';
import Link from 'next/link';
import { useState, type SyntheticEvent } from 'react';
import { ArcButton } from '@/components/arc-ui';
import { PasswordField } from '@/components/password-field';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth-provider';

export function PasswordUpdate({
  recovery = false,
  onSuccess,
}: {
  recovery?: boolean;
  onSuccess?: () => void;
}) {
  const { session, isRecoverySession, finishRecovery } = useAuth();
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  async function submit(event: SyntheticEvent) {
    event.preventDefault();
    setError('');
    setFeedback('');
    if (password !== confirmation) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 8) {
      setError('Use pelo menos 8 caracteres.');
      return;
    }
    setBusy(true);
    try {
      const client = getSupabaseClient();
      if (recovery && !isRecoverySession)
        throw new Error('Solicite um novo link de recuperação.');
      if (!recovery) {
        if (!session?.user.email)
          throw new Error('Entre novamente para alterar sua senha.');
        const verified = await client.auth.signInWithPassword({
          email: session.user.email,
          password: current,
        });
        if (verified.error)
          throw new Error('Não foi possível confirmar a senha atual.');
      }
      const result = await client.auth.updateUser({ password });
      if (result.error)
        throw new Error(
          'Não foi possível atualizar a senha. Use uma senha diferente ou solicite um novo link.',
        );
      setCurrent('');
      setPassword('');
      setConfirmation('');
      setFeedback('Senha atualizada. Use a nova senha no próximo acesso.');
      if (recovery) {
        onSuccess?.();
        finishRecovery();
      }
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : 'Falha de conexão. Tente novamente.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="mt-5 grid gap-4">
      {!recovery && (
        <PasswordField
          id="current-password"
          label="Senha atual"
          value={current}
          onChange={setCurrent}
          autoComplete="current-password"
          disabled={busy}
        />
      )}
      <PasswordField
        id="new-password"
        label="Nova senha"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        minLength={8}
        disabled={busy}
      />
      <PasswordField
        id="confirm-password"
        label="Confirmar nova senha"
        value={confirmation}
        onChange={setConfirmation}
        autoComplete="new-password"
        minLength={8}
        disabled={busy}
      />
      <p className="text-sm text-muted-foreground">
        Use pelo menos 8 caracteres.
      </p>
      {error && (
        <p role="alert" className="text-error">
          {error}
        </p>
      )}
      {feedback && (
        <output className="text-success">
          {feedback}{' '}
          <Link href="/account" className="underline">
            Voltar ao perfil
          </Link>
        </output>
      )}
      <ArcButton type="submit" disabled={busy || Boolean(feedback)}>
        {busy ? 'Atualizando…' : 'Atualizar senha'}
      </ArcButton>
    </form>
  );
}
