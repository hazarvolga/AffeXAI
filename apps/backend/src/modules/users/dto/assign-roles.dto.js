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
exports.AssignRolesDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
/**
 * DTO for assigning multiple roles to a user
 */
let AssignRolesDto = (() => {
    let _primaryRoleId_decorators;
    let _primaryRoleId_initializers = [];
    let _primaryRoleId_extraInitializers = [];
    let _additionalRoleIds_decorators;
    let _additionalRoleIds_initializers = [];
    let _additionalRoleIds_extraInitializers = [];
    let _replaceExisting_decorators;
    let _replaceExisting_initializers = [];
    let _replaceExisting_extraInitializers = [];
    return class AssignRolesDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _primaryRoleId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Primary role ID',
                    example: 'a1b2c3d4-e5f6-4789-abcd-000000000001',
                }), (0, class_validator_1.IsUUID)()];
            _additionalRoleIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Additional role IDs (optional)',
                    example: ['a1b2c3d4-e5f6-4789-abcd-000000000002'],
                    required: false,
                    type: [String],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true })];
            _replaceExisting_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Replace all existing roles (default: true)',
                    required: false,
                    default: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _primaryRoleId_decorators, { kind: "field", name: "primaryRoleId", static: false, private: false, access: { has: obj => "primaryRoleId" in obj, get: obj => obj.primaryRoleId, set: (obj, value) => { obj.primaryRoleId = value; } }, metadata: _metadata }, _primaryRoleId_initializers, _primaryRoleId_extraInitializers);
            __esDecorate(null, null, _additionalRoleIds_decorators, { kind: "field", name: "additionalRoleIds", static: false, private: false, access: { has: obj => "additionalRoleIds" in obj, get: obj => obj.additionalRoleIds, set: (obj, value) => { obj.additionalRoleIds = value; } }, metadata: _metadata }, _additionalRoleIds_initializers, _additionalRoleIds_extraInitializers);
            __esDecorate(null, null, _replaceExisting_decorators, { kind: "field", name: "replaceExisting", static: false, private: false, access: { has: obj => "replaceExisting" in obj, get: obj => obj.replaceExisting, set: (obj, value) => { obj.replaceExisting = value; } }, metadata: _metadata }, _replaceExisting_initializers, _replaceExisting_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        primaryRoleId = __runInitializers(this, _primaryRoleId_initializers, void 0);
        additionalRoleIds = (__runInitializers(this, _primaryRoleId_extraInitializers), __runInitializers(this, _additionalRoleIds_initializers, void 0));
        replaceExisting = (__runInitializers(this, _additionalRoleIds_extraInitializers), __runInitializers(this, _replaceExisting_initializers, void 0));
        constructor() {
            __runInitializers(this, _replaceExisting_extraInitializers);
        }
    };
})();
exports.AssignRolesDto = AssignRolesDto;
//# sourceMappingURL=assign-roles.dto.js.map