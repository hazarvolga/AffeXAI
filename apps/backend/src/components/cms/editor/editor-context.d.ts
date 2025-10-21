import React, { ReactNode } from 'react';
interface EditorProviderProps {
    children: ReactNode;
    onComponentUpdate: (id: string, props: any) => void;
}
export declare const EditorProvider: React.FC<EditorProviderProps>;
export declare const useEditor: () => any;
export {};
//# sourceMappingURL=editor-context.d.ts.map