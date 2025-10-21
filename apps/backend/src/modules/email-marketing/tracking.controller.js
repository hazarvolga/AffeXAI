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
exports.TrackingController = void 0;
const common_1 = require("@nestjs/common");
/**
 * Email Tracking Controller
 * Handles pixel tracking for email opens and link click tracking
 */
let TrackingController = (() => {
    let _classDecorators = [(0, common_1.Controller)('email-marketing/track')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _trackOpen_decorators;
    let _trackClick_decorators;
    let _generateTrackingUrls_decorators;
    let _getTrackingStats_decorators;
    var TrackingController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _trackOpen_decorators = [(0, common_1.Get)('open/:trackingId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
            _trackClick_decorators = [(0, common_1.Get)('click/:trackingId')];
            _generateTrackingUrls_decorators = [(0, common_1.Post)('generate')];
            _getTrackingStats_decorators = [(0, common_1.Get)('stats/:campaignId')];
            __esDecorate(this, null, _trackOpen_decorators, { kind: "method", name: "trackOpen", static: false, private: false, access: { has: obj => "trackOpen" in obj, get: obj => obj.trackOpen }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _trackClick_decorators, { kind: "method", name: "trackClick", static: false, private: false, access: { has: obj => "trackClick" in obj, get: obj => obj.trackClick }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generateTrackingUrls_decorators, { kind: "method", name: "generateTrackingUrls", static: false, private: false, access: { has: obj => "generateTrackingUrls" in obj, get: obj => obj.generateTrackingUrls }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTrackingStats_decorators, { kind: "method", name: "getTrackingStats", static: false, private: false, access: { has: obj => "getTrackingStats" in obj, get: obj => obj.getTrackingStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TrackingController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        trackingService = __runInitializers(this, _instanceExtraInitializers);
        constructor(trackingService) {
            this.trackingService = trackingService;
        }
        /**
         * Track email open via 1x1 pixel
         * GET /api/email-marketing/track/open/:trackingId
         */
        async trackOpen(trackingId, userAgent, forwardedFor, realIp, res) {
            try {
                // Extract IP address
                const ipAddress = forwardedFor?.split(',')[0] || realIp || 'unknown';
                // Track the open event
                await this.trackingService.trackEmailOpen(trackingId, {
                    userAgent,
                    ipAddress,
                    timestamp: new Date(),
                });
            }
            catch (error) {
                // Silently fail - don't break email display
                console.error('Error tracking email open:', error);
            }
            // Return 1x1 transparent pixel
            const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
            res.set({
                'Content-Type': 'image/png',
                'Content-Length': pixel.length.toString(),
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            });
            res.send(pixel);
        }
        /**
         * Track link click and redirect
         * GET /api/email-marketing/track/click/:trackingId?url=...
         */
        async trackClick(trackingId, originalUrl, userAgent, forwardedFor, realIp, res) {
            try {
                // Extract IP address
                const ipAddress = forwardedFor?.split(',')[0] || realIp || 'unknown';
                // Track the click event
                await this.trackingService.trackEmailClick(trackingId, {
                    userAgent,
                    ipAddress,
                    originalUrl,
                    timestamp: new Date(),
                });
            }
            catch (error) {
                // Silently fail - still redirect user
                console.error('Error tracking email click:', error);
            }
            // Redirect to original URL
            if (originalUrl) {
                res.redirect(302, decodeURIComponent(originalUrl));
            }
            else {
                res.status(404).send('URL not found');
            }
        }
        /**
         * Generate tracking URLs for email content
         * POST /api/email-marketing/track/generate
         */
        async generateTrackingUrls(campaignId, recipientEmail) {
            const trackingData = await this.trackingService.generateTrackingData(campaignId, recipientEmail);
            return {
                trackingId: trackingData.trackingId,
                pixelUrl: trackingData.pixelUrl,
                linkWrapper: trackingData.linkWrapper,
            };
        }
        /**
         * Get tracking statistics for a campaign
         * GET /api/email-marketing/track/stats/:campaignId
         */
        async getTrackingStats(campaignId) {
            return this.trackingService.getTrackingStats(campaignId);
        }
    };
    return TrackingController = _classThis;
})();
exports.TrackingController = TrackingController;
//# sourceMappingURL=tracking.controller.js.map