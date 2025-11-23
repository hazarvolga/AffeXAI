import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FaqLearningService } from './faq-learning.service';
import { ChatFaqIntegrationService } from './chat-faq-integration.service';
import { ChatMessage } from '../../chat/entities/chat-message.entity';
import { ChatSession } from '../../chat/entities/chat-session.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
export interface RealTimeProcessingConfig {
    enableChatProcessing: boolean;
    enableTicketProcessing: boolean;
    minChatMessagesForProcessing: number;
    minTicketMessagesForProcessing: number;
    processingDelay: number;
    chatFeedbackThreshold: number;
    ticketResolutionTimeThreshold: number;
}
export interface ProcessingResult {
    processed: boolean;
    reason?: string;
    faqsGenerated?: number;
    patternsIdentified?: number;
}
export declare class RealTimeProcessorService {
    private chatSessionRepository;
    private chatMessageRepository;
    private ticketRepository;
    private configRepository;
    private faqLearningService;
    private chatFaqIntegration;
    private eventEmitter;
    private readonly logger;
    private processingQueue;
    constructor(chatSessionRepository: Repository<ChatSession>, chatMessageRepository: Repository<ChatMessage>, ticketRepository: Repository<Ticket>, configRepository: Repository<FaqLearningConfig>, faqLearningService: FaqLearningService, chatFaqIntegration: ChatFaqIntegrationService, eventEmitter: EventEmitter2);
    processChatSession(sessionId: string): Promise<ProcessingResult>;
    processTicket(ticketId: string): Promise<ProcessingResult>;
    processChatMessageFeedback(messageId: string, isHelpful: boolean): Promise<ProcessingResult>;
    private shouldProcessChatSession;
    private shouldProcessTicket;
    private calculateAverageConfidence;
    private scheduleProcessing;
    private executeChatProcessing;
    private executeTicketProcessing;
    private getProcessingConfig;
    getQueueStatus(): {
        queueSize: number;
        pendingItems: string[];
    };
    clearQueue(): void;
}
//# sourceMappingURL=real-time-processor.service.d.ts.map