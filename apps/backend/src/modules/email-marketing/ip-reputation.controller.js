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
exports.IpReputationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
/**
 * Controller for IP reputation checking endpoints
 * This provides RESTful API endpoints for checking IP reputation
 */
let IpReputationController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Email Marketing - IP Reputation'), (0, common_1.Controller)('email-marketing/ip-reputation')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _checkIpReputation_decorators;
    var IpReputationController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _checkIpReputation_decorators = [(0, common_1.Get)(':ip'), (0, swagger_1.ApiOperation)({
                    summary: 'Check IP reputation',
                    description: 'Check if an IP address is listed on DNS-based blackhole lists (DNSBLs)'
                }), (0, swagger_1.ApiParam)({
                    name: 'ip',
                    description: 'IPv4 address to check',
                    example: '192.168.1.1'
                }), (0, swagger_1.ApiQuery)({
                    name: 'detailed',
                    required: false,
                    description: 'Include detailed error information',
                    type: Boolean
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'IP reputation check result',
                    type: Object
                }), (0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'Invalid IP address format'
                })];
            __esDecorate(this, null, _checkIpReputation_decorators, { kind: "method", name: "checkIpReputation", static: false, private: false, access: { has: obj => "checkIpReputation" in obj, get: obj => obj.checkIpReputation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IpReputationController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ipReputationService = __runInitializers(this, _instanceExtraInitializers);
        constructor(ipReputationService) {
            this.ipReputationService = ipReputationService;
        }
        /**
         * Check the reputation of an IP address
         * This endpoint allows external services to check if an IP is listed on spam blacklists
         *
         * @param ip The IP address to check
         * @returns IP reputation result
         */
        async checkIpReputation(ip, detailed) {
            // Validate IP format
            if (!this.isValidIpAddress(ip)) {
                throw new common_1.BadRequestException('Invalid IP address format');
            }
            // Perform IP reputation check
            const result = await this.ipReputationService.checkIpReputation(ip);
            // If detailed flag is not set, omit error details for cleaner response
            if (!detailed && result.errors) {
                const { errors, ...resultWithoutErrors } = result;
                return resultWithoutErrors;
            }
            return result;
        }
        /**
         * Validates IP address format (IPv4 only)
         * This is a helper method to validate IP addresses in the controller
         *
         * @param ip The IP address to validate
         * @returns True if valid IPv4 format, false otherwise
         */
        isValidIpAddress(ip) {
            const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (!ipv4Regex.test(ip)) {
                return false;
            }
            const octets = ip.split('.').map(Number);
            return octets.every(octet => octet >= 0 && octet <= 255);
        }
    };
    return IpReputationController = _classThis;
})();
exports.IpReputationController = IpReputationController;
//# sourceMappingURL=ip-reputation.controller.js.map