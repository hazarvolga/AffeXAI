import { QueryClient } from '@tanstack/react-query';
/**
 * Create Query Client
 *
 * Creates a configured TanStack Query client instance
 */
export declare const queryClient: QueryClient;
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
export declare const queryKeys: {
    readonly auth: {
        readonly all: readonly ["auth"];
        readonly user: () => readonly ["auth", "user"];
        readonly session: () => readonly ["auth", "session"];
    };
    readonly users: {
        readonly all: readonly ["users"];
        readonly lists: () => readonly ["users", "list"];
        readonly list: (filters?: Record<string, any>) => readonly ["users", "list", Record<string, any> | undefined];
        readonly details: () => readonly ["users", "detail"];
        readonly detail: (id: string | number) => readonly ["users", "detail", string | number];
    };
    readonly products: {
        readonly all: readonly ["products"];
        readonly lists: () => readonly ["products", "list"];
        readonly list: (filters?: Record<string, any>) => readonly ["products", "list", Record<string, any> | undefined];
        readonly details: () => readonly ["products", "detail"];
        readonly detail: (id: string | number) => readonly ["products", "detail", string | number];
        readonly categories: () => readonly ["products", "categories"];
    };
    readonly orders: {
        readonly all: readonly ["orders"];
        readonly lists: () => readonly ["orders", "list"];
        readonly list: (filters?: Record<string, any>) => readonly ["orders", "list", Record<string, any> | undefined];
        readonly details: () => readonly ["orders", "detail"];
        readonly detail: (id: string | number) => readonly ["orders", "detail", string | number];
    };
    readonly cms: {
        readonly all: readonly ["cms"];
        readonly pages: {
            readonly all: readonly ["cms", "pages"];
            readonly lists: () => readonly ["cms", "pages", "list"];
            readonly list: (filters?: Record<string, any>) => readonly ["cms", "pages", "list", Record<string, any> | undefined];
            readonly details: () => readonly ["cms", "pages", "detail"];
            readonly detail: (id: string | number) => readonly ["cms", "pages", "detail", string | number];
        };
        readonly components: {
            readonly all: readonly ["cms", "components"];
            readonly lists: () => readonly ["cms", "components", "list"];
            readonly list: (filters?: Record<string, any>) => readonly ["cms", "components", "list", Record<string, any> | undefined];
        };
    };
    readonly media: {
        readonly all: readonly ["media"];
        readonly lists: () => readonly ["media", "list"];
        readonly list: (filters?: Record<string, any>) => readonly ["media", "list", Record<string, any> | undefined];
        readonly details: () => readonly ["media", "detail"];
        readonly detail: (id: string | number) => readonly ["media", "detail", string | number];
    };
};
/**
 * Cache Utilities
 *
 * Helper functions for common cache operations
 */
export declare const cacheUtils: {
    /**
     * Invalidate all queries for a specific resource
     *
     * @example
     * ```ts
     * // Invalidate all user queries
     * await cacheUtils.invalidateResource('users');
     * ```
     */
    invalidateResource: (resource: keyof typeof queryKeys) => Promise<void>;
    /**
     * Invalidate a specific detail query
     *
     * @example
     * ```ts
     * // Invalidate user detail
     * await cacheUtils.invalidateDetail('users', 123);
     * ```
     */
    invalidateDetail: (resource: "users" | "products" | "orders" | "media", id: string | number) => Promise<void>;
    /**
     * Invalidate all list queries for a resource
     *
     * @example
     * ```ts
     * // Invalidate all user lists
     * await cacheUtils.invalidateLists('users');
     * ```
     */
    invalidateLists: (resource: "users" | "products" | "orders" | "media") => Promise<void>;
    /**
     * Set data in cache manually
     *
     * @example
     * ```ts
     * // Set user data in cache
     * cacheUtils.setData(['users', 'detail', 123], userData);
     * ```
     */
    setData: <TData = unknown>(queryKey: readonly unknown[], data: TData | ((old: TData | undefined) => TData)) => void;
    /**
     * Get data from cache
     *
     * @example
     * ```ts
     * // Get user data from cache
     * const user = cacheUtils.getData(['users', 'detail', 123]);
     * ```
     */
    getData: <TData = unknown>(queryKey: readonly unknown[]) => TData | undefined;
    /**
     * Remove specific query from cache
     *
     * @example
     * ```ts
     * // Remove user detail from cache
     * cacheUtils.removeQuery(['users', 'detail', 123]);
     * ```
     */
    removeQuery: (queryKey: readonly unknown[]) => void;
    /**
     * Clear all cache
     *
     * @example
     * ```ts
     * // Clear everything (e.g., on logout)
     * cacheUtils.clearAll();
     * ```
     */
    clearAll: () => void;
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
    prefetch: <TData = unknown>(queryKey: readonly unknown[], queryFn: () => Promise<TData>, options?: {
        staleTime?: number;
    }) => Promise<void>;
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
    prefetchMultiple: <TData = unknown>(queries: Array<{
        queryKey: readonly unknown[];
        queryFn: () => Promise<TData>;
        staleTime?: number;
    }>) => Promise<void>;
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
    optimisticUpdate: <TData = unknown>(queryKey: readonly unknown[], updater: (old: TData | undefined) => TData, mutationFn: () => Promise<TData>) => Promise<TData>;
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
    setCacheTime: (queryKey: readonly unknown[], gcTime: number) => void;
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
    setStaleTime: (queryKey: readonly unknown[], staleTime: number) => void;
};
//# sourceMappingURL=query-client.d.ts.map