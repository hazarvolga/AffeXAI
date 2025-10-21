import type { ABTest, CreateABTestDto } from '@/lib/api/cmsAnalyticsService';
interface ABTestFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CreateABTestDto) => void;
    editingTest?: ABTest | null;
    isSubmitting?: boolean;
}
export declare function ABTestFormDialog({ open, onOpenChange, onSubmit, editingTest, isSubmitting, }: ABTestFormDialogProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ab-test-form-dialog.d.ts.map