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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const base_entity_1 = require("../../../database/entities/base.entity");
const notification_entity_1 = require("../../notifications/entities/notification.entity");
const role_entity_1 = require("../../roles/entities/role.entity");
const user_role_entity_1 = require("./user-role.entity");
let User = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('users')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _instanceExtraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _password_decorators;
    let _password_initializers = [];
    let _password_extraInitializers = [];
    let _firstName_decorators;
    let _firstName_initializers = [];
    let _firstName_extraInitializers = [];
    let _lastName_decorators;
    let _lastName_initializers = [];
    let _lastName_extraInitializers = [];
    let _phone_decorators;
    let _phone_initializers = [];
    let _phone_extraInitializers = [];
    let _avatar_decorators;
    let _avatar_initializers = [];
    let _avatar_extraInitializers = [];
    let _address_decorators;
    let _address_initializers = [];
    let _address_extraInitializers = [];
    let _city_decorators;
    let _city_initializers = [];
    let _city_extraInitializers = [];
    let _country_decorators;
    let _country_initializers = [];
    let _country_extraInitializers = [];
    let _bio_decorators;
    let _bio_initializers = [];
    let _bio_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
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
    let _refreshToken_decorators;
    let _refreshToken_initializers = [];
    let _refreshToken_extraInitializers = [];
    let _refreshTokenExpires_decorators;
    let _refreshTokenExpires_initializers = [];
    let _refreshTokenExpires_extraInitializers = [];
    let _lastLoginAt_decorators;
    let _lastLoginAt_initializers = [];
    let _lastLoginAt_extraInitializers = [];
    let _tokenVersion_decorators;
    let _tokenVersion_initializers = [];
    let _tokenVersion_extraInitializers = [];
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
    let _role_decorators;
    let _role_initializers = [];
    let _role_extraInitializers = [];
    let _roleId_decorators;
    let _roleId_initializers = [];
    let _roleId_extraInitializers = [];
    let _roleEntity_decorators;
    let _roleEntity_initializers = [];
    let _roleEntity_extraInitializers = [];
    let _userRoles_decorators;
    let _userRoles_initializers = [];
    let _userRoles_extraInitializers = [];
    let _notifications_decorators;
    let _notifications_initializers = [];
    let _notifications_extraInitializers = [];
    let _get_fullName_decorators;
    let _get_primaryRole_decorators;
    let _get_roles_decorators;
    let _get_roleNames_decorators;
    var User = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _email_decorators = [(0, typeorm_1.Column)({ unique: true })];
            _password_decorators = [(0, typeorm_1.Column)(), (0, class_transformer_1.Exclude)()];
            _firstName_decorators = [(0, typeorm_1.Column)()];
            _lastName_decorators = [(0, typeorm_1.Column)()];
            _phone_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 20 })];
            _avatar_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _address_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _city_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 100 })];
            _country_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 100 })];
            _bio_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
            _emailVerified_decorators = [(0, typeorm_1.Column)({ default: false })];
            _emailVerifiedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _emailVerificationToken_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _emailVerificationExpires_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _refreshToken_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _refreshTokenExpires_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _lastLoginAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _tokenVersion_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 1 })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _customerNumber_decorators = [(0, typeorm_1.Column)({ nullable: true, unique: true })];
            _schoolName_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _studentId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _isSubscribedToNewsletter_decorators = [(0, typeorm_1.Column)({ default: false })];
            _role_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _roleId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _roleEntity_decorators = [(0, typeorm_1.ManyToOne)(() => role_entity_1.Role, role => role.users), (0, typeorm_1.JoinColumn)({ name: 'roleId' })];
            _userRoles_decorators = [(0, typeorm_1.OneToMany)(() => user_role_entity_1.UserRole, userRole => userRole.user, { eager: true })];
            _notifications_decorators = [(0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, notification => notification.user)];
            _get_fullName_decorators = [(0, class_transformer_1.Expose)()];
            _get_primaryRole_decorators = [(0, class_transformer_1.Expose)()];
            _get_roles_decorators = [(0, class_transformer_1.Expose)()];
            _get_roleNames_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(this, null, _get_fullName_decorators, { kind: "getter", name: "fullName", static: false, private: false, access: { has: obj => "fullName" in obj, get: obj => obj.fullName }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_primaryRole_decorators, { kind: "getter", name: "primaryRole", static: false, private: false, access: { has: obj => "primaryRole" in obj, get: obj => obj.primaryRole }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_roles_decorators, { kind: "getter", name: "roles", static: false, private: false, access: { has: obj => "roles" in obj, get: obj => obj.roles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_roleNames_decorators, { kind: "getter", name: "roleNames", static: false, private: false, access: { has: obj => "roleNames" in obj, get: obj => obj.roleNames }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: obj => "password" in obj, get: obj => obj.password, set: (obj, value) => { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: obj => "firstName" in obj, get: obj => obj.firstName, set: (obj, value) => { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: obj => "lastName" in obj, get: obj => obj.lastName, set: (obj, value) => { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: obj => "phone" in obj, get: obj => obj.phone, set: (obj, value) => { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _avatar_decorators, { kind: "field", name: "avatar", static: false, private: false, access: { has: obj => "avatar" in obj, get: obj => obj.avatar, set: (obj, value) => { obj.avatar = value; } }, metadata: _metadata }, _avatar_initializers, _avatar_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: obj => "city" in obj, get: obj => obj.city, set: (obj, value) => { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: obj => "country" in obj, get: obj => obj.country, set: (obj, value) => { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
            __esDecorate(null, null, _bio_decorators, { kind: "field", name: "bio", static: false, private: false, access: { has: obj => "bio" in obj, get: obj => obj.bio, set: (obj, value) => { obj.bio = value; } }, metadata: _metadata }, _bio_initializers, _bio_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _emailVerified_decorators, { kind: "field", name: "emailVerified", static: false, private: false, access: { has: obj => "emailVerified" in obj, get: obj => obj.emailVerified, set: (obj, value) => { obj.emailVerified = value; } }, metadata: _metadata }, _emailVerified_initializers, _emailVerified_extraInitializers);
            __esDecorate(null, null, _emailVerifiedAt_decorators, { kind: "field", name: "emailVerifiedAt", static: false, private: false, access: { has: obj => "emailVerifiedAt" in obj, get: obj => obj.emailVerifiedAt, set: (obj, value) => { obj.emailVerifiedAt = value; } }, metadata: _metadata }, _emailVerifiedAt_initializers, _emailVerifiedAt_extraInitializers);
            __esDecorate(null, null, _emailVerificationToken_decorators, { kind: "field", name: "emailVerificationToken", static: false, private: false, access: { has: obj => "emailVerificationToken" in obj, get: obj => obj.emailVerificationToken, set: (obj, value) => { obj.emailVerificationToken = value; } }, metadata: _metadata }, _emailVerificationToken_initializers, _emailVerificationToken_extraInitializers);
            __esDecorate(null, null, _emailVerificationExpires_decorators, { kind: "field", name: "emailVerificationExpires", static: false, private: false, access: { has: obj => "emailVerificationExpires" in obj, get: obj => obj.emailVerificationExpires, set: (obj, value) => { obj.emailVerificationExpires = value; } }, metadata: _metadata }, _emailVerificationExpires_initializers, _emailVerificationExpires_extraInitializers);
            __esDecorate(null, null, _refreshToken_decorators, { kind: "field", name: "refreshToken", static: false, private: false, access: { has: obj => "refreshToken" in obj, get: obj => obj.refreshToken, set: (obj, value) => { obj.refreshToken = value; } }, metadata: _metadata }, _refreshToken_initializers, _refreshToken_extraInitializers);
            __esDecorate(null, null, _refreshTokenExpires_decorators, { kind: "field", name: "refreshTokenExpires", static: false, private: false, access: { has: obj => "refreshTokenExpires" in obj, get: obj => obj.refreshTokenExpires, set: (obj, value) => { obj.refreshTokenExpires = value; } }, metadata: _metadata }, _refreshTokenExpires_initializers, _refreshTokenExpires_extraInitializers);
            __esDecorate(null, null, _lastLoginAt_decorators, { kind: "field", name: "lastLoginAt", static: false, private: false, access: { has: obj => "lastLoginAt" in obj, get: obj => obj.lastLoginAt, set: (obj, value) => { obj.lastLoginAt = value; } }, metadata: _metadata }, _lastLoginAt_initializers, _lastLoginAt_extraInitializers);
            __esDecorate(null, null, _tokenVersion_decorators, { kind: "field", name: "tokenVersion", static: false, private: false, access: { has: obj => "tokenVersion" in obj, get: obj => obj.tokenVersion, set: (obj, value) => { obj.tokenVersion = value; } }, metadata: _metadata }, _tokenVersion_initializers, _tokenVersion_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _customerNumber_decorators, { kind: "field", name: "customerNumber", static: false, private: false, access: { has: obj => "customerNumber" in obj, get: obj => obj.customerNumber, set: (obj, value) => { obj.customerNumber = value; } }, metadata: _metadata }, _customerNumber_initializers, _customerNumber_extraInitializers);
            __esDecorate(null, null, _schoolName_decorators, { kind: "field", name: "schoolName", static: false, private: false, access: { has: obj => "schoolName" in obj, get: obj => obj.schoolName, set: (obj, value) => { obj.schoolName = value; } }, metadata: _metadata }, _schoolName_initializers, _schoolName_extraInitializers);
            __esDecorate(null, null, _studentId_decorators, { kind: "field", name: "studentId", static: false, private: false, access: { has: obj => "studentId" in obj, get: obj => obj.studentId, set: (obj, value) => { obj.studentId = value; } }, metadata: _metadata }, _studentId_initializers, _studentId_extraInitializers);
            __esDecorate(null, null, _isSubscribedToNewsletter_decorators, { kind: "field", name: "isSubscribedToNewsletter", static: false, private: false, access: { has: obj => "isSubscribedToNewsletter" in obj, get: obj => obj.isSubscribedToNewsletter, set: (obj, value) => { obj.isSubscribedToNewsletter = value; } }, metadata: _metadata }, _isSubscribedToNewsletter_initializers, _isSubscribedToNewsletter_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: obj => "role" in obj, get: obj => obj.role, set: (obj, value) => { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _roleId_decorators, { kind: "field", name: "roleId", static: false, private: false, access: { has: obj => "roleId" in obj, get: obj => obj.roleId, set: (obj, value) => { obj.roleId = value; } }, metadata: _metadata }, _roleId_initializers, _roleId_extraInitializers);
            __esDecorate(null, null, _roleEntity_decorators, { kind: "field", name: "roleEntity", static: false, private: false, access: { has: obj => "roleEntity" in obj, get: obj => obj.roleEntity, set: (obj, value) => { obj.roleEntity = value; } }, metadata: _metadata }, _roleEntity_initializers, _roleEntity_extraInitializers);
            __esDecorate(null, null, _userRoles_decorators, { kind: "field", name: "userRoles", static: false, private: false, access: { has: obj => "userRoles" in obj, get: obj => obj.userRoles, set: (obj, value) => { obj.userRoles = value; } }, metadata: _metadata }, _userRoles_initializers, _userRoles_extraInitializers);
            __esDecorate(null, null, _notifications_decorators, { kind: "field", name: "notifications", static: false, private: false, access: { has: obj => "notifications" in obj, get: obj => obj.notifications, set: (obj, value) => { obj.notifications = value; } }, metadata: _metadata }, _notifications_initializers, _notifications_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            User = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        email = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _email_initializers, void 0));
        password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
        firstName = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _firstName_initializers, void 0));
        lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
        phone = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
        avatar = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _avatar_initializers, void 0)); // URL to avatar image
        address = (__runInitializers(this, _avatar_extraInitializers), __runInitializers(this, _address_initializers, void 0));
        city = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _city_initializers, void 0));
        country = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _country_initializers, void 0));
        bio = (__runInitializers(this, _country_extraInitializers), __runInitializers(this, _bio_initializers, void 0));
        isActive = (__runInitializers(this, _bio_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        emailVerified = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _emailVerified_initializers, void 0));
        emailVerifiedAt = (__runInitializers(this, _emailVerified_extraInitializers), __runInitializers(this, _emailVerifiedAt_initializers, void 0));
        emailVerificationToken = (__runInitializers(this, _emailVerifiedAt_extraInitializers), __runInitializers(this, _emailVerificationToken_initializers, void 0));
        emailVerificationExpires = (__runInitializers(this, _emailVerificationToken_extraInitializers), __runInitializers(this, _emailVerificationExpires_initializers, void 0));
        refreshToken = (__runInitializers(this, _emailVerificationExpires_extraInitializers), __runInitializers(this, _refreshToken_initializers, void 0));
        refreshTokenExpires = (__runInitializers(this, _refreshToken_extraInitializers), __runInitializers(this, _refreshTokenExpires_initializers, void 0));
        lastLoginAt = (__runInitializers(this, _refreshTokenExpires_extraInitializers), __runInitializers(this, _lastLoginAt_initializers, void 0));
        // Token versioning for role/permission changes
        tokenVersion = (__runInitializers(this, _lastLoginAt_extraInitializers), __runInitializers(this, _tokenVersion_initializers, void 0));
        // Account type metadata (for customer, student, subscriber flags)
        metadata = (__runInitializers(this, _tokenVersion_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        // Customer specific fields
        customerNumber = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _customerNumber_initializers, void 0));
        // Student specific fields
        schoolName = (__runInitializers(this, _customerNumber_extraInitializers), __runInitializers(this, _schoolName_initializers, void 0));
        studentId = (__runInitializers(this, _schoolName_extraInitializers), __runInitializers(this, _studentId_initializers, void 0));
        // Subscriber preferences
        isSubscribedToNewsletter = (__runInitializers(this, _studentId_extraInitializers), __runInitializers(this, _isSubscribedToNewsletter_initializers, void 0));
        // Legacy role field (kept for backward compatibility, deprecated)
        role = (__runInitializers(this, _isSubscribedToNewsletter_extraInitializers), __runInitializers(this, _role_initializers, void 0));
        // DEPRECATED: Single role relationship (kept for backward compatibility)
        roleId = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _roleId_initializers, void 0));
        roleEntity = (__runInitializers(this, _roleId_extraInitializers), __runInitializers(this, _roleEntity_initializers, void 0));
        // NEW: Many-to-Many relationship for multi-role support
        userRoles = (__runInitializers(this, _roleEntity_extraInitializers), __runInitializers(this, _userRoles_initializers, void 0));
        notifications = (__runInitializers(this, _userRoles_extraInitializers), __runInitializers(this, _notifications_initializers, void 0));
        // Computed property for full name
        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        }
        // NEW: Computed property for primary role
        get primaryRole() {
            const primary = this.userRoles?.find(ur => ur.isPrimary);
            return primary?.role || null;
        }
        // NEW: Computed property for all roles
        get roles() {
            return this.userRoles?.map(ur => ur.role).filter(Boolean) || [];
        }
        // NEW: Computed property for all role names
        get roleNames() {
            return this.roles.map(r => r.name);
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _notifications_extraInitializers);
        }
    };
    return User = _classThis;
})();
exports.User = User;
//# sourceMappingURL=user.entity.js.map