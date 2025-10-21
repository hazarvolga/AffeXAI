import { Certificate } from './entities/certificate.entity';
import { MailService } from '../mail/mail.service';
export declare class CertificateEmailService {
    private readonly mailService;
    private readonly logger;
    constructor(mailService: MailService);
    /**
     * Send certificate email with PDF attachment
     */
    sendCertificateEmail(certificate: Certificate): Promise<void>;
    /**
     * Generate email HTML content
     */
    private generateEmailHtml;
    /**
     * Get PDF file path from URL
     */
    private getPdfFilePath;
    /**
     * Test email configuration
     */
    testConnection(): Promise<boolean>;
}
//# sourceMappingURL=certificate-email.service.d.ts.map