'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
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
  const isAuthPage = pathname === '/login';

  useEffect(() => {
    // Solo configurar el token si no estamos en páginas de auth y hay token
    if (!isAuthPage && token) {
      // Configurar el token en el api-client
      apiClient.setAuthToken(token);
    }
  }, [isAuthPage, token]);

  return <>{children}</>;
}
