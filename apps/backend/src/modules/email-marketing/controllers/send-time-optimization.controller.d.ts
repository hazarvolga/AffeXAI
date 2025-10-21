import { SendTimeOptimizationService } from '../services/send-time-optimization.service';
export declare class SendTimeOptimizationController {
    private readonly optimizationService;
    constructor(optimizationService: SendTimeOptimizationService);
    /**
     * Get optimal send time for a specific subscriber
     */
    getSubscriberOptimalTime(subscriberId: string): Promise<{
        subscriberId: string;
        optimalTime: {
            hour: number;
            dayOfWeek: number;
            dayName: string;
            formatted: string;
        };
        confidence: number;
        timezone: string;
        basedOnDataPoints: number;
        recommendation: string;
    }>;
    /**
     * Get optimal send times for a campaign
     */
    calculateCampaignOptimalTime(body: {
        campaignId: string;
        subscriberIds: string[];
    }): Promise<{
        campaignId: string;
        globalOptimalTime: Date;
        individualOptimization: {
            enabled: boolean;
            subscriberCount: number;
            optimizedCount: number;
        };
        estimatedImpact: {
            openRateIncrease: string;
            clickRateIncrease: string;
        };
    }>;
    /**
     * Get global optimal send time statistics
     */
    getGlobalOptimalTime(): Promise<{
        globalOptimal: {
            hour: number;
            dayOfWeek: number;
            dayName: string;
            formatted: string;
            averageOpenRate: number;
        };
        insights: {
            type: string;
            message: string;
        }[];
    }>;
    /**
     * Get recommendations for a segment
     */
    getSegmentRecommendations(segmentId: string): Promise<{
        segmentId: string;
        recommendations: {
            time: string;
            expectedOpenRate: number;
            reason: string;
        }[];
        aiPowered: boolean;
        lastUpdated: Date;
    }>;
    /**
     * Helper to get day name
     */
    private getDayName;
    /**
     * Get recommendation based on confidence
     */
    private getRecommendation;
}
//# sourceMappingURL=send-time-optimization.controller.d.ts.map