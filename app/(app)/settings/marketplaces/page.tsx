import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ShopifyCredentials from './_components/ShopifyCredentials';
import { getMarketplaceCredentials } from './actions/credentials.actions';

export default async function Page() {
  const credentials = await getMarketplaceCredentials();
  console.log('🚀 ~ Page ~ credentials:', credentials);

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
          <ShopifyCredentials />
        </CardContent>
      </Card>
    </div>
  );
}
