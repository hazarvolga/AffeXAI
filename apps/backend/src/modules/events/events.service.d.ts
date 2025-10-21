import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { CacheService } from '../../shared/services/cache.service';
import { MailService } from '../mail/mail.service';
import { EventBusService } from '../platform-integration/services/event-bus.service';
export declare class EventsService {
    private eventsRepository;
    private cacheService;
    private mailService;
    private eventBusService;
    private readonly logger;
    constructor(eventsRepository: Repository<Event>, cacheService: CacheService, mailService: MailService, eventBusService: EventBusService);
    create(createEventDto: CreateEventDto): Promise<Event>;
    findAll(): Promise<Event[]>;
    findOne(id: string): Promise<Event>;
    getDashboardStats(): Promise<{
        upcomingEvents: number;
        totalTicketSales: number;
        totalParticipants: number;
        monthlyRevenue: number;
        revenueChange: number;
    }>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<Event>;
    remove(id: string): Promise<void>;
    /**
     * Send event invitation email to participant
     */
    sendEventInvitation(event: Event, participantEmail: string, participantName: string, additionalInfo?: Record<string, any>): Promise<void>;
    /**
     * Send event reminder email (24 hours before event)
     */
    sendEventReminder(event: Event, participantEmail: string, participantName: string): Promise<void>;
    /**
     * Send event cancellation email
     */
    sendEventCancellation(event: Event, participantEmail: string, participantName: string, cancellationReason?: string): Promise<void>;
    /**
     * Send event update notification
     */
    sendEventUpdate(event: Event, participantEmail: string, participantName: string, changes: string[]): Promise<void>;
}
//# sourceMappingURL=events.service.d.ts.map