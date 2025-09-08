export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ServerLoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      client: number;
      clientName: string;
      permissions: {
        endpoints: string[];
        categories: string[];
      };
    };
    expiresIn: number;
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
    firstName: string;
    lastName: string;
    role: string;
    client: number;
    clientName: string;
  };
  permissions: {
    endpoints: string[];
    categories: string[];
  };
  message?: string;
  code?: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  client: string;
  clientName: string;
  isSuperuser: boolean;
  isActive: boolean;
  clientId: string;
}
