import { Repository } from 'typeorm';
import { ChatUrlCache, UrlProcessingStatus } from '../entities/chat-url-cache.entity';
export interface CacheMetrics {
    totalEntries: number;
    hitRate: number;
    missRate: number;
    expiredEntries: number;
    failedEntries: number;
    averageContentSize: number;
    topDomains: Array<{
        domain: string;
        count: number;
    }>;
    processingStatusDistribution: Record<UrlProcessingStatus, number>;
}
export interface CacheCleanupResult {
    expiredRemoved: number;
    failedRemoved: number;
    totalRemoved: number;
    remainingEntries: number;
}
export declare class UrlCacheService {
    private readonly urlCacheRepository;
    private readonly logger;
    private readonly DEFAULT_CACHE_EXPIRY_HOURS;
    private readonly MAX_CACHE_SIZE;
    private readonly CLEANUP_BATCH_SIZE;
    private cacheHits;
    private cacheMisses;
    private lastMetricsReset;
    constructor(urlCacheRepository: Repository<ChatUrlCache>);
    /**
     * Get cached URL by hash with hit/miss tracking
     */
    getCachedUrl(urlHash: string): Promise<ChatUrlCache | null>;
    /**
     * Store or update URL cache entry
     */
    setCachedUrl(url: string, data: {
        title?: string;
        content?: string;
        metadata?: any;
        processingStatus?: UrlProcessingStatus;
        expiryHours?: number;
    }): Promise<ChatUrlCache>;
    /**
     * Check if URL exists in cache and is valid
     */
    isCached(url: string): Promise<boolean>;
    /**
     * Get cache entry by URL
     */
    getCacheByUrl(url: string): Promise<ChatUrlCache | null>;
    /**
     * Remove cache entry by URL
     */
    removeCacheByUrl(url: string): Promise<boolean>;
    /**
     * Get cache entries by domain
     */
    getCacheByDomain(domain: string, limit?: number): Promise<ChatUrlCache[]>;
    /**
     * Scheduled cleanup of expired and failed entries
     */
    scheduledCleanup(): Promise<void>;
    /**
     * Manual cache cleanup
     */
    cleanupCache(options?: {
        removeExpired?: boolean;
        removeFailed?: boolean;
        olderThanDays?: number;
    }): Promise<CacheCleanupResult>;
    /**
     * Get comprehensive cache metrics
     */
    getCacheMetrics(): Promise<CacheMetrics>;
    /**
     * Reset cache metrics
     */
    resetMetrics(): void;
    /**
     * Get cache entries with pagination
     */
    getCacheEntries(options?: {
        page?: number;
        limit?: number;
        status?: UrlProcessingStatus;
        domain?: string;
        sortBy?: 'createdAt' | 'expiresAt' | 'title';
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<{
        entries: ChatUrlCache[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    /**
     * Bulk update cache entries
     */
    bulkUpdateStatus(urlHashes: string[], status: UrlProcessingStatus): Promise<number>;
    /**
     * Generate URL hash for deduplication
     */
    private generateUrlHash;
    /**
     * Preload cache for common URLs
     */
    preloadUrls(urls: string[]): Promise<{
        processed: number;
        failed: number;
        alreadyCached: number;
    }>;
}
//# sourceMappingURL=url-cache.service.d.ts.map