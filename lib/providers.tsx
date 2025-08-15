'use client';

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Reintenta queries fallidas hasta 2 veces
      staleTime: 2 * 60 * 1000, // Datos "frescos" por 5 minutos (evita fetches innecesarios)
      gcTime: 10 * 60 * 1000, // Tiempo de garbage collection: 10 minutos
      refetchOnWindowFocus: true, // No refetch al enfocar ventana (mejora UX en apps móviles)
    },
    mutations: {
      retry: 1, // Reintenta mutaciones fallidas 1 vez
    },
  },
});

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NODE_ENV === 'development'}
      />
    </TanstackQueryClientProvider>
  );
}
