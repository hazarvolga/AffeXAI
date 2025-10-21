interface TicketEscalatedEmailProps {
    recipientName?: string;
    ticketNumber?: string;
    ticketTitle?: string;
    priority?: string;
    customerName?: string;
    escalationReason?: string;
    previousAgent?: string;
    createdAt?: string;
    lastUpdate?: string;
    ticketUrl?: string;
    siteSettings?: {
        companyName: string;
        logoUrl: string;
        contact: {
            address: string;
            phone: string;
            email: string;
        };
        socialMedia: {
            [key: string]: string;
        };
    };
}
export declare const TicketEscalatedEmail: ({ recipientName, ticketNumber, ticketTitle, priority, customerName, escalationReason, previousAgent, createdAt, lastUpdate, ticketUrl, siteSettings, }: TicketEscalatedEmailProps) => JSX.Element;
export default TicketEscalatedEmail;
//# sourceMappingURL=ticket-escalated.d.ts.map