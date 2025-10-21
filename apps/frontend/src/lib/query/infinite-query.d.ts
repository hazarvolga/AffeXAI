import { UseInfiniteQueryOptions, QueryKey } from '@tanstack/react-query';
import { ApiResponse, ListResponse } from '@affexai/shared-types';
/**
 * Infinite Query Options
 */
interface UseInfiniteApiQueryOptions<TData, TError = Error> extends Omit<UseInfiniteQueryOptions<ListResponse<TData>, TError>, 'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'> {
    /** Show loading overlay */
    showLoading?: boolean;
    /** Loading message */
    loadingMessage?: string;
    /** Show error toast */
    showError?: boolean;
    /** Error toast title */
    errorTitle?: string;
    /** Component name */
    component?: string;
}
/**
 * Infinite Query Hook
 *
 * Hook for paginated data with infinite scroll support.
 * Automatically handles pagination, loading, and errors.
 *
 * @example
 * ```tsx
 * import { useInfiniteApiQuery } from '@/lib/query';
 * import { queryKeys } from '@/lib/query/query-client';
 * import { productsService } from '@/lib/api';
 *
 * function ProductList() {
 *   const {
 *     data,
 *     fetchNextPage,
 *     hasNextPage,
 *     isFetchingNextPage,
 *   } = useInfiniteApiQuery({
 *     queryKey: queryKeys.products.list(),
 *     queryFn: ({ pageParam }) =>
 *       productsService.getList({ page: pageParam, limit: 20 }),
 *     showLoading: true,
 *     component: 'ProductList',
 *   });
 *
 *   const products = data?.pages.flatMap(page => page.data) ?? [];
 *
 *   return (
 *     <div>
 *       {products.map(product => (
 *         <ProductCard key={product.id} product={product} />
 *       ))}
 *
 *       {hasNextPage && (
 *         <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
 *           {isFetchingNextPage ? 'Yükleniyor...' : 'Daha Fazla'}
 *         </button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export declare function useInfiniteApiQuery<TData = unknown, TError = Error>(queryKey: QueryKey, queryFn: (context: {
    pageParam: number;
}) => Promise<ApiResponse<ListResponse<TData>> | ListResponse<TData>>, options?: UseInfiniteApiQueryOptions<TData, TError>): import("@tanstack/react-query").DefinedUseInfiniteQueryResult<import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>, TError>;
/**
 * Hook for flattened infinite query data
 *
 * Returns flattened array of all items from all pages.
 *
 * @example
 * ```tsx
 * import { useFlatInfiniteQuery } from '@/lib/query';
 *
 * function ProductList() {
 *   const { items, hasNextPage, fetchNextPage } = useFlatInfiniteQuery({
 *     queryKey: queryKeys.products.list(),
 *     queryFn: ({ pageParam }) => productsService.getList({ page: pageParam }),
 *   });
 *
 *   return (
 *     <div>
 *       {items.map(product => <ProductCard key={product.id} product={product} />)}
 *     </div>
 *   );
 * }
 * ```
 */
export declare function useFlatInfiniteQuery<TData = unknown, TError = Error>(queryKey: QueryKey, queryFn: (context: {
    pageParam: number;
}) => Promise<ApiResponse<ListResponse<TData>> | ListResponse<TData>>, options?: UseInfiniteApiQueryOptions<TData, TError>): {
    items: any[];
    totalCount: any;
    data: import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>;
    error: TError;
    isError: true;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: true;
    isSuccess: false;
    isPlaceholderData: false;
    status: "error";
    fetchNextPage: (options?: import("@tanstack/react-query").FetchNextPageOptions) => Promise<import("@tanstack/react-query").InfiniteQueryObserverResult<import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>, TError>>;
    fetchPreviousPage: (options?: import("@tanstack/react-query").FetchPreviousPageOptions) => Promise<import("@tanstack/react-query").InfiniteQueryObserverResult<import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>, TError>>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    isFetchNextPageError: boolean;
    isFetchingNextPage: boolean;
    isFetchPreviousPageError: boolean;
    isFetchingPreviousPage: boolean;
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: TError | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>, TError>>;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
    promise: Promise<import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>>;
} | {
    items: any[];
    totalCount: any;
    data: import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>;
    error: null;
    isError: false;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isFetchNextPageError: false;
    isFetchPreviousPageError: false;
    isSuccess: true;
    isPlaceholderData: false;
    status: "success";
    fetchNextPage: (options?: import("@tanstack/react-query").FetchNextPageOptions) => Promise<import("@tanstack/react-query").InfiniteQueryObserverResult<import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>, TError>>;
    fetchPreviousPage: (options?: import("@tanstack/react-query").FetchPreviousPageOptions) => Promise<import("@tanstack/react-query").InfiniteQueryObserverResult<import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>, TError>>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    isFetchingNextPage: boolean;
    isFetchingPreviousPage: boolean;
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: TError | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>, TError>>;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
    promise: Promise<import("@tanstack/react-query").InfiniteData<TQueryFnData, unknown>>;
};
export {};
//# sourceMappingURL=infinite-query.d.ts.map