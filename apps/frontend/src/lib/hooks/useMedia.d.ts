interface UseMediaOptions {
    type?: string;
    enabled?: boolean;
}
export declare function useMedia(options?: UseMediaOptions): {
    mediaItems: Media[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
export declare function useMediaById(id: string | null): {
    media: any;
    loading: boolean;
    error: string | null;
};
export {};
//# sourceMappingURL=useMedia.d.ts.map