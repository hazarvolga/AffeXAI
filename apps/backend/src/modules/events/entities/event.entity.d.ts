import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
export declare class Event extends BaseEntity {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    capacity: number;
    price: number;
    metadata: Record<string, any>;
    certificateConfig: {
        enabled: boolean;
        templateId: string | null;
        logoMediaId: string | null;
        description: string | null;
        validityDays: number | null;
        autoGenerate: boolean;
    } | null;
    grantsCertificate: boolean;
    certificateTitle: string | null;
    status: string;
    createdBy: User | null;
    registrations: any[];
}
//# sourceMappingURL=event.entity.d.ts.map