'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MarketplaceCredential } from '@/types/marketplace';
import { useForm } from '@tanstack/react-form';
import { cn } from '@/lib/utils';

const AmazonCredentials = ({
  credentials,
  isDialog = false,
}: {
  credentials?: MarketplaceCredential;
  isDialog?: boolean;
}) => {
  const isAmazonCredentials = (
    creds: MarketplaceCredential['credentials'],
  ): creds is {
    aws_access_key_id: string;
    aws_secret_access_key: string;
    aws_region: string;
    marketplace_id: string;
    seller_id: string;
    role_arn: string;
  } => {
    return (
      'aws_access_key_id' in creds &&
      'aws_secret_access_key' in creds &&
      'aws_region' in creds &&
      'marketplace_id' in creds &&
      'seller_id' in creds &&
      'role_arn' in creds
    );
  };

  const form = useForm({
    defaultValues: {
      marketplace_name: credentials?.marketplace_name || '',
      aws_access_key_id:
        credentials && isAmazonCredentials(credentials.credentials)
          ? credentials.credentials.aws_access_key_id
          : '',
      aws_secret_access_key:
        credentials && isAmazonCredentials(credentials.credentials)
          ? credentials.credentials.aws_secret_access_key
          : '',
      aws_region:
        credentials && isAmazonCredentials(credentials.credentials)
          ? credentials.credentials.aws_region
          : '',
      marketplace_id:
        credentials && isAmazonCredentials(credentials.credentials)
          ? credentials.credentials.marketplace_id
          : '',
      seller_id:
        credentials && isAmazonCredentials(credentials.credentials)
          ? credentials.credentials.seller_id
          : '',
      role_arn:
        credentials && isAmazonCredentials(credentials.credentials)
          ? credentials.credentials.role_arn
          : '',
    },
    onSubmit: ({ value }) => {
      console.log('🚀 ~ handleSubmit ~ data:', value);
      // Aquí puedes agregar la lógica para guardar las credenciales
    },
  });

  return (
    <div
      key={'amazon'}
      className={cn('rounded-md border p-3', isDialog && 'p-3')}
    >
      {!isDialog && <div className="mb-3 text-md font-bold">Amazon</div>}
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
                <Label htmlFor="amazon-marketplace-name">
                  Nombre de marketplace
                </Label>
                <Input
                  id="amazon-marketplace-name"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="aws_access_key_id"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="amazon-aws-access-key-id">
                  AWS Access Key ID
                </Label>
                <Input
                  id="amazon-aws-access-key-id"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="aws_secret_access_key"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="amazon-aws-secret-access-key">
                  AWS Secret Access Key
                </Label>
                <Input
                  id="amazon-aws-secret-access-key"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="aws_region"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="amazon-aws-region">AWS Region</Label>
                <Input
                  id="amazon-aws-region"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="marketplace_id"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="amazon-marketplace-id">Marketplace ID</Label>
                <Input
                  id="amazon-marketplace-id"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="seller_id"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="amazon-seller-id">Seller ID</Label>
                <Input
                  id="amazon-seller-id"
                  placeholder="••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="role_arn"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor="amazon-role-arn">Role ARN</Label>
                <Input
                  id="amazon-role-arn"
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

export default AmazonCredentials;
