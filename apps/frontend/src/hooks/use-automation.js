"use strict";
/**
 * Automation Hooks
 * React Query hooks for marketing automation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.automationKeys = void 0;
exports.useAutomations = useAutomations;
exports.useAutomation = useAutomation;
exports.useCreateAutomation = useCreateAutomation;
exports.useUpdateAutomation = useUpdateAutomation;
exports.useDeleteAutomation = useDeleteAutomation;
exports.useActivateAutomation = useActivateAutomation;
exports.usePauseAutomation = usePauseAutomation;
exports.useExecutions = useExecutions;
exports.useAutomationAnalytics = useAutomationAnalytics;
exports.useTestAutomation = useTestAutomation;
exports.useQueueMetrics = useQueueMetrics;
const react_query_1 = require("@tanstack/react-query");
const automation_1 = require("@/lib/api/automation");
const sonner_1 = require("sonner");
// Query keys
exports.automationKeys = {
    all: ['automations'],
    lists: () => [...exports.automationKeys.all, 'list'],
    list: (filters) => [...exports.automationKeys.lists(), filters],
    details: () => [...exports.automationKeys.all, 'detail'],
    detail: (id) => [...exports.automationKeys.details(), id],
    executions: (query) => [...exports.automationKeys.all, 'executions', query],
    analytics: (id, query) => [...exports.automationKeys.all, 'analytics', id, query],
    queueMetrics: () => [...exports.automationKeys.all, 'queue', 'metrics'],
};
/**
 * Get all automations
 */
function useAutomations() {
    return (0, react_query_1.useQuery)({
        queryKey: exports.automationKeys.lists(),
        queryFn: () => automation_1.automationApi.getAll(),
    });
}
/**
 * Get automation by ID
 */
function useAutomation(id) {
    return (0, react_query_1.useQuery)({
        queryKey: exports.automationKeys.detail(id),
        queryFn: () => automation_1.automationApi.getById(id),
        enabled: !!id,
    });
}
/**
 * Create automation
 */
function useCreateAutomation() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (dto) => automation_1.automationApi.create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: exports.automationKeys.lists() });
            sonner_1.toast.success('Automation created successfully');
        },
        onError: (error) => {
            sonner_1.toast.error(error.response?.data?.message || 'Failed to create automation');
        },
    });
}
/**
 * Update automation
 */
function useUpdateAutomation() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: ({ id, dto }) => automation_1.automationApi.update(id, dto),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: exports.automationKeys.lists() });
            queryClient.invalidateQueries({ queryKey: exports.automationKeys.detail(data.id) });
            sonner_1.toast.success('Automation updated successfully');
        },
        onError: (error) => {
            sonner_1.toast.error(error.response?.data?.message || 'Failed to update automation');
        },
    });
}
/**
 * Delete automation
 */
function useDeleteAutomation() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (id) => automation_1.automationApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: exports.automationKeys.lists() });
            sonner_1.toast.success('Automation deleted successfully');
        },
        onError: (error) => {
            sonner_1.toast.error(error.response?.data?.message || 'Failed to delete automation');
        },
    });
}
/**
 * Activate automation
 */
function useActivateAutomation() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: ({ id, registerExisting }) => automation_1.automationApi.activate(id, registerExisting),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: exports.automationKeys.lists() });
            queryClient.invalidateQueries({ queryKey: exports.automationKeys.detail(data.id) });
            sonner_1.toast.success('Automation activated successfully');
        },
        onError: (error) => {
            sonner_1.toast.error(error.response?.data?.message || 'Failed to activate automation');
        },
    });
}
/**
 * Pause automation
 */
function usePauseAutomation() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: ({ id, cancelPending }) => automation_1.automationApi.pause(id, cancelPending),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: exports.automationKeys.lists() });
            queryClient.invalidateQueries({ queryKey: exports.automationKeys.detail(data.id) });
            sonner_1.toast.success('Automation paused successfully');
        },
        onError: (error) => {
            sonner_1.toast.error(error.response?.data?.message || 'Failed to pause automation');
        },
    });
}
/**
 * Get executions
 */
function useExecutions(query) {
    return (0, react_query_1.useQuery)({
        queryKey: exports.automationKeys.executions(query),
        queryFn: () => automation_1.automationApi.getExecutions(query),
    });
}
/**
 * Get analytics
 */
function useAutomationAnalytics(id, query) {
    return (0, react_query_1.useQuery)({
        queryKey: exports.automationKeys.analytics(id, query),
        queryFn: () => automation_1.automationApi.getAnalytics(id, query),
        enabled: !!id,
    });
}
/**
 * Test automation
 */
function useTestAutomation() {
    return (0, react_query_1.useMutation)({
        mutationFn: ({ id, subscriberId, dryRun, }) => automation_1.automationApi.test(id, subscriberId, dryRun),
        onSuccess: () => {
            sonner_1.toast.success('Test completed successfully');
        },
        onError: (error) => {
            sonner_1.toast.error(error.response?.data?.message || 'Test failed');
        },
    });
}
/**
 * Get queue metrics
 */
function useQueueMetrics() {
    return (0, react_query_1.useQuery)({
        queryKey: exports.automationKeys.queueMetrics(),
        queryFn: () => automation_1.automationApi.getQueueMetrics(),
        refetchInterval: 5000, // Refresh every 5 seconds
    });
}
//# sourceMappingURL=use-automation.js.map