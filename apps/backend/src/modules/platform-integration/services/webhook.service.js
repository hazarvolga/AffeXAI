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
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const event_emitter_1 = require("@nestjs/event-emitter");
const webhook_entity_1 = require("../entities/webhook.entity");
/**
 * Webhook Service
 *
 * Manages webhook subscriptions and deliveries.
 * Sends platform events to external systems via HTTP.
 *
 * Features:
 * - Event-based webhook triggering
 * - Multiple authentication methods (Bearer, API Key, Basic)
 * - Automatic retry with exponential backoff
 * - Success/failure tracking
 * - Webhook health monitoring
 */
let WebhookService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _handlePlatformEvent_decorators;
    var WebhookService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _handlePlatformEvent_decorators = [(0, event_emitter_1.OnEvent)('platform.event')];
            __esDecorate(this, null, _handlePlatformEvent_decorators, { kind: "method", name: "handlePlatformEvent", static: false, private: false, access: { has: obj => "handlePlatformEvent" in obj, get: obj => obj.handlePlatformEvent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            WebhookService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        webhookRepository = __runInitializers(this, _instanceExtraInitializers);
        httpService;
        logger = new common_1.Logger(WebhookService.name);
        constructor(webhookRepository, httpService) {
            this.webhookRepository = webhookRepository;
            this.httpService = httpService;
        }
        /**
         * Listen to platform events and trigger webhooks
         */
        async handlePlatformEvent(data) {
            const { event } = data;
            try {
                // Find all active webhooks subscribed to this event type
                const webhooks = await this.findSubscribedWebhooks(event.eventType);
                if (webhooks.length === 0) {
                    return;
                }
                this.logger.log(`Found ${webhooks.length} webhooks subscribed to ${event.eventType}`);
                // Trigger webhooks in parallel
                await Promise.all(webhooks.map(webhook => this.triggerWebhook(webhook, event)));
            }
            catch (error) {
                this.logger.error(`Failed to handle platform event for webhooks: ${event.id}`, error.stack);
            }
        }
        /**
         * Find webhooks subscribed to an event type
         */
        async findSubscribedWebhooks(eventType) {
            return this.webhookRepository
                .createQueryBuilder('webhook')
                .where('webhook.is_active = :isActive', { isActive: true })
                .andWhere(':eventType = ANY(webhook.subscribed_events)', { eventType })
                .getMany();
        }
        /**
         * Trigger a webhook with an event
         */
        async triggerWebhook(webhook, event) {
            const startTime = Date.now();
            try {
                this.logger.log(`Triggering webhook: ${webhook.name} (${webhook.id})`, { eventType: event.eventType });
                // Prepare payload
                const payload = {
                    event: {
                        id: event.id,
                        type: event.eventType,
                        source: event.source,
                        timestamp: event.createdAt,
                    },
                    data: event.payload,
                    metadata: event.metadata,
                };
                // Send HTTP request with retry logic
                await this.sendWithRetry(webhook, payload);
                const duration = Date.now() - startTime;
                this.logger.log(`Webhook triggered successfully: ${webhook.name}`, { duration: `${duration}ms` });
            }
            catch (error) {
                this.logger.error(`Failed to trigger webhook: ${webhook.name}`, error.stack);
                // Error is already recorded in sendWithRetry
            }
        }
        /**
         * Send HTTP request with retry logic
         */
        async sendWithRetry(webhook, payload, attempt = 1) {
            try {
                // Prepare headers
                const headers = {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Aluplan-Webhook/1.0',
                    ...webhook.getAuthHeaders(),
                    ...webhook.customHeaders,
                };
                // Send request
                const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(webhook.url, payload, {
                    headers,
                    timeout: webhook.timeout,
                }));
                // Record success
                webhook.recordCall(true, response?.status || 200);
                await this.webhookRepository.save(webhook);
                this.logger.debug(`Webhook call successful: ${webhook.name}`, { status: response?.status || 200 });
            }
            catch (error) {
                const status = error.response?.status;
                const errorMessage = error.message;
                this.logger.warn(`Webhook call failed (attempt ${attempt}/${webhook.retryCount + 1}): ${webhook.name}`, { status, error: errorMessage });
                // Check if we should retry
                if (attempt <= webhook.retryCount) {
                    // Calculate retry delay with exponential backoff
                    const delay = webhook.retryDelay * Math.pow(2, attempt - 1);
                    this.logger.log(`Retrying webhook in ${delay}ms: ${webhook.name}`);
                    // Wait before retrying
                    await new Promise(resolve => setTimeout(resolve, delay));
                    // Retry
                    return this.sendWithRetry(webhook, payload, attempt + 1);
                }
                else {
                    // All retries exhausted, record failure
                    webhook.recordCall(false, status, errorMessage);
                    await this.webhookRepository.save(webhook);
                    throw new Error(`Webhook failed after ${webhook.retryCount + 1} attempts: ${errorMessage}`);
                }
            }
        }
        /**
         * Create a new webhook
         */
        async create(data) {
            const webhook = this.webhookRepository.create({
                ...data,
                isActive: true,
                authType: data.authType || webhook_entity_1.WebhookAuthType.NONE,
            });
            return this.webhookRepository.save(webhook);
        }
        /**
         * Update webhook
         */
        async update(id, data) {
            await this.webhookRepository.update(id, data);
            const webhook = await this.webhookRepository.findOne({ where: { id } });
            if (!webhook) {
                throw new Error(`Webhook not found: ${id}`);
            }
            return webhook;
        }
        /**
         * Delete webhook (soft delete)
         */
        async delete(id) {
            await this.webhookRepository.softDelete(id);
        }
        /**
         * Get all webhooks
         */
        async findAll() {
            return this.webhookRepository.find({
                order: { createdAt: 'DESC' },
            });
        }
        /**
         * Get active webhooks
         */
        async findActive() {
            return this.webhookRepository.find({
                where: { isActive: true },
                order: { createdAt: 'DESC' },
            });
        }
        /**
         * Get webhook by ID
         */
        async findOne(id) {
            return this.webhookRepository.findOne({ where: { id } });
        }
        /**
         * Test webhook connection
         */
        async testWebhook(id) {
            const webhook = await this.findOne(id);
            if (!webhook) {
                throw new Error(`Webhook not found: ${id}`);
            }
            const startTime = Date.now();
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Aluplan-Webhook/1.0',
                    ...webhook.getAuthHeaders(),
                    ...webhook.customHeaders,
                };
                const testPayload = {
                    event: {
                        type: 'test',
                        timestamp: new Date(),
                    },
                    data: {
                        message: 'This is a test webhook call from Aluplan',
                    },
                };
                const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(webhook.url, testPayload, {
                    headers,
                    timeout: webhook.timeout,
                }));
                const duration = Date.now() - startTime;
                return {
                    success: true,
                    status: response?.status || 200,
                    duration,
                };
            }
            catch (error) {
                const duration = Date.now() - startTime;
                return {
                    success: false,
                    status: error.response?.status,
                    error: error.message,
                    duration,
                };
            }
        }
        /**
         * Get webhook statistics
         */
        async getWebhookStats(id) {
            const webhook = await this.findOne(id);
            if (!webhook) {
                throw new Error(`Webhook not found: ${id}`);
            }
            return {
                totalCalls: webhook.totalCalls,
                successfulCalls: webhook.successfulCalls,
                failedCalls: webhook.failedCalls,
                successRate: webhook.getSuccessRate(),
                lastCalledAt: webhook.lastCalledAt,
                lastStatus: webhook.lastStatus,
            };
        }
        /**
         * Get overall webhook statistics
         */
        async getOverallStats() {
            const webhooks = await this.findAll();
            const totalWebhooks = webhooks.length;
            const activeWebhooks = webhooks.filter(w => w.isActive).length;
            const totalCalls = webhooks.reduce((sum, w) => sum + w.totalCalls, 0);
            const successfulCalls = webhooks.reduce((sum, w) => sum + w.successfulCalls, 0);
            const averageSuccessRate = webhooks.length > 0
                ? webhooks.reduce((sum, w) => sum + w.getSuccessRate(), 0) / webhooks.length
                : 0;
            return {
                totalWebhooks,
                activeWebhooks,
                totalCalls,
                successfulCalls,
                averageSuccessRate,
            };
        }
    };
    return WebhookService = _classThis;
})();
exports.WebhookService = WebhookService;
//# sourceMappingURL=webhook.service.js.map