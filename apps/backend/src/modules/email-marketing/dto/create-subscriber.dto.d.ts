import { CreateSubscriberDto as ICreateSubscriberDto } from '@affexai/shared-types';
export declare class CreateSubscriberDto implements ICreateSubscriberDto {
    email: string;
    status?: string;
    groups?: string[];
    segments?: string[];
    firstName?: string;
    lastName?: string;
    company?: string;
    phone?: string;
    customerStatus?: string;
    subscriptionType?: string;
    mailerCheckResult?: string;
    location?: string;
    sent?: number;
    opens?: number;
    clicks?: number;
}
//# sourceMappingURL=create-subscriber.dto.d.ts.map