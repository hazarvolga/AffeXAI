"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportCleanupService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
let ExportCleanupService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _handleExpiredExportsCleanup_decorators;
    var ExportCleanupService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _handleExpiredExportsCleanup_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM)];
            __esDecorate(this, null, _handleExpiredExportsCleanup_decorators, { kind: "method", name: "handleExpiredExportsCleanup", static: false, private: false, access: { has: obj => "handleExpiredExportsCleanup" in obj, get: obj => obj.handleExpiredExportsCleanup }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExportCleanupService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        bulkExportService = __runInitializers(this, _instanceExtraInitializers);
        logger = new common_1.Logger(ExportCleanupService.name);
        constructor(bulkExportService) {
            this.bulkExportService = bulkExportService;
        }
        /**
         * Clean up expired export files daily at 2 AM
         */
        async handleExpiredExportsCleanup() {
            this.logger.log('Starting scheduled cleanup of expired export files');
            try {
                await this.bulkExportService.cleanupExpiredExports();
                this.logger.log('Completed scheduled cleanup of expired export files');
            }
            catch (error) {
                this.logger.error(`Failed to cleanup expired export files: ${error.message}`, error.stack);
            }
        }
        /**
         * Manual cleanup trigger (can be called via API or admin interface)
         */
        async triggerManualCleanup() {
            try {
                this.logger.log('Starting manual cleanup of expired export files');
                await this.bulkExportService.cleanupExpiredExports();
                return {
                    message: 'Export files cleanup completed successfully',
                    success: true,
                };
            }
            catch (error) {
                this.logger.error(`Manual cleanup failed: ${error.message}`, error.stack);
                return {
                    message: `Cleanup failed: ${error.message}`,
                    success: false,
                };
            }
        }
    };
    return ExportCleanupService = _classThis;
})();
exports.ExportCleanupService = ExportCleanupService;
//# sourceMappingURL=export-cleanup.service.js.map