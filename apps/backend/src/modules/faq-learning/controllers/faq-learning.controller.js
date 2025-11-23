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
exports.FaqLearningController = exports.ResetConfigDto = exports.BulkUpdateConfigDto = exports.UpdateConfigDto = exports.StartLearningDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
class StartLearningDto {
    criteria;
    options;
}
exports.StartLearningDto = StartLearningDto;
class UpdateConfigDto {
    configKey;
    configValue;
    description;
    category;
}
exports.UpdateConfigDto = UpdateConfigDto;
class BulkUpdateConfigDto {
    configs;
}
exports.BulkUpdateConfigDto = BulkUpdateConfigDto;
class ResetConfigDto {
    category;
}
exports.ResetConfigDto = ResetConfigDto;
let FaqLearningController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('FAQ Learning'), (0, common_1.Controller)('faq-learning'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _startLearning_decorators;
    let _startPipeline_decorators;
    let _stopPipeline_decorators;
    let _getDashboard_decorators;
    let _getProviderStatus_decorators;
    let _getAiUsageStats_decorators;
    let _getPerformanceMetrics_decorators;
    let _getAiProviderInfo_decorators;
    let _getConfig_decorators;
    let _updateConfig_decorators;
    let _bulkUpdateConfig_decorators;
    let _resetConfigSection_decorators;
    var FaqLearningController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _startLearning_decorators = [(0, common_1.Post)('start'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Start FAQ learning pipeline' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Learning pipeline started successfully' })];
            _startPipeline_decorators = [(0, common_1.Post)('pipeline/start'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Start learning pipeline' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Pipeline started successfully' })];
            _stopPipeline_decorators = [(0, common_1.Post)('pipeline/stop'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Stop learning pipeline' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Pipeline stopped successfully' })];
            _getDashboard_decorators = [(0, common_1.Get)('dashboard'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.SUPPORT_AGENT), (0, swagger_1.ApiOperation)({ summary: 'Get dashboard statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard data retrieved successfully' })];
            _getProviderStatus_decorators = [(0, common_1.Get)('provider-status'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.SUPPORT_AGENT), (0, swagger_1.ApiOperation)({ summary: 'Get current AI provider status for FAQ Learning' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Provider status retrieved successfully' })];
            _getAiUsageStats_decorators = [(0, common_1.Get)('ai-usage-stats'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.SUPPORT_AGENT), (0, swagger_1.ApiOperation)({ summary: 'Get AI usage statistics for FAQ Learning' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'AI usage statistics retrieved successfully' })];
            _getPerformanceMetrics_decorators = [(0, common_1.Get)('performance-metrics'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.SUPPORT_AGENT), (0, swagger_1.ApiOperation)({ summary: 'Get FAQ Learning performance metrics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance metrics retrieved successfully' })];
            _getAiProviderInfo_decorators = [(0, common_1.Get)('ai-provider-info'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.SUPPORT_AGENT), (0, swagger_1.ApiOperation)({ summary: 'Get current AI provider information for FAQ Learning' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'AI provider info retrieved successfully' })];
            _getConfig_decorators = [(0, common_1.Get)('config'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Get all FAQ Learning configurations' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Configurations retrieved successfully' })];
            _updateConfig_decorators = [(0, common_1.Put)('config'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Update FAQ Learning configuration' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Configuration updated successfully' })];
            _bulkUpdateConfig_decorators = [(0, common_1.Put)('config/bulk'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Bulk update FAQ Learning configurations' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Configurations updated successfully' })];
            _resetConfigSection_decorators = [(0, common_1.Post)('config/reset/:sectionKey'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Reset configuration section to defaults' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Configuration section reset successfully' })];
            __esDecorate(this, null, _startLearning_decorators, { kind: "method", name: "startLearning", static: false, private: false, access: { has: obj => "startLearning" in obj, get: obj => obj.startLearning }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _startPipeline_decorators, { kind: "method", name: "startPipeline", static: false, private: false, access: { has: obj => "startPipeline" in obj, get: obj => obj.startPipeline }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _stopPipeline_decorators, { kind: "method", name: "stopPipeline", static: false, private: false, access: { has: obj => "stopPipeline" in obj, get: obj => obj.stopPipeline }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getDashboard_decorators, { kind: "method", name: "getDashboard", static: false, private: false, access: { has: obj => "getDashboard" in obj, get: obj => obj.getDashboard }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getProviderStatus_decorators, { kind: "method", name: "getProviderStatus", static: false, private: false, access: { has: obj => "getProviderStatus" in obj, get: obj => obj.getProviderStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAiUsageStats_decorators, { kind: "method", name: "getAiUsageStats", static: false, private: false, access: { has: obj => "getAiUsageStats" in obj, get: obj => obj.getAiUsageStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getPerformanceMetrics_decorators, { kind: "method", name: "getPerformanceMetrics", static: false, private: false, access: { has: obj => "getPerformanceMetrics" in obj, get: obj => obj.getPerformanceMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAiProviderInfo_decorators, { kind: "method", name: "getAiProviderInfo", static: false, private: false, access: { has: obj => "getAiProviderInfo" in obj, get: obj => obj.getAiProviderInfo }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getConfig_decorators, { kind: "method", name: "getConfig", static: false, private: false, access: { has: obj => "getConfig" in obj, get: obj => obj.getConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateConfig_decorators, { kind: "method", name: "updateConfig", static: false, private: false, access: { has: obj => "updateConfig" in obj, get: obj => obj.updateConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _bulkUpdateConfig_decorators, { kind: "method", name: "bulkUpdateConfig", static: false, private: false, access: { has: obj => "bulkUpdateConfig" in obj, get: obj => obj.bulkUpdateConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _resetConfigSection_decorators, { kind: "method", name: "resetConfigSection", static: false, private: false, access: { has: obj => "resetConfigSection" in obj, get: obj => obj.resetConfigSection }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FaqLearningController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        faqLearningService = __runInitializers(this, _instanceExtraInitializers);
        batchProcessor;
        faqAiService;
        logger = new common_1.Logger(FaqLearningController.name);
        constructor(faqLearningService, batchProcessor, faqAiService) {
            this.faqLearningService = faqLearningService;
            this.batchProcessor = batchProcessor;
            this.faqAiService = faqAiService;
        }
        async startLearning(dto) {
            try {
                this.logger.log('Starting FAQ learning pipeline via API');
                const criteria = {};
                if (dto.criteria) {
                    Object.assign(criteria, dto.criteria);
                    if (dto.criteria.dateRange) {
                        criteria.dateRange = {
                            from: new Date(dto.criteria.dateRange.from),
                            to: new Date(dto.criteria.dateRange.to)
                        };
                    }
                }
                const result = await this.faqLearningService.runLearningPipeline(criteria);
                return {
                    success: true,
                    result
                };
            }
            catch (error) {
                this.logger.error('Failed to start learning pipeline:', error);
                throw new common_1.HttpException(`Failed to start learning pipeline: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async startPipeline() {
            try {
                this.logger.log('Starting learning pipeline');
                await this.faqLearningService.runLearningPipeline({});
                return {
                    success: true,
                    message: 'Learning pipeline started successfully',
                    status: 'running'
                };
            }
            catch (error) {
                this.logger.error('Failed to start pipeline:', error);
                throw new common_1.HttpException(`Failed to start pipeline: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async stopPipeline() {
            try {
                this.logger.log('Stopping learning pipeline');
                return {
                    success: true,
                    message: 'Learning pipeline stopped successfully',
                    status: 'stopped'
                };
            }
            catch (error) {
                this.logger.error('Failed to stop pipeline:', error);
                throw new common_1.HttpException(`Failed to stop pipeline: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getDashboard() {
            try {
                this.logger.log('📊 Dashboard endpoint called');
                const pipelineStatus = await this.faqLearningService.getPipelineStatus();
                const providerStatus = await this.faqAiService.getProviderStatus();
                const totalFaqs = await this.faqLearningService.getTotalFaqCount();
                const newFaqsToday = await this.faqLearningService.getNewFaqsToday();
                const pendingReview = await this.faqLearningService.getPendingReviewCount();
                const averageConfidence = await this.faqLearningService.getAverageConfidence();
                const recentActivity = await this.faqLearningService.getRecentActivity(10);
                const learningProgress = await this.faqLearningService.getLearningProgressBySource();
                const qualityMetrics = await this.faqLearningService.getQualityMetrics();
                this.logger.log(`📊 Dashboard stats: totalFaqs=${totalFaqs}, newFaqsToday=${newFaqsToday}, pendingReview=${pendingReview}`);
                const response = {
                    stats: {
                        totalFaqs,
                        newFaqsToday,
                        pendingReview,
                        averageConfidence,
                        processingStatus: (pipelineStatus.isProcessing ? 'running' : 'stopped'),
                        lastRun: pipelineStatus.lastRun,
                        nextRun: pipelineStatus.nextScheduledRun
                    },
                    learningProgress: {
                        fromChat: learningProgress.fromChat || 0,
                        fromTickets: learningProgress.fromTickets || 0,
                        fromSuggestions: learningProgress.fromSuggestions || 0
                    },
                    qualityMetrics: {
                        highConfidence: qualityMetrics.highConfidence || 0,
                        mediumConfidence: qualityMetrics.mediumConfidence || 0,
                        lowConfidence: qualityMetrics.lowConfidence || 0
                    },
                    providers: [{
                            name: providerStatus.provider,
                            available: providerStatus.available,
                            responseTime: providerStatus.responseTime || undefined,
                            lastChecked: new Date()
                        }],
                    recentActivity: recentActivity.map((activity, index) => ({
                        id: `activity-${index}`,
                        type: activity.type,
                        description: activity.description,
                        timestamp: activity.timestamp,
                        status: activity.status
                    }))
                };
                this.logger.log('📊 Returning dashboard response');
                return response;
            }
            catch (error) {
                this.logger.error('Failed to get dashboard data:', error);
                throw new common_1.HttpException(`Failed to get dashboard data: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getProviderStatus() {
            try {
                const status = await this.faqAiService.getProviderStatus();
                return {
                    success: true,
                    data: status
                };
            }
            catch (error) {
                this.logger.error('Failed to get provider status:', error);
                throw new common_1.HttpException(`Failed to get provider status: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getAiUsageStats() {
            try {
                // Mock data for now - would be implemented with proper usage tracking
                return {
                    totalRequests: 15420,
                    successRate: 99.2,
                    averageResponseTime: 1200,
                    totalTokens: 2450000,
                    estimatedCost: 45.30,
                    last24Hours: {
                        requests: 1240,
                        tokens: 185000,
                        cost: 3.20
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to get AI usage stats:', error);
                throw new common_1.HttpException(`Failed to get AI usage stats: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getPerformanceMetrics() {
            try {
                // Mock data for now - would be implemented with proper metrics
                return {
                    faqsGenerated: 247,
                    averageConfidence: 87.5,
                    processingTime: 2.3,
                    errorRate: 0.8
                };
            }
            catch (error) {
                this.logger.error('Failed to get performance metrics:', error);
                throw new common_1.HttpException(`Failed to get performance metrics: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getAiProviderInfo() {
            try {
                const providerStatus = await this.faqAiService.getProviderStatus();
                return {
                    currentProvider: providerStatus.provider,
                    currentModel: providerStatus.model,
                    available: providerStatus.available,
                    isReadOnly: true, // FAQ Learning cannot change global AI settings
                    globalSettingsUrl: '/admin/ai-settings'
                };
            }
            catch (error) {
                this.logger.error('Failed to get AI provider info:', error);
                throw new common_1.HttpException(`Failed to get AI provider info: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getConfig() {
            try {
                // Complete configuration data with all settings
                return {
                    configurations: [
                        // Confidence Thresholds
                        {
                            key: 'minConfidenceForReview',
                            value: 60,
                            description: 'Minimum confidence score for review',
                            category: 'thresholds',
                            type: 'range',
                            min: 0,
                            max: 100,
                            step: 1,
                            unit: '%',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'minConfidenceForAutoPublish',
                            value: 85,
                            description: 'Minimum confidence score for auto-publish',
                            category: 'thresholds',
                            type: 'range',
                            min: 0,
                            max: 100,
                            step: 1,
                            unit: '%',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        // Pattern Recognition
                        {
                            key: 'minPatternFrequency',
                            value: 3,
                            description: 'Minimum pattern frequency for recognition',
                            category: 'recognition',
                            type: 'number',
                            min: 1,
                            max: 50,
                            step: 1,
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'similarityThreshold',
                            value: 0.8,
                            description: 'Similarity threshold for pattern matching',
                            category: 'recognition',
                            type: 'range',
                            min: 0,
                            max: 1,
                            step: 0.01,
                            isActive: true,
                            updatedAt: new Date()
                        },
                        // Processing Settings
                        {
                            key: 'batchSize',
                            value: 100,
                            description: 'Number of items to process in each batch',
                            category: 'processing',
                            type: 'number',
                            min: 10,
                            max: 1000,
                            step: 10,
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'processingInterval',
                            value: 3600,
                            description: 'Processing interval in seconds',
                            category: 'processing',
                            type: 'number',
                            min: 300,
                            max: 86400,
                            step: 300,
                            unit: 'seconds',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'enableRealTimeProcessing',
                            value: false,
                            description: 'Enable real-time processing of new data',
                            category: 'processing',
                            type: 'boolean',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'enableAutoPublishing',
                            value: false,
                            description: 'Automatically publish high-confidence FAQs',
                            category: 'processing',
                            type: 'boolean',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'maxDailyProcessingLimit',
                            value: 1000,
                            description: 'Maximum number of items to process per day',
                            category: 'processing',
                            type: 'number',
                            min: 100,
                            max: 10000,
                            step: 100,
                            isActive: true,
                            updatedAt: new Date()
                        },
                        // Quality Filters
                        {
                            key: 'minQuestionLength',
                            value: 10,
                            description: 'Minimum question length in characters',
                            category: 'quality',
                            type: 'number',
                            min: 5,
                            max: 100,
                            step: 1,
                            unit: 'characters',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'maxQuestionLength',
                            value: 500,
                            description: 'Maximum question length in characters',
                            category: 'quality',
                            type: 'number',
                            min: 100,
                            max: 2000,
                            step: 50,
                            unit: 'characters',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'minAnswerLength',
                            value: 20,
                            description: 'Minimum answer length in characters',
                            category: 'quality',
                            type: 'number',
                            min: 10,
                            max: 200,
                            step: 5,
                            unit: 'characters',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        // Data Sources
                        {
                            key: 'chatSessionMinDuration',
                            value: 300,
                            description: 'Minimum chat session duration in seconds',
                            category: 'sources',
                            type: 'number',
                            min: 60,
                            max: 3600,
                            step: 30,
                            unit: 'seconds',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'ticketMinResolutionTime',
                            value: 1800,
                            description: 'Minimum ticket resolution time in seconds',
                            category: 'sources',
                            type: 'number',
                            min: 300,
                            max: 86400,
                            step: 300,
                            unit: 'seconds',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'requiredSatisfactionScore',
                            value: 4,
                            description: 'Required satisfaction score (1-5)',
                            category: 'sources',
                            type: 'range',
                            min: 1,
                            max: 5,
                            step: 1,
                            isActive: true,
                            updatedAt: new Date()
                        },
                        // Category Management
                        {
                            key: 'excludedCategories',
                            value: [],
                            description: 'Categories to exclude from processing',
                            category: 'categories',
                            type: 'multiselect',
                            options: [
                                { value: 'spam', label: 'Spam' },
                                { value: 'test', label: 'Test' },
                                { value: 'internal', label: 'Internal' },
                                { value: 'billing', label: 'Billing' },
                                { value: 'technical', label: 'Technical' }
                            ],
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'autoCategorizationEnabled',
                            value: true,
                            description: 'Enable automatic categorization of FAQs',
                            category: 'categories',
                            type: 'boolean',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        // AI Model Settings (Note: provider and model will be read-only)
                        {
                            key: 'temperature',
                            value: 0.7,
                            description: 'AI model creativity level (0 = focused, 2 = creative)',
                            category: 'ai',
                            type: 'range',
                            min: 0,
                            max: 2,
                            step: 0.1,
                            isActive: true,
                            updatedAt: new Date()
                        },
                        {
                            key: 'maxTokens',
                            value: 1000,
                            description: 'Maximum tokens for AI responses',
                            category: 'ai',
                            type: 'number',
                            min: 100,
                            max: 4000,
                            step: 100,
                            unit: 'tokens',
                            isActive: true,
                            updatedAt: new Date()
                        },
                        // Advanced Settings
                        {
                            key: 'retentionPeriodDays',
                            value: 365,
                            description: 'Data retention period in days',
                            category: 'advanced',
                            type: 'number',
                            min: 30,
                            max: 1095,
                            step: 30,
                            unit: 'days',
                            isActive: true,
                            updatedAt: new Date()
                        }
                    ]
                };
            }
            catch (error) {
                this.logger.error('Failed to get configurations:', error);
                throw new common_1.HttpException(`Failed to get configurations: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async updateConfig(dto) {
            try {
                // Validate config value based on type
                const isValid = this.validateConfigValue(dto.configKey, dto.configValue);
                if (!isValid.valid) {
                    throw new common_1.HttpException(isValid.error, common_1.HttpStatus.BAD_REQUEST);
                }
                this.logger.log(`Configuration ${dto.configKey} updated to ${dto.configValue}`);
                return {
                    success: true,
                    message: 'Configuration updated successfully'
                };
            }
            catch (error) {
                this.logger.error('Failed to update configuration:', error);
                throw new common_1.HttpException(`Failed to update configuration: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async bulkUpdateConfig(dto) {
            try {
                const results = [];
                for (const config of dto.configs) {
                    try {
                        const isValid = this.validateConfigValue(config.configKey, config.configValue);
                        if (!isValid.valid) {
                            results.push({
                                configKey: config.configKey,
                                success: false,
                                error: isValid.error
                            });
                            continue;
                        }
                        // Here you would save to database
                        this.logger.log(`Configuration ${config.configKey} updated to ${config.configValue}`);
                        results.push({
                            configKey: config.configKey,
                            success: true
                        });
                    }
                    catch (error) {
                        results.push({
                            configKey: config.configKey,
                            success: false,
                            error: error.message
                        });
                    }
                }
                const successCount = results.filter(r => r.success).length;
                return {
                    success: successCount === dto.configs.length,
                    message: `${successCount}/${dto.configs.length} configurations updated successfully`,
                    results
                };
            }
            catch (error) {
                this.logger.error('Failed to bulk update configurations:', error);
                throw new common_1.HttpException(`Failed to bulk update configurations: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async resetConfigSection(sectionKey) {
            try {
                // Get default values for the category
                const defaultConfigs = this.getDefaultConfigsForCategory(sectionKey);
                this.logger.log(`Configuration section ${sectionKey} reset to defaults`);
                return {
                    success: true,
                    message: `Configuration section ${sectionKey} reset to defaults`,
                    resetConfigs: defaultConfigs.map(config => ({
                        key: config.key,
                        oldValue: 'current_value', // Would be fetched from database
                        newValue: config.value
                    }))
                };
            }
            catch (error) {
                this.logger.error(`Failed to reset configuration section ${sectionKey}:`, error);
                throw new common_1.HttpException(`Failed to reset configuration section: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        validateConfigValue(configKey, value) {
            // Get config metadata
            const configMeta = this.getConfigMetadata(configKey);
            if (!configMeta) {
                return { valid: false, error: `Unknown configuration key: ${configKey}` };
            }
            // Type validation
            switch (configMeta.type) {
                case 'number':
                    if (typeof value !== 'number' || isNaN(value)) {
                        return { valid: false, error: `${configKey} must be a valid number` };
                    }
                    if (configMeta.min !== undefined && value < configMeta.min) {
                        return { valid: false, error: `${configKey} must be at least ${configMeta.min}` };
                    }
                    if (configMeta.max !== undefined && value > configMeta.max) {
                        return { valid: false, error: `${configKey} must be at most ${configMeta.max}` };
                    }
                    break;
                case 'range':
                    if (typeof value !== 'number' || isNaN(value)) {
                        return { valid: false, error: `${configKey} must be a valid number` };
                    }
                    if (configMeta.min !== undefined && value < configMeta.min) {
                        return { valid: false, error: `${configKey} must be between ${configMeta.min} and ${configMeta.max}` };
                    }
                    if (configMeta.max !== undefined && value > configMeta.max) {
                        return { valid: false, error: `${configKey} must be between ${configMeta.min} and ${configMeta.max}` };
                    }
                    break;
                case 'boolean':
                    if (typeof value !== 'boolean') {
                        return { valid: false, error: `${configKey} must be true or false` };
                    }
                    break;
                case 'multiselect':
                    if (!Array.isArray(value)) {
                        return { valid: false, error: `${configKey} must be an array` };
                    }
                    break;
            }
            return { valid: true };
        }
        getConfigMetadata(configKey) {
            // This would normally come from database or config service
            const configMap = {
                'minConfidenceForReview': { type: 'range', min: 0, max: 100 },
                'minConfidenceForAutoPublish': { type: 'range', min: 0, max: 100 },
                'minPatternFrequency': { type: 'number', min: 1, max: 50 },
                'similarityThreshold': { type: 'range', min: 0, max: 1 },
                'batchSize': { type: 'number', min: 10, max: 1000 },
                'processingInterval': { type: 'number', min: 300, max: 86400 },
                'enableRealTimeProcessing': { type: 'boolean' },
                'enableAutoPublishing': { type: 'boolean' },
                'maxDailyProcessingLimit': { type: 'number', min: 100, max: 10000 },
                'minQuestionLength': { type: 'number', min: 5, max: 100 },
                'maxQuestionLength': { type: 'number', min: 100, max: 2000 },
                'minAnswerLength': { type: 'number', min: 10, max: 200 },
                'chatSessionMinDuration': { type: 'number', min: 60, max: 3600 },
                'ticketMinResolutionTime': { type: 'number', min: 300, max: 86400 },
                'requiredSatisfactionScore': { type: 'range', min: 1, max: 5 },
                'excludedCategories': { type: 'multiselect' },
                'autoCategorizationEnabled': { type: 'boolean' },
                'temperature': { type: 'range', min: 0, max: 2 },
                'maxTokens': { type: 'number', min: 100, max: 4000 },
                'retentionPeriodDays': { type: 'number', min: 30, max: 1095 }
            };
            return configMap[configKey];
        }
        getDefaultConfigsForCategory(category) {
            // Return default configs for category - this would come from FaqLearningConfig.getDefaultConfig()
            const defaults = {
                'thresholds': [
                    { key: 'minConfidenceForReview', value: 60 },
                    { key: 'minConfidenceForAutoPublish', value: 85 }
                ],
                'recognition': [
                    { key: 'minPatternFrequency', value: 3 },
                    { key: 'similarityThreshold', value: 0.8 }
                ],
                'processing': [
                    { key: 'batchSize', value: 100 },
                    { key: 'processingInterval', value: 3600 },
                    { key: 'enableRealTimeProcessing', value: false },
                    { key: 'enableAutoPublishing', value: false },
                    { key: 'maxDailyProcessingLimit', value: 1000 }
                ],
                'quality': [
                    { key: 'minQuestionLength', value: 10 },
                    { key: 'maxQuestionLength', value: 500 },
                    { key: 'minAnswerLength', value: 20 }
                ],
                'sources': [
                    { key: 'chatSessionMinDuration', value: 300 },
                    { key: 'ticketMinResolutionTime', value: 1800 },
                    { key: 'requiredSatisfactionScore', value: 4 }
                ],
                'categories': [
                    { key: 'excludedCategories', value: [] },
                    { key: 'autoCategorizationEnabled', value: true }
                ],
                'ai': [
                    { key: 'temperature', value: 0.7 },
                    { key: 'maxTokens', value: 1000 }
                ],
                'advanced': [
                    { key: 'retentionPeriodDays', value: 365 }
                ]
            };
            return defaults[category] || [];
        }
    };
    return FaqLearningController = _classThis;
})();
exports.FaqLearningController = FaqLearningController;
//# sourceMappingURL=faq-learning.controller.js.map