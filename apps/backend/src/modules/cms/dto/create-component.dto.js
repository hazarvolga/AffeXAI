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
exports.CreateComponentDto = void 0;
const class_validator_1 = require("class-validator");
const shared_types_1 = require("@affexai/shared-types");
let CreateComponentDto = (() => {
    let _pageId_decorators;
    let _pageId_initializers = [];
    let _pageId_extraInitializers = [];
    let _parentId_decorators;
    let _parentId_initializers = [];
    let _parentId_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _props_decorators;
    let _props_initializers = [];
    let _props_extraInitializers = [];
    let _orderIndex_decorators;
    let _orderIndex_initializers = [];
    let _orderIndex_extraInitializers = [];
    return class CreateComponentDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _pageId_decorators = [(0, class_validator_1.IsUUID)()];
            _parentId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _type_decorators = [(0, class_validator_1.IsEnum)(shared_types_1.ComponentType)];
            _props_decorators = [(0, class_validator_1.IsObject)()];
            _orderIndex_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _pageId_decorators, { kind: "field", name: "pageId", static: false, private: false, access: { has: obj => "pageId" in obj, get: obj => obj.pageId, set: (obj, value) => { obj.pageId = value; } }, metadata: _metadata }, _pageId_initializers, _pageId_extraInitializers);
            __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: obj => "parentId" in obj, get: obj => obj.parentId, set: (obj, value) => { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _props_decorators, { kind: "field", name: "props", static: false, private: false, access: { has: obj => "props" in obj, get: obj => obj.props, set: (obj, value) => { obj.props = value; } }, metadata: _metadata }, _props_initializers, _props_extraInitializers);
            __esDecorate(null, null, _orderIndex_decorators, { kind: "field", name: "orderIndex", static: false, private: false, access: { has: obj => "orderIndex" in obj, get: obj => obj.orderIndex, set: (obj, value) => { obj.orderIndex = value; } }, metadata: _metadata }, _orderIndex_initializers, _orderIndex_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        pageId = __runInitializers(this, _pageId_initializers, void 0);
        parentId = (__runInitializers(this, _pageId_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
        type = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
        props = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _props_initializers, void 0));
        orderIndex = (__runInitializers(this, _props_extraInitializers), __runInitializers(this, _orderIndex_initializers, void 0));
        constructor() {
            __runInitializers(this, _orderIndex_extraInitializers);
        }
    };
})();
exports.CreateComponentDto = CreateComponentDto;
//# sourceMappingURL=create-component.dto.js.map