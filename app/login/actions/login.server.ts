'use server';

import { handleApiError } from '@/lib/api/handle-api-error';
import { LoginSchema } from '@/schemas/auth/login.schema';
import { authService } from '@/services/auth.service';
import { ServerLoginResponse } from '@/types/auth';
import { cookies } from 'next/headers';

export async function login(
  credentials: LoginSchema,
): Promise<ServerLoginResponse> {
  try {
    const res = await authService.authenticate(credentials);

    const c = await cookies();
    c.set('auth-token', res.access, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: credentials.remember ? 60 * 60 * 24 * 30 : undefined,
    });

    c.set('refresh-token', res.refresh, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });

    c.set('auth-remember', credentials.remember ? '1' : '0', { path: '/' });

    return { ok: true, user: res.user };
  } catch (error) {
    return handleApiError(error) as ServerLoginResponse;
  }
}
