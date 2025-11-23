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
exports.DataPrivacyService = void 0;
const common_1 = require("@nestjs/common");
let DataPrivacyService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DataPrivacyService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DataPrivacyService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = new common_1.Logger(DataPrivacyService.name);
        PII_PATTERNS = {
            email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
            phone: /\b(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
            ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
            creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
            ipAddress: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
            url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
        };
        async detectPII(text) {
            const detectedTypes = [];
            const locations = [];
            for (const [type, pattern] of Object.entries(this.PII_PATTERNS)) {
                const matches = text.matchAll(pattern);
                for (const match of matches) {
                    if (match.index !== undefined) {
                        detectedTypes.push(type);
                        locations.push({
                            type,
                            start: match.index,
                            end: match.index + match[0].length,
                            value: match[0],
                        });
                    }
                }
            }
            const uniqueTypes = [...new Set(detectedTypes)];
            const hasPII = uniqueTypes.length > 0;
            const confidence = hasPII ? Math.min(95, 70 + uniqueTypes.length * 10) : 100;
            return {
                hasPII,
                detectedTypes: uniqueTypes,
                locations,
                confidence,
            };
        }
        async anonymizeText(text, options) {
            const replacementChar = options?.replacementChar || '*';
            const preserveFormat = options?.preserveFormat !== false;
            let anonymizedText = text;
            const replacements = [];
            for (const [type, pattern] of Object.entries(this.PII_PATTERNS)) {
                const matches = [...text.matchAll(pattern)];
                for (const match of matches) {
                    const original = match[0];
                    let replacement;
                    if (preserveFormat) {
                        replacement = this.generateFormattedReplacement(original, type, replacementChar);
                    }
                    else {
                        replacement = `[${type.toUpperCase()}_REDACTED]`;
                    }
                    anonymizedText = anonymizedText.replace(original, replacement);
                    replacements.push({ type, original, replacement });
                }
            }
            return {
                originalText: text,
                anonymizedText,
                replacements,
            };
        }
        async filterSensitiveData(data) {
            if (typeof data === 'string') {
                const result = await this.anonymizeText(data);
                return result.anonymizedText;
            }
            if (Array.isArray(data)) {
                return Promise.all(data.map(item => this.filterSensitiveData(item)));
            }
            if (typeof data === 'object' && data !== null) {
                const filtered = {};
                for (const [key, value] of Object.entries(data)) {
                    if (this.isSensitiveField(key)) {
                        filtered[key] = '[REDACTED]';
                    }
                    else {
                        filtered[key] = await this.filterSensitiveData(value);
                    }
                }
                return filtered;
            }
            return data;
        }
        async checkGDPRCompliance(data) {
            const issues = [];
            const recommendations = [];
            if (!data.hasUserConsent) {
                issues.push('User consent not obtained for data processing');
                recommendations.push('Implement explicit user consent mechanism');
            }
            if (!data.dataRetentionPeriod || data.dataRetentionPeriod > 365) {
                issues.push('Data retention period exceeds recommended limit');
                recommendations.push('Set data retention period to maximum 365 days');
            }
            if (!data.allowsDataDeletion) {
                issues.push('No mechanism for user data deletion');
                recommendations.push('Implement right to be forgotten functionality');
            }
            if (!data.hasPrivacyPolicy) {
                issues.push('Privacy policy not available');
                recommendations.push('Create and publish privacy policy');
            }
            if (!data.encryptsData) {
                issues.push('Data not encrypted at rest');
                recommendations.push('Implement data encryption');
            }
            return {
                isCompliant: issues.length === 0,
                issues,
                recommendations,
            };
        }
        async sanitizeForStorage(text) {
            const piiResult = await this.detectPII(text);
            if (piiResult.hasPII) {
                this.logger.warn(`PII detected in text, anonymizing before storage`);
                const anonymized = await this.anonymizeText(text);
                return anonymized.anonymizedText;
            }
            return text;
        }
        async validateDataSecurity(data) {
            const vulnerabilities = [];
            const recommendations = [];
            const piiCheck = await this.detectPII(JSON.stringify(data));
            if (piiCheck.hasPII) {
                vulnerabilities.push(`Contains PII: ${piiCheck.detectedTypes.join(', ')}`);
                recommendations.push('Anonymize or encrypt PII before storage');
            }
            if (typeof data === 'object' && data !== null) {
                if (data.password || data.apiKey || data.secret) {
                    vulnerabilities.push('Contains sensitive credentials');
                    recommendations.push('Use secure credential storage (e.g., environment variables, secrets manager)');
                }
            }
            return {
                isSecure: vulnerabilities.length === 0,
                vulnerabilities,
                recommendations,
            };
        }
        generateFormattedReplacement(original, type, char) {
            switch (type) {
                case 'email':
                    const [localPart, domain] = original.split('@');
                    return `${char.repeat(localPart.length)}@${domain}`;
                case 'phone':
                    return original.replace(/\d/g, char);
                case 'ssn':
                    return `${char}${char}${char}-${char}${char}-${char}${char}${char}${char}`;
                case 'creditCard':
                    const lastFour = original.slice(-4);
                    return `${char.repeat(original.length - 4)}${lastFour}`;
                case 'ipAddress':
                    const parts = original.split('.');
                    return `${char.repeat(parts[0].length)}.${char.repeat(parts[1].length)}.${char.repeat(parts[2].length)}.${parts[3]}`;
                default:
                    return char.repeat(original.length);
            }
        }
        isSensitiveField(fieldName) {
            const sensitiveFields = [
                'password',
                'apiKey',
                'secret',
                'token',
                'creditCard',
                'ssn',
                'privateKey',
                'accessToken',
                'refreshToken',
            ];
            return sensitiveFields.some(field => fieldName.toLowerCase().includes(field.toLowerCase()));
        }
    };
    return DataPrivacyService = _classThis;
})();
exports.DataPrivacyService = DataPrivacyService;
//# sourceMappingURL=data-privacy.service.js.map