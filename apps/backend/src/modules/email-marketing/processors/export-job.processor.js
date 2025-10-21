"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportJobProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const export_job_entity_1 = require("../entities/export-job.entity");
const fs = __importStar(require("fs/promises"));
let ExportJobProcessor = (() => {
    let _classDecorators = [(0, bullmq_1.Processor)('export')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = bullmq_1.WorkerHost;
    let _instanceExtraInitializers = [];
    let _onCompleted_decorators;
    let _onFailed_decorators;
    let _onProgress_decorators;
    let _onStalled_decorators;
    var ExportJobProcessor = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _onCompleted_decorators = [(0, bullmq_1.OnWorkerEvent)('completed')];
            _onFailed_decorators = [(0, bullmq_1.OnWorkerEvent)('failed')];
            _onProgress_decorators = [(0, bullmq_1.OnWorkerEvent)('progress')];
            _onStalled_decorators = [(0, bullmq_1.OnWorkerEvent)('stalled')];
            __esDecorate(this, null, _onCompleted_decorators, { kind: "method", name: "onCompleted", static: false, private: false, access: { has: obj => "onCompleted" in obj, get: obj => obj.onCompleted }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onFailed_decorators, { kind: "method", name: "onFailed", static: false, private: false, access: { has: obj => "onFailed" in obj, get: obj => obj.onFailed }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onProgress_decorators, { kind: "method", name: "onProgress", static: false, private: false, access: { has: obj => "onProgress" in obj, get: obj => obj.onProgress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onStalled_decorators, { kind: "method", name: "onStalled", static: false, private: false, access: { has: obj => "onStalled" in obj, get: obj => obj.onStalled }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExportJobProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        bulkExportService = __runInitializers(this, _instanceExtraInitializers);
        subscriberRepository;
        logger = new common_1.Logger(ExportJobProcessor.name);
        constructor(bulkExportService, subscriberRepository) {
            super();
            this.bulkExportService = bulkExportService;
            this.subscriberRepository = subscriberRepository;
        }
        async process(job) {
            const { jobId, filters, options } = job.data;
            this.logger.log(`Starting export job ${jobId}`);
            try {
                // Update job status to processing
                await this.bulkExportService.updateExportProgress(jobId, 0, 0, export_job_entity_1.ExportJobStatus.PROCESSING);
                // Get total count for progress tracking
                const query = await this.bulkExportService.buildSubscriberQuery(filters);
                const totalRecords = await query.getCount();
                this.logger.log(`Export job ${jobId}: Found ${totalRecords} subscribers to export`);
                // Update total records
                await this.bulkExportService.updateExportProgress(jobId, 0, totalRecords);
                if (totalRecords === 0) {
                    // Handle empty result set
                    await this.handleEmptyExport(jobId, options);
                    return;
                }
                // Process in batches for memory efficiency
                const batchSize = options.batchSize || 1000;
                let processedRecords = 0;
                const allData = [];
                // Stream processing for large datasets
                for (let offset = 0; offset < totalRecords; offset += batchSize) {
                    // Update progress
                    job.updateProgress(Math.round((processedRecords / totalRecords) * 100));
                    // Get batch of subscribers
                    const batchQuery = await this.bulkExportService.buildSubscriberQuery(filters);
                    const subscribers = await batchQuery
                        .skip(offset)
                        .take(batchSize)
                        .getMany();
                    this.logger.log(`Export job ${jobId}: Processing batch ${offset + 1}-${Math.min(offset + batchSize, totalRecords)} of ${totalRecords}`);
                    // Format subscriber data
                    const formattedBatch = await this.bulkExportService.formatSubscriberData(subscribers, options);
                    allData.push(...formattedBatch);
                    processedRecords += subscribers.length;
                    // Update progress in database
                    await this.bulkExportService.updateExportProgress(jobId, processedRecords, totalRecords);
                    // Add small delay to prevent overwhelming the database
                    if (offset + batchSize < totalRecords) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                }
                // Generate the export file
                const exportJob = await this.bulkExportService.getExportStatus(jobId);
                await this.generateExportFile(allData, exportJob.filePath, options.format);
                // Update file size
                await this.bulkExportService.updateFileSize(jobId, exportJob.filePath);
                // Mark job as completed
                await this.bulkExportService.updateExportProgress(jobId, processedRecords, totalRecords, export_job_entity_1.ExportJobStatus.COMPLETED);
                this.logger.log(`Export job ${jobId} completed successfully. Exported ${processedRecords} records.`);
            }
            catch (error) {
                this.logger.error(`Export job ${jobId} failed: ${error.message}`, error.stack);
                // Mark job as failed
                await this.bulkExportService.markExportAsFailed(jobId, `Export processing failed: ${error.message}`);
                throw error;
            }
        }
        /**
         * Handle empty export results
         */
        async handleEmptyExport(jobId, options) {
            try {
                const exportJob = await this.bulkExportService.getExportStatus(jobId);
                // Create empty file with headers
                await this.generateExportFile([], exportJob.filePath, options.format);
                // Update file size
                await this.bulkExportService.updateFileSize(jobId, exportJob.filePath);
                // Mark as completed
                await this.bulkExportService.updateExportProgress(jobId, 0, 0, export_job_entity_1.ExportJobStatus.COMPLETED);
                this.logger.log(`Export job ${jobId} completed with empty result set`);
            }
            catch (error) {
                this.logger.error(`Failed to handle empty export for job ${jobId}: ${error.message}`);
                throw error;
            }
        }
        /**
         * Generate export file based on format
         */
        async generateExportFile(data, filePath, format) {
            try {
                // Ensure directory exists
                const dir = require('path').dirname(filePath);
                await fs.mkdir(dir, { recursive: true });
                if (format === 'csv') {
                    await this.bulkExportService.generateCsvFile(data, filePath);
                }
                else if (format === 'xlsx') {
                    await this.bulkExportService.generateExcelFile(data, filePath);
                }
                else {
                    throw new Error(`Unsupported export format: ${format}`);
                }
                this.logger.log(`Generated ${format.toUpperCase()} file: ${filePath}`);
            }
            catch (error) {
                this.logger.error(`Failed to generate export file: ${error.message}`);
                throw error;
            }
        }
        /**
         * Handle job completion
         */
        onCompleted(job) {
            this.logger.log(`Export job ${job.data.jobId} completed successfully`);
        }
        /**
         * Handle job failure
         */
        onFailed(job, error) {
            this.logger.error(`Export job ${job.data.jobId} failed: ${error.message}`, error.stack);
        }
        /**
         * Handle job progress updates
         */
        onProgress(job, progress) {
            this.logger.log(`Export job ${job.data.jobId} progress: ${progress}%`);
        }
        /**
         * Handle job stalling
         */
        onStalled(job) {
            this.logger.warn(`Export job ${job.data.jobId} stalled`);
        }
    };
    return ExportJobProcessor = _classThis;
})();
exports.ExportJobProcessor = ExportJobProcessor;
//# sourceMappingURL=export-job.processor.js.map