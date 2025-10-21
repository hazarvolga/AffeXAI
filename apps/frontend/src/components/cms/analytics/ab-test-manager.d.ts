import type { ABTest } from '@/types/cms-analytics';
export interface ABTestManagerProps {
    /** Existing tests */
    tests: ABTest[];
    /** On create test */
    onCreateTest?: (test: Partial<ABTest>) => void;
    /** On update test */
    onUpdateTest?: (testId: string, updates: Partial<ABTest>) => void;
    /** On delete test */
    onDeleteTest?: (testId: string) => void;
    /** On declare winner */
    onDeclareWinner?: (testId: string, variantId: string) => void;
}
export declare function ABTestManager({ tests, onCreateTest, onUpdateTest, onDeleteTest, onDeclareWinner, }: ABTestManagerProps): import("react").JSX.Element;
//# sourceMappingURL=ab-test-manager.d.ts.map