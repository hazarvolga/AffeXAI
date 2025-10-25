import { AiService } from '../../ai/ai.service';
import { GeneralCommunicationContextService, PlatformInfoSource } from './general-communication-context.service';
import { ChatAiSettingsService } from './chat-ai-settings.service';
export interface GeneralAiResponse {
    content: string;
    confidence: number;
    responseType: 'informational' | 'guidance' | 'escalation-suggested' | 'clarification-needed';
    suggestedActions?: string[];
    contextSources?: PlatformInfoSource[];
    escalationReason?: string;
}
export interface GeneralCommunicationOptions {
    includeContextSources?: boolean;
    maxResponseLength?: number;
    tone?: 'friendly' | 'professional' | 'helpful';
    language?: 'tr' | 'en';
}
export declare class GeneralCommunicationAiService {
    private readonly aiService;
    private readonly generalContextService;
    private readonly chatAiSettings;
    private readonly logger;
    constructor(aiService: AiService, generalContextService: GeneralCommunicationContextService, chatAiSettings: ChatAiSettingsService);
    /**
     * Generate AI response for general communication queries
     */
    generateGeneralResponse(query: string, sessionId: string, options?: GeneralCommunicationOptions): Promise<GeneralAiResponse>;
    /**
     * Analyze query type to determine appropriate response strategy
     */
    private analyzeQueryType;
    /**
     * Determine if query should be escalated to support
     */
    private shouldEscalateToSupport;
    /**
     * Build AI prompt for general communication
     */
    private buildGeneralCommunicationPrompt;
    /**
     * Get system message for AI
     */
    private getSystemMessage;
    /**
     * Calculate response confidence based on context quality
     */
    private calculateResponseConfidence;
    /**
     * Extract suggested actions from AI response
     */
    private extractSuggestedActions;
    /**
     * Generate escalation response
     */
    private generateEscalationResponse;
    /**
     * Get fallback response when AI generation fails
     */
    private getFallbackResponse;
    /**
     * Get conversation starters for general communication
     */
    getConversationStarters(language?: string): Promise<string[]>;
}
//# sourceMappingURL=general-communication-ai.service.d.ts.map