import { httpClient } from './http-client';
import { BaseApiService } from './base-service';
import type {
  EmailTemplate,
  CreateTemplateDto,
  UpdateTemplateDto,
} from '@affexai/shared-types';

// Re-export types for convenience
export type {
  EmailTemplate,
  CreateTemplateDto,
  UpdateTemplateDto,
};

export interface FileTemplate {
  id: string;
  name: string;
  fileName: string;
}

export interface TemplateResponse {
  dbTemplates: EmailTemplate[];
  fileTemplates: FileTemplate[];
  total: number;
}

/**
 * Email Templates Service
 * Handles email template operations extending BaseApiService
 */
class TemplatesService extends BaseApiService<EmailTemplate, CreateTemplateDto, UpdateTemplateDto> {
  constructor() {
    super({ endpoint: '/email-templates', useWrappedResponses: true });
  }

  /**
   * Get all templates (override to return custom response type)
   */
  async getAll(): Promise<EmailTemplate[]> {
    const response = await httpClient.getWrapped<TemplateResponse>(this.endpoint);
    // Return dbTemplates for compatibility with BaseApiService
    return response.dbTemplates;
  }

  /**
   * Get all templates with file templates included
   */
  async getAllTemplates(): Promise<TemplateResponse> {
    return httpClient.getWrapped<TemplateResponse>(this.endpoint);
  }

  /**
   * Create template from file
   */
  async createTemplateFromFile(
    fileTemplateName: string,
    name?: string,
  ): Promise<EmailTemplate> {
    return httpClient.postWrapped<EmailTemplate>(
      `${this.endpoint}/from-file/${fileTemplateName}`,
      { name },
    );
  }
}

export const templatesService = new TemplatesService();
export default templatesService;