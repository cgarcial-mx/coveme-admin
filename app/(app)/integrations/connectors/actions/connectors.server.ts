import { marketplaceCredentialsService } from '@/services/marketplaces.services';

export async function getConnectors() {
  try {
    const response = await marketplaceCredentialsService.list();
    console.log('🚀 ~ getMarketplaceCredentials ~ response:', response);

    return response.results;
  } catch (error) {
    console.error('Error fetching connectors:', error);
    return [];
  }
}
