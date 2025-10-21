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
exports.CreateTemplateDto = void 0;
const class_validator_1 = require("class-validator");
let CreateTemplateDto = (() => {
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _htmlContent_decorators;
    let _htmlContent_initializers = [];
    let _htmlContent_extraInitializers = [];
    let _variables_decorators;
    let _variables_initializers = [];
    let _variables_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _previewImageUrl_decorators;
    let _previewImageUrl_initializers = [];
    let _previewImageUrl_extraInitializers = [];
    let _orientation_decorators;
    let _orientation_initializers = [];
    let _orientation_extraInitializers = [];
    let _pageFormat_decorators;
    let _pageFormat_initializers = [];
    let _pageFormat_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    return class CreateTemplateDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)()];
            _description_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _htmlContent_decorators = [(0, class_validator_1.IsString)()];
            _variables_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            _isActive_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _previewImageUrl_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _orientation_decorators = [(0, class_validator_1.IsEnum)(['landscape', 'portrait']), (0, class_validator_1.IsOptional)()];
            _pageFormat_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _metadata_decorators = [(0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _htmlContent_decorators, { kind: "field", name: "htmlContent", static: false, private: false, access: { has: obj => "htmlContent" in obj, get: obj => obj.htmlContent, set: (obj, value) => { obj.htmlContent = value; } }, metadata: _metadata }, _htmlContent_initializers, _htmlContent_extraInitializers);
            __esDecorate(null, null, _variables_decorators, { kind: "field", name: "variables", static: false, private: false, access: { has: obj => "variables" in obj, get: obj => obj.variables, set: (obj, value) => { obj.variables = value; } }, metadata: _metadata }, _variables_initializers, _variables_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _previewImageUrl_decorators, { kind: "field", name: "previewImageUrl", static: false, private: false, access: { has: obj => "previewImageUrl" in obj, get: obj => obj.previewImageUrl, set: (obj, value) => { obj.previewImageUrl = value; } }, metadata: _metadata }, _previewImageUrl_initializers, _previewImageUrl_extraInitializers);
            __esDecorate(null, null, _orientation_decorators, { kind: "field", name: "orientation", static: false, private: false, access: { has: obj => "orientation" in obj, get: obj => obj.orientation, set: (obj, value) => { obj.orientation = value; } }, metadata: _metadata }, _orientation_initializers, _orientation_extraInitializers);
            __esDecorate(null, null, _pageFormat_decorators, { kind: "field", name: "pageFormat", static: false, private: false, access: { has: obj => "pageFormat" in obj, get: obj => obj.pageFormat, set: (obj, value) => { obj.pageFormat = value; } }, metadata: _metadata }, _pageFormat_initializers, _pageFormat_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        htmlContent = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _htmlContent_initializers, void 0));
        variables = (__runInitializers(this, _htmlContent_extraInitializers), __runInitializers(this, _variables_initializers, void 0));
        isActive = (__runInitializers(this, _variables_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        previewImageUrl = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _previewImageUrl_initializers, void 0));
        orientation = (__runInitializers(this, _previewImageUrl_extraInitializers), __runInitializers(this, _orientation_initializers, void 0));
        pageFormat = (__runInitializers(this, _orientation_extraInitializers), __runInitializers(this, _pageFormat_initializers, void 0));
        metadata = (__runInitializers(this, _pageFormat_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        constructor() {
            __runInitializers(this, _metadata_extraInitializers);
        }
    };
})();
exports.CreateTemplateDto = CreateTemplateDto;
//# sourceMappingURL=create-template.dto.js.map