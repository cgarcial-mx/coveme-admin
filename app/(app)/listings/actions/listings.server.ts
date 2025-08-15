import { marketplaceListingsService } from '@/services';

export const getListings = async () => {
  const listings = await marketplaceListingsService.list();
  return listings;
};
