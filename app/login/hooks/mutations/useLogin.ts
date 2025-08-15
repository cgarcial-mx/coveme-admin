import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/app/login/actions/login.server';
import type { LoginCredentials, LoginResponse } from '@/types/auth';

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (data: LoginCredentials) => {
      return await login(data);
    },
    onSuccess: (data) => {
      if (data.ok) {
        queryClient.setQueryData(['user'], data.user);
      }
    },
  });
}
