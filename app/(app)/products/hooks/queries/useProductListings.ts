import { useQuery } from '@tanstack/react-query';
import { marketplaceListingsService } from '@/services';

export const useProductListings = (productId: string) => {
  return useQuery({
    queryKey: ['product-listings', productId],
    queryFn: () => marketplaceListingsService.list(),
    enabled: !!productId && !isNaN(parseInt(productId)),
  });
};
