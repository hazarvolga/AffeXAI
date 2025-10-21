import { ABTestVariant } from './ab-test-variant.entity';
export declare enum ABTestStatus {
    DRAFT = "draft",
    RUNNING = "running",
    PAUSED = "paused",
    COMPLETED = "completed"
}
export interface TargetAudience {
    countries?: string[];
    devices?: ('mobile' | 'tablet' | 'desktop')[];
    userSegments?: string[];
}
export declare class ABTest {
    id: string;
    name: string;
    description: string | null;
    componentId: string;
    componentType: string;
    status: ABTestStatus;
    periodStart: Date;
    periodEnd: Date | null;
    conversionGoal: string;
    targetAudience: TargetAudience | null;
    winnerVariantId: string | null;
    confidenceLevel: number | null;
    sampleSize: number | null;
    createdAt: Date;
    updatedAt: Date;
    variants?: ABTestVariant[];
}
//# sourceMappingURL=ab-test.entity.d.ts.map