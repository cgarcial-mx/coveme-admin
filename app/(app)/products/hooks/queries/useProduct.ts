import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/services/products.service';

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getById(parseInt(id)),
    enabled: !!id && !isNaN(parseInt(id)),
  });
};
