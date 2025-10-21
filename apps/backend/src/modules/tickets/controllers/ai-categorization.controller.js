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
exports.AICategorizationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
/**
 * AI Categorization Controller
 * ML-powered ticket categorization
 */
let AICategorizationController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('AI Categorization'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('tickets/ai'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getSuggestions_decorators;
    let _autoCategorizе_decorators;
    let _trainModel_decorators;
    let _getStatistics_decorators;
    let _validatePrediction_decorators;
    var AICategorizationController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getSuggestions_decorators = [(0, common_1.Get)(':ticketId/suggestions'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get AI category suggestions for ticket' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Suggestions retrieved' })];
            _autoCategorizе_decorators = [(0, common_1.Post)(':ticketId/categorize'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Auto-categorize ticket using AI' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket categorized' })];
            _trainModel_decorators = [(0, common_1.Post)('train'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Train AI categorization model' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Model training completed' })];
            _getStatistics_decorators = [(0, common_1.Get)('stats'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get AI categorization statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved' })];
            _validatePrediction_decorators = [(0, common_1.Post)(':ticketId/validate'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Validate AI prediction accuracy' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Validation recorded' })];
            __esDecorate(this, null, _getSuggestions_decorators, { kind: "method", name: "getSuggestions", static: false, private: false, access: { has: obj => "getSuggestions" in obj, get: obj => obj.getSuggestions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _autoCategorizе_decorators, { kind: "method", name: "autoCategoriz\u0435", static: false, private: false, access: { has: obj => "autoCategoriz\u0435" in obj, get: obj => obj.autoCategorizе }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _trainModel_decorators, { kind: "method", name: "trainModel", static: false, private: false, access: { has: obj => "trainModel" in obj, get: obj => obj.trainModel }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStatistics_decorators, { kind: "method", name: "getStatistics", static: false, private: false, access: { has: obj => "getStatistics" in obj, get: obj => obj.getStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _validatePrediction_decorators, { kind: "method", name: "validatePrediction", static: false, private: false, access: { has: obj => "validatePrediction" in obj, get: obj => obj.validatePrediction }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AICategorizationController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        aiCategorizationService = __runInitializers(this, _instanceExtraInitializers);
        constructor(aiCategorizationService) {
            this.aiCategorizationService = aiCategorizationService;
        }
        /**
         * Get category suggestions for a ticket
         */
        async getSuggestions(ticketId) {
            return await this.aiCategorizationService.getSuggestions(ticketId);
        }
        /**
         * Auto-categorize a ticket
         */
        async autoCategorizе(ticketId) {
            const result = await this.aiCategorizationService.autoCategorizе(ticketId);
            if (!result) {
                return {
                    success: false,
                    message: 'Could not categorize with sufficient confidence',
                };
            }
            return {
                success: true,
                category: result,
            };
        }
        /**
         * Train AI model with historical data
         */
        async trainModel() {
            return await this.aiCategorizationService.trainModel();
        }
        /**
         * Get AI categorization statistics
         */
        async getStatistics() {
            return await this.aiCategorizationService.getStatistics();
        }
        /**
         * Validate prediction accuracy
         */
        async validatePrediction(ticketId, body) {
            const isCorrect = await this.aiCategorizationService.validatePrediction(ticketId, body.predictedCategoryId, body.actualCategoryId);
            return {
                ticketId,
                isCorrect,
                message: isCorrect
                    ? 'Prediction was correct'
                    : 'Prediction was incorrect',
            };
        }
    };
    return AICategorizationController = _classThis;
})();
exports.AICategorizationController = AICategorizationController;
//# sourceMappingURL=ai-categorization.controller.js.map