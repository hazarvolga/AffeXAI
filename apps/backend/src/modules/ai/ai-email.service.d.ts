import { AiService } from './ai.service';
import { SettingsService } from '../settings/settings.service';
export interface EmailGenerationContext {
    campaignName?: string;
    targetAudience?: string;
    productName?: string;
    productDescription?: string;
    callToAction?: string;
    tone?: 'professional' | 'casual' | 'enthusiastic' | 'urgent' | 'friendly';
    keywords?: string[];
}
export interface EmailSubjectResult {
    subject: string;
    tokensUsed: number;
}
export interface EmailBodyResult {
    htmlBody: string;
    plainTextBody: string;
    tokensUsed: number;
}
export declare class AiEmailService {
    private readonly aiService;
    private readonly settingsService;
    private readonly logger;
    constructor(aiService: AiService, settingsService: SettingsService);
    /**
     * Generate email subject line using AI
     *
     * @param context - Campaign and product context
     * @param count - Number of subject variations to generate
     * @returns Array of subject line suggestions
     */
    generateSubjectLines(context: EmailGenerationContext, count?: number): Promise<string[]>;
    /**
     * Generate email body content using AI
     *
     * @param subject - Email subject line
     * @param context - Campaign and product context
     * @returns HTML and plain text versions of email body
     */
    generateEmailBody(subject: string, context: EmailGenerationContext): Promise<EmailBodyResult>;
    /**
     * Build subject line generation prompt
     */
    private buildSubjectPrompt;
    /**
     * Build email body generation prompt
     */
    private buildBodyPrompt;
    /**
     * Get system prompt for subject line generation
     */
    private getSubjectSystemPrompt;
    /**
     * Get system prompt for email body generation
     */
    private getBodySystemPrompt;
    /**
     * Parse subject lines from AI response
     */
    private parseSubjectLines;
    /**
     * Parse email body HTML and plain text from AI response
     */
    private parseEmailBody;
    /**
     * Strip HTML tags for plain text fallback
     */
    private stripHtml;
}
//# sourceMappingURL=ai-email.service.d.ts.map