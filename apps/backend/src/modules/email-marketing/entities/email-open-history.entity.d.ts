import { Subscriber } from './subscriber.entity';
import { EmailCampaign } from './email-campaign.entity';
export declare class EmailOpenHistory {
    id: string;
    subscriberId: string;
    subscriber: Subscriber;
    campaignId: string;
    campaign: EmailCampaign;
    openedAt: Date;
    timezone: string;
    hourOfDay: number;
    dayOfWeek: number;
    deviceType: string;
    emailClient: string;
    ipAddress: string;
    country: string;
    city: string;
    createdAt: Date;
}
//# sourceMappingURL=email-open-history.entity.d.ts.map