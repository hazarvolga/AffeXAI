interface MediaItem {
    id: string;
    filename: string;
    url: string;
    altText?: string;
    caption?: string;
    mimeType: string;
    size: number;
    createdAt: string;
    updatedAt: string;
}
interface UploadMediaDto {
    file: File;
    altText?: string;
    caption?: string;
}
export declare class MediaService {
    private request;
    getMediaItems(): Promise<MediaItem[]>;
    getMediaItem(id: string): Promise<MediaItem>;
    uploadMedia(data: UploadMediaDto): Promise<MediaItem>;
    updateMedia(id: string, data: Partial<Omit<UploadMediaDto, 'file'>>): Promise<MediaItem>;
    deleteMedia(id: string): Promise<void>;
}
export declare const mediaService: MediaService;
export {};
//# sourceMappingURL=media-service.d.ts.map