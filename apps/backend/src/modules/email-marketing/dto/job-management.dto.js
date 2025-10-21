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
exports.JobCleanupResponseDto = exports.JobListResponseDto = exports.CleanupResultDto = exports.JobStatisticsDto = exports.JobSummaryDto = exports.ExportJobSummaryDto = exports.ImportJobSummaryDto = exports.JobStatus = exports.JobType = void 0;
const swagger_1 = require("@nestjs/swagger");
var JobType;
(function (JobType) {
    JobType["IMPORT"] = "IMPORT";
    JobType["EXPORT"] = "EXPORT";
})(JobType || (exports.JobType = JobType = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["PENDING"] = "PENDING";
    JobStatus["PROCESSING"] = "PROCESSING";
    JobStatus["COMPLETED"] = "COMPLETED";
    JobStatus["FAILED"] = "FAILED";
    JobStatus["CANCELLED"] = "CANCELLED";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
let ImportJobSummaryDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _fileName_decorators;
    let _fileName_initializers = [];
    let _fileName_extraInitializers = [];
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
    let _progressPercentage_decorators;
    let _progressPercentage_initializers = [];
    let _progressPercentage_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _completedAt_decorators;
    let _completedAt_initializers = [];
    let _completedAt_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    return class ImportJobSummaryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Job ID' })];
            _fileName_decorators = [(0, swagger_1.ApiProperty)({ description: 'File name' })];
            _status_decorators = [(0, swagger_1.ApiProperty)({ description: 'Job status', enum: JobStatus })];
            _totalRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total records' })];
            _processedRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Processed records' })];
            _validRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Valid records' })];
            _invalidRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Invalid records' })];
            _progressPercentage_decorators = [(0, swagger_1.ApiProperty)({ description: 'Progress percentage' })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Created at' })];
            _completedAt_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Completed at' })];
            _error_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Error message' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: obj => "fileName" in obj, get: obj => obj.fileName, set: (obj, value) => { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _totalRecords_decorators, { kind: "field", name: "totalRecords", static: false, private: false, access: { has: obj => "totalRecords" in obj, get: obj => obj.totalRecords, set: (obj, value) => { obj.totalRecords = value; } }, metadata: _metadata }, _totalRecords_initializers, _totalRecords_extraInitializers);
            __esDecorate(null, null, _processedRecords_decorators, { kind: "field", name: "processedRecords", static: false, private: false, access: { has: obj => "processedRecords" in obj, get: obj => obj.processedRecords, set: (obj, value) => { obj.processedRecords = value; } }, metadata: _metadata }, _processedRecords_initializers, _processedRecords_extraInitializers);
            __esDecorate(null, null, _validRecords_decorators, { kind: "field", name: "validRecords", static: false, private: false, access: { has: obj => "validRecords" in obj, get: obj => obj.validRecords, set: (obj, value) => { obj.validRecords = value; } }, metadata: _metadata }, _validRecords_initializers, _validRecords_extraInitializers);
            __esDecorate(null, null, _invalidRecords_decorators, { kind: "field", name: "invalidRecords", static: false, private: false, access: { has: obj => "invalidRecords" in obj, get: obj => obj.invalidRecords, set: (obj, value) => { obj.invalidRecords = value; } }, metadata: _metadata }, _invalidRecords_initializers, _invalidRecords_extraInitializers);
            __esDecorate(null, null, _progressPercentage_decorators, { kind: "field", name: "progressPercentage", static: false, private: false, access: { has: obj => "progressPercentage" in obj, get: obj => obj.progressPercentage, set: (obj, value) => { obj.progressPercentage = value; } }, metadata: _metadata }, _progressPercentage_initializers, _progressPercentage_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: obj => "completedAt" in obj, get: obj => obj.completedAt, set: (obj, value) => { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        fileName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _fileName_initializers, void 0));
        status = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        totalRecords = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _totalRecords_initializers, void 0));
        processedRecords = (__runInitializers(this, _totalRecords_extraInitializers), __runInitializers(this, _processedRecords_initializers, void 0));
        validRecords = (__runInitializers(this, _processedRecords_extraInitializers), __runInitializers(this, _validRecords_initializers, void 0));
        invalidRecords = (__runInitializers(this, _validRecords_extraInitializers), __runInitializers(this, _invalidRecords_initializers, void 0));
        progressPercentage = (__runInitializers(this, _invalidRecords_extraInitializers), __runInitializers(this, _progressPercentage_initializers, void 0));
        createdAt = (__runInitializers(this, _progressPercentage_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        completedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
        error = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        constructor() {
            __runInitializers(this, _error_extraInitializers);
        }
    };
})();
exports.ImportJobSummaryDto = ImportJobSummaryDto;
let ExportJobSummaryDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _fileName_decorators;
    let _fileName_initializers = [];
    let _fileName_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _totalRecords_decorators;
    let _totalRecords_initializers = [];
    let _totalRecords_extraInitializers = [];
    let _processedRecords_decorators;
    let _processedRecords_initializers = [];
    let _processedRecords_extraInitializers = [];
    let _progressPercentage_decorators;
    let _progressPercentage_initializers = [];
    let _progressPercentage_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _completedAt_decorators;
    let _completedAt_initializers = [];
    let _completedAt_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    return class ExportJobSummaryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Job ID' })];
            _fileName_decorators = [(0, swagger_1.ApiProperty)({ description: 'File name' })];
            _status_decorators = [(0, swagger_1.ApiProperty)({ description: 'Job status', enum: JobStatus })];
            _totalRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total records' })];
            _processedRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Processed records' })];
            _progressPercentage_decorators = [(0, swagger_1.ApiProperty)({ description: 'Progress percentage' })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Created at' })];
            _completedAt_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Completed at' })];
            _error_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Error message' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: obj => "fileName" in obj, get: obj => obj.fileName, set: (obj, value) => { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _totalRecords_decorators, { kind: "field", name: "totalRecords", static: false, private: false, access: { has: obj => "totalRecords" in obj, get: obj => obj.totalRecords, set: (obj, value) => { obj.totalRecords = value; } }, metadata: _metadata }, _totalRecords_initializers, _totalRecords_extraInitializers);
            __esDecorate(null, null, _processedRecords_decorators, { kind: "field", name: "processedRecords", static: false, private: false, access: { has: obj => "processedRecords" in obj, get: obj => obj.processedRecords, set: (obj, value) => { obj.processedRecords = value; } }, metadata: _metadata }, _processedRecords_initializers, _processedRecords_extraInitializers);
            __esDecorate(null, null, _progressPercentage_decorators, { kind: "field", name: "progressPercentage", static: false, private: false, access: { has: obj => "progressPercentage" in obj, get: obj => obj.progressPercentage, set: (obj, value) => { obj.progressPercentage = value; } }, metadata: _metadata }, _progressPercentage_initializers, _progressPercentage_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: obj => "completedAt" in obj, get: obj => obj.completedAt, set: (obj, value) => { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        fileName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _fileName_initializers, void 0));
        status = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        totalRecords = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _totalRecords_initializers, void 0));
        processedRecords = (__runInitializers(this, _totalRecords_extraInitializers), __runInitializers(this, _processedRecords_initializers, void 0));
        progressPercentage = (__runInitializers(this, _processedRecords_extraInitializers), __runInitializers(this, _progressPercentage_initializers, void 0));
        createdAt = (__runInitializers(this, _progressPercentage_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        completedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
        error = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        constructor() {
            __runInitializers(this, _error_extraInitializers);
        }
    };
})();
exports.ExportJobSummaryDto = ExportJobSummaryDto;
let JobSummaryDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _fileName_decorators;
    let _fileName_initializers = [];
    let _fileName_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _totalRecords_decorators;
    let _totalRecords_initializers = [];
    let _totalRecords_extraInitializers = [];
    let _processedRecords_decorators;
    let _processedRecords_initializers = [];
    let _processedRecords_extraInitializers = [];
    let _progressPercentage_decorators;
    let _progressPercentage_initializers = [];
    let _progressPercentage_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _completedAt_decorators;
    let _completedAt_initializers = [];
    let _completedAt_extraInitializers = [];
    return class JobSummaryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Job ID' })];
            _type_decorators = [(0, swagger_1.ApiProperty)({ description: 'Job type', enum: JobType })];
            _fileName_decorators = [(0, swagger_1.ApiProperty)({ description: 'File name' })];
            _status_decorators = [(0, swagger_1.ApiProperty)({ description: 'Job status', enum: JobStatus })];
            _totalRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total records' })];
            _processedRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Processed records' })];
            _progressPercentage_decorators = [(0, swagger_1.ApiProperty)({ description: 'Progress percentage' })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Created at' })];
            _completedAt_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Completed at' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: obj => "fileName" in obj, get: obj => obj.fileName, set: (obj, value) => { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _totalRecords_decorators, { kind: "field", name: "totalRecords", static: false, private: false, access: { has: obj => "totalRecords" in obj, get: obj => obj.totalRecords, set: (obj, value) => { obj.totalRecords = value; } }, metadata: _metadata }, _totalRecords_initializers, _totalRecords_extraInitializers);
            __esDecorate(null, null, _processedRecords_decorators, { kind: "field", name: "processedRecords", static: false, private: false, access: { has: obj => "processedRecords" in obj, get: obj => obj.processedRecords, set: (obj, value) => { obj.processedRecords = value; } }, metadata: _metadata }, _processedRecords_initializers, _processedRecords_extraInitializers);
            __esDecorate(null, null, _progressPercentage_decorators, { kind: "field", name: "progressPercentage", static: false, private: false, access: { has: obj => "progressPercentage" in obj, get: obj => obj.progressPercentage, set: (obj, value) => { obj.progressPercentage = value; } }, metadata: _metadata }, _progressPercentage_initializers, _progressPercentage_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: obj => "completedAt" in obj, get: obj => obj.completedAt, set: (obj, value) => { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        type = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
        fileName = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _fileName_initializers, void 0));
        status = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        totalRecords = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _totalRecords_initializers, void 0));
        processedRecords = (__runInitializers(this, _totalRecords_extraInitializers), __runInitializers(this, _processedRecords_initializers, void 0));
        progressPercentage = (__runInitializers(this, _processedRecords_extraInitializers), __runInitializers(this, _progressPercentage_initializers, void 0));
        createdAt = (__runInitializers(this, _progressPercentage_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        completedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _completedAt_extraInitializers);
        }
    };
})();
exports.JobSummaryDto = JobSummaryDto;
let JobStatisticsDto = (() => {
    let _totalJobs_decorators;
    let _totalJobs_initializers = [];
    let _totalJobs_extraInitializers = [];
    let _totalImportJobs_decorators;
    let _totalImportJobs_initializers = [];
    let _totalImportJobs_extraInitializers = [];
    let _activeImportJobs_decorators;
    let _activeImportJobs_initializers = [];
    let _activeImportJobs_extraInitializers = [];
    let _completedImportJobs_decorators;
    let _completedImportJobs_initializers = [];
    let _completedImportJobs_extraInitializers = [];
    let _failedImportJobs_decorators;
    let _failedImportJobs_initializers = [];
    let _failedImportJobs_extraInitializers = [];
    let _totalExportJobs_decorators;
    let _totalExportJobs_initializers = [];
    let _totalExportJobs_extraInitializers = [];
    let _activeExportJobs_decorators;
    let _activeExportJobs_initializers = [];
    let _activeExportJobs_extraInitializers = [];
    let _completedExportJobs_decorators;
    let _completedExportJobs_initializers = [];
    let _completedExportJobs_extraInitializers = [];
    let _failedExportJobs_decorators;
    let _failedExportJobs_initializers = [];
    let _failedExportJobs_extraInitializers = [];
    let _totalRecordsProcessed_decorators;
    let _totalRecordsProcessed_initializers = [];
    let _totalRecordsProcessed_extraInitializers = [];
    let _completedJobs_decorators;
    let _completedJobs_initializers = [];
    let _completedJobs_extraInitializers = [];
    let _failedJobs_decorators;
    let _failedJobs_initializers = [];
    let _failedJobs_extraInitializers = [];
    let _processingJobs_decorators;
    let _processingJobs_initializers = [];
    let _processingJobs_extraInitializers = [];
    let _pendingJobs_decorators;
    let _pendingJobs_initializers = [];
    let _pendingJobs_extraInitializers = [];
    let _averageProcessingTime_decorators;
    let _averageProcessingTime_initializers = [];
    let _averageProcessingTime_extraInitializers = [];
    return class JobStatisticsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _totalJobs_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total jobs' })];
            _totalImportJobs_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total import jobs' })];
            _activeImportJobs_decorators = [(0, swagger_1.ApiProperty)({ description: 'Active import jobs' })];
            _completedImportJobs_decorators = [(0, swagger_1.ApiProperty)({ description: 'Completed import jobs' })];
            _failedImportJobs_decorators = [(0, swagger_1.ApiProperty)({ description: 'Failed import jobs' })];
            _totalExportJobs_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total export jobs' })];
            _activeExportJobs_decorators = [(0, swagger_1.ApiProperty)({ description: 'Active export jobs' })];
            _completedExportJobs_decorators = [(0, swagger_1.ApiProperty)({ description: 'Completed export jobs' })];
            _failedExportJobs_decorators = [(0, swagger_1.ApiProperty)({ description: 'Failed export jobs' })];
            _totalRecordsProcessed_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total records processed' })];
            _completedJobs_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Completed jobs (combined)' })];
            _failedJobs_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Failed jobs (combined)' })];
            _processingJobs_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Processing jobs' })];
            _pendingJobs_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Pending jobs' })];
            _averageProcessingTime_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Average processing time in seconds' })];
            __esDecorate(null, null, _totalJobs_decorators, { kind: "field", name: "totalJobs", static: false, private: false, access: { has: obj => "totalJobs" in obj, get: obj => obj.totalJobs, set: (obj, value) => { obj.totalJobs = value; } }, metadata: _metadata }, _totalJobs_initializers, _totalJobs_extraInitializers);
            __esDecorate(null, null, _totalImportJobs_decorators, { kind: "field", name: "totalImportJobs", static: false, private: false, access: { has: obj => "totalImportJobs" in obj, get: obj => obj.totalImportJobs, set: (obj, value) => { obj.totalImportJobs = value; } }, metadata: _metadata }, _totalImportJobs_initializers, _totalImportJobs_extraInitializers);
            __esDecorate(null, null, _activeImportJobs_decorators, { kind: "field", name: "activeImportJobs", static: false, private: false, access: { has: obj => "activeImportJobs" in obj, get: obj => obj.activeImportJobs, set: (obj, value) => { obj.activeImportJobs = value; } }, metadata: _metadata }, _activeImportJobs_initializers, _activeImportJobs_extraInitializers);
            __esDecorate(null, null, _completedImportJobs_decorators, { kind: "field", name: "completedImportJobs", static: false, private: false, access: { has: obj => "completedImportJobs" in obj, get: obj => obj.completedImportJobs, set: (obj, value) => { obj.completedImportJobs = value; } }, metadata: _metadata }, _completedImportJobs_initializers, _completedImportJobs_extraInitializers);
            __esDecorate(null, null, _failedImportJobs_decorators, { kind: "field", name: "failedImportJobs", static: false, private: false, access: { has: obj => "failedImportJobs" in obj, get: obj => obj.failedImportJobs, set: (obj, value) => { obj.failedImportJobs = value; } }, metadata: _metadata }, _failedImportJobs_initializers, _failedImportJobs_extraInitializers);
            __esDecorate(null, null, _totalExportJobs_decorators, { kind: "field", name: "totalExportJobs", static: false, private: false, access: { has: obj => "totalExportJobs" in obj, get: obj => obj.totalExportJobs, set: (obj, value) => { obj.totalExportJobs = value; } }, metadata: _metadata }, _totalExportJobs_initializers, _totalExportJobs_extraInitializers);
            __esDecorate(null, null, _activeExportJobs_decorators, { kind: "field", name: "activeExportJobs", static: false, private: false, access: { has: obj => "activeExportJobs" in obj, get: obj => obj.activeExportJobs, set: (obj, value) => { obj.activeExportJobs = value; } }, metadata: _metadata }, _activeExportJobs_initializers, _activeExportJobs_extraInitializers);
            __esDecorate(null, null, _completedExportJobs_decorators, { kind: "field", name: "completedExportJobs", static: false, private: false, access: { has: obj => "completedExportJobs" in obj, get: obj => obj.completedExportJobs, set: (obj, value) => { obj.completedExportJobs = value; } }, metadata: _metadata }, _completedExportJobs_initializers, _completedExportJobs_extraInitializers);
            __esDecorate(null, null, _failedExportJobs_decorators, { kind: "field", name: "failedExportJobs", static: false, private: false, access: { has: obj => "failedExportJobs" in obj, get: obj => obj.failedExportJobs, set: (obj, value) => { obj.failedExportJobs = value; } }, metadata: _metadata }, _failedExportJobs_initializers, _failedExportJobs_extraInitializers);
            __esDecorate(null, null, _totalRecordsProcessed_decorators, { kind: "field", name: "totalRecordsProcessed", static: false, private: false, access: { has: obj => "totalRecordsProcessed" in obj, get: obj => obj.totalRecordsProcessed, set: (obj, value) => { obj.totalRecordsProcessed = value; } }, metadata: _metadata }, _totalRecordsProcessed_initializers, _totalRecordsProcessed_extraInitializers);
            __esDecorate(null, null, _completedJobs_decorators, { kind: "field", name: "completedJobs", static: false, private: false, access: { has: obj => "completedJobs" in obj, get: obj => obj.completedJobs, set: (obj, value) => { obj.completedJobs = value; } }, metadata: _metadata }, _completedJobs_initializers, _completedJobs_extraInitializers);
            __esDecorate(null, null, _failedJobs_decorators, { kind: "field", name: "failedJobs", static: false, private: false, access: { has: obj => "failedJobs" in obj, get: obj => obj.failedJobs, set: (obj, value) => { obj.failedJobs = value; } }, metadata: _metadata }, _failedJobs_initializers, _failedJobs_extraInitializers);
            __esDecorate(null, null, _processingJobs_decorators, { kind: "field", name: "processingJobs", static: false, private: false, access: { has: obj => "processingJobs" in obj, get: obj => obj.processingJobs, set: (obj, value) => { obj.processingJobs = value; } }, metadata: _metadata }, _processingJobs_initializers, _processingJobs_extraInitializers);
            __esDecorate(null, null, _pendingJobs_decorators, { kind: "field", name: "pendingJobs", static: false, private: false, access: { has: obj => "pendingJobs" in obj, get: obj => obj.pendingJobs, set: (obj, value) => { obj.pendingJobs = value; } }, metadata: _metadata }, _pendingJobs_initializers, _pendingJobs_extraInitializers);
            __esDecorate(null, null, _averageProcessingTime_decorators, { kind: "field", name: "averageProcessingTime", static: false, private: false, access: { has: obj => "averageProcessingTime" in obj, get: obj => obj.averageProcessingTime, set: (obj, value) => { obj.averageProcessingTime = value; } }, metadata: _metadata }, _averageProcessingTime_initializers, _averageProcessingTime_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        totalJobs = __runInitializers(this, _totalJobs_initializers, void 0);
        totalImportJobs = (__runInitializers(this, _totalJobs_extraInitializers), __runInitializers(this, _totalImportJobs_initializers, void 0));
        activeImportJobs = (__runInitializers(this, _totalImportJobs_extraInitializers), __runInitializers(this, _activeImportJobs_initializers, void 0));
        completedImportJobs = (__runInitializers(this, _activeImportJobs_extraInitializers), __runInitializers(this, _completedImportJobs_initializers, void 0));
        failedImportJobs = (__runInitializers(this, _completedImportJobs_extraInitializers), __runInitializers(this, _failedImportJobs_initializers, void 0));
        totalExportJobs = (__runInitializers(this, _failedImportJobs_extraInitializers), __runInitializers(this, _totalExportJobs_initializers, void 0));
        activeExportJobs = (__runInitializers(this, _totalExportJobs_extraInitializers), __runInitializers(this, _activeExportJobs_initializers, void 0));
        completedExportJobs = (__runInitializers(this, _activeExportJobs_extraInitializers), __runInitializers(this, _completedExportJobs_initializers, void 0));
        failedExportJobs = (__runInitializers(this, _completedExportJobs_extraInitializers), __runInitializers(this, _failedExportJobs_initializers, void 0));
        totalRecordsProcessed = (__runInitializers(this, _failedExportJobs_extraInitializers), __runInitializers(this, _totalRecordsProcessed_initializers, void 0));
        completedJobs = (__runInitializers(this, _totalRecordsProcessed_extraInitializers), __runInitializers(this, _completedJobs_initializers, void 0));
        failedJobs = (__runInitializers(this, _completedJobs_extraInitializers), __runInitializers(this, _failedJobs_initializers, void 0));
        processingJobs = (__runInitializers(this, _failedJobs_extraInitializers), __runInitializers(this, _processingJobs_initializers, void 0));
        pendingJobs = (__runInitializers(this, _processingJobs_extraInitializers), __runInitializers(this, _pendingJobs_initializers, void 0));
        averageProcessingTime = (__runInitializers(this, _pendingJobs_extraInitializers), __runInitializers(this, _averageProcessingTime_initializers, void 0));
        constructor() {
            __runInitializers(this, _averageProcessingTime_extraInitializers);
        }
    };
})();
exports.JobStatisticsDto = JobStatisticsDto;
let CleanupResultDto = (() => {
    let _importJobsCleaned_decorators;
    let _importJobsCleaned_initializers = [];
    let _importJobsCleaned_extraInitializers = [];
    let _exportJobsCleaned_decorators;
    let _exportJobsCleaned_initializers = [];
    let _exportJobsCleaned_extraInitializers = [];
    let _totalJobsCleaned_decorators;
    let _totalJobsCleaned_initializers = [];
    let _totalJobsCleaned_extraInitializers = [];
    let _cleanedAt_decorators;
    let _cleanedAt_initializers = [];
    let _cleanedAt_extraInitializers = [];
    return class CleanupResultDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _importJobsCleaned_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of import jobs cleaned' })];
            _exportJobsCleaned_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of export jobs cleaned' })];
            _totalJobsCleaned_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total jobs cleaned' })];
            _cleanedAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Cleanup timestamp' })];
            __esDecorate(null, null, _importJobsCleaned_decorators, { kind: "field", name: "importJobsCleaned", static: false, private: false, access: { has: obj => "importJobsCleaned" in obj, get: obj => obj.importJobsCleaned, set: (obj, value) => { obj.importJobsCleaned = value; } }, metadata: _metadata }, _importJobsCleaned_initializers, _importJobsCleaned_extraInitializers);
            __esDecorate(null, null, _exportJobsCleaned_decorators, { kind: "field", name: "exportJobsCleaned", static: false, private: false, access: { has: obj => "exportJobsCleaned" in obj, get: obj => obj.exportJobsCleaned, set: (obj, value) => { obj.exportJobsCleaned = value; } }, metadata: _metadata }, _exportJobsCleaned_initializers, _exportJobsCleaned_extraInitializers);
            __esDecorate(null, null, _totalJobsCleaned_decorators, { kind: "field", name: "totalJobsCleaned", static: false, private: false, access: { has: obj => "totalJobsCleaned" in obj, get: obj => obj.totalJobsCleaned, set: (obj, value) => { obj.totalJobsCleaned = value; } }, metadata: _metadata }, _totalJobsCleaned_initializers, _totalJobsCleaned_extraInitializers);
            __esDecorate(null, null, _cleanedAt_decorators, { kind: "field", name: "cleanedAt", static: false, private: false, access: { has: obj => "cleanedAt" in obj, get: obj => obj.cleanedAt, set: (obj, value) => { obj.cleanedAt = value; } }, metadata: _metadata }, _cleanedAt_initializers, _cleanedAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        importJobsCleaned = __runInitializers(this, _importJobsCleaned_initializers, void 0);
        exportJobsCleaned = (__runInitializers(this, _importJobsCleaned_extraInitializers), __runInitializers(this, _exportJobsCleaned_initializers, void 0));
        totalJobsCleaned = (__runInitializers(this, _exportJobsCleaned_extraInitializers), __runInitializers(this, _totalJobsCleaned_initializers, void 0));
        cleanedAt = (__runInitializers(this, _totalJobsCleaned_extraInitializers), __runInitializers(this, _cleanedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _cleanedAt_extraInitializers);
        }
    };
})();
exports.CleanupResultDto = CleanupResultDto;
let JobListResponseDto = (() => {
    let _jobs_decorators;
    let _jobs_initializers = [];
    let _jobs_extraInitializers = [];
    let _total_decorators;
    let _total_initializers = [];
    let _total_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return class JobListResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _jobs_decorators = [(0, swagger_1.ApiProperty)({ description: 'List of jobs', type: [JobSummaryDto] })];
            _total_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total count' })];
            _page_decorators = [(0, swagger_1.ApiProperty)({ description: 'Current page' })];
            _limit_decorators = [(0, swagger_1.ApiProperty)({ description: 'Items per page' })];
            __esDecorate(null, null, _jobs_decorators, { kind: "field", name: "jobs", static: false, private: false, access: { has: obj => "jobs" in obj, get: obj => obj.jobs, set: (obj, value) => { obj.jobs = value; } }, metadata: _metadata }, _jobs_initializers, _jobs_extraInitializers);
            __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: obj => "total" in obj, get: obj => obj.total, set: (obj, value) => { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        jobs = __runInitializers(this, _jobs_initializers, void 0);
        total = (__runInitializers(this, _jobs_extraInitializers), __runInitializers(this, _total_initializers, void 0));
        page = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _page_initializers, void 0));
        limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
        constructor() {
            __runInitializers(this, _limit_extraInitializers);
        }
    };
})();
exports.JobListResponseDto = JobListResponseDto;
let JobCleanupResponseDto = (() => {
    let _cleanedCount_decorators;
    let _cleanedCount_initializers = [];
    let _cleanedCount_extraInitializers = [];
    let _cleanedJobs_decorators;
    let _cleanedJobs_initializers = [];
    let _cleanedJobs_extraInitializers = [];
    let _cleanedAt_decorators;
    let _cleanedAt_initializers = [];
    let _cleanedAt_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    return class JobCleanupResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _cleanedCount_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of jobs cleaned' })];
            _cleanedJobs_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Number of cleaned jobs (alias)' })];
            _cleanedAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Cleanup timestamp' })];
            _error_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Error message if any' })];
            __esDecorate(null, null, _cleanedCount_decorators, { kind: "field", name: "cleanedCount", static: false, private: false, access: { has: obj => "cleanedCount" in obj, get: obj => obj.cleanedCount, set: (obj, value) => { obj.cleanedCount = value; } }, metadata: _metadata }, _cleanedCount_initializers, _cleanedCount_extraInitializers);
            __esDecorate(null, null, _cleanedJobs_decorators, { kind: "field", name: "cleanedJobs", static: false, private: false, access: { has: obj => "cleanedJobs" in obj, get: obj => obj.cleanedJobs, set: (obj, value) => { obj.cleanedJobs = value; } }, metadata: _metadata }, _cleanedJobs_initializers, _cleanedJobs_extraInitializers);
            __esDecorate(null, null, _cleanedAt_decorators, { kind: "field", name: "cleanedAt", static: false, private: false, access: { has: obj => "cleanedAt" in obj, get: obj => obj.cleanedAt, set: (obj, value) => { obj.cleanedAt = value; } }, metadata: _metadata }, _cleanedAt_initializers, _cleanedAt_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        cleanedCount = __runInitializers(this, _cleanedCount_initializers, void 0);
        cleanedJobs = (__runInitializers(this, _cleanedCount_extraInitializers), __runInitializers(this, _cleanedJobs_initializers, void 0));
        cleanedAt = (__runInitializers(this, _cleanedJobs_extraInitializers), __runInitializers(this, _cleanedAt_initializers, void 0));
        error = (__runInitializers(this, _cleanedAt_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        constructor() {
            __runInitializers(this, _error_extraInitializers);
        }
    };
})();
exports.JobCleanupResponseDto = JobCleanupResponseDto;
//# sourceMappingURL=job-management.dto.js.map