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
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const mail_service_interface_1 = require("./interfaces/mail-service.interface");
/**
 * Test Email DTO
 */
let SendTestEmailDto = (() => {
    let _to_decorators;
    let _to_initializers = [];
    let _to_extraInitializers = [];
    let _subject_decorators;
    let _subject_initializers = [];
    let _subject_extraInitializers = [];
    let _message_decorators;
    let _message_initializers = [];
    let _message_extraInitializers = [];
    return class SendTestEmailDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _to_decorators = [(0, class_validator_1.IsEmail)(), (0, class_validator_1.IsNotEmpty)()];
            _subject_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _message_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _to_decorators, { kind: "field", name: "to", static: false, private: false, access: { has: obj => "to" in obj, get: obj => obj.to, set: (obj, value) => { obj.to = value; } }, metadata: _metadata }, _to_initializers, _to_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: obj => "subject" in obj, get: obj => obj.subject, set: (obj, value) => { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message, set: (obj, value) => { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        to = __runInitializers(this, _to_initializers, void 0);
        subject = (__runInitializers(this, _to_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
        message = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _message_initializers, void 0));
        constructor() {
            __runInitializers(this, _message_extraInitializers);
        }
    };
})();
/**
 * Mail Controller
 * For testing and debugging email functionality
 */
let MailController = (() => {
    let _classDecorators = [(0, common_1.Controller)('mail')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _testConnection_decorators;
    let _sendTestEmail_decorators;
    var MailController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _testConnection_decorators = [(0, common_1.Get)('test-connection')];
            _sendTestEmail_decorators = [(0, common_1.Post)('send-test')];
            __esDecorate(this, null, _testConnection_decorators, { kind: "method", name: "testConnection", static: false, private: false, access: { has: obj => "testConnection" in obj, get: obj => obj.testConnection }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sendTestEmail_decorators, { kind: "method", name: "sendTestEmail", static: false, private: false, access: { has: obj => "sendTestEmail" in obj, get: obj => obj.sendTestEmail }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MailController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        mailService = __runInitializers(this, _instanceExtraInitializers);
        constructor(mailService) {
            this.mailService = mailService;
        }
        /**
         * Test connection to email provider
         */
        async testConnection() {
            const isConnected = await this.mailService.testConnection();
            return {
                success: isConnected,
                message: isConnected
                    ? 'Connection to email provider successful'
                    : 'Failed to connect to email provider',
            };
        }
        /**
         * Send a test email
         */
        async sendTestEmail(dto) {
            const result = await this.mailService.sendMail({
                to: { email: dto.to },
                subject: dto.subject,
                html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
              .footer { margin-top: 20px; font-size: 12px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Test Email from Aluplan</h1>
              </div>
              <div class="content">
                <p>Hello!</p>
                <p>${dto.message}</p>
                <p>This is a test email sent from the Aluplan email infrastructure.</p>
                <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              </div>
              <div class="footer">
                <p>This is a test email. Please do not reply.</p>
                <p>&copy; 2025 Aluplan. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
                channel: mail_service_interface_1.MailChannel.SYSTEM,
                priority: mail_service_interface_1.MailPriority.NORMAL,
                tags: ['test', 'system'],
            });
            return {
                success: result.success,
                messageId: result.messageId,
                error: result.error,
                timestamp: result.timestamp,
            };
        }
    };
    return MailController = _classThis;
})();
exports.MailController = MailController;
//# sourceMappingURL=mail.controller.js.map