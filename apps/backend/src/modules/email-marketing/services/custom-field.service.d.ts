import { Repository } from 'typeorm';
import { CustomField, CustomFieldType } from '../entities/custom-field.entity';
export interface CreateCustomFieldDto {
    name: string;
    label: string;
    type: CustomFieldType;
    description?: string;
    required?: boolean;
    options?: string[];
    defaultValue?: string;
    placeholder?: string;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
}
export interface UpdateCustomFieldDto extends Partial<CreateCustomFieldDto> {
    active?: boolean;
    sortOrder?: number;
}
export declare class CustomFieldService {
    private customFieldRepository;
    constructor(customFieldRepository: Repository<CustomField>);
    create(createDto: CreateCustomFieldDto): Promise<CustomField>;
    findAll(activeOnly?: boolean): Promise<CustomField[]>;
    findOne(id: string): Promise<CustomField>;
    findByName(name: string): Promise<CustomField | null>;
    update(id: string, updateDto: UpdateCustomFieldDto): Promise<CustomField>;
    remove(id: string): Promise<void>;
    reorder(fieldIds: string[]): Promise<void>;
    getFieldsForMapping(): Promise<Array<{
        key: string;
        label: string;
        required: boolean;
        type: string;
    }>>;
    validateCustomFieldValue(field: CustomField, value: any): Promise<{
        isValid: boolean;
        error?: string;
    }>;
    validateCustomFieldsData(customFieldsData: Record<string, any>): Promise<{
        isValid: boolean;
        errors: string[];
        validatedData: Record<string, any>;
    }>;
}
//# sourceMappingURL=custom-field.service.d.ts.map