import { AxiosRequestConfig } from 'axios';
declare class HttpClient {
    private instance;
    constructor();
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
declare const httpClient: HttpClient;
export default httpClient;
//# sourceMappingURL=httpClient.d.ts.map