import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
/**
 * Global Exception Filter
 *
 * Catches all exceptions and formats them into standardized ApiResponse format.
 * Ensures consistent error response structure across all API endpoints.
 *
 * Error Response Format:
 * ```json
 * {
 *   "success": false,
 *   "error": {
 *     "code": "EVENT_NOT_FOUND",
 *     "message": "Event with ID xyz not found",
 *     "statusCode": 404,
 *     "details": { "eventId": "xyz" }
 *   },
 *   "meta": {
 *     "timestamp": "2025-10-09T10:30:00Z"
 *   }
 * }
 * ```
 *
 * @example
 * // Apply globally in main.ts
 * app.useGlobalFilters(new GlobalExceptionFilter());
 */
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: unknown, host: ArgumentsHost): void;
    /**
     * Extract error code from exception
     * Converts exception class name to uppercase error code
     *
     * Examples:
     * - NotFoundException -> NOT_FOUND
     * - BadRequestException -> BAD_REQUEST
     * - UnauthorizedException -> UNAUTHORIZED
     */
    private getErrorCode;
}
//# sourceMappingURL=global-exception.filter.d.ts.map