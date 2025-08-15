export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ServerLoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    client: number;
    client_name: string;
  };
  permissions: {
    endpoints: string[];
    categories: string[];
  };
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
}

export interface LoginResponse {
  ok: boolean;
  user?: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    client: number;
    client_name: string;
  };
  permissions: {
    endpoints: string[];
    categories: string[];
  };
  message?: string;
  code?: string;
}
