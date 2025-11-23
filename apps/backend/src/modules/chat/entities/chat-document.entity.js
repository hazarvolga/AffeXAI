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
exports.ChatDocument = exports.DocumentProcessingStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const chat_session_entity_1 = require("./chat-session.entity");
const chat_message_entity_1 = require("./chat-message.entity");
var DocumentProcessingStatus;
(function (DocumentProcessingStatus) {
    DocumentProcessingStatus["PENDING"] = "pending";
    DocumentProcessingStatus["PROCESSING"] = "processing";
    DocumentProcessingStatus["COMPLETED"] = "completed";
    DocumentProcessingStatus["FAILED"] = "failed";
})(DocumentProcessingStatus || (exports.DocumentProcessingStatus = DocumentProcessingStatus = {}));
let ChatDocument = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('chat_documents'), (0, typeorm_1.Index)(['sessionId']), (0, typeorm_1.Index)(['processingStatus'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _messageId_decorators;
    let _messageId_initializers = [];
    let _messageId_extraInitializers = [];
    let _filename_decorators;
    let _filename_initializers = [];
    let _filename_extraInitializers = [];
    let _fileType_decorators;
    let _fileType_initializers = [];
    let _fileType_extraInitializers = [];
    let _fileSize_decorators;
    let _fileSize_initializers = [];
    let _fileSize_extraInitializers = [];
    let _storagePath_decorators;
    let _storagePath_initializers = [];
    let _storagePath_extraInitializers = [];
    let _extractedContent_decorators;
    let _extractedContent_initializers = [];
    let _extractedContent_extraInitializers = [];
    let _processingStatus_decorators;
    let _processingStatus_initializers = [];
    let _processingStatus_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _processedAt_decorators;
    let _processedAt_initializers = [];
    let _processedAt_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _message_decorators;
    let _message_initializers = [];
    let _message_extraInitializers = [];
    var ChatDocument = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _sessionId_decorators = [(0, typeorm_1.Column)('uuid'), (0, typeorm_1.Index)()];
            _messageId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _filename_decorators = [(0, typeorm_1.Column)({ length: 255 })];
            _fileType_decorators = [(0, typeorm_1.Column)({ length: 10 })];
            _fileSize_decorators = [(0, typeorm_1.Column)('int')];
            _storagePath_decorators = [(0, typeorm_1.Column)({ length: 500 })];
            _extractedContent_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
            _processingStatus_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: DocumentProcessingStatus,
                    default: DocumentProcessingStatus.PENDING
                })];
            _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { default: {} })];
            _processedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _session_decorators = [(0, typeorm_1.ManyToOne)(() => chat_session_entity_1.ChatSession, session => session.documents, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'sessionId' })];
            _message_decorators = [(0, typeorm_1.ManyToOne)(() => chat_message_entity_1.ChatMessage, { nullable: true, onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'messageId' })];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _messageId_decorators, { kind: "field", name: "messageId", static: false, private: false, access: { has: obj => "messageId" in obj, get: obj => obj.messageId, set: (obj, value) => { obj.messageId = value; } }, metadata: _metadata }, _messageId_initializers, _messageId_extraInitializers);
            __esDecorate(null, null, _filename_decorators, { kind: "field", name: "filename", static: false, private: false, access: { has: obj => "filename" in obj, get: obj => obj.filename, set: (obj, value) => { obj.filename = value; } }, metadata: _metadata }, _filename_initializers, _filename_extraInitializers);
            __esDecorate(null, null, _fileType_decorators, { kind: "field", name: "fileType", static: false, private: false, access: { has: obj => "fileType" in obj, get: obj => obj.fileType, set: (obj, value) => { obj.fileType = value; } }, metadata: _metadata }, _fileType_initializers, _fileType_extraInitializers);
            __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: obj => "fileSize" in obj, get: obj => obj.fileSize, set: (obj, value) => { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
            __esDecorate(null, null, _storagePath_decorators, { kind: "field", name: "storagePath", static: false, private: false, access: { has: obj => "storagePath" in obj, get: obj => obj.storagePath, set: (obj, value) => { obj.storagePath = value; } }, metadata: _metadata }, _storagePath_initializers, _storagePath_extraInitializers);
            __esDecorate(null, null, _extractedContent_decorators, { kind: "field", name: "extractedContent", static: false, private: false, access: { has: obj => "extractedContent" in obj, get: obj => obj.extractedContent, set: (obj, value) => { obj.extractedContent = value; } }, metadata: _metadata }, _extractedContent_initializers, _extractedContent_extraInitializers);
            __esDecorate(null, null, _processingStatus_decorators, { kind: "field", name: "processingStatus", static: false, private: false, access: { has: obj => "processingStatus" in obj, get: obj => obj.processingStatus, set: (obj, value) => { obj.processingStatus = value; } }, metadata: _metadata }, _processingStatus_initializers, _processingStatus_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _processedAt_decorators, { kind: "field", name: "processedAt", static: false, private: false, access: { has: obj => "processedAt" in obj, get: obj => obj.processedAt, set: (obj, value) => { obj.processedAt = value; } }, metadata: _metadata }, _processedAt_initializers, _processedAt_extraInitializers);
            __esDecorate(null, null, _session_decorators, { kind: "field", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message, set: (obj, value) => { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatDocument = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        messageId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _messageId_initializers, void 0));
        filename = (__runInitializers(this, _messageId_extraInitializers), __runInitializers(this, _filename_initializers, void 0));
        fileType = (__runInitializers(this, _filename_extraInitializers), __runInitializers(this, _fileType_initializers, void 0));
        fileSize = (__runInitializers(this, _fileType_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
        storagePath = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _storagePath_initializers, void 0));
        extractedContent = (__runInitializers(this, _storagePath_extraInitializers), __runInitializers(this, _extractedContent_initializers, void 0));
        processingStatus = (__runInitializers(this, _extractedContent_extraInitializers), __runInitializers(this, _processingStatus_initializers, void 0));
        metadata = (__runInitializers(this, _processingStatus_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        processedAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _processedAt_initializers, void 0));
        // Relations
        session = (__runInitializers(this, _processedAt_extraInitializers), __runInitializers(this, _session_initializers, void 0));
        message = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _message_initializers, void 0));
        // Computed properties
        get isProcessed() {
            return this.processingStatus === DocumentProcessingStatus.COMPLETED;
        }
        get hasFailed() {
            return this.processingStatus === DocumentProcessingStatus.FAILED;
        }
        get isProcessing() {
            return this.processingStatus === DocumentProcessingStatus.PROCESSING;
        }
        get fileSizeInMB() {
            return Math.round((this.fileSize / (1024 * 1024)) * 100) / 100;
        }
        get hasContent() {
            return !!this.extractedContent && this.extractedContent.length > 0;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _message_extraInitializers);
        }
    };
    return ChatDocument = _classThis;
})();
exports.ChatDocument = ChatDocument;
//# sourceMappingURL=chat-document.entity.js.map