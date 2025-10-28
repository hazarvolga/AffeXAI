import { httpClient } from '@/lib/api/http-client';

export interface EmailTemplate {
  id: string;
  name: string;
  description?: string;
  content?: string;
  structure?: {
    rows: any[];
    settings: {
      backgroundColor?: string;
      contentWidth?: string;
      fonts?: string[];
    };
  };
  compiledHtml?: string;
  compiledMjml?: string;
  type: string;
  isActive: boolean;
  isEditable: boolean;
  version: number;
  createdFrom?: string;
  fileTemplateName?: string;
  thumbnailUrl?: string;
  variables?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateDto {
  name: string;
  description?: string;
  structure: any;
  type?: string;
  isActive?: boolean;
}

export interface UpdateTemplateDto {
  name?: string;
  description?: string;
  structure?: any;
  isActive?: boolean;
}

export interface CloneTemplateDto {
  newName?: string;
  newDescription?: string;
  makeEditable?: boolean;
}

export const EmailTemplatesService = {
  /**
   * Get all templates (DB + file-based)
   */
  async getTemplates(): Promise<{ dbTemplates: EmailTemplate[]; fileTemplates: any[]; total: number }> {
    const response = await httpClient.get('/email-templates');
    return response.data;
  },

  /**
   * Get single template by ID
   */
  async getTemplate(id: string): Promise<EmailTemplate> {
    const response = await httpClient.get(`/email-templates/${id}`);
    return response.data;
  },

  /**
   * Create new template
   */
  async createTemplate(data: CreateTemplateDto): Promise<EmailTemplate> {
    const response = await httpClient.post('/email-templates', data);
    return response.data;
  },

  /**
   * Update template
   */
  async updateTemplate(id: string, data: UpdateTemplateDto): Promise<EmailTemplate> {
    const response = await httpClient.patch(`/email-templates/${id}`, data);
    return response.data;
  },

  /**
   * Delete template
   */
  async deleteTemplate(id: string): Promise<void> {
    await httpClient.delete(`/email-templates/${id}`);
  },

  /**
   * Clone template
   */
  async cloneTemplate(id: string, data: CloneTemplateDto): Promise<EmailTemplate> {
    const response = await httpClient.post(`/email-templates/${id}/clone`, data);
    return response.data;
  },

  /**
   * Render template to HTML/MJML
   */
  async renderTemplate(id: string): Promise<{ html: string; mjml: string }> {
    const response = await httpClient.get(`/email-templates/${id}/render`);
    return response.data;
  },

  /**
   * Preview template
   */
  async previewTemplate(id: string, type: 'file' | 'db' = 'file'): Promise<{ content: string }> {
    const response = await httpClient.get(`/email-templates/${id}/preview`, {
      params: { type },
    });
    return response.data;
  },

  /**
   * Create template from file
   */
  async createFromFile(fileTemplateName: string, name?: string): Promise<EmailTemplate> {
    const response = await httpClient.post(`/email-templates/from-file/${fileTemplateName}`, { name });
    return response.data;
  },
};
