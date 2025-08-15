import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../actions/products.server';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
