import { marketplaceCredentialsService } from '@/services/marketplaces.services';

export const getMarketplaceCredentials = async () => {
  try {
    const response = await marketplaceCredentialsService.list();
    console.log('🚀 ~ getMarketplaceCredentials ~ response:', response);

    return response.results;
  } catch (error) {
    console.error('Error fetching marketplace credentials:', error);
    return [];
  }
};
