import * as React from "react";
interface TicketResolvedEmailProps {
    ticketId?: string;
    ticketNumber?: string;
    subject?: string;
    customerName?: string;
    resolvedByName?: string;
    resolutionNotes?: string;
    ticketUrl?: string;
    feedbackUrl?: string;
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
export declare const TicketResolvedEmail: ({ ticketId, ticketNumber, subject, customerName, resolvedByName, resolutionNotes, ticketUrl, feedbackUrl, siteSettings, }: TicketResolvedEmailProps) => React.JSX.Element;
export default TicketResolvedEmail;
//# sourceMappingURL=ticket-resolved.d.ts.map