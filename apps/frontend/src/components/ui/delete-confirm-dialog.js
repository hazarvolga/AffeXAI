"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteConfirmDialog = DeleteConfirmDialog;
const react_1 = __importDefault(require("react"));
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const lucide_react_1 = require("lucide-react");
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
function DeleteConfirmDialog({ open, onOpenChange, onConfirm, title = 'Silme Onayı', description = 'Bu öğeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.', confirmText = 'Sil', cancelText = 'İptal', isDeleting = false, itemName, }) {
    const handleConfirm = async () => {
        await onConfirm();
        onOpenChange(false);
    };
    return (<alert_dialog_1.AlertDialog open={open} onOpenChange={onOpenChange}>
      <alert_dialog_1.AlertDialogContent>
        <alert_dialog_1.AlertDialogHeader>
          <alert_dialog_1.AlertDialogTitle>{title}</alert_dialog_1.AlertDialogTitle>
          <alert_dialog_1.AlertDialogDescription>
            {description}
            {itemName && (<span className="block mt-2 font-medium text-foreground">
                {itemName}
              </span>)}
          </alert_dialog_1.AlertDialogDescription>
        </alert_dialog_1.AlertDialogHeader>
        <alert_dialog_1.AlertDialogFooter>
          <alert_dialog_1.AlertDialogCancel disabled={isDeleting}>
            {cancelText}
          </alert_dialog_1.AlertDialogCancel>
          <alert_dialog_1.AlertDialogAction onClick={handleConfirm} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {isDeleting ? (<>
                <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Siliniyor...
              </>) : (confirmText)}
          </alert_dialog_1.AlertDialogAction>
        </alert_dialog_1.AlertDialogFooter>
      </alert_dialog_1.AlertDialogContent>
    </alert_dialog_1.AlertDialog>);
}
//# sourceMappingURL=delete-confirm-dialog.js.map