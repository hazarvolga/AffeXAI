import { User } from '../../users/entities/user.entity';
/**
 * Ticket Macro Entity
 * Predefined bulk actions for ticket management
 */
export declare class TicketMacro {
    id: string;
    name: string;
    description: string;
    createdById: string;
    createdBy: User;
    actions: MacroAction[];
    isActive: boolean;
    isPublic: boolean;
    usageCount: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface MacroAction {
    type: 'update_status' | 'assign' | 'add_tag' | 'remove_tag' | 'set_priority' | 'add_note' | 'send_email';
    value: any;
}
//# sourceMappingURL=ticket-macro.entity.d.ts.map