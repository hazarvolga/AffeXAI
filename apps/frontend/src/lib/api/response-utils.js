"use strict";
/**
 * API Response Utilities
 *
 * Helper functions for working with standardized API responses.
 * Provides type-safe unwrapping, validation, and error handling.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuccessResponse = isSuccessResponse;
exports.isErrorResponse = isErrorResponse;
exports.unwrapResponse = unwrapResponse;
exports.unwrapResponseOr = unwrapResponseOr;
exports.unwrapListResponse = unwrapListResponse;
exports.createErrorFromResponse = createErrorFromResponse;
exports.getErrorMessage = getErrorMessage;
exports.getErrorCode = getErrorCode;
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
exports.paginatedResponse = paginatedResponse;
exports.calculatePagination = calculatePagination;
exports.hasMorePages = hasMorePages;
exports.getNextPage = getNextPage;
exports.getPrevPage = getPrevPage;
exports.isListResponse = isListResponse;
exports.hasPagination = hasPagination;
// ============================================================================
// Response Validation
// ============================================================================
/**
 * Check if response is successful
 */
function isSuccessResponse(response) {
    return typeof response === 'object' && response !== null && response.success === true && response.data !== undefined;
}
/**
 * Check if response is an error
 */
function isErrorResponse(response) {
    return typeof response === 'object' && response !== null && response.success === false && response.error !== undefined;
}
// ============================================================================
// Response Unwrapping
// ============================================================================
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
function unwrapResponse(response) {
    // Handle null, undefined, or empty responses (204 No Content)
    if (response === null || response === undefined || response === '') {
        return undefined;
    }
    // Handle non-object responses
    if (typeof response !== 'object') {
        return undefined;
    }
    // Handle arrays directly (some endpoints return arrays without wrapping)
    if (Array.isArray(response)) {
        console.log('[Response Utils] Received array response, returning as-is');
        return response;
    }
    if (isSuccessResponse(response)) {
        return response.data;
    }
    if (isErrorResponse(response)) {
        throw createErrorFromResponse(response.error);
    }
    // Handle void responses (e.g., DELETE with 204 No Content)
    // If response.success is true but data is undefined, it's a valid void response
    if (response.success === true && response.data === undefined) {
        return undefined;
    }
    // Handle plain objects with success flag (some backends return { success: true })
    if ('success' in response) {
        const successResponse = response;
        if (successResponse.success === true) {
            return (successResponse.data !== undefined ? successResponse.data : undefined);
        }
    }
    // Handle plain objects that might be the actual data (not wrapped in ApiResponse)
    // This happens when backend doesn't use consistent response wrapping
    if (typeof response === 'object' && !('success' in response) && !('error' in response)) {
        console.log('[Response Utils] Received plain object response, returning as-is');
        return response;
    }
    // Log the problematic response for debugging
    console.error('Invalid API response format:', response);
    console.error('Response type:', typeof response);
    console.error('Response keys:', Object.keys(response));
    throw new Error('Invalid API response format');
}
/**
 * Unwrap API response data with default value
 * Returns default if response is unsuccessful
 *
 * @example
 * ```ts
 * const user = unwrapResponseOr(response, null); // User | null
 * ```
 */
function unwrapResponseOr(response, defaultValue) {
    if (isSuccessResponse(response)) {
        return response.data;
    }
    return defaultValue;
}
/**
 * Unwrap list response
 *
 * @example
 * ```ts
 * const response = await api.get<ApiResponse<ListResponse<User>>>('/users');
 * const { items, meta } = unwrapListResponse(response);
 * ```
 */
function unwrapListResponse(response) {
    const data = unwrapResponse(response);
    return {
        items: data.items,
        meta: data.meta,
    };
}
// ============================================================================
// Error Handling
// ============================================================================
/**
 * Create Error instance from ApiError
 */
function createErrorFromResponse(apiError) {
    const error = new Error(apiError.message);
    error.name = apiError.code;
    // Attach additional properties
    if (apiError.statusCode) {
        error.statusCode = apiError.statusCode;
    }
    if (apiError.details) {
        error.details = apiError.details;
    }
    return error;
}
/**
 * Extract error message from response
 */
function getErrorMessage(response, defaultMessage = 'An error occurred') {
    if (isErrorResponse(response)) {
        return response.error.message || defaultMessage;
    }
    return defaultMessage;
}
/**
 * Extract error code from response
 */
function getErrorCode(response) {
    if (isErrorResponse(response)) {
        return response.error.code;
    }
    return null;
}
// ============================================================================
// Response Builders (for backend)
// ============================================================================
/**
 * Create successful response
 *
 * @example
 * ```ts
 * return successResponse(user);
 * return successResponse(users, { pagination: meta });
 * ```
 */
function successResponse(data, meta) {
    return {
        success: true,
        data,
        meta: {
            timestamp: new Date().toISOString(),
            ...meta,
        },
    };
}
/**
 * Create error response
 *
 * @example
 * ```ts
 * return errorResponse('USER_NOT_FOUND', 'User not found', 404);
 * ```
 */
function errorResponse(code, message, statusCode, details) {
    return {
        success: false,
        error: {
            code,
            message,
            statusCode,
            details,
        },
        meta: {
            timestamp: new Date().toISOString(),
        },
    };
}
/**
 * Create paginated list response
 *
 * @example
 * ```ts
 * return paginatedResponse(users, { page: 1, limit: 10, total: 100, totalPages: 10 });
 * ```
 */
function paginatedResponse(items, pagination) {
    return successResponse({ items, meta: pagination }, {
        pagination,
        timestamp: new Date().toISOString()
    });
}
// ============================================================================
// Pagination Helpers
// ============================================================================
/**
 * Calculate pagination metadata
 */
function calculatePagination(page, limit, total) {
    const totalPages = Math.ceil(total / limit);
    return {
        page,
        limit,
        total,
        totalPages,
    };
}
/**
 * Check if there are more pages
 */
function hasMorePages(meta) {
    return meta.page < meta.totalPages;
}
/**
 * Get next page number
 */
function getNextPage(meta) {
    return hasMorePages(meta) ? meta.page + 1 : null;
}
/**
 * Get previous page number
 */
function getPrevPage(meta) {
    return meta.page > 1 ? meta.page - 1 : null;
}
// ============================================================================
// Type Guards
// ============================================================================
/**
 * Check if data is a list response
 */
function isListResponse(data) {
    return (data &&
        typeof data === 'object' &&
        Array.isArray(data.items) &&
        data.meta &&
        typeof data.meta.page === 'number' &&
        typeof data.meta.limit === 'number' &&
        typeof data.meta.total === 'number' &&
        typeof data.meta.totalPages === 'number');
}
/**
 * Check if response has pagination
 */
function hasPagination(response) {
    return !!(response.meta?.pagination);
}
//# sourceMappingURL=response-utils.js.map