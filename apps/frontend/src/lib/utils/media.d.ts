import { Media } from '@/lib/api/mediaService';
/**
 * Get media URL from media ID
 * @param mediaId The ID of the media item
 * @returns The URL of the media item or null if not found
 */
export declare function getMediaUrl(mediaId: string): Promise<string | null>;
/**
 * Get media item from media ID
 * @param mediaId The ID of the media item
 * @returns The media item or null if not found
 */
export declare function getMedia(mediaId: string): Promise<Media | null>;
/**
 * Clear the media cache
 */
export declare function clearMediaCache(): void;
//# sourceMappingURL=media.d.ts.map