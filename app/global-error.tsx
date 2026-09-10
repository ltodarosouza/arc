'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          background: '#f7f5f1',
          color: '#18283b',
        }}
      >
        <div style={{ maxWidth: '28rem' }}>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
            Algo saiu do lugar
          </h1>
          <p style={{ marginTop: '0.75rem', fontSize: '0.875rem' }}>
            A aplicação encontrou um erro inesperado. Tente recarregar.
          </p>
          <button
            onClick={() => retry()}
            style={{
              marginTop: '1.5rem',
              minHeight: '2.75rem',
              padding: '0.7rem 1.3rem',
              borderRadius: '999px',
              border: 0,
              background: '#183250',
              color: '#f9fbff',
              fontWeight: 650,
              cursor: 'pointer',
            }}
            type="button"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
