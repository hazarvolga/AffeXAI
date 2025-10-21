import React, { ReactNode } from 'react';
type PreviewMode = 'public' | 'preview' | 'edit';
interface PreviewContextType {
    mode: PreviewMode;
    setMode: (mode: PreviewMode) => void;
    isPreviewMode: boolean;
    isEditMode: boolean;
    isPublicMode: boolean;
}
export declare function PreviewProvider({ children, initialMode, }: {
    children: ReactNode;
    initialMode?: PreviewMode;
}): React.JSX.Element;
export declare function usePreview(): PreviewContextType;
export {};
//# sourceMappingURL=preview-context.d.ts.map