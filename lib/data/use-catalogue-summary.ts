'use client';

import { useEffect, useState } from 'react';

import {
  getCachedPublishedCatalogueSummary,
  loadPublishedCatalogueSummary,
  type CatalogueSummary,
} from '@/lib/data/catalogue-repository';

type CatalogueSummaryState = {
  catalogue: CatalogueSummary | null;
  error: Error | null;
  isLoading: boolean;
};

export function useCatalogueSummary(): CatalogueSummaryState {
  const [state, setState] = useState<CatalogueSummaryState>(() => {
    const catalogue = getCachedPublishedCatalogueSummary();
    return { catalogue, error: null, isLoading: !catalogue };
  });

  useEffect(() => {
    let cancelled = false;
    void loadPublishedCatalogueSummary()
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
                : new Error('Não foi possível carregar o resumo.'),
            isLoading: false,
          });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
