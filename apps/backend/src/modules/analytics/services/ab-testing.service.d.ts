import { Repository } from 'typeorm';
import { ABTest, ABTestVariant, ABTestStatus } from '../entities';
import { CreateABTestDto, UpdateABTestDto } from '../dto';
export declare class ABTestingService {
    private readonly abTestRepository;
    private readonly variantRepository;
    constructor(abTestRepository: Repository<ABTest>, variantRepository: Repository<ABTestVariant>);
    /**
     * Create a new A/B test
     */
    createTest(dto: CreateABTestDto): Promise<ABTest>;
    /**
     * Get all tests
     */
    getAllTests(status?: ABTestStatus): Promise<ABTest[]>;
    /**
     * Get test by ID
     */
    getTestById(id: string): Promise<ABTest>;
    /**
     * Update test
     */
    updateTest(id: string, dto: UpdateABTestDto): Promise<ABTest>;
    /**
     * Delete test
     */
    deleteTest(id: string): Promise<void>;
    /**
     * Start test (change status to running)
     */
    startTest(id: string): Promise<ABTest>;
    /**
     * Pause test
     */
    pauseTest(id: string): Promise<ABTest>;
    /**
     * Complete test
     */
    completeTest(id: string, winnerVariantId?: string): Promise<ABTest>;
    /**
     * Track variant impression
     */
    trackImpression(variantId: string): Promise<void>;
    /**
     * Track variant interaction
     */
    trackInteraction(variantId: string): Promise<void>;
    /**
     * Track variant conversion
     */
    trackConversion(variantId: string, engagementTime?: number): Promise<void>;
    /**
     * Calculate and update statistical significance
     */
    private updateStatisticalSignificance;
    /**
     * Get variant for user (traffic allocation logic)
     */
    getVariantForUser(testId: string): Promise<ABTestVariant | null>;
}
//# sourceMappingURL=ab-testing.service.d.ts.map