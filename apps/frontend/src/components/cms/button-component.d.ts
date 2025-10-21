import React from 'react';
interface ButtonComponentProps {
    id: string;
    text: string;
    href?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg';
    disabled?: boolean;
    onClick?: () => void;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}
export declare const ButtonComponent: React.FC<ButtonComponentProps>;
export default ButtonComponent;
//# sourceMappingURL=button-component.d.ts.map