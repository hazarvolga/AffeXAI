import { NextResponse } from 'next/server';
/**
 * Compression utilities for API responses
 *
 * These utilities help optimize API response sizes by:
 * - Removing unnecessary fields
 * - Compressing responses
 * - Adding appropriate headers
 */
/**
 * Options for response compression
 */
export interface CompressionOptions {
    /** Enable compression (default: true in production) */
    enabled?: boolean;
    /** Minimum size in bytes to compress (default: 1024) */
    threshold?: number;
    /** Fields to remove from response */
    excludeFields?: string[];
}
/**
 * Compress and optimize API response
 *
 * @param data - Response data to compress
 * @param options - Compression options
 * @returns NextResponse with optimized data and headers
 *
 * @example
 * ```typescript
 * export async function GET() {
 *   const data = await fetchLargeDataset();
 *   return compressResponse(data, {
 *     excludeFields: ['__v', 'password'],
 *   });
 * }
 * ```
 */
export declare function compressResponse<T>(data: T, options?: CompressionOptions): NextResponse;
/**
 * Optimize response payload by removing null/undefined values
 *
 * @param data - Data to optimize
 * @returns Optimized data
 *
 * @example
 * ```typescript
 * const data = { name: 'John', age: null, email: undefined };
 * const optimized = optimizePayload(data);
 * // Result: { name: 'John' }
 * ```
 */
export declare function optimizePayload<T>(data: T): Partial<T>;
/**
 * Paginate and compress large datasets
 *
 * @param data - Full dataset
 * @param page - Current page number (1-indexed)
 * @param pageSize - Items per page
 * @returns Paginated response with metadata
 *
 * @example
 * ```typescript
 * export async function GET(request: Request) {
 *   const { searchParams } = new URL(request.url);
 *   const page = parseInt(searchParams.get('page') || '1');
 *   const pageSize = parseInt(searchParams.get('pageSize') || '20');
 *
 *   const data = await fetchAllItems();
 *   return paginateResponse(data, page, pageSize);
 * }
 * ```
 */
export declare function paginateResponse<T>(data: T[], page?: number, pageSize?: number): NextResponse;
/**
 * Minimize JSON response by using shorter field names
 *
 * @param data - Data to minimize
 * @param mapping - Field name mapping (longName -> shortName)
 * @returns Minimized data
 *
 * @example
 * ```typescript
 * const data = { firstName: 'John', lastName: 'Doe' };
 * const minimized = minimizeJson(data, {
 *   firstName: 'fn',
 *   lastName: 'ln',
 * });
 * // Result: { fn: 'John', ln: 'Doe' }
 * ```
 */
export declare function minimizeJson<T>(data: T, mapping: Record<string, string>): any;
/**
 * Add ETags for caching
 *
 * @param data - Response data
 * @returns Response with ETag header
 *
 * @example
 * ```typescript
 * export async function GET() {
 *   const data = await fetchData();
 *   return withETag(data);
 * }
 * ```
 */
export declare function withETag<T>(data: T): NextResponse;
/**
 * Create a streaming response for large datasets
 *
 * @param dataGenerator - Async generator that yields data chunks
 * @returns Streaming response
 *
 * @example
 * ```typescript
 * async function* generateLargeDataset() {
 *   for (let i = 0; i < 1000; i++) {
 *     yield { id: i, data: await fetchItem(i) };
 *   }
 * }
 *
 * export async function GET() {
 *   return streamResponse(generateLargeDataset());
 * }
 * ```
 */
export declare function streamResponse<T>(dataGenerator: AsyncGenerator<T>): Promise<Response>;
/**
 * Calculate compression ratio
 *
 * @param original - Original data size in bytes
 * @param compressed - Compressed data size in bytes
 * @returns Compression ratio as percentage
 */
export declare function getCompressionRatio(original: number, compressed: number): number;
/**
 * Format bytes to human-readable string
 *
 * @param bytes - Size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export declare function formatBytes(bytes: number): string;
//# sourceMappingURL=index.d.ts.map