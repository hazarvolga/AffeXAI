import { z } from 'genkit';
declare const SupportTicketAnalysisInputSchema: any;
export type SupportTicketAnalysisInput = z.infer<typeof SupportTicketAnalysisInputSchema>;
declare const SupportTicketAnalysisOutputSchema: any;
export type SupportTicketAnalysisOutput = z.infer<typeof SupportTicketAnalysisOutputSchema>;
export declare function analyzeSupportTicket(input: SupportTicketAnalysisInput): Promise<SupportTicketAnalysisOutput>;
export {};
//# sourceMappingURL=support-ticket-analysis.d.ts.map