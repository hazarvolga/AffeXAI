/**
 * API Response Utilities
 *
 * Helper functions for working with standardized API responses.
 * Provides type-safe unwrapping, validation, and error handling.
 */
import type { ApiResponse, ApiError, PaginationMeta, ListResponse } from '@affexai/shared-types';
/**
 * Check if response is successful
 */
export declare function isSuccessResponse<T>(response: any): response is ApiResponse<T> & {
    data: T;
};
/**
 * Check if response is an error
 */
export declare function isErrorResponse<T>(response: any): response is ApiResponse<T> & {
    error: ApiError;
};
/**
 * Unwrap API response data
 * Throws error if response is unsuccessful
 *
 * @example
 * ```ts
 * const response = await api.get<ApiResponse<User>>('/users/123');
 * const user = unwrapResponse(response); // User
 * ```
 */
export declare function unwrapResponse<T>(response: ApiResponse<T> | null | undefined | any): T;
/**
 * Unwrap API response data with default value
 * Returns default if response is unsuccessful
 *
 * @example
 * ```ts
 * const user = unwrapResponseOr(response, null); // User | null
 * ```
 */
export declare function unwrapResponseOr<T>(response: any, defaultValue: T): T;
/**
 * Unwrap list response
 *
 * @example
 * ```ts
 * const response = await api.get<ApiResponse<ListResponse<User>>>('/users');
 * const { items, meta } = unwrapListResponse(response);
 * ```
 */
export declare function unwrapListResponse<T>(response: any): {
    items: T[];
    meta: PaginationMeta;
};
/**
 * Create Error instance from ApiError
 */
export declare function createErrorFromResponse(apiError: ApiError): Error;
/**
 * Extract error message from response
 */
export declare function getErrorMessage<T>(response: ApiResponse<T>, defaultMessage?: string): string;
/**
 * Extract error code from response
 */
export declare function getErrorCode<T>(response: ApiResponse<T>): string | null;
/**
 * Create successful response
 *
 * @example
 * ```ts
 * return successResponse(user);
 * return successResponse(users, { pagination: meta });
 * ```
 */
export declare function successResponse<T>(data: T, meta?: ApiResponse<T>['meta']): ApiResponse<T>;
/**
 * Create error response
 *
 * @example
 * ```ts
 * return errorResponse('USER_NOT_FOUND', 'User not found', 404);
 * ```
 */
export declare function errorResponse<T = never>(code: string, message: string, statusCode?: number, details?: Record<string, any>): ApiResponse<T>;
/**
 * Create paginated list response
 *
 * @example
 * ```ts
 * return paginatedResponse(users, { page: 1, limit: 10, total: 100, totalPages: 10 });
 * ```
 */
export declare function paginatedResponse<T>(items: T[], pagination: PaginationMeta): ApiResponse<ListResponse<T>>;
/**
 * Calculate pagination metadata
 */
export declare function calculatePagination(page: number, limit: number, total: number): PaginationMeta;
/**
 * Check if there are more pages
 */
export declare function hasMorePages(meta: PaginationMeta): boolean;
/**
 * Get next page number
 */
export declare function getNextPage(meta: PaginationMeta): number | null;
/**
 * Get previous page number
 */
export declare function getPrevPage(meta: PaginationMeta): number | null;
/**
 * Check if data is a list response
 */
export declare function isListResponse<T>(data: any): data is ListResponse<T>;
/**
 * Check if response has pagination
 */
export declare function hasPagination<T>(response: ApiResponse<T>): boolean;
export type { ApiResponse, ApiError, PaginationMeta, ListResponse };
//# sourceMappingURL=response-utils.d.ts.map