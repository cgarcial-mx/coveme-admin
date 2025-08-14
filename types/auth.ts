export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
}

export interface ServerLoginResponse {
  ok: boolean;
  user?: { id: number; email: string; first_name: string; last_name: string };
  message?: string;
  code?: string;
}
