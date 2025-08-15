'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MarketplaceCredential } from '@/types/marketplace';
import { useForm } from '@tanstack/react-form';

const ShopifyCredentials = ({
  credentials,
}: {
  credentials?: MarketplaceCredential;
}) => {
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
    onSubmit: ({ value }) => {
      console.log('🚀 ~ handleSubmit ~ data:', value);
      // Aquí puedes agregar la lógica para guardar las credenciales
    },
  });

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
            <Button type="button" variant="outline">
              Probar conexión
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShopifyCredentials;
