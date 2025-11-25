import { httpClient } from './http-client';
import { BaseApiService } from './base-service';
import type {
  Media,
  CreateMediaDto,
  UpdateMediaDto,
  MediaType,
  MediaQueryParams,
} from '@affexai/shared-types';

// Re-export types for backward compatibility
export type { Media, CreateMediaDto, UpdateMediaDto, MediaType, MediaQueryParams };

/**
 * Media Service
 * Handles all media-related API operations extending BaseApiService
 */
class MediaService extends BaseApiService<Media, CreateMediaDto, UpdateMediaDto> {
  constructor() {
    super({ endpoint: '/media', useWrappedResponses: true });
  }

  /**
   * Get all media, optionally filtered by type
   */
  async getAllMedia(type?: MediaType): Promise<Media[]> {
    const url = type ? `${this.endpoint}?type=${type}` : this.endpoint;
    
    if (this.useWrappedResponses) {
      return httpClient.getWrapped<Media[]>(url);
    }
    return httpClient.get<Media[]>(url);
  }

  /**
   * Upload file with multipart/form-data
   */
  async uploadFile(file: File): Promise<Media> {
    const formData = new FormData();
    formData.append('file', file);
    
    // Use axios instance for file upload with proper headers
    const response = await httpClient.getAxiosInstance().post<Media>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  /**
   * Get media URL by ID
   * If the input is already a URL, return it as is
   * If it's a media ID (UUID), fetch the media and return its URL
   */
  async getMediaUrl(mediaIdOrUrl: string): Promise<string> {
    console.log('[MediaService] getMediaUrl input:', mediaIdOrUrl);
    
    // If already a full URL, return it
    if (mediaIdOrUrl.startsWith('http://') || mediaIdOrUrl.startsWith('https://')) {
      console.log('[MediaService] Already a full URL, returning as-is');
      return mediaIdOrUrl;
    }

    // If it looks like a file path with extension, construct upload URL
    if (mediaIdOrUrl.includes('.') && !mediaIdOrUrl.includes('/')) {
      // Get base URL for uploads - remove /api suffix if present since /uploads is at root level
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006';
      const cleanBaseUrl = baseUrl.replace(/\/api\/?$/, '');
      const constructedUrl = `${cleanBaseUrl}/uploads/${mediaIdOrUrl}`;
      console.log('[MediaService] File path detected, constructed URL:', constructedUrl);
      return constructedUrl;
    }

    // If it's a UUID (media ID), fetch the media object
    try {
      console.log('[MediaService] Fetching media by ID:', mediaIdOrUrl);
      const media = await this.getById(mediaIdOrUrl);
      console.log('[MediaService] Media fetched, URL:', media.url);

      // If the URL from backend is relative, make it absolute
      if (media.url && !media.url.startsWith('http://') && !media.url.startsWith('https://')) {
        // Backend returns /uploads/... so we need base URL without /api suffix
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006';
        const cleanBaseUrl = baseUrl.replace(/\/api\/?$/, ''); // Remove /api suffix if present
        const absoluteUrl = `${cleanBaseUrl}${media.url.startsWith('/') ? '' : '/'}${media.url}`;
        console.log('[MediaService] Converted relative to absolute URL:', absoluteUrl);
        return absoluteUrl;
      }
      
      return media.url;
    } catch (error) {
      console.error('[MediaService] Failed to get media URL:', error);
      // Return a placeholder if we can't get the URL
      return 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Logo';
    }
  }
}

export const mediaService = new MediaService();
export default mediaService;