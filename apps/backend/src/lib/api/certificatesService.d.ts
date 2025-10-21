export interface Certificate {
    id: string;
    name: string;
    description: string;
    issueDate: string;
    expiryDate: string | null;
    fileUrl: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
    templateId?: string;
}
export interface CreateCertificateDto {
    name: string;
    description: string;
    issueDate: string;
    expiryDate?: string;
    userId: string;
    templateId?: string;
}
export interface UpdateCertificateDto {
    name?: string;
    description?: string;
    issueDate?: string;
    expiryDate?: string;
    userId?: string;
    templateId?: string;
}
export interface BulkImportCertificateDto {
    userEmail: string;
    certificateName: string;
    issueDate: string;
    expiryDate?: string;
    description?: string;
    filePath?: string;
}
declare class CertificatesService {
    getAllCertificates(userId?: string): Promise<Certificate[]>;
    getCertificateById(id: string): Promise<Certificate>;
    createCertificate(certificateData: CreateCertificateDto, file?: File): Promise<Certificate>;
    updateCertificate(id: string, certificateData: UpdateCertificateDto, file?: File): Promise<Certificate>;
    deleteCertificate(id: string): Promise<void>;
    bulkImportCertificates(certificates: BulkImportCertificateDto[]): Promise<{
        success: number;
        failed: number;
        errors: string[];
    }>;
    generateCertificatePdf(id: string): Promise<string>;
    parseCSVFile(file: File): Promise<BulkImportCertificateDto[]>;
}
declare const _default: CertificatesService;
export default _default;
//# sourceMappingURL=certificatesService.d.ts.map