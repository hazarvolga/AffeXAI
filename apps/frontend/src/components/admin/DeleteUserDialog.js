"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserDialog = DeleteUserDialog;
const react_1 = require("react");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const button_1 = require("@/components/ui/button");
const checkbox_1 = require("@/components/ui/checkbox");
const label_1 = require("@/components/ui/label");
const separator_1 = require("@/components/ui/separator");
const lucide_react_1 = require("lucide-react");
function DeleteUserDialog({ user, open, onOpenChange, onConfirm, }) {
    const [hardDelete, setHardDelete] = (0, react_1.useState)(false);
    const [confirmText, setConfirmText] = (0, react_1.useState)('');
    const [isDeleting, setIsDeleting] = (0, react_1.useState)(false);
    if (!user)
        return null;
    const isConfirmed = confirmText.toLowerCase() === 'sil';
    const userFullName = `${user.firstName} ${user.lastName}`;
    const handleConfirm = async () => {
        if (!isConfirmed)
            return;
        setIsDeleting(true);
        try {
            await onConfirm(user.id, hardDelete);
            // Reset state
            setHardDelete(false);
            setConfirmText('');
            onOpenChange(false);
        }
        catch (error) {
            console.error('Delete failed:', error);
        }
        finally {
            setIsDeleting(false);
        }
    };
    return (<alert_dialog_1.AlertDialog open={open} onOpenChange={onOpenChange}>
      <alert_dialog_1.AlertDialogContent className="max-w-md">
        <alert_dialog_1.AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <lucide_react_1.AlertTriangle className="h-6 w-6 text-destructive"/>
            </div>
            <div className="flex-1">
              <alert_dialog_1.AlertDialogTitle className="text-xl">Kullanıcıyı Sil</alert_dialog_1.AlertDialogTitle>
              <alert_dialog_1.AlertDialogDescription className="text-sm">
                Bu işlem geri alınamaz!
              </alert_dialog_1.AlertDialogDescription>
            </div>
          </div>
        </alert_dialog_1.AlertDialogHeader>

        <separator_1.Separator />

        <div className="space-y-4 py-4">
          {/* User Info */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <lucide_react_1.UserX className="h-4 w-4 text-muted-foreground"/>
              <span className="font-semibold text-foreground">{userFullName}</span>
            </div>
            <p className="text-sm text-muted-foreground pl-6">{user.email}</p>
          </div>

          {/* Delete Options */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3">
              <checkbox_1.Checkbox id="hardDelete" checked={hardDelete} onCheckedChange={(checked) => setHardDelete(checked)} className="mt-0.5"/>
              <div className="flex-1">
                <label_1.Label htmlFor="hardDelete" className="text-sm font-medium cursor-pointer text-foreground">
                  Kalıcı Olarak Sil (Hard Delete)
                </label_1.Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {hardDelete ? (<>
                      <strong className="text-destructive">⚠️ Uyarı:</strong> Kullanıcı veritabanından tamamen silinecek.
                      Bu işlem geri alınamaz ve email adresi yeniden kullanılabilir.
                    </>) : (<>
                      Kullanıcı geçici olarak devre dışı bırakılacak (Soft Delete).
                      Gerekirse geri yüklenebilir. Email adresi bloke kalır.
                    </>)}
                </p>
              </div>
            </div>

            {/* Confirmation Input */}
            <div className="space-y-2">
              <label_1.Label htmlFor="confirmText" className="text-sm font-medium text-foreground">
                Onaylamak için <code className="px-1.5 py-0.5 bg-muted rounded text-destructive font-semibold">SİL</code> yazın
              </label_1.Label>
              <input id="confirmText" type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground" placeholder="SİL" autoComplete="off"/>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <lucide_react_1.Trash2 className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0"/>
              <div className="text-xs text-destructive">
                <strong>Silme İşlemi:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Kullanıcının tüm verilerine erişim kaybedilir</li>
                  <li>İlişkili kayıtlar etkilenebilir</li>
                  {hardDelete && (<>
                      <li className="font-semibold">Veritabanından kalıcı olarak silinir</li>
                      <li className="font-semibold">Email adresi yeniden kullanılabilir</li>
                    </>)}
                  {!hardDelete && (<li>Gerekirse admin tarafından geri yüklenebilir</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <separator_1.Separator />

        <alert_dialog_1.AlertDialogFooter>
          <alert_dialog_1.AlertDialogCancel disabled={isDeleting}>İptal</alert_dialog_1.AlertDialogCancel>
          <button_1.Button variant="destructive" onClick={handleConfirm} disabled={!isConfirmed || isDeleting}>
            {isDeleting ? ('Siliniyor...') : (<>
                <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/>
                {hardDelete ? 'Kalıcı Olarak Sil' : 'Kullanıcıyı Sil'}
              </>)}
          </button_1.Button>
        </alert_dialog_1.AlertDialogFooter>
      </alert_dialog_1.AlertDialogContent>
    </alert_dialog_1.AlertDialog>);
}
//# sourceMappingURL=DeleteUserDialog.js.map