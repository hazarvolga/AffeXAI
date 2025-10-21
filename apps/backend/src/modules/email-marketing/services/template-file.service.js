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
exports.TemplateFileService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
const glob_1 = require("glob");
let TemplateFileService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TemplateFileService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TemplateFileService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        templatesPath;
        constructor() {
            this.templatesPath = (0, path_1.join)(process.cwd(), '..', '..', 'src', 'emails');
        }
        async getAllTemplateFiles() {
            try {
                const files = await (0, glob_1.glob)('*.tsx', { cwd: this.templatesPath });
                return files.map(file => ({
                    id: file.replace('.tsx', ''),
                    name: this.formatTemplateName(file.replace('.tsx', '')),
                    fileName: file,
                }));
            }
            catch (error) {
                throw new common_1.NotFoundException('Template files not found');
            }
        }
        async getTemplateFileContent(filename) {
            try {
                const filePath = (0, path_1.join)(this.templatesPath, filename);
                const fileExists = await fs_1.promises.access(filePath).then(() => true).catch(() => false);
                if (!fileExists) {
                    throw new common_1.NotFoundException(`Template file ${filename} not found`);
                }
                return await fs_1.promises.readFile(filePath, 'utf-8');
            }
            catch (error) {
                throw new common_1.NotFoundException(`Template file ${filename} not found`);
            }
        }
        formatTemplateName(templateId) {
            // Convert kebab-case to readable format
            return templateId
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
    };
    return TemplateFileService = _classThis;
})();
exports.TemplateFileService = TemplateFileService;
//# sourceMappingURL=template-file.service.js.map