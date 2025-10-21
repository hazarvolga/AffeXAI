"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeBaseService = void 0;
const common_1 = require("@nestjs/common");
let KnowledgeBaseService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var KnowledgeBaseService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            KnowledgeBaseService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        articleRepository;
        logger = new common_1.Logger(KnowledgeBaseService.name);
        constructor(articleRepository) {
            this.articleRepository = articleRepository;
        }
        /**
         * Create a new article
         */
        async createArticle(authorId, dto) {
            const slug = this.generateSlug(dto.title);
            const article = this.articleRepository.create({
                ...dto,
                authorId,
                slug,
                isPublished: dto.status === 'published',
                publishedAt: dto.status === 'published' ? new Date() : null,
            });
            await this.articleRepository.save(article);
            this.logger.log(`Created article: ${article.id} - ${article.title}`);
            return article;
        }
        /**
         * Update an article
         */
        async updateArticle(id, dto) {
            const article = await this.articleRepository.findOne({ where: { id } });
            if (!article) {
                throw new common_1.NotFoundException(`Article ${id} not found`);
            }
            // Update slug if title changed
            if (dto.title && dto.title !== article.title) {
                article.slug = this.generateSlug(dto.title);
            }
            // Update published status
            if (dto.status === 'published' && !article.isPublished) {
                article.isPublished = true;
                article.publishedAt = new Date();
            }
            else if (dto.status !== 'published') {
                article.isPublished = false;
            }
            Object.assign(article, dto);
            await this.articleRepository.save(article);
            this.logger.log(`Updated article: ${article.id}`);
            return article;
        }
        /**
         * Delete an article
         */
        async deleteArticle(id) {
            const result = await this.articleRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Article ${id} not found`);
            }
            this.logger.log(`Deleted article: ${id}`);
        }
        /**
         * Get article by ID
         */
        async getArticle(id) {
            const article = await this.articleRepository.findOne({
                where: { id },
                relations: ['author', 'category'],
            });
            if (!article) {
                throw new common_1.NotFoundException(`Article ${id} not found`);
            }
            return article;
        }
        /**
         * Get article by slug
         */
        async getArticleBySlug(slug) {
            const article = await this.articleRepository.findOne({
                where: { slug, isPublished: true },
                relations: ['author', 'category'],
            });
            if (!article) {
                throw new common_1.NotFoundException(`Article not found`);
            }
            // Increment view count
            article.viewCount++;
            await this.articleRepository.save(article);
            return article;
        }
        /**
         * Search articles
         */
        async searchArticles(filters) {
            const query = this.articleRepository.createQueryBuilder('article')
                .leftJoinAndSelect('article.author', 'author')
                .leftJoinAndSelect('article.category', 'category');
            // Search query
            if (filters.query) {
                query.andWhere('(article.title ILIKE :query OR article.content ILIKE :query OR article.summary ILIKE :query)', { query: `%${filters.query}%` });
            }
            // Category filter
            if (filters.categoryId) {
                query.andWhere('article.categoryId = :categoryId', {
                    categoryId: filters.categoryId,
                });
            }
            // Tags filter
            if (filters.tags && filters.tags.length > 0) {
                query.andWhere('article.tags && :tags', { tags: filters.tags });
            }
            // Status filter
            if (filters.status) {
                query.andWhere('article.status = :status', { status: filters.status });
            }
            else {
                // Default: only show published articles for public search
                query.andWhere('article.isPublished = :isPublished', {
                    isPublished: true,
                });
            }
            // Featured filter
            if (filters.isFeatured !== undefined) {
                query.andWhere('article.isFeatured = :isFeatured', {
                    isFeatured: filters.isFeatured,
                });
            }
            // Order by relevance and popularity
            query.orderBy('article.searchScore', 'DESC')
                .addOrderBy('article.viewCount', 'DESC')
                .addOrderBy('article.publishedAt', 'DESC');
            // Pagination
            const limit = filters.limit || 20;
            const offset = filters.offset || 0;
            query.take(limit).skip(offset);
            const [articles, total] = await query.getManyAndCount();
            return { articles, total };
        }
        /**
         * Get featured articles
         */
        async getFeaturedArticles(limit = 5) {
            return await this.articleRepository.find({
                where: { isFeatured: true, isPublished: true },
                relations: ['author', 'category'],
                order: { viewCount: 'DESC' },
                take: limit,
            });
        }
        /**
         * Get popular articles
         */
        async getPopularArticles(limit = 10) {
            return await this.articleRepository.find({
                where: { isPublished: true },
                relations: ['author', 'category'],
                order: { viewCount: 'DESC' },
                take: limit,
            });
        }
        /**
         * Get related articles
         */
        async getRelatedArticles(articleId, limit = 5) {
            const article = await this.getArticle(articleId);
            if (!article) {
                return [];
            }
            // Find articles with similar tags or same category
            const query = this.articleRepository
                .createQueryBuilder('article')
                .where('article.id != :articleId', { articleId })
                .andWhere('article.isPublished = :isPublished', { isPublished: true });
            if (article.tags && article.tags.length > 0) {
                query.andWhere('article.tags && :tags', { tags: article.tags });
            }
            else if (article.categoryId) {
                query.andWhere('article.categoryId = :categoryId', {
                    categoryId: article.categoryId,
                });
            }
            query
                .orderBy('article.viewCount', 'DESC')
                .take(limit);
            return await query.getMany();
        }
        /**
         * Mark article as helpful
         */
        async markHelpful(id, isHelpful) {
            const article = await this.getArticle(id);
            if (isHelpful) {
                article.helpfulCount++;
            }
            else {
                article.notHelpfulCount++;
            }
            // Update search score based on helpfulness
            const totalFeedback = article.helpfulCount + article.notHelpfulCount;
            if (totalFeedback > 0) {
                article.searchScore = Math.round((article.helpfulCount / totalFeedback) * 100);
            }
            await this.articleRepository.save(article);
            return article;
        }
        /**
         * Get article statistics
         */
        async getStatistics() {
            const [total, published, draft, archived] = await Promise.all([
                this.articleRepository.count(),
                this.articleRepository.count({ where: { status: 'published' } }),
                this.articleRepository.count({ where: { status: 'draft' } }),
                this.articleRepository.count({ where: { status: 'archived' } }),
            ]);
            const articles = await this.articleRepository.find();
            const totalViews = articles.reduce((sum, a) => sum + a.viewCount, 0);
            const totalHelpful = articles.reduce((sum, a) => sum + a.helpfulCount, 0);
            const totalFeedback = articles.reduce((sum, a) => sum + a.helpfulCount + a.notHelpfulCount, 0);
            const avgHelpfulness = totalFeedback > 0 ? Math.round((totalHelpful / totalFeedback) * 100) : 0;
            return {
                total,
                published,
                draft,
                archived,
                totalViews,
                avgHelpfulness,
            };
        }
        /**
         * Generate URL-friendly slug from title
         */
        generateSlug(title) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ]+/g, '-')
                .replace(/^-+|-+$/g, '');
            return `${slug}-${Date.now()}`;
        }
    };
    return KnowledgeBaseService = _classThis;
})();
exports.KnowledgeBaseService = KnowledgeBaseService;
//# sourceMappingURL=knowledge-base.service.js.map