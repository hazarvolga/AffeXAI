"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeSupportTicket = analyzeSupportTicket;
/**
 * @fileOverview An AI agent that analyzes user support requests.
 *
 * - analyzeSupportTicket - A function that analyzes a support ticket description.
 * - SupportTicketAnalysisInput - The input type for the function.
 * - SupportTicketAnalysisOutput - The return type for the function.
 */
const genkit_1 = require("@/ai/genkit");
const genkit_2 = require("genkit");
const SupportTicketAnalysisInputSchema = genkit_2.z.object({
    problemDescription: genkit_2.z
        .string()
        .describe('The user-submitted description of their problem.'),
    category: genkit_2.z.string().describe('The category the user selected for their problem.'),
});
const SupportTicketAnalysisOutputSchema = genkit_2.z.object({
    summary: genkit_2.z
        .string()
        .describe('A concise, technically-oriented summary of the user\'s problem for a support agent. Extract key details like software version, OS, specific errors, and what the user was trying to accomplish.'),
    priority: genkit_2.z
        .enum(['Düşük', 'Normal', 'Yüksek'])
        .describe('The suggested priority for this ticket. Use "Yüksek" for issues that block work entirely (e.g., crashes, cannot save), "Normal" for functional problems with workarounds, and "Düşük" for "how-to" questions or minor visual bugs.'),
    suggestion: genkit_2.z
        .string()
        .describe('A potential solution or next step for the user to try. This should be a direct, actionable suggestion. For example, "Please check if your graphics card drivers are up to date," or "You can find the setting you are looking for under Options > Reinforcement > Bar Display."'),
});
async function analyzeSupportTicket(input) {
    return analyzeSupportTicketFlow(input);
}
const prompt = genkit_1.ai.definePrompt({
    name: 'analyzeSupportTicketPrompt',
    input: { schema: SupportTicketAnalysisInputSchema },
    output: { schema: SupportTicketAnalysisOutputSchema },
    prompt: `You are an expert Allplan support engineer for Aluplan, the official Turkish distributor. Your task is to analyze a new support request from a user.

Your goals are:
1.  Summarize the user's problem clearly and technically for another support agent. Extract key information.
2.  Suggest a priority for the ticket based on the severity of the issue.
3.  Provide a simple, actionable first-step suggestion for the user to try while they wait for a human agent.

Analyze the following support request:

Category: {{category}}
User's Problem Description:
"{{problemDescription}}"

Based on this, provide the summary, priority, and a suggestion for the user.`,
});
const analyzeSupportTicketFlow = genkit_1.ai.defineFlow({
    name: 'analyzeSupportTicketFlow',
    inputSchema: SupportTicketAnalysisInputSchema,
    outputSchema: SupportTicketAnalysisOutputSchema,
}, async (input) => {
    const { output } = await prompt(input);
    return output;
});
//# sourceMappingURL=support-ticket-analysis.js.map