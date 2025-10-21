import * as React from "react";
interface TicketCreatedEmailProps {
    ticketId?: string;
    ticketNumber?: string;
    subject?: string;
    priority?: string;
    customerName?: string;
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
export declare const TicketCreatedEmail: ({ ticketId, ticketNumber, subject, priority, customerName, ticketUrl, siteSettings, }: TicketCreatedEmailProps) => React.JSX.Element;
export default TicketCreatedEmail;
//# sourceMappingURL=ticket-created.d.ts.map