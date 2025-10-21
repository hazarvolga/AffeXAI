export type LoginState = {
    message: string;
    issues?: string[];
    fields?: Record<string, string>;
};
export declare function login(prevState: LoginState, formData: FormData): Promise<LoginState>;
//# sourceMappingURL=actions.d.ts.map