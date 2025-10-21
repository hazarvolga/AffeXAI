type CacheManager = any;
export declare class CacheService {
    private readonly cacheManager;
    constructor(cacheManager: CacheManager);
    get<T>(key: string): Promise<T | undefined>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
}
export {};
//# sourceMappingURL=cache.service.d.ts.map