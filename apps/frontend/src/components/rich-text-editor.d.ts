interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    className?: string;
    attachments?: Attachment[];
    onAttachmentsChange?: (attachments: Attachment[]) => void;
}
interface Attachment {
    id: string;
    name: string;
    size: number;
    type: string;
}
export declare function RichTextEditor({ content, onChange, placeholder, className, attachments, onAttachmentsChange, }: RichTextEditorProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=rich-text-editor.d.ts.map