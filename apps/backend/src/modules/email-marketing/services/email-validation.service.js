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
exports.EmailValidationService = void 0;
const common_1 = require("@nestjs/common");
let EmailValidationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EmailValidationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmailValidationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        /**
         * Validates an email address using regex pattern
         * @param email The email address to validate
         * @returns 'valid' if the email is valid, 'invalid' otherwise
         */
        validateEmailFormat(email) {
            // Basic email regex pattern
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email) ? 'valid' : 'invalid';
        }
        /**
         * Performs a more comprehensive email validation
         * This is a simplified version - in a real application, you would integrate with a service like MailerCheck
         * @param email The email address to validate
         * @returns Validation result string
         */
        async validateEmail(email) {
            // First check basic format
            if (this.validateEmailFormat(email) === 'invalid') {
                return 'invalid';
            }
            // In a real implementation, you would call an external service like MailerCheck here
            // For now, we'll return 'valid' for properly formatted emails
            // Example of how you might integrate with an external service:
            /*
            try {
              const response = await this.mailerCheckClient.verifyEmail(email);
              return response.result; // 'valid', 'invalid', 'risky', etc.
            } catch (error) {
              console.error('Email validation error:', error);
              return 'unknown';
            }
            */
            // For demonstration purposes, we'll simulate some common validation results
            const domain = email.split('@')[1];
            if (domain && domain.includes('tempmail') || domain.includes('throwaway')) {
                return 'risky';
            }
            if (domain && domain.includes('invalid')) {
                return 'invalid';
            }
            return 'valid';
        }
    };
    return EmailValidationService = _classThis;
})();
exports.EmailValidationService = EmailValidationService;
//# sourceMappingURL=email-validation.service.js.map