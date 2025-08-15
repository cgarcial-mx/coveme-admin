import { apiClient } from '@/lib/api/api-instance';
import { handleApiError } from '@/lib/api/handle-api-error';
import { LoginCredentials, ServerLoginResponse } from '@/types/auth';

export interface User {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: string;
    client_name: string;
    client: number;
  };
  permissions: string[];
}

export const authService = {
  async authenticate(
    credentials: LoginCredentials,
  ): Promise<ServerLoginResponse> {
    try {
      const response = await apiClient.post<ServerLoginResponse>(
        '/auth/login/',
        {
          body: credentials,
        },
      );

      if (!response.ok) {
        throw new Error('Login failed');
      }

      apiClient.setAuthToken(response.data.access);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout/');
      apiClient.removeAuthToken();
    } catch (error) {
      apiClient.removeAuthToken();
      throw new Error(handleApiError(error).message);
    }
  },

  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    try {
      const response = await apiClient.post<{ access: string }>(
        '/auth/refresh/',
        {
          body: { refresh: refreshToken },
        },
      );

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      apiClient.setAuthToken(response.data.access);

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<User>('/auth/profile/', {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  async changePassword(data: {
    current_password: string;
    new_password: string;
  }): Promise<void> {
    try {
      const response = await apiClient.post('/auth/change-password/', {
        body: data,
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      const response = await apiClient.post('/auth/forgot-password/', {
        body: { email },
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  async resetPassword(data: {
    token: string;
    new_password: string;
  }): Promise<void> {
    try {
      const response = await apiClient.post('/auth/reset-password/', {
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },
};
