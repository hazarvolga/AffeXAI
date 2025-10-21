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
exports.CreateSegmentDto = void 0;
const class_validator_1 = require("class-validator");
let CreateSegmentDto = (() => {
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _criteria_decorators;
    let _criteria_initializers = [];
    let _criteria_extraInitializers = [];
    let _openRate_decorators;
    let _openRate_initializers = [];
    let _openRate_extraInitializers = [];
    let _clickRate_decorators;
    let _clickRate_initializers = [];
    let _clickRate_extraInitializers = [];
    return class CreateSegmentDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1)];
            _description_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _criteria_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _openRate_decorators = [(0, class_validator_1.IsOptional)()];
            _clickRate_decorators = [(0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _criteria_decorators, { kind: "field", name: "criteria", static: false, private: false, access: { has: obj => "criteria" in obj, get: obj => obj.criteria, set: (obj, value) => { obj.criteria = value; } }, metadata: _metadata }, _criteria_initializers, _criteria_extraInitializers);
            __esDecorate(null, null, _openRate_decorators, { kind: "field", name: "openRate", static: false, private: false, access: { has: obj => "openRate" in obj, get: obj => obj.openRate, set: (obj, value) => { obj.openRate = value; } }, metadata: _metadata }, _openRate_initializers, _openRate_extraInitializers);
            __esDecorate(null, null, _clickRate_decorators, { kind: "field", name: "clickRate", static: false, private: false, access: { has: obj => "clickRate" in obj, get: obj => obj.clickRate, set: (obj, value) => { obj.clickRate = value; } }, metadata: _metadata }, _clickRate_initializers, _clickRate_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        criteria = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _criteria_initializers, void 0));
        openRate = (__runInitializers(this, _criteria_extraInitializers), __runInitializers(this, _openRate_initializers, void 0));
        clickRate = (__runInitializers(this, _openRate_extraInitializers), __runInitializers(this, _clickRate_initializers, void 0));
        constructor() {
            __runInitializers(this, _clickRate_extraInitializers);
        }
    };
})();
exports.CreateSegmentDto = CreateSegmentDto;
//# sourceMappingURL=create-segment.dto.js.map