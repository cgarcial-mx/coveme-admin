import { apiClient } from '@/lib/api/api-instance';
import { handleApiError } from '@/lib/api/handle-api-error';
import {
  MarketplaceListing,
  CreateMarketplaceListingRequest,
  UpdateMarketplaceListingRequest,
  MarketplaceListingFilters,
  MarketplaceListingListResponse,
  BulkCreateListingsRequest,
  BulkUpdateListingsRequest,
  ListingValidationResponse,
} from '@/types/marketplace';

export const marketplaceListingsService = {
  /**
   * Create a new marketplace listing
   */
  async create(
    data: CreateMarketplaceListingRequest,
  ): Promise<MarketplaceListing> {
    try {
      const response = await apiClient.post<MarketplaceListing>(
        '/marketplace-listings/',
        {
          body: data,
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create marketplace listing');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Get all listings with optional filters
   */
  async list(
    filters?: MarketplaceListingFilters,
  ): Promise<MarketplaceListingListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.client) {
        queryParams.append('client', filters.client.toString());
      }
      if (filters?.marketplace_type) {
        queryParams.append('marketplace_type', filters.marketplace_type);
      }
      if (filters?.status) {
        queryParams.append('status', filters.status);
      }
      if (filters?.is_fulfillment !== undefined) {
        queryParams.append('is_fulfillment', filters.is_fulfillment.toString());
      }
      if (filters?.price_min) {
        queryParams.append('price_min', filters.price_min.toString());
      }
      if (filters?.price_max) {
        queryParams.append('price_max', filters.price_max.toString());
      }

      const url = `/marketplace-listings/${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await apiClient.get<MarketplaceListingListResponse>(
        url,
        {
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch marketplace listings');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Get a specific listing by ID
   */
  async getById(id: number): Promise<MarketplaceListing> {
    try {
      const response = await apiClient.get<MarketplaceListing>(
        `/marketplace-listings/${id}/`,
        {
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch marketplace listing');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Update a listing completely (PUT)
   */
  async update(
    id: number,
    data: UpdateMarketplaceListingRequest,
  ): Promise<MarketplaceListing> {
    try {
      const response = await apiClient.put<MarketplaceListing>(
        `/marketplace-listings/${id}/`,
        {
          body: data,
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update marketplace listing');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Update a listing partially (PATCH)
   */
  async partialUpdate(
    id: number,
    data: Partial<UpdateMarketplaceListingRequest>,
  ): Promise<MarketplaceListing> {
    try {
      const response = await apiClient.patch<MarketplaceListing>(
        `/marketplace-listings/${id}/`,
        {
          body: data,
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to partially update marketplace listing');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Delete a listing
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await apiClient.delete(`/marketplace-listings/${id}/`, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to delete marketplace listing');
      }
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Bulk create multiple listings
   */
  async bulkCreate(
    data: BulkCreateListingsRequest,
  ): Promise<MarketplaceListing[]> {
    try {
      const response = await apiClient.post<MarketplaceListing[]>(
        '/marketplace-listings/bulk_create/',
        {
          body: data,
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to bulk create marketplace listings');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Bulk update multiple listings
   */
  async bulkUpdate(
    data: BulkUpdateListingsRequest,
  ): Promise<MarketplaceListing[]> {
    try {
      const response = await apiClient.put<MarketplaceListing[]>(
        '/marketplace-listings/bulk_update/',
        {
          body: data,
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to bulk update marketplace listings');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Get all listings for a specific client
   */
  async getByClient(clientId: number): Promise<MarketplaceListing[]> {
    const response = await this.list({ client: clientId });
    return response.results;
  },

  /**
   * Get all listings for a specific marketplace type
   */
  async getByMarketplaceType(
    marketplaceType: string,
  ): Promise<MarketplaceListing[]> {
    const response = await this.list({
      marketplace_type: marketplaceType as any,
    });
    return response.results;
  },

  /**
   * Get all listings with a specific status
   */
  async getByStatus(status: string): Promise<MarketplaceListing[]> {
    const response = await this.list({ status });
    return response.results;
  },

  /**
   * Get all fulfillment listings
   */
  async getFulfillmentListings(): Promise<MarketplaceListing[]> {
    const response = await this.list({ is_fulfillment: true });
    return response.results;
  },

  /**
   * Get all non-fulfillment listings
   */
  async getNonFulfillmentListings(): Promise<MarketplaceListing[]> {
    const response = await this.list({ is_fulfillment: false });
    return response.results;
  },

  /**
   * Get listings within a price range
   */
  async getByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<MarketplaceListing[]> {
    const response = await this.list({
      price_min: minPrice,
      price_max: maxPrice,
    });
    return response.results;
  },

  /**
   * Get listings for a specific product
   */
  async getByProduct(productId: number): Promise<MarketplaceListing[]> {
    // This would need a custom endpoint or we can filter client-side
    const allListings = await this.list();
    return allListings.results.filter(
      (listing) => listing.product_id === productId,
    );
  },

  /**
   * Search listings by title or external SKU
   */
  async search(
    query: string,
    filters?: MarketplaceListingFilters,
  ): Promise<MarketplaceListing[]> {
    // This would need a search endpoint or we can filter client-side
    const allListings = await this.list(filters);
    const searchTerm = query.toLowerCase();

    return allListings.results.filter(
      (listing) =>
        listing.title?.toLowerCase().includes(searchTerm) ||
        listing.external_sku?.toLowerCase().includes(searchTerm) ||
        listing.marketplace_id.toLowerCase().includes(searchTerm),
    );
  },

  /**
   * Get listings count by status
   */
  async getCountByStatus(): Promise<Record<string, number>> {
    const allListings = await this.list();
    const countByStatus: Record<string, number> = {};

    allListings.results.forEach((listing) => {
      const status = listing.status || 'unknown';
      countByStatus[status] = (countByStatus[status] || 0) + 1;
    });

    return countByStatus;
  },

  /**
   * Get listings count by marketplace type
   */
  async getCountByMarketplaceType(): Promise<Record<string, number>> {
    const allListings = await this.list();
    const countByMarketplace: Record<string, number> = {};

    allListings.results.forEach((listing) => {
      countByMarketplace[listing.marketplace_type] =
        (countByMarketplace[listing.marketplace_type] || 0) + 1;
    });

    return countByMarketplace;
  },

  /**
   * Validate listing data before sending to server
   */
  validateListingData(
    data: CreateMarketplaceListingRequest,
  ): ListingValidationResponse {
    const errors: Array<{ field: string; message: string }> = [];
    const warnings: string[] = [];

    // Required field validation
    if (!data.client_id) {
      errors.push({ field: 'client_id', message: 'Client ID is required' });
    }
    if (!data.marketplace_type) {
      errors.push({
        field: 'marketplace_type',
        message: 'Marketplace type is required',
      });
    }
    if (!data.marketplace_id) {
      errors.push({
        field: 'marketplace_id',
        message: 'Marketplace ID is required',
      });
    }

    // Field length validation
    if (data.marketplace_id && data.marketplace_id.length > 100) {
      errors.push({
        field: 'marketplace_id',
        message: 'Marketplace ID must be 100 characters or less',
      });
    }
    if (data.external_sku && data.external_sku.length > 100) {
      errors.push({
        field: 'external_sku',
        message: 'External SKU must be 100 characters or less',
      });
    }
    if (data.title && data.title.length > 500) {
      errors.push({
        field: 'title',
        message: 'Title must be 500 characters or less',
      });
    }
    if (data.currency && data.currency.length > 3) {
      errors.push({
        field: 'currency',
        message: 'Currency must be 3 characters or less',
      });
    }
    if (data.status && data.status.length > 50) {
      errors.push({
        field: 'status',
        message: 'Status must be 50 characters or less',
      });
    }
    if (data.listing_type && data.listing_type.length > 50) {
      errors.push({
        field: 'listing_type',
        message: 'Listing type must be 50 characters or less',
      });
    }
    if (data.official_store_name && data.official_store_name.length > 200) {
      errors.push({
        field: 'official_store_name',
        message: 'Official store name must be 200 characters or less',
      });
    }
    if (data.thumbnail_url && data.thumbnail_url.length > 500) {
      errors.push({
        field: 'thumbnail_url',
        message: 'Thumbnail URL must be 500 characters or less',
      });
    }
    if (data.permalink && data.permalink.length > 500) {
      errors.push({
        field: 'permalink',
        message: 'Permalink must be 500 characters or less',
      });
    }

    // Numeric validation
    if (data.inventory_quantity !== undefined && data.inventory_quantity < 0) {
      errors.push({
        field: 'inventory_quantity',
        message: 'Inventory quantity must be non-negative',
      });
    }
    if (data.price && parseFloat(data.price) <= 0) {
      errors.push({
        field: 'price',
        message: 'Price must be a positive number',
      });
    }
    if (data.listing_fee && parseFloat(data.listing_fee) <= 0) {
      errors.push({
        field: 'listing_fee',
        message: 'Listing fee must be a positive number',
      });
    }
    if (data.shipment_fee && parseFloat(data.shipment_fee) <= 0) {
      errors.push({
        field: 'shipment_fee',
        message: 'Shipment fee must be a positive number',
      });
    }

    // URL validation
    if (data.thumbnail_url && !this.isValidUrl(data.thumbnail_url)) {
      errors.push({
        field: 'thumbnail_url',
        message: 'Thumbnail URL must be a valid URL',
      });
    }
    if (data.permalink && !this.isValidUrl(data.permalink)) {
      errors.push({
        field: 'permalink',
        message: 'Permalink must be a valid URL',
      });
    }

    // Warnings for optional fields
    if (!data.title) {
      warnings.push('Title is recommended for better product identification');
    }
    if (!data.price) {
      warnings.push('Price is recommended for pricing information');
    }
    if (!data.inventory_quantity) {
      warnings.push('Inventory quantity is recommended for stock management');
    }

    return {
      is_valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  },

  /**
   * Helper method to validate URLs
   */
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};
