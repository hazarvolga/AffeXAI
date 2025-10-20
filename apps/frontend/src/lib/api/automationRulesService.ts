import { httpClient } from './http-client';

export interface AutomationRule {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  triggerEventType: string;
  triggerConditions: Record<string, any>;
  actions: Array<{
    type: string;
    config: Record<string, any>;
  }>;
  priority: number;
  requiresApproval: boolean;
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
  autoApprovalConditions?: Record<string, any>;
  authorizedApprovers?: Array<{
    userId: string;
    userName: string;
    email: string;
  }>;
  executionCount: number;
  lastExecutedAt?: string;
  lastExecutionResult?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export const automationRulesService = {
  /**
   * Get all automation rules
   */
  async getAll(): Promise<AutomationRule[]> {
    const response = await httpClient.get('/automation/rules');
    return response.data;
  },

  /**
   * Get active automation rules
   */
  async getActive(): Promise<AutomationRule[]> {
    const response = await httpClient.get('/automation/rules/active');
    return response.data;
  },

  /**
   * Get a single automation rule
   */
  async getOne(id: string): Promise<AutomationRule> {
    const response = await httpClient.get(`/automation/rules/${id}`);
    return response.data;
  },

  /**
   * Create a new automation rule
   */
  async create(data: Partial<AutomationRule>): Promise<AutomationRule> {
    const response = await httpClient.post('/automation/rules', data);
    return response.data;
  },

  /**
   * Update an automation rule
   */
  async update(id: string, data: Partial<AutomationRule>): Promise<AutomationRule> {
    const response = await httpClient.put(`/automation/rules/${id}`, data);
    return response.data;
  },

  /**
   * Delete an automation rule
   */
  async delete(id: string): Promise<void> {
    await httpClient.delete(`/automation/rules/${id}`);
  },

  /**
   * Toggle automation rule active status
   */
  async toggle(id: string): Promise<AutomationRule> {
    const response = await httpClient.put(`/automation/rules/${id}/toggle`);
    return response.data;
  },
};
