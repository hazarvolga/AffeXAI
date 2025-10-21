import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { BusinessHoursService } from './business-hours.service';
/**
 * SLA Service
 * Handles all SLA-related calculations and tracking
 */
export declare class SlaService {
    private readonly ticketRepository;
    private readonly businessHoursService;
    private readonly DEFAULT_SLA_CONFIG;
    constructor(ticketRepository: Repository<Ticket>, businessHoursService: BusinessHoursService);
    /**
     * Calculate and set SLA due dates for a ticket based on priority
     */
    calculateSLADueDates(ticket: Ticket): {
        slaFirstResponseDueAt: Date;
        slaResolutionDueAt: Date;
    };
    /**
     * Check if SLA is breached for a ticket
     */
    checkSLABreach(ticket: Ticket): boolean;
    /**
     * Calculate response time in hours
     */
    calculateResponseTime(ticket: Ticket): number;
    /**
     * Calculate resolution time in hours
     */
    calculateResolutionTime(ticket: Ticket): number;
    /**
     * Check if a date is within business hours
     */
    isWithinBusinessHours(date: Date): boolean;
    /**
     * Get SLA status for a ticket
     */
    getSLAStatus(ticket: Ticket): {
        firstResponse: {
            isDue: boolean;
            isBreached: boolean;
            remainingHours: number;
        };
        resolution: {
            isDue: boolean;
            isBreached: boolean;
            remainingHours: number;
        };
    };
    /**
     * Update ticket with SLA calculations
     */
    updateTicketSLA(ticketId: string): Promise<Ticket>;
    /**
     * Get tickets approaching SLA breach (within threshold hours)
     */
    getTicketsApproachingSLABreach(thresholdHours?: number): Promise<Ticket[]>;
}
//# sourceMappingURL=sla.service.d.ts.map