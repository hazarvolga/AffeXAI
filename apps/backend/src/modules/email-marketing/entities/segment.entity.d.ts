import { BaseEntity } from '../../../database/entities/base.entity';
export declare class Segment extends BaseEntity {
    name: string;
    description: string;
    subscriberCount: number;
    criteria: string;
    openRate: number;
    clickRate: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=segment.entity.d.ts.map