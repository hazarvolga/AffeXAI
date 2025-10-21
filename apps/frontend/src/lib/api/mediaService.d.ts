import { BaseApiService } from './base-service';
import type { Media, CreateMediaDto, UpdateMediaDto, MediaType, MediaQueryParams } from '@affexai/shared-types';
export type { Media, CreateMediaDto, UpdateMediaDto, MediaType, MediaQueryParams };
/**
 * Media Service
 * Handles all media-related API operations extending BaseApiService
 */
declare class MediaService extends BaseApiService<Media, CreateMediaDto, UpdateMediaDto> {
    constructor();
    /**
     * Get all media, optionally filtered by type
     */
    getAllMedia(type?: MediaType): Promise<Media[]>;
    /**
     * Upload file with multipart/form-data
     */
    uploadFile(file: File): Promise<Media>;
    /**
     * Get media URL by ID
     * If the input is already a URL, return it as is
     * If it's a media ID (UUID), fetch the media and return its URL
     */
    getMediaUrl(mediaIdOrUrl: string): Promise<string>;
}
export declare const mediaService: MediaService;
export default mediaService;
//# sourceMappingURL=mediaService.d.ts.map