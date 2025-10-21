import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
export declare class NotificationsService {
    private notificationRepository;
    private readonly logger;
    constructor(notificationRepository: Repository<Notification>);
    createNotification(data: {
        message: string;
        type: string;
        userId?: string;
        metadata?: Record<string, any>;
    }): Promise<Notification>;
    findAll(userId?: string): Promise<Notification[]>;
    findOne(id: string): Promise<Notification>;
    markAsRead(id: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<void>;
}
//# sourceMappingURL=notifications.service.d.ts.map