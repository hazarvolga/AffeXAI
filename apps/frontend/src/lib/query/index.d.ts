/**
 * Query Module
 *
 * TanStack Query (React Query) integration with enhanced hooks,
 * cache management, and optimistic updates.
 */
export { queryClient, queryKeys, cacheUtils } from './query-client';
export { QueryProvider } from './QueryProvider';
export { createSSRQueryClient, prefetchPageData, prefetchPatterns, prefetchOnHover, prefetchNextPage, warmupCache, } from './prefetch-utils';
export { useApiQuery, useApiMutation, useOptimisticUpdate } from './hooks';
export type { UseApiQueryOptions, UseApiMutationOptions } from './hooks';
export { useInfiniteApiQuery, useFlatInfiniteQuery } from './infinite-query';
export type { UseInfiniteApiQueryOptions } from './infinite-query';
export { useQueryClient, useIsFetching, useIsMutating, useMutationState, } from '@tanstack/react-query';
//# sourceMappingURL=index.d.ts.map