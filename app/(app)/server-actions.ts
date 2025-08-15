'use server';

import { authService, User } from '@/services/auth.service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const c = await cookies();
  c.delete('auth-token');
  c.delete('refresh-token');
  c.delete('auth-remember');
  c.delete('auth-initialized');
  redirect('/login');
}

export async function getAuthToken(): Promise<string | null> {
  const c = await cookies();
  const token = c.get('auth-token')?.value;
  return token || null;
}

export async function clearAuthCookies() {
  const c = await cookies();
  c.delete('auth-token');
  c.delete('refresh-token');
  c.delete('auth-remember');
  c.delete('auth-initialized');
}

export async function handleTokenRefreshFailure() {
  await clearAuthCookies();
  redirect('/login');
}
