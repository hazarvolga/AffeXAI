import { BaseEntity } from '../../../database/entities/base.entity';
export declare enum CustomFieldType {
    TEXT = "TEXT",
    NUMBER = "NUMBER",
    DATE = "DATE",
    BOOLEAN = "BOOLEAN",
    SELECT = "SELECT",
    MULTI_SELECT = "MULTI_SELECT"
}
export declare class CustomField extends BaseEntity {
    name: string;
    label: string;
    type: CustomFieldType;
    description: string;
    required: boolean;
    options: string[];
    defaultValue: string;
    placeholder: string;
    validation: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
    active: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=custom-field.entity.d.ts.map