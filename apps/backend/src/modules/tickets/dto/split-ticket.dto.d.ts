/**
 * DTO for splitting a ticket
 */
export declare class SplitTicketDto {
    originalTicketId: string;
    newTicketSubject: string;
    newTicketDescription: string;
    newTicketPriority?: string;
    newTicketCategoryId?: string;
    messageIds?: string[];
    splitNote?: string;
}
//# sourceMappingURL=split-ticket.dto.d.ts.map