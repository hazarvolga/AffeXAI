import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
/**
 * Auto-tagging Service
 * Automatically assigns tags to tickets based on content analysis
 */
export interface TagRule {
    tag: string;
    keywords: string[];
    priority?: number;
}
export declare class TicketAutoTaggingService {
    private readonly ticketRepository;
    private readonly logger;
    private readonly tagRules;
    constructor(ticketRepository: Repository<Ticket>);
    /**
     * Automatically tag a ticket based on content
     */
    autoTag(ticket: Ticket): Promise<string[]>;
    /**
     * Update ticket with auto-generated tags
     */
    applyAutoTags(ticketId: string): Promise<Ticket>;
    /**
     * Get suggested tags without applying them
     */
    getSuggestedTags(ticketId: string): Promise<string[]>;
    /**
     * Add custom tag rule
     */
    addTagRule(rule: TagRule): void;
    /**
     * Get all tag rules
     */
    getTagRules(): TagRule[];
}
//# sourceMappingURL=ticket-auto-tagging.service.d.ts.map