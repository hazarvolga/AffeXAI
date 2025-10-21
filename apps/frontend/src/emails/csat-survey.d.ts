import * as React from 'react';
interface CSATSurveyEmailProps {
    customerName: string;
    ticketTitle: string;
    ticketId: string;
    surveyUrl: string;
    agentName?: string;
    siteSettings: {
        siteName: string;
        siteUrl: string;
        supportEmail: string;
    };
}
export declare const CSATSurveyEmail: React.FC<CSATSurveyEmailProps>;
export default CSATSurveyEmail;
//# sourceMappingURL=csat-survey.d.ts.map