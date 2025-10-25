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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlProcessorService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer = __importStar(require("puppeteer"));
const robots_parser_1 = __importDefault(require("robots-parser"));
const cheerio = __importStar(require("cheerio"));
const crypto = __importStar(require("crypto"));
const chat_url_cache_entity_1 = require("../entities/chat-url-cache.entity");
const url_validator_util_1 = require("../utils/url-validator.util");
let UrlProcessorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UrlProcessorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UrlProcessorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        urlCacheRepository;
        logger = new common_1.Logger(UrlProcessorService.name);
        browser = null;
        rateLimitMap = new Map();
        RATE_LIMIT_DELAY = 1000; // 1 second between requests per domain
        CACHE_EXPIRY_HOURS = 24;
        MAX_CONTENT_LENGTH = 50000;
        constructor(urlCacheRepository) {
            this.urlCacheRepository = urlCacheRepository;
        }
        async onModuleInit() {
            // Initialize browser instance
            try {
                this.browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                });
                this.logger.log('Puppeteer browser initialized');
            }
            catch (error) {
                this.logger.error('Failed to initialize Puppeteer browser', error);
            }
        }
        async onModuleDestroy() {
            if (this.browser) {
                await this.browser.close();
                this.logger.log('Puppeteer browser closed');
            }
        }
        /**
         * Process a URL and extract content with caching
         */
        async processUrl(url) {
            try {
                // Validate URL
                const validation = url_validator_util_1.UrlValidator.validate(url);
                if (!validation.isValid) {
                    return { success: false, cached: false, error: validation.error };
                }
                // Use normalized URL for processing
                url = validation.normalizedUrl;
                const urlHash = this.generateUrlHash(url);
                // Check cache first
                const cached = await this.getCachedUrl(urlHash);
                if (cached && !cached.isExpired && cached.isProcessed) {
                    this.logger.debug(`Cache hit for URL: ${url}`);
                    return {
                        success: true,
                        cached: true,
                        data: {
                            title: cached.title || '',
                            content: cached.content || '',
                            metadata: cached.metadata,
                        },
                    };
                }
                // Check robots.txt compliance
                const robotsAllowed = await this.checkRobotsCompliance(url);
                if (!robotsAllowed) {
                    return { success: false, cached: false, error: 'Robots.txt disallows crawling' };
                }
                // Apply rate limiting
                await this.applyRateLimit(url);
                // Create or update cache entry with pending status
                let cacheEntry = cached || new chat_url_cache_entity_1.ChatUrlCache();
                cacheEntry.urlHash = urlHash;
                cacheEntry.originalUrl = url;
                cacheEntry.processingStatus = chat_url_cache_entity_1.UrlProcessingStatus.PROCESSING;
                cacheEntry.expiresAt = new Date(Date.now() + this.CACHE_EXPIRY_HOURS * 60 * 60 * 1000);
                cacheEntry.metadata = { ...cacheEntry.metadata, robotsAllowed };
                await this.urlCacheRepository.save(cacheEntry);
                // Extract content
                const extractionResult = await this.extractContent(url);
                // Update cache with results
                cacheEntry.title = extractionResult.title;
                cacheEntry.content = extractionResult.content;
                cacheEntry.metadata = {
                    ...cacheEntry.metadata,
                    ...extractionResult.metadata,
                    extractionMethod: extractionResult.method,
                };
                cacheEntry.processingStatus = extractionResult.success
                    ? chat_url_cache_entity_1.UrlProcessingStatus.COMPLETED
                    : chat_url_cache_entity_1.UrlProcessingStatus.FAILED;
                if (!extractionResult.success) {
                    cacheEntry.metadata.processingError = extractionResult.error;
                }
                await this.urlCacheRepository.save(cacheEntry);
                if (extractionResult.success) {
                    return {
                        success: true,
                        cached: false,
                        data: {
                            title: cacheEntry.title || '',
                            content: cacheEntry.content || '',
                            metadata: cacheEntry.metadata,
                        },
                    };
                }
                else {
                    return { success: false, cached: false, error: extractionResult.error };
                }
            }
            catch (error) {
                this.logger.error(`Error processing URL ${url}:`, error);
                return { success: false, cached: false, error: error.message };
            }
        }
        /**
         * Extract content from URL using multiple methods
         */
        async extractContent(url) {
            // Try Puppeteer first for dynamic content
            if (this.browser) {
                try {
                    const puppeteerResult = await this.extractWithPuppeteer(url);
                    if (puppeteerResult.success) {
                        return { ...puppeteerResult, method: 'puppeteer' };
                    }
                }
                catch (error) {
                    this.logger.warn(`Puppeteer extraction failed for ${url}:`, error.message);
                }
            }
            // Fallback to simple HTTP request with Cheerio
            try {
                const cheerioResult = await this.extractWithCheerio(url);
                return { ...cheerioResult, method: 'cheerio' };
            }
            catch (error) {
                this.logger.error(`All extraction methods failed for ${url}:`, error);
                return { success: false, error: error.message };
            }
        }
        /**
         * Extract content using Puppeteer for dynamic content
         */
        async extractWithPuppeteer(url) {
            if (!this.browser) {
                throw new Error('Browser not initialized');
            }
            const page = await this.browser.newPage();
            try {
                // Set user agent and viewport
                await page.setUserAgent('Mozilla/5.0 (compatible; AI-Support-Bot/1.0)');
                await page.setViewport({ width: 1280, height: 720 });
                // Navigate with timeout
                const response = await page.goto(url, {
                    waitUntil: 'networkidle2',
                    timeout: 30000
                });
                if (!response || !response.ok()) {
                    throw new Error(`HTTP ${response?.status()}: ${response?.statusText()}`);
                }
                // Extract content
                const result = await page.evaluate(() => {
                    // Remove script and style elements
                    const scripts = document.querySelectorAll('script, style, nav, header, footer, aside');
                    scripts.forEach(el => el.remove());
                    // Get title
                    const title = document.title ||
                        document.querySelector('h1')?.textContent ||
                        document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
                    // Get main content
                    const contentSelectors = [
                        'main', 'article', '[role="main"]', '.content', '.post-content',
                        '.entry-content', '.article-content', '.page-content'
                    ];
                    let content = '';
                    for (const selector of contentSelectors) {
                        const element = document.querySelector(selector);
                        if (element) {
                            content = element.textContent || '';
                            break;
                        }
                    }
                    // Fallback to body if no main content found
                    if (!content) {
                        content = document.body?.textContent || '';
                    }
                    // Clean up content
                    content = content.replace(/\s+/g, ' ').trim();
                    // Extract metadata
                    const getMetaContent = (name) => document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)?.getAttribute('content') || '';
                    return {
                        title: title.trim(),
                        content,
                        metadata: {
                            description: getMetaContent('description') || getMetaContent('og:description'),
                            author: getMetaContent('author'),
                            publishedDate: getMetaContent('article:published_time') || getMetaContent('datePublished'),
                            imageUrl: getMetaContent('og:image'),
                            siteName: getMetaContent('og:site_name'),
                            contentType: getMetaContent('og:type'),
                            wordCount: content.split(' ').length,
                            statusCode: response?.status(),
                        }
                    };
                });
                // Limit content length
                if (result.content.length > this.MAX_CONTENT_LENGTH) {
                    result.content = result.content.substring(0, this.MAX_CONTENT_LENGTH) + '...';
                }
                return { success: true, ...result };
            }
            finally {
                await page.close();
            }
        }
        /**
         * Extract content using Cheerio for static content
         */
        async extractWithCheerio(url) {
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; AI-Support-Bot/1.0)',
                },
                signal: AbortSignal.timeout(30000),
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const html = await response.text();
            const $ = cheerio.load(html);
            // Remove unwanted elements
            $('script, style, nav, header, footer, aside').remove();
            // Extract title
            const title = $('title').text() ||
                $('h1').first().text() ||
                $('meta[property="og:title"]').attr('content') || '';
            // Extract main content
            const contentSelectors = [
                'main', 'article', '[role="main"]', '.content', '.post-content',
                '.entry-content', '.article-content', '.page-content'
            ];
            let content = '';
            for (const selector of contentSelectors) {
                const element = $(selector);
                if (element.length) {
                    content = element.text();
                    break;
                }
            }
            // Fallback to body
            if (!content) {
                content = $('body').text();
            }
            // Clean up content
            content = content.replace(/\s+/g, ' ').trim();
            // Limit content length
            if (content.length > this.MAX_CONTENT_LENGTH) {
                content = content.substring(0, this.MAX_CONTENT_LENGTH) + '...';
            }
            // Extract metadata
            const getMetaContent = (name) => $(`meta[name="${name}"], meta[property="${name}"]`).attr('content') || '';
            const metadata = {
                description: getMetaContent('description') || getMetaContent('og:description'),
                author: getMetaContent('author'),
                publishedDate: getMetaContent('article:published_time') || getMetaContent('datePublished'),
                imageUrl: getMetaContent('og:image'),
                siteName: getMetaContent('og:site_name'),
                contentType: getMetaContent('og:type'),
                wordCount: content.split(' ').length,
                statusCode: response.status,
            };
            return {
                success: true,
                title: title.trim(),
                content,
                metadata,
            };
        }
        /**
         * Check robots.txt compliance
         */
        async checkRobotsCompliance(url) {
            try {
                const urlObj = new URL(url);
                const robotsUrl = `${urlObj.protocol}//${urlObj.host}/robots.txt`;
                const response = await fetch(robotsUrl, {
                    signal: AbortSignal.timeout(10000)
                });
                if (!response.ok) {
                    // If robots.txt doesn't exist, assume crawling is allowed
                    return true;
                }
                const robotsTxt = await response.text();
                const robots = (0, robots_parser_1.default)(robotsUrl, robotsTxt);
                return robots.isAllowed(url, 'AI-Support-Bot') !== false;
            }
            catch (error) {
                this.logger.warn(`Could not check robots.txt for ${url}:`, error.message);
                // If we can't check robots.txt, assume it's allowed
                return true;
            }
        }
        /**
         * Apply rate limiting per domain
         */
        async applyRateLimit(url) {
            try {
                const domain = new URL(url).hostname;
                const lastRequest = this.rateLimitMap.get(domain) || 0;
                const timeSinceLastRequest = Date.now() - lastRequest;
                if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
                    const delay = this.RATE_LIMIT_DELAY - timeSinceLastRequest;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
                this.rateLimitMap.set(domain, Date.now());
            }
            catch (error) {
                // If URL parsing fails, skip rate limiting
                this.logger.warn(`Could not apply rate limiting for ${url}:`, error.message);
            }
        }
        /**
         * Get cached URL entry
         */
        async getCachedUrl(urlHash) {
            return await this.urlCacheRepository.findOne({ where: { urlHash } });
        }
        /**
         * Generate hash for URL
         */
        generateUrlHash(url) {
            return crypto.createHash('sha256').update(url).digest('hex');
        }
        /**
         * Clean up expired cache entries
         */
        async cleanupExpiredCache() {
            const result = await this.urlCacheRepository
                .createQueryBuilder()
                .delete()
                .where('expiresAt < :now', { now: new Date() })
                .execute();
            this.logger.log(`Cleaned up ${result.affected} expired cache entries`);
            return result.affected || 0;
        }
        /**
         * Get cache statistics
         */
        async getCacheStats() {
            const [total, completed, failed, pending, expired] = await Promise.all([
                this.urlCacheRepository.count(),
                this.urlCacheRepository.count({ where: { processingStatus: chat_url_cache_entity_1.UrlProcessingStatus.COMPLETED } }),
                this.urlCacheRepository.count({ where: { processingStatus: chat_url_cache_entity_1.UrlProcessingStatus.FAILED } }),
                this.urlCacheRepository.count({ where: { processingStatus: chat_url_cache_entity_1.UrlProcessingStatus.PENDING } }),
                this.urlCacheRepository
                    .createQueryBuilder()
                    .where('expiresAt < :now', { now: new Date() })
                    .getCount(),
            ]);
            return { total, completed, failed, pending, expired };
        }
    };
    return UrlProcessorService = _classThis;
})();
exports.UrlProcessorService = UrlProcessorService;
//# sourceMappingURL=url-processor.service.js.map