import { ReactNode } from 'react';
type PreviewMode = 'public' | 'preview' | 'edit';
export declare function PreviewProvider({ children, initialMode, }: {
    children: ReactNode;
    initialMode?: PreviewMode;
}): JSX.Element;
export declare function usePreview(): any;
export {};
//# sourceMappingURL=preview-context.d.ts.map