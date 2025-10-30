import httpClient from './http-client';

/**
 * Ticket Category Service
 * API service for managing ticket categories with hierarchy, colors, and icons
 */

export interface TicketCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  color?: string; // Hex color code (e.g., #FF5733)
  icon?: string; // Lucide icon name (e.g., 'FolderTree', 'Bug')
  order: number;
  isActive: boolean;
  ticketCount: number;
  parent?: TicketCategory;
  children?: TicketCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  parentId?: string;
  color?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  parentId?: string;
  color?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
}

export interface CategoryOrderDto {
  id: string;
  order: number;
  parentId?: string;
}

export interface ReorderCategoriesDto {
  categories: CategoryOrderDto[];
}

class TicketCategoryService {
  private baseUrl = '/ticket-categories';

  /**
   * Get all categories with hierarchy
   */
  async getAll(): Promise<TicketCategory[]> {
    const response = await httpClient.get<{ data: TicketCategory[] }>(this.baseUrl);
    return response.data.data;
  }

  /**
   * Get categories as tree structure
   */
  async getTree(): Promise<TicketCategory[]> {
    const response = await httpClient.get<{ data: TicketCategory[] }>(`${this.baseUrl}/tree`);
    return response.data.data;
  }

  /**
   * Get single category by ID
   */
  async getById(id: string): Promise<TicketCategory> {
    const response = await httpClient.get<{ data: TicketCategory }>(`${this.baseUrl}/${id}`);
    return response.data.data;
  }

  /**
   * Create new category
   */
  async create(data: CreateCategoryDto): Promise<TicketCategory> {
    const response = await httpClient.post<{ data: TicketCategory }>(this.baseUrl, data);
    return response.data.data;
  }

  /**
   * Update existing category
   */
  async update(id: string, data: UpdateCategoryDto): Promise<TicketCategory> {
    const response = await httpClient.put<{ data: TicketCategory }>(`${this.baseUrl}/${id}`, data);
    return response.data.data;
  }

  /**
   * Delete category
   */
  async delete(id: string): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Reorder multiple categories
   */
  async reorder(data: ReorderCategoriesDto): Promise<TicketCategory[]> {
    const response = await httpClient.patch<{ data: TicketCategory[] }>(`${this.baseUrl}/reorder`, data);
    return response.data.data;
  }

  /**
   * Toggle category active status
   */
  async toggleActive(id: string, isActive: boolean): Promise<TicketCategory> {
    const response = await httpClient.patch<{ data: TicketCategory }>(
      `${this.baseUrl}/${id}/toggle-active`,
      { isActive }
    );
    return response.data.data;
  }
}

export default new TicketCategoryService();
