import { ABTest } from './ab-test.entity';
export declare class ABTestVariant {
    id: string;
    testId: string;
    name: string;
    description: string | null;
    componentConfig: Record<string, any>;
    trafficAllocation: number;
    impressions: number;
    interactions: number;
    conversions: number;
    conversionRate: number;
    averageEngagementTime: number;
    createdAt: Date;
    updatedAt: Date;
    test?: ABTest;
}
//# sourceMappingURL=ab-test-variant.entity.d.ts.map