'use client';
import { useState } from 'react';
import { ArcButton } from '@/components/arc-ui';
import { PasswordField } from '@/components/password-field';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { getSupabaseClient } from '@/lib/supabase/client';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';

export function AccountDeletion() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function remove() {
    setBusy(true);
    setError('');
    try {
      const client = getSupabaseClient();
      const { data, error: sessionError } = await client.auth.getSession();
      if (sessionError || !data.session)
        throw new Error('Entre novamente para excluir sua conta.');
      const response = await fetch('/api/account/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.session.access_token,
        },
        body: JSON.stringify({ password, confirmation }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(
          result.message || 'Não foi possível concluir a exclusão.',
        );
      }
      setPassword('');
      setConfirmation('');
      try {
        createLocalLearnerRepository().clear();
        sessionStorage.setItem('arc:signed-out', '1');
      } catch {
        /* account already removed */
      }
      await client.auth.signOut({ scope: 'local' });
      window.location.replace('/account/deleted');
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : 'Não foi possível confirmar o resultado. Tente entrar novamente antes de repetir.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!busy) {
          setOpen(value);
          setPassword('');
          setConfirmation('');
          setError('');
        }
      }}
    >
      <AlertDialogTrigger
        render={
          <ArcButton
            tone="quiet"
            className="mt-4 text-[var(--arc-error-text)]"
          />
        }
      >
        Excluir minha conta
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Excluir sua conta definitivamente?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Seu perfil, disciplinas, tentativas e itens para refazer serão
            removidos. Esta ação não pode ser desfeita. O banco de questões
            compartilhado será mantido.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-3">
          <PasswordField
            id="delete-password"
            label="Senha atual para excluir"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            disabled={busy}
          />
          <label htmlFor="delete-confirmation">
            Digite EXCLUIR MINHA CONTA
          </label>
          <Input
            id="delete-confirmation"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            autoComplete="off"
            disabled={busy}
          />
          {error && (
            <p role="alert" className="text-[var(--arc-error-text)]">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>Cancelar</AlertDialogCancel>
          <ArcButton
            disabled={
              busy || confirmation !== 'EXCLUIR MINHA CONTA' || !password
            }
            onClick={() => void remove()}
          >
            {busy ? 'Excluindo…' : 'Excluir definitivamente'}
          </ArcButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
