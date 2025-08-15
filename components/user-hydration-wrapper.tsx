'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { apiClient } from '@/lib/api/api-instance';

interface UserHydrationWrapperProps {
  children: React.ReactNode;
  token?: string;
}

export function UserHydrationWrapper({
  children,
  token,
}: UserHydrationWrapperProps) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const isAuthPage = pathname === '/login';

  useEffect(() => {
    // Solo hidratar si no estamos en páginas de auth y hay token
    if (!isAuthPage && token) {
      // Configurar el token en el api-client
      apiClient.setAuthToken(token);

      // Prefetch user data
      queryClient.prefetchQuery({
        queryKey: ['user'],
        queryFn: () => authService.getProfile(),
        staleTime: 5 * 60 * 1000,
      });
    }
  }, [isAuthPage, token, queryClient]);

  return <>{children}</>;
}
