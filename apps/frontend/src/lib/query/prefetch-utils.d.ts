import { QueryClient, DehydratedState } from '@tanstack/react-query';
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
export declare function createSSRQueryClient(): QueryClient;
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
export declare function prefetchPageData(prefetchFn: (client: QueryClient) => Promise<void>): Promise<DehydratedState>;
/**
 * Common prefetch patterns for different page types
 */
export declare const prefetchPatterns: {
    /**
     * Prefetch dashboard data
     * Critical data that should be immediately available
     */
    dashboard: (client: QueryClient) => Promise<void>;
    /**
     * Prefetch user profile page
     */
    userProfile: (client: QueryClient, userId: string | number) => Promise<void>;
    /**
     * Prefetch CMS page with components
     */
    cmsPage: (client: QueryClient, pageId: string | number) => Promise<void>;
    /**
     * Prefetch media library
     */
    mediaLibrary: (client: QueryClient) => Promise<void>;
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
export declare function prefetchOnHover<TData = unknown>(queryKey: readonly unknown[], queryFn: () => Promise<TData>): Promise<void>;
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
export declare function prefetchNextPage<TData = unknown>(queryKey: readonly unknown[], queryFn: () => Promise<TData>): Promise<void>;
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
export declare function warmupCache(): Promise<void>;
//# sourceMappingURL=prefetch-utils.d.ts.map