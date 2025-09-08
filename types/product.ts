// Tipos de productos y relacionados

// Producto maestro
export interface Product {
  id: number;
  internalSku: string; // SKU interno único
  title: string; // Título del producto
  description?: string; // Descripción opcional
  brandId?: number; // ID de la marca
  brandName?: string; // Nombre de la marca
  subbrandId?: number; // ID de la sub-marca
  subbrandName?: string; // Nombre de la sub-marca
  providerId?: number; // ID del proveedor
  providerName?: string; // Nombre del proveedor
  category?: string; // Categoría del producto
  weight?: string; // Peso en kg
  dimensions: {
    // Dimensiones (LxWxH)
    length: string;
    width: string;
    height: string;
  };
  barcode?: string; // Código de barras
  price?: string; // Precio base
  cost?: string; // Costo base
  costWithDiscount?: string; // Costo con descuento
  isIvaIncluded: boolean; // IVA incluido
  isSupermarket: boolean; // Es producto de supermercado
  createdById?: number; // Usuario que lo creó
  createdAt: string; // Fecha de creación ISO
  updatedAt: string; // Fecha de última actualización ISO
}

// Request para crear producto
export interface CreateProductRequest {
  internal_sku: string;
  title: string;
  description?: string;
  brand_id?: number;
  subbrandId?: number;
  provider_id?: number;
  category?: string;
  weight?: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  barcode?: string;
  cost?: string;
  cost_with_discount?: string;
  is_iva_included: boolean;
  is_supermarket: boolean;
}

// Request para actualizar producto
export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

// Marca
export interface Brand {
  id: number;
  name: string;
  client_id: number;
  created_at: string;
  updated_at: string;
}

// Request para crear marca
export interface CreateBrandRequest {
  name: string;
}

// Sub-marca
export interface SubBrand {
  id: number;
  brand_id: number;
  brand_name?: string;
  name: string;
  client_id: number;
  created_at: string;
  updated_at: string;
}

// Request para crear sub-marca
export interface CreateSubBrandRequest {
  brand_id: number;
  name: string;
}

// Proveedor
export interface Provider {
  id: number;
  name: string;
  email?: string;
  contact_info?: {
    phone?: string;
    address?: string;
  };
  client_id: number;
  created_at: string;
  updated_at: string;
}

// Request para crear proveedor
export interface CreateProviderRequest {
  name: string;
  email?: string;
  contact_info?: {
    phone?: string;
    address?: string;
  };
}

// Listado de Marketplace
export interface MarketplaceListing {
  id: number;
  marketplace_type: 'amazon' | 'mercadolibre' | 'shopify' | 'ebay' | 'walmart';
  marketplace_id: string; // ID único en el marketplace
  external_sku?: string; // SKU externo
  title?: string; // Título en el marketplace
  price?: string; // Precio de venta
  currency: string; // Moneda (USD, EUR, ARS, etc.)
  inventory_quantity?: number; // Cantidad en inventario
  status?: string; // Estado del listado
  is_fulfillment: boolean; // Es fulfillment
  listing_fee?: string; // Comisión del marketplace
  shipment_fee?: string; // Costo de envío
  listing_type?: string; // Tipo de listado
  official_store_name?: string; // Nombre de la tienda oficial
  thumbnail_url?: string; // URL de la imagen
  permalink?: string; // URL del producto
  metadata?: object; // Metadatos adicionales
  product_id?: number; // ID del producto maestro
  client_id: number;
  created_at: string;
  updated_at: string;
}

// Coincidencia de Producto
export interface ProductMatch {
  id: number;
  product_id: number; // ID del producto maestro
  marketplace_listing_id: number; // ID del listado
  confidence_score: string; // Puntuación de confianza (0-1)
  match_type: 'auto' | 'manual' | 'rejected';
  match_criteria?: object; // Criterios de coincidencia
  reviewed_by_id?: number; // Usuario que revisó
  reviewed_at?: string; // Fecha de revisión
  status: 'active' | 'inactive' | 'rejected';
  created_at: string;
  updated_at: string;
}

// Historial de Precios
export interface PriceHistory {
  id: number;
  product_id?: number;
  marketplace_listing_id?: number;
  old_price: string;
  new_price: string;
  currency: string;
  change_date: string;
  change_reason?: string;
  created_at: string;
}

// Trazabilidad de Competidores
export interface ProductTracing {
  id: number;
  product_id: number;
  marketplace_type: 'amazon' | 'mercadolibre' | 'shopify' | 'ebay' | 'walmart';
  competitor_sku?: string;
  competitor_price?: string;
  competitor_currency?: string;
  competitor_title?: string;
  competitor_url?: string;
  last_updated: string;
  created_at: string;
}

// Filtros para productos
export interface ProductFilters {
  brand?: number;
  provider?: number;
  category?: string;
  page?: number;
  page_size?: number;
}

// Filtros para listados de marketplace
export interface MarketplaceListingFilters {
  marketplace_type?: 'amazon' | 'mercadolibre' | 'shopify' | 'ebay' | 'walmart';
  product?: number;
  status?: string;
  page?: number;
  page_size?: number;
}

// Filtros para coincidencias de productos
export interface ProductMatchFilters {
  product?: number;
  marketplace_listing?: number;
  match_type?: 'auto' | 'manual' | 'rejected';
  status?: 'active' | 'inactive' | 'rejected';
  page?: number;
  page_size?: number;
}

// Filtros para historial de precios
export interface PriceHistoryFilters {
  product?: number;
  marketplace_listing?: number;
  page?: number;
  page_size?: number;
}

// Filtros para trazabilidad de competidores
export interface ProductTracingFilters {
  product?: number;
  marketplace_type?: 'amazon' | 'mercadolibre' | 'shopify' | 'ebay' | 'walmart';
  page?: number;
  page_size?: number;
}

// Filtros para marcas
export interface BrandFilters {
  page?: number;
  page_size?: number;
}

// Filtros para sub-marcas
export interface SubBrandFilters {
  brand?: number;
  page?: number;
  page_size?: number;
}

// Filtros para proveedores
export interface ProviderFilters {
  page?: number;
  page_size?: number;
}

// Respuestas paginadas
export interface PaginatedResponse<T> {
  T: T[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

// Tipos específicos de respuesta
export type ProductListResponse = {
  products: Product[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
};

export type ProductListServerResponse = {
  data: ProductListResponse;
  success: boolean;
  message: string;
};
export type BrandListResponse = PaginatedResponse<Brand>;
export type SubBrandListResponse = PaginatedResponse<SubBrand>;
export type ProviderListResponse = PaginatedResponse<Provider>;
export type MarketplaceListingListResponse =
  PaginatedResponse<MarketplaceListing>;
export type ProductMatchListResponse = PaginatedResponse<ProductMatch>;
export type PriceHistoryListResponse = PaginatedResponse<PriceHistory>;
export type ProductTracingListResponse = PaginatedResponse<ProductTracing>;
