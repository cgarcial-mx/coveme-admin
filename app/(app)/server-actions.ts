'use server';

import { authService, User } from '@/services/auth.service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const c = await cookies();
  c.delete('auth-token');
  c.delete('auth-remember');
  redirect('/login');
}

export async function getAuthToken(): Promise<string | null> {
  const c = await cookies();
  const token = c.get('auth-token')?.value;
  return token || null;
}

export async function getUser(): Promise<User | null> {
  const c = await cookies();
  const token = c.get('auth-token')?.value;
  if (!token) {
    return null;
  }
  try {
    return await authService.getProfile();
  } catch (error) {
    console.error('Error fetching user', error);
    return null;
  }
}
