"use strict";
/**
 * React Query Provider
 * Provides TanStack Query client to the app
 */
'use client';
/**
 * React Query Provider
 * Provides TanStack Query client to the app
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactQueryProvider = ReactQueryProvider;
const react_query_1 = require("@tanstack/react-query");
const react_query_devtools_1 = require("@tanstack/react-query-devtools");
const react_1 = require("react");
function ReactQueryProvider({ children }) {
    const [queryClient] = (0, react_1.useState)(() => new react_query_1.QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000, // 1 minute
                retry: 1,
                refetchOnWindowFocus: false,
            },
        },
    }));
    return (<react_query_1.QueryClientProvider client={queryClient}>
      {children}
      <react_query_devtools_1.ReactQueryDevtools initialIsOpen={false}/>
    </react_query_1.QueryClientProvider>);
}
//# sourceMappingURL=react-query-provider.js.map