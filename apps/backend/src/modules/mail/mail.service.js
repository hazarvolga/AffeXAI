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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const resend_mail_adapter_1 = require("./adapters/resend-mail.adapter");
const mail_service_interface_1 = require("./interfaces/mail-service.interface");
const email_settings_dto_1 = require("../settings/dto/email-settings.dto");
/**
 * Mail Service Facade
 * Routes emails through appropriate provider based on settings
 */
let MailService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MailService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MailService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        settingsService;
        logger = new common_1.Logger(MailService.name);
        adapter;
        constructor(settingsService) {
            this.settingsService = settingsService;
        }
        /**
         * Initialize the mail service with current settings
         */
        async initialize() {
            const settings = await this.settingsService.getEmailSettings();
            // Create adapter based on provider
            switch (settings.provider) {
                case email_settings_dto_1.EmailProvider.RESEND:
                    if (!settings.resend?.apiKey) {
                        throw new Error('Resend API key not configured');
                    }
                    this.adapter = new resend_mail_adapter_1.ResendMailAdapter(settings.resend.apiKey);
                    this.logger.log('Mail service initialized with Resend adapter');
                    break;
                case email_settings_dto_1.EmailProvider.SENDGRID:
                    throw new Error('SendGrid adapter not yet implemented');
                case email_settings_dto_1.EmailProvider.POSTMARK:
                    throw new Error('Postmark adapter not yet implemented');
                case email_settings_dto_1.EmailProvider.MAILGUN:
                    throw new Error('Mailgun adapter not yet implemented');
                case email_settings_dto_1.EmailProvider.SES:
                    throw new Error('AWS SES adapter not yet implemented');
                case email_settings_dto_1.EmailProvider.SMTP:
                    throw new Error('SMTP adapter not yet implemented');
                default:
                    throw new Error(`Unknown email provider: ${settings.provider}`);
            }
        }
        /**
         * Ensure adapter is initialized before sending
         */
        async ensureInitialized() {
            if (!this.adapter) {
                await this.initialize();
            }
        }
        /**
         * Send a single email with automatic provider routing
         */
        async sendMail(options) {
            await this.ensureInitialized();
            const settings = await this.settingsService.getEmailSettings();
            // Apply channel-specific defaults if not provided
            const enhancedOptions = await this.applyChannelDefaults(options, settings);
            // Send via adapter
            const result = await this.adapter.sendMail(enhancedOptions);
            // Log the result
            if (result.success) {
                this.logger.log(`Email sent successfully [${options.channel}]: ${result.messageId}`);
            }
            else {
                this.logger.error(`Email failed [${options.channel}]: ${result.error}`);
            }
            return result;
        }
        /**
         * Send multiple emails in bulk
         */
        async sendBulk(options) {
            await this.ensureInitialized();
            const settings = await this.settingsService.getEmailSettings();
            // Apply defaults to all emails
            const enhancedEmails = await Promise.all(options.emails.map((email) => this.applyChannelDefaults(email, settings)));
            return this.adapter.sendBulk({
                ...options,
                emails: enhancedEmails,
            });
        }
        /**
         * Validate email address
         */
        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        /**
         * Convert HTML to plain text
         */
        htmlToText(html) {
            if (this.adapter) {
                return this.adapter.htmlToText(html);
            }
            // Fallback: basic HTML stripping
            return html.replace(/<[^>]*>/g, '');
        }
        /**
         * Test connection to email provider
         */
        async testConnection() {
            try {
                await this.ensureInitialized();
                return await this.adapter.testConnection();
            }
            catch (error) {
                this.logger.error(`Connection test failed: ${error.message}`);
                return false;
            }
        }
        /**
         * Apply channel-specific defaults from settings
         */
        async applyChannelDefaults(options, settings) {
            const enhanced = { ...options };
            // Apply from/replyTo based on channel
            if (!enhanced.from) {
                if (options.channel === mail_service_interface_1.MailChannel.MARKETING) {
                    enhanced.from = {
                        name: settings.marketing.fromName,
                        email: settings.marketing.fromEmail,
                    };
                    enhanced.replyTo = enhanced.replyTo || {
                        email: settings.marketing.replyToEmail,
                    };
                }
                else {
                    // Transactional, Certificate, Event, System use transactional settings
                    enhanced.from = {
                        name: settings.transactional.fromName,
                        email: settings.transactional.fromEmail,
                    };
                    enhanced.replyTo = enhanced.replyTo || {
                        email: settings.transactional.replyToEmail,
                    };
                }
            }
            // Apply tracking settings
            if (!enhanced.tracking) {
                enhanced.tracking = {
                    clickTracking: settings.tracking?.clickTracking ?? false,
                    openTracking: settings.tracking?.openTracking ?? true,
                };
            }
            // For marketing emails, add List-Unsubscribe if not present
            if (options.channel === mail_service_interface_1.MailChannel.MARKETING &&
                !enhanced.unsubscribe) {
                // Will be filled by specific marketing service with actual unsubscribe URL
                enhanced.unsubscribe = {
                    url: undefined, // Placeholder - should be set by caller
                };
            }
            return enhanced;
        }
    };
    return MailService = _classThis;
})();
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map