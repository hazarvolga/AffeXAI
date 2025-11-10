import { httpClient } from '@/lib/api/http-client';
import type { Page } from '@affexai/shared-types';

export interface CmsPageResponse {
  id: string;
  title: string;
  slug: string;
  content: any; // JSON content blocks
  metaTitle?: string;
  metaDescription?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export class CmsPageService {
  /**
   * Get CMS page by slug (public endpoint - no auth required)
   */
  static async getPageBySlug(slug: string): Promise<CmsPageResponse> {
    return httpClient.getWrapped<CmsPageResponse>(`/cms/pages/slug/${slug}`);
  }

  /**
   * Get all published pages (public endpoint)
   */
  static async getPublishedPages(): Promise<CmsPageResponse[]> {
    return httpClient.getWrapped<CmsPageResponse[]>('/cms/pages?status=published');
  }

  /**
   * Get homepage (special case)
   */
  static async getHomepage(): Promise<CmsPageResponse> {
    return this.getPageBySlug('home');
  }
}
