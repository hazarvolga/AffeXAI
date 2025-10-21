import * as React from 'react';
import { InputProps } from '@/components/ui/input';
export interface FloatingInputProps extends InputProps {
    label: string;
}
declare const FloatingInput: React.ForwardRefExoticComponent<FloatingInputProps & React.RefAttributes<HTMLInputElement>>;
export { FloatingInput };
//# sourceMappingURL=floating-input.d.ts.map