import * as React from 'react';
import { DateRange } from 'react-day-picker';
interface DatePickerWithRangeProps {
    className?: string;
    date?: DateRange;
    onDateChange?: (date: DateRange | undefined) => void;
}
export declare function DatePickerWithRange({ className, date, onDateChange, }: DatePickerWithRangeProps): React.JSX.Element;
export {};
//# sourceMappingURL=date-range-picker.d.ts.map