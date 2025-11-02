import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006';

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: string | number | boolean }>;
  dataSource?: string;
  accept?: string;
  multiple?: boolean;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    maxFiles?: number;
    maxFileSize?: number;
  };
  conditional?: {
    visibleIf?: any;
    requiredIf?: any;
    enabledIf?: any;
  };
  metadata?: {
    order: number;
    width?: 'full' | 'half' | 'third';
    category?: string;
    agentOnly?: boolean;
    rows?: number;
  };
}

export interface FormSchema {
  formId: string;
  formName: string;
  version: number;
  fields: FormField[];
  conditionalLogic?: Array<{
    id: string;
    name: string;
    condition: any;
    actions: Array<{
      type: 'show' | 'hide' | 'require' | 'enable' | 'disable' | 'setValue';
      targetFieldIds: string[];
      value?: any;
    }>;
  }>;
}

export interface TicketFormDefinition {
  id: string;
  name: string;
  description: string;
  version: number;
  schema: FormSchema;
  isActive: boolean;
  isDefault: boolean;
  module: string;
  formType: string;
  allowPublicSubmissions: boolean;
  settings: any;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  creator?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export class TicketFormService {
  private static getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  private static getAuthHeaders() {
    const token = this.getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Get all form definitions with pagination and filtering
   */
  static async getAllForms(params?: {
    page?: number;
    limit?: number;
    isActive?: boolean;
  }): Promise<{
    items: TicketFormDefinition[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const response = await axios.get(`${API_URL}/ticket-forms`, {
        params,
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forms:', error);
      throw error;
    }
  }

  /**
   * Get the default form definition
   */
  static async getDefaultForm(): Promise<TicketFormDefinition> {
    try {
      const response = await axios.get(`${API_URL}/ticket-forms/default`, {
        headers: this.getAuthHeaders(),
      });
      return response.data.formDefinition;
    } catch (error) {
      console.error('Error fetching default form:', error);
      throw error;
    }
  }

  /**
   * Get a single form definition by ID
   */
  static async getFormById(id: string): Promise<TicketFormDefinition> {
    try {
      const response = await axios.get(`${API_URL}/ticket-forms/${id}`, {
        headers: this.getAuthHeaders(),
      });
      return response.data.formDefinition;
    } catch (error) {
      console.error('Error fetching form:', error);
      throw error;
    }
  }

  /**
   * Create a new form definition
   */
  static async createForm(data: {
    name: string;
    description?: string;
    schema: FormSchema;
    isDefault?: boolean;
  }): Promise<TicketFormDefinition> {
    try {
      const response = await axios.post(`${API_URL}/ticket-forms`, data, {
        headers: this.getAuthHeaders(),
      });
      return response.data.formDefinition;
    } catch (error) {
      console.error('Error creating form:', error);
      throw error;
    }
  }

  /**
   * Update an existing form definition
   */
  static async updateForm(
    id: string,
    data: {
      name?: string;
      description?: string;
      schema?: FormSchema;
      isDefault?: boolean;
      isActive?: boolean;
      changeLog?: string;
    }
  ): Promise<TicketFormDefinition> {
    try {
      const response = await axios.put(`${API_URL}/ticket-forms/${id}`, data, {
        headers: this.getAuthHeaders(),
      });
      return response.data.formDefinition;
    } catch (error) {
      console.error('Error updating form:', error);
      throw error;
    }
  }

  /**
   * Delete a form definition
   */
  static async deleteForm(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/ticket-forms/${id}`, {
        headers: this.getAuthHeaders(),
      });
    } catch (error) {
      console.error('Error deleting form:', error);
      throw error;
    }
  }

  /**
   * Set a form as the default
   */
  static async setAsDefault(id: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/ticket-forms/${id}/set-default`, {}, {
        headers: this.getAuthHeaders(),
      });
    } catch (error) {
      console.error('Error setting form as default:', error);
      throw error;
    }
  }

  /**
   * Toggle form active status
   */
  static async toggleActive(id: string, isActive: boolean): Promise<TicketFormDefinition> {
    try {
      const response = await axios.patch(
        `${API_URL}/ticket-forms/${id}/active`,
        { isActive },
        {
          headers: this.getAuthHeaders(),
        }
      );
      return response.data.formDefinition;
    } catch (error) {
      console.error('Error toggling form active status:', error);
      throw error;
    }
  }

  /**
   * Get version history for a form definition
   */
  static async getVersions(
    id: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    versions: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const response = await axios.get(`${API_URL}/ticket-forms/${id}/versions`, {
        params,
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching versions:', error);
      throw error;
    }
  }

  /**
   * Get a specific version of a form definition
   */
  static async getVersion(id: string, version: number): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/ticket-forms/${id}/versions/${version}`, {
        headers: this.getAuthHeaders(),
      });
      return response.data.version;
    } catch (error) {
      console.error('Error fetching version:', error);
      throw error;
    }
  }

  /**
   * Revert form to a previous version
   */
  static async revertToVersion(
    id: string,
    version: number,
    changeLog?: string
  ): Promise<TicketFormDefinition> {
    try {
      const response = await axios.post(
        `${API_URL}/ticket-forms/${id}/versions/${version}/revert`,
        { changeLog },
        {
          headers: this.getAuthHeaders(),
        }
      );
      return response.data.formDefinition;
    } catch (error) {
      console.error('Error reverting to version:', error);
      throw error;
    }
  }
}
