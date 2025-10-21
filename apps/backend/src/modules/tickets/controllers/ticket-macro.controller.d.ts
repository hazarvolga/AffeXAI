import { TicketMacroService } from '../services/ticket-macro.service';
import type { CreateMacroDto } from '../services/ticket-macro.service';
/**
 * Ticket Macro Controller
 * Manages bulk actions and predefined workflows
 */
export declare class TicketMacroController {
    private readonly macroService;
    constructor(macroService: TicketMacroService);
    /**
     * Create a new macro (ADMIN/EDITOR only)
     */
    createMacro(dto: CreateMacroDto, userId: string): Promise<import("../entities/ticket-macro.entity").TicketMacro>;
    /**
     * Update a macro (ADMIN/EDITOR only)
     */
    updateMacro(id: string, updates: Partial<CreateMacroDto>): Promise<import("../entities/ticket-macro.entity").TicketMacro>;
    /**
     * Delete a macro (ADMIN only)
     */
    deleteMacro(id: string): Promise<{
        message: string;
    }>;
    /**
     * Get macro by ID
     */
    getMacro(id: string): Promise<import("../entities/ticket-macro.entity").TicketMacro>;
    /**
     * Get all macros
     */
    getAllMacros(userId: string): Promise<import("../entities/ticket-macro.entity").TicketMacro[]>;
    /**
     * Execute macro on tickets
     */
    executeMacro(id: string, body: {
        ticketIds: string[];
    }, userId: string): Promise<import("../services/ticket-macro.service").ExecuteMacroResult>;
    /**
     * Get popular macros
     */
    getPopularMacros(limit?: string): Promise<import("../entities/ticket-macro.entity").TicketMacro[]>;
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
//# sourceMappingURL=ticket-macro.controller.d.ts.map