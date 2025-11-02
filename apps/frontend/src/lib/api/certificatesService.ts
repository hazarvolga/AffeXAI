import { httpClient } from './http-client';
import { BaseApiService } from './base-service';

export interface Certificate {
  id: string;
  recipientName: string | null;
  recipientEmail: string | null;
  trainingTitle: string | null;
  description: string | null;
  templateId: string | null;
  logoUrl: string | null;
  logoMediaId: string | null; // Media ID for certificate product/subject logo
  signatureUrl: string | null;
  pdfUrl: string | null;
  status: 'draft' | 'issued' | 'sent' | 'revoked';
  issuedAt: string;
  validUntil: string | null;
  sentAt: string | null;
  // Legacy fields
  name: string;
  issueDate: string;
  expiryDate: string | null;
  fileUrl: string | null;
  userId: string | null;
  eventId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCertificateDto {
  recipientName: string;
  recipientEmail: string;
  trainingTitle: string;
  description?: string;
  templateId?: string;
  logoUrl?: string;
  logoMediaId?: string; // Media ID for certificate product/subject logo
  signatureUrl?: string;
  userId?: string;
  issuedAt?: string;
  validUntil?: string | null;
  // Backward compatibility
  issueDate?: string;
}

export interface UpdateCertificateDto {
  recipientName?: string;
  recipientEmail?: string;
  trainingTitle?: string;
  description?: string;
  templateId?: string;
  logoUrl?: string;
  logoMediaId?: string; // Media ID for certificate product/subject logo
  signatureUrl?: string;
  status?: 'draft' | 'issued' | 'sent' | 'revoked';
  issuedAt?: string;
  validUntil?: string | null;
  userId?: string;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  htmlContent: string;
  variables: string[];
  isActive: boolean;
  previewImageUrl: string | null;
  orientation: 'portrait' | 'landscape';
  pageFormat: 'A4' | 'Letter' | 'Legal';
  createdAt: string;
  updatedAt: string;
}

export interface CertificateStatistics {
  total: number;
  draft: number;
  issued: number;
  sent: number;
  revoked: number;
}

class CertificatesService extends BaseApiService<Certificate, CreateCertificateDto, UpdateCertificateDto> {
  constructor() {
    super({ endpoint: '/api/certificates/v2', useWrappedResponses: true });
  }

  async getAllCertificates(filters?: { status?: string; userId?: string }): Promise<Certificate[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.userId) params.append('userId', filters.userId);
    
    const url = params.toString() ? `${this.endpoint}?${params}` : this.endpoint;
    return httpClient.getWrapped<Certificate[]>(url);
  }

  async getStatistics(): Promise<CertificateStatistics> {
    return httpClient.getWrapped<CertificateStatistics>(`${this.endpoint}/statistics`);
  }

  async getTemplates(): Promise<CertificateTemplate[]> {
    return httpClient.getWrapped<CertificateTemplate[]>('/certificates/templates');
  }

  async getTemplate(id: string): Promise<CertificateTemplate> {
    return httpClient.getWrapped<CertificateTemplate>(`/certificates/templates/${id}`);
  }

  async updateTemplate(id: string, data: { htmlContent: string; description?: string }): Promise<CertificateTemplate> {
    return httpClient.putWrapped<CertificateTemplate>(`/certificates/templates/${id}`, data);
  }

  async generatePdf(id: string): Promise<{ pdfUrl: string }> {
    return httpClient.postWrapped<{ pdfUrl: string }>(`${this.endpoint}/${id}/generate-pdf`);
  }

  async sendEmail(id: string): Promise<{ success: boolean; message: string }> {
    return httpClient.postWrapped<{ success: boolean; message: string }>(`${this.endpoint}/${id}/send-email`);
  }

  async generateAndSend(id: string): Promise<{ pdfUrl: string; emailSent: boolean }> {
    return httpClient.postWrapped<{ pdfUrl: string; emailSent: boolean }>(`${this.endpoint}/${id}/generate-and-send`);
  }
}

export const certificatesService = new CertificatesService();
export default certificatesService;
