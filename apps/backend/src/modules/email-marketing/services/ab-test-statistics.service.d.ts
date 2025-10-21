import { EmailCampaignVariant } from '../entities/email-campaign-variant.entity';
/**
 * Statistical result for A/B test
 */
export interface StatisticalResult {
    isSignificant: boolean;
    pValue: number;
    confidenceLevel: number;
    chiSquare: number;
    degreesOfFreedom: number;
    winner?: string;
    message: string;
    details: {
        sampleSizes: Record<string, number>;
        successRates: Record<string, number>;
        expectedValues: Record<string, number>;
        observedValues: Record<string, number>;
    };
}
/**
 * Confidence interval for a variant
 */
export interface ConfidenceInterval {
    rate: number;
    lower: number;
    upper: number;
    margin: number;
    sampleSize: number;
}
/**
 * A/B Test Statistics Service
 * Provides statistical analysis for email campaign A/B testing
 */
export declare class AbTestStatisticsService {
    /**
     * Calculate chi-square test for A/B test significance
     *
     * Chi-square test determines if there's a statistically significant
     * difference between the observed frequencies (actual results) and
     * expected frequencies (if all variants performed equally).
     *
     * H0 (Null Hypothesis): No difference between variants
     * H1 (Alternative Hypothesis): Significant difference exists
     *
     * @param variants Array of campaign variants with metrics
     * @param metric Metric to test (open, click, conversion)
     * @returns Statistical result with significance determination
     */
    calculateChiSquare(variants: EmailCampaignVariant[], metric: 'open' | 'click' | 'conversion'): StatisticalResult;
    /**
     * Check if test has minimum sample size for all variants
     *
     * Rule of thumb: Need at least 100 observations per variant for
     * reliable statistical analysis, though 50 is acceptable minimum.
     */
    hasMinimumSampleSize(variants: EmailCampaignVariant[], minSampleSize: number): boolean;
    /**
     * Calculate confidence interval for a variant's success rate
     *
     * Uses Wilson score interval (better than normal approximation for small samples)
     *
     * @param variant Campaign variant
     * @param metric Metric to calculate interval for
     * @param confidenceLevel Confidence level (90, 95, or 99)
     * @returns Confidence interval
     */
    calculateConfidenceInterval(variant: EmailCampaignVariant, metric: 'open' | 'click' | 'conversion', confidenceLevel?: number): ConfidenceInterval;
    /**
     * Calculate required sample size for a given effect size
     *
     * @param baselineRate Expected baseline conversion rate (0-1)
     * @param minimumDetectableEffect Minimum effect size to detect (e.g., 0.1 = 10% relative increase)
     * @param confidenceLevel Confidence level (90, 95, or 99)
     * @param power Statistical power (typically 0.8 = 80%)
     * @returns Required sample size per variant
     */
    calculateRequiredSampleSize(baselineRate: number, minimumDetectableEffect: number, confidenceLevel?: number, power?: number): number;
    /**
     * Determine if enough time has passed to stop the test
     *
     * @param startDate Test start date
     * @param durationHours Test duration in hours
     * @returns Whether test duration has elapsed
     */
    hasTestDurationElapsed(startDate: Date, durationHours: number): boolean;
    /**
     * Calculate effect size (Cohen's h) between two variants
     * Measures practical significance (how big the difference is)
     *
     * Cohen's h interpretation:
     * - 0.2: Small effect
     * - 0.5: Medium effect
     * - 0.8: Large effect
     */
    calculateEffectSize(variant1: EmailCampaignVariant, variant2: EmailCampaignVariant, metric: 'open' | 'click' | 'conversion'): number;
    /**
     * Get success count based on metric
     */
    private getSuccessCount;
    /**
     * Get failure count based on metric
     */
    private getFailureCount;
    /**
     * Get total count based on metric
     */
    private getTotalCount;
    /**
     * Calculate p-value from chi-square statistic and degrees of freedom
     *
     * Uses chi-square distribution lookup table approximation
     * For production, consider using a statistical library like jstat
     */
    private calculatePValue;
    /**
     * Get z-score for confidence level
     */
    private getZScore;
}
//# sourceMappingURL=ab-test-statistics.service.d.ts.map