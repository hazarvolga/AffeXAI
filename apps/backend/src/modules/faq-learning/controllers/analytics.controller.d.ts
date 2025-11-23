import { LearningAnalyticsService } from '../services/learning-analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: LearningAnalyticsService);
    getLearningEffectiveness(period?: 'day' | 'week' | 'month' | 'all'): Promise<{
        success: boolean;
        data: import("../services/learning-analytics.service").LearningEffectivenessMetrics;
    }>;
    getProviderPerformance(period?: 'day' | 'week' | 'month' | 'all'): Promise<{
        success: boolean;
        data: import("../services/learning-analytics.service").ProviderPerformanceMetrics[];
    }>;
    getFaqUsageMetrics(period?: 'day' | 'week' | 'month' | 'all'): Promise<{
        success: boolean;
        data: import("../services/learning-analytics.service").FaqUsageMetrics;
    }>;
    getROIMetrics(period?: 'day' | 'week' | 'month' | 'all'): Promise<{
        success: boolean;
        data: import("../services/learning-analytics.service").ROIMetrics;
    }>;
    getComprehensiveAnalytics(period?: 'day' | 'week' | 'month' | 'all'): Promise<{
        success: boolean;
        data: {
            period: "all" | "week" | "day" | "month";
            generatedAt: Date;
            effectiveness: import("../services/learning-analytics.service").LearningEffectivenessMetrics;
            providerPerformance: import("../services/learning-analytics.service").ProviderPerformanceMetrics[];
            usage: import("../services/learning-analytics.service").FaqUsageMetrics;
            roi: import("../services/learning-analytics.service").ROIMetrics;
        };
    }>;
    getPatternAnalytics(period?: 'day' | 'week' | 'month' | 'all'): Promise<{
        success: boolean;
        data: {
            totalPatterns: number;
            topPatterns: {
                id: string;
                pattern: string;
                frequency: number;
                category: string;
                confidence: number;
            }[];
        };
    }>;
}
//# sourceMappingURL=analytics.controller.d.ts.map