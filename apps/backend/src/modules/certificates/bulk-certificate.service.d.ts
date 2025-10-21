import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
interface BulkCertificateData {
    recipientName: string;
    recipientEmail: string;
    userId?: string;
}
interface EventCertificateConfig {
    templateId: string | null;
    logoMediaId: string | null;
    description: string | null;
    validityDays: number | null;
}
export declare class BulkCertificateService {
    private certificateRepository;
    constructor(certificateRepository: Repository<Certificate>);
    /**
     * Generate certificates for multiple participants based on event configuration
     */
    generateForEvent(eventId: string, eventTitle: string, config: EventCertificateConfig, participants: BulkCertificateData[]): Promise<Certificate[]>;
    /**
     * Generate certificate for single participant
     */
    generateSingle(eventId: string, eventTitle: string, config: EventCertificateConfig, participant: BulkCertificateData): Promise<Certificate>;
    /**
     * Check if certificate already exists for participant in event
     */
    certificateExists(eventId: string, recipientEmail: string): Promise<boolean>;
    /**
     * Get all certificates for an event
     */
    getCertificatesForEvent(eventId: string): Promise<Certificate[]>;
    /**
     * Get certificate statistics for event
     */
    getEventCertificateStats(eventId: string): Promise<{
        total: number;
        issued: number;
        sent: number;
        draft: number;
    }>;
}
export {};
//# sourceMappingURL=bulk-certificate.service.d.ts.map