import { CreateTemplateDto as ICreateTemplateDto, TemplateType } from '@affexai/shared-types';
export declare class CreateEmailTemplateDto implements ICreateTemplateDto {
    name: string;
    description?: string;
    content: string;
    thumbnailUrl?: string;
    isDefault?: boolean;
    type?: TemplateType | string;
    fileTemplateName?: string;
    variables?: Record<string, any>;
    isActive?: boolean;
}
//# sourceMappingURL=create-template.dto.d.ts.map