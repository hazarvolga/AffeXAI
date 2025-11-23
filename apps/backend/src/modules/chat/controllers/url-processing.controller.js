"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlProcessingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
class ProcessUrlDto {
    url;
    forceRefresh;
}
class BulkProcessUrlsDto {
    urls;
    forceRefresh;
}
let UrlProcessingController = (() => {
    let _classDecorators = [(0, common_1.Controller)('chat/urls'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _processUrl_decorators;
    let _processBatchUrls_decorators;
    let _getCachedUrl_decorators;
    let _getCacheEntries_decorators;
    let _getCacheMetrics_decorators;
    let _cleanupCache_decorators;
    let _removeCacheByUrl_decorators;
    let _getCacheByDomain_decorators;
    let _preloadUrls_decorators;
    let _resetCacheMetrics_decorators;
    let _bulkUpdateStatus_decorators;
    var UrlProcessingController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _processUrl_decorators = [(0, common_1.Post)('process')];
            _processBatchUrls_decorators = [(0, common_1.Post)('process/batch')];
            _getCachedUrl_decorators = [(0, common_1.Get)('cache/:urlHash')];
            _getCacheEntries_decorators = [(0, common_1.Get)('cache')];
            _getCacheMetrics_decorators = [(0, common_1.Get)('cache/metrics')];
            _cleanupCache_decorators = [(0, common_1.Post)('cache/cleanup')];
            _removeCacheByUrl_decorators = [(0, common_1.Delete)('cache')];
            _getCacheByDomain_decorators = [(0, common_1.Get)('cache/domain/:domain')];
            _preloadUrls_decorators = [(0, common_1.Post)('cache/preload')];
            _resetCacheMetrics_decorators = [(0, common_1.Post)('cache/metrics/reset')];
            _bulkUpdateStatus_decorators = [(0, common_1.Post)('cache/bulk-update')];
            __esDecorate(this, null, _processUrl_decorators, { kind: "method", name: "processUrl", static: false, private: false, access: { has: obj => "processUrl" in obj, get: obj => obj.processUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _processBatchUrls_decorators, { kind: "method", name: "processBatchUrls", static: false, private: false, access: { has: obj => "processBatchUrls" in obj, get: obj => obj.processBatchUrls }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCachedUrl_decorators, { kind: "method", name: "getCachedUrl", static: false, private: false, access: { has: obj => "getCachedUrl" in obj, get: obj => obj.getCachedUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCacheEntries_decorators, { kind: "method", name: "getCacheEntries", static: false, private: false, access: { has: obj => "getCacheEntries" in obj, get: obj => obj.getCacheEntries }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCacheMetrics_decorators, { kind: "method", name: "getCacheMetrics", static: false, private: false, access: { has: obj => "getCacheMetrics" in obj, get: obj => obj.getCacheMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _cleanupCache_decorators, { kind: "method", name: "cleanupCache", static: false, private: false, access: { has: obj => "cleanupCache" in obj, get: obj => obj.cleanupCache }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _removeCacheByUrl_decorators, { kind: "method", name: "removeCacheByUrl", static: false, private: false, access: { has: obj => "removeCacheByUrl" in obj, get: obj => obj.removeCacheByUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCacheByDomain_decorators, { kind: "method", name: "getCacheByDomain", static: false, private: false, access: { has: obj => "getCacheByDomain" in obj, get: obj => obj.getCacheByDomain }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _preloadUrls_decorators, { kind: "method", name: "preloadUrls", static: false, private: false, access: { has: obj => "preloadUrls" in obj, get: obj => obj.preloadUrls }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _resetCacheMetrics_decorators, { kind: "method", name: "resetCacheMetrics", static: false, private: false, access: { has: obj => "resetCacheMetrics" in obj, get: obj => obj.resetCacheMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _bulkUpdateStatus_decorators, { kind: "method", name: "bulkUpdateStatus", static: false, private: false, access: { has: obj => "bulkUpdateStatus" in obj, get: obj => obj.bulkUpdateStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UrlProcessingController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        urlProcessorService = __runInitializers(this, _instanceExtraInitializers);
        urlCacheService;
        constructor(urlProcessorService, urlCacheService) {
            this.urlProcessorService = urlProcessorService;
            this.urlCacheService = urlCacheService;
        }
        /**
         * Process a single URL and extract content
         */
        async processUrl(dto) {
            try {
                // If force refresh, remove from cache first
                if (dto.forceRefresh) {
                    await this.urlCacheService.removeCacheByUrl(dto.url);
                }
                const result = await this.urlProcessorService.processUrl(dto.url);
                if (!result.success) {
                    throw new common_1.HttpException({ message: 'URL processing failed', error: result.error }, common_1.HttpStatus.BAD_REQUEST);
                }
                return {
                    success: true,
                    cached: result.cached,
                    data: result.data,
                };
            }
            catch (error) {
                throw new common_1.HttpException({ message: 'URL processing failed', error: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        /**
         * Process multiple URLs in batch
         */
        async processBatchUrls(dto) {
            const results = [];
            const errors = [];
            for (const url of dto.urls) {
                try {
                    // If force refresh, remove from cache first
                    if (dto.forceRefresh) {
                        await this.urlCacheService.removeCacheByUrl(url);
                    }
                    const result = await this.urlProcessorService.processUrl(url);
                    results.push({
                        url,
                        success: result.success,
                        cached: result.cached,
                        data: result.data,
                        error: result.error,
                    });
                }
                catch (error) {
                    errors.push({
                        url,
                        error: error.message,
                    });
                }
            }
            return {
                processed: results.length,
                errorCount: errors.length,
                results,
                errors,
            };
        }
        /**
         * Get cached URL data
         */
        async getCachedUrl(urlHash) {
            const cached = await this.urlCacheService.getCachedUrl(urlHash);
            if (!cached) {
                throw new common_1.HttpException('URL not found in cache', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                data: cached,
            };
        }
        /**
         * Get cache entries with pagination and filtering
         */
        async getCacheEntries(page = 1, limit = 50, status, domain, sortBy = 'createdAt', sortOrder = 'DESC') {
            const result = await this.urlCacheService.getCacheEntries({
                page: parseInt(page.toString(), 10),
                limit: Math.min(parseInt(limit.toString(), 10), 100), // Max 100 per page
                status,
                domain,
                sortBy,
                sortOrder,
            });
            return {
                success: true,
                ...result,
            };
        }
        /**
         * Get cache metrics and statistics
         */
        async getCacheMetrics() {
            const metrics = await this.urlCacheService.getCacheMetrics();
            return {
                success: true,
                metrics,
            };
        }
        /**
         * Clean up expired and failed cache entries
         */
        async cleanupCache(options) {
            const result = await this.urlCacheService.cleanupCache(options);
            return {
                success: true,
                cleanup: result,
            };
        }
        /**
         * Remove specific URL from cache
         */
        async removeCacheByUrl(url) {
            const removed = await this.urlCacheService.removeCacheByUrl(url);
            if (!removed) {
                throw new common_1.HttpException('URL not found in cache', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: 'URL removed from cache',
            };
        }
        /**
         * Get cache entries for a specific domain
         */
        async getCacheByDomain(domain, limit = 50) {
            const entries = await this.urlCacheService.getCacheByDomain(domain, Math.min(parseInt(limit.toString(), 10), 100));
            return {
                success: true,
                domain,
                count: entries.length,
                entries,
            };
        }
        /**
         * Preload URLs for caching
         */
        async preloadUrls(urls) {
            if (!Array.isArray(urls) || urls.length === 0) {
                throw new common_1.HttpException('URLs array is required', common_1.HttpStatus.BAD_REQUEST);
            }
            if (urls.length > 100) {
                throw new common_1.HttpException('Maximum 100 URLs allowed per batch', common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.urlCacheService.preloadUrls(urls);
            return {
                success: true,
                preload: result,
            };
        }
        /**
         * Reset cache metrics
         */
        async resetCacheMetrics() {
            this.urlCacheService.resetMetrics();
            return {
                success: true,
                message: 'Cache metrics reset',
            };
        }
        /**
         * Bulk update cache entry status
         */
        async bulkUpdateStatus(dto) {
            if (!Array.isArray(dto.urlHashes) || dto.urlHashes.length === 0) {
                throw new common_1.HttpException('URL hashes array is required', common_1.HttpStatus.BAD_REQUEST);
            }
            const updated = await this.urlCacheService.bulkUpdateStatus(dto.urlHashes, dto.status);
            return {
                success: true,
                updated,
                message: `${updated} entries updated`,
            };
        }
    };
    return UrlProcessingController = _classThis;
})();
exports.UrlProcessingController = UrlProcessingController;
//# sourceMappingURL=url-processing.controller.js.map