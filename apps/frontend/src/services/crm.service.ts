import { httpClient } from '@/lib/api/http-client';

export interface CrmCustomer {
  id: string;
  companyName: string;
  email: string;
  customerNumber?: string;
  contactPerson?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  isActive: boolean;
  notes?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCrmCustomerDto {
  companyName: string;
  email: string;
  customerNumber?: string;
  contactPerson?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  isActive?: boolean;
  notes?: string;
  metadata?: Record<string, any>;
}

export interface BulkImportResult {
  imported: number;
  skipped: number;
  errors: string[];
}

export interface CrmStats {
  total: number;
  active: number;
  inactive: number;
}

class CrmService {
  private baseUrl = '/crm';

  async getAll(): Promise<CrmCustomer[]> {
    const response = await httpClient.get(this.baseUrl);
    return response.data;
  }

  async getStats(): Promise<CrmStats> {
    const response = await httpClient.get(`${this.baseUrl}/stats`);
    return response.data;
  }

  async getOne(id: string): Promise<CrmCustomer> {
    const response = await httpClient.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateCrmCustomerDto): Promise<CrmCustomer> {
    const response = await httpClient.post(this.baseUrl, data);
    return response.data;
  }

  async bulkImport(customers: CreateCrmCustomerDto[]): Promise<BulkImportResult> {
    const response = await httpClient.post(`${this.baseUrl}/import`, {
      customers,
    });
    return response.data;
  }

  async update(id: string, data: Partial<CreateCrmCustomerDto>): Promise<CrmCustomer> {
    const response = await httpClient.put(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/${id}`);
  }

  async hardDelete(id: string): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/${id}/hard`);
  }
}

export const crmService = new CrmService();
