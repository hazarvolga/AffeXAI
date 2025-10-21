/**
 * TicketCategory Entity
 * Represents a hierarchical category for organizing tickets
 */
export declare class TicketCategory {
    id: string;
    name: string;
    description: string;
    parentId: string;
    parent: TicketCategory;
    children: TicketCategory[];
    ticketCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=ticket-category.entity.d.ts.map