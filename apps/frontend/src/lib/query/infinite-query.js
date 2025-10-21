"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInfiniteApiQuery = useInfiniteApiQuery;
exports.useFlatInfiniteQuery = useFlatInfiniteQuery;
const react_query_1 = require("@tanstack/react-query");
const useErrorHandler_1 = require("@/hooks/useErrorHandler");
const useLoading_1 = require("@/hooks/useLoading");
const response_utils_1 = require("@/lib/api/response-utils");
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
function useInfiniteApiQuery(queryKey, queryFn, options = {}) {
    const { showLoading = false, loadingMessage, showError = true, errorTitle = 'Veri Yükleme Hatası', component, ...queryOptions } = options;
    // Error handler
    const handleError = (0, useErrorHandler_1.useErrorHandler)({
        component,
        toastTitle: errorTitle,
    });
    // Loading state
    const loading = (0, useLoading_1.useLoading)({
        id: `infinite-query-${JSON.stringify(queryKey)}`,
        message: loadingMessage,
        source: component,
        autoStopOnUnmount: true,
    });
    // Infinite query
    const query = (0, react_query_1.useInfiniteQuery)({
        queryKey,
        queryFn: async ({ pageParam }) => {
            if (showLoading) {
                loading.start();
            }
            try {
                const response = await queryFn({ pageParam: pageParam });
                // Unwrap if ApiResponse
                if (response && typeof response === 'object' && 'success' in response) {
                    return (0, response_utils_1.unwrapListResponse)(response);
                }
                return response;
            }
            catch (error) {
                if (showError) {
                    handleError(error);
                }
                throw error;
            }
            finally {
                if (showLoading) {
                    loading.stop();
                }
            }
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.pagination;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        getPreviousPageParam: (firstPage) => {
            const { currentPage } = firstPage.pagination;
            return currentPage > 1 ? currentPage - 1 : undefined;
        },
        ...queryOptions,
    });
    return query;
}
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
function useFlatInfiniteQuery(queryKey, queryFn, options = {}) {
    const query = useInfiniteApiQuery(queryKey, queryFn, options);
    // Flatten all pages
    const items = query.data?.pages.flatMap(page => page.data) ?? [];
    // Total count from last page
    const totalCount = query.data?.pages[query.data.pages.length - 1]?.pagination.totalCount ?? 0;
    return {
        ...query,
        items,
        totalCount,
    };
}
//# sourceMappingURL=infinite-query.js.map