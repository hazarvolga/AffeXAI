import React from 'react';
interface EditableTextProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
    tagName?: keyof JSX.IntrinsicElements;
}
export declare const EditableText: React.FC<EditableTextProps>;
export default EditableText;
//# sourceMappingURL=editable-text.d.ts.map