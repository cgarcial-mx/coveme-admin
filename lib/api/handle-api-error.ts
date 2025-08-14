export function handleApiError(error: any): {
  ok: boolean;
  message: string;
  code?: string;
} {
  if (error instanceof Error) {
    return { ok: false, message: error.message };
  }

  if (typeof error === 'string') {
    return { ok: false, message: error };
  }

  if (error && typeof error === 'object') {
    if (error.message) {
      return { ok: false, message: error.message };
    }

    if (error.status) {
      return {
        ok: false,
        message: `Request failed with status ${error.status}`,
      };
    }

    return { ok: false, message: 'An unexpected error occurred' };
  }

  return { ok: false, message: 'An unexpected error occurred' };
}
