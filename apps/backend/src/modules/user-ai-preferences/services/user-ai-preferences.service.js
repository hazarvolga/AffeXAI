"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAiPreferencesService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let UserAiPreferencesService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UserAiPreferencesService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UserAiPreferencesService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        preferenceRepository;
        logger = new common_1.Logger(UserAiPreferencesService.name);
        encryptionKey;
        algorithm = 'aes-256-gcm';
        constructor(preferenceRepository) {
            this.preferenceRepository = preferenceRepository;
            // Initialize encryption key from environment
            // In production, this should be from environment variables
            const key = process.env.AI_API_KEY_ENCRYPTION_KEY || 'default-dev-key-32-characters!!';
            this.encryptionKey = Buffer.from(key.padEnd(32, '0').slice(0, 32));
        }
        /**
         * Encrypt API key before storing
         */
        encryptApiKey(apiKey) {
            try {
                const iv = crypto.randomBytes(16);
                const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);
                let encrypted = cipher.update(apiKey, 'utf8', 'hex');
                encrypted += cipher.final('hex');
                const authTag = cipher.getAuthTag();
                // Format: iv:authTag:encrypted
                return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
            }
            catch (error) {
                this.logger.error('API key encryption failed:', error);
                throw new Error('Failed to encrypt API key');
            }
        }
        /**
         * Decrypt API key for use
         */
        decryptApiKey(encryptedData) {
            try {
                const parts = encryptedData.split(':');
                if (parts.length !== 3) {
                    throw new Error('Invalid encrypted data format');
                }
                const [ivHex, authTagHex, encrypted] = parts;
                const iv = Buffer.from(ivHex, 'hex');
                const authTag = Buffer.from(authTagHex, 'hex');
                const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);
                decipher.setAuthTag(authTag);
                let decrypted = decipher.update(encrypted, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                return decrypted;
            }
            catch (error) {
                this.logger.error('API key decryption failed:', error);
                throw new Error('Failed to decrypt API key');
            }
        }
        /**
         * Create or update user AI preference for a module
         */
        async upsertPreference(userId, dto) {
            // Check if preference already exists
            const existing = await this.preferenceRepository.findOne({
                where: { userId, module: dto.module },
            });
            if (existing) {
                return this.updatePreference(existing.id, dto);
            }
            // Create new preference
            const preference = this.preferenceRepository.create({
                userId,
                module: dto.module,
                provider: dto.provider,
                model: dto.model,
                apiKey: dto.apiKey ? this.encryptApiKey(dto.apiKey) : null,
                enabled: dto.enabled ?? true,
            });
            const saved = await this.preferenceRepository.save(preference);
            this.logger.log(`Created AI preference for user ${userId}, module ${dto.module}`);
            return saved;
        }
        /**
         * Get all preferences for a user
         */
        async getUserPreferences(userId) {
            return this.preferenceRepository.find({
                where: { userId },
                order: { module: 'ASC' },
            });
        }
        /**
         * Get user preference for specific module
         */
        async getUserPreferenceForModule(userId, module) {
            return this.preferenceRepository.findOne({
                where: { userId, module: module },
            });
        }
        /**
         * Get decrypted API key for user and module
         * Returns null if no preference or no API key set
         */
        async getDecryptedApiKey(userId, module) {
            const preference = await this.getUserPreferenceForModule(userId, module);
            if (!preference || !preference.apiKey) {
                return null;
            }
            try {
                return this.decryptApiKey(preference.apiKey);
            }
            catch (error) {
                this.logger.error(`Failed to decrypt API key for user ${userId}, module ${module}`);
                return null;
            }
        }
        /**
         * Update preference
         */
        async updatePreference(id, dto) {
            const preference = await this.preferenceRepository.findOne({
                where: { id },
            });
            if (!preference) {
                throw new common_1.NotFoundException(`Preference with ID ${id} not found`);
            }
            // Update fields
            if (dto.provider)
                preference.provider = dto.provider;
            if (dto.model)
                preference.model = dto.model;
            if (dto.enabled !== undefined)
                preference.enabled = dto.enabled;
            if (dto.apiKey !== undefined) {
                preference.apiKey = dto.apiKey ? this.encryptApiKey(dto.apiKey) : null;
            }
            const updated = await this.preferenceRepository.save(preference);
            this.logger.log(`Updated AI preference ${id}`);
            return updated;
        }
        /**
         * Delete preference
         */
        async deletePreference(id) {
            const result = await this.preferenceRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Preference with ID ${id} not found`);
            }
            this.logger.log(`Deleted AI preference ${id}`);
        }
        /**
         * Delete all preferences for a user
         */
        async deleteAllUserPreferences(userId) {
            await this.preferenceRepository.delete({ userId });
            this.logger.log(`Deleted all AI preferences for user ${userId}`);
        }
    };
    return UserAiPreferencesService = _classThis;
})();
exports.UserAiPreferencesService = UserAiPreferencesService;
//# sourceMappingURL=user-ai-preferences.service.js.map