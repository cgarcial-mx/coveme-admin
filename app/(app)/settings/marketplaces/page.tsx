import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ShopifyCredentials from './_components/ShopifyCredentials';
import { getMarketplaceCredentials } from './actions/credentials.server';
import AmazonCredentials from './_components/AmazonCredentials';
import MercadoLibreCredentials from './_components/MercadoLibreCredentials';

export default async function Page() {
  const credentials = await getMarketplaceCredentials();

  const shopifyCredentials = credentials.find(
    (credential) => credential.marketplace_type === 'shopify',
  );

  const amazonCredentials = credentials.find(
    (credential) => credential.marketplace_type === 'amazon',
  );

  const mercadolibreCredentials = credentials.find(
    (credential) => credential.marketplace_type === 'mercadolibre',
  );

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Credenciales Marketplaces</h1>
      <Card>
        <CardHeader>
          <CardTitle>Credenciales API</CardTitle>
          <CardDescription>
            Configure las credenciales de API para cada marketplace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AmazonCredentials credentials={amazonCredentials} />
          <MercadoLibreCredentials credentials={mercadolibreCredentials} />
          <ShopifyCredentials credentials={shopifyCredentials} />
        </CardContent>
      </Card>
    </div>
  );
}
