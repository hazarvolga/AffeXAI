/**
 * Ticket Form Service
 * API service for managing dynamic ticket forms
 */

import { httpClient } from './http-client';
import type {
  TicketFormDefinition,
  TicketFormVersion,
  CreateFormDefinitionDto,
  UpdateFormDefinitionDto,
  GetFormDefinitionsResponse,
  GetFormDefinitionResponse,
  GetFormVersionsResponse,
} from '@/types/ticket-form.types';

export class TicketFormService {
  private static readonly BASE_URL = '/api/ticket-forms';

  /**
   * Get all form definitions
   */
  static async getFormDefinitions(params?: {
    page?: number;
    limit?: number;
    isActive?: boolean;
  }): Promise<GetFormDefinitionsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit !== undefined) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params?.isActive !== undefined) {
      queryParams.append('isActive', params.isActive.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${this.BASE_URL}?${queryString}` : this.BASE_URL;

    const response = await httpClient.get<any>(url);

    // Handle wrapped response (success, data, meta structure)
    return response.data || response;
  }

  /**
   * Get all form definitions (simplified for admin UI)
   */
  static async getAllFormDefinitions(): Promise<TicketFormDefinition[]> {
    const response = await this.getFormDefinitions({ limit: 100 });
    return response.data || [];
  }

  /**
   * Get a single form definition by ID
   */
  static async getFormDefinition(id: string): Promise<GetFormDefinitionResponse> {
    const response = await httpClient.get<any>(`${this.BASE_URL}/${id}`);

    // Handle wrapped response
    return response.data || response;
  }

  /**
   * Get the default form definition
   */
  static async getDefaultForm(): Promise<TicketFormDefinition> {
    const response = await httpClient.get<any>(`${this.BASE_URL}/default`);

    // Handle wrapped response
    const data = response.data || response;
    return data.formDefinition || data;
  }

  /**
   * Create a new form definition
   */
  static async createFormDefinition(
    dto: CreateFormDefinitionDto
  ): Promise<TicketFormDefinition> {
    const response = await httpClient.post<any>(this.BASE_URL, dto);

    // Handle wrapped response
    const data = response.data || response;
    return data.formDefinition || data;
  }

  /**
   * Update an existing form definition
   * Creates a new version if schema is modified
   */
  static async updateFormDefinition(
    id: string,
    dto: UpdateFormDefinitionDto
  ): Promise<TicketFormDefinition> {
    const response = await httpClient.put<any>(`${this.BASE_URL}/${id}`, dto);

    // Handle wrapped response
    const data = response.data || response;
    return data.formDefinition || data;
  }

  /**
   * Delete a form definition
   */
  static async deleteFormDefinition(id: string): Promise<{ success: boolean; message: string }> {
    const response = await httpClient.delete<any>(`${this.BASE_URL}/${id}`);

    // Handle wrapped response
    return response.data || response;
  }

  /**
   * Duplicate a form definition
   */
  static async duplicateFormDefinition(id: string): Promise<TicketFormDefinition> {
    const original = await this.getFormDefinition(id);
    const formDefinition = original.formDefinition || original;

    const duplicatedDto: CreateFormDefinitionDto = {
      name: `${formDefinition.name} (Kopya)`,
      description: formDefinition.description,
      schema: formDefinition.schema,
      isActive: false, // Start as inactive
      isDefault: false, // Can't be default
    };

    return await this.createFormDefinition(duplicatedDto);
  }

  /**
   * Set a form as default
   */
  static async setAsDefault(id: string): Promise<{ success: boolean; message: string }> {
    const response = await httpClient.post<any>(`${this.BASE_URL}/${id}/set-default`, {});

    // Handle wrapped response
    return response.data || response;
  }

  /**
   * Activate/deactivate a form
   */
  static async toggleActive(id: string, isActive: boolean): Promise<TicketFormDefinition> {
    const response = await httpClient.patch<any>(`${this.BASE_URL}/${id}/active`, { isActive });

    // Handle wrapped response
    const data = response.data || response;
    return data.formDefinition || data;
  }

  /**
   * Get version history for a form definition
   */
  static async getFormVersions(
    formDefinitionId: string,
    params?: { page?: number; limit?: number }
  ): Promise<GetFormVersionsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit !== undefined) {
      queryParams.append('limit', params.limit.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${this.BASE_URL}/${formDefinitionId}/versions?${queryString}`
      : `${this.BASE_URL}/${formDefinitionId}/versions`;

    const response = await httpClient.get<any>(url);

    // Handle wrapped response
    return response.data || response;
  }

  /**
   * Get a specific version of a form definition
   */
  static async getFormVersion(
    formDefinitionId: string,
    version: number
  ): Promise<TicketFormVersion> {
    const response = await httpClient.get<any>(
      `${this.BASE_URL}/${formDefinitionId}/versions/${version}`
    );

    // Handle wrapped response
    const data = response.data || response;
    return data.version || data;
  }

  /**
   * Revert form to a previous version
   */
  static async revertToVersion(
    formDefinitionId: string,
    version: number,
    changeLog?: string
  ): Promise<TicketFormDefinition> {
    const response = await httpClient.post<any>(
      `${this.BASE_URL}/${formDefinitionId}/versions/${version}/revert`,
      { changeLog }
    );

    // Handle wrapped response
    const data = response.data || response;
    return data.formDefinition || data;
  }

  /**
   * Validate form schema (client-side validation before save)
   */
  static validateFormSchema(schema: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check required fields
    if (!schema.formId) {
      errors.push('Form ID is required');
    }
    if (!schema.formName) {
      errors.push('Form name is required');
    }
    if (!schema.version || schema.version < 1) {
      errors.push('Version must be a positive number');
    }
    if (!Array.isArray(schema.fields) || schema.fields.length === 0) {
      errors.push('At least one field is required');
    }

    // Validate fields
    if (Array.isArray(schema.fields)) {
      const fieldIds = new Set<string>();
      const fieldNames = new Set<string>();

      schema.fields.forEach((field: any, index: number) => {
        // Check required field properties
        if (!field.id) {
          errors.push(`Field at index ${index}: ID is required`);
        } else if (fieldIds.has(field.id)) {
          errors.push(`Duplicate field ID: ${field.id}`);
        } else {
          fieldIds.add(field.id);
        }

        if (!field.name) {
          errors.push(`Field at index ${index}: Name is required`);
        } else if (fieldNames.has(field.name)) {
          errors.push(`Duplicate field name: ${field.name}`);
        } else {
          fieldNames.add(field.name);
        }

        if (!field.label) {
          errors.push(`Field ${field.name || index}: Label is required`);
        }

        if (!field.type) {
          errors.push(`Field ${field.name || index}: Type is required`);
        }

        if (field.required === undefined || field.required === null) {
          errors.push(`Field ${field.name || index}: Required flag must be specified`);
        }

        if (!field.metadata || typeof field.metadata.order !== 'number') {
          errors.push(`Field ${field.name || index}: Metadata with order is required`);
        }

        // Validate select/multiselect/radio fields have options
        if (['select', 'multiselect', 'radio'].includes(field.type)) {
          if (!field.options && !field.dataSource) {
            errors.push(
              `Field ${field.name || index}: ${field.type} field must have options or dataSource`
            );
          }
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
