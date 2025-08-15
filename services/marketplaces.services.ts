import { apiClient } from '@/lib/api/api-instance';
import { handleApiError } from '@/lib/api/handle-api-error';
import {
  MarketplaceCredential,
  CreateMarketplaceCredentialRequest,
  UpdateMarketplaceCredentialRequest,
  MarketplaceCredentialFilters,
  MarketplaceCredentialListResponse,
  CredentialSchema,
  ValidationResponse,
  ConnectionTestResponse,
  SyncResponse,
  MarketplaceType,
  MARKETPLACE_SCHEMAS,
} from '@/types/marketplace';

export const marketplaceCredentialsService = {
  /**
   * Crear nuevas credenciales de marketplace
   */
  async create(
    data: CreateMarketplaceCredentialRequest,
  ): Promise<MarketplaceCredential> {
    try {
      const response = await apiClient.post<MarketplaceCredential>(
        '/marketplace-credentials/',
        {
          body: data,
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create marketplace credentials');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Obtener lista de credenciales con filtros opcionales
   */
  async list(
    filters?: MarketplaceCredentialFilters,
  ): Promise<MarketplaceCredentialListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.client) {
        queryParams.append('client', filters.client.toString());
      }
      if (filters?.marketplace_type) {
        queryParams.append('marketplace_type', filters.marketplace_type);
      }
      if (filters?.connection_status) {
        queryParams.append('connection_status', filters.connection_status);
      }
      if (filters?.is_active !== undefined) {
        queryParams.append('is_active', filters.is_active.toString());
      }

      const url = `/marketplace-credentials/${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      console.log('🚀 ~ marketplaceCredentialsService ~ url:', url);

      const response = await apiClient.get<MarketplaceCredentialListResponse>(
        url,
        {
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch marketplace credentials');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Obtener credenciales específicas por ID
   */
  async getById(id: number): Promise<MarketplaceCredential> {
    try {
      const response = await apiClient.get<MarketplaceCredential>(
        `/marketplace-credentials/${id}/`,
        {
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch marketplace credential');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Actualizar credenciales existentes (PUT - actualización completa)
   */
  async update(
    id: number,
    data: UpdateMarketplaceCredentialRequest,
  ): Promise<MarketplaceCredential> {
    try {
      const response = await apiClient.put<MarketplaceCredential>(
        `/marketplace-credentials/${id}/`,
        {
          body: data,
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update marketplace credentials');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Actualizar credenciales existentes parcialmente (PATCH)
   */
  async partialUpdate(
    id: number,
    data: Partial<UpdateMarketplaceCredentialRequest>,
  ): Promise<MarketplaceCredential> {
    try {
      const response = await apiClient.patch<MarketplaceCredential>(
        `/marketplace-credentials/${id}/`,
        {
          body: data,
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to partially update marketplace credentials');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Eliminar credenciales
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await apiClient.delete(
        `/marketplace-credentials/${id}/`,
        {
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete marketplace credentials');
      }
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Validar formato de credenciales
   */
  async validateCredentials(id: number): Promise<ValidationResponse> {
    try {
      const response = await apiClient.post<ValidationResponse>(
        `/marketplace-credentials/${id}/validate_credentials/`,
        {
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to validate credentials');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Obtener schema de credenciales para un tipo de marketplace
   */
  async getCredentialSchema(id: number): Promise<CredentialSchema> {
    try {
      const response = await apiClient.get<CredentialSchema>(
        `/marketplace-credentials/${id}/get_credential_schema/`,
        {
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to get credential schema');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Probar conexión con el marketplace
   */
  async testConnection(id: number): Promise<ConnectionTestResponse> {
    try {
      const response = await apiClient.post<ConnectionTestResponse>(
        `/marketplace-credentials/${id}/test_connection/`,
        {
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to test connection');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Sincronizar productos y listings desde el marketplace
   */
  async syncProductsAndListings(id: number): Promise<SyncResponse> {
    try {
      const response = await apiClient.post<SyncResponse>(
        `/marketplace-credentials/${id}/sync_products_and_listings/`,
        {
          requireAuth: true,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to sync products and listings');
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error).message);
    }
  },

  /**
   * Obtener schema de credenciales por tipo de marketplace (método local)
   */
  getSchemaByType(marketplaceType: MarketplaceType): CredentialSchema {
    return MARKETPLACE_SCHEMAS[marketplaceType];
  },

  /**
   * Validar credenciales localmente antes de enviar al servidor
   */
  validateCredentialsLocally(
    marketplaceType: MarketplaceType,
    credentials: any,
  ): ValidationResponse {
    const schema = MARKETPLACE_SCHEMAS[marketplaceType];
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validar campos requeridos
    for (const field of schema.required_fields) {
      if (!credentials[field]) {
        errors.push(`${field} is required for ${marketplaceType}`);
      }
    }

    // Validar reglas específicas
    for (const [field, rules] of Object.entries(schema.validation_rules)) {
      const value = credentials[field];
      if (value) {
        if (rules.pattern && !rules.pattern.test(value)) {
          errors.push(`${field} format is invalid for ${marketplaceType}`);
        }
        if (rules.enum && !rules.enum.includes(value)) {
          errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
        }
      }
    }

    // Advertencias para campos opcionales no proporcionados
    for (const field of schema.optional_fields) {
      if (!credentials[field]) {
        warnings.push(
          `${field} is optional but recommended for ${marketplaceType}`,
        );
      }
    }

    return {
      is_valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  },

  /**
   * Obtener todas las credenciales de un cliente específico
   */
  async getByClient(clientId: number): Promise<MarketplaceCredential[]> {
    const response = await this.list({ client: clientId });
    return response.results;
  },

  /**
   * Obtener credenciales por tipo de marketplace
   */
  async getByMarketplaceType(
    marketplaceType: MarketplaceType,
  ): Promise<MarketplaceCredential[]> {
    const response = await this.list({ marketplace_type: marketplaceType });
    return response.results;
  },

  /**
   * Obtener solo credenciales activas
   */
  async getActive(): Promise<MarketplaceCredential[]> {
    const response = await this.list({ is_active: true });
    return response.results;
  },

  /**
   * Obtener credenciales por estado de conexión
   */
  async getByConnectionStatus(
    status: 'connected' | 'disconnected' | 'error' | 'pending',
  ): Promise<MarketplaceCredential[]> {
    const response = await this.list({ connection_status: status });
    return response.results;
  },
};
