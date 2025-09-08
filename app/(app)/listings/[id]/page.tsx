'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ImageGallery } from '@/components/image-gallery';
import {
  Globe,
  ExternalLink,
  RefreshCw,
  Edit,
  TrendingUp,
  Eye,
  ShoppingCart,
  Package,
  DollarSign,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useGetListing } from '../hooks/queries/useGetListing';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ListingDetailSkeleton } from '../_components/ListingDetailSkeleton';

type Props = { params: Promise<{ id: string }> };

export default function Page({ params }: Props) {
  const { id } = use(params);
  const { data: listing, isLoading, error } = useGetListing(id);

  if (error) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading listing: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <ListingDetailSkeleton />;
  }

  if (!listing) {
    notFound();
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return 'Invalid date';
    }
  };

  const formatPrice = (
    price: string | undefined,
    currency: string | undefined,
  ) => {
    if (!price) return 'N/A';
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(numPrice);
  };

  const getStatusVariant = (status: string | undefined) => {
    if (!status) return 'secondary';

    switch (status.toLowerCase()) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'suspended':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getMarketplaceDisplayName = (type: string) => {
    const marketplaceNames: Record<string, string> = {
      amazon: 'Amazon',
      mercadolibre: 'MercadoLibre',
      shopify: 'Shopify',
      ebay: 'eBay',
      walmart: 'Walmart',
    };
    return marketplaceNames[type] || type;
  };

  // Mock metrics for now - replace with real API data when available
  const mockMetrics = {
    views: Math.floor(Math.random() * 2000) + 500,
    clicks: Math.floor(Math.random() * 200) + 50,
    orders: Math.floor(Math.random() * 50) + 10,
    conversion: (Math.random() * 5 + 1).toFixed(1),
    ranking: Math.floor(Math.random() * 10) + 1,
  };

  // Generate images from API data instead of mock data
  const images =
    listing.images && listing.images.length > 0
      ? listing.images.map((img) => img.url)
      : listing.thumbnail_url
      ? [listing.thumbnail_url]
      : [
          `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(
            listing.title || 'Product',
          )}`,
          `/placeholder.svg?height=600&width=600&text=View+2`,
          `/placeholder.svg?height=600&width=600&text=View+3`,
        ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">
            {listing.title || 'Untitled Listing'}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="size-4" />
            <span>{getMarketplaceDisplayName(listing.marketplace_type)}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>ID: {listing.marketplace_id}</span>
            {listing.external_sku && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <span>SKU: {listing.external_sku}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusVariant(listing.status)}>
            {listing.status || 'Unknown'}
          </Badge>
          {listing.permalink && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={listing.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 size-4" />
                View on {getMarketplaceDisplayName(listing.marketplace_type)}
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 size-4" />
            Sync Now
          </Button>
          <Button size="sm">
            <Edit className="mr-2 size-4" />
            Edit Listing
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Images */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>
                {listing.image_count || images.length} image
                {(listing.image_count || images.length) !== 1 ? 's' : ''}{' '}
                available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageGallery images={images} alt={listing.title || 'Product'} />
            </CardContent>
          </Card>
        </div>

        {/* Details Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Current Price
                  </span>
                </div>
                <span className="text-lg font-semibold">
                  {formatPrice(listing.price, listing.currency)}
                </span>
              </div>

              {listing.listing_fee && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Listing Fee
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(listing.listing_fee, listing.currency)}
                  </span>
                </div>
              )}

              {listing.shipment_fee && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Shipment Fee
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(listing.shipment_fee, listing.currency)}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Inventory
                  </span>
                </div>
                <span
                  className={`font-medium ${
                    listing.inventory_quantity !== undefined &&
                    listing.inventory_quantity < 10
                      ? 'text-amber-600'
                      : listing.inventory_quantity === 0
                      ? 'text-red-600'
                      : ''
                  }`}
                >
                  {listing.inventory_quantity !== undefined
                    ? `${listing.inventory_quantity} units`
                    : 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Last Updated
                  </span>
                </div>
                <span className="text-sm">
                  {formatDate(listing.updated_at)}
                </span>
              </div>

              {listing.listing_type && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Listing Type
                  </span>
                  <Badge variant="outline">{listing.listing_type}</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="size-4 text-muted-foreground" />
                  <span className="text-sm">Views</span>
                </div>
                <span className="font-medium">
                  {mockMetrics.views.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-muted-foreground" />
                  <span className="text-sm">Clicks</span>
                </div>
                <span className="font-medium">{mockMetrics.clicks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="size-4 text-muted-foreground" />
                  <span className="text-sm">Orders</span>
                </div>
                <span className="font-medium">{mockMetrics.orders}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Conversion Rate
                </span>
                <span className="font-medium">{mockMetrics.conversion}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Search Ranking
                </span>
                <span className="font-medium">#{mockMetrics.ranking}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="history">Price History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Marketplace ID:
                      </span>
                      <span>{listing.marketplace_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        External SKU:
                      </span>
                      <span>{listing.external_sku || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={getStatusVariant(listing.status)}>
                        {listing.status || 'Unknown'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Fulfillment:
                      </span>
                      <span>{listing.is_fulfillment ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Timestamps</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{formatDate(listing.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Updated:</span>
                      <span>{formatDate(listing.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {listing.official_store_name && (
                <div>
                  <h4 className="font-medium mb-2">Store Information</h4>
                  <p className="text-sm">{listing.official_store_name}</p>
                </div>
              )}

              {listing.images && listing.images.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Image Details</h4>
                  <div className="space-y-3">
                    {listing.images.map((image, index) => (
                      <div
                        key={image.id}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <div className="w-16 h-16 relative overflow-hidden rounded border">
                          <img
                            src={image.url}
                            alt={image.alt_text || `Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              Position {image.position}
                            </span>
                            {image.position === 1 && (
                              <Badge variant="outline" className="text-xs">
                                Primary
                              </Badge>
                            )}
                          </div>
                          {image.alt_text && (
                            <p className="text-sm text-muted-foreground">
                              {image.alt_text}
                            </p>
                          )}
                          {image.width && image.height && (
                            <p className="text-xs text-muted-foreground">
                              {image.width} × {image.height}px
                            </p>
                          )}
                          {image.variant_ids &&
                            image.variant_ids.length > 0 && (
                              <p className="text-xs text-muted-foreground">
                                Variants: {image.variant_ids.join(', ')}
                              </p>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {listing.metadata && Object.keys(listing.metadata).length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Additional Metadata</h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {Object.entries(listing.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{key}:</span>
                        <span>{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Price History</CardTitle>
              <CardDescription>Price changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/6] w-full rounded-md border bg-muted flex items-center justify-center text-muted-foreground">
                Price history chart placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>Performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="aspect-square rounded-md border bg-muted flex items-center justify-center text-muted-foreground">
                  Traffic sources chart
                </div>
                <div className="aspect-square rounded-md border bg-muted flex items-center justify-center text-muted-foreground">
                  Conversion funnel
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
