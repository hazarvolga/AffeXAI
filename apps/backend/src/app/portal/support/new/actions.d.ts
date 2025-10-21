export type FormState = {
    step: 1 | 2;
    message: string;
    originalInput?: {
        problemDescription: string;
        category: string;
    };
    data?: {
        summary: string;
        priority: string;
        suggestion: string;
    };
};
export declare function analyzeSupportTicket(prevState: FormState, formData: FormData): Promise<FormState>;
//# sourceMappingURL=actions.d.ts.map