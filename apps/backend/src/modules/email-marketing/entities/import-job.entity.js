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
exports.ImportJob = exports.ImportJobStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
var ImportJobStatus;
(function (ImportJobStatus) {
    ImportJobStatus["PENDING"] = "pending";
    ImportJobStatus["PROCESSING"] = "processing";
    ImportJobStatus["COMPLETED"] = "completed";
    ImportJobStatus["FAILED"] = "failed";
})(ImportJobStatus || (exports.ImportJobStatus = ImportJobStatus = {}));
let ImportJob = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('import_jobs')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _fileName_decorators;
    let _fileName_initializers = [];
    let _fileName_extraInitializers = [];
    let _originalFileName_decorators;
    let _originalFileName_initializers = [];
    let _originalFileName_extraInitializers = [];
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
    let _validRecords_decorators;
    let _validRecords_initializers = [];
    let _validRecords_extraInitializers = [];
    let _invalidRecords_decorators;
    let _invalidRecords_initializers = [];
    let _invalidRecords_extraInitializers = [];
    let _riskyRecords_decorators;
    let _riskyRecords_initializers = [];
    let _riskyRecords_extraInitializers = [];
    let _duplicateRecords_decorators;
    let _duplicateRecords_initializers = [];
    let _duplicateRecords_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _columnMapping_decorators;
    let _columnMapping_initializers = [];
    let _columnMapping_extraInitializers = [];
    let _validationSummary_decorators;
    let _validationSummary_initializers = [];
    let _validationSummary_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _completedAt_decorators;
    let _completedAt_initializers = [];
    let _completedAt_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _progressPercentage_decorators;
    let _progressPercentage_initializers = [];
    let _progressPercentage_extraInitializers = [];
    var ImportJob = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _fileName_decorators = [(0, typeorm_1.Column)()];
            _originalFileName_decorators = [(0, typeorm_1.Column)()];
            _filePath_decorators = [(0, typeorm_1.Column)()];
            _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ImportJobStatus, default: ImportJobStatus.PENDING })];
            _totalRecords_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _processedRecords_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _validRecords_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _invalidRecords_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _riskyRecords_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _duplicateRecords_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _options_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _columnMapping_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _validationSummary_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _error_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _completedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _userId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _progressPercentage_decorators = [(0, typeorm_1.Column)({ type: 'float', default: 0 })];
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: obj => "fileName" in obj, get: obj => obj.fileName, set: (obj, value) => { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _originalFileName_decorators, { kind: "field", name: "originalFileName", static: false, private: false, access: { has: obj => "originalFileName" in obj, get: obj => obj.originalFileName, set: (obj, value) => { obj.originalFileName = value; } }, metadata: _metadata }, _originalFileName_initializers, _originalFileName_extraInitializers);
            __esDecorate(null, null, _filePath_decorators, { kind: "field", name: "filePath", static: false, private: false, access: { has: obj => "filePath" in obj, get: obj => obj.filePath, set: (obj, value) => { obj.filePath = value; } }, metadata: _metadata }, _filePath_initializers, _filePath_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _totalRecords_decorators, { kind: "field", name: "totalRecords", static: false, private: false, access: { has: obj => "totalRecords" in obj, get: obj => obj.totalRecords, set: (obj, value) => { obj.totalRecords = value; } }, metadata: _metadata }, _totalRecords_initializers, _totalRecords_extraInitializers);
            __esDecorate(null, null, _processedRecords_decorators, { kind: "field", name: "processedRecords", static: false, private: false, access: { has: obj => "processedRecords" in obj, get: obj => obj.processedRecords, set: (obj, value) => { obj.processedRecords = value; } }, metadata: _metadata }, _processedRecords_initializers, _processedRecords_extraInitializers);
            __esDecorate(null, null, _validRecords_decorators, { kind: "field", name: "validRecords", static: false, private: false, access: { has: obj => "validRecords" in obj, get: obj => obj.validRecords, set: (obj, value) => { obj.validRecords = value; } }, metadata: _metadata }, _validRecords_initializers, _validRecords_extraInitializers);
            __esDecorate(null, null, _invalidRecords_decorators, { kind: "field", name: "invalidRecords", static: false, private: false, access: { has: obj => "invalidRecords" in obj, get: obj => obj.invalidRecords, set: (obj, value) => { obj.invalidRecords = value; } }, metadata: _metadata }, _invalidRecords_initializers, _invalidRecords_extraInitializers);
            __esDecorate(null, null, _riskyRecords_decorators, { kind: "field", name: "riskyRecords", static: false, private: false, access: { has: obj => "riskyRecords" in obj, get: obj => obj.riskyRecords, set: (obj, value) => { obj.riskyRecords = value; } }, metadata: _metadata }, _riskyRecords_initializers, _riskyRecords_extraInitializers);
            __esDecorate(null, null, _duplicateRecords_decorators, { kind: "field", name: "duplicateRecords", static: false, private: false, access: { has: obj => "duplicateRecords" in obj, get: obj => obj.duplicateRecords, set: (obj, value) => { obj.duplicateRecords = value; } }, metadata: _metadata }, _duplicateRecords_initializers, _duplicateRecords_extraInitializers);
            __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(null, null, _columnMapping_decorators, { kind: "field", name: "columnMapping", static: false, private: false, access: { has: obj => "columnMapping" in obj, get: obj => obj.columnMapping, set: (obj, value) => { obj.columnMapping = value; } }, metadata: _metadata }, _columnMapping_initializers, _columnMapping_extraInitializers);
            __esDecorate(null, null, _validationSummary_decorators, { kind: "field", name: "validationSummary", static: false, private: false, access: { has: obj => "validationSummary" in obj, get: obj => obj.validationSummary, set: (obj, value) => { obj.validationSummary = value; } }, metadata: _metadata }, _validationSummary_initializers, _validationSummary_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: obj => "completedAt" in obj, get: obj => obj.completedAt, set: (obj, value) => { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _progressPercentage_decorators, { kind: "field", name: "progressPercentage", static: false, private: false, access: { has: obj => "progressPercentage" in obj, get: obj => obj.progressPercentage, set: (obj, value) => { obj.progressPercentage = value; } }, metadata: _metadata }, _progressPercentage_initializers, _progressPercentage_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImportJob = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        fileName = __runInitializers(this, _fileName_initializers, void 0);
        originalFileName = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _originalFileName_initializers, void 0));
        filePath = (__runInitializers(this, _originalFileName_extraInitializers), __runInitializers(this, _filePath_initializers, void 0));
        status = (__runInitializers(this, _filePath_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        totalRecords = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _totalRecords_initializers, void 0));
        processedRecords = (__runInitializers(this, _totalRecords_extraInitializers), __runInitializers(this, _processedRecords_initializers, void 0));
        validRecords = (__runInitializers(this, _processedRecords_extraInitializers), __runInitializers(this, _validRecords_initializers, void 0));
        invalidRecords = (__runInitializers(this, _validRecords_extraInitializers), __runInitializers(this, _invalidRecords_initializers, void 0));
        riskyRecords = (__runInitializers(this, _invalidRecords_extraInitializers), __runInitializers(this, _riskyRecords_initializers, void 0));
        duplicateRecords = (__runInitializers(this, _riskyRecords_extraInitializers), __runInitializers(this, _duplicateRecords_initializers, void 0));
        options = (__runInitializers(this, _duplicateRecords_extraInitializers), __runInitializers(this, _options_initializers, void 0));
        columnMapping = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _columnMapping_initializers, void 0));
        validationSummary = (__runInitializers(this, _columnMapping_extraInitializers), __runInitializers(this, _validationSummary_initializers, void 0));
        error = (__runInitializers(this, _validationSummary_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        completedAt = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
        userId = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _userId_initializers, void 0)); // User who initiated the import
        progressPercentage = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _progressPercentage_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _progressPercentage_extraInitializers);
        }
    };
    return ImportJob = _classThis;
})();
exports.ImportJob = ImportJob;
//# sourceMappingURL=import-job.entity.js.map