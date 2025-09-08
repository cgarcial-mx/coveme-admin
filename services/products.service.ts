import { apiClient } from '@/lib/api/api-instance';
import { handleApiError } from '@/lib/api/handle-api-error';
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductFilters,
  ProductListResponse,
  Brand,
  CreateBrandRequest,
  BrandFilters,
  BrandListResponse,
  SubBrand,
  CreateSubBrandRequest,
  SubBrandFilters,
  SubBrandListResponse,
  Provider,
  CreateProviderRequest,
  ProviderFilters,
  ProviderListResponse,
  MarketplaceListing,
  MarketplaceListingFilters,
  MarketplaceListingListResponse,
  ProductMatch,
  ProductMatchFilters,
  ProductMatchListResponse,
  PriceHistory,
  PriceHistoryFilters,
  PriceHistoryListResponse,
  ProductTracing,
  ProductTracingFilters,
  ProductTracingListResponse,
  ProductListServerResponse,
} from '@/types/product';

// ============================================================================
// PRODUCTOS MAESTROS
// ============================================================================

export const productsService = {
  /**
   * Listar todos los productos del cliente autenticado
   */
  async list(filters?: ProductFilters): Promise<ProductListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.brand) {
        queryParams.append('brand', filters.brand.toString());
      }
      if (filters?.provider) {
        queryParams.append('provider', filters.provider.toString());
      }
      if (filters?.category) {
        queryParams.append('category', filters.category);
      }
      if (filters?.page) {
        queryParams.append('page', filters.page.toString());
      }
      if (filters?.page_size) {
        queryParams.append('page_size', filters.page_size.toString());
      }

      const url = `/products/${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await apiClient.get<ProductListServerResponse>(url, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Crear un nuevo producto
   */
  async create(data: CreateProductRequest): Promise<Product> {
    try {
      const response = await apiClient.post<Product>('/products/', {
        body: data,
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Obtener detalles de un producto específico
   */
  async getById(id: number): Promise<Product> {
    try {
      const response = await apiClient.get<Product>(`/products/${id}/`, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Actualizar completamente un producto
   */
  async update(id: number, data: UpdateProductRequest): Promise<Product> {
    try {
      const response = await apiClient.put<Product>(`/products/${id}/`, {
        body: data,
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Actualizar parcialmente un producto
   */
  async patch(
    id: number,
    data: Partial<UpdateProductRequest>,
  ): Promise<Product> {
    try {
      const response = await apiClient.patch<Product>(`/products/${id}/`, {
        body: data,
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to patch product');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Eliminar un producto
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await apiClient.delete(`/products/${id}/`, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },
};

// ============================================================================
// MARCAS (BRANDS)
// ============================================================================

export const brandsService = {
  /**
   * Listar todas las marcas del cliente
   */
  async list(filters?: BrandFilters): Promise<BrandListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.page) {
        queryParams.append('page', filters.page.toString());
      }
      if (filters?.page_size) {
        queryParams.append('page_size', filters.page_size.toString());
      }

      const url = `/brands/${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await apiClient.get<BrandListResponse>(url, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Crear una nueva marca
   */
  async create(data: CreateBrandRequest): Promise<Brand> {
    try {
      const response = await apiClient.post<Brand>('/brands/', {
        body: data,
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to create brand');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Obtener marca por ID
   */
  async getById(id: number): Promise<Brand> {
    try {
      const response = await apiClient.get<Brand>(`/brands/${id}/`, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brand');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Actualizar marca
   */
  async update(id: number, data: Partial<CreateBrandRequest>): Promise<Brand> {
    try {
      const response = await apiClient.patch<Brand>(`/brands/${id}/`, {
        body: data,
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to update brand');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Eliminar marca
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await apiClient.delete(`/brands/${id}/`, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to delete brand');
      }
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },
};

// ============================================================================
// SUB-MARCAS (SUBBRANDS)
// ============================================================================

export const subBrandsService = {
  /**
   * Listar todas las sub-marcas del cliente
   */
  async list(filters?: SubBrandFilters): Promise<SubBrandListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.brand) {
        queryParams.append('brand', filters.brand.toString());
      }
      if (filters?.page) {
        queryParams.append('page', filters.page.toString());
      }
      if (filters?.page_size) {
        queryParams.append('page_size', filters.page_size.toString());
      }

      const url = `/subbrands/${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await apiClient.get<SubBrandListResponse>(url, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sub-brands');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Crear una nueva sub-marca
   */
  async create(data: CreateSubBrandRequest): Promise<SubBrand> {
    try {
      const response = await apiClient.post<SubBrand>('/subbrands/', {
        body: data,
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to create sub-brand');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Obtener sub-marca por ID
   */
  async getById(id: number): Promise<SubBrand> {
    try {
      const response = await apiClient.get<SubBrand>(`/subbrands/${id}/`, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sub-brand');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Actualizar sub-marca
   */
  async update(
    id: number,
    data: Partial<CreateSubBrandRequest>,
  ): Promise<SubBrand> {
    try {
      const response = await apiClient.patch<SubBrand>(`/subbrands/${id}/`, {
        body: data,
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to update sub-brand');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Eliminar sub-marca
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await apiClient.delete(`/subbrands/${id}/`, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to delete sub-brand');
      }
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },
};

// ============================================================================
// PROVEEDORES (PROVIDERS)
// ============================================================================

export const providersService = {
  /**
   * Listar todos los proveedores del cliente
   */
  async list(filters?: ProviderFilters): Promise<ProviderListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.page) {
        queryParams.append('page', filters.page.toString());
      }
      if (filters?.page_size) {
        queryParams.append('page_size', filters.page_size.toString());
      }

      const url = `/providers/${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await apiClient.get<ProviderListResponse>(url, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch providers');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Crear un nuevo proveedor
   */
  async create(data: CreateProviderRequest): Promise<Provider> {
    try {
      const response = await apiClient.post<Provider>('/providers/', {
        body: data,
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to create provider');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Obtener proveedor por ID
   */
  async getById(id: number): Promise<Provider> {
    try {
      const response = await apiClient.get<Provider>(`/providers/${id}/`, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch provider');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Actualizar proveedor
   */
  async update(
    id: number,
    data: Partial<CreateProviderRequest>,
  ): Promise<Provider> {
    try {
      const response = await apiClient.patch<Provider>(`/providers/${id}/`, {
        body: data,
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to update provider');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Eliminar proveedor
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await apiClient.delete(`/providers/${id}/`, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to delete provider');
      }
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },
};

// ============================================================================
// COINCIDENCIAS DE PRODUCTOS
// ============================================================================

export const productMatchesService = {
  /**
   * Listar coincidencias entre productos y listados
   */
  async list(filters?: ProductMatchFilters): Promise<ProductMatchListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.product) {
        queryParams.append('product', filters.product.toString());
      }
      if (filters?.marketplace_listing) {
        queryParams.append(
          'marketplace_listing',
          filters.marketplace_listing.toString(),
        );
      }
      if (filters?.match_type) {
        queryParams.append('match_type', filters.match_type);
      }
      if (filters?.status) {
        queryParams.append('status', filters.status);
      }
      if (filters?.page) {
        queryParams.append('page', filters.page.toString());
      }
      if (filters?.page_size) {
        queryParams.append('page_size', filters.page_size.toString());
      }

      const url = `/product-matches/${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await apiClient.get<ProductMatchListResponse>(url, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product matches');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Obtener coincidencia por ID
   */
  async getById(id: number): Promise<ProductMatch> {
    try {
      const response = await apiClient.get<ProductMatch>(
        `/product-matches/${id}/`,
        {
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch product match');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },
};

// ============================================================================
// HISTORIAL DE PRECIOS
// ============================================================================

export const priceHistoryService = {
  /**
   * Historial de cambios de precios
   */
  async list(filters?: PriceHistoryFilters): Promise<PriceHistoryListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.product) {
        queryParams.append('product', filters.product.toString());
      }
      if (filters?.marketplace_listing) {
        queryParams.append(
          'marketplace_listing',
          filters.marketplace_listing.toString(),
        );
      }
      if (filters?.page) {
        queryParams.append('page', filters.page.toString());
      }
      if (filters?.page_size) {
        queryParams.append('page_size', filters.page_size.toString());
      }

      const url = `/price-history/${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await apiClient.get<PriceHistoryListResponse>(url, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch price history');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },
};

// ============================================================================
// TRAZABILIDAD DE COMPETIDORES
// ============================================================================

export const productTracingService = {
  /**
   * Seguimiento de productos competidores
   */
  async list(
    filters?: ProductTracingFilters,
  ): Promise<ProductTracingListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.product) {
        queryParams.append('product', filters.product.toString());
      }
      if (filters?.marketplace_type) {
        queryParams.append('marketplace_type', filters.marketplace_type);
      }
      if (filters?.page) {
        queryParams.append('page', filters.page.toString());
      }
      if (filters?.page_size) {
        queryParams.append('page_size', filters.page_size.toString());
      }

      const url = `/product-tracing/${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await apiClient.get<ProductTracingListResponse>(url, {
        requireAuth: true,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product tracing');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },
};
