import httpClient from './http-client';

/**
 * Ticket Field Library Service
 * API service for managing reusable field templates
 */

export interface FieldLibraryFilters {
  search?: string;
  isActive?: boolean;
  tags?: string[];
  page?: number;
  limit?: number;
}

export interface CreateFieldLibraryDto {
  name: string;
  fieldConfig: any; // FormField interface
  description?: string;
  isActive?: boolean;
  isSystemField?: boolean;
  tags?: string[];
}

export interface UpdateFieldLibraryDto {
  name?: string;
  fieldConfig?: any; // FormField interface
  description?: string;
  isActive?: boolean;
  tags?: string[];
}

export interface TicketFieldLibrary {
  id: string;
  name: string;
  fieldConfig: any; // FormField interface
  description?: string;
  isActive: boolean;
  isSystemField: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  creator?: {
    id: string;
    name: string;
    email: string;
  };
  updater?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface FieldLibraryListResponse {
  items: TicketFieldLibrary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class TicketFieldLibraryService {
  private baseUrl = '/ticket-field-library';

  /**
   * Get all field templates with optional filters
   */
  async getAllFields(filters?: FieldLibraryFilters): Promise<FieldLibraryListResponse> {
    const params = new URLSearchParams();

    if (filters?.search) params.append('search', filters.search);
    if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive));
    if (filters?.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => params.append('tags', tag));
    }
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.limit) params.append('limit', String(filters.limit));

    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;

    const response = await httpClient.get<FieldLibraryListResponse>(url);
    return response.data;
  }

  /**
   * Get all unique tags used in field library
   */
  async getAllTags(): Promise<string[]> {
    const response = await httpClient.get<string[]>(`${this.baseUrl}/tags`);
    return response.data;
  }

  /**
   * Get single field template by ID
   */
  async getField(id: string): Promise<TicketFieldLibrary> {
    const response = await httpClient.get<TicketFieldLibrary>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  /**
   * Create new field template
   */
  async createField(data: CreateFieldLibraryDto): Promise<TicketFieldLibrary> {
    const response = await httpClient.post<TicketFieldLibrary>(this.baseUrl, data);
    return response.data;
  }

  /**
   * Update existing field template
   */
  async updateField(id: string, data: UpdateFieldLibraryDto): Promise<TicketFieldLibrary> {
    const response = await httpClient.put<TicketFieldLibrary>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  /**
   * Delete field template
   * Note: System fields cannot be deleted
   */
  async deleteField(id: string): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Toggle active status of field template
   */
  async toggleActive(id: string, isActive: boolean): Promise<TicketFieldLibrary> {
    const response = await httpClient.post<TicketFieldLibrary>(
      `${this.baseUrl}/${id}/toggle-active`,
      { isActive }
    );
    return response.data;
  }

  /**
   * Validate field configuration before save
   * Client-side validation helper
   */
  validateFieldConfig(fieldConfig: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Required fields
    if (!fieldConfig.id) errors.push('Field ID is required');
    if (!fieldConfig.name) errors.push('Field name is required');
    if (!fieldConfig.label) errors.push('Field label is required');
    if (!fieldConfig.type) errors.push('Field type is required');

    // Field type validation
    const validTypes = [
      'text', 'textarea', 'number', 'email', 'url',
      'date', 'datetime', 'time',
      'select', 'multiselect', 'radio', 'checkbox',
      'file', 'file-multiple', 'file-single',
      'richtext', 'html',
      'edd-order', 'edd-product'
    ];

    if (fieldConfig.type && !validTypes.includes(fieldConfig.type)) {
      errors.push(`Invalid field type: ${fieldConfig.type}`);
    }

    // Options required for select/radio/checkbox/multiselect
    const requiresOptions = ['select', 'radio', 'checkbox', 'multiselect'];
    if (fieldConfig.type && requiresOptions.includes(fieldConfig.type)) {
      if (!fieldConfig.options || fieldConfig.options.length === 0) {
        errors.push(`${fieldConfig.type} field requires at least one option`);
      }
    }

    // Metadata required
    if (!fieldConfig.metadata) {
      errors.push('Field metadata is required');
    } else {
      if (fieldConfig.metadata.order === undefined) {
        errors.push('Field order is required in metadata');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export default new TicketFieldLibraryService();
