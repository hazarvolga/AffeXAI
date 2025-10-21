/**
 * PropertyFieldRenderer Component
 *
 * Renders appropriate input field based on property schema
 * Includes token support for color, spacing, and typography properties
 */
import React from 'react';
import type { TokenReferenceConfig } from '@/components/cms/blocks/block-configs';
interface PropertyFieldRendererProps {
    propertyKey: string;
    propertySchema: {
        type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'list' | 'textarea' | 'token';
        label: string;
        options?: string[];
        defaultValue?: any;
        tokenReference?: TokenReferenceConfig;
    };
    value: any;
    onChange: (value: any) => void;
    disabled?: boolean;
}
export declare function PropertyFieldRenderer({ propertyKey, propertySchema, value, onChange, disabled, }: PropertyFieldRendererProps): React.JSX.Element;
/**
 * Compact version for inline property editing
 */
export declare function CompactPropertyFieldRenderer({ propertyKey, propertySchema, value, onChange, disabled, }: PropertyFieldRendererProps): React.JSX.Element;
export {};
//# sourceMappingURL=property-field-renderer.d.ts.map