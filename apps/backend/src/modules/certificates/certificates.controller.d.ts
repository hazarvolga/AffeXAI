import { CertificatesService } from './certificates.service';
import { CertificatesServiceV2 } from './certificates-v2.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { BulkImportCertificateDto } from './dto/bulk-import.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { GenerateCertificateDto } from './dto/generate-certificate.dto';
export declare class CertificatesController {
    private readonly certificatesService;
    private readonly certificatesServiceV2;
    constructor(certificatesService: CertificatesService, certificatesServiceV2: CertificatesServiceV2);
    createV2(dto: CreateCertificateDto): Promise<import("./entities/certificate.entity").Certificate>;
    findAllV2(userId?: string): Promise<import("./entities/certificate.entity").Certificate[]>;
    getStatistics(userId?: string): Promise<any>;
    findOneV2(id: string): Promise<import("./entities/certificate.entity").Certificate>;
    updateV2(id: string, dto: UpdateCertificateDto): Promise<import("./entities/certificate.entity").Certificate>;
    removeV2(id: string): Promise<void>;
    generatePdfV2(id: string, dto?: {
        regenerate?: boolean;
    }): Promise<{
        pdfUrl: string;
    }>;
    sendEmailV2(id: string): Promise<{
        message: string;
    }>;
    generateAndSendV2(id: string, dto: GenerateCertificateDto): Promise<{
        pdfUrl: string;
        emailSent: boolean;
    }>;
    createTemplate(dto: CreateTemplateDto): Promise<import("./entities/certificate-template.entity").CertificateTemplate>;
    findAllTemplates(): Promise<import("./entities/certificate-template.entity").CertificateTemplate[]>;
    findOneTemplate(id: string): Promise<import("./entities/certificate-template.entity").CertificateTemplate>;
    updateTemplate(id: string, dto: UpdateTemplateDto): Promise<import("./entities/certificate-template.entity").CertificateTemplate>;
    removeTemplate(id: string): Promise<void>;
    create(file: any, createCertificateDto: CreateCertificateDto): Promise<import("./entities/certificate.entity").Certificate>;
    findAll(userId?: string): Promise<import("./entities/certificate.entity").Certificate[]>;
    findOne(id: string): Promise<import("./entities/certificate.entity").Certificate>;
    generatePdf(id: string): Promise<{
        fileUrl: string;
    }>;
    update(id: string, file: any, updateCertificateDto: UpdateCertificateDto): Promise<import("./entities/certificate.entity").Certificate>;
    remove(id: string): Promise<void>;
    bulkImport(certificates: BulkImportCertificateDto[]): Promise<{
        success: number;
        failed: number;
        errors: string[];
    }>;
}
//# sourceMappingURL=certificates.controller.d.ts.map