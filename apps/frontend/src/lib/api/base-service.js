"use strict";
/**
 * Base API Service
 *
 * Abstract base class for all API services.
 * Provides common CRUD operations with standardized response handling.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApiService = void 0;
const http_client_1 = require("./http-client");
const response_utils_1 = require("./response-utils");
// ============================================================================
// Base Service Class
// ============================================================================
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
class BaseApiService {
    endpoint;
    useWrappedResponses;
    constructor(config) {
        this.endpoint = config.endpoint;
        this.useWrappedResponses = config.useWrappedResponses ?? false;
    }
    // ==========================================================================
    // CRUD Operations
    // ==========================================================================
    /**
     * Get all entities
     */
    async getAll(params) {
        const queryString = this.buildQueryString(params);
        const url = `${this.endpoint}${queryString}`;
        if (this.useWrappedResponses) {
            return http_client_1.httpClient.getWrapped(url);
        }
        return http_client_1.httpClient.get(url);
    }
    /**
     * Get paginated list of entities
     */
    async getList(params) {
        const queryString = this.buildQueryString(params);
        const url = `${this.endpoint}${queryString}`;
        if (this.useWrappedResponses) {
            const response = await http_client_1.httpClient.get(url);
            return (0, response_utils_1.unwrapListResponse)(response);
        }
        const response = await http_client_1.httpClient.get(url);
        return { items: response.items, meta: response.meta };
    }
    /**
     * Get entity by ID
     */
    async getById(id) {
        const url = `${this.endpoint}/${id}`;
        if (this.useWrappedResponses) {
            return http_client_1.httpClient.getWrapped(url);
        }
        return http_client_1.httpClient.get(url);
    }
    /**
     * Create new entity
     */
    async create(data) {
        if (this.useWrappedResponses) {
            return http_client_1.httpClient.postWrapped(this.endpoint, data);
        }
        return http_client_1.httpClient.post(this.endpoint, data);
    }
    /**
     * Update existing entity
     */
    async update(id, data) {
        const url = `${this.endpoint}/${id}`;
        if (this.useWrappedResponses) {
            return http_client_1.httpClient.patchWrapped(url, data);
        }
        return http_client_1.httpClient.patch(url, data);
    }
    /**
     * Delete entity
     */
    async delete(id) {
        const url = `${this.endpoint}/${id}`;
        // DELETE operations typically return void/empty response
        // So we don't use wrapped responses even if configured
        return http_client_1.httpClient.delete(url);
    }
    // ==========================================================================
    // Helper Methods
    // ==========================================================================
    /**
     * Build query string from params
     */
    buildQueryString(params) {
        if (!params)
            return '';
        const searchParams = new URLSearchParams();
        if (params.page !== undefined)
            searchParams.append('page', params.page.toString());
        if (params.limit !== undefined)
            searchParams.append('limit', params.limit.toString());
        if (params.sortBy)
            searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder)
            searchParams.append('sortOrder', params.sortOrder);
        if (params.search)
            searchParams.append('search', params.search);
        const queryString = searchParams.toString();
        return queryString ? `?${queryString}` : '';
    }
    /**
     * Get base HTTP client for custom requests
     */
    get client() {
        return http_client_1.httpClient;
    }
}
exports.BaseApiService = BaseApiService;
// ============================================================================
// Exports
// ============================================================================
exports.default = BaseApiService;
//# sourceMappingURL=base-service.js.map