import { getMarketplaceCredentials } from './actions/credentials.server';
import InnerContent from './_components/InnerContent';

export default async function Page() {
  const credentialsResponse = await getMarketplaceCredentials();

  const shopifyCredentials = credentialsResponse.credentials.filter(
    (credential) => credential.marketplaceType === 'shopify',
  );

  const amazonCredentials = credentialsResponse.credentials.filter(
    (credential) => credential.marketplaceType === 'amazon',
  );

  const mercadolibreCredentials = credentialsResponse.credentials.filter(
    (credential) => credential.marketplaceType === 'mercadolibre',
  );

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Credenciales Marketplaces</h1>
      <InnerContent
        shopifyCredentials={shopifyCredentials}
        amazonCredentials={amazonCredentials}
        mercadolibreCredentials={mercadolibreCredentials}
      />
    </div>
  );
}
