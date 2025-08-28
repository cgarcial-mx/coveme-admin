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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import DialogCredentials from './_components/DialogCredentials';
import InnerContent from './_components/InnerContent';

export default async function Page() {
  const credentials = await getMarketplaceCredentials();
  console.log('🚀 ~ Page ~ credentials:', credentials);

  const shopifyCredentials = credentials.filter(
    (credential) => credential.marketplace_type === 'shopify',
  );
  console.log('🚀 ~ Page ~ shopifyCredentials:', shopifyCredentials);

  const amazonCredentials = credentials.filter(
    (credential) => credential.marketplace_type === 'amazon',
  );

  const mercadolibreCredentials = credentials.filter(
    (credential) => credential.marketplace_type === 'mercadolibre',
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
