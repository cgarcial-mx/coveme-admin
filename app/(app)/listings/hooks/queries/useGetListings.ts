import { useQuery } from '@tanstack/react-query';
import { getListings } from '../../actions/listings.server';

export const useGetListings = () => {
  return useQuery({
    queryKey: ['listings'],
    queryFn: () => getListings(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
