import React from 'react';
interface ImageComponentProps {
    id: string;
    src: string;
    alt: string;
    className?: string;
    width?: number | string;
    height?: number | string;
    fit?: 'cover' | 'contain' | 'fill' | 'none';
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
    caption?: string;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    border?: boolean;
    borderColor?: 'default' | 'primary' | 'secondary';
    lazy?: boolean;
}
export declare const ImageComponent: React.FC<ImageComponentProps>;
export default ImageComponent;
//# sourceMappingURL=image-component.d.ts.map