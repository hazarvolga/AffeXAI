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
exports.ResendMailAdapter = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
const html_to_text_1 = require("html-to-text");
/**
 * Resend Email Service Adapter
 * Implements IMailService using Resend API
 */
let ResendMailAdapter = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ResendMailAdapter = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ResendMailAdapter = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        apiKey;
        logger = new common_1.Logger(ResendMailAdapter.name);
        resend;
        providerName = 'resend';
        constructor(apiKey) {
            this.apiKey = apiKey;
            this.resend = new resend_1.Resend(apiKey);
            this.logger.log('Resend mail adapter initialized');
        }
        /**
         * Send a single email via Resend
         */
        async sendMail(options) {
            try {
                const { to, cc, bcc, from, replyTo, subject, html, text, attachments, headers, tracking, unsubscribe, tags, } = options;
                // Prepare recipients
                const toAddresses = this.formatRecipients(to);
                const ccAddresses = cc ? this.formatRecipients(cc) : undefined;
                const bccAddresses = bcc ? this.formatRecipients(bcc) : undefined;
                // Prepare plain text version
                const plainText = text || (html ? this.htmlToText(html) : '');
                // Prepare custom headers
                const customHeaders = {
                    ...headers,
                    ...this.buildTrackingHeaders(tracking),
                    ...this.buildUnsubscribeHeaders(unsubscribe),
                };
                // Prepare attachments
                const resendAttachments = attachments?.map((att) => ({
                    filename: att.filename,
                    content: att.content,
                    path: att.path,
                    content_type: att.contentType,
                }));
                // Send via Resend API
                const sendOptions = {
                    to: toAddresses,
                    subject,
                    html,
                    text: plainText,
                };
                if (from)
                    sendOptions.from = this.formatRecipient(from);
                if (ccAddresses)
                    sendOptions.cc = ccAddresses;
                if (bccAddresses)
                    sendOptions.bcc = bccAddresses;
                if (replyTo)
                    sendOptions.reply_to = this.formatRecipient(replyTo);
                if (resendAttachments)
                    sendOptions.attachments = resendAttachments;
                if (Object.keys(customHeaders).length > 0)
                    sendOptions.headers = customHeaders;
                if (tags)
                    sendOptions.tags = tags.map((tag) => ({ name: tag, value: 'true' }));
                const response = await this.resend.emails.send(sendOptions);
                if (response.error) {
                    throw new Error(response.error.message);
                }
                if (!response.data) {
                    throw new Error('No data returned from Resend API');
                }
                this.logger.log(`Email sent successfully via Resend: ${response.data.id}`);
                return {
                    success: true,
                    messageId: response.data.id,
                    provider: this.providerName,
                    timestamp: new Date(),
                };
            }
            catch (error) {
                this.logger.error(`Failed to send email via Resend: ${error.message}`, error.stack);
                return {
                    success: false,
                    error: error.message,
                    provider: this.providerName,
                    timestamp: new Date(),
                };
            }
        }
        /**
         * Send multiple emails in bulk
         */
        async sendBulk(options) {
            const { emails, batchSize = 10, delayBetweenBatches = 1000 } = options;
            const results = [];
            // Process in batches
            for (let i = 0; i < emails.length; i += batchSize) {
                const batch = emails.slice(i, i + batchSize);
                const batchResults = await Promise.all(batch.map((emailOptions) => this.sendMail(emailOptions)));
                results.push(...batchResults);
                // Delay between batches to respect rate limits
                if (i + batchSize < emails.length) {
                    await this.delay(delayBetweenBatches);
                }
            }
            const successCount = results.filter((r) => r.success).length;
            this.logger.log(`Bulk send completed: ${successCount}/${results.length} successful`);
            return results;
        }
        /**
         * Validate email address format
         */
        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        /**
         * Convert HTML to plain text
         */
        htmlToText(html) {
            return (0, html_to_text_1.htmlToText)(html, {
                wordwrap: 80,
                selectors: [
                    { selector: 'a', options: { ignoreHref: false } },
                    { selector: 'img', format: 'skip' },
                ],
            });
        }
        /**
         * Test connection to Resend API
         */
        async testConnection() {
            try {
                // Resend doesn't have a dedicated ping endpoint
                // We'll check if the API key is valid by checking domains
                const response = await this.resend.domains.list();
                return !response.error;
            }
            catch (error) {
                this.logger.error(`Resend connection test failed: ${error.message}`);
                return false;
            }
        }
        /**
         * Format a single recipient
         */
        formatRecipient(recipient) {
            if (recipient.name) {
                return `${recipient.name} <${recipient.email}>`;
            }
            return recipient.email;
        }
        /**
         * Format multiple recipients
         */
        formatRecipients(recipients) {
            if (Array.isArray(recipients)) {
                return recipients.map((r) => this.formatRecipient(r));
            }
            return this.formatRecipient(recipients);
        }
        /**
         * Build tracking headers
         */
        buildTrackingHeaders(tracking) {
            const headers = {};
            if (tracking) {
                if (tracking.clickTracking === false) {
                    headers['X-Click-Tracking'] = 'false';
                }
                if (tracking.openTracking === false) {
                    headers['X-Open-Tracking'] = 'false';
                }
            }
            return headers;
        }
        /**
         * Build List-Unsubscribe headers
         */
        buildUnsubscribeHeaders(unsubscribe) {
            const headers = {};
            if (unsubscribe) {
                const unsubscribeValues = [];
                if (unsubscribe.email) {
                    unsubscribeValues.push(`<mailto:${unsubscribe.email}>`);
                }
                if (unsubscribe.url) {
                    unsubscribeValues.push(`<${unsubscribe.url}>`);
                }
                if (unsubscribeValues.length > 0) {
                    headers['List-Unsubscribe'] = unsubscribeValues.join(', ');
                }
                // RFC 8058 one-click unsubscribe
                if (unsubscribe.oneClick && unsubscribe.url) {
                    headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
                }
            }
            return headers;
        }
        /**
         * Delay helper for rate limiting
         */
        delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
    };
    return ResendMailAdapter = _classThis;
})();
exports.ResendMailAdapter = ResendMailAdapter;
//# sourceMappingURL=resend-mail.adapter.js.map