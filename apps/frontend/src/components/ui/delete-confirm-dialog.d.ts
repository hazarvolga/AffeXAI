import React from 'react';
export interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void | Promise<void>;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    isDeleting?: boolean;
    itemName?: string;
}
/**
 * Professional delete confirmation dialog
 *
 * @example
 * ```tsx
 * const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 * const [pageToDelete, setPageToDelete] = useState<string | null>(null);
 *
 * <DeleteConfirmDialog
 *   open={deleteDialogOpen}
 *   onOpenChange={setDeleteDialogOpen}
 *   onConfirm={async () => {
 *     await cmsService.deletePage(pageToDelete!);
 *     fetchPages();
 *   }}
 *   title="Sayfayı Sil"
 *   description="Bu sayfayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
 *   itemName="sayfa"
 * />
 * ```
 */
export declare function DeleteConfirmDialog({ open, onOpenChange, onConfirm, title, description, confirmText, cancelText, isDeleting, itemName, }: DeleteConfirmDialogProps): React.JSX.Element;
//# sourceMappingURL=delete-confirm-dialog.d.ts.map