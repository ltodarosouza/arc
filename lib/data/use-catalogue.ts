'use client';

import { useEffect, useState } from 'react';

import {
  getCachedPublishedCatalogue,
  loadPublishedCatalogue,
  type CatalogueSnapshot,
} from '@/lib/data/catalogue-repository';

type CatalogueState = {
  catalogue: CatalogueSnapshot | null;
  error: Error | null;
  isLoading: boolean;
};

export function useCatalogue(): CatalogueState {
  const [state, setState] = useState<CatalogueState>(() => {
    const catalogue = getCachedPublishedCatalogue();
    return { catalogue, error: null, isLoading: !catalogue };
  });

  useEffect(() => {
    let cancelled = false;
    void loadPublishedCatalogue()
      .then((catalogue) => {
        if (!cancelled) setState({ catalogue, error: null, isLoading: false });
      })
      .catch((error: unknown) => {
        if (!cancelled)
          setState({
            catalogue: null,
            error:
              error instanceof Error
                ? error
                : new Error('Não foi possível carregar o catálogo.'),
            isLoading: false,
          });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
