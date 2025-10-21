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
exports.UpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let UpdateUserDto = (() => {
    let _classSuper = (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto);
    let _primaryRoleId_decorators;
    let _primaryRoleId_initializers = [];
    let _primaryRoleId_extraInitializers = [];
    let _additionalRoleIds_decorators;
    let _additionalRoleIds_initializers = [];
    let _additionalRoleIds_extraInitializers = [];
    let _roleId_decorators;
    let _roleId_initializers = [];
    let _roleId_extraInitializers = [];
    let _emailVerified_decorators;
    let _emailVerified_initializers = [];
    let _emailVerified_extraInitializers = [];
    let _emailVerifiedAt_decorators;
    let _emailVerifiedAt_initializers = [];
    let _emailVerifiedAt_extraInitializers = [];
    let _emailVerificationToken_decorators;
    let _emailVerificationToken_initializers = [];
    let _emailVerificationToken_extraInitializers = [];
    let _emailVerificationExpires_decorators;
    let _emailVerificationExpires_initializers = [];
    let _emailVerificationExpires_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _customerNumber_decorators;
    let _customerNumber_initializers = [];
    let _customerNumber_extraInitializers = [];
    let _schoolName_decorators;
    let _schoolName_initializers = [];
    let _schoolName_extraInitializers = [];
    let _studentId_decorators;
    let _studentId_initializers = [];
    let _studentId_extraInitializers = [];
    let _isSubscribedToNewsletter_decorators;
    let _isSubscribedToNewsletter_initializers = [];
    let _isSubscribedToNewsletter_extraInitializers = [];
    let _refreshToken_decorators;
    let _refreshToken_initializers = [];
    let _refreshToken_extraInitializers = [];
    let _refreshTokenExpires_decorators;
    let _refreshTokenExpires_initializers = [];
    let _refreshTokenExpires_extraInitializers = [];
    let _lastLoginAt_decorators;
    let _lastLoginAt_initializers = [];
    let _lastLoginAt_extraInitializers = [];
    return class UpdateUserDto extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _primaryRoleId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Primary role ID (UUID)',
                    example: 'a1b2c3d4-e5f6-4789-abcd-000000000001',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _additionalRoleIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Additional role IDs (UUIDs)',
                    example: ['a1b2c3d4-e5f6-4789-abcd-000000000002'],
                    required: false,
                    type: [String],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true })];
            _roleId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Role ID (deprecated - use primaryRoleId instead)',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _emailVerified_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _emailVerifiedAt_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)()];
            _emailVerificationToken_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _emailVerificationExpires_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)()];
            _metadata_decorators = [(0, class_validator_1.IsOptional)()];
            _customerNumber_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _schoolName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _studentId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _isSubscribedToNewsletter_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _refreshToken_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _refreshTokenExpires_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)()];
            _lastLoginAt_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)()];
            __esDecorate(null, null, _primaryRoleId_decorators, { kind: "field", name: "primaryRoleId", static: false, private: false, access: { has: obj => "primaryRoleId" in obj, get: obj => obj.primaryRoleId, set: (obj, value) => { obj.primaryRoleId = value; } }, metadata: _metadata }, _primaryRoleId_initializers, _primaryRoleId_extraInitializers);
            __esDecorate(null, null, _additionalRoleIds_decorators, { kind: "field", name: "additionalRoleIds", static: false, private: false, access: { has: obj => "additionalRoleIds" in obj, get: obj => obj.additionalRoleIds, set: (obj, value) => { obj.additionalRoleIds = value; } }, metadata: _metadata }, _additionalRoleIds_initializers, _additionalRoleIds_extraInitializers);
            __esDecorate(null, null, _roleId_decorators, { kind: "field", name: "roleId", static: false, private: false, access: { has: obj => "roleId" in obj, get: obj => obj.roleId, set: (obj, value) => { obj.roleId = value; } }, metadata: _metadata }, _roleId_initializers, _roleId_extraInitializers);
            __esDecorate(null, null, _emailVerified_decorators, { kind: "field", name: "emailVerified", static: false, private: false, access: { has: obj => "emailVerified" in obj, get: obj => obj.emailVerified, set: (obj, value) => { obj.emailVerified = value; } }, metadata: _metadata }, _emailVerified_initializers, _emailVerified_extraInitializers);
            __esDecorate(null, null, _emailVerifiedAt_decorators, { kind: "field", name: "emailVerifiedAt", static: false, private: false, access: { has: obj => "emailVerifiedAt" in obj, get: obj => obj.emailVerifiedAt, set: (obj, value) => { obj.emailVerifiedAt = value; } }, metadata: _metadata }, _emailVerifiedAt_initializers, _emailVerifiedAt_extraInitializers);
            __esDecorate(null, null, _emailVerificationToken_decorators, { kind: "field", name: "emailVerificationToken", static: false, private: false, access: { has: obj => "emailVerificationToken" in obj, get: obj => obj.emailVerificationToken, set: (obj, value) => { obj.emailVerificationToken = value; } }, metadata: _metadata }, _emailVerificationToken_initializers, _emailVerificationToken_extraInitializers);
            __esDecorate(null, null, _emailVerificationExpires_decorators, { kind: "field", name: "emailVerificationExpires", static: false, private: false, access: { has: obj => "emailVerificationExpires" in obj, get: obj => obj.emailVerificationExpires, set: (obj, value) => { obj.emailVerificationExpires = value; } }, metadata: _metadata }, _emailVerificationExpires_initializers, _emailVerificationExpires_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _customerNumber_decorators, { kind: "field", name: "customerNumber", static: false, private: false, access: { has: obj => "customerNumber" in obj, get: obj => obj.customerNumber, set: (obj, value) => { obj.customerNumber = value; } }, metadata: _metadata }, _customerNumber_initializers, _customerNumber_extraInitializers);
            __esDecorate(null, null, _schoolName_decorators, { kind: "field", name: "schoolName", static: false, private: false, access: { has: obj => "schoolName" in obj, get: obj => obj.schoolName, set: (obj, value) => { obj.schoolName = value; } }, metadata: _metadata }, _schoolName_initializers, _schoolName_extraInitializers);
            __esDecorate(null, null, _studentId_decorators, { kind: "field", name: "studentId", static: false, private: false, access: { has: obj => "studentId" in obj, get: obj => obj.studentId, set: (obj, value) => { obj.studentId = value; } }, metadata: _metadata }, _studentId_initializers, _studentId_extraInitializers);
            __esDecorate(null, null, _isSubscribedToNewsletter_decorators, { kind: "field", name: "isSubscribedToNewsletter", static: false, private: false, access: { has: obj => "isSubscribedToNewsletter" in obj, get: obj => obj.isSubscribedToNewsletter, set: (obj, value) => { obj.isSubscribedToNewsletter = value; } }, metadata: _metadata }, _isSubscribedToNewsletter_initializers, _isSubscribedToNewsletter_extraInitializers);
            __esDecorate(null, null, _refreshToken_decorators, { kind: "field", name: "refreshToken", static: false, private: false, access: { has: obj => "refreshToken" in obj, get: obj => obj.refreshToken, set: (obj, value) => { obj.refreshToken = value; } }, metadata: _metadata }, _refreshToken_initializers, _refreshToken_extraInitializers);
            __esDecorate(null, null, _refreshTokenExpires_decorators, { kind: "field", name: "refreshTokenExpires", static: false, private: false, access: { has: obj => "refreshTokenExpires" in obj, get: obj => obj.refreshTokenExpires, set: (obj, value) => { obj.refreshTokenExpires = value; } }, metadata: _metadata }, _refreshTokenExpires_initializers, _refreshTokenExpires_extraInitializers);
            __esDecorate(null, null, _lastLoginAt_decorators, { kind: "field", name: "lastLoginAt", static: false, private: false, access: { has: obj => "lastLoginAt" in obj, get: obj => obj.lastLoginAt, set: (obj, value) => { obj.lastLoginAt = value; } }, metadata: _metadata }, _lastLoginAt_initializers, _lastLoginAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        // NEW: Primary role support
        primaryRoleId = __runInitializers(this, _primaryRoleId_initializers, void 0);
        // NEW: Additional roles support
        additionalRoleIds = (__runInitializers(this, _primaryRoleId_extraInitializers), __runInitializers(this, _additionalRoleIds_initializers, void 0));
        // DEPRECATED: Keep for backward compatibility
        roleId = (__runInitializers(this, _additionalRoleIds_extraInitializers), __runInitializers(this, _roleId_initializers, void 0));
        emailVerified = (__runInitializers(this, _roleId_extraInitializers), __runInitializers(this, _emailVerified_initializers, void 0));
        emailVerifiedAt = (__runInitializers(this, _emailVerified_extraInitializers), __runInitializers(this, _emailVerifiedAt_initializers, void 0));
        emailVerificationToken = (__runInitializers(this, _emailVerifiedAt_extraInitializers), __runInitializers(this, _emailVerificationToken_initializers, void 0));
        emailVerificationExpires = (__runInitializers(this, _emailVerificationToken_extraInitializers), __runInitializers(this, _emailVerificationExpires_initializers, void 0));
        metadata = (__runInitializers(this, _emailVerificationExpires_extraInitializers), __runInitializers(this, _metadata_initializers, void 0)); // JSONB field
        customerNumber = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _customerNumber_initializers, void 0));
        schoolName = (__runInitializers(this, _customerNumber_extraInitializers), __runInitializers(this, _schoolName_initializers, void 0));
        studentId = (__runInitializers(this, _schoolName_extraInitializers), __runInitializers(this, _studentId_initializers, void 0));
        isSubscribedToNewsletter = (__runInitializers(this, _studentId_extraInitializers), __runInitializers(this, _isSubscribedToNewsletter_initializers, void 0));
        refreshToken = (__runInitializers(this, _isSubscribedToNewsletter_extraInitializers), __runInitializers(this, _refreshToken_initializers, void 0));
        refreshTokenExpires = (__runInitializers(this, _refreshToken_extraInitializers), __runInitializers(this, _refreshTokenExpires_initializers, void 0));
        lastLoginAt = (__runInitializers(this, _refreshTokenExpires_extraInitializers), __runInitializers(this, _lastLoginAt_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _lastLoginAt_extraInitializers);
        }
    };
})();
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map