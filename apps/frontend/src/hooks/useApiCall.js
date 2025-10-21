"use strict";
/**
 * useApiCall Hook
 *
 * Generic React hook for making API calls with loading and error states.
 */
'use client';
/**
 * useApiCall Hook
 *
 * Generic React hook for making API calls with loading and error states.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApiCall = useApiCall;
exports.useMutation = useMutation;
const react_1 = require("react");
// ============================================================================
// Hook
// ============================================================================
/**
 * Hook for making API calls with state management
 *
 * @example
 * ```tsx
 * function UserProfile({ userId }: { userId: string }) {
 *   const { data: user, loading, error, execute } = useApiCall(
 *     (id: string) => usersService.getById(id)
 *   );
 *
 *   useEffect(() => {
 *     execute(userId);
 *   }, [userId]);
 *
 *   if (loading) return <Spinner />;
 *   if (error) return <Error message={error.message} />;
 *   if (!user) return null;
 *
 *   return <div>{user.name}</div>;
 * }
 * ```
 */
function useApiCall(apiFunction, options) {
    const [data, setData] = (0, react_1.useState)(options?.initialData ?? null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const execute = (0, react_1.useCallback)(async (...args) => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFunction(...args);
            setData(result);
            if (options?.onSuccess) {
                options.onSuccess(result);
            }
            return result;
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error('An error occurred');
            setError(error);
            if (options?.onError) {
                options.onError(error);
            }
            throw error;
        }
        finally {
            setLoading(false);
            if (options?.onComplete) {
                options.onComplete();
            }
        }
    }, [apiFunction, options]);
    const reset = (0, react_1.useCallback)(() => {
        setData(options?.initialData ?? null);
        setLoading(false);
        setError(null);
    }, [options?.initialData]);
    return {
        data,
        loading,
        error,
        execute,
        reset,
        setData,
        setError,
    };
}
// ============================================================================
// Mutation Hook (for POST/PUT/PATCH/DELETE)
// ============================================================================
/**
 * Hook for mutation operations (create, update, delete)
 * Similar to useApiCall but designed for mutations
 *
 * @example
 * ```tsx
 * function CreateUserForm() {
 *   const { loading, error, mutate } = useMutation(
 *     (data: CreateUserDto) => usersService.create(data),
 *     {
 *       onSuccess: (user) => {
 *         toast.success('User created!');
 *         router.push(`/users/${user.id}`);
 *       }
 *     }
 *   );
 *
 *   const handleSubmit = async (formData: CreateUserDto) => {
 *     await mutate(formData);
 *   };
 *
 *   return <UserForm onSubmit={handleSubmit} loading={loading} error={error} />;
 * }
 * ```
 */
function useMutation(mutationFunction, options) {
    const { execute, loading, error, reset } = useApiCall(mutationFunction, options);
    return {
        mutate: execute,
        loading,
        error,
        reset,
    };
}
// ============================================================================
// Exports
// ============================================================================
exports.default = useApiCall;
//# sourceMappingURL=useApiCall.js.map