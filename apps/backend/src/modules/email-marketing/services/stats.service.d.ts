import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';
import { Group } from '../entities/group.entity';
import { Segment } from '../entities/segment.entity';
export declare class StatsService {
    private readonly subscriberRepository;
    private readonly groupRepository;
    private readonly segmentRepository;
    constructor(subscriberRepository: Repository<Subscriber>, groupRepository: Repository<Group>, segmentRepository: Repository<Segment>);
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
//# sourceMappingURL=stats.service.d.ts.map