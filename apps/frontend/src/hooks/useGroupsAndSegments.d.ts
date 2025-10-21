export interface ImportGroup {
    id: string;
    name: string;
    description: string;
    subscriberCount: number;
}
export interface ImportSegment {
    id: string;
    name: string;
    description: string;
    subscriberCount: number;
    openRate: number;
    clickRate: number;
}
export declare function useGroupsAndSegments(): {
    groups: ImportGroup[];
    segments: ImportSegment[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};
//# sourceMappingURL=useGroupsAndSegments.d.ts.map