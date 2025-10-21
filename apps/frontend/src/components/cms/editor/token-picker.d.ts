/**
 * TokenPicker Component
 *
 * Visual token selection UI for CMS blocks
 * Allows users to select design tokens or enter custom values
 */
import React from 'react';
/**
 * Token category type for filtering
 */
export type TokenCategory = 'color' | 'spacing' | 'typography' | 'shadow' | 'border' | 'dimension' | 'fontFamily' | 'fontWeight';
/**
 * TokenPicker component props
 */
export interface TokenPickerProps {
    /**
     * Token category to filter available tokens
     */
    category: TokenCategory;
    /**
     * Current value (can be token alias or direct value)
     */
    value: string;
    /**
     * Callback when value changes
     */
    onChange: (value: string) => void;
    /**
     * Allow custom values in addition to token references
     */
    allowCustom?: boolean;
    /**
     * Placeholder text for custom input
     */
    placeholder?: string;
    /**
     * Label for the picker
     */
    label?: string;
    /**
     * Help text shown below the picker
     */
    description?: string;
    /**
     * Disable the picker
     */
    disabled?: boolean;
}
/**
 * Main TokenPicker Component
 */
export declare function TokenPicker({ category, value, onChange, allowCustom, placeholder, label, description, disabled, }: TokenPickerProps): React.JSX.Element;
/**
 * Compact TokenPicker for inline use
 */
export declare function CompactTokenPicker({ category, value, onChange, allowCustom, }: Omit<TokenPickerProps, 'label' | 'description'>): React.JSX.Element;
//# sourceMappingURL=token-picker.d.ts.map