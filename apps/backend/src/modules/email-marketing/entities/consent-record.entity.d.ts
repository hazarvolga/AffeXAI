import { BaseEntity } from '../../../database/entities/base.entity';
import { Subscriber } from './subscriber.entity';
import { ConsentType, ConsentStatus, ConsentMethod, LegalBasis } from '../services/gdpr-compliance.service';
export declare class ConsentRecord extends BaseEntity {
    subscriber: Subscriber;
    subscriberId: string;
    email: string;
    consentType: ConsentType;
    consentStatus: ConsentStatus;
    consentDate: Date;
    ipAddress: string;
    userAgent: string;
    consentMethod: ConsentMethod;
    legalBasis: LegalBasis;
    dataProcessingPurposes: string[];
    retentionPeriod: number;
    withdrawalDate: Date;
    withdrawalReason: string;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=consent-record.entity.d.ts.map