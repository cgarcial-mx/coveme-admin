export function handleApiError(error: any): { message: string; code?: string } {
  if (error instanceof Error) {
    return { message: error.message };
  }

  if (typeof error === 'string') {
    return { message: error };
  }

  if (error && typeof error === 'object') {
    if (error.message) {
      return { message: error.message };
    }

    if (error.status) {
      return { message: `Request failed with status ${error.status}` };
    }
  }

  return { message: 'An unexpected error occurred' };
}
