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
exports.TicketEmailWebhookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
/**
 * Ticket Email Webhook Controller
 * Receives inbound emails from email service providers
 *
 * Supported providers:
 * - SendGrid Inbound Parse
 * - Mailgun Routes
 * - Postmark Inbound
 * - Custom SMTP forwarding
 */
let TicketEmailWebhookController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Ticket Email Webhooks'), (0, common_1.Controller)('webhooks/tickets/email')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _handleSendGridWebhook_decorators;
    let _handleMailgunWebhook_decorators;
    let _handlePostmarkWebhook_decorators;
    let _handleGenericWebhook_decorators;
    var TicketEmailWebhookController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _handleSendGridWebhook_decorators = [(0, common_1.Post)('sendgrid'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'SendGrid inbound email webhook' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Email processed successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid email data' })];
            _handleMailgunWebhook_decorators = [(0, common_1.Post)('mailgun'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Mailgun inbound email webhook' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Email processed successfully' })];
            _handlePostmarkWebhook_decorators = [(0, common_1.Post)('postmark'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Postmark inbound email webhook' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Email processed successfully' })];
            _handleGenericWebhook_decorators = [(0, common_1.Post)('generic'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Generic inbound email webhook' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Email processed successfully' })];
            __esDecorate(this, null, _handleSendGridWebhook_decorators, { kind: "method", name: "handleSendGridWebhook", static: false, private: false, access: { has: obj => "handleSendGridWebhook" in obj, get: obj => obj.handleSendGridWebhook }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleMailgunWebhook_decorators, { kind: "method", name: "handleMailgunWebhook", static: false, private: false, access: { has: obj => "handleMailgunWebhook" in obj, get: obj => obj.handleMailgunWebhook }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handlePostmarkWebhook_decorators, { kind: "method", name: "handlePostmarkWebhook", static: false, private: false, access: { has: obj => "handlePostmarkWebhook" in obj, get: obj => obj.handlePostmarkWebhook }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleGenericWebhook_decorators, { kind: "method", name: "handleGenericWebhook", static: false, private: false, access: { has: obj => "handleGenericWebhook" in obj, get: obj => obj.handleGenericWebhook }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketEmailWebhookController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        emailParserService = __runInitializers(this, _instanceExtraInitializers);
        logger = new common_1.Logger(TicketEmailWebhookController.name);
        constructor(emailParserService) {
            this.emailParserService = emailParserService;
        }
        /**
         * SendGrid Inbound Parse Webhook
         * https://docs.sendgrid.com/for-developers/parsing-email/setting-up-the-inbound-parse-webhook
         */
        async handleSendGridWebhook(payload) {
            try {
                this.logger.log('Received SendGrid webhook');
                const parsedEmail = {
                    from: payload.from,
                    fromName: payload.from_name,
                    to: payload.to,
                    subject: payload.subject,
                    textBody: payload.text,
                    htmlBody: payload.html,
                    messageId: payload.headers?.['Message-ID'] || payload.message_id,
                    inReplyTo: payload.headers?.['In-Reply-To'],
                    references: payload.headers?.References?.split(' '),
                    receivedAt: new Date(),
                    attachments: this.parseSendGridAttachments(payload),
                };
                const ticket = await this.emailParserService.processInboundEmail(parsedEmail);
                return {
                    success: true,
                    ticketId: ticket.id,
                };
            }
            catch (error) {
                this.logger.error(`SendGrid webhook error: ${error.message}`, error.stack);
                return { success: false };
            }
        }
        /**
         * Mailgun Inbound Webhook
         * https://documentation.mailgun.com/en/latest/user_manual.html#routes
         */
        async handleMailgunWebhook(payload) {
            try {
                this.logger.log('Received Mailgun webhook');
                const parsedEmail = {
                    from: payload.sender || payload.from,
                    to: payload.recipient || payload.to,
                    subject: payload.subject,
                    textBody: payload['body-plain'] || payload.text,
                    htmlBody: payload['body-html'] || payload.html,
                    messageId: payload['Message-Id'] || payload.message_id,
                    inReplyTo: payload['In-Reply-To'],
                    references: payload.References?.split(' '),
                    receivedAt: new Date(payload.timestamp * 1000),
                    attachments: this.parseMailgunAttachments(payload),
                };
                const ticket = await this.emailParserService.processInboundEmail(parsedEmail);
                return {
                    success: true,
                    ticketId: ticket.id,
                };
            }
            catch (error) {
                this.logger.error(`Mailgun webhook error: ${error.message}`, error.stack);
                return { success: false };
            }
        }
        /**
         * Postmark Inbound Webhook
         * https://postmarkapp.com/developer/webhooks/inbound-webhook
         */
        async handlePostmarkWebhook(payload) {
            try {
                this.logger.log('Received Postmark webhook');
                const parsedEmail = {
                    from: payload.From,
                    fromName: payload.FromName,
                    to: payload.To,
                    subject: payload.Subject,
                    textBody: payload.TextBody,
                    htmlBody: payload.HtmlBody,
                    messageId: payload.MessageID,
                    inReplyTo: payload.Headers?.find((h) => h.Name === 'In-Reply-To')?.Value,
                    references: payload.Headers?.find((h) => h.Name === 'References')?.Value?.split(' '),
                    receivedAt: new Date(payload.Date),
                    attachments: this.parsePostmarkAttachments(payload.Attachments),
                };
                const ticket = await this.emailParserService.processInboundEmail(parsedEmail);
                return {
                    success: true,
                    ticketId: ticket.id,
                };
            }
            catch (error) {
                this.logger.error(`Postmark webhook error: ${error.message}`, error.stack);
                return { success: false };
            }
        }
        /**
         * Generic webhook for custom email forwarding
         */
        async handleGenericWebhook(payload) {
            try {
                this.logger.log('Received generic webhook');
                const ticket = await this.emailParserService.processInboundEmail(payload);
                return {
                    success: true,
                    ticketId: ticket.id,
                };
            }
            catch (error) {
                this.logger.error(`Generic webhook error: ${error.message}`, error.stack);
                return { success: false };
            }
        }
        /**
         * Parse SendGrid attachments
         */
        parseSendGridAttachments(payload) {
            if (!payload.attachments)
                return [];
            return Object.keys(payload.attachments).map((key) => {
                const attachment = payload.attachments[key];
                return {
                    filename: attachment.filename,
                    contentType: attachment.type,
                    content: Buffer.from(attachment.content, 'base64'),
                    size: attachment.content.length,
                };
            });
        }
        /**
         * Parse Mailgun attachments
         */
        parseMailgunAttachments(payload) {
            if (!payload.attachments)
                return [];
            return payload.attachments.map((attachment) => ({
                filename: attachment.name,
                contentType: attachment['content-type'],
                content: Buffer.from(attachment.content, 'base64'),
                size: attachment.size,
            }));
        }
        /**
         * Parse Postmark attachments
         */
        parsePostmarkAttachments(attachments) {
            if (!attachments || attachments.length === 0)
                return [];
            return attachments.map((attachment) => ({
                filename: attachment.Name,
                contentType: attachment.ContentType,
                content: Buffer.from(attachment.Content, 'base64'),
                size: attachment.ContentLength,
            }));
        }
    };
    return TicketEmailWebhookController = _classThis;
})();
exports.TicketEmailWebhookController = TicketEmailWebhookController;
//# sourceMappingURL=ticket-email-webhook.controller.js.map