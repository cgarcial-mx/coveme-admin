import { useQuery } from '@tanstack/react-query';
import { productMatchesService } from '@/services/products.service';

export const useProductMatches = (productId: string) => {
  return useQuery({
    queryKey: ['product-matches', productId],
    queryFn: () => productMatchesService.list({ product: parseInt(productId) }),
    enabled: !!productId && !isNaN(parseInt(productId)),
  });
};
