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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Filter,
  ExternalLink,
  Eye,
  Plus,
} from 'lucide-react';
import { getProductById } from '../actions/products.server';

type Props = { params: Promise<{ id: string }> };

type MarketplaceVariation = {
  marketplace: string;
  sku: string;
  price: number;
  cost: number;
  margin: number;
  sales30d: number;
  revenue: number;
  unitsSold: number;
  status: 'Active' | 'Paused' | 'Out of Stock';
  lastSync: string;
  // Marketplace-specific fields
  amazonFields?: {
    asin: string;
    category: string;
    fulfillmentMethod: 'FBA' | 'FBM';
    keywords: string[];
  };
  ebayFields?: {
    itemId: string;
    category: string;
    listingType: 'Auction' | 'Fixed Price';
    shippingPolicy: string;
  };
  shopifyFields?: {
    productId: string;
    collection: string;
    seoTitle: string;
    seoDescription: string;
  };
};

// Mock database with multiple products
const db = {
  p1: {
    id: 'p1',
    name: 'Papel Selective Bond Blanco Carta',
    status: 'Active',
    brand: 'Office Lab',
    category: 'Papelería',
    description:
      'Papel bond de alta calidad para impresión y escritura. Ideal para documentos oficiales.',
    weight: '500g',
    dimensions: '21.6 x 27.9 cm',
    images: [
      '/placeholder.svg?height=600&width=600&text=Imagen+Principal',
      '/placeholder.svg?height=600&width=600&text=Vista+Lateral',
      '/placeholder.svg?height=600&width=600&text=Detalle+Textura',
      '/placeholder.svg?height=600&width=600&text=Empaque',
      '/placeholder.svg?height=600&width=600&text=Uso+Oficina',
    ],
    variations: [
      {
        marketplace: 'Amazon',
        sku: 'AMZ-PSB-001',
        price: 29.99,
        cost: 25.45,
        margin: 15.1,
        sales30d: 687,
        revenue: 10243.5,
        unitsSold: 230,
        status: 'Active' as const,
        lastSync: '2025-01-19T10:30:00Z',
        amazonFields: {
          asin: 'B08XYZ123',
          category: 'Office Products > Paper',
          fulfillmentMethod: 'FBA' as const,
          keywords: ['papel', 'bond', 'oficina', 'impresión'],
        },
      },
      {
        marketplace: 'eBay',
        sku: 'EBY-PSB-001',
        price: 32.5,
        cost: 25.45,
        margin: 21.7,
        revenue: 6999.5,
        sales30d: 450,
        unitsSold: 149,
        status: 'Active' as const,
        lastSync: '2025-01-19T09:15:00Z',
        ebayFields: {
          itemId: '123456789012',
          category: 'Business & Industrial > Office Supplies',
          listingType: 'Fixed Price' as const,
          shippingPolicy: 'Standard Shipping',
        },
      },
      {
        marketplace: 'Shopify',
        sku: 'SHP-PSB-001',
        price: 35.0,
        cost: 25.45,
        margin: 27.3,
        sales30d: 0,
        revenue: 0,
        unitsSold: 0,
        status: 'Paused' as const,
        lastSync: '2025-01-18T15:20:00Z',
        shopifyFields: {
          productId: 'gid://shopify/Product/7982542438',
          collection: 'Office Supplies',
          seoTitle: 'Papel Bond Blanco - Calidad Premium',
          seoDescription:
            'Papel bond de alta calidad para todas tus necesidades de oficina',
        },
      },
    ],
  },
  p2: {
    id: 'p2',
    name: 'Papel Bond Scriba Ecológico',
    status: 'Active',
    brand: 'Office Lab',
    category: 'Papelería',
    description:
      'Papel ecológico fabricado con materiales reciclados. Perfecto para uso diario en oficina.',
    weight: '480g',
    dimensions: '21.6 x 27.9 cm',
    images: [
      '/placeholder.svg?height=600&width=600&text=Papel+Ecológico',
      '/placeholder.svg?height=600&width=600&text=Certificación+Verde',
      '/placeholder.svg?height=600&width=600&text=Textura+Natural',
    ],
    variations: [
      {
        marketplace: 'Amazon',
        sku: 'AMZ-PSE-002',
        price: 59.0,
        cost: 39.94,
        margin: 32.4,
        sales30d: 896,
        revenue: 17204,
        unitsSold: 124,
        status: 'Active' as const,
        lastSync: '2025-01-19T11:15:00Z',
        amazonFields: {
          asin: 'B09ABC456',
          category: 'Office Products > Paper > Eco-Friendly',
          fulfillmentMethod: 'FBA' as const,
          keywords: ['papel', 'ecológico', 'reciclado', 'verde'],
        },
      },
    ],
  },
  p3: {
    id: 'p3',
    name: 'Papel Bond Scriba Ecológico Carta',
    status: 'Draft',
    brand: 'Office Lab',
    category: 'Papelería',
    description:
      'Versión carta del papel ecológico Scriba. En desarrollo para lanzamiento próximo.',
    weight: '520g',
    dimensions: '21.6 x 27.9 cm',
    images: ['/placeholder.svg?height=600&width=600&text=Borrador+Producto'],
    variations: [],
  },
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const product = await getProductById(id);
  console.log('🚀 ~ Page ~ productResponse:', product);

  if (!product) {
    notFound();
  }

  // const totalSales = product.variations.reduce(
  //   (sum: number, v: MarketplaceVariation) => sum + v.sales30d,
  //   0,
  // );
  // const totalRevenue = product.variations.reduce(
  //   (sum: number, v: MarketplaceVariation) => sum + v.revenue,
  //   0,
  // );
  // const totalUnits = product.variations.reduce(
  //   (sum: number, v: MarketplaceVariation) => sum + v.unitsSold,
  //   0,
  // );
  // const avgMargin =
  //   product.variations.length > 0
  //     ? product.variations.reduce(
  //         (sum: number, v: MarketplaceVariation) => sum + v.margin,
  //         0,
  //       ) / product.variations.length
  //     : 0;

  const totalSales = 0;
  const totalRevenue = 0;
  const totalUnits = 0;
  const avgMargin = 0;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  const getMarginColor = (margin: number) => {
    if (margin > 25) return 'text-green-600 bg-green-50';
    if (margin > 15) return 'text-blue-600 bg-blue-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Paused':
        return 'bg-yellow-500';
      case 'Out of Stock':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-sm text-muted-foreground">
            {product.brandName} • {product.category}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <Badge
            variant={product.status === 'Active' ? 'default' : 'secondary'}
          >
            {product.status}
          </Badge> */}
          <Button asChild variant="outline">
            <Link href={`/listings?product=${product.id}`}>Ver Listados</Link>
          </Button>
          <Button asChild>
            <Link href={`/products/${product.id}/edit`}>Editar</Link>
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="size-4 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">Ingresos 30d</div>
            </div>
            <div className="text-2xl font-bold">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="size-3" />
              <span>+12.5%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="size-4 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                Unidades Vendidas
              </div>
            </div>
            <div className="text-2xl font-bold">{totalUnits}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="size-3" />
              <span>+8.2%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                Margen Promedio
              </div>
            </div>
            <div className="text-2xl font-bold">{avgMargin.toFixed(1)}%</div>
            <div className="flex items-center gap-1 text-xs text-red-600">
              <TrendingDown className="size-3" />
              <span>-2.1%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded-full bg-green-500"></div>
              <div className="text-sm text-muted-foreground">
                Marketplaces Activos
              </div>
            </div>
            <div className="text-2xl font-bold">
              {
                db.p1.variations.filter(
                  (v: MarketplaceVariation) => v.status === 'Active',
                ).length
              }
            </div>
            <div className="text-xs text-muted-foreground">
              de {db.p1.variations.length} total
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded-full bg-blue-500"></div>
              <div className="text-sm text-muted-foreground">
                Gasto Publicitario 30d
              </div>
            </div>
            <div className="text-2xl font-bold">$2,450</div>
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <span>ROAS: 3.2x</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Images Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Imágenes del Producto</CardTitle>
          <CardDescription>
            {db.p1.images.length} imágenes disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {db.p1.images.map((image: string, index: number) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
              >
                <Image
                  src={image || '/placeholder.svg'}
                  alt={`${product.title} - Imagen ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Eye className="size-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Producto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p>{product.description}</p>
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marca:</span>
                <span className="font-medium">{product.brandName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Categoría:</span>
                <span className="font-medium">{product.category}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peso:</span>
                <span className="font-medium">{product.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensiones:</span>
                {/* <span className="font-medium">
                  {product.dimensions.length} x {product.dimensions.width} x{' '}
                  {product.dimensions.height}
                </span> */}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                {/* <Badge variant="secondary">{product.status}</Badge> */}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marketplaces:</span>
                <span className="font-medium">{db.p1.variations.length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Variations with Filter - Only show if variations exist */}
      {db.p1.variations.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Variaciones por Marketplace</CardTitle>
                <CardDescription>
                  Precios, márgenes y rendimiento en cada plataforma
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los marketplaces</SelectItem>
                    <SelectItem value="Amazon">Amazon</SelectItem>
                    <SelectItem value="eBay">eBay</SelectItem>
                    <SelectItem value="Shopify">Shopify</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marketplace</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Costo</TableHead>
                    <TableHead>Margen</TableHead>
                    <TableHead>Ventas 30d</TableHead>
                    <TableHead>Ingresos</TableHead>
                    <TableHead>Unidades</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Última Sync</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {db.p1.variations.map(
                    (variation: MarketplaceVariation, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {variation.marketplace}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {variation.sku}
                        </TableCell>
                        <TableCell>${variation.price.toFixed(2)}</TableCell>
                        <TableCell>${variation.cost.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getMarginColor(variation.margin)}>
                            {variation.margin.toFixed(1)}%
                          </Badge>
                          {variation.margin > 25 && (
                            <div className="text-xs text-green-600 mt-1">
                              Tienes el mejor precio DH
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {variation.sales30d.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ${variation.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell>{variation.unitsSold}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`size-2 rounded-full ${getStatusColor(
                                variation.status,
                              )}`}
                            ></div>
                            <span className="text-sm">{variation.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(variation.lastSync)}
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Marketplace-Specific Fields - Only show if variations exist */}
      {db.p1.variations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Configuración por Marketplace</CardTitle>
            <CardDescription>
              Campos específicos y configuraciones por plataforma (solo lectura)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="Amazon" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="Amazon">Amazon</TabsTrigger>
                <TabsTrigger value="eBay">eBay</TabsTrigger>
                <TabsTrigger value="Shopify">Shopify</TabsTrigger>
              </TabsList>

              <TabsContent value="Amazon" className="mt-6">
                {(() => {
                  const amazonVariation = db.p1.variations.find(
                    (v: MarketplaceVariation) => v.marketplace === 'Amazon',
                  );
                  if (!amazonVariation?.amazonFields)
                    return (
                      <div className="text-muted-foreground">
                        No hay configuración de Amazon
                      </div>
                    );

                  return (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">ASIN</div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {amazonVariation.amazonFields.asin}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Categoría</div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {amazonVariation.amazonFields.category}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">
                            Método de Fulfillment
                          </div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {amazonVariation.amazonFields.fulfillmentMethod}
                            {amazonVariation.amazonFields.fulfillmentMethod ===
                            'FBA'
                              ? ' (Fulfillment by Amazon)'
                              : ' (Fulfillment by Merchant)'}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Keywords</div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {amazonVariation.amazonFields.keywords.join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={`https://sellercentral.amazon.com/inventory/ref=xx_invmgr_dnav_xx?tbla_myitable=sort:%7B%22sortOrder%22%3A%22DESCENDING%22%2C%22sortedColumnId%22%3A%22date%22%7D;search:${amazonVariation.amazonFields.asin};pagination:1;`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 size-4" />
                            Ver en Amazon Seller Central
                          </a>
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </TabsContent>

              <TabsContent value="eBay" className="mt-6">
                {(() => {
                  const ebayVariation = db.p1.variations.find(
                    (v: MarketplaceVariation) => v.marketplace === 'eBay',
                  );
                  if (!ebayVariation?.ebayFields)
                    return (
                      <div className="text-muted-foreground">
                        No hay configuración de eBay
                      </div>
                    );

                  return (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Item ID</div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {ebayVariation.ebayFields.itemId}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Categoría</div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {ebayVariation.ebayFields.category}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">
                            Tipo de Listado
                          </div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {ebayVariation.ebayFields.listingType ===
                            'Fixed Price'
                              ? 'Precio Fijo'
                              : 'Subasta'}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">
                            Política de Envío
                          </div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {ebayVariation.ebayFields.shippingPolicy}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={`https://www.ebay.com/itm/${ebayVariation.ebayFields.itemId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 size-4" />
                            Ver en eBay
                          </a>
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </TabsContent>

              <TabsContent value="Shopify" className="mt-6">
                {(() => {
                  const shopifyVariation = db.p1.variations.find(
                    (v: MarketplaceVariation) => v.marketplace === 'Shopify',
                  );
                  if (!shopifyVariation?.shopifyFields)
                    return (
                      <div className="text-muted-foreground">
                        No hay configuración de Shopify
                      </div>
                    );

                  return (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Product ID</div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {shopifyVariation.shopifyFields.productId}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Colección</div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {shopifyVariation.shopifyFields.collection}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">SEO Title</div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {shopifyVariation.shopifyFields.seoTitle}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">
                            SEO Description
                          </div>
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {shopifyVariation.shopifyFields.seoDescription}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href="https://admin.shopify.com/store/your-store/products"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 size-4" />
                            Ver en Shopify Admin
                          </a>
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Analytics Tabs */}
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList>
          <TabsTrigger value="analytics">Análisis de Rendimiento</TabsTrigger>
          <TabsTrigger value="history">Historial de Precios</TabsTrigger>
          <TabsTrigger value="competitors">Competencia</TabsTrigger>
          <TabsTrigger value="advertising">Publicidad</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Rendimiento</CardTitle>
              <CardDescription>
                Métricas detalladas por marketplace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/6] w-full rounded-md border bg-muted flex items-center justify-center text-muted-foreground">
                Gráfico de rendimiento por marketplace
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Precios</CardTitle>
              <CardDescription>Evolución de precios y márgenes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/6] w-full rounded-md border bg-muted flex items-center justify-center text-muted-foreground">
                Gráfico de historial de precios
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Competencia</CardTitle>
              <CardDescription>
                Comparación con productos similares
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">
                      Papel Bond Premium - Competidor A
                    </div>
                    <Badge variant="outline">Amazon</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Precio: </span>
                      <span className="font-medium">$27.99</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Ventas est.:{' '}
                      </span>
                      <span className="font-medium">~800/mes</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rating: </span>
                      <span className="font-medium">4.3★</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advertising" className="mt-4">
          <div className="space-y-6">
            {/* Advertising Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">
                    Gasto Total 30d
                  </div>
                  <div className="text-2xl font-bold">$2,450</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="size-3" />
                    <span>+15.3%</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">
                    ROAS Promedio
                  </div>
                  <div className="text-2xl font-bold">3.2x</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="size-3" />
                    <span>+0.4x</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">
                    Impresiones
                  </div>
                  <div className="text-2xl font-bold">124K</div>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <span>CTR: 2.1%</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">
                    Ventas Atribuidas
                  </div>
                  <div className="text-2xl font-bold">$7,840</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="size-3" />
                    <span>+22.1%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advertising by Platform */}
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Campañas Publicitarias por Plataforma</CardTitle>
                    <CardDescription>
                      Rendimiento detallado de cada plataforma publicitaria
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Plus className="mr-2 size-4" />
                      Nueva Campaña
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plataforma</TableHead>
                        <TableHead>Campaña</TableHead>
                        <TableHead>Presupuesto</TableHead>
                        <TableHead>Gasto</TableHead>
                        <TableHead>Impresiones</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>CTR</TableHead>
                        <TableHead>Órdenes</TableHead>
                        <TableHead>Ventas</TableHead>
                        <TableHead>ROAS</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                              A
                            </div>
                            <span className="font-medium">Amazon PPC</span>
                          </div>
                        </TableCell>
                        <TableCell>Sponsored Products - Papel Bond</TableCell>
                        <TableCell>$50/día</TableCell>
                        <TableCell>$1,420</TableCell>
                        <TableCell>89,234</TableCell>
                        <TableCell>1,876</TableCell>
                        <TableCell>2.1%</TableCell>
                        <TableCell>89</TableCell>
                        <TableCell>$4,230</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            2.98x
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">Activa</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href="https://advertising.amazon.com"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="size-4" />
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                              F
                            </div>
                            <span className="font-medium">Facebook Ads</span>
                          </div>
                        </TableCell>
                        <TableCell>Brand Awareness - Office Products</TableCell>
                        <TableCell>$30/día</TableCell>
                        <TableCell>$680</TableCell>
                        <TableCell>24,567</TableCell>
                        <TableCell>492</TableCell>
                        <TableCell>2.0%</TableCell>
                        <TableCell>34</TableCell>
                        <TableCell>$2,380</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            3.50x
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">Activa</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href="https://business.facebook.com/adsmanager"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="size-4" />
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                              G
                            </div>
                            <span className="font-medium">Google Ads</span>
                          </div>
                        </TableCell>
                        <TableCell>Search - Papel Oficina</TableCell>
                        <TableCell>$25/día</TableCell>
                        <TableCell>$350</TableCell>
                        <TableCell>12,890</TableCell>
                        <TableCell>258</TableCell>
                        <TableCell>2.0%</TableCell>
                        <TableCell>18</TableCell>
                        <TableCell>$1,230</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            3.51x
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">Activa</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href="https://ads.google.com"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="size-4" />
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Advertising Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Rendimiento Publicitario - Últimos 30 Días
                </CardTitle>
                <CardDescription>
                  Gasto vs Ventas Atribuidas por plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[16/6] w-full rounded-md border bg-muted flex items-center justify-center text-muted-foreground">
                  Gráfico de rendimiento publicitario (Gasto vs ROAS por día)
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Gestiona tus campañas publicitarias
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-3">
                <Button variant="outline" asChild>
                  <a
                    href="https://advertising.amazon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 size-4" />
                    Amazon Ads Console
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://business.facebook.com/adsmanager"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 size-4" />
                    Facebook Ads Manager
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://ads.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 size-4" />
                    Google Ads
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
