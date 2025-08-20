import { useQuery } from '@tanstack/react-query';
import { marketplaceListingsService } from '@/services';

export const useGetListing = (id: string) => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => marketplaceListingsService.getById(parseInt(id)),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
