import { BaseApiService } from './base-service';
export interface Certificate {
    id: string;
    recipientName: string | null;
    recipientEmail: string | null;
    trainingTitle: string | null;
    description: string | null;
    templateId: string | null;
    logoUrl: string | null;
    logoMediaId: string | null;
    signatureUrl: string | null;
    pdfUrl: string | null;
    status: 'draft' | 'issued' | 'sent' | 'revoked';
    issuedAt: string;
    validUntil: string | null;
    sentAt: string | null;
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
    logoMediaId?: string;
    signatureUrl?: string;
    userId?: string;
    issuedAt?: string;
    validUntil?: string | null;
    issueDate?: string;
}
export interface UpdateCertificateDto {
    recipientName?: string;
    recipientEmail?: string;
    trainingTitle?: string;
    description?: string;
    templateId?: string;
    logoUrl?: string;
    logoMediaId?: string;
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
declare class CertificatesService extends BaseApiService<Certificate, CreateCertificateDto, UpdateCertificateDto> {
    constructor();
    getAllCertificates(filters?: {
        status?: string;
        userId?: string;
    }): Promise<Certificate[]>;
    getStatistics(): Promise<CertificateStatistics>;
    getTemplates(): Promise<CertificateTemplate[]>;
    getTemplate(id: string): Promise<CertificateTemplate>;
    updateTemplate(id: string, data: {
        htmlContent: string;
        description?: string;
    }): Promise<CertificateTemplate>;
    generatePdf(id: string): Promise<{
        pdfUrl: string;
    }>;
    sendEmail(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    generateAndSend(id: string): Promise<{
        pdfUrl: string;
        emailSent: boolean;
    }>;
}
export declare const certificatesService: CertificatesService;
export default certificatesService;
//# sourceMappingURL=certificatesService.d.ts.map