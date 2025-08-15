import { ApiClient } from './api-client';

export const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  defaultHeaders: {
    Accept: 'application/json',
  },
  enableLogging: process.env.NODE_ENV === 'development',
});
