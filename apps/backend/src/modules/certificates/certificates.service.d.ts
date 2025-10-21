import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { BulkImportCertificateDto } from './dto/bulk-import.dto';
import { UsersService } from '../users/users.service';
interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}
export declare class CertificatesService {
    private certificatesRepository;
    private usersService;
    private readonly logger;
    constructor(certificatesRepository: Repository<Certificate>, usersService: UsersService);
    create(file: MulterFile, createCertificateDto: CreateCertificateDto): Promise<Certificate>;
    findAll(userId?: string): Promise<Certificate[]>;
    findOne(id: string): Promise<Certificate>;
    update(id: string, file: MulterFile, updateCertificateDto: UpdateCertificateDto): Promise<Certificate>;
    remove(id: string): Promise<void>;
    bulkImport(certificates: BulkImportCertificateDto[]): Promise<{
        success: number;
        failed: number;
        errors: string[];
    }>;
    generateCertificatePdf(id: string): Promise<string>;
    private applyDefaultDesign;
    private applyPremiumDesign;
    private applyExecutiveDesign;
}
export {};
//# sourceMappingURL=certificates.service.d.ts.map