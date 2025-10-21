import { BaseEntity } from '../../../database/entities/base.entity';
export declare class EventRegistration extends BaseEntity {
    user: any;
    event: any;
    status: string;
    amountPaid: number;
    paymentDetails: Record<string, any>;
    checkedInAt: Date;
    additionalInfo: Record<string, any>;
}
//# sourceMappingURL=event-registration.entity.d.ts.map