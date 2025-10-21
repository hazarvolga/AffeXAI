import * as React from "react";
interface TicketAssignedEmailProps {
    ticketId?: string;
    ticketNumber?: string;
    subject?: string;
    assignedToName?: string;
    assignedToEmail?: string;
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
export declare const TicketAssignedEmail: ({ ticketId, ticketNumber, subject, assignedToName, assignedToEmail, customerName, ticketUrl, siteSettings, }: TicketAssignedEmailProps) => React.JSX.Element;
export default TicketAssignedEmail;
//# sourceMappingURL=ticket-assigned.d.ts.map