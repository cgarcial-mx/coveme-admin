import { authService } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getProfile(),
  });
};

export default useUser;
