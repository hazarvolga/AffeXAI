/**
 * Automation API Client
 * API methods for marketing automation
 */

import axios from 'axios';
import type {
  Automation,
  CreateAutomationDto,
  UpdateAutomationDto,
  AutomationExecution,
  GetExecutionsQuery,
  ExecutionsResponse,
  AutomationAnalytics,
  AnalyticsQuery,
  QueueMetrics,
} from '@/types/automation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006/api';

// Axios instance with auth token
const apiClient = axios.create({
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
apiClient.interceptors.response.use(
  (response) => {
    // If response has a 'data' wrapper, unwrap it
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
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
  }
);

export const automationApi = {
  /**
   * Get all automations
   */
  async getAll(): Promise<Automation[]> {
    const { data } = await apiClient.get<Automation[]>('');
    return data;
  },

  /**
   * Get automation by ID
   */
  async getById(id: string): Promise<Automation> {
    const { data } = await apiClient.get<Automation>(`/${id}`);
    return data;
  },

  /**
   * Create automation
   */
  async create(dto: CreateAutomationDto): Promise<Automation> {
    const { data } = await apiClient.post<Automation>('', dto);
    return data;
  },

  /**
   * Update automation
   */
  async update(id: string, dto: UpdateAutomationDto): Promise<Automation> {
    const { data } = await apiClient.put<Automation>(`/${id}`, dto);
    return data;
  },

  /**
   * Delete automation
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/${id}`);
  },

  /**
   * Activate automation
   */
  async activate(id: string, registerExisting: boolean = false): Promise<Automation> {
    const { data } = await apiClient.post<Automation>(`/${id}/activate`, {
      automationId: id,
      registerExistingSubscribers: registerExisting,
    });
    return data;
  },

  /**
   * Pause automation
   */
  async pause(id: string, cancelPending: boolean = false): Promise<Automation> {
    const { data } = await apiClient.post<Automation>(`/${id}/pause`, {
      automationId: id,
      cancelPendingExecutions: cancelPending,
    });
    return data;
  },

  /**
   * Get executions
   */
  async getExecutions(query: GetExecutionsQuery): Promise<ExecutionsResponse> {
    const { data } = await apiClient.get<ExecutionsResponse>('/executions/list', {
      params: query,
    });
    return data;
  },

  /**
   * Get analytics
   */
  async getAnalytics(id: string, query?: AnalyticsQuery): Promise<AutomationAnalytics> {
    const { data } = await apiClient.get<AutomationAnalytics>(`/${id}/analytics`, {
      params: query,
    });
    return data;
  },

  /**
   * Test automation
   */
  async test(
    id: string,
    subscriberId: string,
    dryRun: boolean = true,
  ): Promise<{
    automation: Automation;
    subscriber: any;
    steps: any[];
    message: string;
  }> {
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
  async getQueueMetrics(): Promise<QueueMetrics> {
    const { data } = await apiClient.get<QueueMetrics>('/queue/metrics');
    return data;
  },

  /**
   * Get queue jobs
   */
  async getQueueJobs(
    status: 'waiting' | 'active' | 'completed' | 'failed' | 'delayed',
    start: number = 0,
    end: number = 10,
  ): Promise<any[]> {
    const { data } = await apiClient.get(`/queue/jobs/${status}`, {
      params: { start, end },
    });
    return data;
  },
};
