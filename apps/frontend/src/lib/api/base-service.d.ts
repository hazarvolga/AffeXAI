/**
 * Base API Service
 *
 * Abstract base class for all API services.
 * Provides common CRUD operations with standardized response handling.
 */
import type { PaginationMeta, QueryParams } from '@affexai/shared-types';
export interface BaseServiceConfig {
    /** Base endpoint path (e.g., '/users', '/posts') */
    endpoint: string;
    /** Whether to use wrapped responses (ApiResponse<T>) */
    useWrappedResponses?: boolean;
}
/**
 * Base API Service
 *
 * Provides standard CRUD operations for API resources.
 * Override methods to customize behavior.
 *
 * @example
 * ```ts
 * class UserService extends BaseApiService<User, CreateUserDto, UpdateUserDto> {
 *   constructor() {
 *     super({ endpoint: '/users', useWrappedResponses: true });
 *   }
 *
 *   // Add custom methods
 *   async getUserByEmail(email: string): Promise<User> {
 *     return this.get<User>(`${this.endpoint}/email/${email}`);
 *   }
 * }
 * ```
 */
export declare abstract class BaseApiService<TEntity, TCreateDto = Partial<TEntity>, TUpdateDto = Partial<TEntity>> {
    protected endpoint: string;
    protected useWrappedResponses: boolean;
    constructor(config: BaseServiceConfig);
    /**
     * Get all entities
     */
    getAll(params?: QueryParams): Promise<TEntity[]>;
    /**
     * Get paginated list of entities
     */
    getList(params?: QueryParams): Promise<{
        items: TEntity[];
        meta: PaginationMeta;
    }>;
    /**
     * Get entity by ID
     */
    getById(id: string): Promise<TEntity>;
    /**
     * Create new entity
     */
    create(data: TCreateDto): Promise<TEntity>;
    /**
     * Update existing entity
     */
    update(id: string, data: TUpdateDto): Promise<TEntity>;
    /**
     * Delete entity
     */
    delete(id: string): Promise<void>;
    /**
     * Build query string from params
     */
    protected buildQueryString(params?: QueryParams): string;
    /**
     * Get base HTTP client for custom requests
     */
    protected get client(): import("./http-client").HttpClient;
}
export default BaseApiService;
//# sourceMappingURL=base-service.d.ts.map