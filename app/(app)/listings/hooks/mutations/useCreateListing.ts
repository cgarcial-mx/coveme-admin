import { useMutation, useQueryClient } from '@tanstack/react-query';
import { marketplaceListingsService } from '@/services';
import {
  CreateMarketplaceListingRequest,
  MarketplaceListing,
} from '@/types/marketplace';
import { useToast } from '@/hooks/use-toast';

export const useCreateListing = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateMarketplaceListingRequest) =>
      marketplaceListingsService.create(data),
    onSuccess: (newListing: MarketplaceListing) => {
      // Invalidate and refetch listings
      queryClient.invalidateQueries({ queryKey: ['listings'] });

      toast({
        title: 'Listing created successfully',
        description: `Created listing: ${
          newListing.title || newListing.marketplace_id
        }`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating listing',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
