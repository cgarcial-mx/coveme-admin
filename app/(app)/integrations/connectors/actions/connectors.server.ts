import { marketplaceCredentialsService } from '@/services/marketplaces.services';

export async function getConnectors() {
  try {
    const response = await marketplaceCredentialsService.list();
    return response.data.credentials;
  } catch (error) {
    console.error('Error fetching connectors:', error);
    return [];
  }
}

export const syncProductsAndListings = async ({
  credentialsId,
}: {
  credentialsId: number;
}) => {
  try {
    const response =
      await marketplaceCredentialsService.syncProductsAndListings(
        credentialsId,
      );
    return response;
  } catch (error) {
    console.error('Error syncing products and listings:', error);
    return null;
  }
};
