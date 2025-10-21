"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefetchPatterns = void 0;
exports.createSSRQueryClient = createSSRQueryClient;
exports.prefetchPageData = prefetchPageData;
exports.prefetchOnHover = prefetchOnHover;
exports.prefetchNextPage = prefetchNextPage;
exports.warmupCache = warmupCache;
const react_query_1 = require("@tanstack/react-query");
const query_client_1 = require("./query-client");
/**
 * Prefetch Utilities for SSR/SSG
 *
 * Helper functions to prefetch data during server-side rendering
 * or static site generation for optimal performance.
 */
/**
 * Create a new query client for SSR
 * Each request should have its own query client to avoid data leaking
 * between requests
 */
function createSSRQueryClient() {
    return new react_query_1.QueryClient({
        defaultOptions: {
            queries: {
                // Don't refetch on mount during SSR
                refetchOnMount: false,
                // Don't refetch on window focus during SSR
                refetchOnWindowFocus: false,
                // Longer stale time for SSR (data is already fresh from server)
                staleTime: 60 * 1000, // 1 minute
            },
        },
    });
}
/**
 * Prefetch and dehydrate critical page data
 * Use in getServerSideProps or similar SSR functions
 *
 * @example
 * ```ts
 * // In a Next.js page
 * export async function getServerSideProps() {
 *   const dehydratedState = await prefetchPageData(async (client) => {
 *     await client.prefetchQuery({
 *       queryKey: queryKeys.users.list(),
 *       queryFn: () => usersService.getAll(),
 *     });
 *   });
 *
 *   return { props: { dehydratedState } };
 * }
 * ```
 */
async function prefetchPageData(prefetchFn) {
    const ssrClient = createSSRQueryClient();
    await prefetchFn(ssrClient);
    return (0, react_query_1.dehydrate)(ssrClient);
}
/**
 * Common prefetch patterns for different page types
 */
exports.prefetchPatterns = {
    /**
     * Prefetch dashboard data
     * Critical data that should be immediately available
     */
    dashboard: async (client) => {
        await Promise.all([
            // Prefetch with short stale time for real-time data
            client.prefetchQuery({
                queryKey: query_client_1.queryKeys.auth.session(),
                queryFn: async () => {
                    // Session data - implement when auth is ready
                    return null;
                },
                staleTime: 30 * 1000, // 30 seconds for session
            }),
        ]);
    },
    /**
     * Prefetch user profile page
     */
    userProfile: async (client, userId) => {
        await client.prefetchQuery({
            queryKey: query_client_1.queryKeys.users.detail(userId),
            queryFn: async () => {
                const { usersService } = await Promise.resolve().then(() => __importStar(require('@/lib/api/usersService')));
                return usersService.getById(String(userId));
            },
            staleTime: 5 * 60 * 1000, // 5 minutes
        });
    },
    /**
     * Prefetch CMS page with components
     */
    cmsPage: async (client, pageId) => {
        await Promise.all([
            client.prefetchQuery({
                queryKey: query_client_1.queryKeys.cms.pages.detail(pageId),
                queryFn: async () => {
                    const { cmsService } = await Promise.resolve().then(() => __importStar(require('@/lib/cms/cms-service')));
                    return cmsService.getPage(String(pageId));
                },
                staleTime: 10 * 60 * 1000, // 10 minutes for CMS content
            }),
            client.prefetchQuery({
                queryKey: query_client_1.queryKeys.cms.components.list({ pageId }),
                queryFn: async () => {
                    const { cmsService } = await Promise.resolve().then(() => __importStar(require('@/lib/cms/cms-service')));
                    return cmsService.getComponents(String(pageId));
                },
                staleTime: 10 * 60 * 1000,
            }),
        ]);
    },
    /**
     * Prefetch media library
     */
    mediaLibrary: async (client) => {
        await client.prefetchQuery({
            queryKey: query_client_1.queryKeys.media.list(),
            queryFn: async () => {
                const { mediaService } = await Promise.resolve().then(() => __importStar(require('@/lib/api/mediaService')));
                return mediaService.getAll();
            },
            staleTime: 5 * 60 * 1000, // 5 minutes
        });
    },
};
/**
 * Prefetch data on hover/focus for instant navigation
 * Use with Link component or navigation handlers
 *
 * @example
 * ```tsx
 * <Link
 *   href="/users/123"
 *   onMouseEnter={() => prefetchOnHover(
 *     queryKeys.users.detail(123),
 *     () => usersService.getById(123)
 *   )}
 * >
 *   View User
 * </Link>
 * ```
 */
async function prefetchOnHover(queryKey, queryFn) {
    // Only prefetch if not already in cache
    const existing = query_client_1.queryClient.getQueryData(queryKey);
    if (!existing) {
        await query_client_1.queryClient.prefetchQuery({
            queryKey,
            queryFn,
            staleTime: 30 * 1000, // 30 seconds for hover prefetch
        });
    }
}
/**
 * Prefetch next page in pagination
 * Improves perceived performance when navigating paginated data
 *
 * @example
 * ```ts
 * // When on page 1, prefetch page 2
 * prefetchNextPage(
 *   queryKeys.users.list({ page: 2 }),
 *   () => usersService.getAll({ page: 2 })
 * );
 * ```
 */
async function prefetchNextPage(queryKey, queryFn) {
    await query_client_1.queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: 2 * 60 * 1000, // 2 minutes for pagination
    });
}
/**
 * Warmup cache with critical data
 * Call this when app initializes to pre-populate cache
 *
 * @example
 * ```ts
 * // In app initialization or _app.tsx
 * useEffect(() => {
 *   warmupCache();
 * }, []);
 * ```
 */
async function warmupCache() {
    try {
        await Promise.all([
            // Prefetch session if authenticated - implement when auth is ready
            query_client_1.queryClient.prefetchQuery({
                queryKey: query_client_1.queryKeys.auth.session(),
                queryFn: async () => {
                    return null;
                },
                staleTime: 60 * 1000,
            }),
        ]);
    }
    catch (error) {
        // Silently fail - this is just optimization
        console.warn('Cache warmup failed:', error);
    }
}
//# sourceMappingURL=prefetch-utils.js.map