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
exports.ExportTemplateResponseDto = exports.ImportTemplateDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let ImportTemplateDto = (() => {
    let _templateData_decorators;
    let _templateData_initializers = [];
    let _templateData_extraInitializers = [];
    let _authorId_decorators;
    let _authorId_initializers = [];
    let _authorId_extraInitializers = [];
    return class ImportTemplateDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _templateData_decorators = [(0, swagger_1.ApiProperty)({ description: 'Template JSON data as string' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _authorId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Override author ID' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _templateData_decorators, { kind: "field", name: "templateData", static: false, private: false, access: { has: obj => "templateData" in obj, get: obj => obj.templateData, set: (obj, value) => { obj.templateData = value; } }, metadata: _metadata }, _templateData_initializers, _templateData_extraInitializers);
            __esDecorate(null, null, _authorId_decorators, { kind: "field", name: "authorId", static: false, private: false, access: { has: obj => "authorId" in obj, get: obj => obj.authorId, set: (obj, value) => { obj.authorId = value; } }, metadata: _metadata }, _authorId_initializers, _authorId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        templateData = __runInitializers(this, _templateData_initializers, void 0);
        authorId = (__runInitializers(this, _templateData_extraInitializers), __runInitializers(this, _authorId_initializers, void 0));
        constructor() {
            __runInitializers(this, _authorId_extraInitializers);
        }
    };
})();
exports.ImportTemplateDto = ImportTemplateDto;
let ExportTemplateResponseDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _exportedAt_decorators;
    let _exportedAt_initializers = [];
    let _exportedAt_extraInitializers = [];
    return class ExportTemplateResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Template ID' })];
            _name_decorators = [(0, swagger_1.ApiProperty)({ description: 'Template name' })];
            _data_decorators = [(0, swagger_1.ApiProperty)({ description: 'Exported template data' })];
            _exportedAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Export timestamp' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, null, _exportedAt_decorators, { kind: "field", name: "exportedAt", static: false, private: false, access: { has: obj => "exportedAt" in obj, get: obj => obj.exportedAt, set: (obj, value) => { obj.exportedAt = value; } }, metadata: _metadata }, _exportedAt_initializers, _exportedAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
        data = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _data_initializers, void 0));
        exportedAt = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _exportedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _exportedAt_extraInitializers);
        }
    };
})();
exports.ExportTemplateResponseDto = ExportTemplateResponseDto;
//# sourceMappingURL=import-template.dto.js.map