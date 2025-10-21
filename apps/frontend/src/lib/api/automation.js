"use strict";
/**
 * Automation API Client
 * API methods for marketing automation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.automationApi = void 0;
const axios_1 = __importDefault(require("axios"));
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006/api';
// Axios instance with auth token
const apiClient = axios_1.default.create({
    baseURL: `${API_BASE_URL}/email-marketing/automations`,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add auth token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    console.log('Automation API Request:', {
        url: config.url,
        baseURL: config.baseURL,
        hasToken: !!token,
        tokenPreview: token ? `${token.substring(0, 20)}...` : null,
    });
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Handle response and errors
apiClient.interceptors.response.use((response) => {
    // If response has a 'data' wrapper, unwrap it
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        response.data = response.data.data;
    }
    return response;
}, (error) => {
    // Enhanced error logging
    console.error('Automation API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
            url: error.config?.url,
            method: error.config?.method,
            baseURL: error.config?.baseURL,
        },
    });
    return Promise.reject(error);
});
exports.automationApi = {
    /**
     * Get all automations
     */
    async getAll() {
        const { data } = await apiClient.get('');
        return data;
    },
    /**
     * Get automation by ID
     */
    async getById(id) {
        const { data } = await apiClient.get(`/${id}`);
        return data;
    },
    /**
     * Create automation
     */
    async create(dto) {
        const { data } = await apiClient.post('', dto);
        return data;
    },
    /**
     * Update automation
     */
    async update(id, dto) {
        const { data } = await apiClient.put(`/${id}`, dto);
        return data;
    },
    /**
     * Delete automation
     */
    async delete(id) {
        await apiClient.delete(`/${id}`);
    },
    /**
     * Activate automation
     */
    async activate(id, registerExisting = false) {
        const { data } = await apiClient.post(`/${id}/activate`, {
            automationId: id,
            registerExistingSubscribers: registerExisting,
        });
        return data;
    },
    /**
     * Pause automation
     */
    async pause(id, cancelPending = false) {
        const { data } = await apiClient.post(`/${id}/pause`, {
            automationId: id,
            cancelPendingExecutions: cancelPending,
        });
        return data;
    },
    /**
     * Get executions
     */
    async getExecutions(query) {
        const { data } = await apiClient.get('/executions/list', {
            params: query,
        });
        return data;
    },
    /**
     * Get analytics
     */
    async getAnalytics(id, query) {
        const { data } = await apiClient.get(`/${id}/analytics`, {
            params: query,
        });
        return data;
    },
    /**
     * Test automation
     */
    async test(id, subscriberId, dryRun = true) {
        const { data } = await apiClient.post(`/${id}/test`, {
            automationId: id,
            subscriberId,
            dryRun,
        });
        return data;
    },
    /**
     * Get queue metrics
     */
    async getQueueMetrics() {
        const { data } = await apiClient.get('/queue/metrics');
        return data;
    },
    /**
     * Get queue jobs
     */
    async getQueueJobs(status, start = 0, end = 10) {
        const { data } = await apiClient.get(`/queue/jobs/${status}`, {
            params: { start, end },
        });
        return data;
    },
};
//# sourceMappingURL=automation.js.map