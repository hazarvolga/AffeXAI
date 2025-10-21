import type { ABTest } from '@/lib/api/cmsAnalyticsService';
interface ABTestListProps {
    tests: ABTest[];
    isLoading?: boolean;
    onStart?: (id: string) => void;
    onPause?: (id: string) => void;
    onComplete?: (id: string, winnerId?: string) => void;
    onEdit?: (test: ABTest) => void;
    onDelete?: (id: string) => void;
}
export declare function ABTestList({ tests, isLoading, onStart, onPause, onComplete, onEdit, onDelete, }: ABTestListProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ab-test-list.d.ts.map