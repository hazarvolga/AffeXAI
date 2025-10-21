export interface Media {
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl?: string;
    type: 'image' | 'document' | 'video' | 'audio';
    storageType: 'local' | 'cloud';
    altText?: string;
    title?: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface CreateMediaDto {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl?: string;
    type?: 'image' | 'document' | 'video' | 'audio';
    storageType?: 'local' | 'cloud';
    altText?: string;
    title?: string;
    description?: string;
    isActive?: boolean;
}
export interface UpdateMediaDto {
    filename?: string;
    originalName?: string;
    mimeType?: string;
    size?: number;
    url?: string;
    thumbnailUrl?: string;
    type?: 'image' | 'document' | 'video' | 'audio';
    storageType?: 'local' | 'cloud';
    altText?: string;
    title?: string;
    description?: string;
    isActive?: boolean;
}
declare class MediaService {
    getAllMedia(type?: string): Promise<Media[]>;
    getMediaById(id: string): Promise<Media>;
    createMedia(mediaData: CreateMediaDto): Promise<Media>;
    updateMedia(id: string, mediaData: UpdateMediaDto): Promise<Media>;
    deleteMedia(id: string): Promise<void>;
    uploadFile(file: File): Promise<Media>;
}
declare const _default: MediaService;
export default _default;
//# sourceMappingURL=mediaService.d.ts.map