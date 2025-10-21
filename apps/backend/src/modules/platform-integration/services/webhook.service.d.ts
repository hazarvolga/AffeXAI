import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Webhook, WebhookAuthType } from '../entities/webhook.entity';
import { PlatformEvent, PlatformEventType } from '../entities/platform-event.entity';
/**
 * Webhook Service
 *
 * Manages webhook subscriptions and deliveries.
 * Sends platform events to external systems via HTTP.
 *
 * Features:
 * - Event-based webhook triggering
 * - Multiple authentication methods (Bearer, API Key, Basic)
 * - Automatic retry with exponential backoff
 * - Success/failure tracking
 * - Webhook health monitoring
 */
export declare class WebhookService {
    private readonly webhookRepository;
    private readonly httpService;
    private readonly logger;
    constructor(webhookRepository: Repository<Webhook>, httpService: HttpService);
    /**
     * Listen to platform events and trigger webhooks
     */
    handlePlatformEvent(data: {
        event: PlatformEvent;
        payload: Record<string, any>;
        metadata?: Record<string, any>;
    }): Promise<void>;
    /**
     * Find webhooks subscribed to an event type
     */
    private findSubscribedWebhooks;
    /**
     * Trigger a webhook with an event
     */
    triggerWebhook(webhook: Webhook, event: PlatformEvent): Promise<void>;
    /**
     * Send HTTP request with retry logic
     */
    private sendWithRetry;
    /**
     * Create a new webhook
     */
    create(data: {
        name: string;
        url: string;
        subscribedEvents: PlatformEventType[];
        authType?: WebhookAuthType;
        authConfig?: any;
        customHeaders?: Record<string, string>;
        description?: string;
        retryCount?: number;
        retryDelay?: number;
        timeout?: number;
    }): Promise<Webhook>;
    /**
     * Update webhook
     */
    update(id: string, data: Partial<Webhook>): Promise<Webhook>;
    /**
     * Delete webhook (soft delete)
     */
    delete(id: string): Promise<void>;
    /**
     * Get all webhooks
     */
    findAll(): Promise<Webhook[]>;
    /**
     * Get active webhooks
     */
    findActive(): Promise<Webhook[]>;
    /**
     * Get webhook by ID
     */
    findOne(id: string): Promise<Webhook | null>;
    /**
     * Test webhook connection
     */
    testWebhook(id: string): Promise<{
        success: boolean;
        status?: number;
        error?: string;
        duration: number;
    }>;
    /**
     * Get webhook statistics
     */
    getWebhookStats(id: string): Promise<{
        totalCalls: number;
        successfulCalls: number;
        failedCalls: number;
        successRate: number;
        lastCalledAt?: Date;
        lastStatus?: number;
    }>;
    /**
     * Get overall webhook statistics
     */
    getOverallStats(): Promise<{
        totalWebhooks: number;
        activeWebhooks: number;
        totalCalls: number;
        successfulCalls: number;
        averageSuccessRate: number;
    }>;
}
//# sourceMappingURL=webhook.service.d.ts.map