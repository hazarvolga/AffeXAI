import { StatsService } from '../services/stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getRecipientStats(): Promise<{
        totalActiveSubscribers: number;
        groups: {
            subscriberCount: number;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            deletedAt: Date | null;
        }[];
        segments: {
            subscriberCount: number;
            name: string;
            description: string;
            criteria: string;
            openRate: number;
            clickRate: number;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            deletedAt: Date | null;
        }[];
    }>;
}
//# sourceMappingURL=stats.controller.d.ts.map