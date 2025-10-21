import React from 'react';
interface TextComponentProps {
    id: string;
    content: string;
    className?: string;
    variant?: 'heading1' | 'heading2' | 'heading3' | 'body' | 'caption';
    align?: 'left' | 'center' | 'right' | 'justify';
    color?: 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
}
export declare const TextComponent: React.FC<TextComponentProps>;
export default TextComponent;
//# sourceMappingURL=text-component.d.ts.map