'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MarketplaceCredential } from '@/types/marketplace';
import { useForm } from '@tanstack/react-form';
import {
  testConnection,
  upsertMarketplaceCredentials,
} from '../actions/credentials.server';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { marketplaceCredentialsService } from '@/services/marketplaces.services';

const ShopifyCredentials = ({
  credentials,
}: {
  credentials?: MarketplaceCredential;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const isShopifyCredentials = (
    creds: MarketplaceCredential['credentials'],
  ): creds is { shop_url: string; access_token: string } => {
    return 'shop_url' in creds && 'access_token' in creds;
  };

  const form = useForm({
    defaultValues: {
      marketplace_name: credentials?.marketplace_name || '',
      shop_url:
        credentials && isShopifyCredentials(credentials.credentials)
          ? credentials.credentials.shop_url
          : '',
      access_token:
        credentials && isShopifyCredentials(credentials.credentials)
          ? credentials.credentials.access_token
          : '',
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        const result = await upsertMarketplaceCredentials({
          marketplaceType: 'shopify',
          marketplaceName: value.marketplace_name,
          credentials: {
            shop_url: value.shop_url,
            access_token: value.access_token,
            api_version: '2024-01',
          },
        });

        if (result) {
          toast({
            title: 'Éxito',
            description: 'Credenciales guardadas exitosamente',
            variant: 'default',
          });
          // Refrescar la página para mostrar los datos actualizados
          router.refresh();
        } else {
          toast({
            title: 'Error',
            description: 'Error al guardar las credenciales',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error saving credentials:', error);
        toast({
          title: 'Error',
          description: 'Error al guardar las credenciales',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleTestConnection = async () => {
    if (!credentials?.id) {
      toast({
        title: 'Error',
        description: 'Primero debes guardar las credenciales',
        variant: 'destructive',
      });
      return;
    }

    setIsTestingConnection(true);
    try {
      // Aquí puedes implementar la lógica para probar la conexión
      // Por ejemplo, usando el método testConnection del servicio
      toast({
        title: 'Información',
        description: 'Probando conexión...',
        variant: 'default',
      });
      const result = await testConnection({
        credentialsId: credentials.id,
      });
      console.log('🚀 ~ handleTestConnection ~ result:', result);
      if (result?.status === 'success') {
        toast({
          title: 'Éxito',
          description: 'Conexión exitosa',
          variant: 'default',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Error en la conexión',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al probar la conexión',
        variant: 'destructive',
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div key={'shopify'} className="rounded-md border p-3">
      <div className="mb-3 text-md font-bold">Shopify</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid gap-3 md:grid-cols-3">
          <form.Field
            name="marketplace_name"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="shopify-store-name">
                  Nombre de Marketplace
                </Label>
                <Input
                  id="shopify-store-name"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="shop_url"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="shopify-shop-url">Shop URL</Label>
                <Input
                  id="shopify-shop-url"
                  placeholder="••••••.myshopify.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="access_token"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="shopify-access-token">Access Token</Label>
                <Input
                  id="shopify-access-token"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <div className="md:col-span-3 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleTestConnection}
              disabled={isTestingConnection || !credentials?.id}
            >
              {isTestingConnection ? 'Probando...' : 'Probar conexión'}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShopifyCredentials;
