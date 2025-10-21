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
exports.Webhook = exports.WebhookAuthType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
/**
 * Webhook Authentication Types
 */
var WebhookAuthType;
(function (WebhookAuthType) {
    WebhookAuthType["NONE"] = "none";
    WebhookAuthType["BEARER"] = "bearer";
    WebhookAuthType["API_KEY"] = "api_key";
    WebhookAuthType["BASIC"] = "basic";
})(WebhookAuthType || (exports.WebhookAuthType = WebhookAuthType = {}));
/**
 * Webhook Entity
 *
 * Configures external webhooks to receive platform events
 *
 * Example Use Cases:
 * - Send events to Zapier
 * - Notify Slack when event created
 * - Update external CRM when subscriber added
 * - Trigger GitHub Actions on deployment
 */
let Webhook = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('webhooks'), (0, typeorm_1.Index)('idx_webhooks_active', ['isActive']), (0, typeorm_1.Index)('idx_webhooks_deleted', ['deletedAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _url_decorators;
    let _url_initializers = [];
    let _url_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _subscribedEvents_decorators;
    let _subscribedEvents_initializers = [];
    let _subscribedEvents_extraInitializers = [];
    let _authType_decorators;
    let _authType_initializers = [];
    let _authType_extraInitializers = [];
    let _authConfig_decorators;
    let _authConfig_initializers = [];
    let _authConfig_extraInitializers = [];
    let _retryCount_decorators;
    let _retryCount_initializers = [];
    let _retryCount_extraInitializers = [];
    let _retryDelay_decorators;
    let _retryDelay_initializers = [];
    let _retryDelay_extraInitializers = [];
    let _timeout_decorators;
    let _timeout_initializers = [];
    let _timeout_extraInitializers = [];
    let _customHeaders_decorators;
    let _customHeaders_initializers = [];
    let _customHeaders_extraInitializers = [];
    let _totalCalls_decorators;
    let _totalCalls_initializers = [];
    let _totalCalls_extraInitializers = [];
    let _successfulCalls_decorators;
    let _successfulCalls_initializers = [];
    let _successfulCalls_extraInitializers = [];
    let _failedCalls_decorators;
    let _failedCalls_initializers = [];
    let _failedCalls_extraInitializers = [];
    let _lastCalledAt_decorators;
    let _lastCalledAt_initializers = [];
    let _lastCalledAt_extraInitializers = [];
    let _lastStatus_decorators;
    let _lastStatus_initializers = [];
    let _lastStatus_extraInitializers = [];
    let _lastError_decorators;
    let _lastError_initializers = [];
    let _lastError_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    var Webhook = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _name_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 255,
                })];
            _url_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 500,
                })];
            _isActive_decorators = [(0, typeorm_1.Column)({
                    type: 'boolean',
                    default: true,
                }), (0, typeorm_1.Index)()];
            _subscribedEvents_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    array: true,
                })];
            _authType_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 20,
                    default: WebhookAuthType.NONE,
                })];
            _authConfig_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                    nullable: true,
                })];
            _retryCount_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    default: 3,
                })];
            _retryDelay_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    default: 5000,
                })];
            _timeout_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    default: 10000,
                })];
            _customHeaders_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                    nullable: true,
                })];
            _totalCalls_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    default: 0,
                })];
            _successfulCalls_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    default: 0,
                })];
            _failedCalls_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    default: 0,
                })];
            _lastCalledAt_decorators = [(0, typeorm_1.Column)({
                    type: 'timestamp',
                    nullable: true,
                })];
            _lastStatus_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    nullable: true,
                })];
            _lastError_decorators = [(0, typeorm_1.Column)({
                    type: 'text',
                    nullable: true,
                })];
            _description_decorators = [(0, typeorm_1.Column)({
                    type: 'text',
                    nullable: true,
                })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url, set: (obj, value) => { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _subscribedEvents_decorators, { kind: "field", name: "subscribedEvents", static: false, private: false, access: { has: obj => "subscribedEvents" in obj, get: obj => obj.subscribedEvents, set: (obj, value) => { obj.subscribedEvents = value; } }, metadata: _metadata }, _subscribedEvents_initializers, _subscribedEvents_extraInitializers);
            __esDecorate(null, null, _authType_decorators, { kind: "field", name: "authType", static: false, private: false, access: { has: obj => "authType" in obj, get: obj => obj.authType, set: (obj, value) => { obj.authType = value; } }, metadata: _metadata }, _authType_initializers, _authType_extraInitializers);
            __esDecorate(null, null, _authConfig_decorators, { kind: "field", name: "authConfig", static: false, private: false, access: { has: obj => "authConfig" in obj, get: obj => obj.authConfig, set: (obj, value) => { obj.authConfig = value; } }, metadata: _metadata }, _authConfig_initializers, _authConfig_extraInitializers);
            __esDecorate(null, null, _retryCount_decorators, { kind: "field", name: "retryCount", static: false, private: false, access: { has: obj => "retryCount" in obj, get: obj => obj.retryCount, set: (obj, value) => { obj.retryCount = value; } }, metadata: _metadata }, _retryCount_initializers, _retryCount_extraInitializers);
            __esDecorate(null, null, _retryDelay_decorators, { kind: "field", name: "retryDelay", static: false, private: false, access: { has: obj => "retryDelay" in obj, get: obj => obj.retryDelay, set: (obj, value) => { obj.retryDelay = value; } }, metadata: _metadata }, _retryDelay_initializers, _retryDelay_extraInitializers);
            __esDecorate(null, null, _timeout_decorators, { kind: "field", name: "timeout", static: false, private: false, access: { has: obj => "timeout" in obj, get: obj => obj.timeout, set: (obj, value) => { obj.timeout = value; } }, metadata: _metadata }, _timeout_initializers, _timeout_extraInitializers);
            __esDecorate(null, null, _customHeaders_decorators, { kind: "field", name: "customHeaders", static: false, private: false, access: { has: obj => "customHeaders" in obj, get: obj => obj.customHeaders, set: (obj, value) => { obj.customHeaders = value; } }, metadata: _metadata }, _customHeaders_initializers, _customHeaders_extraInitializers);
            __esDecorate(null, null, _totalCalls_decorators, { kind: "field", name: "totalCalls", static: false, private: false, access: { has: obj => "totalCalls" in obj, get: obj => obj.totalCalls, set: (obj, value) => { obj.totalCalls = value; } }, metadata: _metadata }, _totalCalls_initializers, _totalCalls_extraInitializers);
            __esDecorate(null, null, _successfulCalls_decorators, { kind: "field", name: "successfulCalls", static: false, private: false, access: { has: obj => "successfulCalls" in obj, get: obj => obj.successfulCalls, set: (obj, value) => { obj.successfulCalls = value; } }, metadata: _metadata }, _successfulCalls_initializers, _successfulCalls_extraInitializers);
            __esDecorate(null, null, _failedCalls_decorators, { kind: "field", name: "failedCalls", static: false, private: false, access: { has: obj => "failedCalls" in obj, get: obj => obj.failedCalls, set: (obj, value) => { obj.failedCalls = value; } }, metadata: _metadata }, _failedCalls_initializers, _failedCalls_extraInitializers);
            __esDecorate(null, null, _lastCalledAt_decorators, { kind: "field", name: "lastCalledAt", static: false, private: false, access: { has: obj => "lastCalledAt" in obj, get: obj => obj.lastCalledAt, set: (obj, value) => { obj.lastCalledAt = value; } }, metadata: _metadata }, _lastCalledAt_initializers, _lastCalledAt_extraInitializers);
            __esDecorate(null, null, _lastStatus_decorators, { kind: "field", name: "lastStatus", static: false, private: false, access: { has: obj => "lastStatus" in obj, get: obj => obj.lastStatus, set: (obj, value) => { obj.lastStatus = value; } }, metadata: _metadata }, _lastStatus_initializers, _lastStatus_extraInitializers);
            __esDecorate(null, null, _lastError_decorators, { kind: "field", name: "lastError", static: false, private: false, access: { has: obj => "lastError" in obj, get: obj => obj.lastError, set: (obj, value) => { obj.lastError = value; } }, metadata: _metadata }, _lastError_initializers, _lastError_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Webhook = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        /**
         * Webhook name
         */
        name = __runInitializers(this, _name_initializers, void 0);
        /**
         * Webhook URL endpoint
         */
        url = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _url_initializers, void 0));
        /**
         * Is webhook active?
         */
        isActive = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        /**
         * Event types this webhook subscribes to
         *
         * Example: ['event.created', 'certificate.issued']
         */
        subscribedEvents = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _subscribedEvents_initializers, void 0));
        /**
         * Authentication type
         */
        authType = (__runInitializers(this, _subscribedEvents_extraInitializers), __runInitializers(this, _authType_initializers, void 0));
        /**
         * Authentication configuration
         */
        authConfig = (__runInitializers(this, _authType_extraInitializers), __runInitializers(this, _authConfig_initializers, void 0));
        /**
         * Number of retry attempts on failure
         */
        retryCount = (__runInitializers(this, _authConfig_extraInitializers), __runInitializers(this, _retryCount_initializers, void 0));
        /**
         * Delay between retries (milliseconds)
         */
        retryDelay = (__runInitializers(this, _retryCount_extraInitializers), __runInitializers(this, _retryDelay_initializers, void 0));
        /**
         * Request timeout (milliseconds)
         */
        timeout = (__runInitializers(this, _retryDelay_extraInitializers), __runInitializers(this, _timeout_initializers, void 0));
        /**
         * Custom headers to send with webhook
         */
        customHeaders = (__runInitializers(this, _timeout_extraInitializers), __runInitializers(this, _customHeaders_initializers, void 0));
        /**
         * Total number of webhook calls
         */
        totalCalls = (__runInitializers(this, _customHeaders_extraInitializers), __runInitializers(this, _totalCalls_initializers, void 0));
        /**
         * Successful webhook calls
         */
        successfulCalls = (__runInitializers(this, _totalCalls_extraInitializers), __runInitializers(this, _successfulCalls_initializers, void 0));
        /**
         * Failed webhook calls
         */
        failedCalls = (__runInitializers(this, _successfulCalls_extraInitializers), __runInitializers(this, _failedCalls_initializers, void 0));
        /**
         * Last time webhook was called
         */
        lastCalledAt = (__runInitializers(this, _failedCalls_extraInitializers), __runInitializers(this, _lastCalledAt_initializers, void 0));
        /**
         * Last HTTP status code received
         */
        lastStatus = (__runInitializers(this, _lastCalledAt_extraInitializers), __runInitializers(this, _lastStatus_initializers, void 0));
        /**
         * Last error message (if failed)
         */
        lastError = (__runInitializers(this, _lastStatus_extraInitializers), __runInitializers(this, _lastError_initializers, void 0));
        /**
         * Description/notes
         */
        description = (__runInitializers(this, _lastError_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        /**
         * Check if webhook is subscribed to event type
         */
        isSubscribedTo(eventType) {
            return this.subscribedEvents.includes(eventType);
        }
        /**
         * Get success rate percentage
         */
        getSuccessRate() {
            if (this.totalCalls === 0)
                return 0;
            return Math.round((this.successfulCalls / this.totalCalls) * 100);
        }
        /**
         * Record webhook call
         */
        recordCall(success, statusCode, error) {
            this.totalCalls++;
            this.lastCalledAt = new Date();
            this.lastStatus = statusCode;
            if (success) {
                this.successfulCalls++;
                this.lastError = undefined;
            }
            else {
                this.failedCalls++;
                this.lastError = error || 'Unknown error';
            }
        }
        /**
         * Get authorization header based on auth type
         */
        getAuthHeaders() {
            const headers = {};
            switch (this.authType) {
                case WebhookAuthType.BEARER:
                    if (this.authConfig?.token) {
                        headers['Authorization'] = `Bearer ${this.authConfig.token}`;
                    }
                    break;
                case WebhookAuthType.API_KEY:
                    if (this.authConfig?.apiKey) {
                        const headerName = this.authConfig.headerName || 'X-API-Key';
                        headers[headerName] = this.authConfig.apiKey;
                    }
                    break;
                case WebhookAuthType.BASIC:
                    if (this.authConfig?.username && this.authConfig?.password) {
                        const credentials = Buffer.from(`${this.authConfig.username}:${this.authConfig.password}`).toString('base64');
                        headers['Authorization'] = `Basic ${credentials}`;
                    }
                    break;
                case WebhookAuthType.NONE:
                default:
                    // No auth headers
                    break;
            }
            // Add custom headers
            if (this.customHeaders) {
                Object.assign(headers, this.customHeaders);
            }
            return headers;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _description_extraInitializers);
        }
    };
    return Webhook = _classThis;
})();
exports.Webhook = Webhook;
//# sourceMappingURL=webhook.entity.js.map