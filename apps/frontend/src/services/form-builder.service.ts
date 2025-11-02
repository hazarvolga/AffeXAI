import { httpClient } from '@/lib/api/http-client';

export interface FormBuilderStats {
  totalForms: number;
  activeForms: number;
  totalSubmissions: number;
  pendingSubmissions: number;
}

export interface SubmissionStats {
  total: number;
  pending: number;
  processed: number;
  failed: number;
  archived: number;
}

export class FormBuilderService {
  /**
   * Get dashboard statistics
   */
  static async getDashboardStats(): Promise<FormBuilderStats> {
    try {
      // Fetch forms and submissions stats in parallel
      const [formsResponse, submissionsResponse] = await Promise.all([
        httpClient.get('/api/ticket-forms'),
        httpClient.get('/api/form-submissions/stats'),
      ]);

      const forms = formsResponse.data.items || [];
      const submissionStats: SubmissionStats = submissionsResponse.data;

      return {
        totalForms: formsResponse.data.total || forms.length,
        activeForms: forms.filter((form: any) => form.isActive).length,
        totalSubmissions: submissionStats.total,
        pendingSubmissions: submissionStats.pending,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return zeros on error instead of throwing
      return {
        totalForms: 0,
        activeForms: 0,
        totalSubmissions: 0,
        pendingSubmissions: 0,
      };
    }
  }

  /**
   * Get submission statistics
   */
  static async getSubmissionStats(formId?: string): Promise<SubmissionStats> {
    try {
      const params = formId ? `?formId=${formId}` : '';
      const response = await httpClient.get(`/api/form-submissions/stats${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching submission stats:', error);
      throw error;
    }
  }
}
