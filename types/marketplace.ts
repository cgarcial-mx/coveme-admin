// Tipos de marketplace soportados
export type MarketplaceType =
  | 'amazon'
  | 'mercadolibre'
  | 'shopify'
  | 'ebay'
  | 'walmart';

// Estados de conexión
export type ConnectionStatus =
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'pending';

// Credenciales específicas por marketplace
export interface AmazonCredentials {
  aws_access_key_id: string;
  aws_secret_access_key: string;
  aws_region: string;
  marketplace_id: string;
  seller_id: string;
  role_arn: string;
}

export interface MercadoLibreCredentials {
  user_id: string;
  country_code: string;
  app_id: string;
  secret_key: string;
  redirect_uri: string;
}

export interface ShopifyCredentials {
  shop_url: string;
  access_token: string;
  api_version?: string;
  webhook_secret?: string;
}

export interface EbayCredentials {
  client_id: string;
  client_secret: string;
  access_token: string;
  refresh_token: string;
  environment: 'sandbox' | 'production';
}

export interface WalmartCredentials {
  client_id: string;
  client_secret: string;
  consumer_id: string;
  private_key: string;
  environment: 'sandbox' | 'production';
}

// Union type para todas las credenciales
export type MarketplaceCredentials =
  | AmazonCredentials
  | MercadoLibreCredentials
  | ShopifyCredentials
  | EbayCredentials
  | WalmartCredentials;

// Interface principal para marketplace credentials
export interface MarketplaceCredential {
  id: number;
  client_id: number;
  marketplace_type: MarketplaceType;
  marketplace_name: string;
  credentials: MarketplaceCredentials;
  webhook_url?: string;
  connection_status: ConnectionStatus;
  last_sync_date?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

// Request para crear credenciales
export interface CreateMarketplaceCredentialRequest {
  marketplace_type: MarketplaceType;
  marketplace_name: string;
  credentials: MarketplaceCredentials;
  webhook_url?: string;
}

// Request para actualizar credenciales
export interface UpdateMarketplaceCredentialRequest {
  marketplace_name?: string;
  credentials?: Partial<MarketplaceCredentials>;
  webhook_url?: string;
  is_active?: boolean;
}

// Filtros para listar credenciales
export interface MarketplaceCredentialFilters {
  client?: number;
  marketplace_type?: MarketplaceType;
  connection_status?: ConnectionStatus;
  is_active?: boolean;
}

// Response para listar credenciales
export interface MarketplaceCredentialListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: MarketplaceCredential[];
}

// Schema de validación para credenciales
export interface CredentialSchema {
  marketplace_type: MarketplaceType;
  required_fields: string[];
  optional_fields: string[];
  field_descriptions: Record<string, string>;
  validation_rules: Record<string, any>;
}

// Response para validación de credenciales
export interface ValidationResponse {
  is_valid: boolean;
  errors?: string[];
  warnings?: string[];
}

// Response para test de conexión
export interface ConnectionTestResponse {
  status: string;
  message: string;
  connection_details?: {
    marketplace_name?: string;
    account_info?: any;
    api_version?: string;
  };
  error_details?: {
    error_code?: string;
    error_message?: string;
  };
}

// Response para sincronización
export interface SyncResponse {
  success: boolean;
  message: string;
  sync_details?: {
    products_synced: number;
    listings_synced: number;
    errors_count: number;
    sync_duration: string;
  };
  errors?: string[];
}

// Errores específicos de la API
export interface MarketplaceApiError {
  error: string;
  message: string;
  received_type?: string;
  field_errors?: Record<string, string[]>;
}

// Constantes para validación
export const MARKETPLACE_TYPES: MarketplaceType[] = [
  'amazon',
  'mercadolibre',
  'shopify',
  'ebay',
  'walmart',
];

export const CONNECTION_STATUSES: ConnectionStatus[] = [
  'connected',
  'disconnected',
  'error',
  'pending',
];

// Schemas de validación por marketplace
export const MARKETPLACE_SCHEMAS: Record<MarketplaceType, CredentialSchema> = {
  amazon: {
    marketplace_type: 'amazon',
    required_fields: [
      'aws_access_key_id',
      'aws_secret_access_key',
      'aws_region',
      'marketplace_id',
      'seller_id',
    ],
    optional_fields: ['role_arn'],
    field_descriptions: {
      aws_access_key_id: 'AWS Access Key ID',
      aws_secret_access_key: 'AWS Secret Access Key',
      aws_region: 'AWS Region (e.g., us-east-1)',
      marketplace_id: 'Amazon Marketplace ID',
      seller_id: 'Amazon Seller ID',
      role_arn: 'AWS IAM Role ARN (optional)',
    },
    validation_rules: {
      aws_access_key_id: { pattern: /^AKIA[0-9A-Z]{16}$/ },
      aws_region: {
        enum: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
      },
    },
  },
  mercadolibre: {
    marketplace_type: 'mercadolibre',
    required_fields: [
      'access_token',
      'refresh_token',
      'user_id',
      'country_code',
      'site_id',
    ],
    optional_fields: [],
    field_descriptions: {
      access_token: 'MercadoLibre Access Token',
      refresh_token: 'MercadoLibre Refresh Token',
      user_id: 'MercadoLibre User ID',
      country_code: 'Country Code (e.g., AR, MX, BR)',
      site_id: 'Site ID (e.g., MLA, MLM, MLB)',
    },
    validation_rules: {
      country_code: { enum: ['AR', 'MX', 'BR', 'CO', 'CL', 'PE', 'UY'] },
      site_id: { enum: ['MLA', 'MLM', 'MLB', 'MCO', 'MLC', 'MPE', 'MLU'] },
    },
  },
  shopify: {
    marketplace_type: 'shopify',
    required_fields: ['shop_url', 'access_token'],
    optional_fields: ['api_version', 'webhook_secret'],
    field_descriptions: {
      shop_url: 'Shopify Store URL (e.g., https://store.myshopify.com)',
      access_token: 'Shopify Access Token',
      api_version: 'API Version (default: 2024-01)',
      webhook_secret: 'Webhook Secret for verification',
    },
    validation_rules: {
      shop_url: { pattern: /^https:\/\/[a-zA-Z0-9-]+\.myshopify\.com$/ },
      api_version: { pattern: /^\d{4}-\d{2}$/ },
    },
  },
  ebay: {
    marketplace_type: 'ebay',
    required_fields: [
      'client_id',
      'client_secret',
      'access_token',
      'refresh_token',
      'environment',
    ],
    optional_fields: [],
    field_descriptions: {
      client_id: 'eBay Client ID',
      client_secret: 'eBay Client Secret',
      access_token: 'eBay Access Token',
      refresh_token: 'eBay Refresh Token',
      environment: 'Environment (sandbox or production)',
    },
    validation_rules: {
      environment: { enum: ['sandbox', 'production'] },
    },
  },
  walmart: {
    marketplace_type: 'walmart',
    required_fields: [
      'client_id',
      'client_secret',
      'consumer_id',
      'private_key',
      'environment',
    ],
    optional_fields: [],
    field_descriptions: {
      client_id: 'Walmart Client ID',
      client_secret: 'Walmart Client Secret',
      consumer_id: 'Walmart Consumer ID',
      private_key: 'Walmart Private Key',
      environment: 'Environment (sandbox or production)',
    },
    validation_rules: {
      environment: { enum: ['sandbox', 'production'] },
    },
  },
};

// Marketplace Listings Types
export interface MarketplaceListing {
  id: number;
  client_id: number;
  product_id?: number;
  marketplace_type: MarketplaceType;
  marketplace_id: string;
  external_sku?: string;
  title?: string;
  price?: string;
  currency?: string;
  inventory_quantity?: number;
  status?: string;
  is_fulfillment?: boolean;
  listing_fee?: string;
  shipment_fee?: string;
  listing_type?: string;
  official_store_name?: string;
  thumbnail_url?: string;
  permalink?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Request for creating a listing
export interface CreateMarketplaceListingRequest {
  client_id: number;
  product_id?: number;
  marketplace_type: MarketplaceType;
  marketplace_id: string;
  external_sku?: string;
  title?: string;
  price?: string;
  currency?: string;
  inventory_quantity?: number;
  status?: string;
  is_fulfillment?: boolean;
  listing_fee?: string;
  shipment_fee?: string;
  listing_type?: string;
  official_store_name?: string;
  thumbnail_url?: string;
  permalink?: string;
  metadata?: Record<string, any>;
}

// Request for updating a listing
export interface UpdateMarketplaceListingRequest {
  product_id?: number;
  external_sku?: string;
  title?: string;
  price?: string;
  currency?: string;
  inventory_quantity?: number;
  status?: string;
  is_fulfillment?: boolean;
  listing_fee?: string;
  shipment_fee?: string;
  listing_type?: string;
  official_store_name?: string;
  thumbnail_url?: string;
  permalink?: string;
  metadata?: Record<string, any>;
}

// Filters for listing listings
export interface MarketplaceListingFilters {
  client?: number;
  marketplace_type?: MarketplaceType;
  status?: string;
  is_fulfillment?: boolean;
  price_min?: number;
  price_max?: number;
}

// Response for listing listings
export interface MarketplaceListingListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: MarketplaceListing[];
}

// Bulk operations
export interface BulkCreateListingsRequest {
  listings: CreateMarketplaceListingRequest[];
}

export interface BulkUpdateListingsRequest {
  ids: number[];
  updates: Partial<UpdateMarketplaceListingRequest>;
}

// Validation and error types for listings
export interface ListingValidationError {
  field: string;
  message: string;
}

export interface ListingValidationResponse {
  is_valid: boolean;
  errors?: ListingValidationError[];
  warnings?: string[];
}

// Listing status constants
export const LISTING_STATUSES = [
  'active',
  'inactive',
  'pending',
  'suspended',
  'draft',
] as const;

export type ListingStatus = (typeof LISTING_STATUSES)[number];

// Listing types constants
export const LISTING_TYPES = [
  'FBA',
  'FBM',
  'Dropshipping',
  'Wholesale',
  'Retail',
] as const;

export type ListingType = (typeof LISTING_TYPES)[number];

// Currency constants
export const SUPPORTED_CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'MXN',
  'BRL',
  'ARS',
  'CLP',
  'COP',
  'PEN',
  'UYU',
] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];
