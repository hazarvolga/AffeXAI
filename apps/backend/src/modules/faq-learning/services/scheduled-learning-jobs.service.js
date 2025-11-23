"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledLearningJobsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const cron_1 = require("cron");
let ScheduledLearningJobsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _processHourlyData_decorators;
    let _autoPublishHighConfidenceFaqs_decorators;
    let _syncWithKnowledgeBase_decorators;
    let _weeklyComprehensiveProcessing_decorators;
    let _cleanupOldData_decorators;
    let _updatePatternFrequencies_decorators;
    var ScheduledLearningJobsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _processHourlyData_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR, { name: 'hourly-data-processing' })];
            _autoPublishHighConfidenceFaqs_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM, { name: 'daily-auto-publish' })];
            _syncWithKnowledgeBase_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_3AM, { name: 'daily-kb-sync' })];
            _weeklyComprehensiveProcessing_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEK, { name: 'weekly-comprehensive-processing' })];
            _cleanupOldData_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_4AM, { name: 'daily-cleanup' })];
            _updatePatternFrequencies_decorators = [(0, schedule_1.Cron)('0 */6 * * *', { name: 'pattern-frequency-update' })];
            __esDecorate(this, null, _processHourlyData_decorators, { kind: "method", name: "processHourlyData", static: false, private: false, access: { has: obj => "processHourlyData" in obj, get: obj => obj.processHourlyData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _autoPublishHighConfidenceFaqs_decorators, { kind: "method", name: "autoPublishHighConfidenceFaqs", static: false, private: false, access: { has: obj => "autoPublishHighConfidenceFaqs" in obj, get: obj => obj.autoPublishHighConfidenceFaqs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _syncWithKnowledgeBase_decorators, { kind: "method", name: "syncWithKnowledgeBase", static: false, private: false, access: { has: obj => "syncWithKnowledgeBase" in obj, get: obj => obj.syncWithKnowledgeBase }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _weeklyComprehensiveProcessing_decorators, { kind: "method", name: "weeklyComprehensiveProcessing", static: false, private: false, access: { has: obj => "weeklyComprehensiveProcessing" in obj, get: obj => obj.weeklyComprehensiveProcessing }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _cleanupOldData_decorators, { kind: "method", name: "cleanupOldData", static: false, private: false, access: { has: obj => "cleanupOldData" in obj, get: obj => obj.cleanupOldData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updatePatternFrequencies_decorators, { kind: "method", name: "updatePatternFrequencies", static: false, private: false, access: { has: obj => "updatePatternFrequencies" in obj, get: obj => obj.updatePatternFrequencies }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ScheduledLearningJobsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configRepository = __runInitializers(this, _instanceExtraInitializers);
        faqLearningService;
        reviewQueueService;
        kbIntegrator;
        schedulerRegistry;
        logger = new common_1.Logger(ScheduledLearningJobsService.name);
        jobStatuses = new Map();
        jobHistory = [];
        MAX_HISTORY = 100;
        constructor(configRepository, faqLearningService, reviewQueueService, kbIntegrator, schedulerRegistry) {
            this.configRepository = configRepository;
            this.faqLearningService = faqLearningService;
            this.reviewQueueService = reviewQueueService;
            this.kbIntegrator = kbIntegrator;
            this.schedulerRegistry = schedulerRegistry;
            this.initializeJobStatuses();
        }
        // Hourly: Process new chat and ticket data
        async processHourlyData() {
            const jobName = 'hourly-data-processing';
            await this.executeJob(jobName, async () => {
                this.logger.log('Starting hourly data processing');
                const config = await this.getJobConfig();
                if (!config.enableRealTimeProcessing) {
                    this.logger.log('Real-time processing disabled, skipping');
                    return { itemsProcessed: 0 };
                }
                // Process last hour's data
                const result = await this.faqLearningService.runLearningPipeline({
                    dateRange: {
                        from: new Date(Date.now() - 3600000), // Last hour
                        to: new Date()
                    },
                    maxResults: config.batchSize
                });
                return {
                    itemsProcessed: result.processedItems,
                    errors: result.errors
                };
            });
        }
        // Daily: Auto-publish high confidence FAQs
        async autoPublishHighConfidenceFaqs() {
            const jobName = 'daily-auto-publish';
            await this.executeJob(jobName, async () => {
                this.logger.log('Starting daily auto-publish job');
                const config = await this.getJobConfig();
                if (!config.enableAutoPublishing) {
                    this.logger.log('Auto-publishing disabled, skipping');
                    return { itemsProcessed: 0 };
                }
                const publishedCount = await this.reviewQueueService.autoPublishHighConfidenceFaqs();
                return {
                    itemsProcessed: publishedCount,
                    errors: []
                };
            });
        }
        // Daily: Sync FAQs with Knowledge Base
        async syncWithKnowledgeBase() {
            const jobName = 'daily-kb-sync';
            await this.executeJob(jobName, async () => {
                this.logger.log('Starting daily KB sync job');
                const result = await this.kbIntegrator.syncFaqUpdates();
                return {
                    itemsProcessed: result.updated,
                    errors: result.errors.map(e => e.error)
                };
            });
        }
        // Weekly: Comprehensive data processing
        async weeklyComprehensiveProcessing() {
            const jobName = 'weekly-comprehensive-processing';
            await this.executeJob(jobName, async () => {
                this.logger.log('Starting weekly comprehensive processing');
                const config = await this.getJobConfig();
                // Process last week's data
                const result = await this.faqLearningService.runLearningPipeline({
                    dateRange: {
                        from: new Date(Date.now() - 7 * 24 * 3600000), // Last week
                        to: new Date()
                    },
                    maxResults: config.batchSize * 10 // Larger batch for weekly
                });
                return {
                    itemsProcessed: result.processedItems,
                    errors: result.errors
                };
            });
        }
        // Daily: Cleanup old data
        async cleanupOldData() {
            const jobName = 'daily-cleanup';
            await this.executeJob(jobName, async () => {
                this.logger.log('Starting daily cleanup job');
                const config = await this.getJobConfig();
                const retentionDate = new Date(Date.now() - config.retentionPeriodDays * 24 * 3600000);
                // This would delete old rejected FAQs, expired patterns, etc.
                // For now, just log
                this.logger.log(`Cleanup would remove data older than ${retentionDate.toISOString()}`);
                return {
                    itemsProcessed: 0,
                    errors: []
                };
            });
        }
        // Every 6 hours: Update pattern frequencies
        async updatePatternFrequencies() {
            const jobName = 'pattern-frequency-update';
            await this.executeJob(jobName, async () => {
                this.logger.log('Starting pattern frequency update');
                // This would recalculate pattern frequencies based on recent data
                // For now, just log
                this.logger.log('Pattern frequencies would be updated');
                return {
                    itemsProcessed: 0,
                    errors: []
                };
            });
        }
        async getJobStatuses() {
            const statuses = [];
            for (const [name, status] of this.jobStatuses) {
                try {
                    const job = this.schedulerRegistry.getCronJob(name);
                    status.nextRun = job.nextDate()?.toJSDate();
                }
                catch (error) {
                    // Job might not be registered yet
                }
                statuses.push(status);
            }
            return statuses;
        }
        async getJobHistory(jobName, limit = 20) {
            let history = this.jobHistory;
            if (jobName) {
                history = history.filter(h => h.jobName === jobName);
            }
            return history.slice(-limit).reverse();
        }
        async enableJob(jobName) {
            try {
                const job = this.schedulerRegistry.getCronJob(jobName);
                job.start();
                const status = this.jobStatuses.get(jobName);
                if (status) {
                    status.enabled = true;
                }
                this.logger.log(`Job ${jobName} enabled`);
                return true;
            }
            catch (error) {
                this.logger.error(`Failed to enable job ${jobName}:`, error);
                return false;
            }
        }
        async disableJob(jobName) {
            try {
                const job = this.schedulerRegistry.getCronJob(jobName);
                job.stop();
                const status = this.jobStatuses.get(jobName);
                if (status) {
                    status.enabled = false;
                }
                this.logger.log(`Job ${jobName} disabled`);
                return true;
            }
            catch (error) {
                this.logger.error(`Failed to disable job ${jobName}:`, error);
                return false;
            }
        }
        async triggerJobManually(jobName) {
            this.logger.log(`Manually triggering job: ${jobName}`);
            const startTime = new Date();
            let result;
            try {
                let jobResult;
                switch (jobName) {
                    case 'hourly-data-processing':
                        await this.processHourlyData();
                        jobResult = { itemsProcessed: 0, errors: [] };
                        break;
                    case 'daily-auto-publish':
                        await this.autoPublishHighConfidenceFaqs();
                        jobResult = { itemsProcessed: 0, errors: [] };
                        break;
                    case 'daily-kb-sync':
                        await this.syncWithKnowledgeBase();
                        jobResult = { itemsProcessed: 0, errors: [] };
                        break;
                    case 'weekly-comprehensive-processing':
                        await this.weeklyComprehensiveProcessing();
                        jobResult = { itemsProcessed: 0, errors: [] };
                        break;
                    case 'daily-cleanup':
                        await this.cleanupOldData();
                        jobResult = { itemsProcessed: 0, errors: [] };
                        break;
                    default:
                        throw new Error(`Unknown job: ${jobName}`);
                }
                result = {
                    jobName,
                    startTime,
                    endTime: new Date(),
                    duration: Date.now() - startTime.getTime(),
                    success: true,
                    itemsProcessed: jobResult.itemsProcessed || 0,
                    errors: jobResult.errors || []
                };
            }
            catch (error) {
                result = {
                    jobName,
                    startTime,
                    endTime: new Date(),
                    duration: Date.now() - startTime.getTime(),
                    success: false,
                    itemsProcessed: 0,
                    errors: [error.message]
                };
            }
            this.addToHistory(result);
            return result;
        }
        async updateJobSchedule(jobName, cronExpression) {
            try {
                const job = this.schedulerRegistry.getCronJob(jobName);
                // Delete old job
                this.schedulerRegistry.deleteCronJob(jobName);
                // Create new job with updated schedule
                const newJob = new cron_1.CronJob(cronExpression, () => {
                    this.logger.log(`Executing scheduled job: ${jobName}`);
                });
                this.schedulerRegistry.addCronJob(jobName, newJob);
                newJob.start();
                const status = this.jobStatuses.get(jobName);
                if (status) {
                    status.cronExpression = cronExpression;
                }
                this.logger.log(`Job ${jobName} schedule updated to: ${cronExpression}`);
                return true;
            }
            catch (error) {
                this.logger.error(`Failed to update job schedule for ${jobName}:`, error);
                return false;
            }
        }
        async executeJob(jobName, jobFunction) {
            const startTime = new Date();
            const status = this.jobStatuses.get(jobName);
            if (status) {
                status.status = 'running';
                status.lastRun = startTime;
            }
            try {
                const result = await jobFunction();
                const executionResult = {
                    jobName,
                    startTime,
                    endTime: new Date(),
                    duration: Date.now() - startTime.getTime(),
                    success: true,
                    itemsProcessed: result.itemsProcessed,
                    errors: result.errors || []
                };
                this.addToHistory(executionResult);
                if (status) {
                    status.status = 'idle';
                    status.errorMessage = undefined;
                }
                this.logger.log(`Job ${jobName} completed: ${result.itemsProcessed} items processed`);
            }
            catch (error) {
                this.logger.error(`Job ${jobName} failed:`, error);
                const executionResult = {
                    jobName,
                    startTime,
                    endTime: new Date(),
                    duration: Date.now() - startTime.getTime(),
                    success: false,
                    itemsProcessed: 0,
                    errors: [error.message]
                };
                this.addToHistory(executionResult);
                if (status) {
                    status.status = 'error';
                    status.errorMessage = error.message;
                }
            }
        }
        initializeJobStatuses() {
            const jobs = [
                {
                    name: 'hourly-data-processing',
                    cronExpression: schedule_1.CronExpression.EVERY_HOUR,
                    enabled: true,
                    status: 'idle'
                },
                {
                    name: 'daily-auto-publish',
                    cronExpression: schedule_1.CronExpression.EVERY_DAY_AT_2AM,
                    enabled: true,
                    status: 'idle'
                },
                {
                    name: 'daily-kb-sync',
                    cronExpression: schedule_1.CronExpression.EVERY_DAY_AT_3AM,
                    enabled: true,
                    status: 'idle'
                },
                {
                    name: 'weekly-comprehensive-processing',
                    cronExpression: schedule_1.CronExpression.EVERY_WEEK,
                    enabled: true,
                    status: 'idle'
                },
                {
                    name: 'daily-cleanup',
                    cronExpression: schedule_1.CronExpression.EVERY_DAY_AT_4AM,
                    enabled: true,
                    status: 'idle'
                },
                {
                    name: 'pattern-frequency-update',
                    cronExpression: '0 */6 * * *',
                    enabled: true,
                    status: 'idle'
                }
            ];
            jobs.forEach(job => {
                this.jobStatuses.set(job.name, job);
            });
            this.logger.log(`Initialized ${jobs.length} scheduled jobs`);
        }
        addToHistory(result) {
            this.jobHistory.push(result);
            // Keep only last MAX_HISTORY entries
            if (this.jobHistory.length > this.MAX_HISTORY) {
                this.jobHistory = this.jobHistory.slice(-this.MAX_HISTORY);
            }
        }
        async getJobConfig() {
            try {
                const configs = await this.configRepository.find({
                    where: [
                        { configKey: 'advanced_settings' },
                        { configKey: 'data_processing' }
                    ]
                });
                const advancedSettings = configs.find(c => c.configKey === 'advanced_settings')?.configValue || {};
                const dataProcessing = configs.find(c => c.configKey === 'data_processing')?.configValue || {};
                return {
                    enableRealTimeProcessing: advancedSettings.enableRealTimeProcessing || false,
                    enableAutoPublishing: advancedSettings.enableAutoPublishing || false,
                    batchSize: dataProcessing.batchSize || 100,
                    retentionPeriodDays: advancedSettings.retentionPeriodDays || 365
                };
            }
            catch (error) {
                this.logger.error('Failed to load job config:', error);
                return {
                    enableRealTimeProcessing: false,
                    enableAutoPublishing: false,
                    batchSize: 100,
                    retentionPeriodDays: 365
                };
            }
        }
        async getJobMetrics() {
            const totalExecutions = this.jobHistory.length;
            const successfulExecutions = this.jobHistory.filter(h => h.success).length;
            const failedExecutions = this.jobHistory.filter(h => !h.success).length;
            const totalDuration = this.jobHistory.reduce((sum, h) => sum + h.duration, 0);
            const averageDuration = totalExecutions > 0 ? totalDuration / totalExecutions : 0;
            const totalItemsProcessed = this.jobHistory.reduce((sum, h) => sum + h.itemsProcessed, 0);
            const lastExecution = this.jobHistory.length > 0 ?
                this.jobHistory[this.jobHistory.length - 1].endTime : undefined;
            return {
                totalExecutions,
                successfulExecutions,
                failedExecutions,
                averageDuration: Math.round(averageDuration),
                totalItemsProcessed,
                lastExecution
            };
        }
    };
    return ScheduledLearningJobsService = _classThis;
})();
exports.ScheduledLearningJobsService = ScheduledLearningJobsService;
//# sourceMappingURL=scheduled-learning-jobs.service.js.map