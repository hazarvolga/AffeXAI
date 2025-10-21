interface SlaBreachAlertEmailProps {
    ticketNumber?: string;
    ticketTitle?: string;
    priority?: string;
    customerName?: string;
    assignedAgent?: string;
    breachTime?: string;
    responseTime?: string;
    resolutionTime?: string;
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
export declare const SlaBreachAlertEmail: ({ ticketNumber, ticketTitle, priority, customerName, assignedAgent, breachTime, responseTime, resolutionTime, ticketUrl, siteSettings, }: SlaBreachAlertEmailProps) => JSX.Element;
export default SlaBreachAlertEmail;
//# sourceMappingURL=sla-breach-alert.d.ts.map