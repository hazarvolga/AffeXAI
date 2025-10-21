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
exports.ABTestController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
let ABTestController = (() => {
    let _classDecorators = [(0, common_1.Controller)('ab-tests'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createTest_decorators;
    let _getAllTests_decorators;
    let _getTestById_decorators;
    let _updateTest_decorators;
    let _deleteTest_decorators;
    let _startTest_decorators;
    let _pauseTest_decorators;
    let _completeTest_decorators;
    var ABTestController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createTest_decorators = [(0, common_1.Post)()];
            _getAllTests_decorators = [(0, common_1.Get)()];
            _getTestById_decorators = [(0, common_1.Get)(':id')];
            _updateTest_decorators = [(0, common_1.Put)(':id')];
            _deleteTest_decorators = [(0, common_1.Delete)(':id')];
            _startTest_decorators = [(0, common_1.Post)(':id/start')];
            _pauseTest_decorators = [(0, common_1.Post)(':id/pause')];
            _completeTest_decorators = [(0, common_1.Post)(':id/complete')];
            __esDecorate(this, null, _createTest_decorators, { kind: "method", name: "createTest", static: false, private: false, access: { has: obj => "createTest" in obj, get: obj => obj.createTest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAllTests_decorators, { kind: "method", name: "getAllTests", static: false, private: false, access: { has: obj => "getAllTests" in obj, get: obj => obj.getAllTests }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTestById_decorators, { kind: "method", name: "getTestById", static: false, private: false, access: { has: obj => "getTestById" in obj, get: obj => obj.getTestById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateTest_decorators, { kind: "method", name: "updateTest", static: false, private: false, access: { has: obj => "updateTest" in obj, get: obj => obj.updateTest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteTest_decorators, { kind: "method", name: "deleteTest", static: false, private: false, access: { has: obj => "deleteTest" in obj, get: obj => obj.deleteTest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _startTest_decorators, { kind: "method", name: "startTest", static: false, private: false, access: { has: obj => "startTest" in obj, get: obj => obj.startTest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _pauseTest_decorators, { kind: "method", name: "pauseTest", static: false, private: false, access: { has: obj => "pauseTest" in obj, get: obj => obj.pauseTest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _completeTest_decorators, { kind: "method", name: "completeTest", static: false, private: false, access: { has: obj => "completeTest" in obj, get: obj => obj.completeTest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ABTestController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        abTestingService = __runInitializers(this, _instanceExtraInitializers);
        constructor(abTestingService) {
            this.abTestingService = abTestingService;
        }
        /**
         * Create new A/B test
         * POST /ab-tests
         */
        async createTest(dto) {
            return this.abTestingService.createTest(dto);
        }
        /**
         * Get all A/B tests
         * GET /ab-tests
         */
        async getAllTests(status) {
            return this.abTestingService.getAllTests(status);
        }
        /**
         * Get A/B test by ID
         * GET /ab-tests/:id
         */
        async getTestById(id) {
            return this.abTestingService.getTestById(id);
        }
        /**
         * Update A/B test
         * PUT /ab-tests/:id
         */
        async updateTest(id, dto) {
            return this.abTestingService.updateTest(id, dto);
        }
        /**
         * Delete A/B test
         * DELETE /ab-tests/:id
         */
        async deleteTest(id) {
            await this.abTestingService.deleteTest(id);
            return { message: 'Test deleted successfully' };
        }
        /**
         * Start A/B test
         * POST /ab-tests/:id/start
         */
        async startTest(id) {
            return this.abTestingService.startTest(id);
        }
        /**
         * Pause A/B test
         * POST /ab-tests/:id/pause
         */
        async pauseTest(id) {
            return this.abTestingService.pauseTest(id);
        }
        /**
         * Complete A/B test
         * POST /ab-tests/:id/complete
         */
        async completeTest(id, winnerVariantId) {
            return this.abTestingService.completeTest(id, winnerVariantId);
        }
    };
    return ABTestController = _classThis;
})();
exports.ABTestController = ABTestController;
//# sourceMappingURL=ab-test.controller.js.map