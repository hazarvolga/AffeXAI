import { BaseEntity } from '../../../common/entities/base.entity';
import { PlatformEventType } from './platform-event.entity';
/**
 * Webhook Authentication Types
 */
export declare enum WebhookAuthType {
    NONE = "none",
    BEARER = "bearer",
    API_KEY = "api_key",
    BASIC = "basic"
}
/**
 * Webhook Authentication Config
 */
export interface WebhookAuthConfig {
    token?: string;
    apiKey?: string;
    username?: string;
    password?: string;
    headerName?: string;
}
/**
 * Webhook Entity
 *
 * Configures external webhooks to receive platform events
 *
 * Example Use Cases:
 * - Send events to Zapier
 * - Notify Slack when event created
 * - Update external CRM when subscriber added
 * - Trigger GitHub Actions on deployment
 */
export declare class Webhook extends BaseEntity {
    /**
     * Webhook name
     */
    name: string;
    /**
     * Webhook URL endpoint
     */
    url: string;
    /**
     * Is webhook active?
     */
    isActive: boolean;
    /**
     * Event types this webhook subscribes to
     *
     * Example: ['event.created', 'certificate.issued']
     */
    subscribedEvents: PlatformEventType[];
    /**
     * Authentication type
     */
    authType: WebhookAuthType;
    /**
     * Authentication configuration
     */
    authConfig?: WebhookAuthConfig;
    /**
     * Number of retry attempts on failure
     */
    retryCount: number;
    /**
     * Delay between retries (milliseconds)
     */
    retryDelay: number;
    /**
     * Request timeout (milliseconds)
     */
    timeout: number;
    /**
     * Custom headers to send with webhook
     */
    customHeaders?: Record<string, string>;
    /**
     * Total number of webhook calls
     */
    totalCalls: number;
    /**
     * Successful webhook calls
     */
    successfulCalls: number;
    /**
     * Failed webhook calls
     */
    failedCalls: number;
    /**
     * Last time webhook was called
     */
    lastCalledAt?: Date;
    /**
     * Last HTTP status code received
     */
    lastStatus?: number;
    /**
     * Last error message (if failed)
     */
    lastError?: string;
    /**
     * Description/notes
     */
    description?: string;
    /**
     * Check if webhook is subscribed to event type
     */
    isSubscribedTo(eventType: PlatformEventType): boolean;
    /**
     * Get success rate percentage
     */
    getSuccessRate(): number;
    /**
     * Record webhook call
     */
    recordCall(success: boolean, statusCode?: number, error?: string): void;
    /**
     * Get authorization header based on auth type
     */
    getAuthHeaders(): Record<string, string>;
}
//# sourceMappingURL=webhook.entity.d.ts.map