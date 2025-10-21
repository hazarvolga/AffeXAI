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
exports.BatchProcessingService = void 0;
const common_1 = require("@nestjs/common");
let BatchProcessingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BatchProcessingService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BatchProcessingService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        importQueue;
        validationQueue;
        logger = new common_1.Logger(BatchProcessingService.name);
        constructor(importQueue, validationQueue) {
            this.importQueue = importQueue;
            this.validationQueue = validationQueue;
        }
        /**
         * Process items in batches with configurable options
         */
        async processBatches(items, processor, options = {}) {
            const config = {
                batchSize: 100,
                concurrency: 3,
                delayBetweenBatches: 100,
                retryAttempts: 3,
                retryDelay: 1000,
                ...options
            };
            const totalItems = items.length;
            const totalBatches = Math.ceil(totalItems / config.batchSize);
            this.logger.log(`Processing ${totalItems} items in ${totalBatches} batches (size: ${config.batchSize}, concurrency: ${config.concurrency})`);
            // Create batches
            const batches = [];
            for (let i = 0; i < totalItems; i += config.batchSize) {
                batches.push(items.slice(i, i + config.batchSize));
            }
            // Process batches with controlled concurrency
            await this.processBatchesWithConcurrency(batches, processor, config);
        }
        /**
         * Queue import job for processing
         */
        async queueImportJob(jobData, priority = 0) {
            await this.importQueue.add('process-import', jobData, {
                priority,
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 2000
                },
                removeOnComplete: 10,
                removeOnFail: 5
            });
            this.logger.log(`Queued import job ${jobData.jobId} with priority ${priority}`);
        }
        /**
         * Queue validation job for processing
         */
        async queueValidationJob(jobData, priority = 0) {
            await this.validationQueue.add('validate-batch', jobData, {
                priority,
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 1000
                },
                removeOnComplete: 10,
                removeOnFail: 5
            });
            this.logger.log(`Queued validation job for import ${jobData.jobId} with ${jobData.resultIds.length} records`);
        }
        /**
         * Get queue statistics
         */
        async getQueueStats() {
            const [importStats, validationStats] = await Promise.all([
                this.getQueueStatistics(this.importQueue),
                this.getQueueStatistics(this.validationQueue)
            ]);
            return {
                import: importStats,
                validation: validationStats
            };
        }
        /**
         * Pause all queues
         */
        async pauseQueues() {
            await Promise.all([
                this.importQueue.pause(),
                this.validationQueue.pause()
            ]);
            this.logger.log('All queues paused');
        }
        /**
         * Resume all queues
         */
        async resumeQueues() {
            await Promise.all([
                this.importQueue.resume(),
                this.validationQueue.resume()
            ]);
            this.logger.log('All queues resumed');
        }
        /**
         * Clean up completed and failed jobs
         */
        async cleanupQueues(olderThanHours = 24) {
            const cutoffTime = Date.now() - (olderThanHours * 60 * 60 * 1000);
            const [importCleaned, validationCleaned] = await Promise.all([
                this.cleanupQueue(this.importQueue, cutoffTime),
                this.cleanupQueue(this.validationQueue, cutoffTime)
            ]);
            this.logger.log(`Cleaned up ${importCleaned} import jobs and ${validationCleaned} validation jobs`);
            return {
                importCleaned,
                validationCleaned
            };
        }
        /**
         * Cancel all jobs for a specific import
         */
        async cancelImportJobs(jobId) {
            // Cancel import jobs
            const importJobs = await this.importQueue.getJobs(['waiting', 'active']);
            const importJobsToCancel = importJobs.filter(job => job.data.jobId === jobId);
            for (const job of importJobsToCancel) {
                await job.remove();
            }
            // Cancel validation jobs
            const validationJobs = await this.validationQueue.getJobs(['waiting', 'active']);
            const validationJobsToCancel = validationJobs.filter(job => job.data.jobId === jobId);
            for (const job of validationJobsToCancel) {
                await job.remove();
            }
            this.logger.log(`Cancelled ${importJobsToCancel.length} import jobs and ${validationJobsToCancel.length} validation jobs for import ${jobId}`);
        }
        /**
         * Process batches with controlled concurrency
         */
        async processBatchesWithConcurrency(batches, processor, config) {
            const semaphore = new Array(config.concurrency).fill(null);
            let batchIndex = 0;
            let completedBatches = 0;
            const processBatch = async (batch, index) => {
                let attempts = 0;
                while (attempts < config.retryAttempts) {
                    try {
                        await processor(batch, index);
                        completedBatches++;
                        this.logger.debug(`Completed batch ${index + 1}/${batches.length} (${completedBatches}/${batches.length})`);
                        return;
                    }
                    catch (error) {
                        attempts++;
                        this.logger.warn(`Batch ${index + 1} failed (attempt ${attempts}/${config.retryAttempts}):`, error);
                        if (attempts < config.retryAttempts) {
                            await new Promise(resolve => setTimeout(resolve, config.retryDelay * attempts));
                        }
                        else {
                            throw error;
                        }
                    }
                }
            };
            const workers = semaphore.map(async () => {
                while (batchIndex < batches.length) {
                    const currentIndex = batchIndex++;
                    const batch = batches[currentIndex];
                    await processBatch(batch, currentIndex);
                    // Delay between batches
                    if (currentIndex < batches.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, config.delayBetweenBatches));
                    }
                }
            });
            await Promise.all(workers);
        }
        /**
         * Get statistics for a specific queue
         */
        async getQueueStatistics(queue) {
            const [waiting, active, completed, failed] = await Promise.all([
                queue.getWaiting(),
                queue.getActive(),
                queue.getCompleted(),
                queue.getFailed()
            ]);
            return {
                waiting: waiting.length,
                active: active.length,
                completed: completed.length,
                failed: failed.length
            };
        }
        /**
         * Clean up old jobs from a queue
         */
        async cleanupQueue(queue, cutoffTime) {
            let cleanedCount = 0;
            // Clean completed jobs
            const completedJobs = await queue.getCompleted();
            for (const job of completedJobs) {
                if (job.timestamp < cutoffTime) {
                    await job.remove();
                    cleanedCount++;
                }
            }
            // Clean failed jobs
            const failedJobs = await queue.getFailed();
            for (const job of failedJobs) {
                if (job.timestamp < cutoffTime) {
                    await job.remove();
                    cleanedCount++;
                }
            }
            return cleanedCount;
        }
    };
    return BatchProcessingService = _classThis;
})();
exports.BatchProcessingService = BatchProcessingService;
//# sourceMappingURL=batch-processing.service.js.map