import { ApiClient } from './api-client';

export const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  defaultHeaders: {
    Accept: 'application/json',
  },
  enableLogging: process.env.NODE_ENV === 'development',
});

// Función para inicializar el token desde las cookies usando server action
export async function initializeAuthToken(): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      // Importar dinámicamente el server action
      const { getAuthToken } = await import('@/app/(app)/server-actions');
      const token = await getAuthToken();
      
      if (token) {
        apiClient.setAuthToken(token);
      }
    } catch (error) {
      console.error('Error initializing auth token:', error);
    }
  }
}
