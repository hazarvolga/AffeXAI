interface UseMediaOptions {
    type?: string;
    enabled?: boolean;
}
export declare function useMedia(options?: UseMediaOptions): {
    mediaItems: any;
    loading: any;
    error: any;
    refresh: () => Promise<void>;
};
export declare function useMediaById(id: string | null): {
    media: any;
    loading: any;
    error: any;
};
export {};
//# sourceMappingURL=useMedia.d.ts.map