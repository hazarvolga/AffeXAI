interface MediaPickerProps {
    value?: string;
    onChange: (mediaId: string | null) => void;
    placeholder?: string;
    filterType?: string;
}
export default function MediaPicker({ value, onChange, placeholder, filterType: initialFilterType }: MediaPickerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=MediaPicker.d.ts.map