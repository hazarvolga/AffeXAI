import { BaseEntity } from '../../../database/entities/base.entity';
import { TemplateType } from '@affexai/shared-types';
export { TemplateType };
export declare class EmailTemplate extends BaseEntity {
    name: string;
    description: string;
    content: string;
    thumbnailUrl: string;
    isDefault: boolean;
    type: TemplateType | string;
    fileTemplateName: string;
    variables: Record<string, any>;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=email-template.entity.d.ts.map