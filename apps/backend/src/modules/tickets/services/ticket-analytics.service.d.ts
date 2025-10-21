import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { TicketMessage } from '../entities/ticket-message.entity';
/**
 * Ticket Analytics Service
 * Provides comprehensive analytics and reporting for support tickets
 */
export declare class TicketAnalyticsService {
    private readonly ticketRepository;
    private readonly messageRepository;
    private readonly logger;
    constructor(ticketRepository: Repository<Ticket>, messageRepository: Repository<TicketMessage>);
    /**
     * Get overall ticket statistics
     */
    getOverallStats(): Promise<{
        total: number;
        byStatus: Record<string, number>;
        byPriority: Record<string, number>;
        avgResponseTime: number;
        avgResolutionTime: number;
        slaCompliance: number;
        satisfactionScore: number;
    }>;
    /**
     * Get time-based analytics (daily, weekly, monthly)
     */
    getTimeBasedStats(period?: 'day' | 'week' | 'month'): Promise<{
        createdTickets: Array<{
            date: string;
            count: number;
        }>;
        resolvedTickets: Array<{
            date: string;
            count: number;
        }>;
        avgResponseTime: Array<{
            date: string;
            hours: number;
        }>;
        slaBreaches: Array<{
            date: string;
            count: number;
        }>;
    }>;
    /**
     * Get agent performance statistics
     */
    getAgentPerformance(agentId?: string): Promise<Array<{
        agentId: string;
        agentName: string;
        assignedTickets: number;
        resolvedTickets: number;
        avgResponseTime: number;
        avgResolutionTime: number;
        slaCompliance: number;
        activeTickets: number;
    }>>;
    /**
     * Get category statistics
     */
    getCategoryStats(): Promise<Array<{
        categoryId: string;
        categoryName: string;
        totalTickets: number;
        openTickets: number;
        resolvedTickets: number;
        avgResolutionTime: number;
    }>>;
    /**
     * Get tag analytics
     */
    getTagStats(): Promise<Array<{
        tag: string;
        count: number;
        avgResolutionTime: number;
    }>>;
    /**
     * Get customer statistics
     */
    getCustomerStats(userId?: string): Promise<{
        totalTickets: number;
        openTickets: number;
        resolvedTickets: number;
        avgResolutionTime: number;
        mostUsedCategories: Array<{
            category: string;
            count: number;
        }>;
        mostUsedTags: Array<{
            tag: string;
            count: number;
        }>;
    }>;
}
//# sourceMappingURL=ticket-analytics.service.d.ts.map