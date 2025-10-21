export interface Webhook {
    id: string;
    name: string;
    url: string;
    isActive: boolean;
    subscribedEvents: string[];
    authType: 'none' | 'bearer' | 'api_key' | 'basic';
    authConfig?: Record<string, any>;
    retryCount: number;
    retryDelay: number;
    timeout: number;
    customHeaders?: Record<string, string>;
    totalCalls: number;
    successfulCalls: number;
    failedCalls: number;
    lastCalledAt?: string;
    lastStatus?: number;
    lastError?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}
export interface WebhookStats {
    totalCalls: number;
    successfulCalls: number;
    failedCalls: number;
    successRate: number;
    averageResponseTime?: number;
}
export declare const webhooksService: {
    /**
     * Get all webhooks
     */
    getAll(): Promise<Webhook[]>;
    /**
     * Get active webhooks
     */
    getActive(): Promise<Webhook[]>;
    /**
     * Get a single webhook
     */
    getOne(id: string): Promise<Webhook>;
    /**
     * Create a new webhook
     */
    create(data: Partial<Webhook>): Promise<Webhook>;
    /**
     * Update a webhook
     */
    update(id: string, data: Partial<Webhook>): Promise<Webhook>;
    /**
     * Delete a webhook
     */
    delete(id: string): Promise<void>;
    /**
     * Test webhook connection
     */
    test(id: string): Promise<{
        success: boolean;
        message: string;
        status?: number;
    }>;
    /**
     * Get webhook statistics
     */
    getStats(id: string): Promise<WebhookStats>;
    /**
     * Get overall webhook statistics
     */
    getOverallStats(): Promise<WebhookStats>;
};
//# sourceMappingURL=webhooksService.d.ts.map