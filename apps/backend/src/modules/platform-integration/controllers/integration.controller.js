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
exports.IntegrationController = void 0;
const common_1 = require("@nestjs/common");
/**
 * Integration Controller
 *
 * Provides endpoints for viewing platform events and statistics.
 */
let IntegrationController = (() => {
    let _classDecorators = [(0, common_1.Controller)('integration')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getEvents_decorators;
    let _getEventsByType_decorators;
    let _getEventsBySource_decorators;
    let _getEventsWithAutomation_decorators;
    let _getEventStats_decorators;
    var IntegrationController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getEvents_decorators = [(0, common_1.Get)('events')];
            _getEventsByType_decorators = [(0, common_1.Get)('events/type/:eventType')];
            _getEventsBySource_decorators = [(0, common_1.Get)('events/source/:source')];
            _getEventsWithAutomation_decorators = [(0, common_1.Get)('events/automated')];
            _getEventStats_decorators = [(0, common_1.Get)('events/stats')];
            __esDecorate(this, null, _getEvents_decorators, { kind: "method", name: "getEvents", static: false, private: false, access: { has: obj => "getEvents" in obj, get: obj => obj.getEvents }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEventsByType_decorators, { kind: "method", name: "getEventsByType", static: false, private: false, access: { has: obj => "getEventsByType" in obj, get: obj => obj.getEventsByType }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEventsBySource_decorators, { kind: "method", name: "getEventsBySource", static: false, private: false, access: { has: obj => "getEventsBySource" in obj, get: obj => obj.getEventsBySource }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEventsWithAutomation_decorators, { kind: "method", name: "getEventsWithAutomation", static: false, private: false, access: { has: obj => "getEventsWithAutomation" in obj, get: obj => obj.getEventsWithAutomation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEventStats_decorators, { kind: "method", name: "getEventStats", static: false, private: false, access: { has: obj => "getEventStats" in obj, get: obj => obj.getEventStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IntegrationController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        eventBusService = __runInitializers(this, _instanceExtraInitializers);
        constructor(eventBusService) {
            this.eventBusService = eventBusService;
        }
        /**
         * Get recent events
         */
        async getEvents(limit) {
            const limitNum = limit ? parseInt(limit, 10) : 100;
            return this.eventBusService.getRecentEvents(limitNum);
        }
        /**
         * Get events by type
         */
        async getEventsByType(eventType, limit) {
            const limitNum = limit ? parseInt(limit, 10) : 100;
            return this.eventBusService.getEventsByType(eventType, limitNum);
        }
        /**
         * Get events by source module
         */
        async getEventsBySource(source, limit) {
            const limitNum = limit ? parseInt(limit, 10) : 100;
            return this.eventBusService.getEventsBySource(source, limitNum);
        }
        /**
         * Get events with automation
         */
        async getEventsWithAutomation(limit) {
            const limitNum = limit ? parseInt(limit, 10) : 100;
            return this.eventBusService.getEventsWithAutomation(limitNum);
        }
        /**
         * Get event statistics
         */
        async getEventStats(startDate, endDate) {
            const start = startDate ? new Date(startDate) : undefined;
            const end = endDate ? new Date(endDate) : undefined;
            return this.eventBusService.getEventStats(start, end);
        }
    };
    return IntegrationController = _classThis;
})();
exports.IntegrationController = IntegrationController;
//# sourceMappingURL=integration.controller.js.map