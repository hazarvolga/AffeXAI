import { BaseEntity } from '../../../database/entities/base.entity';
import { SubscriberStatus } from '@affexai/shared-types';
export declare class Subscriber extends BaseEntity {
    email: string;
    status: SubscriberStatus | string;
    groups: string[];
    segments: string[];
    firstName: string;
    lastName: string;
    company: string;
    phone: string;
    customerStatus: string;
    subscriptionType: string;
    mailerCheckResult: string;
    location: string;
    sent: number;
    opens: number;
    clicks: number;
    customFields: Record<string, any>;
    isDoubleOptIn: boolean;
    optInToken: string;
    optInDate: Date;
    optOutDate: Date;
    optOutReason: string;
    optInIp: string;
    optOutIp: string;
    emailNotifications: boolean;
    marketingEmails: boolean;
    transactionalEmails: boolean;
    unsubscribeToken: string;
    subscribedAt: Date;
    lastUpdated: Date;
}
//# sourceMappingURL=subscriber.entity.d.ts.map