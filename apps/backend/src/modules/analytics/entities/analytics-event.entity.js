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
exports.AnalyticsEvent = exports.DeviceType = exports.InteractionType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const analytics_session_entity_1 = require("./analytics-session.entity");
var InteractionType;
(function (InteractionType) {
    InteractionType["CLICK"] = "click";
    InteractionType["HOVER"] = "hover";
    InteractionType["SCROLL"] = "scroll";
    InteractionType["FOCUS"] = "focus";
    InteractionType["INPUT"] = "input";
    InteractionType["SUBMIT"] = "submit";
    InteractionType["VIEW"] = "view";
    InteractionType["EXIT"] = "exit";
})(InteractionType || (exports.InteractionType = InteractionType = {}));
var DeviceType;
(function (DeviceType) {
    DeviceType["MOBILE"] = "mobile";
    DeviceType["TABLET"] = "tablet";
    DeviceType["DESKTOP"] = "desktop";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
let AnalyticsEvent = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('analytics_events'), (0, typeorm_1.Index)(['componentId', 'componentType']), (0, typeorm_1.Index)(['sessionId']), (0, typeorm_1.Index)(['interactionType', 'createdAt']), (0, typeorm_1.Index)(['pageUrl', 'createdAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
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
    let _viewportWidth_decorators;
    let _viewportWidth_initializers = [];
    let _viewportWidth_extraInitializers = [];
    let _viewportHeight_decorators;
    let _viewportHeight_initializers = [];
    let _viewportHeight_extraInitializers = [];
    let _coordinateX_decorators;
    let _coordinateX_initializers = [];
    let _coordinateX_extraInitializers = [];
    let _coordinateY_decorators;
    let _coordinateY_initializers = [];
    let _coordinateY_extraInitializers = [];
    let _relativeX_decorators;
    let _relativeX_initializers = [];
    let _relativeX_extraInitializers = [];
    let _relativeY_decorators;
    let _relativeY_initializers = [];
    let _relativeY_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    var AnalyticsEvent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _componentId_decorators = [(0, typeorm_1.Column)()];
            _componentType_decorators = [(0, typeorm_1.Column)()];
            _interactionType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ['click', 'hover', 'scroll', 'focus', 'input', 'submit', 'view', 'exit'],
                    enumName: 'interaction_type_enum',
                })];
            _sessionId_decorators = [(0, typeorm_1.Column)('uuid')];
            _userId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _pageUrl_decorators = [(0, typeorm_1.Column)({ length: 500 })];
            _deviceType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ['mobile', 'tablet', 'desktop'],
                    enumName: 'device_type_enum',
                })];
            _browser_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _viewportWidth_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
            _viewportHeight_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
            _coordinateX_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
            _coordinateY_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
            _relativeX_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
            _relativeY_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: 'SET NULL' }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
            _session_decorators = [(0, typeorm_1.ManyToOne)(() => analytics_session_entity_1.AnalyticsSession, { nullable: false, onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'sessionId' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _componentId_decorators, { kind: "field", name: "componentId", static: false, private: false, access: { has: obj => "componentId" in obj, get: obj => obj.componentId, set: (obj, value) => { obj.componentId = value; } }, metadata: _metadata }, _componentId_initializers, _componentId_extraInitializers);
            __esDecorate(null, null, _componentType_decorators, { kind: "field", name: "componentType", static: false, private: false, access: { has: obj => "componentType" in obj, get: obj => obj.componentType, set: (obj, value) => { obj.componentType = value; } }, metadata: _metadata }, _componentType_initializers, _componentType_extraInitializers);
            __esDecorate(null, null, _interactionType_decorators, { kind: "field", name: "interactionType", static: false, private: false, access: { has: obj => "interactionType" in obj, get: obj => obj.interactionType, set: (obj, value) => { obj.interactionType = value; } }, metadata: _metadata }, _interactionType_initializers, _interactionType_extraInitializers);
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _pageUrl_decorators, { kind: "field", name: "pageUrl", static: false, private: false, access: { has: obj => "pageUrl" in obj, get: obj => obj.pageUrl, set: (obj, value) => { obj.pageUrl = value; } }, metadata: _metadata }, _pageUrl_initializers, _pageUrl_extraInitializers);
            __esDecorate(null, null, _deviceType_decorators, { kind: "field", name: "deviceType", static: false, private: false, access: { has: obj => "deviceType" in obj, get: obj => obj.deviceType, set: (obj, value) => { obj.deviceType = value; } }, metadata: _metadata }, _deviceType_initializers, _deviceType_extraInitializers);
            __esDecorate(null, null, _browser_decorators, { kind: "field", name: "browser", static: false, private: false, access: { has: obj => "browser" in obj, get: obj => obj.browser, set: (obj, value) => { obj.browser = value; } }, metadata: _metadata }, _browser_initializers, _browser_extraInitializers);
            __esDecorate(null, null, _viewportWidth_decorators, { kind: "field", name: "viewportWidth", static: false, private: false, access: { has: obj => "viewportWidth" in obj, get: obj => obj.viewportWidth, set: (obj, value) => { obj.viewportWidth = value; } }, metadata: _metadata }, _viewportWidth_initializers, _viewportWidth_extraInitializers);
            __esDecorate(null, null, _viewportHeight_decorators, { kind: "field", name: "viewportHeight", static: false, private: false, access: { has: obj => "viewportHeight" in obj, get: obj => obj.viewportHeight, set: (obj, value) => { obj.viewportHeight = value; } }, metadata: _metadata }, _viewportHeight_initializers, _viewportHeight_extraInitializers);
            __esDecorate(null, null, _coordinateX_decorators, { kind: "field", name: "coordinateX", static: false, private: false, access: { has: obj => "coordinateX" in obj, get: obj => obj.coordinateX, set: (obj, value) => { obj.coordinateX = value; } }, metadata: _metadata }, _coordinateX_initializers, _coordinateX_extraInitializers);
            __esDecorate(null, null, _coordinateY_decorators, { kind: "field", name: "coordinateY", static: false, private: false, access: { has: obj => "coordinateY" in obj, get: obj => obj.coordinateY, set: (obj, value) => { obj.coordinateY = value; } }, metadata: _metadata }, _coordinateY_initializers, _coordinateY_extraInitializers);
            __esDecorate(null, null, _relativeX_decorators, { kind: "field", name: "relativeX", static: false, private: false, access: { has: obj => "relativeX" in obj, get: obj => obj.relativeX, set: (obj, value) => { obj.relativeX = value; } }, metadata: _metadata }, _relativeX_initializers, _relativeX_extraInitializers);
            __esDecorate(null, null, _relativeY_decorators, { kind: "field", name: "relativeY", static: false, private: false, access: { has: obj => "relativeY" in obj, get: obj => obj.relativeY, set: (obj, value) => { obj.relativeY = value; } }, metadata: _metadata }, _relativeY_initializers, _relativeY_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _session_decorators, { kind: "field", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AnalyticsEvent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        componentId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _componentId_initializers, void 0));
        componentType = (__runInitializers(this, _componentId_extraInitializers), __runInitializers(this, _componentType_initializers, void 0));
        interactionType = (__runInitializers(this, _componentType_extraInitializers), __runInitializers(this, _interactionType_initializers, void 0));
        sessionId = (__runInitializers(this, _interactionType_extraInitializers), __runInitializers(this, _sessionId_initializers, void 0));
        userId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        pageUrl = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _pageUrl_initializers, void 0));
        deviceType = (__runInitializers(this, _pageUrl_extraInitializers), __runInitializers(this, _deviceType_initializers, void 0));
        browser = (__runInitializers(this, _deviceType_extraInitializers), __runInitializers(this, _browser_initializers, void 0));
        viewportWidth = (__runInitializers(this, _browser_extraInitializers), __runInitializers(this, _viewportWidth_initializers, void 0));
        viewportHeight = (__runInitializers(this, _viewportWidth_extraInitializers), __runInitializers(this, _viewportHeight_initializers, void 0));
        coordinateX = (__runInitializers(this, _viewportHeight_extraInitializers), __runInitializers(this, _coordinateX_initializers, void 0));
        coordinateY = (__runInitializers(this, _coordinateX_extraInitializers), __runInitializers(this, _coordinateY_initializers, void 0));
        relativeX = (__runInitializers(this, _coordinateY_extraInitializers), __runInitializers(this, _relativeX_initializers, void 0));
        relativeY = (__runInitializers(this, _relativeX_extraInitializers), __runInitializers(this, _relativeY_initializers, void 0));
        metadata = (__runInitializers(this, _relativeY_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        // Relations
        user = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _user_initializers, void 0));
        session = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _session_initializers, void 0));
        constructor() {
            __runInitializers(this, _session_extraInitializers);
        }
    };
    return AnalyticsEvent = _classThis;
})();
exports.AnalyticsEvent = AnalyticsEvent;
//# sourceMappingURL=analytics-event.entity.js.map