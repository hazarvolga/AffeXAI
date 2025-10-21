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
exports.ExportResultListDto = exports.ExportStatisticsDto = exports.ExportJobQueryDto = exports.ExportJobDetailsDto = exports.ExportJobSummaryDto = exports.ExportStatsDto = exports.AvailableFieldsResponseDto = exports.ExportJobListDto = exports.ExportJobResponseDto = exports.CreateExportJobDto = exports.DateRangeDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const shared_types_1 = require("@affexai/shared-types");
let DateRangeDto = (() => {
    let _start_decorators;
    let _start_initializers = [];
    let _start_extraInitializers = [];
    let _end_decorators;
    let _end_initializers = [];
    let _end_extraInitializers = [];
    return class DateRangeDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _start_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Start date for filtering' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _end_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'End date for filtering' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            __esDecorate(null, null, _start_decorators, { kind: "field", name: "start", static: false, private: false, access: { has: obj => "start" in obj, get: obj => obj.start, set: (obj, value) => { obj.start = value; } }, metadata: _metadata }, _start_initializers, _start_extraInitializers);
            __esDecorate(null, null, _end_decorators, { kind: "field", name: "end", static: false, private: false, access: { has: obj => "end" in obj, get: obj => obj.end, set: (obj, value) => { obj.end = value; } }, metadata: _metadata }, _end_initializers, _end_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        start = __runInitializers(this, _start_initializers, void 0);
        end = (__runInitializers(this, _start_extraInitializers), __runInitializers(this, _end_initializers, void 0));
        constructor() {
            __runInitializers(this, _end_extraInitializers);
        }
    };
})();
exports.DateRangeDto = DateRangeDto;
let CreateExportJobDto = (() => {
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _groupIds_decorators;
    let _groupIds_initializers = [];
    let _groupIds_extraInitializers = [];
    let _segmentIds_decorators;
    let _segmentIds_initializers = [];
    let _segmentIds_extraInitializers = [];
    let _dateRange_decorators;
    let _dateRange_initializers = [];
    let _dateRange_extraInitializers = [];
    let _validationStatus_decorators;
    let _validationStatus_initializers = [];
    let _validationStatus_extraInitializers = [];
    let _fields_decorators;
    let _fields_initializers = [];
    let _fields_extraInitializers = [];
    let _format_decorators;
    let _format_initializers = [];
    let _format_extraInitializers = [];
    let _includeMetadata_decorators;
    let _includeMetadata_initializers = [];
    let _includeMetadata_extraInitializers = [];
    let _batchSize_decorators;
    let _batchSize_initializers = [];
    let _batchSize_extraInitializers = [];
    return class CreateExportJobDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter subscribers by status',
                    enum: shared_types_1.SubscriberStatus,
                    isArray: true
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEnum)(shared_types_1.SubscriberStatus, { each: true })];
            _groupIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter subscribers by group IDs',
                    type: [String]
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _segmentIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter subscribers by segment IDs',
                    type: [String]
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _dateRange_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Date range for filtering subscribers',
                    type: DateRangeDto
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => DateRangeDto)];
            _validationStatus_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by email validation status',
                    type: [String]
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _fields_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Fields to include in export',
                    type: [String],
                    example: ['email', 'firstName', 'lastName', 'status']
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ArrayNotEmpty)(), (0, class_validator_1.IsString)({ each: true })];
            _format_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Export format',
                    enum: ['csv', 'xlsx']
                }), (0, class_validator_1.IsIn)(['csv', 'xlsx'])];
            _includeMetadata_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Include metadata fields in export',
                    default: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _batchSize_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Batch size for processing',
                    minimum: 100,
                    maximum: 10000,
                    default: 1000
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(100), (0, class_validator_1.Max)(10000)];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _groupIds_decorators, { kind: "field", name: "groupIds", static: false, private: false, access: { has: obj => "groupIds" in obj, get: obj => obj.groupIds, set: (obj, value) => { obj.groupIds = value; } }, metadata: _metadata }, _groupIds_initializers, _groupIds_extraInitializers);
            __esDecorate(null, null, _segmentIds_decorators, { kind: "field", name: "segmentIds", static: false, private: false, access: { has: obj => "segmentIds" in obj, get: obj => obj.segmentIds, set: (obj, value) => { obj.segmentIds = value; } }, metadata: _metadata }, _segmentIds_initializers, _segmentIds_extraInitializers);
            __esDecorate(null, null, _dateRange_decorators, { kind: "field", name: "dateRange", static: false, private: false, access: { has: obj => "dateRange" in obj, get: obj => obj.dateRange, set: (obj, value) => { obj.dateRange = value; } }, metadata: _metadata }, _dateRange_initializers, _dateRange_extraInitializers);
            __esDecorate(null, null, _validationStatus_decorators, { kind: "field", name: "validationStatus", static: false, private: false, access: { has: obj => "validationStatus" in obj, get: obj => obj.validationStatus, set: (obj, value) => { obj.validationStatus = value; } }, metadata: _metadata }, _validationStatus_initializers, _validationStatus_extraInitializers);
            __esDecorate(null, null, _fields_decorators, { kind: "field", name: "fields", static: false, private: false, access: { has: obj => "fields" in obj, get: obj => obj.fields, set: (obj, value) => { obj.fields = value; } }, metadata: _metadata }, _fields_initializers, _fields_extraInitializers);
            __esDecorate(null, null, _format_decorators, { kind: "field", name: "format", static: false, private: false, access: { has: obj => "format" in obj, get: obj => obj.format, set: (obj, value) => { obj.format = value; } }, metadata: _metadata }, _format_initializers, _format_extraInitializers);
            __esDecorate(null, null, _includeMetadata_decorators, { kind: "field", name: "includeMetadata", static: false, private: false, access: { has: obj => "includeMetadata" in obj, get: obj => obj.includeMetadata, set: (obj, value) => { obj.includeMetadata = value; } }, metadata: _metadata }, _includeMetadata_initializers, _includeMetadata_extraInitializers);
            __esDecorate(null, null, _batchSize_decorators, { kind: "field", name: "batchSize", static: false, private: false, access: { has: obj => "batchSize" in obj, get: obj => obj.batchSize, set: (obj, value) => { obj.batchSize = value; } }, metadata: _metadata }, _batchSize_initializers, _batchSize_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        status = __runInitializers(this, _status_initializers, void 0);
        groupIds = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _groupIds_initializers, void 0));
        segmentIds = (__runInitializers(this, _groupIds_extraInitializers), __runInitializers(this, _segmentIds_initializers, void 0));
        dateRange = (__runInitializers(this, _segmentIds_extraInitializers), __runInitializers(this, _dateRange_initializers, void 0));
        validationStatus = (__runInitializers(this, _dateRange_extraInitializers), __runInitializers(this, _validationStatus_initializers, void 0));
        fields = (__runInitializers(this, _validationStatus_extraInitializers), __runInitializers(this, _fields_initializers, void 0));
        format = (__runInitializers(this, _fields_extraInitializers), __runInitializers(this, _format_initializers, void 0));
        includeMetadata = (__runInitializers(this, _format_extraInitializers), __runInitializers(this, _includeMetadata_initializers, false));
        batchSize = (__runInitializers(this, _includeMetadata_extraInitializers), __runInitializers(this, _batchSize_initializers, 1000));
        constructor() {
            __runInitializers(this, _batchSize_extraInitializers);
        }
    };
})();
exports.CreateExportJobDto = CreateExportJobDto;
let ExportJobResponseDto = (() => {
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
    let _fileSizeBytes_decorators;
    let _fileSizeBytes_initializers = [];
    let _fileSizeBytes_extraInitializers = [];
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
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    return class ExportJobResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Export job ID' })];
            _fileName_decorators = [(0, swagger_1.ApiProperty)({ description: 'Export file name' })];
            _status_decorators = [(0, swagger_1.ApiProperty)({ description: 'Export job status' })];
            _totalRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total records to export' })];
            _processedRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Records processed so far' })];
            _progressPercentage_decorators = [(0, swagger_1.ApiProperty)({ description: 'Progress percentage' })];
            _fileSizeBytes_decorators = [(0, swagger_1.ApiProperty)({ description: 'File size in bytes', nullable: true })];
            _filters_decorators = [(0, swagger_1.ApiProperty)({ description: 'Export filters used' })];
            _options_decorators = [(0, swagger_1.ApiProperty)({ description: 'Export options used' })];
            _error_decorators = [(0, swagger_1.ApiProperty)({ description: 'Error message if failed', nullable: true })];
            _completedAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Job completion date', nullable: true })];
            _expiresAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'File expiration date' })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Job creation date' })];
            _updatedAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Job last update date' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: obj => "fileName" in obj, get: obj => obj.fileName, set: (obj, value) => { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _totalRecords_decorators, { kind: "field", name: "totalRecords", static: false, private: false, access: { has: obj => "totalRecords" in obj, get: obj => obj.totalRecords, set: (obj, value) => { obj.totalRecords = value; } }, metadata: _metadata }, _totalRecords_initializers, _totalRecords_extraInitializers);
            __esDecorate(null, null, _processedRecords_decorators, { kind: "field", name: "processedRecords", static: false, private: false, access: { has: obj => "processedRecords" in obj, get: obj => obj.processedRecords, set: (obj, value) => { obj.processedRecords = value; } }, metadata: _metadata }, _processedRecords_initializers, _processedRecords_extraInitializers);
            __esDecorate(null, null, _progressPercentage_decorators, { kind: "field", name: "progressPercentage", static: false, private: false, access: { has: obj => "progressPercentage" in obj, get: obj => obj.progressPercentage, set: (obj, value) => { obj.progressPercentage = value; } }, metadata: _metadata }, _progressPercentage_initializers, _progressPercentage_extraInitializers);
            __esDecorate(null, null, _fileSizeBytes_decorators, { kind: "field", name: "fileSizeBytes", static: false, private: false, access: { has: obj => "fileSizeBytes" in obj, get: obj => obj.fileSizeBytes, set: (obj, value) => { obj.fileSizeBytes = value; } }, metadata: _metadata }, _fileSizeBytes_initializers, _fileSizeBytes_extraInitializers);
            __esDecorate(null, null, _filters_decorators, { kind: "field", name: "filters", static: false, private: false, access: { has: obj => "filters" in obj, get: obj => obj.filters, set: (obj, value) => { obj.filters = value; } }, metadata: _metadata }, _filters_initializers, _filters_extraInitializers);
            __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: obj => "completedAt" in obj, get: obj => obj.completedAt, set: (obj, value) => { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
            __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: obj => "expiresAt" in obj, get: obj => obj.expiresAt, set: (obj, value) => { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        fileName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _fileName_initializers, void 0));
        status = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        totalRecords = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _totalRecords_initializers, void 0));
        processedRecords = (__runInitializers(this, _totalRecords_extraInitializers), __runInitializers(this, _processedRecords_initializers, void 0));
        progressPercentage = (__runInitializers(this, _processedRecords_extraInitializers), __runInitializers(this, _progressPercentage_initializers, void 0));
        fileSizeBytes = (__runInitializers(this, _progressPercentage_extraInitializers), __runInitializers(this, _fileSizeBytes_initializers, void 0));
        filters = (__runInitializers(this, _fileSizeBytes_extraInitializers), __runInitializers(this, _filters_initializers, void 0));
        options = (__runInitializers(this, _filters_extraInitializers), __runInitializers(this, _options_initializers, void 0));
        error = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        completedAt = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
        expiresAt = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
        createdAt = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
})();
exports.ExportJobResponseDto = ExportJobResponseDto;
let ExportJobListDto = (() => {
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    return class ExportJobListDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Page number for pagination',
                    minimum: 1,
                    default: 1
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Transform)(({ value }) => parseInt(value))];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Number of items per page',
                    minimum: 1,
                    maximum: 100,
                    default: 20
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100), (0, class_transformer_1.Transform)(({ value }) => parseInt(value))];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by job status',
                    enum: ['pending', 'processing', 'completed', 'failed']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsIn)(['pending', 'processing', 'completed', 'failed'])];
            _userId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by user ID'
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        page = __runInitializers(this, _page_initializers, 1);
        limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 20));
        status = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        userId = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        constructor() {
            __runInitializers(this, _userId_extraInitializers);
        }
    };
})();
exports.ExportJobListDto = ExportJobListDto;
let AvailableFieldsResponseDto = (() => {
    let _fields_decorators;
    let _fields_initializers = [];
    let _fields_extraInitializers = [];
    let _descriptions_decorators;
    let _descriptions_initializers = [];
    let _descriptions_extraInitializers = [];
    return class AvailableFieldsResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fields_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of available fields for export',
                    type: [String]
                })];
            _descriptions_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Field descriptions',
                    type: 'object',
                    additionalProperties: { type: 'string' }
                })];
            __esDecorate(null, null, _fields_decorators, { kind: "field", name: "fields", static: false, private: false, access: { has: obj => "fields" in obj, get: obj => obj.fields, set: (obj, value) => { obj.fields = value; } }, metadata: _metadata }, _fields_initializers, _fields_extraInitializers);
            __esDecorate(null, null, _descriptions_decorators, { kind: "field", name: "descriptions", static: false, private: false, access: { has: obj => "descriptions" in obj, get: obj => obj.descriptions, set: (obj, value) => { obj.descriptions = value; } }, metadata: _metadata }, _descriptions_initializers, _descriptions_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        fields = __runInitializers(this, _fields_initializers, void 0);
        descriptions = (__runInitializers(this, _fields_extraInitializers), __runInitializers(this, _descriptions_initializers, void 0));
        constructor() {
            __runInitializers(this, _descriptions_extraInitializers);
        }
    };
})();
exports.AvailableFieldsResponseDto = AvailableFieldsResponseDto;
let ExportStatsDto = (() => {
    let _totalSubscribers_decorators;
    let _totalSubscribers_initializers = [];
    let _totalSubscribers_extraInitializers = [];
    let _estimatedFileSizeBytes_decorators;
    let _estimatedFileSizeBytes_initializers = [];
    let _estimatedFileSizeBytes_extraInitializers = [];
    let _estimatedProcessingTimeSeconds_decorators;
    let _estimatedProcessingTimeSeconds_initializers = [];
    let _estimatedProcessingTimeSeconds_extraInitializers = [];
    return class ExportStatsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _totalSubscribers_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total number of subscribers matching filters' })];
            _estimatedFileSizeBytes_decorators = [(0, swagger_1.ApiProperty)({ description: 'Estimated file size in bytes' })];
            _estimatedProcessingTimeSeconds_decorators = [(0, swagger_1.ApiProperty)({ description: 'Estimated processing time in seconds' })];
            __esDecorate(null, null, _totalSubscribers_decorators, { kind: "field", name: "totalSubscribers", static: false, private: false, access: { has: obj => "totalSubscribers" in obj, get: obj => obj.totalSubscribers, set: (obj, value) => { obj.totalSubscribers = value; } }, metadata: _metadata }, _totalSubscribers_initializers, _totalSubscribers_extraInitializers);
            __esDecorate(null, null, _estimatedFileSizeBytes_decorators, { kind: "field", name: "estimatedFileSizeBytes", static: false, private: false, access: { has: obj => "estimatedFileSizeBytes" in obj, get: obj => obj.estimatedFileSizeBytes, set: (obj, value) => { obj.estimatedFileSizeBytes = value; } }, metadata: _metadata }, _estimatedFileSizeBytes_initializers, _estimatedFileSizeBytes_extraInitializers);
            __esDecorate(null, null, _estimatedProcessingTimeSeconds_decorators, { kind: "field", name: "estimatedProcessingTimeSeconds", static: false, private: false, access: { has: obj => "estimatedProcessingTimeSeconds" in obj, get: obj => obj.estimatedProcessingTimeSeconds, set: (obj, value) => { obj.estimatedProcessingTimeSeconds = value; } }, metadata: _metadata }, _estimatedProcessingTimeSeconds_initializers, _estimatedProcessingTimeSeconds_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        totalSubscribers = __runInitializers(this, _totalSubscribers_initializers, void 0);
        estimatedFileSizeBytes = (__runInitializers(this, _totalSubscribers_extraInitializers), __runInitializers(this, _estimatedFileSizeBytes_initializers, void 0));
        estimatedProcessingTimeSeconds = (__runInitializers(this, _estimatedFileSizeBytes_extraInitializers), __runInitializers(this, _estimatedProcessingTimeSeconds_initializers, void 0));
        constructor() {
            __runInitializers(this, _estimatedProcessingTimeSeconds_extraInitializers);
        }
    };
})();
exports.ExportStatsDto = ExportStatsDto;
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
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Export job ID' })];
            _fileName_decorators = [(0, swagger_1.ApiProperty)({ description: 'File name' })];
            _status_decorators = [(0, swagger_1.ApiProperty)({ description: 'Export status' })];
            _totalRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total records to export' })];
            _processedRecords_decorators = [(0, swagger_1.ApiProperty)({ description: 'Processed records' })];
            _progressPercentage_decorators = [(0, swagger_1.ApiProperty)({ description: 'Progress percentage' })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Created at timestamp' })];
            _completedAt_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Completed at timestamp' })];
            _error_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Error message if failed' })];
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
let ExportJobDetailsDto = (() => {
    let _classSuper = ExportJobSummaryDto;
    let _filters_decorators;
    let _filters_initializers = [];
    let _filters_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _filePath_decorators;
    let _filePath_initializers = [];
    let _filePath_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    return class ExportJobDetailsDto extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _filters_decorators = [(0, swagger_1.ApiProperty)({ description: 'Export filters' })];
            _options_decorators = [(0, swagger_1.ApiProperty)({ description: 'Export options' })];
            _filePath_decorators = [(0, swagger_1.ApiProperty)({ description: 'File path on server' })];
            _userId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'User ID who created the export' })];
            __esDecorate(null, null, _filters_decorators, { kind: "field", name: "filters", static: false, private: false, access: { has: obj => "filters" in obj, get: obj => obj.filters, set: (obj, value) => { obj.filters = value; } }, metadata: _metadata }, _filters_initializers, _filters_extraInitializers);
            __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(null, null, _filePath_decorators, { kind: "field", name: "filePath", static: false, private: false, access: { has: obj => "filePath" in obj, get: obj => obj.filePath, set: (obj, value) => { obj.filePath = value; } }, metadata: _metadata }, _filePath_initializers, _filePath_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        filters = __runInitializers(this, _filters_initializers, void 0);
        options = (__runInitializers(this, _filters_extraInitializers), __runInitializers(this, _options_initializers, void 0));
        filePath = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _filePath_initializers, void 0));
        userId = (__runInitializers(this, _filePath_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _userId_extraInitializers);
        }
    };
})();
exports.ExportJobDetailsDto = ExportJobDetailsDto;
let ExportJobQueryDto = (() => {
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _startDate_decorators;
    let _startDate_initializers = [];
    let _startDate_extraInitializers = [];
    let _endDate_decorators;
    let _endDate_initializers = [];
    let _endDate_extraInitializers = [];
    let _dateRange_decorators;
    let _dateRange_initializers = [];
    let _dateRange_extraInitializers = [];
    return class ExportJobQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by status',
                    enum: shared_types_1.SubscriberStatus,
                    isArray: true
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEnum)(shared_types_1.SubscriberStatus, { each: true })];
            _userId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by user ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _startDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Start date for filtering' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _endDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'End date for filtering' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _dateRange_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Date range for filtering',
                    type: DateRangeDto
                }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: obj => "startDate" in obj, get: obj => obj.startDate, set: (obj, value) => { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: obj => "endDate" in obj, get: obj => obj.endDate, set: (obj, value) => { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _dateRange_decorators, { kind: "field", name: "dateRange", static: false, private: false, access: { has: obj => "dateRange" in obj, get: obj => obj.dateRange, set: (obj, value) => { obj.dateRange = value; } }, metadata: _metadata }, _dateRange_initializers, _dateRange_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        status = __runInitializers(this, _status_initializers, void 0);
        userId = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        startDate = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
        endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
        dateRange = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _dateRange_initializers, void 0));
        constructor() {
            __runInitializers(this, _dateRange_extraInitializers);
        }
    };
})();
exports.ExportJobQueryDto = ExportJobQueryDto;
let ExportStatisticsDto = (() => {
    let _totalSubscribers_decorators;
    let _totalSubscribers_initializers = [];
    let _totalSubscribers_extraInitializers = [];
    let _totalExports_decorators;
    let _totalExports_initializers = [];
    let _totalExports_extraInitializers = [];
    let _activeExports_decorators;
    let _activeExports_initializers = [];
    let _activeExports_extraInitializers = [];
    let _completedExports_decorators;
    let _completedExports_initializers = [];
    let _completedExports_extraInitializers = [];
    let _failedExports_decorators;
    let _failedExports_initializers = [];
    let _failedExports_extraInitializers = [];
    let _totalRecordsExported_decorators;
    let _totalRecordsExported_initializers = [];
    let _totalRecordsExported_extraInitializers = [];
    let _estimatedFileSizeBytes_decorators;
    let _estimatedFileSizeBytes_initializers = [];
    let _estimatedFileSizeBytes_extraInitializers = [];
    let _estimatedProcessingTimeSeconds_decorators;
    let _estimatedProcessingTimeSeconds_initializers = [];
    let _estimatedProcessingTimeSeconds_extraInitializers = [];
    return class ExportStatisticsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _totalSubscribers_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total subscribers matching filters' })];
            _totalExports_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total exports' })];
            _activeExports_decorators = [(0, swagger_1.ApiProperty)({ description: 'Active exports' })];
            _completedExports_decorators = [(0, swagger_1.ApiProperty)({ description: 'Completed exports' })];
            _failedExports_decorators = [(0, swagger_1.ApiProperty)({ description: 'Failed exports' })];
            _totalRecordsExported_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total records exported' })];
            _estimatedFileSizeBytes_decorators = [(0, swagger_1.ApiProperty)({ description: 'Estimated file size in bytes' })];
            _estimatedProcessingTimeSeconds_decorators = [(0, swagger_1.ApiProperty)({ description: 'Estimated processing time in seconds' })];
            __esDecorate(null, null, _totalSubscribers_decorators, { kind: "field", name: "totalSubscribers", static: false, private: false, access: { has: obj => "totalSubscribers" in obj, get: obj => obj.totalSubscribers, set: (obj, value) => { obj.totalSubscribers = value; } }, metadata: _metadata }, _totalSubscribers_initializers, _totalSubscribers_extraInitializers);
            __esDecorate(null, null, _totalExports_decorators, { kind: "field", name: "totalExports", static: false, private: false, access: { has: obj => "totalExports" in obj, get: obj => obj.totalExports, set: (obj, value) => { obj.totalExports = value; } }, metadata: _metadata }, _totalExports_initializers, _totalExports_extraInitializers);
            __esDecorate(null, null, _activeExports_decorators, { kind: "field", name: "activeExports", static: false, private: false, access: { has: obj => "activeExports" in obj, get: obj => obj.activeExports, set: (obj, value) => { obj.activeExports = value; } }, metadata: _metadata }, _activeExports_initializers, _activeExports_extraInitializers);
            __esDecorate(null, null, _completedExports_decorators, { kind: "field", name: "completedExports", static: false, private: false, access: { has: obj => "completedExports" in obj, get: obj => obj.completedExports, set: (obj, value) => { obj.completedExports = value; } }, metadata: _metadata }, _completedExports_initializers, _completedExports_extraInitializers);
            __esDecorate(null, null, _failedExports_decorators, { kind: "field", name: "failedExports", static: false, private: false, access: { has: obj => "failedExports" in obj, get: obj => obj.failedExports, set: (obj, value) => { obj.failedExports = value; } }, metadata: _metadata }, _failedExports_initializers, _failedExports_extraInitializers);
            __esDecorate(null, null, _totalRecordsExported_decorators, { kind: "field", name: "totalRecordsExported", static: false, private: false, access: { has: obj => "totalRecordsExported" in obj, get: obj => obj.totalRecordsExported, set: (obj, value) => { obj.totalRecordsExported = value; } }, metadata: _metadata }, _totalRecordsExported_initializers, _totalRecordsExported_extraInitializers);
            __esDecorate(null, null, _estimatedFileSizeBytes_decorators, { kind: "field", name: "estimatedFileSizeBytes", static: false, private: false, access: { has: obj => "estimatedFileSizeBytes" in obj, get: obj => obj.estimatedFileSizeBytes, set: (obj, value) => { obj.estimatedFileSizeBytes = value; } }, metadata: _metadata }, _estimatedFileSizeBytes_initializers, _estimatedFileSizeBytes_extraInitializers);
            __esDecorate(null, null, _estimatedProcessingTimeSeconds_decorators, { kind: "field", name: "estimatedProcessingTimeSeconds", static: false, private: false, access: { has: obj => "estimatedProcessingTimeSeconds" in obj, get: obj => obj.estimatedProcessingTimeSeconds, set: (obj, value) => { obj.estimatedProcessingTimeSeconds = value; } }, metadata: _metadata }, _estimatedProcessingTimeSeconds_initializers, _estimatedProcessingTimeSeconds_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        totalSubscribers = __runInitializers(this, _totalSubscribers_initializers, void 0);
        totalExports = (__runInitializers(this, _totalSubscribers_extraInitializers), __runInitializers(this, _totalExports_initializers, void 0));
        activeExports = (__runInitializers(this, _totalExports_extraInitializers), __runInitializers(this, _activeExports_initializers, void 0));
        completedExports = (__runInitializers(this, _activeExports_extraInitializers), __runInitializers(this, _completedExports_initializers, void 0));
        failedExports = (__runInitializers(this, _completedExports_extraInitializers), __runInitializers(this, _failedExports_initializers, void 0));
        totalRecordsExported = (__runInitializers(this, _failedExports_extraInitializers), __runInitializers(this, _totalRecordsExported_initializers, void 0));
        estimatedFileSizeBytes = (__runInitializers(this, _totalRecordsExported_extraInitializers), __runInitializers(this, _estimatedFileSizeBytes_initializers, void 0));
        estimatedProcessingTimeSeconds = (__runInitializers(this, _estimatedFileSizeBytes_extraInitializers), __runInitializers(this, _estimatedProcessingTimeSeconds_initializers, void 0));
        constructor() {
            __runInitializers(this, _estimatedProcessingTimeSeconds_extraInitializers);
        }
    };
})();
exports.ExportStatisticsDto = ExportStatisticsDto;
let ExportResultListDto = (() => {
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
    return class ExportResultListDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _results_decorators = [(0, swagger_1.ApiProperty)({ description: 'List of export results' })];
            _total_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total count' })];
            _page_decorators = [(0, swagger_1.ApiProperty)({ description: 'Current page' })];
            _limit_decorators = [(0, swagger_1.ApiProperty)({ description: 'Items per page' })];
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
exports.ExportResultListDto = ExportResultListDto;
//# sourceMappingURL=bulk-export.dto.js.map