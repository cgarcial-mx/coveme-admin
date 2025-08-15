import { useMutation } from '@tanstack/react-query';
import { login } from '@/app/login/actions/login.server';
import type { LoginCredentials, LoginResponse } from '@/types/auth';

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (data: LoginCredentials) => {
      return await login(data);
    },
  });
}
