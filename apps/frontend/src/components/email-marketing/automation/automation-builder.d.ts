interface AutomationData {
    name: string;
    description?: string;
    trigger?: any;
    workflow?: {
        nodes: any[];
        edges: any[];
    };
}
interface AutomationBuilderProps {
    automationId?: string;
    initialData?: AutomationData;
    mode?: 'create' | 'edit';
}
export declare function AutomationBuilder({ automationId, initialData, mode, }: AutomationBuilderProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=automation-builder.d.ts.map