import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { CertificateTemplate } from './entities/certificate-template.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { CreateCertificateTemplateDto } from './dto/create-template.dto';
import { UpdateCertificateTemplateDto } from './dto/update-template.dto';
import { PdfGeneratorService } from './pdf-generator.service';
import { CertificateEmailService } from './certificate-email.service';
import { UsersService } from '../users/users.service';
import { MediaService } from '../media/media.service';
import { EventBusService } from '../platform-integration/services/event-bus.service';
export declare class CertificatesServiceV2 {
    private certificatesRepository;
    private templatesRepository;
    private pdfGeneratorService;
    private emailService;
    private usersService;
    private mediaService;
    private eventBusService;
    private readonly logger;
    constructor(certificatesRepository: Repository<Certificate>, templatesRepository: Repository<CertificateTemplate>, pdfGeneratorService: PdfGeneratorService, emailService: CertificateEmailService, usersService: UsersService, mediaService: MediaService, eventBusService: EventBusService);
    createCertificate(dto: CreateCertificateDto): Promise<Certificate>;
    findAllCertificates(userId?: string): Promise<Certificate[]>;
    findOneCertificate(id: string): Promise<Certificate>;
    updateCertificate(id: string, dto: UpdateCertificateDto): Promise<Certificate>;
    deleteCertificate(id: string): Promise<void>;
    generatePdf(certificateId: string, regenerate?: boolean): Promise<string>;
    sendEmail(certificateId: string): Promise<void>;
    createTemplate(dto: CreateCertificateTemplateDto): Promise<CertificateTemplate>;
    findAllTemplates(): Promise<CertificateTemplate[]>;
    findOneTemplate(id: string): Promise<CertificateTemplate>;
    updateTemplate(id: string, dto: UpdateCertificateTemplateDto): Promise<CertificateTemplate>;
    deleteTemplate(id: string): Promise<void>;
    private getTemplate;
    generateAndSendCertificate(certificateId: string, options?: {
        sendEmail?: boolean;
        regenerate?: boolean;
    }): Promise<{
        pdfUrl: string;
        emailSent: boolean;
    }>;
    getStatistics(userId?: string): Promise<any>;
}
//# sourceMappingURL=certificates-v2.service.d.ts.map