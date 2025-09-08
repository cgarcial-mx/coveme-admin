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
import { CardContent, CardTitle } from '@/components/ui/card';
import { marketplaceCredentialStatusParse } from '@/utils/helpers';
import { Badge } from '@/components/ui/badge';
import { PencilIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ShopifyCredentials = ({
  credentials,
  isDialog = false,
}: {
  credentials?: MarketplaceCredential;
  isDialog?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(isDialog);

  const router = useRouter();
  const { toast } = useToast();

  const isShopifyCredentials = (
    creds: MarketplaceCredential['credentials'],
  ): creds is { shop_url: string; access_token: string } => {
    return 'shop_url' in creds && 'access_token' in creds;
  };

  const form = useForm({
    defaultValues: {
      marketplaceName: credentials?.marketplaceName || '',
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
          marketplaceName: value.marketplaceName,
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
    <CardContent className={cn('space-y-6', isDialog && 'p-0')}>
      <div
        key={'shopify'}
        className={cn('rounded-md border p-3', isDialog && 'p-3')}
      >
        {!isDialog && (
          <div className="flex items-center gap-2 mb-3">
            <CardTitle>{credentials?.name}</CardTitle>
            <Badge
              variant={
                credentials?.connectionStatus === 'connected'
                  ? 'secondary'
                  : 'destructive'
              }
            >
              {marketplaceCredentialStatusParse(
                credentials?.connectionStatus ?? 'disconnected',
              )}
            </Badge>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div
            className={cn(
              'grid gap-3',
              isDialog
                ? 'grid-cols-1'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            )}
          >
            <form.Field
              name="marketplaceName"
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
                    disabled={!isEditing && !isCreating}
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
                    disabled={!isEditing && !isCreating}
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
                    disabled={!isEditing && !isCreating}
                  />
                </div>
              )}
            />
            <div className={cn('flex gap-2', isDialog ? '' : 'md:col-span-3')}>
              {!isCreating && (
                <Button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={
                    isTestingConnection ||
                    isEditing ||
                    isCreating ||
                    !credentials?.id
                  }
                >
                  {isTestingConnection ? 'Probando...' : 'Probar conexión'}
                </Button>
              )}
              {!isEditing && !isCreating && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <PencilIcon className="w-4 h-4" />
                  Editar
                </Button>
              )}
              {(isEditing || isCreating) && (
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? 'Guardando...'
                    : isDialog
                    ? 'Agregar'
                    : 'Guardar'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </CardContent>
  );
};

export default ShopifyCredentials;
