import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProducts } from './actions/products.server';
import ProductsTable from './_components/ProductsTable';

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Productos</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/products/bulk">Bulk Operations</Link>
          </Button>
          <Button asChild>
            <Link href="/products/new">Create Product</Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Catalogo de productos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ProductsTable products={products} caption="Catalogo de productos" />
        </CardContent>
      </Card>
    </div>
  );
}
