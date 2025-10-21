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
exports.BatchTrackEventsDto = exports.TrackEventDto = exports.ViewportDto = exports.CoordinatesDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const entities_1 = require("../entities");
let CoordinatesDto = (() => {
    let _x_decorators;
    let _x_initializers = [];
    let _x_extraInitializers = [];
    let _y_decorators;
    let _y_initializers = [];
    let _y_extraInitializers = [];
    let _relativeX_decorators;
    let _relativeX_initializers = [];
    let _relativeX_extraInitializers = [];
    let _relativeY_decorators;
    let _relativeY_initializers = [];
    let _relativeY_extraInitializers = [];
    return class CoordinatesDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _x_decorators = [(0, class_validator_1.IsNumber)()];
            _y_decorators = [(0, class_validator_1.IsNumber)()];
            _relativeX_decorators = [(0, class_validator_1.IsNumber)()];
            _relativeY_decorators = [(0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _x_decorators, { kind: "field", name: "x", static: false, private: false, access: { has: obj => "x" in obj, get: obj => obj.x, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, _x_initializers, _x_extraInitializers);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
            __esDecorate(null, null, _relativeX_decorators, { kind: "field", name: "relativeX", static: false, private: false, access: { has: obj => "relativeX" in obj, get: obj => obj.relativeX, set: (obj, value) => { obj.relativeX = value; } }, metadata: _metadata }, _relativeX_initializers, _relativeX_extraInitializers);
            __esDecorate(null, null, _relativeY_decorators, { kind: "field", name: "relativeY", static: false, private: false, access: { has: obj => "relativeY" in obj, get: obj => obj.relativeY, set: (obj, value) => { obj.relativeY = value; } }, metadata: _metadata }, _relativeY_initializers, _relativeY_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        x = __runInitializers(this, _x_initializers, void 0);
        y = (__runInitializers(this, _x_extraInitializers), __runInitializers(this, _y_initializers, void 0));
        relativeX = (__runInitializers(this, _y_extraInitializers), __runInitializers(this, _relativeX_initializers, void 0));
        relativeY = (__runInitializers(this, _relativeX_extraInitializers), __runInitializers(this, _relativeY_initializers, void 0));
        constructor() {
            __runInitializers(this, _relativeY_extraInitializers);
        }
    };
})();
exports.CoordinatesDto = CoordinatesDto;
let ViewportDto = (() => {
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    let _height_decorators;
    let _height_initializers = [];
    let _height_extraInitializers = [];
    return class ViewportDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _width_decorators = [(0, class_validator_1.IsNumber)()];
            _height_decorators = [(0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            __esDecorate(null, null, _height_decorators, { kind: "field", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height, set: (obj, value) => { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        width = __runInitializers(this, _width_initializers, void 0);
        height = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _height_initializers, void 0));
        constructor() {
            __runInitializers(this, _height_extraInitializers);
        }
    };
})();
exports.ViewportDto = ViewportDto;
let TrackEventDto = (() => {
    let _componentId_decorators;
    let _componentId_initializers = [];
    let _componentId_extraInitializers = [];
    let _componentType_decorators;
    let _componentType_initializers = [];
    let _componentType_extraInitializers = [];
    let _interactionType_decorators;
    let _interactionType_initializers = [];
    let _interactionType_extraInitializers = [];
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _pageUrl_decorators;
    let _pageUrl_initializers = [];
    let _pageUrl_extraInitializers = [];
    let _deviceType_decorators;
    let _deviceType_initializers = [];
    let _deviceType_extraInitializers = [];
    let _browser_decorators;
    let _browser_initializers = [];
    let _browser_extraInitializers = [];
    let _viewport_decorators;
    let _viewport_initializers = [];
    let _viewport_extraInitializers = [];
    let _coordinates_decorators;
    let _coordinates_initializers = [];
    let _coordinates_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    return class TrackEventDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _componentId_decorators = [(0, class_validator_1.IsString)()];
            _componentType_decorators = [(0, class_validator_1.IsString)()];
            _interactionType_decorators = [(0, class_validator_1.IsEnum)(entities_1.InteractionType)];
            _sessionId_decorators = [(0, class_validator_1.IsUUID)()];
            _userId_decorators = [(0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _pageUrl_decorators = [(0, class_validator_1.IsString)()];
            _deviceType_decorators = [(0, class_validator_1.IsEnum)(entities_1.DeviceType)];
            _browser_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _viewport_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => ViewportDto)];
            _coordinates_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => CoordinatesDto), (0, class_validator_1.IsOptional)()];
            _metadata_decorators = [(0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _componentId_decorators, { kind: "field", name: "componentId", static: false, private: false, access: { has: obj => "componentId" in obj, get: obj => obj.componentId, set: (obj, value) => { obj.componentId = value; } }, metadata: _metadata }, _componentId_initializers, _componentId_extraInitializers);
            __esDecorate(null, null, _componentType_decorators, { kind: "field", name: "componentType", static: false, private: false, access: { has: obj => "componentType" in obj, get: obj => obj.componentType, set: (obj, value) => { obj.componentType = value; } }, metadata: _metadata }, _componentType_initializers, _componentType_extraInitializers);
            __esDecorate(null, null, _interactionType_decorators, { kind: "field", name: "interactionType", static: false, private: false, access: { has: obj => "interactionType" in obj, get: obj => obj.interactionType, set: (obj, value) => { obj.interactionType = value; } }, metadata: _metadata }, _interactionType_initializers, _interactionType_extraInitializers);
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _pageUrl_decorators, { kind: "field", name: "pageUrl", static: false, private: false, access: { has: obj => "pageUrl" in obj, get: obj => obj.pageUrl, set: (obj, value) => { obj.pageUrl = value; } }, metadata: _metadata }, _pageUrl_initializers, _pageUrl_extraInitializers);
            __esDecorate(null, null, _deviceType_decorators, { kind: "field", name: "deviceType", static: false, private: false, access: { has: obj => "deviceType" in obj, get: obj => obj.deviceType, set: (obj, value) => { obj.deviceType = value; } }, metadata: _metadata }, _deviceType_initializers, _deviceType_extraInitializers);
            __esDecorate(null, null, _browser_decorators, { kind: "field", name: "browser", static: false, private: false, access: { has: obj => "browser" in obj, get: obj => obj.browser, set: (obj, value) => { obj.browser = value; } }, metadata: _metadata }, _browser_initializers, _browser_extraInitializers);
            __esDecorate(null, null, _viewport_decorators, { kind: "field", name: "viewport", static: false, private: false, access: { has: obj => "viewport" in obj, get: obj => obj.viewport, set: (obj, value) => { obj.viewport = value; } }, metadata: _metadata }, _viewport_initializers, _viewport_extraInitializers);
            __esDecorate(null, null, _coordinates_decorators, { kind: "field", name: "coordinates", static: false, private: false, access: { has: obj => "coordinates" in obj, get: obj => obj.coordinates, set: (obj, value) => { obj.coordinates = value; } }, metadata: _metadata }, _coordinates_initializers, _coordinates_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        componentId = __runInitializers(this, _componentId_initializers, void 0);
        componentType = (__runInitializers(this, _componentId_extraInitializers), __runInitializers(this, _componentType_initializers, void 0));
        interactionType = (__runInitializers(this, _componentType_extraInitializers), __runInitializers(this, _interactionType_initializers, void 0));
        sessionId = (__runInitializers(this, _interactionType_extraInitializers), __runInitializers(this, _sessionId_initializers, void 0));
        userId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        pageUrl = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _pageUrl_initializers, void 0));
        deviceType = (__runInitializers(this, _pageUrl_extraInitializers), __runInitializers(this, _deviceType_initializers, void 0));
        browser = (__runInitializers(this, _deviceType_extraInitializers), __runInitializers(this, _browser_initializers, void 0));
        viewport = (__runInitializers(this, _browser_extraInitializers), __runInitializers(this, _viewport_initializers, void 0));
        coordinates = (__runInitializers(this, _viewport_extraInitializers), __runInitializers(this, _coordinates_initializers, void 0));
        metadata = (__runInitializers(this, _coordinates_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        constructor() {
            __runInitializers(this, _metadata_extraInitializers);
        }
    };
})();
exports.TrackEventDto = TrackEventDto;
let BatchTrackEventsDto = (() => {
    let _events_decorators;
    let _events_initializers = [];
    let _events_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    return class BatchTrackEventsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _events_decorators = [(0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(() => TrackEventDto)];
            _session_decorators = [(0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _events_decorators, { kind: "field", name: "events", static: false, private: false, access: { has: obj => "events" in obj, get: obj => obj.events, set: (obj, value) => { obj.events = value; } }, metadata: _metadata }, _events_initializers, _events_extraInitializers);
            __esDecorate(null, null, _session_decorators, { kind: "field", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        events = __runInitializers(this, _events_initializers, void 0);
        session = (__runInitializers(this, _events_extraInitializers), __runInitializers(this, _session_initializers, void 0));
        constructor() {
            __runInitializers(this, _session_extraInitializers);
        }
    };
})();
exports.BatchTrackEventsDto = BatchTrackEventsDto;
//# sourceMappingURL=track-event.dto.js.map