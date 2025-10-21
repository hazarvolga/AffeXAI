"use strict";
/**
 * Hooks Module
 *
 * Barrel export for all custom React hooks.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncLoading = exports.useLoading = exports.useNetworkErrorHandler = exports.useFormErrorHandler = exports.useApiErrorHandler = exports.useErrorHandler = exports.useMutation = exports.useApiCall = void 0;
// API Hooks
var useApiCall_1 = require("./useApiCall");
Object.defineProperty(exports, "useApiCall", { enumerable: true, get: function () { return useApiCall_1.useApiCall; } });
Object.defineProperty(exports, "useMutation", { enumerable: true, get: function () { return useApiCall_1.useMutation; } });
// Error Handling Hooks
var useErrorHandler_1 = require("./useErrorHandler");
Object.defineProperty(exports, "useErrorHandler", { enumerable: true, get: function () { return useErrorHandler_1.useErrorHandler; } });
Object.defineProperty(exports, "useApiErrorHandler", { enumerable: true, get: function () { return useErrorHandler_1.useApiErrorHandler; } });
Object.defineProperty(exports, "useFormErrorHandler", { enumerable: true, get: function () { return useErrorHandler_1.useFormErrorHandler; } });
Object.defineProperty(exports, "useNetworkErrorHandler", { enumerable: true, get: function () { return useErrorHandler_1.useNetworkErrorHandler; } });
// Loading Hooks
var useLoading_1 = require("./useLoading");
Object.defineProperty(exports, "useLoading", { enumerable: true, get: function () { return useLoading_1.useLoading; } });
Object.defineProperty(exports, "useAsyncLoading", { enumerable: true, get: function () { return useLoading_1.useAsyncLoading; } });
//# sourceMappingURL=index.js.map