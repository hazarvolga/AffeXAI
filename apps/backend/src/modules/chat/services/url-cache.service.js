"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlCacheService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const crypto = __importStar(require("crypto"));
const chat_url_cache_entity_1 = require("../entities/chat-url-cache.entity");
let UrlCacheService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _scheduledCleanup_decorators;
    var UrlCacheService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _scheduledCleanup_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR)];
            __esDecorate(this, null, _scheduledCleanup_decorators, { kind: "method", name: "scheduledCleanup", static: false, private: false, access: { has: obj => "scheduledCleanup" in obj, get: obj => obj.scheduledCleanup }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UrlCacheService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        urlCacheRepository = __runInitializers(this, _instanceExtraInitializers);
        logger = new common_1.Logger(UrlCacheService.name);
        DEFAULT_CACHE_EXPIRY_HOURS = 24;
        MAX_CACHE_SIZE = 10000; // Maximum number of cache entries
        CLEANUP_BATCH_SIZE = 100;
        // In-memory metrics for performance tracking
        cacheHits = 0;
        cacheMisses = 0;
        lastMetricsReset = Date.now();
        constructor(urlCacheRepository) {
            this.urlCacheRepository = urlCacheRepository;
        }
        /**
         * Get cached URL by hash with hit/miss tracking
         */
        async getCachedUrl(urlHash) {
            const cached = await this.urlCacheRepository.findOne({
                where: { urlHash }
            });
            if (cached && !cached.isExpired && cached.isProcessed) {
                this.cacheHits++;
                this.logger.debug(`Cache hit for hash: ${urlHash}`);
                return cached;
            }
            else {
                this.cacheMisses++;
                this.logger.debug(`Cache miss for hash: ${urlHash}`);
                return null;
            }
        }
        /**
         * Store or update URL cache entry
         */
        async setCachedUrl(url, data) {
            const urlHash = this.generateUrlHash(url);
            const expiresAt = new Date(Date.now() + (data.expiryHours || this.DEFAULT_CACHE_EXPIRY_HOURS) * 60 * 60 * 1000);
            let cacheEntry = await this.urlCacheRepository.findOne({ where: { urlHash } });
            if (cacheEntry) {
                // Update existing entry
                cacheEntry.title = data.title || cacheEntry.title;
                cacheEntry.content = data.content || cacheEntry.content;
                cacheEntry.metadata = { ...cacheEntry.metadata, ...data.metadata };
                cacheEntry.processingStatus = data.processingStatus || cacheEntry.processingStatus;
                cacheEntry.expiresAt = expiresAt;
            }
            else {
                // Create new entry
                cacheEntry = this.urlCacheRepository.create({
                    urlHash,
                    originalUrl: url,
                    title: data.title,
                    content: data.content,
                    metadata: data.metadata || {},
                    processingStatus: data.processingStatus || chat_url_cache_entity_1.UrlProcessingStatus.COMPLETED,
                    expiresAt,
                });
            }
            return await this.urlCacheRepository.save(cacheEntry);
        }
        /**
         * Check if URL exists in cache and is valid
         */
        async isCached(url) {
            const urlHash = this.generateUrlHash(url);
            const cached = await this.getCachedUrl(urlHash);
            return cached !== null;
        }
        /**
         * Get cache entry by URL
         */
        async getCacheByUrl(url) {
            const urlHash = this.generateUrlHash(url);
            return await this.getCachedUrl(urlHash);
        }
        /**
         * Remove cache entry by URL
         */
        async removeCacheByUrl(url) {
            const urlHash = this.generateUrlHash(url);
            const result = await this.urlCacheRepository.delete({ urlHash });
            return (result.affected || 0) > 0;
        }
        /**
         * Get cache entries by domain
         */
        async getCacheByDomain(domain, limit = 50) {
            return await this.urlCacheRepository
                .createQueryBuilder('cache')
                .where('cache.originalUrl LIKE :domain', { domain: `%${domain}%` })
                .orderBy('cache.createdAt', 'DESC')
                .limit(limit)
                .getMany();
        }
        /**
         * Scheduled cleanup of expired and failed entries
         */
        async scheduledCleanup() {
            try {
                const result = await this.cleanupCache();
                if (result.totalRemoved > 0) {
                    this.logger.log(`Scheduled cleanup completed: ${result.totalRemoved} entries removed ` +
                        `(${result.expiredRemoved} expired, ${result.failedRemoved} failed)`);
                }
            }
            catch (error) {
                this.logger.error('Scheduled cleanup failed:', error);
            }
        }
        /**
         * Manual cache cleanup
         */
        async cleanupCache(options) {
            const { removeExpired = true, removeFailed = true, olderThanDays = 7 } = options || {};
            let expiredRemoved = 0;
            let failedRemoved = 0;
            // Remove expired entries
            if (removeExpired) {
                const expiredResult = await this.urlCacheRepository
                    .createQueryBuilder()
                    .delete()
                    .where('expiresAt < :now', { now: new Date() })
                    .execute();
                expiredRemoved = expiredResult.affected || 0;
            }
            // Remove old failed entries
            if (removeFailed) {
                const cutoffDate = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
                const failedResult = await this.urlCacheRepository
                    .createQueryBuilder()
                    .delete()
                    .where('processingStatus = :status', { status: chat_url_cache_entity_1.UrlProcessingStatus.FAILED })
                    .andWhere('createdAt < :cutoff', { cutoff: cutoffDate })
                    .execute();
                failedRemoved = failedResult.affected || 0;
            }
            // Enforce cache size limit
            const totalEntries = await this.urlCacheRepository.count();
            let sizeLimitRemoved = 0;
            if (totalEntries > this.MAX_CACHE_SIZE) {
                const excessCount = totalEntries - this.MAX_CACHE_SIZE;
                const oldestEntries = await this.urlCacheRepository
                    .createQueryBuilder('cache')
                    .orderBy('cache.createdAt', 'ASC')
                    .limit(excessCount)
                    .getMany();
                if (oldestEntries.length > 0) {
                    const idsToRemove = oldestEntries.map(entry => entry.id);
                    const sizeResult = await this.urlCacheRepository
                        .createQueryBuilder()
                        .delete()
                        .whereInIds(idsToRemove)
                        .execute();
                    sizeLimitRemoved = sizeResult.affected || 0;
                }
            }
            const totalRemoved = expiredRemoved + failedRemoved + sizeLimitRemoved;
            const remainingEntries = await this.urlCacheRepository.count();
            return {
                expiredRemoved,
                failedRemoved: failedRemoved + sizeLimitRemoved,
                totalRemoved,
                remainingEntries,
            };
        }
        /**
         * Get comprehensive cache metrics
         */
        async getCacheMetrics() {
            // Basic counts
            const [totalEntries, expiredEntries, completedEntries, failedEntries, pendingEntries, processingEntries] = await Promise.all([
                this.urlCacheRepository.count(),
                this.urlCacheRepository.count({ where: { expiresAt: (0, typeorm_1.LessThan)(new Date()) } }),
                this.urlCacheRepository.count({ where: { processingStatus: chat_url_cache_entity_1.UrlProcessingStatus.COMPLETED } }),
                this.urlCacheRepository.count({ where: { processingStatus: chat_url_cache_entity_1.UrlProcessingStatus.FAILED } }),
                this.urlCacheRepository.count({ where: { processingStatus: chat_url_cache_entity_1.UrlProcessingStatus.PENDING } }),
                this.urlCacheRepository.count({ where: { processingStatus: chat_url_cache_entity_1.UrlProcessingStatus.PROCESSING } }),
            ]);
            // Calculate hit/miss rates
            const totalRequests = this.cacheHits + this.cacheMisses;
            const hitRate = totalRequests > 0 ? (this.cacheHits / totalRequests) * 100 : 0;
            const missRate = totalRequests > 0 ? (this.cacheMisses / totalRequests) * 100 : 0;
            // Average content size
            const avgSizeResult = await this.urlCacheRepository
                .createQueryBuilder('cache')
                .select('AVG(LENGTH(cache.content))', 'avgSize')
                .where('cache.content IS NOT NULL')
                .getRawOne();
            const averageContentSize = Math.round(avgSizeResult?.avgSize || 0);
            // Top domains
            const topDomainsResult = await this.urlCacheRepository
                .createQueryBuilder('cache')
                .select('SUBSTRING_INDEX(SUBSTRING_INDEX(cache.originalUrl, "://", -1), "/", 1)', 'domain')
                .addSelect('COUNT(*)', 'count')
                .groupBy('domain')
                .orderBy('count', 'DESC')
                .limit(10)
                .getRawMany();
            const topDomains = topDomainsResult.map(row => ({
                domain: row.domain,
                count: parseInt(row.count, 10),
            }));
            // Processing status distribution
            const processingStatusDistribution = {
                [chat_url_cache_entity_1.UrlProcessingStatus.COMPLETED]: completedEntries,
                [chat_url_cache_entity_1.UrlProcessingStatus.FAILED]: failedEntries,
                [chat_url_cache_entity_1.UrlProcessingStatus.PENDING]: pendingEntries,
                [chat_url_cache_entity_1.UrlProcessingStatus.PROCESSING]: processingEntries,
            };
            return {
                totalEntries,
                hitRate: Math.round(hitRate * 100) / 100,
                missRate: Math.round(missRate * 100) / 100,
                expiredEntries,
                failedEntries,
                averageContentSize,
                topDomains,
                processingStatusDistribution,
            };
        }
        /**
         * Reset cache metrics
         */
        resetMetrics() {
            this.cacheHits = 0;
            this.cacheMisses = 0;
            this.lastMetricsReset = Date.now();
            this.logger.log('Cache metrics reset');
        }
        /**
         * Get cache entries with pagination
         */
        async getCacheEntries(options) {
            const { page = 1, limit = 50, status, domain, sortBy = 'createdAt', sortOrder = 'DESC' } = options || {};
            const queryBuilder = this.urlCacheRepository.createQueryBuilder('cache');
            // Apply filters
            if (status) {
                queryBuilder.where('cache.processingStatus = :status', { status });
            }
            if (domain) {
                queryBuilder.andWhere('cache.originalUrl LIKE :domain', { domain: `%${domain}%` });
            }
            // Apply sorting
            queryBuilder.orderBy(`cache.${sortBy}`, sortOrder);
            // Apply pagination
            const offset = (page - 1) * limit;
            queryBuilder.skip(offset).take(limit);
            const [entries, total] = await queryBuilder.getManyAndCount();
            const totalPages = Math.ceil(total / limit);
            return {
                entries,
                total,
                page,
                limit,
                totalPages,
            };
        }
        /**
         * Bulk update cache entries
         */
        async bulkUpdateStatus(urlHashes, status) {
            const result = await this.urlCacheRepository
                .createQueryBuilder()
                .update()
                .set({ processingStatus: status })
                .whereInIds(urlHashes)
                .execute();
            return result.affected || 0;
        }
        /**
         * Generate URL hash for deduplication
         */
        generateUrlHash(url) {
            // Normalize URL before hashing
            try {
                const urlObj = new URL(url);
                // Remove fragment and normalize
                urlObj.hash = '';
                const normalizedUrl = urlObj.toString().toLowerCase();
                return crypto.createHash('sha256').update(normalizedUrl).digest('hex');
            }
            catch {
                // Fallback for invalid URLs
                return crypto.createHash('sha256').update(url.toLowerCase()).digest('hex');
            }
        }
        /**
         * Preload cache for common URLs
         */
        async preloadUrls(urls) {
            let processed = 0;
            let failed = 0;
            let alreadyCached = 0;
            for (const url of urls) {
                try {
                    const exists = await this.isCached(url);
                    if (exists) {
                        alreadyCached++;
                        continue;
                    }
                    // Create pending entry for processing
                    await this.setCachedUrl(url, {
                        processingStatus: chat_url_cache_entity_1.UrlProcessingStatus.PENDING,
                    });
                    processed++;
                }
                catch (error) {
                    this.logger.error(`Failed to preload URL ${url}:`, error);
                    failed++;
                }
            }
            this.logger.log(`Preload completed: ${processed} queued, ${alreadyCached} already cached, ${failed} failed`);
            return { processed, failed, alreadyCached };
        }
    };
    return UrlCacheService = _classThis;
})();
exports.UrlCacheService = UrlCacheService;
//# sourceMappingURL=url-cache.service.js.map