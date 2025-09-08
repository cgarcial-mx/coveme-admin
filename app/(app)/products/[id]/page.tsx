'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useProduct } from '../hooks/queries/useProduct';
import { useProductMatches } from '../hooks/queries/useProductMatches';
import { usePriceHistory } from '../hooks/queries/usePriceHistory';
import { useProductListings } from '../hooks/queries/useProductListings';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, Calendar, Package, Tag } from 'lucide-react';

type Props = { params: Promise<{ id: string }> };

export default function Page({ params }: Props) {
  const { id } = use(params);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useProduct(id);
  const {
    data: matches,
    isLoading: matchesLoading,
    error: matchesError,
  } = useProductMatches(id);
  const {
    data: priceHistory,
    isLoading: priceHistoryLoading,
    error: priceHistoryError,
  } = usePriceHistory(id);
  const {
    data: listings,
    isLoading: listingsLoading,
    error: listingsError,
  } = useProductListings(id);

  if (productError) {
    notFound();
  }

  if (productLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
              {/* Back to Products */}
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-bold">{product.title}</h1>
            {/* <p className="text-sm text-muted-foreground">
              {product.}
            </p> */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <Badge variant="secondary" className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            {product.}
          </Badge> */}
          <Button asChild variant="outline">
            <Link href={`/listings?product=${product.id}`}>Ver Listings</Link>
          </Button>
          <Button>Editar Producto</Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Product Image */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            {/* <Image
              alt="Product image"
              src=
              width={900}
              height={600}
              className="aspect-[3/2] w-full rounded-md border object-cover"
            /> */}
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {typeof product.description === 'string' &&
                /<\/?[a-z][\s\S]*>/i.test(product.description) ? (
                  // If the description contains HTML tags, render it as HTML (dangerouslySetInnerHTML)
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    className="prose max-w-none"
                  />
                ) : (
                  // Otherwise, render as plain text
                  product.description
                )}
              </CardDescription>
            </CardContent>
          </CardContent>
        </Card>

        {/* Product Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Detalles del Producto
              </CardTitle>
              <CardDescription>
                Atributos e información de precios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marca</span>
                <span className="font-medium">
                  {product.brand_name || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sub-marca</span>
                <span className="font-medium">
                  {product.subbrand_name || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Proveedor</span>
                <span className="font-medium">
                  {product.provider_name || 'N/A'}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Categoria</span>
                <Badge variant="secondary" className="font-medium">
                  <span className="font-medium">
                    {product.category || 'N/A'}
                  </span>
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Precio</span>
                <span className="font-medium">
                  {product.cost ? `$${product.cost}` : 'N/A'}
                </span>
              </div>
              {product.cost_with_discount && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Precio (con descuento)
                  </span>
                  <span className="font-medium text-green-600">
                    ${product.cost_with_discount}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-4" />
                Propiedades Físicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peso</span>
                <span className="font-medium">
                  {product.weight ? `${product.weight} kg` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensiones</span>
                <span className="font-medium text-right">
                  {product.dimensions &&
                  (product.dimensions.length != null ||
                    product.dimensions.width != null ||
                    product.dimensions.height != null)
                    ? `${product.dimensions.length ?? 'N/A'} × ${
                        product.dimensions.width ?? 'N/A'
                      } × ${product.dimensions.height ?? 'N/A'}`
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Barcode</span>
                <span className="font-medium">{product.barcode || 'N/A'}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Creado</span>
                <span className="font-medium">
                  {product.created_at
                    ? new Date(product.created_at).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Actualizado</span>
                <span className="font-medium">
                  {product.updated_at
                    ? new Date(product.updated_at).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IVA Incluido</span>
                <Badge
                  variant={product.is_iva_included ? 'default' : 'secondary'}
                >
                  {product.is_iva_included ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Supermercado</span>
                <Badge
                  variant={product.is_supermarket ? 'default' : 'secondary'}
                >
                  {product.is_supermarket ? 'Yes' : 'No'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="listings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="analytics">Analítica</TabsTrigger>
          <TabsTrigger value="history">Historial de Precios</TabsTrigger>
          <TabsTrigger value="matches">Coincidencias</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Price Over Time</CardTitle>
              <CardDescription>
                Track price changes and their reasons
              </CardDescription>
            </CardHeader>
            <CardContent>
              {priceHistoryLoading ? (
                <div className="aspect-[16/6] w-full rounded-md border bg-muted flex items-center justify-center">
                  <Skeleton className="h-8 w-32" />
                </div>
              ) : priceHistoryError ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Failed to load price history. Please try again later.
                  </AlertDescription>
                </Alert>
              ) : priceHistory && priceHistory.results.length > 0 ? (
                <div className="space-y-3">
                  {priceHistory.results.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium">
                          {new Date(entry.change_date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {entry.change_reason || 'Price change'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground line-through">
                          ${entry.old_price}
                        </div>
                        <div className="font-semibold text-lg">
                          ${entry.new_price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-[16/6] w-full rounded-md border bg-muted flex items-center justify-center text-muted-foreground">
                  No price history available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Potential Matches</CardTitle>
              <CardDescription>
                Confidence score and match criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {matchesLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="rounded-md border p-3">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : matchesError ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Failed to load product matches. Please try again later.
                  </AlertDescription>
                </Alert>
              ) : matches && matches.results.length > 0 ? (
                matches.results.map((match) => (
                  <div
                    key={match.id}
                    className="rounded-md border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Match #{match.id}</div>
                      <Badge variant="secondary">
                        Confidence{' '}
                        {Math.round(parseFloat(match.confidence_score) * 100)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Match type: {match.match_type} • Status: {match.status}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No matches found for this product
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Listings</CardTitle>
              <CardDescription>
                Active listings across different marketplaces
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {listingsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-md border p-3">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : listingsError ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Failed to load marketplace listings. Please try again later.
                  </AlertDescription>
                </Alert>
              ) : listings && listings.results.length > 0 ? (
                listings.results.map((listing) => (
                  <div
                    key={listing.id}
                    className="rounded-md border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        {listing.title || `Listing #${listing.id}`}
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {listing.marketplace_type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      SKU: {listing.external_sku || 'N/A'} • Price:{' '}
                      {listing.price
                        ? `${listing.currency} ${listing.price}`
                        : 'N/A'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: {listing.status || 'Unknown'} • Inventory:{' '}
                      {listing.inventory_quantity || 0}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No marketplace listings found for this product
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Key performance indicators and analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Conversion Rate
                </div>
                <div className="text-2xl font-bold text-green-600">3.2%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  +0.5% from last month
                </div>
              </div>
              <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Profit Margin
                </div>
                <div className="text-2xl font-bold text-blue-600">18.7%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  +2.1% from last month
                </div>
              </div>
              <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Avg. Position
                </div>
                <div className="text-2xl font-bold text-purple-600">4.1</div>
                <div className="text-xs text-muted-foreground mt-1">
                  -0.3 from last month
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-16" />
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-3">
            <Skeleton className="aspect-[3/2] w-full rounded-md" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-20 mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <Skeleton className="h-10 w-80 mb-4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-[16/6] w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
