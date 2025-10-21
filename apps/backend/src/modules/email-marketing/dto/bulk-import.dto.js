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
exports.ImportResultQueryDto = exports.ImportJobQueryDto = exports.ImportStatisticsDto = exports.CsvValidationDto = exports.ImportResultListDto = exports.ImportResultDto = exports.ImportJobListDto = exports.ImportJobDetailsDto = exports.ImportJobSummaryDto = exports.CreateImportJobDto = exports.ImportOptionsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const import_job_entity_1 = require("../entities/import-job.entity");
let ImportOptionsDto = (() => {
    let _groupIds_decorators;
    let _groupIds_initializers = [];
    let _groupIds_extraInitializers = [];
    let _segmentIds_decorators;
    let _segmentIds_initializers = [];
    let _segmentIds_extraInitializers = [];
    let _duplicateHandling_decorators;
    let _duplicateHandling_initializers = [];
    let _duplicateHandling_extraInitializers = [];
    let _validationThreshold_decorators;
    let _validationThreshold_initializers = [];
    let _validationThreshold_extraInitializers = [];
    let _batchSize_decorators;
    let _batchSize_initializers = [];
    let _batchSize_extraInitializers = [];
    let _columnMapping_decorators;
    let _columnMapping_initializers = [];
    let _columnMapping_extraInitializers = [];
    return class ImportOptionsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _groupIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Group IDs to assign imported subscribers to',
                    example: ['group-1', 'group-2'],
                    type: [String]
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _segmentIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Segment IDs to assign imported subscribers to',
                    example: ['segment-1', 'segment-2'],
                    type: [String]
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _duplicateHandling_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'How to handle duplicate subscribers',
                    enum: ['skip', 'update', 'replace'],
                    example: 'update'
                }), (0, class_validator_1.IsEnum)(['skip', 'update', 'replace'])];
            _validationThreshold_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Minimum confidence score for email validation (0-100)',
                    example: 70,
                    minimum: 0,
                    maximum: 100
                }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100)];
            _batchSize_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Batch size for processing records',
                    example: 100,
                    minimum: 10,
                    maximum: 1000
                }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(10), (0, class_validator_1.Max)(1000)];
            _columnMapping_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Mapping of CSV columns to subscriber fields',
                    example: {
                        'Email Address': 'email',
                        'First Name': 'firstName',
                        'Last Name': 'lastName',
                        'Company': 'company'
                    }
                }), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _groupIds_decorators, { kind: "field", name: "groupIds", static: false, private: false, access: { has: obj => "groupIds" in obj, get: obj => obj.groupIds, set: (obj, value) => { obj.groupIds = value; } }, metadata: _metadata }, _groupIds_initializers, _groupIds_extraInitializers);
            __esDecorate(null, null, _segmentIds_decorators, { kind: "field", name: "segmentIds", static: false, private: false, access: { has: obj => "segmentIds" in obj, get: obj => obj.segmentIds, set: (obj, value) => { obj.segmentIds = value; } }, metadata: _metadata }, _segmentIds_initializers, _segmentIds_extraInitializers);
            __esDecorate(null, null, _duplicateHandling_decorators, { kind: "field", name: "duplicateHandling", static: false, private: false, access: { has: obj => "duplicateHandling" in obj, get: obj => obj.duplicateHandling, set: (obj, value) => { obj.duplicateHandling = value; } }, metadata: _metadata }, _duplicateHandling_initializers, _duplicateHandling_extraInitializers);
            __esDecorate(null, null, _validationThreshold_decorators, { kind: "field", name: "validationThreshold", static: false, private: false, access: { has: obj => "validationThreshold" in obj, get: obj => obj.validationThreshold, set: (obj, value) => { obj.validationThreshold = value; } }, metadata: _metadata }, _validationThreshold_initializers, _validationThreshold_extraInitializers);
            __esDecorate(null, null, _batchSize_decorators, { kind: "field", name: "batchSize", static: false, private: false, access: { has: obj => "batchSize" in obj, get: obj => obj.batchSize, set: (obj, value) => { obj.batchSize = value; } }, metadata: _metadata }, _batchSize_initializers, _batchSize_extraInitializers);
            __esDecorate(null, null, _columnMapping_decorators, { kind: "field", name: "columnMapping", static: false, private: false, access: { has: obj => "columnMapping" in obj, get: obj => obj.columnMapping, set: (obj, value) => { obj.columnMapping = value; } }, metadata: _metadata }, _columnMapping_initializers, _columnMapping_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        groupIds = __runInitializers(this, _groupIds_initializers, void 0);
        segmentIds = (__runInitializers(this, _groupIds_extraInitializers), __runInitializers(this, _segmentIds_initializers, void 0));
        duplicateHandling = (__runInitializers(this, _segmentIds_extraInitializers), __runInitializers(this, _duplicateHandling_initializers, void 0));
        validationThreshold = (__runInitializers(this, _duplicateHandling_extraInitializers), __runInitializers(this, _validationThreshold_initializers, void 0));
        batchSize = (__runInitializers(this, _validationThreshold_extraInitializers), __runInitializers(this, _batchSize_initializers, void 0));
        columnMapping = (__runInitializers(this, _batchSize_extraInitializers), __runInitializers(this, _columnMapping_initializers, void 0));
        constructor() {
            __runInitializers(this, _columnMapping_extraInitializers);
        }
    };
})();
exports.ImportOptionsDto = ImportOptionsDto;
let CreateImportJobDto = (() => {
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    return class CreateImportJobDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _options_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Import options and configuration',
                    type: ImportOptionsDto
                }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => ImportOptionsDto)];
            _userId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'User ID initiating the import',
                    example: 'user-123'
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        options = __runInitializers(this, _options_initializers, void 0);
        userId = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        constructor() {
            __runInitializers(this, _userId_extraInitializers);
        }
    };
})();
exports.CreateImportJobDto = CreateImportJobDto;
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
    let _riskyRecords_decorators;
    let _riskyRecords_initializers = [];
    let _riskyRecords_extraInitializers = [];
    let _duplicateRecords_decorators;
    let _duplicateRecords_initializers = [];
    let _duplicateRecords_extraInitializers = [];
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
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Import job ID',
                    example: 'job-123'
                })];
            _fileName_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Original file name',
                    example: 'subscribers.csv'
                })];
            _status_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Current job status',
                    enum: import_job_entity_1.ImportJobStatus,
                    example: import_job_entity_1.ImportJobStatus.PROCESSING
                })];
            _totalRecords_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of records in file',
                    example: 1000
                })];
            _processedRecords_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of records processed so far',
                    example: 750
                })];
            _validRecords_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of valid records',
                    example: 700
                })];
            _invalidRecords_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of invalid records',
                    example: 30
                })];
            _riskyRecords_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of risky records',
                    example: 20
                })];
            _duplicateRecords_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of duplicate records',
                    example: 50
                })];
            _progressPercentage_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Processing progress percentage',
                    example: 75.5
                })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Job creation timestamp',
                    example: '2024-01-01T12:00:00.000Z'
                })];
            _completedAt_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Job completion timestamp',
                    example: '2024-01-01T12:30:00.000Z'
                })];
            _error_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Error message if job failed',
                    example: 'File parsing failed: Invalid CSV format'
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: obj => "fileName" in obj, get: obj => obj.fileName, set: (obj, value) => { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _totalRecords_decorators, { kind: "field", name: "totalRecords", static: false, private: false, access: { has: obj => "totalRecords" in obj, get: obj => obj.totalRecords, set: (obj, value) => { obj.totalRecords = value; } }, metadata: _metadata }, _totalRecords_initializers, _totalRecords_extraInitializers);
            __esDecorate(null, null, _processedRecords_decorators, { kind: "field", name: "processedRecords", static: false, private: false, access: { has: obj => "processedRecords" in obj, get: obj => obj.processedRecords, set: (obj, value) => { obj.processedRecords = value; } }, metadata: _metadata }, _processedRecords_initializers, _processedRecords_extraInitializers);
            __esDecorate(null, null, _validRecords_decorators, { kind: "field", name: "validRecords", static: false, private: false, access: { has: obj => "validRecords" in obj, get: obj => obj.validRecords, set: (obj, value) => { obj.validRecords = value; } }, metadata: _metadata }, _validRecords_initializers, _validRecords_extraInitializers);
            __esDecorate(null, null, _invalidRecords_decorators, { kind: "field", name: "invalidRecords", static: false, private: false, access: { has: obj => "invalidRecords" in obj, get: obj => obj.invalidRecords, set: (obj, value) => { obj.invalidRecords = value; } }, metadata: _metadata }, _invalidRecords_initializers, _invalidRecords_extraInitializers);
            __esDecorate(null, null, _riskyRecords_decorators, { kind: "field", name: "riskyRecords", static: false, private: false, access: { has: obj => "riskyRecords" in obj, get: obj => obj.riskyRecords, set: (obj, value) => { obj.riskyRecords = value; } }, metadata: _metadata }, _riskyRecords_initializers, _riskyRecords_extraInitializers);
            __esDecorate(null, null, _duplicateRecords_decorators, { kind: "field", name: "duplicateRecords", static: false, private: false, access: { has: obj => "duplicateRecords" in obj, get: obj => obj.duplicateRecords, set: (obj, value) => { obj.duplicateRecords = value; } }, metadata: _metadata }, _duplicateRecords_initializers, _duplicateRecords_extraInitializers);
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
        riskyRecords = (__runInitializers(this, _invalidRecords_extraInitializers), __runInitializers(this, _riskyRecords_initializers, void 0));
        duplicateRecords = (__runInitializers(this, _riskyRecords_extraInitializers), __runInitializers(this, _duplicateRecords_initializers, void 0));
        progressPercentage = (__runInitializers(this, _duplicateRecords_extraInitializers), __runInitializers(this, _progressPercentage_initializers, void 0));
        createdAt = (__runInitializers(this, _progressPercentage_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        completedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
        error = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        constructor() {
            __runInitializers(this, _error_extraInitializers);
        }
    };
})();
exports.ImportJobSummaryDto = ImportJobSummaryDto;
let ImportJobDetailsDto = (() => {
    let _classSuper = ImportJobSummaryDto;
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _columnMapping_decorators;
    let _columnMapping_initializers = [];
    let _columnMapping_extraInitializers = [];
    let _validationSummary_decorators;
    let _validationSummary_initializers = [];
    let _validationSummary_extraInitializers = [];
    let _filePath_decorators;
    let _filePath_initializers = [];
    let _filePath_extraInitializers = [];
    return class ImportJobDetailsDto extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _options_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Import options used for this job',
                    type: ImportOptionsDto
                })];
            _columnMapping_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Column mapping used for this job',
                    example: {
                        'Email Address': 'email',
                        'First Name': 'firstName'
                    }
                })];
            _validationSummary_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Validation summary statistics'
                })];
            _filePath_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File path on server',
                    example: '/temp/uploads/imports/job-123/file.csv'
                })];
            __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(null, null, _columnMapping_decorators, { kind: "field", name: "columnMapping", static: false, private: false, access: { has: obj => "columnMapping" in obj, get: obj => obj.columnMapping, set: (obj, value) => { obj.columnMapping = value; } }, metadata: _metadata }, _columnMapping_initializers, _columnMapping_extraInitializers);
            __esDecorate(null, null, _validationSummary_decorators, { kind: "field", name: "validationSummary", static: false, private: false, access: { has: obj => "validationSummary" in obj, get: obj => obj.validationSummary, set: (obj, value) => { obj.validationSummary = value; } }, metadata: _metadata }, _validationSummary_initializers, _validationSummary_extraInitializers);
            __esDecorate(null, null, _filePath_decorators, { kind: "field", name: "filePath", static: false, private: false, access: { has: obj => "filePath" in obj, get: obj => obj.filePath, set: (obj, value) => { obj.filePath = value; } }, metadata: _metadata }, _filePath_initializers, _filePath_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        options = __runInitializers(this, _options_initializers, void 0);
        columnMapping = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _columnMapping_initializers, void 0));
        validationSummary = (__runInitializers(this, _columnMapping_extraInitializers), __runInitializers(this, _validationSummary_initializers, void 0));
        filePath = (__runInitializers(this, _validationSummary_extraInitializers), __runInitializers(this, _filePath_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _filePath_extraInitializers);
        }
    };
})();
exports.ImportJobDetailsDto = ImportJobDetailsDto;
let ImportJobListDto = (() => {
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
    return class ImportJobListDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _jobs_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of import jobs',
                    type: [ImportJobSummaryDto]
                })];
            _total_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of jobs',
                    example: 25
                })];
            _page_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Current page number',
                    example: 1
                })];
            _limit_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of jobs per page',
                    example: 20
                })];
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
exports.ImportJobListDto = ImportJobListDto;
let ImportResultDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
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
    let _rowNumber_decorators;
    let _rowNumber_initializers = [];
    let _rowNumber_extraInitializers = [];
    let _subscriberId_decorators;
    let _subscriberId_initializers = [];
    let _subscriberId_extraInitializers = [];
    return class ImportResultDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Result ID',
                    example: 'result-123'
                })];
            _email_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Email address from CSV',
                    example: 'user@example.com'
                })];
            _status_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Validation result status',
                    enum: ['valid', 'invalid', 'risky', 'duplicate'],
                    example: 'valid'
                })];
            _confidenceScore_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Confidence score (0-100)',
                    example: 85
                })];
            _validationDetails_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Detailed validation information'
                })];
            _issues_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Issues found during validation',
                    example: ['Domain has poor reputation', 'Possible typo in domain']
                })];
            _suggestions_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Suggestions for improvement',
                    example: ['Consider using gmail.com instead of gmai.com']
                })];
            _imported_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether the record was successfully imported',
                    example: true
                })];
            _error_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Error message if import failed',
                    example: 'Subscriber already exists with different data'
                })];
            _rowNumber_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Row number in original CSV file',
                    example: 15
                })];
            _subscriberId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'ID of created/updated subscriber',
                    example: 'subscriber-456'
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _confidenceScore_decorators, { kind: "field", name: "confidenceScore", static: false, private: false, access: { has: obj => "confidenceScore" in obj, get: obj => obj.confidenceScore, set: (obj, value) => { obj.confidenceScore = value; } }, metadata: _metadata }, _confidenceScore_initializers, _confidenceScore_extraInitializers);
            __esDecorate(null, null, _validationDetails_decorators, { kind: "field", name: "validationDetails", static: false, private: false, access: { has: obj => "validationDetails" in obj, get: obj => obj.validationDetails, set: (obj, value) => { obj.validationDetails = value; } }, metadata: _metadata }, _validationDetails_initializers, _validationDetails_extraInitializers);
            __esDecorate(null, null, _issues_decorators, { kind: "field", name: "issues", static: false, private: false, access: { has: obj => "issues" in obj, get: obj => obj.issues, set: (obj, value) => { obj.issues = value; } }, metadata: _metadata }, _issues_initializers, _issues_extraInitializers);
            __esDecorate(null, null, _suggestions_decorators, { kind: "field", name: "suggestions", static: false, private: false, access: { has: obj => "suggestions" in obj, get: obj => obj.suggestions, set: (obj, value) => { obj.suggestions = value; } }, metadata: _metadata }, _suggestions_initializers, _suggestions_extraInitializers);
            __esDecorate(null, null, _imported_decorators, { kind: "field", name: "imported", static: false, private: false, access: { has: obj => "imported" in obj, get: obj => obj.imported, set: (obj, value) => { obj.imported = value; } }, metadata: _metadata }, _imported_initializers, _imported_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _rowNumber_decorators, { kind: "field", name: "rowNumber", static: false, private: false, access: { has: obj => "rowNumber" in obj, get: obj => obj.rowNumber, set: (obj, value) => { obj.rowNumber = value; } }, metadata: _metadata }, _rowNumber_initializers, _rowNumber_extraInitializers);
            __esDecorate(null, null, _subscriberId_decorators, { kind: "field", name: "subscriberId", static: false, private: false, access: { has: obj => "subscriberId" in obj, get: obj => obj.subscriberId, set: (obj, value) => { obj.subscriberId = value; } }, metadata: _metadata }, _subscriberId_initializers, _subscriberId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        email = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _email_initializers, void 0));
        status = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        confidenceScore = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _confidenceScore_initializers, void 0));
        validationDetails = (__runInitializers(this, _confidenceScore_extraInitializers), __runInitializers(this, _validationDetails_initializers, void 0));
        issues = (__runInitializers(this, _validationDetails_extraInitializers), __runInitializers(this, _issues_initializers, void 0));
        suggestions = (__runInitializers(this, _issues_extraInitializers), __runInitializers(this, _suggestions_initializers, void 0));
        imported = (__runInitializers(this, _suggestions_extraInitializers), __runInitializers(this, _imported_initializers, void 0));
        error = (__runInitializers(this, _imported_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        rowNumber = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _rowNumber_initializers, void 0));
        subscriberId = (__runInitializers(this, _rowNumber_extraInitializers), __runInitializers(this, _subscriberId_initializers, void 0));
        constructor() {
            __runInitializers(this, _subscriberId_extraInitializers);
        }
    };
})();
exports.ImportResultDto = ImportResultDto;
let ImportResultListDto = (() => {
    let _results_decorators;
    let _results_initializers = [];
    let _results_extraInitializers = [];
    let _total_decorators;
    let _total_initializers = [];
    let _total_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return class ImportResultListDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _results_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of import results',
                    type: [ImportResultDto]
                })];
            _total_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of results',
                    example: 1000
                })];
            _page_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Current page number',
                    example: 1
                })];
            _limit_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of results per page',
                    example: 100
                })];
            __esDecorate(null, null, _results_decorators, { kind: "field", name: "results", static: false, private: false, access: { has: obj => "results" in obj, get: obj => obj.results, set: (obj, value) => { obj.results = value; } }, metadata: _metadata }, _results_initializers, _results_extraInitializers);
            __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: obj => "total" in obj, get: obj => obj.total, set: (obj, value) => { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        results = __runInitializers(this, _results_initializers, void 0);
        total = (__runInitializers(this, _results_extraInitializers), __runInitializers(this, _total_initializers, void 0));
        page = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _page_initializers, void 0));
        limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
        constructor() {
            __runInitializers(this, _limit_extraInitializers);
        }
    };
})();
exports.ImportResultListDto = ImportResultListDto;
let CsvValidationDto = (() => {
    let _isValid_decorators;
    let _isValid_initializers = [];
    let _isValid_extraInitializers = [];
    let _headers_decorators;
    let _headers_initializers = [];
    let _headers_extraInitializers = [];
    let _sampleData_decorators;
    let _sampleData_initializers = [];
    let _sampleData_extraInitializers = [];
    let _suggestions_decorators;
    let _suggestions_initializers = [];
    let _suggestions_extraInitializers = [];
    let _errors_decorators;
    let _errors_initializers = [];
    let _errors_extraInitializers = [];
    return class CsvValidationDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _isValid_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether the CSV structure is valid',
                    example: true
                })];
            _headers_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'CSV column headers',
                    example: ['Email Address', 'First Name', 'Last Name', 'Company']
                })];
            _sampleData_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Sample data rows (first 5 rows)',
                    example: [
                        { 'Email Address': 'user1@example.com', 'First Name': 'John', 'Last Name': 'Doe' },
                        { 'Email Address': 'user2@example.com', 'First Name': 'Jane', 'Last Name': 'Smith' }
                    ]
                })];
            _suggestions_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Suggested column mappings',
                    example: [
                        { csvColumn: 'Email Address', suggestedField: 'email', confidence: 0.9 },
                        { csvColumn: 'First Name', suggestedField: 'firstName', confidence: 0.8 }
                    ]
                })];
            _errors_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Validation errors if any',
                    example: ['Missing required email column', 'Invalid CSV format on line 15']
                })];
            __esDecorate(null, null, _isValid_decorators, { kind: "field", name: "isValid", static: false, private: false, access: { has: obj => "isValid" in obj, get: obj => obj.isValid, set: (obj, value) => { obj.isValid = value; } }, metadata: _metadata }, _isValid_initializers, _isValid_extraInitializers);
            __esDecorate(null, null, _headers_decorators, { kind: "field", name: "headers", static: false, private: false, access: { has: obj => "headers" in obj, get: obj => obj.headers, set: (obj, value) => { obj.headers = value; } }, metadata: _metadata }, _headers_initializers, _headers_extraInitializers);
            __esDecorate(null, null, _sampleData_decorators, { kind: "field", name: "sampleData", static: false, private: false, access: { has: obj => "sampleData" in obj, get: obj => obj.sampleData, set: (obj, value) => { obj.sampleData = value; } }, metadata: _metadata }, _sampleData_initializers, _sampleData_extraInitializers);
            __esDecorate(null, null, _suggestions_decorators, { kind: "field", name: "suggestions", static: false, private: false, access: { has: obj => "suggestions" in obj, get: obj => obj.suggestions, set: (obj, value) => { obj.suggestions = value; } }, metadata: _metadata }, _suggestions_initializers, _suggestions_extraInitializers);
            __esDecorate(null, null, _errors_decorators, { kind: "field", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors, set: (obj, value) => { obj.errors = value; } }, metadata: _metadata }, _errors_initializers, _errors_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        isValid = __runInitializers(this, _isValid_initializers, void 0);
        headers = (__runInitializers(this, _isValid_extraInitializers), __runInitializers(this, _headers_initializers, void 0));
        sampleData = (__runInitializers(this, _headers_extraInitializers), __runInitializers(this, _sampleData_initializers, void 0));
        suggestions = (__runInitializers(this, _sampleData_extraInitializers), __runInitializers(this, _suggestions_initializers, void 0));
        errors = (__runInitializers(this, _suggestions_extraInitializers), __runInitializers(this, _errors_initializers, void 0));
        constructor() {
            __runInitializers(this, _errors_extraInitializers);
        }
    };
})();
exports.CsvValidationDto = CsvValidationDto;
let ImportStatisticsDto = (() => {
    let _totalJobs_decorators;
    let _totalJobs_initializers = [];
    let _totalJobs_extraInitializers = [];
    let _completedJobs_decorators;
    let _completedJobs_initializers = [];
    let _completedJobs_extraInitializers = [];
    let _failedJobs_decorators;
    let _failedJobs_initializers = [];
    let _failedJobs_extraInitializers = [];
    let _totalRecordsProcessed_decorators;
    let _totalRecordsProcessed_initializers = [];
    let _totalRecordsProcessed_extraInitializers = [];
    let _totalValidRecords_decorators;
    let _totalValidRecords_initializers = [];
    let _totalValidRecords_extraInitializers = [];
    let _averageSuccessRate_decorators;
    let _averageSuccessRate_initializers = [];
    let _averageSuccessRate_extraInitializers = [];
    return class ImportStatisticsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _totalJobs_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of import jobs',
                    example: 25
                })];
            _completedJobs_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of completed jobs',
                    example: 20
                })];
            _failedJobs_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of failed jobs',
                    example: 2
                })];
            _totalRecordsProcessed_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total records processed across all jobs',
                    example: 50000
                })];
            _totalValidRecords_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total valid records across all jobs',
                    example: 45000
                })];
            _averageSuccessRate_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Average success rate percentage',
                    example: 90.5
                })];
            __esDecorate(null, null, _totalJobs_decorators, { kind: "field", name: "totalJobs", static: false, private: false, access: { has: obj => "totalJobs" in obj, get: obj => obj.totalJobs, set: (obj, value) => { obj.totalJobs = value; } }, metadata: _metadata }, _totalJobs_initializers, _totalJobs_extraInitializers);
            __esDecorate(null, null, _completedJobs_decorators, { kind: "field", name: "completedJobs", static: false, private: false, access: { has: obj => "completedJobs" in obj, get: obj => obj.completedJobs, set: (obj, value) => { obj.completedJobs = value; } }, metadata: _metadata }, _completedJobs_initializers, _completedJobs_extraInitializers);
            __esDecorate(null, null, _failedJobs_decorators, { kind: "field", name: "failedJobs", static: false, private: false, access: { has: obj => "failedJobs" in obj, get: obj => obj.failedJobs, set: (obj, value) => { obj.failedJobs = value; } }, metadata: _metadata }, _failedJobs_initializers, _failedJobs_extraInitializers);
            __esDecorate(null, null, _totalRecordsProcessed_decorators, { kind: "field", name: "totalRecordsProcessed", static: false, private: false, access: { has: obj => "totalRecordsProcessed" in obj, get: obj => obj.totalRecordsProcessed, set: (obj, value) => { obj.totalRecordsProcessed = value; } }, metadata: _metadata }, _totalRecordsProcessed_initializers, _totalRecordsProcessed_extraInitializers);
            __esDecorate(null, null, _totalValidRecords_decorators, { kind: "field", name: "totalValidRecords", static: false, private: false, access: { has: obj => "totalValidRecords" in obj, get: obj => obj.totalValidRecords, set: (obj, value) => { obj.totalValidRecords = value; } }, metadata: _metadata }, _totalValidRecords_initializers, _totalValidRecords_extraInitializers);
            __esDecorate(null, null, _averageSuccessRate_decorators, { kind: "field", name: "averageSuccessRate", static: false, private: false, access: { has: obj => "averageSuccessRate" in obj, get: obj => obj.averageSuccessRate, set: (obj, value) => { obj.averageSuccessRate = value; } }, metadata: _metadata }, _averageSuccessRate_initializers, _averageSuccessRate_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        totalJobs = __runInitializers(this, _totalJobs_initializers, void 0);
        completedJobs = (__runInitializers(this, _totalJobs_extraInitializers), __runInitializers(this, _completedJobs_initializers, void 0));
        failedJobs = (__runInitializers(this, _completedJobs_extraInitializers), __runInitializers(this, _failedJobs_initializers, void 0));
        totalRecordsProcessed = (__runInitializers(this, _failedJobs_extraInitializers), __runInitializers(this, _totalRecordsProcessed_initializers, void 0));
        totalValidRecords = (__runInitializers(this, _totalRecordsProcessed_extraInitializers), __runInitializers(this, _totalValidRecords_initializers, void 0));
        averageSuccessRate = (__runInitializers(this, _totalValidRecords_extraInitializers), __runInitializers(this, _averageSuccessRate_initializers, void 0));
        constructor() {
            __runInitializers(this, _averageSuccessRate_extraInitializers);
        }
    };
})();
exports.ImportStatisticsDto = ImportStatisticsDto;
let ImportJobQueryDto = (() => {
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return class ImportJobQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by user ID',
                    example: 'user-123'
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by job status',
                    enum: import_job_entity_1.ImportJobStatus,
                    example: import_job_entity_1.ImportJobStatus.COMPLETED
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(import_job_entity_1.ImportJobStatus)];
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Page number for pagination',
                    example: 1,
                    minimum: 1
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Number of items per page',
                    example: 20,
                    minimum: 1,
                    maximum: 100
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        userId = __runInitializers(this, _userId_initializers, void 0);
        status = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        page = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _page_initializers, void 0));
        limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
        constructor() {
            __runInitializers(this, _limit_extraInitializers);
        }
    };
})();
exports.ImportJobQueryDto = ImportJobQueryDto;
let ImportResultQueryDto = (() => {
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return class ImportResultQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by result status',
                    enum: ['valid', 'invalid', 'risky', 'duplicate'],
                    example: 'valid'
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['valid', 'invalid', 'risky', 'duplicate'])];
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Page number for pagination',
                    example: 1,
                    minimum: 1
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Number of items per page',
                    example: 100,
                    minimum: 1,
                    maximum: 500
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(500)];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        status = __runInitializers(this, _status_initializers, void 0);
        page = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _page_initializers, void 0));
        limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
        constructor() {
            __runInitializers(this, _limit_extraInitializers);
        }
    };
})();
exports.ImportResultQueryDto = ImportResultQueryDto;
//# sourceMappingURL=bulk-import.dto.js.map