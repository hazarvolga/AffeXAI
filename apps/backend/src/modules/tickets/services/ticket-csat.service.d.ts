import { Repository } from 'typeorm';
import { TicketCSAT } from '../entities/ticket-csat.entity';
import { Ticket } from '../entities/ticket.entity';
import { TicketEmailService } from './ticket-email.service';
/**
 * CSAT Service
 * Manages customer satisfaction surveys
 */
export interface CSATSurveyData {
    ticketId: string;
    customerId: string;
    rating: number;
    feedback?: string;
    responses?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
}
export interface CSATStatistics {
    totalResponses: number;
    averageRating: number;
    ratingDistribution: {
        rating: number;
        count: number;
    }[];
    responseRate: number;
    satisfactionScore: number;
    promoterScore: number;
}
export declare class TicketCSATService {
    private readonly csatRepository;
    private readonly ticketRepository;
    private readonly emailService;
    private readonly logger;
    constructor(csatRepository: Repository<TicketCSAT>, ticketRepository: Repository<Ticket>, emailService: TicketEmailService);
    /**
     * Request CSAT survey for a resolved ticket
     */
    requestSurvey(ticketId: string): Promise<TicketCSAT>;
    /**
     * Submit CSAT survey response
     */
    submitSurvey(token: string, surveyData: Partial<CSATSurveyData>): Promise<TicketCSAT>;
    /**
     * Get CSAT survey by token (for public access)
     */
    getSurveyByToken(token: string): Promise<TicketCSAT>;
    /**
     * Get CSAT statistics for analytics
     */
    getStatistics(startDate?: Date, endDate?: Date, agentId?: string): Promise<CSATStatistics>;
    /**
     * Get recent CSAT feedback
     */
    getRecentFeedback(limit?: number): Promise<TicketCSAT[]>;
    /**
     * Generate unique survey token
     */
    private generateSurveyToken;
}
//# sourceMappingURL=ticket-csat.service.d.ts.map