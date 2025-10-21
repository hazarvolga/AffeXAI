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
exports.ImportResult = exports.ImportResultStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const import_job_entity_1 = require("./import-job.entity");
var ImportResultStatus;
(function (ImportResultStatus) {
    ImportResultStatus["VALID"] = "valid";
    ImportResultStatus["INVALID"] = "invalid";
    ImportResultStatus["RISKY"] = "risky";
    ImportResultStatus["DUPLICATE"] = "duplicate";
})(ImportResultStatus || (exports.ImportResultStatus = ImportResultStatus = {}));
let ImportResult = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('import_results'), (0, typeorm_1.Index)(['importJobId', 'email']), (0, typeorm_1.Index)(['importJobId', 'status'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _importJob_decorators;
    let _importJob_initializers = [];
    let _importJob_extraInitializers = [];
    let _importJobId_decorators;
    let _importJobId_initializers = [];
    let _importJobId_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _confidenceScore_decorators;
    let _confidenceScore_initializers = [];
    let _confidenceScore_extraInitializers = [];
    let _validationDetails_decorators;
    let _validationDetails_initializers = [];
    let _validationDetails_extraInitializers = [];
    let _issues_decorators;
    let _issues_initializers = [];
    let _issues_extraInitializers = [];
    let _suggestions_decorators;
    let _suggestions_initializers = [];
    let _suggestions_extraInitializers = [];
    let _imported_decorators;
    let _imported_initializers = [];
    let _imported_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _originalData_decorators;
    let _originalData_initializers = [];
    let _originalData_extraInitializers = [];
    let _rowNumber_decorators;
    let _rowNumber_initializers = [];
    let _rowNumber_extraInitializers = [];
    let _subscriberId_decorators;
    let _subscriberId_initializers = [];
    let _subscriberId_extraInitializers = [];
    var ImportResult = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _importJob_decorators = [(0, typeorm_1.ManyToOne)(() => import_job_entity_1.ImportJob, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'importJobId' })];
            _importJobId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _email_decorators = [(0, typeorm_1.Column)()];
            _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ImportResultStatus })];
            _confidenceScore_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _validationDetails_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _issues_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _suggestions_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _imported_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            _error_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _originalData_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _rowNumber_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
            _subscriberId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            __esDecorate(null, null, _importJob_decorators, { kind: "field", name: "importJob", static: false, private: false, access: { has: obj => "importJob" in obj, get: obj => obj.importJob, set: (obj, value) => { obj.importJob = value; } }, metadata: _metadata }, _importJob_initializers, _importJob_extraInitializers);
            __esDecorate(null, null, _importJobId_decorators, { kind: "field", name: "importJobId", static: false, private: false, access: { has: obj => "importJobId" in obj, get: obj => obj.importJobId, set: (obj, value) => { obj.importJobId = value; } }, metadata: _metadata }, _importJobId_initializers, _importJobId_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _confidenceScore_decorators, { kind: "field", name: "confidenceScore", static: false, private: false, access: { has: obj => "confidenceScore" in obj, get: obj => obj.confidenceScore, set: (obj, value) => { obj.confidenceScore = value; } }, metadata: _metadata }, _confidenceScore_initializers, _confidenceScore_extraInitializers);
            __esDecorate(null, null, _validationDetails_decorators, { kind: "field", name: "validationDetails", static: false, private: false, access: { has: obj => "validationDetails" in obj, get: obj => obj.validationDetails, set: (obj, value) => { obj.validationDetails = value; } }, metadata: _metadata }, _validationDetails_initializers, _validationDetails_extraInitializers);
            __esDecorate(null, null, _issues_decorators, { kind: "field", name: "issues", static: false, private: false, access: { has: obj => "issues" in obj, get: obj => obj.issues, set: (obj, value) => { obj.issues = value; } }, metadata: _metadata }, _issues_initializers, _issues_extraInitializers);
            __esDecorate(null, null, _suggestions_decorators, { kind: "field", name: "suggestions", static: false, private: false, access: { has: obj => "suggestions" in obj, get: obj => obj.suggestions, set: (obj, value) => { obj.suggestions = value; } }, metadata: _metadata }, _suggestions_initializers, _suggestions_extraInitializers);
            __esDecorate(null, null, _imported_decorators, { kind: "field", name: "imported", static: false, private: false, access: { has: obj => "imported" in obj, get: obj => obj.imported, set: (obj, value) => { obj.imported = value; } }, metadata: _metadata }, _imported_initializers, _imported_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _originalData_decorators, { kind: "field", name: "originalData", static: false, private: false, access: { has: obj => "originalData" in obj, get: obj => obj.originalData, set: (obj, value) => { obj.originalData = value; } }, metadata: _metadata }, _originalData_initializers, _originalData_extraInitializers);
            __esDecorate(null, null, _rowNumber_decorators, { kind: "field", name: "rowNumber", static: false, private: false, access: { has: obj => "rowNumber" in obj, get: obj => obj.rowNumber, set: (obj, value) => { obj.rowNumber = value; } }, metadata: _metadata }, _rowNumber_initializers, _rowNumber_extraInitializers);
            __esDecorate(null, null, _subscriberId_decorators, { kind: "field", name: "subscriberId", static: false, private: false, access: { has: obj => "subscriberId" in obj, get: obj => obj.subscriberId, set: (obj, value) => { obj.subscriberId = value; } }, metadata: _metadata }, _subscriberId_initializers, _subscriberId_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImportResult = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        importJob = __runInitializers(this, _importJob_initializers, void 0);
        importJobId = (__runInitializers(this, _importJob_extraInitializers), __runInitializers(this, _importJobId_initializers, void 0));
        email = (__runInitializers(this, _importJobId_extraInitializers), __runInitializers(this, _email_initializers, void 0));
        status = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        confidenceScore = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _confidenceScore_initializers, void 0));
        validationDetails = (__runInitializers(this, _confidenceScore_extraInitializers), __runInitializers(this, _validationDetails_initializers, void 0));
        issues = (__runInitializers(this, _validationDetails_extraInitializers), __runInitializers(this, _issues_initializers, void 0));
        suggestions = (__runInitializers(this, _issues_extraInitializers), __runInitializers(this, _suggestions_initializers, void 0));
        imported = (__runInitializers(this, _suggestions_extraInitializers), __runInitializers(this, _imported_initializers, void 0));
        error = (__runInitializers(this, _imported_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        originalData = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _originalData_initializers, void 0)); // Original CSV row data
        rowNumber = (__runInitializers(this, _originalData_extraInitializers), __runInitializers(this, _rowNumber_initializers, void 0)); // Row number in original CSV
        subscriberId = (__runInitializers(this, _rowNumber_extraInitializers), __runInitializers(this, _subscriberId_initializers, void 0)); // ID of created/updated subscriber if imported
        constructor() {
            super(...arguments);
            __runInitializers(this, _subscriberId_extraInitializers);
        }
    };
    return ImportResult = _classThis;
})();
exports.ImportResult = ImportResult;
//# sourceMappingURL=import-result.entity.js.map