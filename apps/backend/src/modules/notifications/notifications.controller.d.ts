import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(userId?: string): Promise<Notification[]>;
    findOne(id: string): Promise<Notification>;
    markAsRead(id: string): Promise<Notification>;
    markAllAsRead(body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
    createNotification(body: {
        message: string;
        type: string;
        userId?: string;
        metadata?: Record<string, any>;
    }): Promise<Notification>;
}
//# sourceMappingURL=notifications.controller.d.ts.map