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
exports.CompanyKnowledgeSource = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const knowledge_source_type_enum_1 = require("./enums/knowledge-source-type.enum");
const knowledge_source_status_enum_1 = require("./enums/knowledge-source-status.enum");
let CompanyKnowledgeSource = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('company_knowledge_sources'), (0, typeorm_1.Index)(['status', 'createdAt']), (0, typeorm_1.Index)(['sourceType']), (0, typeorm_1.Index)(['uploadedById'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _sourceType_decorators;
    let _sourceType_initializers = [];
    let _sourceType_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _filePath_decorators;
    let _filePath_initializers = [];
    let _filePath_extraInitializers = [];
    let _fileName_decorators;
    let _fileName_initializers = [];
    let _fileName_extraInitializers = [];
    let _fileType_decorators;
    let _fileType_initializers = [];
    let _fileType_extraInitializers = [];
    let _fileSize_decorators;
    let _fileSize_initializers = [];
    let _fileSize_extraInitializers = [];
    let _url_decorators;
    let _url_initializers = [];
    let _url_extraInitializers = [];
    let _lastScrapedAt_decorators;
    let _lastScrapedAt_initializers = [];
    let _lastScrapedAt_extraInitializers = [];
    let _scrapeFailCount_decorators;
    let _scrapeFailCount_initializers = [];
    let _scrapeFailCount_extraInitializers = [];
    let _extractedContent_decorators;
    let _extractedContent_initializers = [];
    let _extractedContent_extraInitializers = [];
    let _summary_decorators;
    let _summary_initializers = [];
    let _summary_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    let _keywords_decorators;
    let _keywords_initializers = [];
    let _keywords_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _usageCount_decorators;
    let _usageCount_initializers = [];
    let _usageCount_extraInitializers = [];
    let _helpfulCount_decorators;
    let _helpfulCount_initializers = [];
    let _helpfulCount_extraInitializers = [];
    let _averageRelevanceScore_decorators;
    let _averageRelevanceScore_initializers = [];
    let _averageRelevanceScore_extraInitializers = [];
    let _enableForFaqLearning_decorators;
    let _enableForFaqLearning_initializers = [];
    let _enableForFaqLearning_extraInitializers = [];
    let _enableForChat_decorators;
    let _enableForChat_initializers = [];
    let _enableForChat_extraInitializers = [];
    let _uploadedById_decorators;
    let _uploadedById_initializers = [];
    let _uploadedById_extraInitializers = [];
    let _uploadedBy_decorators;
    let _uploadedBy_initializers = [];
    let _uploadedBy_extraInitializers = [];
    let _archivedAt_decorators;
    let _archivedAt_initializers = [];
    let _archivedAt_extraInitializers = [];
    let _archivedById_decorators;
    let _archivedById_initializers = [];
    let _archivedById_extraInitializers = [];
    let _archivedBy_decorators;
    let _archivedBy_initializers = [];
    let _archivedBy_extraInitializers = [];
    var CompanyKnowledgeSource = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _title_decorators = [(0, typeorm_1.Column)({ length: 500 })];
            _description_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
            _sourceType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: knowledge_source_type_enum_1.KnowledgeSourceType,
                })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: knowledge_source_status_enum_1.KnowledgeSourceStatus,
                    default: knowledge_source_status_enum_1.KnowledgeSourceStatus.PENDING,
                })];
            _filePath_decorators = [(0, typeorm_1.Column)({ length: 1000, nullable: true })];
            _fileName_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true })];
            _fileType_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true })];
            _fileSize_decorators = [(0, typeorm_1.Column)('bigint', { nullable: true })];
            _url_decorators = [(0, typeorm_1.Column)({ length: 2000, nullable: true })];
            _lastScrapedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _scrapeFailCount_decorators = [(0, typeorm_1.Column)('int', { default: 0 })];
            _extractedContent_decorators = [(0, typeorm_1.Column)('text')];
            _summary_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
            _tags_decorators = [(0, typeorm_1.Column)('simple-array', { nullable: true })];
            _keywords_decorators = [(0, typeorm_1.Column)('simple-array', { nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { default: {} })];
            _usageCount_decorators = [(0, typeorm_1.Column)('int', { default: 0 })];
            _helpfulCount_decorators = [(0, typeorm_1.Column)('int', { default: 0 })];
            _averageRelevanceScore_decorators = [(0, typeorm_1.Column)('float', { default: 0.0 })];
            _enableForFaqLearning_decorators = [(0, typeorm_1.Column)('boolean', { default: true })];
            _enableForChat_decorators = [(0, typeorm_1.Column)('boolean', { default: true })];
            _uploadedById_decorators = [(0, typeorm_1.Column)('uuid')];
            _uploadedBy_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User), (0, typeorm_1.JoinColumn)({ name: 'uploadedById' })];
            _archivedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _archivedById_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _archivedBy_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'archivedById' })];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _sourceType_decorators, { kind: "field", name: "sourceType", static: false, private: false, access: { has: obj => "sourceType" in obj, get: obj => obj.sourceType, set: (obj, value) => { obj.sourceType = value; } }, metadata: _metadata }, _sourceType_initializers, _sourceType_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _filePath_decorators, { kind: "field", name: "filePath", static: false, private: false, access: { has: obj => "filePath" in obj, get: obj => obj.filePath, set: (obj, value) => { obj.filePath = value; } }, metadata: _metadata }, _filePath_initializers, _filePath_extraInitializers);
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: obj => "fileName" in obj, get: obj => obj.fileName, set: (obj, value) => { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _fileType_decorators, { kind: "field", name: "fileType", static: false, private: false, access: { has: obj => "fileType" in obj, get: obj => obj.fileType, set: (obj, value) => { obj.fileType = value; } }, metadata: _metadata }, _fileType_initializers, _fileType_extraInitializers);
            __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: obj => "fileSize" in obj, get: obj => obj.fileSize, set: (obj, value) => { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url, set: (obj, value) => { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _lastScrapedAt_decorators, { kind: "field", name: "lastScrapedAt", static: false, private: false, access: { has: obj => "lastScrapedAt" in obj, get: obj => obj.lastScrapedAt, set: (obj, value) => { obj.lastScrapedAt = value; } }, metadata: _metadata }, _lastScrapedAt_initializers, _lastScrapedAt_extraInitializers);
            __esDecorate(null, null, _scrapeFailCount_decorators, { kind: "field", name: "scrapeFailCount", static: false, private: false, access: { has: obj => "scrapeFailCount" in obj, get: obj => obj.scrapeFailCount, set: (obj, value) => { obj.scrapeFailCount = value; } }, metadata: _metadata }, _scrapeFailCount_initializers, _scrapeFailCount_extraInitializers);
            __esDecorate(null, null, _extractedContent_decorators, { kind: "field", name: "extractedContent", static: false, private: false, access: { has: obj => "extractedContent" in obj, get: obj => obj.extractedContent, set: (obj, value) => { obj.extractedContent = value; } }, metadata: _metadata }, _extractedContent_initializers, _extractedContent_extraInitializers);
            __esDecorate(null, null, _summary_decorators, { kind: "field", name: "summary", static: false, private: false, access: { has: obj => "summary" in obj, get: obj => obj.summary, set: (obj, value) => { obj.summary = value; } }, metadata: _metadata }, _summary_initializers, _summary_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _keywords_decorators, { kind: "field", name: "keywords", static: false, private: false, access: { has: obj => "keywords" in obj, get: obj => obj.keywords, set: (obj, value) => { obj.keywords = value; } }, metadata: _metadata }, _keywords_initializers, _keywords_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _usageCount_decorators, { kind: "field", name: "usageCount", static: false, private: false, access: { has: obj => "usageCount" in obj, get: obj => obj.usageCount, set: (obj, value) => { obj.usageCount = value; } }, metadata: _metadata }, _usageCount_initializers, _usageCount_extraInitializers);
            __esDecorate(null, null, _helpfulCount_decorators, { kind: "field", name: "helpfulCount", static: false, private: false, access: { has: obj => "helpfulCount" in obj, get: obj => obj.helpfulCount, set: (obj, value) => { obj.helpfulCount = value; } }, metadata: _metadata }, _helpfulCount_initializers, _helpfulCount_extraInitializers);
            __esDecorate(null, null, _averageRelevanceScore_decorators, { kind: "field", name: "averageRelevanceScore", static: false, private: false, access: { has: obj => "averageRelevanceScore" in obj, get: obj => obj.averageRelevanceScore, set: (obj, value) => { obj.averageRelevanceScore = value; } }, metadata: _metadata }, _averageRelevanceScore_initializers, _averageRelevanceScore_extraInitializers);
            __esDecorate(null, null, _enableForFaqLearning_decorators, { kind: "field", name: "enableForFaqLearning", static: false, private: false, access: { has: obj => "enableForFaqLearning" in obj, get: obj => obj.enableForFaqLearning, set: (obj, value) => { obj.enableForFaqLearning = value; } }, metadata: _metadata }, _enableForFaqLearning_initializers, _enableForFaqLearning_extraInitializers);
            __esDecorate(null, null, _enableForChat_decorators, { kind: "field", name: "enableForChat", static: false, private: false, access: { has: obj => "enableForChat" in obj, get: obj => obj.enableForChat, set: (obj, value) => { obj.enableForChat = value; } }, metadata: _metadata }, _enableForChat_initializers, _enableForChat_extraInitializers);
            __esDecorate(null, null, _uploadedById_decorators, { kind: "field", name: "uploadedById", static: false, private: false, access: { has: obj => "uploadedById" in obj, get: obj => obj.uploadedById, set: (obj, value) => { obj.uploadedById = value; } }, metadata: _metadata }, _uploadedById_initializers, _uploadedById_extraInitializers);
            __esDecorate(null, null, _uploadedBy_decorators, { kind: "field", name: "uploadedBy", static: false, private: false, access: { has: obj => "uploadedBy" in obj, get: obj => obj.uploadedBy, set: (obj, value) => { obj.uploadedBy = value; } }, metadata: _metadata }, _uploadedBy_initializers, _uploadedBy_extraInitializers);
            __esDecorate(null, null, _archivedAt_decorators, { kind: "field", name: "archivedAt", static: false, private: false, access: { has: obj => "archivedAt" in obj, get: obj => obj.archivedAt, set: (obj, value) => { obj.archivedAt = value; } }, metadata: _metadata }, _archivedAt_initializers, _archivedAt_extraInitializers);
            __esDecorate(null, null, _archivedById_decorators, { kind: "field", name: "archivedById", static: false, private: false, access: { has: obj => "archivedById" in obj, get: obj => obj.archivedById, set: (obj, value) => { obj.archivedById = value; } }, metadata: _metadata }, _archivedById_initializers, _archivedById_extraInitializers);
            __esDecorate(null, null, _archivedBy_decorators, { kind: "field", name: "archivedBy", static: false, private: false, access: { has: obj => "archivedBy" in obj, get: obj => obj.archivedBy, set: (obj, value) => { obj.archivedBy = value; } }, metadata: _metadata }, _archivedBy_initializers, _archivedBy_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CompanyKnowledgeSource = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        // ═══════════════════════════════════════════════════════════
        // BASIC INFORMATION
        // ═══════════════════════════════════════════════════════════
        title = __runInitializers(this, _title_initializers, void 0);
        description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        sourceType = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _sourceType_initializers, void 0));
        status = (__runInitializers(this, _sourceType_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        // ═══════════════════════════════════════════════════════════
        // DOCUMENT FIELDS (for sourceType='document')
        // ═══════════════════════════════════════════════════════════
        filePath = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _filePath_initializers, void 0)); // S3 or local file path
        fileName = (__runInitializers(this, _filePath_extraInitializers), __runInitializers(this, _fileName_initializers, void 0));
        fileType = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _fileType_initializers, void 0)); // 'pdf', 'docx', 'xlsx', 'pptx', 'txt', 'md'
        fileSize = (__runInitializers(this, _fileType_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0)); // in bytes
        // ═══════════════════════════════════════════════════════════
        // URL FIELDS (for sourceType='url')
        // ═══════════════════════════════════════════════════════════
        url = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _url_initializers, void 0));
        lastScrapedAt = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _lastScrapedAt_initializers, void 0));
        scrapeFailCount = (__runInitializers(this, _lastScrapedAt_extraInitializers), __runInitializers(this, _scrapeFailCount_initializers, void 0));
        // ═══════════════════════════════════════════════════════════
        // CONTENT
        // ═══════════════════════════════════════════════════════════
        extractedContent = (__runInitializers(this, _scrapeFailCount_extraInitializers), __runInitializers(this, _extractedContent_initializers, void 0)); // Processed text content
        summary = (__runInitializers(this, _extractedContent_extraInitializers), __runInitializers(this, _summary_initializers, void 0)); // AI-generated summary (optional)
        tags = (__runInitializers(this, _summary_extraInitializers), __runInitializers(this, _tags_initializers, void 0)); // ['installation', 'api', 'troubleshooting']
        keywords = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _keywords_initializers, void 0)); // Auto-extracted keywords
        // Vector embedding for semantic search (future enhancement)
        // Requires PostgreSQL pgvector extension
        // @Column('vector', { nullable: true })
        // embedding: number[];
        // ═══════════════════════════════════════════════════════════
        // METADATA
        // ═══════════════════════════════════════════════════════════
        metadata = (__runInitializers(this, _keywords_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        // ═══════════════════════════════════════════════════════════
        // USAGE TRACKING
        // ═══════════════════════════════════════════════════════════
        usageCount = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _usageCount_initializers, void 0)); // How many times used in AI responses
        helpfulCount = (__runInitializers(this, _usageCount_extraInitializers), __runInitializers(this, _helpfulCount_initializers, void 0)); // Customer feedback (helpful button)
        averageRelevanceScore = (__runInitializers(this, _helpfulCount_extraInitializers), __runInitializers(this, _averageRelevanceScore_initializers, void 0)); // 0.0 - 1.0
        // ═══════════════════════════════════════════════════════════
        // FEATURE FLAGS
        // ═══════════════════════════════════════════════════════════
        enableForFaqLearning = (__runInitializers(this, _averageRelevanceScore_extraInitializers), __runInitializers(this, _enableForFaqLearning_initializers, void 0)); // Use in FAQ learning?
        enableForChat = (__runInitializers(this, _enableForFaqLearning_extraInitializers), __runInitializers(this, _enableForChat_initializers, void 0)); // Use in chat context?
        // ═══════════════════════════════════════════════════════════
        // RELATIONS
        // ═══════════════════════════════════════════════════════════
        uploadedById = (__runInitializers(this, _enableForChat_extraInitializers), __runInitializers(this, _uploadedById_initializers, void 0));
        uploadedBy = (__runInitializers(this, _uploadedById_extraInitializers), __runInitializers(this, _uploadedBy_initializers, void 0));
        // ═══════════════════════════════════════════════════════════
        // ARCHIVING (Soft Delete Alternative)
        // ═══════════════════════════════════════════════════════════
        archivedAt = (__runInitializers(this, _uploadedBy_extraInitializers), __runInitializers(this, _archivedAt_initializers, void 0));
        archivedById = (__runInitializers(this, _archivedAt_extraInitializers), __runInitializers(this, _archivedById_initializers, void 0));
        archivedBy = (__runInitializers(this, _archivedById_extraInitializers), __runInitializers(this, _archivedBy_initializers, void 0));
        // ═══════════════════════════════════════════════════════════
        // COMPUTED PROPERTIES
        // ═══════════════════════════════════════════════════════════
        get isActive() {
            return this.status === knowledge_source_status_enum_1.KnowledgeSourceStatus.ACTIVE && !this.archivedAt;
        }
        get isProcessing() {
            return this.status === knowledge_source_status_enum_1.KnowledgeSourceStatus.PROCESSING;
        }
        get hasFailed() {
            return this.status === knowledge_source_status_enum_1.KnowledgeSourceStatus.FAILED;
        }
        get isArchived() {
            return !!this.archivedAt;
        }
        get effectivenessScore() {
            // Effectiveness = usageCount × averageRelevanceScore
            return this.usageCount * this.averageRelevanceScore;
        }
        get displayType() {
            switch (this.sourceType) {
                case knowledge_source_type_enum_1.KnowledgeSourceType.DOCUMENT:
                    return `Document (${this.fileType?.toUpperCase() || 'Unknown'})`;
                case knowledge_source_type_enum_1.KnowledgeSourceType.URL:
                    return 'Web URL';
                case knowledge_source_type_enum_1.KnowledgeSourceType.TEXT:
                    return 'Text Entry';
                default:
                    return 'Unknown';
            }
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _archivedBy_extraInitializers);
        }
    };
    return CompanyKnowledgeSource = _classThis;
})();
exports.CompanyKnowledgeSource = CompanyKnowledgeSource;
//# sourceMappingURL=company-knowledge-source.entity.js.map