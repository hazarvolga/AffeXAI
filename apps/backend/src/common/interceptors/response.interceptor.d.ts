import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { ApiResponse } from '@affexai/shared-types';
/**
 * Response Interceptor
 *
 * Wraps all successful responses in a standardized ApiResponse format.
 * This ensures consistent response structure across all API endpoints.
 *
 * Response Format:
 * ```json
 * {
 *   "success": true,
 *   "data": { ... },
 *   "meta": {
 *     "timestamp": "2025-10-09T10:30:00Z"
 *   }
 * }
 * ```
 *
 * @example
 * // Apply globally in main.ts
 * app.useGlobalInterceptors(new ResponseInterceptor());
 *
 * @example
 * // Apply to specific controller
 * @UseInterceptors(ResponseInterceptor)
 * @Controller('events')
 * export class EventsController { }
 */
export declare class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>>;
}
//# sourceMappingURL=response.interceptor.d.ts.map