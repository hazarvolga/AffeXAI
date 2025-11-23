import { Repository } from 'typeorm';
import { LearnedFaqEntry } from '../entities/learned-faq-entry.entity';
import { FaqEnhancedSearchService } from './faq-enhanced-search.service';
export interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}
export interface FaqSuggestion {
    faqId: string;
    question: string;
    answer: string;
    relevanceScore: number;
    confidence: number;
    category?: string;
    keywords: string[];
    reasoning: string;
}
export interface ChatContext {
    sessionId: string;
    userId?: string;
    messages: ChatMessage[];
    currentTopic?: string;
    suggestedFaqs: FaqSuggestion[];
    userIntent?: string;
}
export interface AutoResponseConfig {
    enabled: boolean;
    minConfidence: number;
    minRelevance: number;
    maxSuggestions: number;
    requireUserConfirmation: boolean;
}
export interface FeedbackData {
    faqId: string;
    sessionId: string;
    userId?: string;
    wasHelpful: boolean;
    userComment?: string;
    timestamp: Date;
}
export declare class ChatFaqIntegrationService {
    private faqRepository;
    private searchService;
    private readonly logger;
    private chatContexts;
    constructor(faqRepository: Repository<LearnedFaqEntry>, searchService: FaqEnhancedSearchService);
    suggestFaqsForMessage(message: string, sessionId: string, options?: {
        maxSuggestions?: number;
        minRelevance?: number;
        includeContext?: boolean;
    }): Promise<FaqSuggestion[]>;
    /**
     * Get FAQ suggestions for a query (alias for suggestFaqsForMessage)
     */
    getSuggestionsForQuery(query: string, sessionId: string, options?: {
        maxSuggestions?: number;
        minRelevance?: number;
    }): Promise<FaqSuggestion[]>;
    getAutoResponse(message: string, sessionId: string, config?: AutoResponseConfig): Promise<{
        shouldRespond: boolean;
        response?: string;
        faq?: FaqSuggestion;
        confidence: number;
    }>;
    processFeedback(feedback: FeedbackData): Promise<void>;
    getChatContext(sessionId: string): Promise<ChatContext | null>;
    updateChatContext(sessionId: string, update: Partial<ChatContext>): Promise<void>;
    clearChatContext(sessionId: string): Promise<void>;
    getRealtimeSuggestions(partialMessage: string, sessionId: string): Promise<Array<{
        text: string;
        type: 'faq' | 'completion';
    }>>;
    getLearningFeedbackLoop(sessionId: string): Promise<{
        shouldLearn: boolean;
        data?: {
            question: string;
            answer: string;
            context: string;
            confidence: number;
        };
    }>;
    private extractUserIntent;
    private extractKeywords;
    private generateReasoning;
    private calculateConversationConfidence;
    private trackSuggestion;
    private trackAutoResponse;
    getIntegrationStats(): Promise<{
        totalSuggestions: number;
        totalAutoResponses: number;
        averageRelevance: number;
        feedbackStats: {
            helpful: number;
            notHelpful: number;
            ratio: number;
        };
    }>;
}
//# sourceMappingURL=chat-faq-integration.service.d.ts.map