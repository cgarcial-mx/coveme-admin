import { useQuery } from '@tanstack/react-query';
import { priceHistoryService } from '@/services/products.service';

export const usePriceHistory = (productId: string) => {
  return useQuery({
    queryKey: ['price-history', productId],
    queryFn: () => priceHistoryService.list({ product: parseInt(productId) }),
    enabled: !!productId && !isNaN(parseInt(productId)),
  });
};
