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
exports.AbTestController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const ab_test_dto_1 = require("../dto/ab-test.dto");
/**
 * A/B Test Controller
 * Handles all A/B testing operations for email campaigns
 */
let AbTestController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('A/B Testing'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Controller)('email-marketing/ab-test')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createAbTest_decorators;
    let _getResults_decorators;
    let _getSummary_decorators;
    let _updateVariant_decorators;
    let _sendAbTest_decorators;
    let _selectWinner_decorators;
    let _deleteAbTest_decorators;
    var AbTestController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createAbTest_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({
                    summary: 'Create A/B test',
                    description: 'Create a new A/B test with 2-5 variants for an email campaign',
                }), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'A/B test created successfully',
                }), (0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'Bad request - Invalid split percentages or variant configuration',
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'Campaign not found',
                })];
            _getResults_decorators = [(0, common_1.Get)(':campaignId/results'), (0, swagger_1.ApiOperation)({
                    summary: 'Get A/B test results',
                    description: 'Get detailed results including variant metrics, statistical significance, and winner determination',
                }), (0, swagger_1.ApiParam)({
                    name: 'campaignId',
                    description: 'Campaign ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'A/B test results retrieved successfully',
                    type: ab_test_dto_1.AbTestResultDto,
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'A/B test not found',
                })];
            _getSummary_decorators = [(0, common_1.Get)(':campaignId/summary'), (0, swagger_1.ApiOperation)({
                    summary: 'Get A/B test summary',
                    description: 'Get basic information about an A/B test',
                }), (0, swagger_1.ApiParam)({
                    name: 'campaignId',
                    description: 'Campaign ID',
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'A/B test summary retrieved successfully',
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'A/B test not found',
                })];
            _updateVariant_decorators = [(0, common_1.Put)(':campaignId/variants/:variantId'), (0, swagger_1.ApiOperation)({
                    summary: 'Update variant',
                    description: 'Update a variant\'s subject, content, or split percentage',
                }), (0, swagger_1.ApiParam)({
                    name: 'campaignId',
                    description: 'Campaign ID',
                }), (0, swagger_1.ApiParam)({
                    name: 'variantId',
                    description: 'Variant ID',
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Variant updated successfully',
                }), (0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'Cannot update variant after test is completed',
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'Variant not found',
                })];
            _sendAbTest_decorators = [(0, common_1.Post)(':campaignId/send'), (0, swagger_1.ApiOperation)({
                    summary: 'Send A/B test',
                    description: 'Start the A/B test by sending variants to subscribers',
                }), (0, swagger_1.ApiParam)({
                    name: 'campaignId',
                    description: 'Campaign ID',
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'A/B test sending initiated',
                }), (0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'No variants configured or no active subscribers',
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'A/B test not found',
                })];
            _selectWinner_decorators = [(0, common_1.Post)(':campaignId/select-winner'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({
                    summary: 'Select winner',
                    description: 'Manually select the winning variant for the A/B test',
                }), (0, swagger_1.ApiParam)({
                    name: 'campaignId',
                    description: 'Campaign ID',
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Winner selected successfully',
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'A/B test or variant not found',
                })];
            _deleteAbTest_decorators = [(0, common_1.Delete)(':campaignId'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({
                    summary: 'Delete A/B test',
                    description: 'Delete an A/B test and all its variants (only if not yet sent)',
                }), (0, swagger_1.ApiParam)({
                    name: 'campaignId',
                    description: 'Campaign ID',
                }), (0, swagger_1.ApiResponse)({
                    status: 204,
                    description: 'A/B test deleted successfully',
                }), (0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'Cannot delete A/B test that has been sent',
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'A/B test not found',
                })];
            __esDecorate(this, null, _createAbTest_decorators, { kind: "method", name: "createAbTest", static: false, private: false, access: { has: obj => "createAbTest" in obj, get: obj => obj.createAbTest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getResults_decorators, { kind: "method", name: "getResults", static: false, private: false, access: { has: obj => "getResults" in obj, get: obj => obj.getResults }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSummary_decorators, { kind: "method", name: "getSummary", static: false, private: false, access: { has: obj => "getSummary" in obj, get: obj => obj.getSummary }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateVariant_decorators, { kind: "method", name: "updateVariant", static: false, private: false, access: { has: obj => "updateVariant" in obj, get: obj => obj.updateVariant }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sendAbTest_decorators, { kind: "method", name: "sendAbTest", static: false, private: false, access: { has: obj => "sendAbTest" in obj, get: obj => obj.sendAbTest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _selectWinner_decorators, { kind: "method", name: "selectWinner", static: false, private: false, access: { has: obj => "selectWinner" in obj, get: obj => obj.selectWinner }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteAbTest_decorators, { kind: "method", name: "deleteAbTest", static: false, private: false, access: { has: obj => "deleteAbTest" in obj, get: obj => obj.deleteAbTest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AbTestController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        abTestService = __runInitializers(this, _instanceExtraInitializers);
        constructor(abTestService) {
            this.abTestService = abTestService;
        }
        /**
         * Create a new A/B test for a campaign
         */
        async createAbTest(dto) {
            return this.abTestService.createAbTest(dto);
        }
        /**
         * Get A/B test results with statistical analysis
         */
        async getResults(campaignId) {
            return this.abTestService.getAbTestResults(campaignId);
        }
        /**
         * Get A/B test summary
         */
        async getSummary(campaignId) {
            return this.abTestService.getAbTestSummary(campaignId);
        }
        /**
         * Update a variant's content
         */
        async updateVariant(campaignId, variantId, dto) {
            return this.abTestService.updateVariant(campaignId, variantId, dto);
        }
        /**
         * Send A/B test (start the test)
         */
        async sendAbTest(campaignId, dto) {
            // Ensure campaignId is set in DTO
            dto.campaignId = campaignId;
            return this.abTestService.sendAbTest(dto);
        }
        /**
         * Manually select winner
         */
        async selectWinner(campaignId, dto) {
            return this.abTestService.selectWinner(campaignId, dto.variantId);
        }
        /**
         * Delete A/B test
         */
        async deleteAbTest(campaignId) {
            await this.abTestService.deleteAbTest(campaignId);
        }
    };
    return AbTestController = _classThis;
})();
exports.AbTestController = AbTestController;
//# sourceMappingURL=ab-test.controller.js.map