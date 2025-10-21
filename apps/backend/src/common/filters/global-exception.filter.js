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
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
/**
 * Global Exception Filter
 *
 * Catches all exceptions and formats them into standardized ApiResponse format.
 * Ensures consistent error response structure across all API endpoints.
 *
 * Error Response Format:
 * ```json
 * {
 *   "success": false,
 *   "error": {
 *     "code": "EVENT_NOT_FOUND",
 *     "message": "Event with ID xyz not found",
 *     "statusCode": 404,
 *     "details": { "eventId": "xyz" }
 *   },
 *   "meta": {
 *     "timestamp": "2025-10-09T10:30:00Z"
 *   }
 * }
 * ```
 *
 * @example
 * // Apply globally in main.ts
 * app.useGlobalFilters(new GlobalExceptionFilter());
 */
let GlobalExceptionFilter = (() => {
    let _classDecorators = [(0, common_1.Catch)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GlobalExceptionFilter = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GlobalExceptionFilter = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = new common_1.Logger(GlobalExceptionFilter.name);
        catch(exception, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const request = ctx.getRequest();
            let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            let error = {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An unexpected error occurred',
                statusCode: status,
            };
            // Handle HttpException (NestJS exceptions)
            if (exception instanceof common_1.HttpException) {
                status = exception.getStatus();
                const exceptionResponse = exception.getResponse();
                error = {
                    code: this.getErrorCode(exception),
                    message: typeof exceptionResponse === 'string'
                        ? exceptionResponse
                        : exceptionResponse.message || exception.message,
                    statusCode: status,
                    details: typeof exceptionResponse === 'object' ? exceptionResponse : undefined,
                };
            }
            // Handle other errors (TypeErrors, etc.)
            else if (exception instanceof Error) {
                error = {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: process.env.NODE_ENV === 'development'
                        ? exception.message
                        : 'An unexpected error occurred',
                    statusCode: status,
                    details: process.env.NODE_ENV === 'development'
                        ? { stack: exception.stack }
                        : undefined,
                };
            }
            // Log error for debugging
            this.logger.error(`${request.method} ${request.url} - ${status} - ${error.message}`, exception instanceof Error ? exception.stack : undefined);
            // Send standardized error response
            const apiResponse = {
                success: false,
                error,
                meta: {
                    timestamp: new Date().toISOString(),
                },
            };
            response.status(status).json(apiResponse);
        }
        /**
         * Extract error code from exception
         * Converts exception class name to uppercase error code
         *
         * Examples:
         * - NotFoundException -> NOT_FOUND
         * - BadRequestException -> BAD_REQUEST
         * - UnauthorizedException -> UNAUTHORIZED
         */
        getErrorCode(exception) {
            const name = exception.constructor.name;
            // Remove "Exception" suffix and convert to snake_case uppercase
            return name
                .replace('Exception', '')
                .replace(/([A-Z])/g, '_$1')
                .toUpperCase()
                .substring(1);
        }
    };
    return GlobalExceptionFilter = _classThis;
})();
exports.GlobalExceptionFilter = GlobalExceptionFilter;
//# sourceMappingURL=global-exception.filter.js.map