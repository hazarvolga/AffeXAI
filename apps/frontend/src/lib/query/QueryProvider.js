"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProvider = QueryProvider;
const react_1 = __importDefault(require("react"));
const react_query_1 = require("@tanstack/react-query");
const react_query_devtools_1 = require("@tanstack/react-query-devtools");
const query_client_1 = require("./query-client");
/**
 * Query Provider Component
 *
 * Wraps the application with TanStack Query provider and devtools.
 * Supports SSR/SSG hydration for optimal performance.
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * import { QueryProvider } from '@/lib/query';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <QueryProvider>
 *       {children}
 *     </QueryProvider>
 *   );
 * }
 *
 * // With SSR hydration
 * export default function Page({ dehydratedState }) {
 *   return (
 *     <QueryProvider dehydratedState={dehydratedState}>
 *       {children}
 *     </QueryProvider>
 *   );
 * }
 * ```
 */
function QueryProvider({ children, showDevtools = process.env.NODE_ENV === 'development', dehydratedState, }) {
    return (<react_query_1.QueryClientProvider client={query_client_1.queryClient}>
      <react_query_1.HydrationBoundary state={dehydratedState}>
        {children}
      </react_query_1.HydrationBoundary>
      {showDevtools && (<react_query_devtools_1.ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>)}
    </react_query_1.QueryClientProvider>);
}
//# sourceMappingURL=QueryProvider.js.map