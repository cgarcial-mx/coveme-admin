import { cookies } from 'next/headers';
import { authService } from './auth.service';
import { isTokenExpired, shouldRefreshToken } from '@/lib/utils';

export class TokenRefreshService {
  private static isRefreshing = false;
  private static refreshPromise: Promise<string> | null = null;

  static async refreshTokenIfNeeded(): Promise<string | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('auth-token')?.value;
    const refreshToken = cookieStore.get('refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      return null;
    }

    // If token doesn't need refresh, return current token
    if (!shouldRefreshToken(accessToken)) {
      return accessToken;
    }

    // If already refreshing, wait for the existing promise
    if (this.isRefreshing && this.refreshPromise) {
      try {
        return await this.refreshPromise;
      } catch (error) {
        // If refresh failed, clear the promise and try again
        this.isRefreshing = false;
        this.refreshPromise = null;
        throw error;
      }
    }

    // Start refresh process
    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh(refreshToken);

    try {
      const newAccessToken = await this.refreshPromise;
      this.isRefreshing = false;
      this.refreshPromise = null;
      return newAccessToken;
    } catch (error) {
      this.isRefreshing = false;
      this.refreshPromise = null;
      throw error;
    }
  }

  private static async performRefresh(refreshToken: string): Promise<string> {
    try {
      const response = await authService.refreshToken(refreshToken);

      // Update the cookie with the new access token
      const cookieStore = await cookies();
      cookieStore.set('auth-token', response.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      return response.access;
    } catch (error) {
      // If refresh fails, just throw the error without clearing cookies
      // The layout will handle the redirect to login
      throw error;
    }
  }

  static async validateAndRefreshToken(): Promise<boolean> {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('auth-token')?.value;

      if (!accessToken) {
        return false;
      }

      if (isTokenExpired(accessToken)) {
        // Try to refresh
        const newToken = await this.refreshTokenIfNeeded();
        return !!newToken;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
