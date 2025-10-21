import React from 'react';
interface GridComponentProps {
    id: string;
    children: React.ReactNode;
    className?: string;
    columns?: number | 'auto' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    background?: 'none' | 'primary' | 'secondary' | 'muted';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}
export declare const GridComponent: React.FC<GridComponentProps>;
export default GridComponent;
//# sourceMappingURL=grid-component.d.ts.map