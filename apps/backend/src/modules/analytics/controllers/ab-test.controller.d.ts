import { ABTestingService } from '../services';
import { CreateABTestDto, UpdateABTestDto } from '../dto';
import { ABTestStatus } from '../entities';
export declare class ABTestController {
    private readonly abTestingService;
    constructor(abTestingService: ABTestingService);
    /**
     * Create new A/B test
     * POST /ab-tests
     */
    createTest(dto: CreateABTestDto): Promise<import("../entities").ABTest>;
    /**
     * Get all A/B tests
     * GET /ab-tests
     */
    getAllTests(status?: ABTestStatus): Promise<import("../entities").ABTest[]>;
    /**
     * Get A/B test by ID
     * GET /ab-tests/:id
     */
    getTestById(id: string): Promise<import("../entities").ABTest>;
    /**
     * Update A/B test
     * PUT /ab-tests/:id
     */
    updateTest(id: string, dto: UpdateABTestDto): Promise<import("../entities").ABTest>;
    /**
     * Delete A/B test
     * DELETE /ab-tests/:id
     */
    deleteTest(id: string): Promise<{
        message: string;
    }>;
    /**
     * Start A/B test
     * POST /ab-tests/:id/start
     */
    startTest(id: string): Promise<import("../entities").ABTest>;
    /**
     * Pause A/B test
     * POST /ab-tests/:id/pause
     */
    pauseTest(id: string): Promise<import("../entities").ABTest>;
    /**
     * Complete A/B test
     * POST /ab-tests/:id/complete
     */
    completeTest(id: string, winnerVariantId?: string): Promise<import("../entities").ABTest>;
}
//# sourceMappingURL=ab-test.controller.d.ts.map