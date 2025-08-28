'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MarketplaceCredential } from '@/types/marketplace';
import { useForm } from '@tanstack/react-form';
import { cn } from '@/lib/utils';

const MercadoLibreCredentials = ({
  credentials,
  isDialog = false,
}: {
  credentials?: MarketplaceCredential;
  isDialog?: boolean;
}) => {
  const isMercadoLibreCredentials = (
    creds: MarketplaceCredential['credentials'],
  ): creds is {
    app_id: string;
    secret_key: string;
    redirect_uri: string;
    user_id: string;
    country_code: string;
  } => {
    return (
      'app_id' in creds &&
      'secret_key' in creds &&
      'redirect_uri' in creds &&
      'user_id' in creds &&
      'country_code' in creds
    );
  };

  const form = useForm({
    defaultValues: {
      marketplace_name: credentials?.marketplace_name || '',
      app_id:
        credentials && isMercadoLibreCredentials(credentials.credentials)
          ? credentials.credentials.app_id
          : '',
      secret_key:
        credentials && isMercadoLibreCredentials(credentials.credentials)
          ? credentials.credentials.secret_key
          : '',
      redirect_uri:
        credentials && isMercadoLibreCredentials(credentials.credentials)
          ? credentials.credentials.redirect_uri
          : '',
      user_id:
        credentials && isMercadoLibreCredentials(credentials.credentials)
          ? credentials.credentials.user_id
          : '',
      country_code:
        credentials && isMercadoLibreCredentials(credentials.credentials)
          ? credentials.credentials.country_code
          : '',
    },
    onSubmit: ({ value }) => {
      console.log('🚀 ~ handleSubmit ~ data:', value);
      // Aquí puedes agregar la lógica para guardar las credenciales
    },
  });

  return (
    <div
      key={'mercadolibre'}
      className={cn('rounded-md border p-3', isDialog && 'p-3')}
    >
      {!isDialog && <div className="mb-3 text-md font-bold">Mercado Libre</div>}
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
            isDialog ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3',
          )}
        >
          <form.Field
            name="marketplace_name"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="mercadolibre-store-name">
                  Nombre de Marketplace
                </Label>
                <Input
                  id="mercadolibre-store-name"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="app_id"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="mercadolibre-app-id">App ID</Label>
                <Input
                  id="mercadolibre-app-id"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="secret_key"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="mercadolibre-secret-key">Secret Key</Label>
                <Input
                  id="mercadolibre-secret-key"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />

          <form.Field
            name="user_id"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="mercadolibre-user-id">User ID</Label>
                <Input
                  id="mercadolibre-user-id"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="country_code"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="mercadolibre-country-code">Country Code</Label>
                <Input
                  id="mercadolibre-country-code"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="redirect_uri"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="mercadolibre-redirect-uri">Redirect URI</Label>
                <Input
                  id="mercadolibre-redirect-uri"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <div className={cn('flex gap-2', isDialog ? '' : 'md:col-span-3')}>
            {!isDialog && (
              <Button type="button" variant="outline">
                Probar conexión
              </Button>
            )}
            <Button type="submit">{isDialog ? 'Agregar' : 'Guardar'}</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MercadoLibreCredentials;
