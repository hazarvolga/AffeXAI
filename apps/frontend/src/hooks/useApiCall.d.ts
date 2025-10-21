/**
 * useApiCall Hook
 *
 * Generic React hook for making API calls with loading and error states.
 */
export interface ApiCallState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}
export interface UseApiCallOptions<T> {
    /** Initial data value */
    initialData?: T | null;
    /** Callback when request succeeds */
    onSuccess?: (data: T) => void;
    /** Callback when request fails */
    onError?: (error: Error) => void;
    /** Callback when request completes (success or error) */
    onComplete?: () => void;
}
export interface UseApiCallResult<T, TArgs extends any[] = []> {
    /** Current data */
    data: T | null;
    /** Loading state */
    loading: boolean;
    /** Error state */
    error: Error | null;
    /** Execute the API call */
    execute: (...args: TArgs) => Promise<T>;
    /** Reset state to initial values */
    reset: () => void;
    /** Set data manually */
    setData: (data: T | null) => void;
    /** Set error manually */
    setError: (error: Error | null) => void;
}
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
export declare function useApiCall<T, TArgs extends any[] = []>(apiFunction: (...args: TArgs) => Promise<T>, options?: UseApiCallOptions<T>): UseApiCallResult<T, TArgs>;
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
export declare function useMutation<T, TArgs extends any[] = []>(mutationFunction: (...args: TArgs) => Promise<T>, options?: UseApiCallOptions<T>): {
    mutate: (...args: TArgs) => Promise<T>;
    loading: boolean;
    error: Error | null;
    reset: () => void;
};
export default useApiCall;
//# sourceMappingURL=useApiCall.d.ts.map