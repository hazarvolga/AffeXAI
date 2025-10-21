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
exports.Setting = exports.SettingCategory = void 0;
const typeorm_1 = require("typeorm");
const encryption_util_1 = require("../../../shared/utils/encryption.util");
var SettingCategory;
(function (SettingCategory) {
    SettingCategory["COMPANY"] = "company";
    SettingCategory["AI"] = "ai";
    SettingCategory["EMAIL"] = "email";
    SettingCategory["SOCIAL_MEDIA"] = "social_media";
    SettingCategory["ANALYTICS"] = "analytics";
})(SettingCategory || (exports.SettingCategory = SettingCategory = {}));
/**
 * Şifrelenmesi gereken ayar key'leri
 * Bu listede olmayan key'ler plain text olarak saklanır
 */
const ENCRYPTED_KEYS = [
    'email.apiKey',
    'email.resend.apiKey',
    'email.sendgrid.apiKey',
    'email.postmark.apiKey',
    'email.mailgun.apiKey',
    'email.ses.accessKey',
    'email.ses.secretKey',
    'email.smtp.password',
    'ai.global.apiKey',
    'ai.social.apiKey',
    'ai.emailMarketing.apiKey',
    'ai.support.apiKey',
    'ai.analytics.apiKey',
];
let Setting = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('settings')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _key_decorators;
    let _key_initializers = [];
    let _key_extraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _isEncrypted_decorators;
    let _isEncrypted_initializers = [];
    let _isEncrypted_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _encryptSensitiveData_decorators;
    var Setting = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _category_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100 })];
            _key_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100 })];
            _value_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _isEncrypted_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'is_encrypted' })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'created_at' })];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' })];
            _encryptSensitiveData_decorators = [(0, typeorm_1.BeforeInsert)(), (0, typeorm_1.BeforeUpdate)()];
            __esDecorate(this, null, _encryptSensitiveData_decorators, { kind: "method", name: "encryptSensitiveData", static: false, private: false, access: { has: obj => "encryptSensitiveData" in obj, get: obj => obj.encryptSensitiveData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _key_decorators, { kind: "field", name: "key", static: false, private: false, access: { has: obj => "key" in obj, get: obj => obj.key, set: (obj, value) => { obj.key = value; } }, metadata: _metadata }, _key_initializers, _key_extraInitializers);
            __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
            __esDecorate(null, null, _isEncrypted_decorators, { kind: "field", name: "isEncrypted", static: false, private: false, access: { has: obj => "isEncrypted" in obj, get: obj => obj.isEncrypted, set: (obj, value) => { obj.isEncrypted = value; } }, metadata: _metadata }, _isEncrypted_initializers, _isEncrypted_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Setting = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
        category = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        key = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _key_initializers, void 0));
        value = (__runInitializers(this, _key_extraInitializers), __runInitializers(this, _value_initializers, void 0));
        isEncrypted = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _isEncrypted_initializers, void 0));
        createdAt = (__runInitializers(this, _isEncrypted_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        /**
         * Key'e göre otomatik şifreleme/deşifreleme
         */
        encryptSensitiveData() {
            const fullKey = `${this.category}.${this.key}`;
            if (ENCRYPTED_KEYS.includes(fullKey) && this.value) {
                // Zaten şifrelenmiş mi kontrol et (update durumunda)
                if (!this.isEncrypted) {
                    this.value = encryption_util_1.EncryptionUtil.encrypt(this.value);
                    this.isEncrypted = true;
                }
            }
        }
        /**
         * Şifreli veriyi oku (getter)
         */
        getDecryptedValue() {
            if (this.isEncrypted && this.value) {
                try {
                    return encryption_util_1.EncryptionUtil.decrypt(this.value);
                }
                catch (error) {
                    console.error(`[Setting] Decryption error for key=${this.key}, category=${this.category}:`, error.message);
                    throw new Error(`Failed to decrypt setting ${this.category}.${this.key}: ${error.message}`);
                }
            }
            return this.value;
        }
        /**
         * Şifreli değer güncelle (setter)
         */
        setEncryptedValue(plainValue) {
            const fullKey = `${this.category}.${this.key}`;
            if (ENCRYPTED_KEYS.includes(fullKey)) {
                this.value = encryption_util_1.EncryptionUtil.encrypt(plainValue);
                this.isEncrypted = true;
            }
            else {
                this.value = plainValue;
                this.isEncrypted = false;
            }
        }
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return Setting = _classThis;
})();
exports.Setting = Setting;
//# sourceMappingURL=setting.entity.js.map