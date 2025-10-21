import { CertificateTemplate } from './entities/certificate-template.entity';
interface CertificateData {
    recipientName: string | null;
    recipientEmail: string | null;
    trainingTitle: string | null;
    description?: string | null;
    issuedAt: string;
    validUntil?: string | null;
    logoUrl?: string | null;
    signatureUrl?: string | null;
    certificateNumber?: string | null;
    eventId?: string | null;
    [key: string]: any;
}
export declare class PdfGeneratorService {
    private readonly logger;
    private readonly uploadsDir;
    constructor();
    private ensureUploadDirectory;
    /**
     * Generate PDF from HTML template and certificate data
     */
    generateCertificatePdf(template: CertificateTemplate, data: CertificateData, certificateId: string): Promise<string>;
    /**
     * Upload PDF to AWS S3 (optional)
     */
    /**
     * Format date for template
     */
    private formatDate;
    /**
     * Delete PDF file
     */
    deletePdf(pdfUrl: string): Promise<void>;
    /**
     * Check if PDF exists
     */
    pdfExists(pdfUrl: string): Promise<boolean>;
}
export {};
//# sourceMappingURL=pdf-generator.service.d.ts.map