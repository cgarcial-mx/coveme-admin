import { useMutation, useQueryClient } from '@tanstack/react-query';
import { marketplaceListingsService } from '@/services';
import {
  UpdateMarketplaceListingRequest,
  MarketplaceListing,
} from '@/types/marketplace';
import { useToast } from '@/hooks/use-toast';

export const useUpdateListing = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateMarketplaceListingRequest;
    }) => marketplaceListingsService.partialUpdate(id, data),
    onSuccess: (updatedListing: MarketplaceListing) => {
      // Invalidate and refetch listings
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({
        queryKey: ['listing', updatedListing.id.toString()],
      });

      toast({
        title: 'Listing updated successfully',
        description: `Updated listing: ${
          updatedListing.title || updatedListing.marketplace_id
        }`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating listing',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
