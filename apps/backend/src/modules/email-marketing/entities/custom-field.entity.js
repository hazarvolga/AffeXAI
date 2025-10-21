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
exports.CustomField = exports.CustomFieldType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
var CustomFieldType;
(function (CustomFieldType) {
    CustomFieldType["TEXT"] = "TEXT";
    CustomFieldType["NUMBER"] = "NUMBER";
    CustomFieldType["DATE"] = "DATE";
    CustomFieldType["BOOLEAN"] = "BOOLEAN";
    CustomFieldType["SELECT"] = "SELECT";
    CustomFieldType["MULTI_SELECT"] = "MULTI_SELECT";
})(CustomFieldType || (exports.CustomFieldType = CustomFieldType = {}));
let CustomField = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('custom_fields')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _label_decorators;
    let _label_initializers = [];
    let _label_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _required_decorators;
    let _required_initializers = [];
    let _required_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _defaultValue_decorators;
    let _defaultValue_initializers = [];
    let _defaultValue_extraInitializers = [];
    let _placeholder_decorators;
    let _placeholder_initializers = [];
    let _placeholder_extraInitializers = [];
    let _validation_decorators;
    let _validation_initializers = [];
    let _validation_extraInitializers = [];
    let _active_decorators;
    let _active_initializers = [];
    let _active_extraInitializers = [];
    let _sortOrder_decorators;
    let _sortOrder_initializers = [];
    let _sortOrder_extraInitializers = [];
    var CustomField = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _name_decorators = [(0, typeorm_1.Column)()];
            _label_decorators = [(0, typeorm_1.Column)()];
            _type_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: CustomFieldType })];
            _description_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _required_decorators = [(0, typeorm_1.Column)({ default: false })];
            _options_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _defaultValue_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _placeholder_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _validation_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _active_decorators = [(0, typeorm_1.Column)({ default: true })];
            _sortOrder_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label, set: (obj, value) => { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _required_decorators, { kind: "field", name: "required", static: false, private: false, access: { has: obj => "required" in obj, get: obj => obj.required, set: (obj, value) => { obj.required = value; } }, metadata: _metadata }, _required_initializers, _required_extraInitializers);
            __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(null, null, _defaultValue_decorators, { kind: "field", name: "defaultValue", static: false, private: false, access: { has: obj => "defaultValue" in obj, get: obj => obj.defaultValue, set: (obj, value) => { obj.defaultValue = value; } }, metadata: _metadata }, _defaultValue_initializers, _defaultValue_extraInitializers);
            __esDecorate(null, null, _placeholder_decorators, { kind: "field", name: "placeholder", static: false, private: false, access: { has: obj => "placeholder" in obj, get: obj => obj.placeholder, set: (obj, value) => { obj.placeholder = value; } }, metadata: _metadata }, _placeholder_initializers, _placeholder_extraInitializers);
            __esDecorate(null, null, _validation_decorators, { kind: "field", name: "validation", static: false, private: false, access: { has: obj => "validation" in obj, get: obj => obj.validation, set: (obj, value) => { obj.validation = value; } }, metadata: _metadata }, _validation_initializers, _validation_extraInitializers);
            __esDecorate(null, null, _active_decorators, { kind: "field", name: "active", static: false, private: false, access: { has: obj => "active" in obj, get: obj => obj.active, set: (obj, value) => { obj.active = value; } }, metadata: _metadata }, _active_initializers, _active_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: obj => "sortOrder" in obj, get: obj => obj.sortOrder, set: (obj, value) => { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CustomField = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        name = __runInitializers(this, _name_initializers, void 0);
        label = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _label_initializers, void 0));
        type = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _type_initializers, void 0));
        description = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        required = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _required_initializers, void 0));
        options = (__runInitializers(this, _required_extraInitializers), __runInitializers(this, _options_initializers, void 0)); // For SELECT and MULTI_SELECT types
        defaultValue = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _defaultValue_initializers, void 0));
        placeholder = (__runInitializers(this, _defaultValue_extraInitializers), __runInitializers(this, _placeholder_initializers, void 0));
        validation = (__runInitializers(this, _placeholder_extraInitializers), __runInitializers(this, _validation_initializers, void 0));
        active = (__runInitializers(this, _validation_extraInitializers), __runInitializers(this, _active_initializers, void 0));
        sortOrder = (__runInitializers(this, _active_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _sortOrder_extraInitializers);
        }
    };
    return CustomField = _classThis;
})();
exports.CustomField = CustomField;
//# sourceMappingURL=custom-field.entity.js.map