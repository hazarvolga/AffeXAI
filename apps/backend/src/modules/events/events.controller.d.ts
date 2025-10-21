import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { BulkCertificateService } from '../certificates/bulk-certificate.service';
export declare class EventsController {
    private readonly eventsService;
    private readonly bulkCertificateService;
    constructor(eventsService: EventsService, bulkCertificateService: BulkCertificateService);
    create(createEventDto: CreateEventDto): Promise<import("./entities/event.entity").Event>;
    findAll(): Promise<import("./entities/event.entity").Event[]>;
    getStats(): Promise<{
        upcomingEvents: number;
        totalTicketSales: number;
        totalParticipants: number;
        monthlyRevenue: number;
        revenueChange: number;
    }>;
    findOne(id: string): Promise<import("./entities/event.entity").Event>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<import("./entities/event.entity").Event>;
    remove(id: string): Promise<void>;
    /**
     * Generate certificates for event participants
     */
    generateCertificates(eventId: string, body: {
        participantIds?: string[];
        userIds?: string[];
    }): Promise<{
        message: string;
        count: number;
        certificates: import("../certificates/entities/certificate.entity").Certificate[];
    }>;
    /**
     * Get certificate statistics for event
     */
    getCertificateStats(eventId: string): Promise<{
        total: number;
        issued: number;
        sent: number;
        draft: number;
    }>;
    /**
     * Get all certificates for event
     */
    getEventCertificates(eventId: string): Promise<import("../certificates/entities/certificate.entity").Certificate[]>;
    /**
     * Send event invitation email to participant
     */
    sendInvitation(eventId: string, body: {
        email: string;
        name: string;
        additionalInfo?: Record<string, any>;
    }): Promise<{
        message: string;
    }>;
    /**
     * Send event reminder email to participant
     */
    sendReminder(eventId: string, body: {
        email: string;
        name: string;
    }): Promise<{
        message: string;
    }>;
    /**
     * Send event cancellation email to participant
     */
    sendCancellation(eventId: string, body: {
        email: string;
        name: string;
        reason?: string;
    }): Promise<{
        message: string;
    }>;
    /**
     * Send event update notification to participant
     */
    sendUpdate(eventId: string, body: {
        email: string;
        name: string;
        changes: string[];
    }): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=events.controller.d.ts.map