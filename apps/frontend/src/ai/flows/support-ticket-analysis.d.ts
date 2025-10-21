import { z } from 'genkit';
declare const SupportTicketAnalysisInputSchema: z.ZodObject<{
    problemDescription: z.ZodString;
    category: z.ZodString;
}, "strip", z.ZodTypeAny, {
    category: string;
    problemDescription: string;
}, {
    category: string;
    problemDescription: string;
}>;
export type SupportTicketAnalysisInput = z.infer<typeof SupportTicketAnalysisInputSchema>;
declare const SupportTicketAnalysisOutputSchema: z.ZodObject<{
    summary: z.ZodString;
    priority: z.ZodEnum<["Düşük", "Normal", "Yüksek"]>;
    suggestion: z.ZodString;
}, "strip", z.ZodTypeAny, {
    summary: string;
    suggestion: string;
    priority: "Düşük" | "Yüksek" | "Normal";
}, {
    summary: string;
    suggestion: string;
    priority: "Düşük" | "Yüksek" | "Normal";
}>;
export type SupportTicketAnalysisOutput = z.infer<typeof SupportTicketAnalysisOutputSchema>;
export declare function analyzeSupportTicket(input: SupportTicketAnalysisInput): Promise<SupportTicketAnalysisOutput>;
export {};
//# sourceMappingURL=support-ticket-analysis.d.ts.map