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
exports.ChatUrlCache = exports.UrlProcessingStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
var UrlProcessingStatus;
(function (UrlProcessingStatus) {
    UrlProcessingStatus["PENDING"] = "pending";
    UrlProcessingStatus["PROCESSING"] = "processing";
    UrlProcessingStatus["COMPLETED"] = "completed";
    UrlProcessingStatus["FAILED"] = "failed";
})(UrlProcessingStatus || (exports.UrlProcessingStatus = UrlProcessingStatus = {}));
let ChatUrlCache = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('chat_url_cache'), (0, typeorm_1.Index)(['urlHash'], { unique: true }), (0, typeorm_1.Index)(['expiresAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _urlHash_decorators;
    let _urlHash_initializers = [];
    let _urlHash_extraInitializers = [];
    let _originalUrl_decorators;
    let _originalUrl_initializers = [];
    let _originalUrl_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _processingStatus_decorators;
    let _processingStatus_initializers = [];
    let _processingStatus_extraInitializers = [];
    let _expiresAt_decorators;
    let _expiresAt_initializers = [];
    let _expiresAt_extraInitializers = [];
    var ChatUrlCache = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _urlHash_decorators = [(0, typeorm_1.Column)({ length: 64, unique: true })];
            _originalUrl_decorators = [(0, typeorm_1.Column)('text')];
            _title_decorators = [(0, typeorm_1.Column)({ length: 500, nullable: true })];
            _content_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { default: {} })];
            _processingStatus_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: UrlProcessingStatus,
                    default: UrlProcessingStatus.COMPLETED
                })];
            _expiresAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            __esDecorate(null, null, _urlHash_decorators, { kind: "field", name: "urlHash", static: false, private: false, access: { has: obj => "urlHash" in obj, get: obj => obj.urlHash, set: (obj, value) => { obj.urlHash = value; } }, metadata: _metadata }, _urlHash_initializers, _urlHash_extraInitializers);
            __esDecorate(null, null, _originalUrl_decorators, { kind: "field", name: "originalUrl", static: false, private: false, access: { has: obj => "originalUrl" in obj, get: obj => obj.originalUrl, set: (obj, value) => { obj.originalUrl = value; } }, metadata: _metadata }, _originalUrl_initializers, _originalUrl_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _processingStatus_decorators, { kind: "field", name: "processingStatus", static: false, private: false, access: { has: obj => "processingStatus" in obj, get: obj => obj.processingStatus, set: (obj, value) => { obj.processingStatus = value; } }, metadata: _metadata }, _processingStatus_initializers, _processingStatus_extraInitializers);
            __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: obj => "expiresAt" in obj, get: obj => obj.expiresAt, set: (obj, value) => { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatUrlCache = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        urlHash = __runInitializers(this, _urlHash_initializers, void 0);
        originalUrl = (__runInitializers(this, _urlHash_extraInitializers), __runInitializers(this, _originalUrl_initializers, void 0));
        title = (__runInitializers(this, _originalUrl_extraInitializers), __runInitializers(this, _title_initializers, void 0));
        content = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        metadata = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        processingStatus = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _processingStatus_initializers, void 0));
        expiresAt = (__runInitializers(this, _processingStatus_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
        // Computed properties
        get isExpired() {
            return this.expiresAt && this.expiresAt < new Date();
        }
        get isProcessed() {
            return this.processingStatus === UrlProcessingStatus.COMPLETED;
        }
        get hasFailed() {
            return this.processingStatus === UrlProcessingStatus.FAILED;
        }
        get hasContent() {
            return !!this.content && this.content.length > 0;
        }
        get domain() {
            try {
                return new URL(this.originalUrl).hostname;
            }
            catch {
                return 'unknown';
            }
        }
        get contentPreview() {
            if (!this.content)
                return '';
            return this.content.length > 200 ? this.content.substring(0, 200) + '...' : this.content;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _expiresAt_extraInitializers);
        }
    };
    return ChatUrlCache = _classThis;
})();
exports.ChatUrlCache = ChatUrlCache;
//# sourceMappingURL=chat-url-cache.entity.js.map