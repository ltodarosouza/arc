'use client';

import { useEffect } from 'react';

export default function Error({
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
    <div className="arc-page arc-page--reading">
      <div className="animate-enter max-w-lg">
        <p className="arc-caption">Algo saiu do lugar</p>
        <h1 className="arc-title mt-2">Não foi possível carregar esta página</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          O erro foi registrado. Você pode tentar de novo — se continuar,
          recarregue a página.
        </p>
        <button className="arc-action mt-6" onClick={() => retry()} type="button">
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
