import React from 'react';
interface InlineEditorProps {
    value: string;
    onChange: (value: string) => void;
    onCancel?: () => void;
    type?: 'text' | 'textarea';
    placeholder?: string;
    className?: string;
}
export declare const InlineEditor: React.FC<InlineEditorProps>;
export {};
//# sourceMappingURL=inline-editor.d.ts.map