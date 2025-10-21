"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApiQuery = useApiQuery;
exports.useApiMutation = useApiMutation;
exports.useOptimisticUpdate = useOptimisticUpdate;
const react_query_1 = require("@tanstack/react-query");
const useErrorHandler_1 = require("@/hooks/useErrorHandler");
const useLoading_1 = require("@/hooks/useLoading");
const response_utils_1 = require("@/lib/api/response-utils");
/**
 * Enhanced useQuery Hook
 *
 * Wraps TanStack Query's useQuery with automatic error handling,
 * loading state management, and response unwrapping.
 *
 * @example
 * ```tsx
 * import { useApiQuery } from '@/lib/query';
 * import { queryKeys } from '@/lib/query/query-client';
 * import { usersService } from '@/lib/api';
 *
 * function UserList() {
 *   const { data, isLoading, error, refetch } = useApiQuery({
 *     queryKey: queryKeys.users.list(),
 *     queryFn: () => usersService.getAll(),
 *     showLoading: true,
 *     loadingMessage: 'Kullanıcılar yükleniyor...',
 *     component: 'UserList',
 *   });
 *
 *   return <div>{data?.map(user => ...)}</div>;
 * }
 * ```
 */
function useApiQuery(queryKey, queryFn, options = {}) {
    const { showLoading = false, loadingMessage, showError = true, errorTitle = 'Veri Yükleme Hatası', component, ...queryOptions } = options;
    // Error handler
    const handleError = (0, useErrorHandler_1.useErrorHandler)({
        component,
        toastTitle: errorTitle,
    });
    // Loading state
    const loading = (0, useLoading_1.useLoading)({
        id: `query-${JSON.stringify(queryKey)}`,
        message: loadingMessage,
        source: component,
        autoStopOnUnmount: true,
    });
    // Query
    const query = (0, react_query_1.useQuery)({
        queryKey,
        queryFn: async () => {
            if (showLoading) {
                loading.start();
            }
            try {
                const response = await queryFn();
                // Unwrap if ApiResponse
                if (response && typeof response === 'object' && 'success' in response) {
                    return (0, response_utils_1.unwrapResponse)(response);
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
        ...queryOptions,
    });
    return query;
}
/**
 * Enhanced useMutation Hook
 *
 * Wraps TanStack Query's useMutation with automatic error handling,
 * loading state, success notifications, and cache invalidation.
 *
 * @example
 * ```tsx
 * import { useApiMutation } from '@/lib/query';
 * import { queryKeys } from '@/lib/query/query-client';
 * import { usersService } from '@/lib/api';
 *
 * function CreateUserForm() {
 *   const { mutate, isPending } = useApiMutation({
 *     mutationFn: (data) => usersService.create(data),
 *     invalidateKeys: [queryKeys.users.all],
 *     showLoading: true,
 *     loadingMessage: 'Kullanıcı oluşturuluyor...',
 *     showSuccess: true,
 *     successMessage: 'Kullanıcı başarıyla oluşturuldu',
 *     component: 'CreateUserForm',
 *   });
 *
 *   return (
 *     <button onClick={() => mutate(formData)} disabled={isPending}>
 *       Kaydet
 *     </button>
 *   );
 * }
 * ```
 */
function useApiMutation(mutationFn, options = {}) {
    const { showLoading = false, loadingMessage, showError = true, errorTitle = 'İşlem Hatası', showSuccess = false, successMessage, component, invalidateKeys = [], onSuccess, onError, ...mutationOptions } = options;
    const queryClient = (0, react_query_1.useQueryClient)();
    // Error handler
    const handleError = (0, useErrorHandler_1.useErrorHandler)({
        component,
        toastTitle: errorTitle,
    });
    // Loading state
    const loading = (0, useLoading_1.useLoading)({
        id: `mutation-${component || 'default'}`,
        message: loadingMessage,
        source: component,
        autoStopOnUnmount: true,
    });
    // Mutation
    const mutation = (0, react_query_1.useMutation)({
        mutationFn: async (variables) => {
            if (showLoading) {
                loading.start();
            }
            try {
                const response = await mutationFn(variables);
                // Unwrap if ApiResponse
                if (response && typeof response === 'object' && 'success' in response) {
                    return (0, response_utils_1.unwrapResponse)(response);
                }
                return response;
            }
            finally {
                if (showLoading) {
                    loading.stop();
                }
            }
        },
        onSuccess: async (data, variables, context) => {
            // Show success toast
            if (showSuccess && successMessage) {
                const { toast } = await Promise.resolve().then(() => __importStar(require('@/hooks/use-toast')));
                toast({
                    title: 'Başarılı',
                    description: successMessage,
                    variant: 'default',
                });
            }
            // Invalidate queries
            if (invalidateKeys.length > 0) {
                await Promise.all(invalidateKeys.map(key => queryClient.invalidateQueries({ queryKey: key })));
            }
            // Call custom onSuccess (if provided)
            if (onSuccess) {
                // @ts-expect-error - TanStack Query v5 callback signature
                await onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            // Show error toast
            if (showError) {
                handleError(error);
            }
            // Call custom onError (if provided)
            if (onError) {
                // @ts-expect-error - TanStack Query v5 callback signature
                onError(error, variables, context);
            }
        },
        ...mutationOptions,
    });
    return mutation;
}
/**
 * Hook for optimistic updates
 *
 * Provides utilities for implementing optimistic UI updates
 * with automatic rollback on error.
 *
 * @example
 * ```tsx
 * import { useOptimisticUpdate } from '@/lib/query';
 * import { queryKeys } from '@/lib/query/query-client';
 *
 * function TodoItem({ todo }) {
 *   const { mutate } = useOptimisticUpdate({
 *     mutationFn: (done: boolean) => todosService.update(todo.id, { done }),
 *     queryKey: queryKeys.todos.list(),
 *     updater: (old, done) => {
 *       return old.map(t => t.id === todo.id ? { ...t, done } : t);
 *     },
 *   });
 *
 *   return (
 *     <input
 *       type="checkbox"
 *       checked={todo.done}
 *       onChange={(e) => mutate(e.target.checked)}
 *     />
 *   );
 * }
 * ```
 */
function useOptimisticUpdate(options) {
    const { mutationFn, queryKey, updater, showError = true, errorTitle = 'Güncelleme Hatası', component, } = options;
    const queryClient = (0, react_query_1.useQueryClient)();
    const handleError = (0, useErrorHandler_1.useErrorHandler)({
        component,
        toastTitle: errorTitle,
    });
    return (0, react_query_1.useMutation)({
        mutationFn: async (variables) => {
            const response = await mutationFn(variables);
            if (response && typeof response === 'object' && 'success' in response) {
                return (0, response_utils_1.unwrapResponse)(response);
            }
            return response;
        },
        onMutate: async (variables) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey });
            // Snapshot previous value
            const previousData = queryClient.getQueryData(queryKey);
            // Optimistically update
            queryClient.setQueryData(queryKey, (old) => updater(old, variables));
            // Return context with snapshot
            return { previousData };
        },
        onError: (error, _variables, context) => {
            // Rollback on error
            if (context?.previousData !== undefined) {
                queryClient.setQueryData(queryKey, context.previousData);
            }
            if (showError) {
                handleError(error);
            }
        },
        onSettled: () => {
            // Refetch after mutation
            queryClient.invalidateQueries({ queryKey });
        },
    });
}
//# sourceMappingURL=hooks.js.map