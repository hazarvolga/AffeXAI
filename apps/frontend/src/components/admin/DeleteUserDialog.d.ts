import { User } from '@affexai/shared-types';
interface DeleteUserDialogProps {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (userId: string, hardDelete: boolean) => Promise<void>;
}
export declare function DeleteUserDialog({ user, open, onOpenChange, onConfirm, }: DeleteUserDialogProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=DeleteUserDialog.d.ts.map