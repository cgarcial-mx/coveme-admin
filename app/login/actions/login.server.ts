'use server';

import { handleApiError } from '@/lib/api/handle-api-error';
import { LoginSchema } from '@/schemas/auth/login.schema';
import { authService } from '@/services/auth.service';
import { ServerLoginResponse, LoginResponse } from '@/types/auth';
import { cookies } from 'next/headers';

export async function login(credentials: LoginSchema): Promise<LoginResponse> {
  try {
    const res = await authService.authenticate(credentials);
    console.log('🚀 ~ login ~ res:', res);

    const c = await cookies();
    c.set('auth-token', res.data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: credentials.remember ? 60 * 60 * 24 * 30 : undefined,
    });

    c.set('refresh-token', res.data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });

    c.set('auth-remember', credentials.remember ? '1' : '0', { path: '/' });

    // Cookie adicional accesible desde el cliente para inicializar el api-client
    c.set('auth-initialized', 'true', {
      httpOnly: false, // Accesible desde JavaScript
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: credentials.remember ? 60 * 60 * 24 * 30 : undefined,
    });

    return {
      ok: true,
      user: res.data.user,
      permissions: res.data.user.permissions,
    };
  } catch (error) {
    return handleApiError(error) as LoginResponse;
  }
}
