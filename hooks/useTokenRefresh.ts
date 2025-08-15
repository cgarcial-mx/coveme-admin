'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { shouldRefreshToken, getTimeUntilExpiration } from '@/lib/utils';

export function useTokenRefresh() {
  const router = useRouter();
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();

  const refreshToken = async () => {
    try {
      // Get refresh token from cookies (you might need to make this accessible)
      const refreshToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('refresh-token='))
        ?.split('=')[1];

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authService.refreshToken(refreshToken);

      // Update the auth-token cookie (you might need a server action for this)
      // For now, we'll rely on the server-side refresh

      // Schedule next refresh
      scheduleNextRefresh(response.access);

      return response.access;
    } catch (error) {
      console.error('Token refresh failed:', error);
      router.push('/login');
      throw error;
    }
  };

  const scheduleNextRefresh = (token: string) => {
    // Clear existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    // Calculate time until refresh is needed (5 minutes before expiration)
    const timeUntilRefresh = getTimeUntilExpiration(token) - 5 * 60; // 5 minutes buffer

    if (timeUntilRefresh > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refreshToken();
      }, timeUntilRefresh * 1000);
    }
  };

  useEffect(() => {
    // For client-side, we'll rely on the server-side refresh
    // This hook can be used for additional client-side logic if needed

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  return { refreshToken };
}
