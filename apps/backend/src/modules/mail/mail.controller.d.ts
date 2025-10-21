import { MailService } from './mail.service';
/**
 * Test Email DTO
 */
declare class SendTestEmailDto {
    to: string;
    subject: string;
    message: string;
}
/**
 * Mail Controller
 * For testing and debugging email functionality
 */
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    /**
     * Test connection to email provider
     */
    testConnection(): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Send a test email
     */
    sendTestEmail(dto: SendTestEmailDto): Promise<{
        success: boolean;
        messageId: string | undefined;
        error: string | undefined;
        timestamp: Date;
    }>;
}
export {};
//# sourceMappingURL=mail.controller.d.ts.map