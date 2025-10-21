import { User } from '../../users/entities/user.entity';
export declare class Notification {
    id: string;
    message: string;
    type: string;
    isRead: boolean;
    userId: string;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
//# sourceMappingURL=notification.entity.d.ts.map