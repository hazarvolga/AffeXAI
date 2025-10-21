interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    variant?: 'default' | 'destructive';
}
export declare function ConfirmDialog({ open, onOpenChange, onConfirm, title, description, confirmText, cancelText, loading, variant, }: ConfirmDialogProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=confirm-dialog.d.ts.map