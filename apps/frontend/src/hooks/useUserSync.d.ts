import { User } from 'types-shared';
/**
 * useUserSync Hook
 *
 * Smart polling system that keeps user data synchronized with backend.
 * Detects role changes and provides callbacks for UI updates.
 *
 * Features:
 * - Polls every 3 minutes (180 seconds)
 * - Pauses when tab is not visible (battery saving)
 * - Detects role changes and triggers callbacks
 * - Handles network errors gracefully
 * - Tab synchronization via BroadcastChannel
 *
 * @param options.enabled - Enable/disable polling (default: true)
 * @param options.onRoleChange - Callback when roles change
 * @param options.onError - Callback for errors
 * @param options.pollInterval - Polling interval in ms (default: 180000 = 3 min)
 */
export interface UseUserSyncOptions {
    enabled?: boolean;
    onRoleChange?: (newUser: User, oldUser: User) => void;
    onError?: (error: Error) => void;
    pollInterval?: number;
}
export interface UseUserSyncReturn {
    isPolling: boolean;
    lastSync: Date | null;
    error: Error | null;
    syncNow: () => Promise<void>;
}
export declare function useUserSync(options?: UseUserSyncOptions): UseUserSyncReturn;
//# sourceMappingURL=useUserSync.d.ts.map