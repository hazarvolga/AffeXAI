import React from 'react';
interface ContainerComponentProps {
    id: string;
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    background?: 'none' | 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';
    border?: boolean;
    borderColor?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'min' | 'max';
    height?: 'auto' | 'full' | 'screen' | 'min' | 'max';
    flex?: boolean;
    flexDirection?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}
export declare const ContainerComponent: React.FC<ContainerComponentProps>;
export default ContainerComponent;
//# sourceMappingURL=container-component.d.ts.map