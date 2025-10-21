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
exports.ExportJob = exports.ExportJobStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
var ExportJobStatus;
(function (ExportJobStatus) {
    ExportJobStatus["PENDING"] = "pending";
    ExportJobStatus["PROCESSING"] = "processing";
    ExportJobStatus["COMPLETED"] = "completed";
    ExportJobStatus["FAILED"] = "failed";
})(ExportJobStatus || (exports.ExportJobStatus = ExportJobStatus = {}));
let ExportJob = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('export_jobs')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _fileName_decorators;
    let _fileName_initializers = [];
    let _fileName_extraInitializers = [];
    let _filePath_decorators;
    let _filePath_initializers = [];
    let _filePath_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _totalRecords_decorators;
    let _totalRecords_initializers = [];
    let _totalRecords_extraInitializers = [];
    let _processedRecords_decorators;
    let _processedRecords_initializers = [];
    let _processedRecords_extraInitializers = [];
    let _filters_decorators;
    let _filters_initializers = [];
    let _filters_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _completedAt_decorators;
    let _completedAt_initializers = [];
    let _completedAt_extraInitializers = [];
    let _expiresAt_decorators;
    let _expiresAt_initializers = [];
    let _expiresAt_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _progressPercentage_decorators;
    let _progressPercentage_initializers = [];
    let _progressPercentage_extraInitializers = [];
    let _fileSizeBytes_decorators;
    let _fileSizeBytes_initializers = [];
    let _fileSizeBytes_extraInitializers = [];
    var ExportJob = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _fileName_decorators = [(0, typeorm_1.Column)()];
            _filePath_decorators = [(0, typeorm_1.Column)()];
            _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ExportJobStatus, default: ExportJobStatus.PENDING })];
            _totalRecords_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _processedRecords_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _filters_decorators = [(0, typeorm_1.Column)({ type: 'json' })];
            _options_decorators = [(0, typeorm_1.Column)({ type: 'json' })];
            _error_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _completedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _expiresAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _userId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _progressPercentage_decorators = [(0, typeorm_1.Column)({ type: 'float', default: 0 })];
            _fileSizeBytes_decorators = [(0, typeorm_1.Column)({ type: 'bigint', nullable: true })];
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: obj => "fileName" in obj, get: obj => obj.fileName, set: (obj, value) => { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _filePath_decorators, { kind: "field", name: "filePath", static: false, private: false, access: { has: obj => "filePath" in obj, get: obj => obj.filePath, set: (obj, value) => { obj.filePath = value; } }, metadata: _metadata }, _filePath_initializers, _filePath_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _totalRecords_decorators, { kind: "field", name: "totalRecords", static: false, private: false, access: { has: obj => "totalRecords" in obj, get: obj => obj.totalRecords, set: (obj, value) => { obj.totalRecords = value; } }, metadata: _metadata }, _totalRecords_initializers, _totalRecords_extraInitializers);
            __esDecorate(null, null, _processedRecords_decorators, { kind: "field", name: "processedRecords", static: false, private: false, access: { has: obj => "processedRecords" in obj, get: obj => obj.processedRecords, set: (obj, value) => { obj.processedRecords = value; } }, metadata: _metadata }, _processedRecords_initializers, _processedRecords_extraInitializers);
            __esDecorate(null, null, _filters_decorators, { kind: "field", name: "filters", static: false, private: false, access: { has: obj => "filters" in obj, get: obj => obj.filters, set: (obj, value) => { obj.filters = value; } }, metadata: _metadata }, _filters_initializers, _filters_extraInitializers);
            __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: obj => "completedAt" in obj, get: obj => obj.completedAt, set: (obj, value) => { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
            __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: obj => "expiresAt" in obj, get: obj => obj.expiresAt, set: (obj, value) => { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _progressPercentage_decorators, { kind: "field", name: "progressPercentage", static: false, private: false, access: { has: obj => "progressPercentage" in obj, get: obj => obj.progressPercentage, set: (obj, value) => { obj.progressPercentage = value; } }, metadata: _metadata }, _progressPercentage_initializers, _progressPercentage_extraInitializers);
            __esDecorate(null, null, _fileSizeBytes_decorators, { kind: "field", name: "fileSizeBytes", static: false, private: false, access: { has: obj => "fileSizeBytes" in obj, get: obj => obj.fileSizeBytes, set: (obj, value) => { obj.fileSizeBytes = value; } }, metadata: _metadata }, _fileSizeBytes_initializers, _fileSizeBytes_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExportJob = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        fileName = __runInitializers(this, _fileName_initializers, void 0);
        filePath = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _filePath_initializers, void 0));
        status = (__runInitializers(this, _filePath_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        totalRecords = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _totalRecords_initializers, void 0));
        processedRecords = (__runInitializers(this, _totalRecords_extraInitializers), __runInitializers(this, _processedRecords_initializers, void 0));
        filters = (__runInitializers(this, _processedRecords_extraInitializers), __runInitializers(this, _filters_initializers, void 0));
        options = (__runInitializers(this, _filters_extraInitializers), __runInitializers(this, _options_initializers, void 0));
        error = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        completedAt = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
        expiresAt = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
        userId = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _userId_initializers, void 0)); // User who initiated the export
        progressPercentage = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _progressPercentage_initializers, void 0));
        fileSizeBytes = (__runInitializers(this, _progressPercentage_extraInitializers), __runInitializers(this, _fileSizeBytes_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _fileSizeBytes_extraInitializers);
        }
    };
    return ExportJob = _classThis;
})();
exports.ExportJob = ExportJob;
//# sourceMappingURL=export-job.entity.js.map