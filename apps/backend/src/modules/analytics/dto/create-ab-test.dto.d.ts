import { ABTestStatus } from '../entities';
export declare class ABTestVariantDto {
    name: string;
    description?: string;
    componentConfig: Record<string, any>;
    trafficAllocation: number;
}
export declare class TargetAudienceDto {
    countries?: string[];
    devices?: ('mobile' | 'tablet' | 'desktop')[];
    userSegments?: string[];
}
export declare class CreateABTestDto {
    name: string;
    description?: string;
    componentId: string;
    componentType: string;
    status?: ABTestStatus;
    periodStart: string;
    periodEnd?: string;
    conversionGoal: string;
    targetAudience?: TargetAudienceDto;
    variants: ABTestVariantDto[];
}
export declare class UpdateABTestDto {
    name?: string;
    description?: string;
    status?: ABTestStatus;
    periodEnd?: string;
    winnerVariantId?: string;
    confidenceLevel?: number;
}
//# sourceMappingURL=create-ab-test.dto.d.ts.map