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
exports.AutomationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const automation_dto_1 = require("../dto/automation.dto");
/**
 * Automation Controller
 * REST API for email marketing automation
 */
let AutomationController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Marketing Automation'), (0, common_1.Controller)('email-marketing/automations')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    let _activate_decorators;
    let _pause_decorators;
    let _getExecutions_decorators;
    let _getAnalytics_decorators;
    let _test_decorators;
    let _getQueueMetrics_decorators;
    let _getQueueJobs_decorators;
    var AutomationController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Create new automation workflow' }), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'Automation created successfully',
                    type: automation_dto_1.AutomationResponseDto,
                }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid workflow configuration' })];
            _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all automations' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Automations retrieved successfully',
                    type: [automation_dto_1.AutomationResponseDto],
                })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get automation by ID' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Automation ID (UUID)' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Automation retrieved successfully',
                    type: automation_dto_1.AutomationResponseDto,
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Automation not found' })];
            _update_decorators = [(0, common_1.Put)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Update automation' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Automation ID (UUID)' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Automation updated successfully',
                    type: automation_dto_1.AutomationResponseDto,
                }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot modify active automation' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Automation not found' })];
            _remove_decorators = [(0, common_1.Delete)(':id'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Delete automation' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Automation ID (UUID)' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Automation deleted successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot delete active automation' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Automation not found' })];
            _activate_decorators = [(0, common_1.Post)(':id/activate'), (0, swagger_1.ApiOperation)({ summary: 'Activate automation' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Automation ID (UUID)' }), (0, swagger_1.ApiQuery)({
                    name: 'registerExisting',
                    required: false,
                    description: 'Register existing subscribers',
                    type: Boolean,
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Automation activated successfully',
                    type: automation_dto_1.AutomationResponseDto,
                }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Automation cannot be activated' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Automation not found' })];
            _pause_decorators = [(0, common_1.Post)(':id/pause'), (0, swagger_1.ApiOperation)({ summary: 'Pause automation' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Automation ID (UUID)' }), (0, swagger_1.ApiQuery)({
                    name: 'cancelPending',
                    required: false,
                    description: 'Cancel pending executions',
                    type: Boolean,
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Automation paused successfully',
                    type: automation_dto_1.AutomationResponseDto,
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Automation not found' })];
            _getExecutions_decorators = [(0, common_1.Get)('executions/list'), (0, swagger_1.ApiOperation)({ summary: 'Get automation executions with pagination' }), (0, swagger_1.ApiQuery)({ name: 'automationId', required: false, description: 'Filter by automation ID' }), (0, swagger_1.ApiQuery)({ name: 'subscriberId', required: false, description: 'Filter by subscriber ID' }), (0, swagger_1.ApiQuery)({ name: 'status', required: false, description: 'Filter by status' }), (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Page number', type: Number }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Items per page', type: Number }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Executions retrieved successfully',
                    schema: {
                        properties: {
                            executions: { type: 'array', items: { $ref: '#/components/schemas/ExecutionResponseDto' } },
                            total: { type: 'number' },
                            page: { type: 'number' },
                            limit: { type: 'number' },
                            totalPages: { type: 'number' },
                        },
                    },
                })];
            _getAnalytics_decorators = [(0, common_1.Get)(':id/analytics'), (0, swagger_1.ApiOperation)({ summary: 'Get automation analytics and performance metrics' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Automation ID (UUID)' }), (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Start date (ISO 8601)' }), (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'End date (ISO 8601)' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Analytics retrieved successfully',
                    type: automation_dto_1.AnalyticsResponseDto,
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Automation not found' })];
            _test_decorators = [(0, common_1.Post)(':id/test'), (0, swagger_1.ApiOperation)({ summary: 'Test automation with a subscriber' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Automation ID (UUID)' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Test completed successfully',
                    schema: {
                        properties: {
                            automation: { type: 'object' },
                            subscriber: { type: 'object' },
                            steps: { type: 'array' },
                            message: { type: 'string' },
                        },
                    },
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Automation or subscriber not found' })];
            _getQueueMetrics_decorators = [(0, common_1.Get)('queue/metrics'), (0, swagger_1.ApiOperation)({ summary: 'Get automation queue metrics' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Queue metrics retrieved successfully',
                    schema: {
                        properties: {
                            waiting: { type: 'number' },
                            active: { type: 'number' },
                            completed: { type: 'number' },
                            failed: { type: 'number' },
                            delayed: { type: 'number' },
                            paused: { type: 'number' },
                        },
                    },
                })];
            _getQueueJobs_decorators = [(0, common_1.Get)('queue/jobs/:status'), (0, swagger_1.ApiOperation)({ summary: 'Get automation queue jobs by status' }), (0, swagger_1.ApiParam)({
                    name: 'status',
                    enum: ['waiting', 'active', 'completed', 'failed', 'delayed'],
                }), (0, swagger_1.ApiQuery)({ name: 'start', required: false, type: Number }), (0, swagger_1.ApiQuery)({ name: 'end', required: false, type: Number }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Queue jobs retrieved successfully' })];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _activate_decorators, { kind: "method", name: "activate", static: false, private: false, access: { has: obj => "activate" in obj, get: obj => obj.activate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _pause_decorators, { kind: "method", name: "pause", static: false, private: false, access: { has: obj => "pause" in obj, get: obj => obj.pause }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getExecutions_decorators, { kind: "method", name: "getExecutions", static: false, private: false, access: { has: obj => "getExecutions" in obj, get: obj => obj.getExecutions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAnalytics_decorators, { kind: "method", name: "getAnalytics", static: false, private: false, access: { has: obj => "getAnalytics" in obj, get: obj => obj.getAnalytics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _test_decorators, { kind: "method", name: "test", static: false, private: false, access: { has: obj => "test" in obj, get: obj => obj.test }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getQueueMetrics_decorators, { kind: "method", name: "getQueueMetrics", static: false, private: false, access: { has: obj => "getQueueMetrics" in obj, get: obj => obj.getQueueMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getQueueJobs_decorators, { kind: "method", name: "getQueueJobs", static: false, private: false, access: { has: obj => "getQueueJobs" in obj, get: obj => obj.getQueueJobs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        automationService = __runInitializers(this, _instanceExtraInitializers);
        queueService;
        constructor(automationService, queueService) {
            this.automationService = automationService;
            this.queueService = queueService;
        }
        /**
         * Create automation
         */
        async create(dto) {
            return this.automationService.create(dto);
        }
        /**
         * Get all automations
         */
        async findAll() {
            return this.automationService.findAll();
        }
        /**
         * Get automation by ID
         */
        async findOne(id) {
            return this.automationService.findOne(id);
        }
        /**
         * Update automation
         */
        async update(id, dto) {
            return this.automationService.update(id, dto);
        }
        /**
         * Delete automation
         */
        async remove(id) {
            return this.automationService.remove(id);
        }
        /**
         * Activate automation
         */
        async activate(id, registerExisting = false) {
            return this.automationService.activate(id, registerExisting);
        }
        /**
         * Pause automation
         */
        async pause(id, cancelPending = false) {
            return this.automationService.pause(id, cancelPending);
        }
        /**
         * Get executions
         */
        async getExecutions(query) {
            return this.automationService.getExecutions(query);
        }
        /**
         * Get automation analytics
         */
        async getAnalytics(id, startDate, endDate) {
            return this.automationService.getAnalytics(id, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
        }
        /**
         * Test automation
         */
        async test(id, dto) {
            return this.automationService.test(id, dto.subscriberId, dto.dryRun);
        }
        /**
         * Get queue metrics
         */
        async getQueueMetrics() {
            return this.queueService.getQueueMetrics();
        }
        /**
         * Get queue jobs
         */
        async getQueueJobs(status, start, end) {
            return this.queueService.getQueueJobs(status, start || 0, end || 10);
        }
    };
    return AutomationController = _classThis;
})();
exports.AutomationController = AutomationController;
//# sourceMappingURL=automation.controller.js.map