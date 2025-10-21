export interface CustomField {
    id: string;
    name: string;
    label: string;
    type: 'TEXT' | 'NUMBER' | 'DATE' | 'BOOLEAN' | 'SELECT' | 'MULTI_SELECT';
    description?: string;
    required: boolean;
    options?: string[];
    defaultValue?: string;
    placeholder?: string;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
    active: boolean;
    sortOrder: number;
}
export interface MappingField {
    key: string;
    label: string;
    required: boolean;
    type: string;
}
export declare function useCustomFields(): {
    customFields: CustomField[];
    mappingFields: MappingField[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
    createCustomField: (fieldData: Omit<CustomField, "id" | "sortOrder" | "active">) => Promise<any>;
    updateCustomField: (id: string, fieldData: Partial<CustomField>) => Promise<any>;
    deleteCustomField: (id: string) => Promise<void>;
    reorderCustomFields: (fieldIds: string[]) => Promise<void>;
};
//# sourceMappingURL=useCustomFields.d.ts.map