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
exports.CustomFieldController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
let CustomFieldController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Custom Fields'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Controller)('email-marketing/custom-fields')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _getMappingOptions_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    let _reorder_decorators;
    var CustomFieldController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Create a new custom field' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Custom field created successfully' })];
            _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all custom fields' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Custom fields retrieved successfully' })];
            _getMappingOptions_decorators = [(0, common_1.Get)('mapping-options'), (0, swagger_1.ApiOperation)({ summary: 'Get fields available for column mapping' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Mapping options retrieved successfully' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get a custom field by ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Custom field retrieved successfully' })];
            _update_decorators = [(0, common_1.Put)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Update a custom field' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Custom field updated successfully' })];
            _remove_decorators = [(0, common_1.Delete)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Delete a custom field' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Custom field deleted successfully' })];
            _reorder_decorators = [(0, common_1.Put)('reorder'), (0, swagger_1.ApiOperation)({ summary: 'Reorder custom fields' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Custom fields reordered successfully' })];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMappingOptions_decorators, { kind: "method", name: "getMappingOptions", static: false, private: false, access: { has: obj => "getMappingOptions" in obj, get: obj => obj.getMappingOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _reorder_decorators, { kind: "method", name: "reorder", static: false, private: false, access: { has: obj => "reorder" in obj, get: obj => obj.reorder }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CustomFieldController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        customFieldService = __runInitializers(this, _instanceExtraInitializers);
        constructor(customFieldService) {
            this.customFieldService = customFieldService;
        }
        async create(createDto) {
            const field = await this.customFieldService.create(createDto);
            return {
                success: true,
                message: 'Custom field created successfully',
                data: field
            };
        }
        async findAll(activeOnly) {
            const fields = await this.customFieldService.findAll(activeOnly === 'true');
            return {
                success: true,
                data: fields
            };
        }
        async getMappingOptions() {
            console.log('🔐 CustomFieldController: mapping-options endpoint called');
            const fields = await this.customFieldService.getFieldsForMapping();
            return {
                success: true,
                data: fields
            };
        }
        async findOne(id) {
            const field = await this.customFieldService.findOne(id);
            return {
                success: true,
                data: field
            };
        }
        async update(id, updateDto) {
            const field = await this.customFieldService.update(id, updateDto);
            return {
                success: true,
                message: 'Custom field updated successfully',
                data: field
            };
        }
        async remove(id) {
            await this.customFieldService.remove(id);
            return {
                success: true,
                message: 'Custom field deleted successfully'
            };
        }
        async reorder(body) {
            await this.customFieldService.reorder(body.fieldIds);
            return {
                success: true,
                message: 'Custom fields reordered successfully'
            };
        }
    };
    return CustomFieldController = _classThis;
})();
exports.CustomFieldController = CustomFieldController;
//# sourceMappingURL=custom-field.controller.js.map