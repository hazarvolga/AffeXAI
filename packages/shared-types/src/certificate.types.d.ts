/**
 * Certificate Types
 *
 * Shared types for certificate system
 */
export declare enum CertificateStatusEnum {
    DRAFT = "draft",
    ISSUED = "issued",
    SENT = "sent",
    REVOKED = "revoked"
}
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
    imageUrl: string | null;
    pdfUrl: string | null;
    status: CertificateStatusEnum;
    issuedAt: string;
    validUntil: string | null;
    sentAt: string | null;
    userId: string | null;
    eventId: string | null;
    createdAt: string;
    updatedAt: string;
    certificateNumber?: string;
    verificationUrl?: string;
}
export interface CertificateTemplate {
    id: string;
    name: string;
    description: string | null;
    content: string;
    thumbnailUrl: string | null;
    isActive: boolean;
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
    imageUrl?: string;
    issuedAt?: string;
    validUntil?: string;
    status?: CertificateStatusEnum;
    userId?: string;
    eventId?: string;
    name?: string;
    issueDate?: string;
    expiryDate?: string;
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
    imageUrl?: string;
    issuedAt?: string;
    validUntil?: string;
    status?: CertificateStatusEnum;
    userId?: string;
    eventId?: string;
    name?: string;
    issueDate?: string;
    expiryDate?: string;
}
export interface CreateCertificateTemplateDto {
    name: string;
    description?: string;
    content: string;
    thumbnailUrl?: string;
    isActive?: boolean;
}
export interface UpdateCertificateTemplateDto {
    name?: string;
    description?: string;
    content?: string;
    thumbnailUrl?: string;
    isActive?: boolean;
}
export interface GenerateCertificateDto {
    eventId: string;
    userId?: string;
}
export interface BulkImportDto {
    eventId: string;
    csvData: string;
}
export interface CertificateQueryParams {
    page?: number;
    limit?: number;
    status?: CertificateStatusEnum;
    search?: string;
    eventId?: string;
    userId?: string;
    sortBy?: 'issuedAt' | 'createdAt' | 'recipientName';
    sortOrder?: 'ASC' | 'DESC';
}
export interface CertificateDashboardStats {
    totalCertificates: number;
    issuedCertificates: number;
    pendingCertificates: number;
    revokedCertificates: number;
    monthlyIssued: number;
    issuanceRate: number;
}
//# sourceMappingURL=certificate.types.d.ts.map