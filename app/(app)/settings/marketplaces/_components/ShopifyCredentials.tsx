import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ShopifyCredentials = () => {
  return (
    <div key={'shopify'} className="rounded-md border p-3">
      <div className="mb-3 text-md font-bold">Shopify</div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor={`shopify-store-name`}>Nombre de tienda</Label>
          <Input id={`shopify-store-name`} placeholder="••••••" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`shopify-shop-url`}>Shop URL</Label>
          <Input id={`shopify-shop-url`} placeholder="••••••.myshopify.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`shopify-access-token`}>Access Token</Label>
          <Input id={`shopify-access-token`} placeholder="••••••" />
        </div>
        <div className="md:col-span-3 flex gap-2">
          <Button variant="outline">Probar conexión</Button>
          <Button>Guardar</Button>
        </div>
      </div>
    </div>
  );
};

export default ShopifyCredentials;
