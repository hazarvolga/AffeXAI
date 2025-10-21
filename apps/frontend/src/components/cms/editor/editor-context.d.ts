import React, { ReactNode } from 'react';
interface EditorContextType {
    isEditMode: boolean;
    setIsEditMode: (isEditMode: boolean) => void;
    updateComponentProps: (componentId: string, props: any) => void;
}
interface EditorProviderProps {
    children: ReactNode;
    onComponentUpdate: (id: string, props: any) => void;
}
export declare const EditorProvider: React.FC<EditorProviderProps>;
export declare const useEditor: () => EditorContextType;
export {};
//# sourceMappingURL=editor-context.d.ts.map