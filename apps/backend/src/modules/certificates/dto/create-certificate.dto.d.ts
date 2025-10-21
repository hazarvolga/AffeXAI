import { CertificateStatus } from '../entities/certificate.entity';
export declare class CreateCertificateDto {
    recipientName: string;
    recipientEmail: string;
    trainingTitle: string;
    description?: string;
    templateId?: string;
    logoUrl?: string;
    logoMediaId?: string;
    signatureUrl?: string;
    imageUrl?: string;
    issuedAt?: string;
    validUntil?: string;
    status?: CertificateStatus;
    userId?: string;
    eventId?: string;
    name?: string;
    issueDate?: string;
    expiryDate?: string;
}
//# sourceMappingURL=create-certificate.dto.d.ts.map