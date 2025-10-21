import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
/**
 * Middleware for authentication, authorization, and optimizations
 *
 * This middleware runs on every request and:
 * - Validates authentication for protected routes
 * - Checks role-based permissions
 * - Adds optimization headers for performance and security
 */
export declare function middleware(request: NextRequest): NextResponse<unknown>;
/**
 * Middleware configuration
 *
 * Specify which routes should be processed by this middleware
 */
export declare const config: {
    matcher: string[];
};
//# sourceMappingURL=middleware.d.ts.map