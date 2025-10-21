import { TicketAnalyticsService } from '../services/ticket-analytics.service';
/**
 * Ticket Analytics Controller
 * RESTful API endpoints for ticket analytics and reporting
 */
export declare class TicketAnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: TicketAnalyticsService);
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
     * Get time-based statistics
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
    getAgentPerformance(): Promise<{
        agentId: string;
        agentName: string;
        assignedTickets: number;
        resolvedTickets: number;
        avgResponseTime: number;
        avgResolutionTime: number;
        slaCompliance: number;
        activeTickets: number;
    }[]>;
    /**
     * Get specific agent performance
     */
    getSpecificAgentPerformance(agentId: string): Promise<{
        agentId: string;
        agentName: string;
        assignedTickets: number;
        resolvedTickets: number;
        avgResponseTime: number;
        avgResolutionTime: number;
        slaCompliance: number;
        activeTickets: number;
    }>;
    /**
     * Get category statistics
     */
    getCategoryStats(): Promise<{
        categoryId: string;
        categoryName: string;
        totalTickets: number;
        openTickets: number;
        resolvedTickets: number;
        avgResolutionTime: number;
    }[]>;
    /**
     * Get tag statistics
     */
    getTagStats(): Promise<{
        tag: string;
        count: number;
        avgResolutionTime: number;
    }[]>;
    /**
     * Get customer statistics (admin view)
     */
    getCustomerStats(): Promise<{
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
    /**
     * Get customer's own statistics
     */
    getMyStats(userId: string): Promise<{
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
//# sourceMappingURL=ticket-analytics.controller.d.ts.map