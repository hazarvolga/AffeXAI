import * as React from "react";
interface TicketNewMessageEmailProps {
    ticketId?: string;
    ticketNumber?: string;
    subject?: string;
    authorName?: string;
    messageContent?: string;
    isFromSupport?: boolean;
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
export declare const TicketNewMessageEmail: ({ ticketId, ticketNumber, subject, authorName, messageContent, isFromSupport, ticketUrl, siteSettings, }: TicketNewMessageEmailProps) => React.JSX.Element;
export default TicketNewMessageEmail;
//# sourceMappingURL=ticket-new-message.d.ts.map