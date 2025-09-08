import { marketplaceCredentialsService } from '@/services/marketplaces.services';
import { MarketplaceCredential, MarketplaceType } from '@/types/marketplace';

export const getMarketplaceCredentials = async () => {
  try {
    const response = await marketplaceCredentialsService.list();

    return response.data;
  } catch (error) {
    console.error('Error fetching marketplace credentials:', error);
    return {
      credentials: [],
      pagination: { page: 1, limit: 20, total: 0, pages: 0 },
    };
  }
};

export const upsertMarketplaceCredentials = async ({
  marketplaceType,
  marketplaceName,
  credentials,
}: {
  marketplaceType: MarketplaceType;
  marketplaceName: string;
  credentials: MarketplaceCredential['credentials'];
}) => {
  try {
    const response = await marketplaceCredentialsService.create({
      marketplaceType,
      marketplaceName,
      credentials,
      name: `${marketplaceName} - ${marketplaceType}`,
    });

    return response;
  } catch (error) {
    console.error('Error upserting marketplace credentials:', error);
    return null;
  }
};

export const testConnection = async ({
  credentialsId,
}: {
  credentialsId: number;
}) => {
  try {
    const response = await marketplaceCredentialsService.testConnection(
      credentialsId,
    );
    return response;
  } catch (error) {
    console.error('Error testing connection:', error);
    return null;
  }
};
