import React from 'react';
interface EditorComponent {
    id: string;
    pageId?: string;
    parentId?: string;
    type: string;
    props: any;
    children?: EditorComponent[];
    locked?: boolean;
    orderIndex?: number;
    createdAt?: string;
    updatedAt?: string;
}
interface EditorCanvasProps {
    components: EditorComponent[];
    onComponentUpdate: (id: string, props: any) => void;
    onComponentDelete: (id: string) => void;
    onComponentSelect: (id: string, type?: string) => void;
    selectedComponentId: string | null;
    onMoveUp?: (id: string) => void;
    onMoveDown?: (id: string) => void;
}
export declare const EditorCanvas: React.FC<EditorCanvasProps>;
export default EditorCanvas;
//# sourceMappingURL=editor-canvas.d.ts.map