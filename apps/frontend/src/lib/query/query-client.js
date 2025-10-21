"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheUtils = exports.queryKeys = exports.queryClient = void 0;
const react_query_1 = require("@tanstack/react-query");
const errors_1 = require("@/lib/errors");
const http_client_1 = require("@/lib/api/http-client");
/**
 * Default Query Options
 *
 * Configures default behavior for all queries and mutations
 */
const defaultOptions = {
    queries: {
        // Stale time: How long data is considered fresh (5 minutes)
        staleTime: 5 * 60 * 1000,
        // Cache time: How long unused data stays in cache (10 minutes)
        gcTime: 10 * 60 * 1000,
        // Retry failed requests 3 times with exponential backoff
        retry: (failureCount, error) => {
            // Don't retry on 4xx errors (client errors)
            if (error instanceof http_client_1.ApiError) {
                const status = error.statusCode;
                if (status >= 400 && status < 500) {
                    return false;
                }
            }
            return failureCount < 3;
        },
        // Retry delay with exponential backoff
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Refetch on window focus (only for critical data, can be overridden per query)
        refetchOnWindowFocus: 'always',
        // Refetch on reconnect
        refetchOnReconnect: 'always',
        // Smart refetch on mount - only if stale
        refetchOnMount: 'always',
        // Enable stale-while-revalidate pattern
        // Data is returned from cache immediately, then refetched in background
        refetchInterval: false,
        // Network mode - fail fast on offline
        networkMode: 'online',
    },
    mutations: {
        // Retry mutations once
        retry: 1,
        // Global error handler for mutations
        onError: (error) => {
            if (error instanceof Error) {
                errors_1.errorLogger.log(error, 'HIGH', {
                    context: 'Mutation Error',
                    type: 'mutation',
                });
            }
        },
    },
};
/**
 * Create Query Client
 *
 * Creates a configured TanStack Query client instance
 */
exports.queryClient = new react_query_1.QueryClient({
    defaultOptions,
});
/**
 * Query Keys Factory
 *
 * Centralized query key management to ensure consistency
 * and enable easy cache invalidation.
 *
 * @example
 * ```ts
 * // Get all users
 * const key = queryKeys.users.all;
 *
 * // Get user by ID
 * const key = queryKeys.users.detail(123);
 *
 * // Get users list with filters
 * const key = queryKeys.users.list({ role: 'admin' });
 * ```
 */
exports.queryKeys = {
    // Authentication
    auth: {
        all: ['auth'],
        user: () => [...exports.queryKeys.auth.all, 'user'],
        session: () => [...exports.queryKeys.auth.all, 'session'],
    },
    // Users
    users: {
        all: ['users'],
        lists: () => [...exports.queryKeys.users.all, 'list'],
        list: (filters) => [...exports.queryKeys.users.lists(), filters],
        details: () => [...exports.queryKeys.users.all, 'detail'],
        detail: (id) => [...exports.queryKeys.users.details(), id],
    },
    // Products
    products: {
        all: ['products'],
        lists: () => [...exports.queryKeys.products.all, 'list'],
        list: (filters) => [...exports.queryKeys.products.lists(), filters],
        details: () => [...exports.queryKeys.products.all, 'detail'],
        detail: (id) => [...exports.queryKeys.products.details(), id],
        categories: () => [...exports.queryKeys.products.all, 'categories'],
    },
    // Orders
    orders: {
        all: ['orders'],
        lists: () => [...exports.queryKeys.orders.all, 'list'],
        list: (filters) => [...exports.queryKeys.orders.lists(), filters],
        details: () => [...exports.queryKeys.orders.all, 'detail'],
        detail: (id) => [...exports.queryKeys.orders.details(), id],
    },
    // CMS
    cms: {
        all: ['cms'],
        pages: {
            all: ['cms', 'pages'],
            lists: () => [...exports.queryKeys.cms.pages.all, 'list'],
            list: (filters) => [...exports.queryKeys.cms.pages.lists(), filters],
            details: () => [...exports.queryKeys.cms.pages.all, 'detail'],
            detail: (id) => [...exports.queryKeys.cms.pages.details(), id],
        },
        components: {
            all: ['cms', 'components'],
            lists: () => [...exports.queryKeys.cms.components.all, 'list'],
            list: (filters) => [...exports.queryKeys.cms.components.lists(), filters],
        },
    },
    // Media
    media: {
        all: ['media'],
        lists: () => [...exports.queryKeys.media.all, 'list'],
        list: (filters) => [...exports.queryKeys.media.lists(), filters],
        details: () => [...exports.queryKeys.media.all, 'detail'],
        detail: (id) => [...exports.queryKeys.media.details(), id],
    },
};
/**
 * Cache Utilities
 *
 * Helper functions for common cache operations
 */
exports.cacheUtils = {
    /**
     * Invalidate all queries for a specific resource
     *
     * @example
     * ```ts
     * // Invalidate all user queries
     * await cacheUtils.invalidateResource('users');
     * ```
     */
    invalidateResource: async (resource) => {
        await exports.queryClient.invalidateQueries({
            queryKey: exports.queryKeys[resource].all
        });
    },
    /**
     * Invalidate a specific detail query
     *
     * @example
     * ```ts
     * // Invalidate user detail
     * await cacheUtils.invalidateDetail('users', 123);
     * ```
     */
    invalidateDetail: async (resource, id) => {
        await exports.queryClient.invalidateQueries({
            queryKey: exports.queryKeys[resource].detail(id)
        });
    },
    /**
     * Invalidate all list queries for a resource
     *
     * @example
     * ```ts
     * // Invalidate all user lists
     * await cacheUtils.invalidateLists('users');
     * ```
     */
    invalidateLists: async (resource) => {
        await exports.queryClient.invalidateQueries({
            queryKey: exports.queryKeys[resource].lists()
        });
    },
    /**
     * Set data in cache manually
     *
     * @example
     * ```ts
     * // Set user data in cache
     * cacheUtils.setData(['users', 'detail', 123], userData);
     * ```
     */
    setData: (queryKey, data) => {
        exports.queryClient.setQueryData(queryKey, data);
    },
    /**
     * Get data from cache
     *
     * @example
     * ```ts
     * // Get user data from cache
     * const user = cacheUtils.getData(['users', 'detail', 123]);
     * ```
     */
    getData: (queryKey) => {
        return exports.queryClient.getQueryData(queryKey);
    },
    /**
     * Remove specific query from cache
     *
     * @example
     * ```ts
     * // Remove user detail from cache
     * cacheUtils.removeQuery(['users', 'detail', 123]);
     * ```
     */
    removeQuery: (queryKey) => {
        exports.queryClient.removeQueries({ queryKey });
    },
    /**
     * Clear all cache
     *
     * @example
     * ```ts
     * // Clear everything (e.g., on logout)
     * cacheUtils.clearAll();
     * ```
     */
    clearAll: () => {
        exports.queryClient.clear();
    },
    /**
     * Prefetch data for faster navigation
     *
     * @example
     * ```ts
     * // Prefetch user detail
     * await cacheUtils.prefetch(
     *   queryKeys.users.detail(123),
     *   () => usersService.getById(123)
     * );
     * ```
     */
    prefetch: async (queryKey, queryFn, options) => {
        await exports.queryClient.prefetchQuery({
            queryKey,
            queryFn,
            staleTime: options?.staleTime,
        });
    },
    /**
     * Prefetch multiple queries in parallel
     * Useful for optimizing navigation to pages with multiple data requirements
     *
     * @example
     * ```ts
     * // Prefetch dashboard data
     * await cacheUtils.prefetchMultiple([
     *   { queryKey: queryKeys.users.list(), queryFn: () => usersService.getAll() },
     *   { queryKey: queryKeys.orders.list(), queryFn: () => ordersService.getAll() },
     * ]);
     * ```
     */
    prefetchMultiple: async (queries) => {
        await Promise.all(queries.map(({ queryKey, queryFn, staleTime }) => exports.queryClient.prefetchQuery({ queryKey, queryFn, staleTime })));
    },
    /**
     * Optimistically update cache before mutation completes
     * Implements optimistic updates pattern for better UX
     *
     * @example
     * ```ts
     * // Optimistically update user
     * await cacheUtils.optimisticUpdate(
     *   queryKeys.users.detail(123),
     *   (old) => ({ ...old, name: 'New Name' }),
     *   async () => usersService.update(123, { name: 'New Name' })
     * );
     * ```
     */
    optimisticUpdate: async (queryKey, updater, mutationFn) => {
        // Snapshot the previous value
        const previousData = exports.queryClient.getQueryData(queryKey);
        // Optimistically update to the new value
        exports.queryClient.setQueryData(queryKey, updater);
        try {
            // Perform the mutation
            const result = await mutationFn();
            // Update with the real result
            exports.queryClient.setQueryData(queryKey, result);
            return result;
        }
        catch (error) {
            // Rollback on error
            exports.queryClient.setQueryData(queryKey, previousData);
            throw error;
        }
    },
    /**
     * Set cache time (gcTime) for specific queries
     * Useful for controlling memory usage
     *
     * @example
     * ```ts
     * // Keep user data in cache for 1 hour
     * cacheUtils.setCacheTime(['users', 'detail', 123], 60 * 60 * 1000);
     * ```
     */
    setCacheTime: (queryKey, gcTime) => {
        exports.queryClient.setQueryDefaults(queryKey, { gcTime });
    },
    /**
     * Set stale time for specific queries
     * Controls when data is considered outdated
     *
     * @example
     * ```ts
     * // User data stays fresh for 10 minutes
     * cacheUtils.setStaleTime(['users', 'detail', 123], 10 * 60 * 1000);
     * ```
     */
    setStaleTime: (queryKey, staleTime) => {
        exports.queryClient.setQueryDefaults(queryKey, { staleTime });
    },
};
//# sourceMappingURL=query-client.js.map