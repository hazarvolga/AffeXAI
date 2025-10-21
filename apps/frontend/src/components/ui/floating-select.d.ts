import * as React from 'react';
export interface FloatingSelectProps {
    label: string;
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    children: React.ReactNode;
    id?: string;
    placeholder?: string;
}
declare const FloatingSelect: React.FC<FloatingSelectProps>;
export { FloatingSelect };
//# sourceMappingURL=floating-select.d.ts.map