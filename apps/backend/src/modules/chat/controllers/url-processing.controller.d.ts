import { UrlProcessorService } from '../services/url-processor.service';
import { UrlCacheService } from '../services/url-cache.service';
import { UrlProcessingStatus } from '../entities/chat-url-cache.entity';
declare class ProcessUrlDto {
    url: string;
    forceRefresh?: boolean;
}
declare class BulkProcessUrlsDto {
    urls: string[];
    forceRefresh?: boolean;
}
export declare class UrlProcessingController {
    private readonly urlProcessorService;
    private readonly urlCacheService;
    constructor(urlProcessorService: UrlProcessorService, urlCacheService: UrlCacheService);
    /**
     * Process a single URL and extract content
     */
    processUrl(dto: ProcessUrlDto): Promise<{
        success: boolean;
        cached: boolean;
        data: {
            title: string;
            content: string;
            metadata: any;
        } | undefined;
    }>;
    /**
     * Process multiple URLs in batch
     */
    processBatchUrls(dto: BulkProcessUrlsDto): Promise<{
        processed: number;
        errorCount: number;
        results: {
            url: string;
            success: boolean;
            cached: boolean;
            data: {
                title: string;
                content: string;
                metadata: any;
            } | undefined;
            error: string | undefined;
        }[];
        errors: {
            url: string;
            error: any;
        }[];
    }>;
    /**
     * Get cached URL data
     */
    getCachedUrl(urlHash: string): Promise<{
        success: boolean;
        data: import("../entities/chat-url-cache.entity").ChatUrlCache;
    }>;
    /**
     * Get cache entries with pagination and filtering
     */
    getCacheEntries(page?: number, limit?: number, status?: UrlProcessingStatus, domain?: string, sortBy?: 'createdAt' | 'expiresAt' | 'title', sortOrder?: 'ASC' | 'DESC'): Promise<{
        entries: import("../entities/chat-url-cache.entity").ChatUrlCache[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        success: boolean;
    }>;
    /**
     * Get cache metrics and statistics
     */
    getCacheMetrics(): Promise<{
        success: boolean;
        metrics: import("../services/url-cache.service").CacheMetrics;
    }>;
    /**
     * Clean up expired and failed cache entries
     */
    cleanupCache(options?: {
        removeExpired?: boolean;
        removeFailed?: boolean;
        olderThanDays?: number;
    }): Promise<{
        success: boolean;
        cleanup: import("../services/url-cache.service").CacheCleanupResult;
    }>;
    /**
     * Remove specific URL from cache
     */
    removeCacheByUrl(url: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Get cache entries for a specific domain
     */
    getCacheByDomain(domain: string, limit?: number): Promise<{
        success: boolean;
        domain: string;
        count: number;
        entries: import("../entities/chat-url-cache.entity").ChatUrlCache[];
    }>;
    /**
     * Preload URLs for caching
     */
    preloadUrls(urls: string[]): Promise<{
        success: boolean;
        preload: {
            processed: number;
            failed: number;
            alreadyCached: number;
        };
    }>;
    /**
     * Reset cache metrics
     */
    resetCacheMetrics(): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Bulk update cache entry status
     */
    bulkUpdateStatus(dto: {
        urlHashes: string[];
        status: UrlProcessingStatus;
    }): Promise<{
        success: boolean;
        updated: number;
        message: string;
    }>;
}
export {};
//# sourceMappingURL=url-processing.controller.d.ts.map