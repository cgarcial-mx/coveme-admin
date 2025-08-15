import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeToken(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(token: string) {
  const payload = decodeToken(token);
  if (!payload) {
    return true;
  }
  const now = Date.now() / 1000;
  return payload.exp < now;
}

// New refresh token utilities
export function shouldRefreshToken(token: string, bufferMinutes: number = 5) {
  const payload = decodeToken(token);
  if (!payload) {
    return true;
  }

  const now = Date.now() / 1000;
  const bufferSeconds = bufferMinutes * 60;

  // Refresh if token expires within the buffer time
  return payload.exp < now + bufferSeconds;
}

export function getTokenExpirationTime(token: string): number | null {
  const payload = decodeToken(token);
  return payload?.exp || null;
}

export function getTimeUntilExpiration(token: string): number {
  const exp = getTokenExpirationTime(token);
  if (!exp) return 0;

  const now = Date.now() / 1000;
  return Math.max(0, exp - now);
}
