interface SlaApproachingAlertEmailProps {
    ticketNumber?: string;
    ticketTitle?: string;
    priority?: string;
    customerName?: string;
    assignedAgent?: string;
    remainingTime?: string;
    slaDeadline?: string;
    responseTime?: string;
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
export declare const SlaApproachingAlertEmail: ({ ticketNumber, ticketTitle, priority, customerName, assignedAgent, remainingTime, slaDeadline, responseTime, ticketUrl, siteSettings, }: SlaApproachingAlertEmailProps) => JSX.Element;
export default SlaApproachingAlertEmail;
//# sourceMappingURL=sla-approaching-alert.d.ts.map