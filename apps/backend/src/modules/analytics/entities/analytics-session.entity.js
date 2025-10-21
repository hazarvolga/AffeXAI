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
exports.AnalyticsSession = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const analytics_event_entity_1 = require("./analytics-event.entity");
let AnalyticsSession = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('analytics_sessions'), (0, typeorm_1.Index)(['userId']), (0, typeorm_1.Index)(['startTime']), (0, typeorm_1.Index)(['converted', 'conversionGoal'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _startTime_decorators;
    let _startTime_initializers = [];
    let _startTime_extraInitializers = [];
    let _endTime_decorators;
    let _endTime_initializers = [];
    let _endTime_extraInitializers = [];
    let _duration_decorators;
    let _duration_initializers = [];
    let _duration_extraInitializers = [];
    let _pagesVisited_decorators;
    let _pagesVisited_initializers = [];
    let _pagesVisited_extraInitializers = [];
    let _totalInteractions_decorators;
    let _totalInteractions_initializers = [];
    let _totalInteractions_extraInitializers = [];
    let _deviceType_decorators;
    let _deviceType_initializers = [];
    let _deviceType_extraInitializers = [];
    let _browser_decorators;
    let _browser_initializers = [];
    let _browser_extraInitializers = [];
    let _os_decorators;
    let _os_initializers = [];
    let _os_extraInitializers = [];
    let _converted_decorators;
    let _converted_initializers = [];
    let _converted_extraInitializers = [];
    let _conversionGoal_decorators;
    let _conversionGoal_initializers = [];
    let _conversionGoal_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _events_decorators;
    let _events_initializers = [];
    let _events_extraInitializers = [];
    var AnalyticsSession = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _userId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _startTime_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _endTime_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _duration_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true, comment: 'Duration in milliseconds' })];
            _pagesVisited_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', default: '[]' })];
            _totalInteractions_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _deviceType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ['mobile', 'tablet', 'desktop'],
                    enumName: 'device_type_enum',
                })];
            _browser_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _os_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _converted_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            _conversionGoal_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: 'SET NULL' }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
            _events_decorators = [(0, typeorm_1.OneToMany)(() => analytics_event_entity_1.AnalyticsEvent, (event) => event.session)];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: obj => "startTime" in obj, get: obj => obj.startTime, set: (obj, value) => { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
            __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: obj => "endTime" in obj, get: obj => obj.endTime, set: (obj, value) => { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
            __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: obj => "duration" in obj, get: obj => obj.duration, set: (obj, value) => { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
            __esDecorate(null, null, _pagesVisited_decorators, { kind: "field", name: "pagesVisited", static: false, private: false, access: { has: obj => "pagesVisited" in obj, get: obj => obj.pagesVisited, set: (obj, value) => { obj.pagesVisited = value; } }, metadata: _metadata }, _pagesVisited_initializers, _pagesVisited_extraInitializers);
            __esDecorate(null, null, _totalInteractions_decorators, { kind: "field", name: "totalInteractions", static: false, private: false, access: { has: obj => "totalInteractions" in obj, get: obj => obj.totalInteractions, set: (obj, value) => { obj.totalInteractions = value; } }, metadata: _metadata }, _totalInteractions_initializers, _totalInteractions_extraInitializers);
            __esDecorate(null, null, _deviceType_decorators, { kind: "field", name: "deviceType", static: false, private: false, access: { has: obj => "deviceType" in obj, get: obj => obj.deviceType, set: (obj, value) => { obj.deviceType = value; } }, metadata: _metadata }, _deviceType_initializers, _deviceType_extraInitializers);
            __esDecorate(null, null, _browser_decorators, { kind: "field", name: "browser", static: false, private: false, access: { has: obj => "browser" in obj, get: obj => obj.browser, set: (obj, value) => { obj.browser = value; } }, metadata: _metadata }, _browser_initializers, _browser_extraInitializers);
            __esDecorate(null, null, _os_decorators, { kind: "field", name: "os", static: false, private: false, access: { has: obj => "os" in obj, get: obj => obj.os, set: (obj, value) => { obj.os = value; } }, metadata: _metadata }, _os_initializers, _os_extraInitializers);
            __esDecorate(null, null, _converted_decorators, { kind: "field", name: "converted", static: false, private: false, access: { has: obj => "converted" in obj, get: obj => obj.converted, set: (obj, value) => { obj.converted = value; } }, metadata: _metadata }, _converted_initializers, _converted_extraInitializers);
            __esDecorate(null, null, _conversionGoal_decorators, { kind: "field", name: "conversionGoal", static: false, private: false, access: { has: obj => "conversionGoal" in obj, get: obj => obj.conversionGoal, set: (obj, value) => { obj.conversionGoal = value; } }, metadata: _metadata }, _conversionGoal_initializers, _conversionGoal_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _events_decorators, { kind: "field", name: "events", static: false, private: false, access: { has: obj => "events" in obj, get: obj => obj.events, set: (obj, value) => { obj.events = value; } }, metadata: _metadata }, _events_initializers, _events_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AnalyticsSession = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        startTime = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
        endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
        duration = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
        pagesVisited = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _pagesVisited_initializers, void 0));
        totalInteractions = (__runInitializers(this, _pagesVisited_extraInitializers), __runInitializers(this, _totalInteractions_initializers, void 0));
        deviceType = (__runInitializers(this, _totalInteractions_extraInitializers), __runInitializers(this, _deviceType_initializers, void 0));
        browser = (__runInitializers(this, _deviceType_extraInitializers), __runInitializers(this, _browser_initializers, void 0));
        os = (__runInitializers(this, _browser_extraInitializers), __runInitializers(this, _os_initializers, void 0));
        converted = (__runInitializers(this, _os_extraInitializers), __runInitializers(this, _converted_initializers, void 0));
        conversionGoal = (__runInitializers(this, _converted_extraInitializers), __runInitializers(this, _conversionGoal_initializers, void 0));
        createdAt = (__runInitializers(this, _conversionGoal_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        // Relations
        user = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _user_initializers, void 0));
        events = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _events_initializers, void 0));
        constructor() {
            __runInitializers(this, _events_extraInitializers);
        }
    };
    return AnalyticsSession = _classThis;
})();
exports.AnalyticsSession = AnalyticsSession;
//# sourceMappingURL=analytics-session.entity.js.map