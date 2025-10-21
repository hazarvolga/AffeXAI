import React from 'react';
interface CardComponentProps {
    id: string;
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    background?: 'none' | 'primary' | 'secondary' | 'muted';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';
    border?: boolean;
    borderColor?: 'default' | 'primary' | 'secondary';
    hover?: boolean;
    clickable?: boolean;
    onClick?: () => void;
}
export declare const CardComponent: React.FC<CardComponentProps>;
export default CardComponent;
//# sourceMappingURL=card-component.d.ts.map