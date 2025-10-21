import { Repository } from 'typeorm';
import { TicketMacro, MacroAction } from '../entities/ticket-macro.entity';
import { Ticket } from '../entities/ticket.entity';
import { TicketMessage } from '../entities/ticket-message.entity';
import { TicketsService } from '../tickets.service';
/**
 * Ticket Macro Service
 * Manages bulk actions and predefined workflows
 */
export interface CreateMacroDto {
    name: string;
    description?: string;
    actions: MacroAction[];
    isPublic?: boolean;
    tags?: string[];
}
export interface ExecuteMacroResult {
    success: boolean;
    ticketsAffected: number;
    errors: string[];
}
export declare class TicketMacroService {
    private readonly macroRepository;
    private readonly ticketRepository;
    private readonly messageRepository;
    private readonly ticketsService;
    private readonly logger;
    constructor(macroRepository: Repository<TicketMacro>, ticketRepository: Repository<Ticket>, messageRepository: Repository<TicketMessage>, ticketsService: TicketsService);
    /**
     * Create a new macro
     */
    createMacro(createdById: string, dto: CreateMacroDto): Promise<TicketMacro>;
    /**
     * Update a macro
     */
    updateMacro(id: string, updates: Partial<CreateMacroDto>): Promise<TicketMacro>;
    /**
     * Delete a macro
     */
    deleteMacro(id: string): Promise<void>;
    /**
     * Get macro by ID
     */
    getMacro(id: string): Promise<TicketMacro>;
    /**
     * Get all macros
     */
    getAllMacros(userId?: string): Promise<TicketMacro[]>;
    /**
     * Execute macro on tickets
     */
    executeMacro(macroId: string, ticketIds: string[], userId: string): Promise<ExecuteMacroResult>;
    /**
     * Apply macro actions to a ticket
     */
    private applyMacroActions;
    /**
     * Get popular macros
     */
    getPopularMacros(limit?: number): Promise<TicketMacro[]>;
    /**
     * Get macro statistics
     */
    getStatistics(): Promise<{
        total: number;
        active: number;
        public: number;
        totalUsage: number;
    }>;
}
//# sourceMappingURL=ticket-macro.service.d.ts.map