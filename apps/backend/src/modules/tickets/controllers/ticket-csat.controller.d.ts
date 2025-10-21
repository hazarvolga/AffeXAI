import { TicketCSATService, CSATSurveyData } from '../services/ticket-csat.service';
/**
 * CSAT Controller
 * Manages customer satisfaction surveys
 */
export declare class TicketCSATController {
    private readonly csatService;
    constructor(csatService: TicketCSATService);
    /**
     * Get survey by token (public endpoint)
     */
    getSurvey(token: string): Promise<import("../entities/ticket-csat.entity").TicketCSAT>;
    /**
     * Submit CSAT survey (public endpoint)
     */
    submitSurvey(token: string, surveyData: Partial<CSATSurveyData>, ipAddress: string, userAgent: string): Promise<import("../entities/ticket-csat.entity").TicketCSAT>;
    /**
     * Request survey for a ticket (admin only)
     */
    requestSurvey(ticketId: string): Promise<import("../entities/ticket-csat.entity").TicketCSAT>;
    /**
     * Get CSAT statistics
     */
    getStatistics(startDate?: string, endDate?: string, agentId?: string): Promise<import("../services/ticket-csat.service").CSATStatistics>;
    /**
     * Get recent feedback
     */
    getRecentFeedback(limit?: string): Promise<import("../entities/ticket-csat.entity").TicketCSAT[]>;
}
//# sourceMappingURL=ticket-csat.controller.d.ts.map