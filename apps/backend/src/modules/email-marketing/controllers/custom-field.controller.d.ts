import { CustomFieldService } from '../services/custom-field.service';
import type { CreateCustomFieldDto, UpdateCustomFieldDto } from '../services/custom-field.service';
export declare class CustomFieldController {
    private readonly customFieldService;
    constructor(customFieldService: CustomFieldService);
    create(createDto: CreateCustomFieldDto): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/custom-field.entity").CustomField;
    }>;
    findAll(activeOnly?: string): Promise<{
        success: boolean;
        data: import("../entities/custom-field.entity").CustomField[];
    }>;
    getMappingOptions(): Promise<{
        success: boolean;
        data: {
            key: string;
            label: string;
            required: boolean;
            type: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import("../entities/custom-field.entity").CustomField;
    }>;
    update(id: string, updateDto: UpdateCustomFieldDto): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/custom-field.entity").CustomField;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    reorder(body: {
        fieldIds: string[];
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=custom-field.controller.d.ts.map