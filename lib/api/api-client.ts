interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
  enableLogging?: boolean;
}

interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
  signal?: AbortSignal;
  requireAuth?: boolean;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  ok: boolean;
}

export class ApiClient {
  private config: ApiClientConfig;
  private controller: AbortController;
  private timeoutId?: NodeJS.Timeout;

  constructor(config: ApiClientConfig) {
    this.config = {
      enableLogging: process.env.NODE_ENV === 'development',
      ...config,
    };
    this.controller = new AbortController();
  }

  private log(message: string, data?: any): void {
    if (this.config.enableLogging) {
      console.log(`�� [API] ${message}`, data || '');
    }
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    // ✅ Concatenar baseURL con endpoint
    const fullUrl = `${this.config.baseURL}${endpoint}`;

    if (!params) return fullUrl;

    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map(
              (v) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`,
            )
            .join('&');
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          String(value),
        )}`;
      })
      .join('&');

    const separator = fullUrl.includes('?') ? '&' : '?';
    return queryString ? `${fullUrl}${separator}${queryString}` : fullUrl;
  }

  private async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {},
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      params,
      signal,
      requireAuth = false,
    } = config;

    const url = this.buildUrl(endpoint, params);

    this.log(`Making ${method} request to:`, url);

    // Setup timeout
    if (this.config.timeout) {
      this.timeoutId = setTimeout(() => {
        this.controller.abort();
      }, this.config.timeout);
    }

    try {
      // Build headers
      const finalHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...this.config.defaultHeaders,
        ...headers,
      };
      console.log('finalHeaders', finalHeaders);

      // Handle authentication if required
      if (requireAuth && typeof window === 'undefined') {
        // Server-side: get token from cookies
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (token) {
          finalHeaders.Authorization = `Bearer ${token}`;
          this.log('Auth token added from cookies');
        } else {
          this.log(
            'Warning: requireAuth=true but no auth token found in cookies',
          );
        }
      }

      // Remove Content-Type for GET requests without body
      if (!body && method === 'GET') {
        delete finalHeaders['Content-Type'];
      }

      this.log('Request headers:', Object.keys(finalHeaders));

      const response = await fetch(url, {
        method,
        headers: finalHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: signal || this.controller.signal,
      });

      this.log('Response status:', response.status);

      // Clear timeout
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
      }

      let data: T;
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else if (contentType?.includes('text/')) {
        data = (await response.text()) as T;
      } else {
        data = (await response.blob()) as T;
      }

      console.log('data', data);

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        ok: response.ok,
      };
    } catch (error) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request cancelled');
      }

      this.log('Request error:', error);
      throw error;
    }
  }

  // Métodos helper
  async get<T>(
    endpoint: string,
    config?: Omit<ApiRequestConfig, 'method'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(
    endpoint: string,
    config?: Omit<ApiRequestConfig, 'method'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'POST' });
  }

  async put<T>(
    endpoint: string,
    config?: Omit<ApiRequestConfig, 'method'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT' });
  }

  async patch<T>(
    endpoint: string,
    config?: Omit<ApiRequestConfig, 'method'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH' });
  }

  async delete<T>(
    endpoint: string,
    config?: Omit<ApiRequestConfig, 'method'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  // Cancelar requests pendientes
  cancel(): void {
    this.log('Cancelling all pending requests');
    this.controller.abort();
    this.controller = new AbortController();

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  // Configurar token de autenticación
  setAuthToken(token: string): void {
    this.config.defaultHeaders = {
      ...this.config.defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
    this.log('Auth token set');
  }

  // Remover token de autenticación
  removeAuthToken(): void {
    if (this.config.defaultHeaders?.Authorization) {
      delete this.config.defaultHeaders.Authorization;
      this.log('Auth token removed');
    }
  }

  // Habilitar/deshabilitar logging
  setLogging(enabled: boolean): void {
    this.config.enableLogging = enabled;
  }
}
