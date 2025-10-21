import React from 'react';
interface Template {
    id: string;
    name: string;
    description: string;
    components: any[];
    layoutOptions: any;
}
interface TemplateManagerProps {
    onSaveTemplate: (template: Omit<Template, 'id'>) => void;
    onLoadTemplate: (template: Template) => void;
    currentComponents: any[];
    currentLayoutOptions: any;
}
export declare const TemplateManager: React.FC<TemplateManagerProps>;
export default TemplateManager;
//# sourceMappingURL=template-manager.d.ts.map