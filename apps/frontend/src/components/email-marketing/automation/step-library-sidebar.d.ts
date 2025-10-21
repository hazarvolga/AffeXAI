type StepType = 'sendEmail' | 'delay' | 'condition' | 'exit';
interface StepLibrarySidebarProps {
    onDragStart?: (event: React.DragEvent, stepType: StepType) => void;
}
export declare function StepLibrarySidebar({ onDragStart }: StepLibrarySidebarProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=step-library-sidebar.d.ts.map