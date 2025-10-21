import { WebhookService } from '../services/webhook.service';
import { Webhook } from '../entities/webhook.entity';
/**
 * Webhooks Controller
 *
 * CRUD operations for webhooks and webhook testing.
 */
export declare class WebhooksController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
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
     * Create new webhook
     */
    create(data: any): Promise<Webhook>;
    /**
     * Update webhook
     */
    update(id: string, data: Partial<Webhook>): Promise<Webhook>;
    /**
     * Delete webhook (soft delete)
     */
    delete(id: string): Promise<{
        success: boolean;
    }>;
    /**
     * Test webhook connection
     */
    test(id: string): Promise<{
        success: boolean;
        status?: number;
        error?: string;
        duration: number;
    }>;
    /**
     * Get webhook statistics
     */
    getStats(id: string): Promise<{
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
//# sourceMappingURL=webhooks.controller.d.ts.map