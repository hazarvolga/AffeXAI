"use strict";
/**
 * Query Module
 *
 * TanStack Query (React Query) integration with enhanced hooks,
 * cache management, and optimistic updates.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutationState = exports.useIsMutating = exports.useIsFetching = exports.useQueryClient = exports.useFlatInfiniteQuery = exports.useInfiniteApiQuery = exports.useOptimisticUpdate = exports.useApiMutation = exports.useApiQuery = exports.warmupCache = exports.prefetchNextPage = exports.prefetchOnHover = exports.prefetchPatterns = exports.prefetchPageData = exports.createSSRQueryClient = exports.QueryProvider = exports.cacheUtils = exports.queryKeys = exports.queryClient = void 0;
// Query Client & Configuration
var query_client_1 = require("./query-client");
Object.defineProperty(exports, "queryClient", { enumerable: true, get: function () { return query_client_1.queryClient; } });
Object.defineProperty(exports, "queryKeys", { enumerable: true, get: function () { return query_client_1.queryKeys; } });
Object.defineProperty(exports, "cacheUtils", { enumerable: true, get: function () { return query_client_1.cacheUtils; } });
// Provider
var QueryProvider_1 = require("./QueryProvider");
Object.defineProperty(exports, "QueryProvider", { enumerable: true, get: function () { return QueryProvider_1.QueryProvider; } });
// Prefetch & SSR Utilities
var prefetch_utils_1 = require("./prefetch-utils");
Object.defineProperty(exports, "createSSRQueryClient", { enumerable: true, get: function () { return prefetch_utils_1.createSSRQueryClient; } });
Object.defineProperty(exports, "prefetchPageData", { enumerable: true, get: function () { return prefetch_utils_1.prefetchPageData; } });
Object.defineProperty(exports, "prefetchPatterns", { enumerable: true, get: function () { return prefetch_utils_1.prefetchPatterns; } });
Object.defineProperty(exports, "prefetchOnHover", { enumerable: true, get: function () { return prefetch_utils_1.prefetchOnHover; } });
Object.defineProperty(exports, "prefetchNextPage", { enumerable: true, get: function () { return prefetch_utils_1.prefetchNextPage; } });
Object.defineProperty(exports, "warmupCache", { enumerable: true, get: function () { return prefetch_utils_1.warmupCache; } });
// Hooks
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "useApiQuery", { enumerable: true, get: function () { return hooks_1.useApiQuery; } });
Object.defineProperty(exports, "useApiMutation", { enumerable: true, get: function () { return hooks_1.useApiMutation; } });
Object.defineProperty(exports, "useOptimisticUpdate", { enumerable: true, get: function () { return hooks_1.useOptimisticUpdate; } });
// Infinite Query
var infinite_query_1 = require("./infinite-query");
Object.defineProperty(exports, "useInfiniteApiQuery", { enumerable: true, get: function () { return infinite_query_1.useInfiniteApiQuery; } });
Object.defineProperty(exports, "useFlatInfiniteQuery", { enumerable: true, get: function () { return infinite_query_1.useFlatInfiniteQuery; } });
// Re-export useful TanStack Query utilities
var react_query_1 = require("@tanstack/react-query");
Object.defineProperty(exports, "useQueryClient", { enumerable: true, get: function () { return react_query_1.useQueryClient; } });
Object.defineProperty(exports, "useIsFetching", { enumerable: true, get: function () { return react_query_1.useIsFetching; } });
Object.defineProperty(exports, "useIsMutating", { enumerable: true, get: function () { return react_query_1.useIsMutating; } });
Object.defineProperty(exports, "useMutationState", { enumerable: true, get: function () { return react_query_1.useMutationState; } });
//# sourceMappingURL=index.js.map