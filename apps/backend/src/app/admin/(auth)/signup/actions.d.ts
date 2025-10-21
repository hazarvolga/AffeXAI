export type SignupState = {
    message: string;
    issues?: string[];
    fields?: Record<string, string>;
};
export declare function signup(prevState: SignupState, formData: FormData): Promise<SignupState>;
//# sourceMappingURL=actions.d.ts.map