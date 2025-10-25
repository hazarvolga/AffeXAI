import { Repository } from 'typeorm';
import { ChatUrlCache } from '../entities/chat-url-cache.entity';
export interface UrlProcessingResult {
    success: boolean;
    cached: boolean;
    data?: {
        title: string;
        content: string;
        metadata: any;
    };
    error?: string;
}
export declare class UrlProcessorService {
    private readonly urlCacheRepository;
    private readonly logger;
    private browser;
    private readonly rateLimitMap;
    private readonly RATE_LIMIT_DELAY;
    private readonly CACHE_EXPIRY_HOURS;
    private readonly MAX_CONTENT_LENGTH;
    constructor(urlCacheRepository: Repository<ChatUrlCache>);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    /**
     * Process a URL and extract content with caching
     */
    processUrl(url: string): Promise<UrlProcessingResult>;
    /**
     * Extract content from URL using multiple methods
     */
    private extractContent;
    /**
     * Extract content using Puppeteer for dynamic content
     */
    private extractWithPuppeteer;
    /**
     * Extract content using Cheerio for static content
     */
    private extractWithCheerio;
    /**
     * Check robots.txt compliance
     */
    private checkRobotsCompliance;
    /**
     * Apply rate limiting per domain
     */
    private applyRateLimit;
    /**
     * Get cached URL entry
     */
    private getCachedUrl;
    /**
     * Generate hash for URL
     */
    private generateUrlHash;
    /**
     * Clean up expired cache entries
     */
    cleanupExpiredCache(): Promise<number>;
    /**
     * Get cache statistics
     */
    getCacheStats(): Promise<{
        total: number;
        completed: number;
        failed: number;
        pending: number;
        expired: number;
    }>;
}
//# sourceMappingURL=url-processor.service.d.ts.map