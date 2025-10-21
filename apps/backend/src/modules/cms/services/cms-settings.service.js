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
exports.CmsSettingsService = void 0;
const common_1 = require("@nestjs/common");
const shared_types_1 = require("@affexai/shared-types");
let CmsSettingsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmsSettingsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CmsSettingsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        pageRepository;
        componentRepository;
        constructor(pageRepository, componentRepository) {
            this.pageRepository = pageRepository;
            this.componentRepository = componentRepository;
        }
        /**
         * Get all published pages with their components
         */
        async getPublishedPages() {
            return this.pageRepository.find({
                where: { status: shared_types_1.PageStatus.PUBLISHED },
                relations: ['components'],
                order: { createdAt: 'DESC' },
            });
        }
        /**
         * Get a published page by slug with its components
         */
        async getPublishedPageBySlug(slug) {
            return this.pageRepository.findOne({
                where: {
                    slug: slug,
                    status: shared_types_1.PageStatus.PUBLISHED
                },
                relations: ['components'],
            });
        }
        /**
         * Get all components for a published page, organized hierarchically
         */
        async getPageComponents(pageId) {
            const components = await this.componentRepository.find({
                where: { pageId },
                order: { orderIndex: 'ASC' },
            });
            // Build hierarchical structure
            const componentMap = new Map();
            const rootComponents = [];
            // First pass: create map of all components
            components.forEach(component => {
                component.children = [];
                componentMap.set(component.id, component);
            });
            // Second pass: build parent-child relationships
            components.forEach(component => {
                if (component.parentId) {
                    const parent = componentMap.get(component.parentId);
                    if (parent) {
                        parent.children.push(component);
                    }
                }
                else {
                    rootComponents.push(component);
                }
            });
            return rootComponents;
        }
        /**
         * Get CMS configuration that can be used in site settings
         */
        async getCmsConfiguration() {
            const pages = await this.getPublishedPages();
            return {
                pages: pages.map(page => ({
                    id: page.id,
                    title: page.title,
                    slug: page.slug,
                    description: page.description,
                })),
                lastUpdated: new Date(),
            };
        }
    };
    return CmsSettingsService = _classThis;
})();
exports.CmsSettingsService = CmsSettingsService;
//# sourceMappingURL=cms-settings.service.js.map