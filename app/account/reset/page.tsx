'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth-provider';
import { ArcCard } from '@/components/arc-ui';
import { PasswordUpdate } from '@/components/password-update';

export default function ResetPage() {
  const { ready, session, isRecoverySession } = useAuth();
  const [complete, setComplete] = useState(false);
  const [invalid, setInvalid] = useState(false);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.slice(1));
    setInvalid(query.has('error') || hash.has('error'));
  }, []);
  return (
    <main className="mx-auto max-w-lg px-5 py-12">
      <ArcCard className="p-6">
        <h1 className="arc-title text-3xl">Nova senha</h1>
        {complete ? (
          <div className="mt-4">
            <output>
              Senha atualizada. Use a nova senha no próximo acesso.
            </output>
            <Link href="/account" className="mt-4 block underline">
              Voltar ao perfil
            </Link>
          </div>
        ) : !ready ? (
          <output className="mt-4">Verificando o link…</output>
        ) : invalid ||
          !session ||
          session.user.is_anonymous ||
          !isRecoverySession ? (
          <div className="mt-4">
            <p role="alert">Este link expirou, já foi usado ou não é válido.</p>
            <Link
              href="/account/recover"
              className="mt-4 inline-block underline"
            >
              Solicitar outro link
            </Link>
          </div>
        ) : (
          <PasswordUpdate recovery onSuccess={() => setComplete(true)} />
        )}
      </ArcCard>
    </main>
  );
}
