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
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const user_role_entity_1 = require("../../users/entities/user-role.entity");
let Role = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('roles')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _displayName_decorators;
    let _displayName_initializers = [];
    let _displayName_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _permissions_decorators;
    let _permissions_initializers = [];
    let _permissions_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _isSystem_decorators;
    let _isSystem_initializers = [];
    let _isSystem_extraInitializers = [];
    let _users_decorators;
    let _users_initializers = [];
    let _users_extraInitializers = [];
    let _userRoles_decorators;
    let _userRoles_initializers = [];
    let _userRoles_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    var Role = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _name_decorators = [(0, typeorm_1.Column)({ unique: true, length: 100 })];
            _displayName_decorators = [(0, typeorm_1.Column)({ length: 100 })];
            _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _permissions_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', default: [] })];
            _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
            _isSystem_decorators = [(0, typeorm_1.Column)({ default: false })];
            _users_decorators = [(0, typeorm_1.OneToMany)(() => user_entity_1.User, user => user.roleEntity)];
            _userRoles_decorators = [(0, typeorm_1.OneToMany)(() => user_role_entity_1.UserRole, userRole => userRole.role)];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _displayName_decorators, { kind: "field", name: "displayName", static: false, private: false, access: { has: obj => "displayName" in obj, get: obj => obj.displayName, set: (obj, value) => { obj.displayName = value; } }, metadata: _metadata }, _displayName_initializers, _displayName_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _permissions_decorators, { kind: "field", name: "permissions", static: false, private: false, access: { has: obj => "permissions" in obj, get: obj => obj.permissions, set: (obj, value) => { obj.permissions = value; } }, metadata: _metadata }, _permissions_initializers, _permissions_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _isSystem_decorators, { kind: "field", name: "isSystem", static: false, private: false, access: { has: obj => "isSystem" in obj, get: obj => obj.isSystem, set: (obj, value) => { obj.isSystem = value; } }, metadata: _metadata }, _isSystem_initializers, _isSystem_extraInitializers);
            __esDecorate(null, null, _users_decorators, { kind: "field", name: "users", static: false, private: false, access: { has: obj => "users" in obj, get: obj => obj.users, set: (obj, value) => { obj.users = value; } }, metadata: _metadata }, _users_initializers, _users_extraInitializers);
            __esDecorate(null, null, _userRoles_decorators, { kind: "field", name: "userRoles", static: false, private: false, access: { has: obj => "userRoles" in obj, get: obj => obj.userRoles, set: (obj, value) => { obj.userRoles = value; } }, metadata: _metadata }, _userRoles_initializers, _userRoles_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Role = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0)); // Unique identifier (e.g., 'admin', 'editor')
        displayName = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _displayName_initializers, void 0)); // Display name (e.g., 'Admin', 'Editor')
        description = (__runInitializers(this, _displayName_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        permissions = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _permissions_initializers, void 0)); // Array of permission IDs
        isActive = (__runInitializers(this, _permissions_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        isSystem = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _isSystem_initializers, void 0)); // System roles cannot be deleted
        // DEPRECATED: Single role relationship (kept for backward compatibility)
        users = (__runInitializers(this, _isSystem_extraInitializers), __runInitializers(this, _users_initializers, void 0));
        // NEW: Many-to-Many relationship for multi-role support
        userRoles = (__runInitializers(this, _users_extraInitializers), __runInitializers(this, _userRoles_initializers, void 0));
        createdAt = (__runInitializers(this, _userRoles_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return Role = _classThis;
})();
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map