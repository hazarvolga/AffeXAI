import { UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import { ApiResponse } from '@affexai/shared-types';
/**
 * Enhanced Query Options
 */
interface UseApiQueryOptions<TData, TError = Error> extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
    /** Show loading overlay */
    showLoading?: boolean;
    /** Loading message */
    loadingMessage?: string;
    /** Show error toast on failure */
    showError?: boolean;
    /** Error toast title */
    errorTitle?: string;
    /** Component name for error logging */
    component?: string;
}
/**
 * Enhanced Mutation Options
 */
interface UseApiMutationOptions<TData, TVariables, TError = Error, TContext = unknown> extends Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'> {
    /** Show loading overlay */
    showLoading?: boolean;
    /** Loading message */
    loadingMessage?: string;
    /** Show error toast on failure */
    showError?: boolean;
    /** Error toast title */
    errorTitle?: string;
    /** Show success toast on success */
    showSuccess?: boolean;
    /** Success toast message */
    successMessage?: string;
    /** Component name for error logging */
    component?: string;
    /** Query keys to invalidate on success */
    invalidateKeys?: QueryKey[];
}
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
export declare function useApiQuery<TData = unknown, TError = Error>(queryKey: QueryKey, queryFn: () => Promise<ApiResponse<TData> | TData>, options?: UseApiQueryOptions<TData, TError>): import("@tanstack/react-query").UseQueryResult<import("@tanstack/react-query").NoInfer<TData>, TError>;
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
export declare function useApiMutation<TData = unknown, TVariables = void, TError = Error, TContext = unknown>(mutationFn: (variables: TVariables) => Promise<ApiResponse<TData> | TData>, options?: UseApiMutationOptions<TData, TVariables, TError, TContext>): import("@tanstack/react-query").UseMutationResult<TData, TError, TVariables, TContext>;
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
export declare function useOptimisticUpdate<TData, TVariables, TError = Error>(options: {
    mutationFn: (variables: TVariables) => Promise<ApiResponse<TData> | TData>;
    queryKey: QueryKey;
    updater: (oldData: TData | undefined, variables: TVariables) => TData;
    showError?: boolean;
    errorTitle?: string;
    component?: string;
}): import("@tanstack/react-query").UseMutationResult<TData, TError, TVariables, {
    previousData?: TData;
}>;
export {};
//# sourceMappingURL=hooks.d.ts.map