"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmDialog = ConfirmDialog;
const alert_dialog_1 = require("@/components/ui/alert-dialog");
function ConfirmDialog({ open, onOpenChange, onConfirm, title, description, confirmText = 'Onayla', cancelText = 'İptal', loading = false, variant = 'default', }) {
    return (<alert_dialog_1.AlertDialog open={open} onOpenChange={onOpenChange}>
      <alert_dialog_1.AlertDialogContent>
        <alert_dialog_1.AlertDialogHeader>
          <alert_dialog_1.AlertDialogTitle>{title}</alert_dialog_1.AlertDialogTitle>
          <alert_dialog_1.AlertDialogDescription>{description}</alert_dialog_1.AlertDialogDescription>
        </alert_dialog_1.AlertDialogHeader>
        <alert_dialog_1.AlertDialogFooter>
          <alert_dialog_1.AlertDialogCancel disabled={loading}>{cancelText}</alert_dialog_1.AlertDialogCancel>
          <alert_dialog_1.AlertDialogAction onClick={(e) => {
            e.preventDefault();
            onConfirm();
        }} disabled={loading} className={variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}>
            {loading ? 'İşleniyor...' : confirmText}
          </alert_dialog_1.AlertDialogAction>
        </alert_dialog_1.AlertDialogFooter>
      </alert_dialog_1.AlertDialogContent>
    </alert_dialog_1.AlertDialog>);
}
//# sourceMappingURL=confirm-dialog.js.map