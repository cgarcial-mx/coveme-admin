'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { PlusIcon } from 'lucide-react';
import AmazonCredentials from './AmazonCredentials';
import DialogCredentials from './DialogCredentials';
import MercadoLibreCredentials from './MercadoLibreCredentials';
import ShopifyCredentials from './ShopifyCredentials';
import { MarketplaceCredential } from '@/types/marketplace';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const InnerContent = ({
  shopifyCredentials,
  amazonCredentials,
  mercadolibreCredentials,
}: {
  shopifyCredentials: MarketplaceCredential[];
  amazonCredentials: MarketplaceCredential[];
  mercadolibreCredentials: MarketplaceCredential[];
}) => {
  const [marketplaceType, setMarketplaceType] = useState<
    'shopify' | 'amazon' | 'mercadolibre' | null
  >(null);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h3>Configure las credenciales de API para cada marketplace</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <PlusIcon className="w-4 h-4" />
              Agregar Marketplace
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setMarketplaceType('amazon')}>
                Amazon
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setMarketplaceType('mercadolibre')}
              >
                Mercado Libre
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMarketplaceType('shopify')}>
                Shopify
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
      {shopifyCredentials && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Credenciales Shopify</CardTitle>
              <CardDescription></CardDescription>
            </div>
          </CardHeader>
          {shopifyCredentials.map((credential) => (
            <ShopifyCredentials key={credential.id} credentials={credential} />
          ))}
        </Card>
      )}
      {amazonCredentials.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Credenciales Amazon</CardTitle>
              <CardDescription></CardDescription>
            </div>
          </CardHeader>
          {amazonCredentials.map((credential) => (
            <AmazonCredentials key={credential.id} credentials={credential} />
          ))}
        </Card>
      )}
      {mercadolibreCredentials.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Credenciales Mercado Libre</CardTitle>
              <CardDescription></CardDescription>
            </div>
          </CardHeader>
          {mercadolibreCredentials.map((credential) => (
            <MercadoLibreCredentials
              key={credential.id}
              credentials={credential}
            />
          ))}
        </Card>
      )}
      <DialogCredentials
        type={marketplaceType}
        isOpen={!!marketplaceType}
        onOpenChange={() => setMarketplaceType(null)}
      />
    </>
  );
};

export default InnerContent;
