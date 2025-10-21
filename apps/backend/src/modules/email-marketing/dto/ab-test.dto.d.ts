/**
 * Types of A/B tests
 */
export declare enum TestType {
    SUBJECT = "subject",
    CONTENT = "content",
    SEND_TIME = "send_time",
    FROM_NAME = "from_name",
    COMBINED = "combined"
}
/**
 * Criteria for selecting the winning variant
 */
export declare enum WinnerCriteria {
    OPEN_RATE = "open_rate",
    CLICK_RATE = "click_rate",
    CONVERSION_RATE = "conversion_rate",
    REVENUE = "revenue"
}
/**
 * Single variant configuration
 */
export declare class VariantDto {
    label: string;
    subject?: string;
    content?: string;
    fromName?: string;
    sendTimeOffset?: number;
    splitPercentage: number;
}
/**
 * DTO for creating a new A/B test
 */
export declare class CreateAbTestDto {
    campaignId: string;
    testType: TestType;
    winnerCriteria: WinnerCriteria;
    autoSelectWinner: boolean;
    testDuration: number;
    confidenceLevel: number;
    minSampleSize: number;
    variants: VariantDto[];
}
/**
 * DTO for updating a variant's content
 */
export declare class UpdateVariantDto {
    subject?: string;
    content?: string;
    fromName?: string;
    splitPercentage?: number;
}
/**
 * DTO for sending an A/B test
 */
export declare class SendAbTestDto {
    campaignId: string;
    subscriberIds?: string[];
    segmentIds?: string[];
}
/**
 * DTO for manually selecting a winner
 */
export declare class SelectWinnerDto {
    variantId: string;
}
/**
 * Response DTO for A/B test results
 */
export declare class AbTestResultDto {
    campaign: {
        id: string;
        name: string;
        testType: string;
        winnerCriteria: string;
        testStatus: string;
        autoSelectWinner: boolean;
        winnerSelectionDate: Date | null;
        selectedWinnerId: string | null;
    };
    variants: Array<{
        id: string;
        label: string;
        status: string;
        sentCount: number;
        openedCount: number;
        clickedCount: number;
        conversionCount: number;
        revenue: number;
        openRate: number;
        clickRate: number;
        conversionRate: number;
    }>;
    statistics: {
        isSignificant: boolean;
        pValue: number;
        confidenceLevel: number;
        chiSquare: number;
        winner?: string;
        message: string;
        hasMinimumSample: boolean;
        canDeclareWinner: boolean;
    };
}
//# sourceMappingURL=ab-test.dto.d.ts.map