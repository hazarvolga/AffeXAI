/**
 * Automation Hooks
 * React Query hooks for marketing automation
 */
import type { UpdateAutomationDto, GetExecutionsQuery, AnalyticsQuery } from '@/types/automation';
export declare const automationKeys: {
    all: readonly ["automations"];
    lists: () => readonly ["automations", "list"];
    list: (filters?: any) => readonly ["automations", "list", any];
    details: () => readonly ["automations", "detail"];
    detail: (id: string) => readonly ["automations", "detail", string];
    executions: (query: GetExecutionsQuery) => readonly ["automations", "executions", GetExecutionsQuery];
    analytics: (id: string, query?: AnalyticsQuery) => readonly ["automations", "analytics", string, any];
    queueMetrics: () => readonly ["automations", "queue", "metrics"];
};
/**
 * Get all automations
 */
export declare function useAutomations(): import("@tanstack/react-query").UseQueryResult<any, Error>;
/**
 * Get automation by ID
 */
export declare function useAutomation(id: string): import("@tanstack/react-query").UseQueryResult<any, Error>;
/**
 * Create automation
 */
export declare function useCreateAutomation(): import("@tanstack/react-query").UseMutationResult<unknown, any, CreateAutomationDto, unknown>;
/**
 * Update automation
 */
export declare function useUpdateAutomation(): import("@tanstack/react-query").UseMutationResult<unknown, any, {
    id: string;
    dto: UpdateAutomationDto;
}, unknown>;
/**
 * Delete automation
 */
export declare function useDeleteAutomation(): import("@tanstack/react-query").UseMutationResult<unknown, any, string, unknown>;
/**
 * Activate automation
 */
export declare function useActivateAutomation(): import("@tanstack/react-query").UseMutationResult<unknown, any, {
    id: string;
    registerExisting?: boolean;
}, unknown>;
/**
 * Pause automation
 */
export declare function usePauseAutomation(): import("@tanstack/react-query").UseMutationResult<unknown, any, {
    id: string;
    cancelPending?: boolean;
}, unknown>;
/**
 * Get executions
 */
export declare function useExecutions(query: GetExecutionsQuery): import("@tanstack/react-query").UseQueryResult<any, Error>;
/**
 * Get analytics
 */
export declare function useAutomationAnalytics(id: string, query?: AnalyticsQuery): import("@tanstack/react-query").UseQueryResult<any, Error>;
/**
 * Test automation
 */
export declare function useTestAutomation(): import("@tanstack/react-query").UseMutationResult<unknown, any, {
    id: string;
    subscriberId: string;
    dryRun?: boolean;
}, unknown>;
/**
 * Get queue metrics
 */
export declare function useQueueMetrics(): import("@tanstack/react-query").UseQueryResult<any, Error>;
//# sourceMappingURL=use-automation.d.ts.map